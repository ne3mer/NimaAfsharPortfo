import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfile, changePassword } from "@/lib/actions/settings";
import { Button } from "@/components/ui/Button";
import { Save, Lock, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  const admin = await prisma.admin.findUnique({
    where: { email: session.user.email },
  });

  if (!admin) {
    // Should not happen if session is valid, but handle gracefully
    return <div>Admin not found</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-white/50">
          Configuration
        </p>
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-white/60">
          Manage your profile and security preferences.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Settings */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">Profile</h2>
          </div>
          
          <form action={updateProfile} className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Name
              </label>
              <input
                name="name"
                defaultValue={admin.name || ""}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Email
              </label>
              <input
                name="email"
                type="email"
                defaultValue={admin.email}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <Button className="w-full rounded-full bg-white/10 hover:bg-white/20" type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Profile
            </Button>
          </form>
        </div>

        {/* Security Settings */}
        <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-full bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold text-white">Security</h2>
          </div>

          <form action={changePassword} className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Current Password
              </label>
              <input
                name="currentPassword"
                type="password"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                New Password
              </label>
              <input
                name="newPassword"
                type="password"
                required
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <Button className="w-full rounded-full bg-primary hover:bg-primary/90" type="submit">
              <Save className="mr-2 h-4 w-4" />
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
