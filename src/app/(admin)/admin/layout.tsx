import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
  Briefcase,
} from "lucide-react";
import { signOut } from "@/auth";

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/work", label: "Projects", icon: Briefcase },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#020205] via-[#050416] to-[#080a1b] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[160px]" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-white/10 bg-white/5/50 px-6 py-8 backdrop-blur-lg lg:flex">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">
              Control Center
            </p>
            <h1 className="mt-2 text-2xl font-black tracking-tighter">
              NIMA <span className="text-primary">Operator</span>
            </h1>
          </div>

          <nav className="flex-1 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-white/70 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
              >
                <link.icon className="h-5 w-5 text-white/50 transition group-hover:text-primary" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 space-y-4 text-sm text-white/60">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Uptime
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">99.9%</p>
              <p className="text-xs text-white/50">Last 30 days</p>
            </div>

            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400">
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
