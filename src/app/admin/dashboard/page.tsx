import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowUpRight,
  MessageCircle,
  Plus,
  Sparkles,
  FolderGit2,
} from "lucide-react";

const STATUS_META: Record<
  string,
  { label: string; variant: "default" | "success" | "warning" }
> = {
  Live: { label: "Live", variant: "success" },
  "In Review": { label: "In Review", variant: "warning" },
  Draft: { label: "Draft", variant: "default" },
};

const STATUS_PROGRESS: Record<string, number> = {
  Live: 95,
  "In Review": 70,
  Draft: 35,
};

export default async function DashboardPage() {
  const [leadCounts, latestLeads, works] = await Promise.all([
    prisma.lead.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.work.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
    }),
  ]);

  const totalLeads = leadCounts.reduce((acc, curr) => acc + curr._count._all, 0);
  const newLeadCount =
    leadCounts.find((c) => c.status === "NEW")?._count._all ?? 0;
  const workRows = works.map((work) => {
    const meta = STATUS_META[work.status] ?? STATUS_META["Draft"];
    return {
      id: work.id,
      title: work.title,
      client: work.client,
      slug: work.slug,
      status: meta,
      progress: STATUS_PROGRESS[work.status] ?? 50,
      tags: work.tags,
    };
  });

  return (
    <div className="space-y-10">
      <header className="rounded-[36px] border border-white/10 bg-white/5/10 p-8 shadow-[0_25px_120px_rgba(2,6,23,0.45)] backdrop-blur-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Studio Ops
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Welcome back, Operator
            </h1>
            <p className="text-white/60">
              Monitor works in production and respond to fresh leads.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full border-white/30">
              <Sparkles className="mr-2 h-4 w-4" />
              Automations
            </Button>
            <Button className="rounded-full bg-primary px-6">
              <Plus className="mr-2 h-4 w-4" />
              New Work
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Total Leads"
            value={totalLeads.toString()}
            helper="Across all stages"
          />
          <SummaryCard
            label="Fresh Inquiries"
            value={newLeadCount.toString()}
            helper="+12% week over week"
            highlight
          />
          <SummaryCard
            label="Active Works"
            value={works.length.toString()}
            helper="Tracked projects"
          />
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Works pipeline
              </h2>
              <p className="text-sm text-white/60">
                Manage active case studies and upcoming launches.
              </p>
            </div>
            <Button variant="outline" className="rounded-full border-white/20">
              <FolderGit2 className="mr-2 h-4 w-4" />
              Manage Works
            </Button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/5">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
                <tr>
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Progress</th>
                  <th className="px-6 py-4 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {workRows.map((work) => (
                  <tr key={work.id} className="bg-transparent">
                    <td className="px-6 py-5">
                      <div className="font-semibold text-white">{work.title}</div>
                      <div className="text-xs text-white/50">
                        {work.tags}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-white/70">{work.client}</td>
                    <td className="px-6 py-5">
                      <Badge variant={work.status.variant}>
                        {work.status.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-white">
                        {work.progress}%
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-cyan-400"
                          style={{ width: `${work.progress}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Button
                        variant="outline"
                        className="h-8 rounded-full border-white/20 text-xs"
                      >
                        Open
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6 shadow-inner">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">Message center</h3>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                  Latest leads
                </p>
              </div>
              <Button variant="outline" className="h-9 rounded-full border-white/20 text-xs">
                View all
              </Button>
            </div>

            <div className="space-y-4">
              {latestLeads.length === 0 && (
                <p className="text-sm text-white/50">
                  No new messages yet. Once leads submit projects, they will
                  appear here.
                </p>
              )}
              {latestLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">{lead.name}</p>
                      <p className="text-xs text-white/50">{lead.email}</p>
                    </div>
                    <Badge
                      variant={
                        lead.status === "NEW"
                          ? "warning"
                          : lead.status === "CONTACTED"
                          ? "default"
                          : "success"
                      }
                    >
                      {lead.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    {lead.message?.slice(0, 120) || "No message provided."}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-white/50">
                    <span>{lead.type}</span>
                    <span>
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-cyan-400/10 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-white/60">
              <MessageCircle className="h-4 w-4" />
              Signals
            </div>
            <p className="mt-3 text-lg font-semibold text-white">
              Need to respond to {newLeadCount} new messages.
            </p>
            <p className="text-sm text-white/70">
              Triage leads, update project statuses, and keep your pipeline
              healthy.
            </p>
            <Button className="mt-4 w-full rounded-full bg-white/90 text-black hover:bg-white">
              Review Inbox
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  helper,
  highlight,
}: {
  label: string;
  value: string;
  helper: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-5 py-4 ${
        highlight
          ? "border-primary/40 bg-primary/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/60">{helper}</p>
    </div>
  );
}
