import { verifyAdminSession } from "@/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await verifyAdminSession();
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <AdminShell adminEmail={admin.email} adminName={admin.name}>
      {children}
    </AdminShell>
  );
}
