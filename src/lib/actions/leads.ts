"use server";

import { verifyAdminSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
  const admin = await verifyAdminSession();
  if (!admin) {
    throw new Error("Unauthorized");
  }

  await prisma.lead.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/leads");
  revalidatePath("/admin/dashboard");
  revalidatePath(`/admin/leads/${id}`);
}
