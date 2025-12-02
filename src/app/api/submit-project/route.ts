import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { AdminEmail, UserEmail } from "@/emails/LeadNotification";

// Validation Schema
const projectSchema = z.object({
  type: z.string(),
  features: z.array(z.string()),
  budget: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    // Save to Database
    await prisma.lead.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        type: validatedData.type,
        budget: validatedData.budget,
        features: JSON.stringify(validatedData.features),
        message: validatedData.message || "",
        status: "NEW"
      }
    });

    // Send Emails
    try {
      // 1. Send Admin Notification
      await resend.emails.send({
        from: 'Nima Studio <onboarding@resend.dev>', // Update this with your verified domain
        to: 'ne3mer@gmail.com', // Updated admin email
        subject: `New Project Lead: ${validatedData.name}`,
        react: AdminEmail({
          name: validatedData.name,
          email: validatedData.email,
          type: validatedData.type,
          budget: validatedData.budget,
          features: validatedData.features,
          message: validatedData.message || "",
        }),
      });

      // 2. Send User Confirmation
      await resend.emails.send({
        from: 'Nima Studio <onboarding@resend.dev>',
        to: validatedData.email,
        subject: 'We received your project request! 🚀',
        react: UserEmail({ name: validatedData.name }),
      });
    } catch (emailError) {
      console.error("Failed to send emails:", emailError);
      // Continue even if email fails, as the lead is saved
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
