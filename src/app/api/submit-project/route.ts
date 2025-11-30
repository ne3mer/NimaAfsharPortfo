import { NextResponse } from "next/server";
import { z } from "zod";

// Validation Schema
const submissionSchema = z.object({
  type: z.string(),
  features: z.array(z.string()),
  budget: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  details: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate data
    const validatedData = submissionSchema.parse(body);

    // TODO: Integrate Resend here
    // const { data, error } = await resend.emails.send({ ... });

    // For now, log to console to simulate sending
    console.log("--- NEW PROJECT LEAD ---");
    console.log("Type:", validatedData.type);
    console.log("Budget:", validatedData.budget);
    console.log("Contact:", validatedData.name, validatedData.email);
    console.log("Features:", validatedData.features);
    console.log("------------------------");

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Project submitted successfully" });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid submission data" },
      { status: 400 }
    );
  }
}
