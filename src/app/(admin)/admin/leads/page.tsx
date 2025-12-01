import { prisma } from "@/lib/prisma";
import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <Button variant="outline">Export CSV</Button>
      </div>

      <div className="bg-card border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10 text-sm uppercase text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Project Type</th>
              <th className="px-6 py-4 font-medium">Budget</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-white">{lead.name}</div>
                  <div className="text-sm text-muted-foreground">{lead.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {lead.type}
                </td>
                <td className="px-6 py-4 text-sm text-white">
                  {lead.budget}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-500' : 
                      lead.status === 'CONTACTED' ? 'bg-yellow-500/10 text-yellow-500' : 
                      'bg-green-500/10 text-green-500'}`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/admin/leads/${lead.id}`} className={buttonVariants({ variant: "outline", className: "h-8 text-xs" })}>View</Link>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                  No leads found. Waiting for submissions...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
