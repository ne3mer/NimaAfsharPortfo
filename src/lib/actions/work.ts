"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createWork(formData: FormData) {
  console.log("createWork action called");
  const title = formData.get("title");
  const client = formData.get("client");
  const services = formData.get("services") as string | null;
  const year = formData.get("year") as string | null;
  const description = formData.get("description");
  const tags = formData.get("tags");
  const content = formData.get("content");
  const slugInput = formData.get("slug");
  const status = (formData.get("status") as string) || "Draft";
  const image = formData.get("image") as string | null;

  console.log("Received data:", { title, client, services, year, description, tags, content, slugInput, status, image });

  if (
    typeof title !== "string" ||
    typeof client !== "string" ||
    typeof description !== "string" ||
    typeof tags !== "string" ||
    typeof content !== "string"
  ) {
    console.error("Missing required fields");
    throw new Error("Missing required fields");
  }

  const slug =
    typeof slugInput === "string" && slugInput.trim().length > 0
      ? generateSlug(slugInput)
      : generateSlug(title);

  console.log("Generated slug:", slug);

  try {
    const newWork = await prisma.work.create({
      data: {
        title,
        client,
        services,
        year,
        description,
        tags,
        content,
        slug,
        status,
        image: image || null,
      },
    });
    console.log("Work created successfully:", newWork);
  } catch (error) {
    console.error("Error creating work:", error);
    throw error;
  }

  revalidatePath("/work");
  revalidatePath("/work/[slug]");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/work");
}

export async function updateWork(id: string, formData: FormData) {
  const title = formData.get("title");
  const client = formData.get("client");
  const services = formData.get("services") as string | null;
  const year = formData.get("year") as string | null;
  const description = formData.get("description");
  const tags = formData.get("tags");
  const content = formData.get("content");
  const slugInput = formData.get("slug");
  const status = (formData.get("status") as string) || "Draft";
  const image = formData.get("image") as string | null;

  if (
    typeof title !== "string" ||
    typeof client !== "string" ||
    typeof description !== "string" ||
    typeof tags !== "string" ||
    typeof content !== "string"
  ) {
    return { success: false, error: "Missing required fields" };
  }

  const slug =
    typeof slugInput === "string" && slugInput.trim().length > 0
      ? generateSlug(slugInput)
      : generateSlug(title);

  try {
    await prisma.work.update({
      where: { id },
      data: {
        title,
        client,
        services,
        year,
        description,
        tags,
        content,
        slug,
        status,
        image: image || null,
      },
    });

    revalidatePath("/work");
    revalidatePath("/work/[slug]");
    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/work");
    revalidatePath(`/admin/work/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating work:", error);
    return { success: false, error: "Failed to update project. Slug might be duplicate." };
  }
}
