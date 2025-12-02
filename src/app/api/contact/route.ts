import { NextResponse } from "next/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import { prisma } from "@/lib/prisma";
import { ContactAdminEmail, ContactUserEmail } from "@/emails/ContactNotification";

// Validation Schema
const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Save to Database
    await prisma.contactMessage.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        message: validatedData.message,
      },
    });

    // Send Emails
    try {
      // 1. Send Admin Notification
      await resend.emails.send({
        from: 'Nima Studio <onboarding@resend.dev>',
        to: 'ne3mer@gmail.com',
        subject: `New Contact Message: ${validatedData.firstName} ${validatedData.lastName}`,
        react: ContactAdminEmail({
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          message: validatedData.message,
        }),
      });

      // 2. Send User Confirmation
      await resend.emails.send({
        from: 'Nima Studio <onboarding@resend.dev>',
        to: validatedData.email,
        subject: 'We received your message! 👋',
        react: ContactUserEmail({ firstName: validatedData.firstName }),
      });
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
