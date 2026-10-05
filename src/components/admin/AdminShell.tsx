"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Mail,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { logout } from "@/lib/actions";

interface AdminShellProps {
  children: React.ReactNode;
  adminEmail: string;
  adminName?: string | null;
}

const NAV_LINKS = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/work", label: "Projects", icon: Briefcase },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ children, adminEmail, adminName }: AdminShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") {
      return pathname === "/admin/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="relative min-h-screen bg-[#07090e] text-white">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      {/* Mobile Sticky Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#07090e]/90 px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="text-lg font-bold tracking-tight text-white">
            NIMA <span className="text-primary font-mono text-sm tracking-wider">ADMIN</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg border border-white/10 p-2 text-white/70 hover:bg-white/5 hover:text-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-[#0b0e17] px-6 py-6 shadow-2xl lg:hidden">
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white/10 text-white font-semibold"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-white/50"}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-4 space-y-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-2.5 text-xs text-white/70 hover:bg-white/5 hover:text-white"
            >
              <span>View Public Site</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/60">
              <p className="font-medium text-white truncate">{adminName || "Administrator"}</p>
              <p className="text-white/40 truncate text-[11px]">{adminEmail}</p>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-300 hover:bg-red-500/20"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Desktop Layout Grid */}
      <div className="relative z-10 flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#090c14]/80 px-5 py-6 backdrop-blur-xl lg:flex">
          {/* Brand header */}
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <Link href="/admin/dashboard" className="text-lg font-black tracking-tight text-white">
                NIMA <span className="text-primary font-mono text-sm tracking-wider">ADMIN</span>
              </Link>
            </div>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Studio Control Center
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
                    active
                      ? "border-white/15 bg-white/10 text-white font-semibold shadow-sm"
                      : "border-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 transition ${
                      active ? "text-primary" : "text-white/40 group-hover:text-white/80"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto space-y-3 pt-6 border-t border-white/10">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              <span>View Site</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </Link>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs">
              <p className="font-medium text-white truncate">{adminName || "Administrator"}</p>
              <p className="text-white/40 truncate text-[11px]">{adminEmail}</p>
            </div>

            <form action={logout}>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
