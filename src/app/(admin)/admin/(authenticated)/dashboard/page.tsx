import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Briefcase, Users, Mail, ArrowUpRight, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

export default async function DashboardPage() {
  const [workCount, messageCount, leadCount, recentMessages, recentLeads] = await Promise.all([
    prisma.work.count(),
    prisma.contactMessage.count(),
    prisma.lead.count(),
    prisma.contactMessage.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.lead.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
          Executive Overview
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Contact Messages */}
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-white/50">
              Contact Messages
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Mail className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{messageCount}</div>
            <p className="mt-1 text-xs text-white/50">Inquiries submitted via contact form</p>
            <Link
              href="/admin/messages"
              className="mt-4 inline-flex items-center text-xs font-medium text-emerald-400 hover:underline"
            >
              View all messages <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Project Leads */}
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-white/50">
              Project Leads
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{leadCount}</div>
            <p className="mt-1 text-xs text-white/50">Submissions from project estimator</p>
            <Link
              href="/admin/leads"
              className="mt-4 inline-flex items-center text-xs font-medium text-blue-400 hover:underline"
            >
              View all leads <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </Card>

        {/* Portfolio Projects */}
        <Card className="border-white/10 bg-white/[0.03] backdrop-blur-md sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-mono uppercase tracking-wider text-white/50">
              Portfolio Projects
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
              <Briefcase className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-white">{workCount}</div>
            <p className="mt-1 text-xs text-white/50">Database case study records</p>
            <Link
              href="/admin/work"
              className="mt-4 inline-flex items-center text-xs font-medium text-amber-400 hover:underline"
            >
              Manage projects <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-semibold text-white">Recent Messages</h2>
            </div>
            <Link href="/admin/messages" className="text-xs text-white/50 hover:text-white">
              View all ({messageCount})
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentMessages.length === 0 ? (
              <p className="py-6 text-center text-xs text-white/40">No contact messages received yet.</p>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white truncate max-w-[200px]">
                      {msg.firstName} {msg.lastName}
                    </span>
                    <span className="text-[11px] text-white/40 flex items-center gap-1 shrink-0">
                      <Clock className="h-3 w-3" />
                      {format(new Date(msg.createdAt), "MMM d, h:mm a")}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-white/40 truncate">{msg.email}</p>
                  <p className="mt-2 text-xs text-white/70 line-clamp-2 leading-relaxed">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Leads */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Recent Project Leads</h2>
            </div>
            <Link href="/admin/leads" className="text-xs text-white/50 hover:text-white">
              View all ({leadCount})
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {recentLeads.length === 0 ? (
              <p className="py-6 text-center text-xs text-white/40">No estimator leads received yet.</p>
            ) : (
              recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/admin/leads/${lead.id}`}
                  className="block rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-white">{lead.name}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        lead.status === "NEW"
                          ? "bg-blue-500/10 text-blue-400"
                          : lead.status === "CONTACTED"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-white/50">
                    <span>{lead.type} • {lead.budget}</span>
                    <span>{format(new Date(lead.createdAt), "MMM d")}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
