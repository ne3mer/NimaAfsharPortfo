import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Leads Management</h1>
          <p className="text-xs text-muted-foreground">
            Submissions captured from the interactive project estimator wizard
          </p>
        </div>
        <div className="self-start sm:self-auto rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground">
          Total: <span className="font-bold text-white">{leads.length}</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-white/10 bg-white/5 font-mono text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Project Type</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 text-xs font-mono text-muted-foreground">
                    {format(new Date(lead.createdAt), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">
                    {lead.type}
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-white">
                    {lead.budget}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        lead.status === "NEW"
                          ? "bg-blue-500/10 text-blue-400"
                          : lead.status === "CONTACTED"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className={buttonVariants({ variant: "outline", className: "h-8 text-xs" })}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    No leads found. Waiting for estimator submissions...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
