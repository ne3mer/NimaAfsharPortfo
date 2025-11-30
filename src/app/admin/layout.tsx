import Link from "next/link";
import { LayoutDashboard, Users, LogOut, Settings } from "lucide-react";
import { signOut } from "@/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tighter">NIMA <span className="text-primary">Admin</span></h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link 
            href="/admin/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link 
            href="/admin/leads" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
          >
            <Users className="h-5 w-5" />
            Leads
          </Link>
          <Link 
            href="/admin/settings" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
            Settings
          </Link>
        </nav>

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors w-full">
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
