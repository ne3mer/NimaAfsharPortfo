import { NextResponse } from "next/server";
import { z } from "zod";
import { getEmailConfig, getResendClient } from "@/lib/resend";
import { prisma } from "@/lib/prisma";
import { ContactAdminEmail, ContactUserEmail } from "@/emails/ContactNotification";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

// Validation Schema
const contactSchema = z.object({
  firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
  lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
  email: z.string().trim().email("Please provide a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  companyUrl: z.string().optional(), // Honeypot field
});

export async function POST(request: Request) {
  // 1. Rate limiting check (max 5 submissions per 10 minutes per IP)
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(clientIp, "contact_api", {
    limit: 5,
    windowSeconds: 600,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        success: false,
        saved: false,
        emailSent: false,
        error: "Too many messages sent. Please wait a few minutes before trying again.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.resetInSeconds),
        },
      }
    );
  }

  // 2. Validate request payload
  let validatedData;
  try {
    const body = await request.json();
    validatedData = contactSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issue = err.issues[0]?.message || "Invalid input";
      return NextResponse.json(
        { success: false, saved: false, emailSent: false, error: issue },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, saved: false, emailSent: false, error: "Invalid JSON request body" },
      { status: 400 }
    );
  }

  // 3. Honeypot check: reject automated bot submissions silently or with error
  if (validatedData.companyUrl && validatedData.companyUrl.trim().length > 0) {
    console.warn(`[Contact API] Honeypot triggered from IP ${clientIp}. Rejecting.`);
    return NextResponse.json(
      { success: false, saved: false, emailSent: false, error: "Submission rejected." },
      { status: 400 }
    );
  }

  // 2. Save submission to PostgreSQL via Prisma
  let savedMessageId: string | null = null;
  try {
    const savedRecord = await prisma.contactMessage.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        message: validatedData.message,
      },
    });
    savedMessageId = savedRecord.id;
  } catch (dbError) {
    const errorMsg = dbError instanceof Error ? dbError.message : "Unknown database error";
    console.error("[Contact API] Database error while saving contact message:", errorMsg);
    return NextResponse.json(
      {
        success: false,
        saved: false,
        emailSent: false,
        error: "Failed to store message in database. Please try again later.",
      },
      { status: 500 }
    );
  }

  // 3. Validate Resend email configuration
  const emailConfig = getEmailConfig();
  const resendClient = getResendClient();

  if (!emailConfig.isConfigured || !resendClient) {
    console.warn(
      `[Contact API] Message #${savedMessageId} saved in DB, but email delivery is unconfigured. Missing: ${emailConfig.missing.join(", ")}`
    );
    return NextResponse.json(
      {
        success: false,
        saved: true,
        emailSent: false,
        error: "Message saved, but email notification service is not configured.",
      },
      { status: 502 }
    );
  }

  // 4. Send emails via Resend
  const fromHeader = `${emailConfig.fromName} <${emailConfig.fromEmail}>`;
  let adminDeliveryError: string | null = null;
  let userDeliveryError: string | null = null;

  // 4a. Admin notification with Reply-To set to the visitor's submitted email
  try {
    const adminResult = await resendClient.emails.send({
      from: fromHeader,
      to: emailConfig.adminEmail,
      replyTo: validatedData.email,
      subject: `New Contact Message: ${validatedData.firstName} ${validatedData.lastName}`,
      react: ContactAdminEmail({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        message: validatedData.message,
      }),
    });

    if (adminResult.error) {
      adminDeliveryError = adminResult.error.message;
      console.error("[Contact API] Admin notification delivery failed:", {
        code: adminResult.error.name,
        message: adminResult.error.message,
        statusCode: adminResult.error.statusCode,
      });
    }
  } catch (err) {
    adminDeliveryError = err instanceof Error ? err.message : "Unknown error";
    console.error("[Contact API] Admin notification exception:", adminDeliveryError);
  }

  // 4b. Confirmation email to the visitor
  try {
    const userResult = await resendClient.emails.send({
      from: fromHeader,
      to: validatedData.email,
      subject: "We received your message! 👋",
      react: ContactUserEmail({ firstName: validatedData.firstName }),
    });

    if (userResult.error) {
      userDeliveryError = userResult.error.message;
      console.error("[Contact API] Confirmation email delivery failed:", {
        code: userResult.error.name,
        message: userResult.error.message,
        statusCode: userResult.error.statusCode,
      });
    }
  } catch (err) {
    userDeliveryError = err instanceof Error ? err.message : "Unknown error";
    console.error("[Contact API] Confirmation email exception:", userDeliveryError);
  }

  // 5. If any email delivery failed, do not claim success
  if (adminDeliveryError || userDeliveryError) {
    return NextResponse.json(
      {
        success: false,
        saved: true,
        emailSent: false,
        error: "Your message was saved to our database, but notification email delivery failed.",
        details: {
          adminEmailSent: !adminDeliveryError,
          userConfirmationSent: !userDeliveryError,
        },
      },
      { status: 502 }
    );
  }

  // 6. Complete success: saved in DB and emails dispatched
  return NextResponse.json({
    success: true,
    saved: true,
    emailSent: true,
  });
}

