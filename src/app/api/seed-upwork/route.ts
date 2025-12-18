import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define strict types for the local JSON project data
// This mirrors the 'Work' model but makes optional fields explicit
type ProjectData = {
  title: string;
  client: string;
  services?: string;
  year?: string;
  description: string;
  tags: string;
  content: string;
  slug: string;
  status: string;
  image?: string;
};

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "upwork_projects.json");
    
    if (!fs.existsSync(jsonPath)) {
        return NextResponse.json({ error: "upwork_projects.json not found" }, { status: 404 });
    }

    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const projects: ProjectData[] = JSON.parse(fileContent);
    
    const results = [];

    for (const project of projects) {
        // Skip example data
        if (project.slug === "example-project-slug") continue;

        const existing = await prisma.work.findUnique({
            where: { slug: project.slug },
        });

        if (existing) {
            results.push({ slug: project.slug, status: "Skipped (Already exists)" });
            continue;
        }

        await prisma.work.create({
            data: {
                title: project.title,
                client: project.client,
                services: project.services || "Development",
                year: project.year || new Date().getFullYear().toString(),
                description: project.description,
                tags: project.tags,
                content: project.content,
                slug: project.slug,
                status: project.status || "Draft",
                image: project.image || null,
            },
        });
        results.push({ slug: project.slug, status: "Created" });
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Error seeding Upwork projects:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
