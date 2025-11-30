import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
