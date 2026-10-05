"use server";

import { verifyAdminSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateProfile(formData: FormData) {
  const admin = await verifyAdminSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }

  const name = formData.get("name");
  const email = formData.get("email");

  if (typeof name !== "string" || typeof email !== "string") {
    throw new Error("Invalid input");
  }

  try {
    await prisma.admin.update({
      where: { id: admin.id },
      data: { name, email },
    });
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Failed to update profile");
  }

  revalidatePath("/admin/settings");
}

export async function changePassword(formData: FormData) {
  const admin = await verifyAdminSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }

  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    throw new Error("Invalid input");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("New passwords do not match");
  }

  if (newPassword.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const fullAdmin = await prisma.admin.findUnique({
    where: { id: admin.id },
  });

  if (!fullAdmin) {
    throw new Error("Admin not found");
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, fullAdmin.password);

  if (!passwordsMatch) {
    throw new Error("Incorrect current password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashedPassword },
    });
  } catch (error) {
    console.error("Failed to update password:", error);
    throw new Error("Failed to update password");
  }

  revalidatePath("/admin/settings");
}
