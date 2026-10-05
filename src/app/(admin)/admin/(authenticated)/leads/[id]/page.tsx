import { prisma } from "@/lib/prisma";
import { updateLeadStatus } from "@/lib/actions/leads";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Mail, Calendar, DollarSign, Tag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

export default async function LeadDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!lead) {
    notFound();
  }

  const updateStatus = updateLeadStatus.bind(null, lead.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Lead Details
            </p>
            <h1 className="text-3xl font-bold text-white">{lead.name}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <form action={updateStatus.bind(null, "CONTACTED")}>
            <Button variant="outline" type="submit" disabled={lead.status === "CONTACTED"}>
              Mark Contacted
            </Button>
          </form>
          <form action={updateStatus.bind(null, "CLOSED")}>
            <Button variant="default" type="submit" disabled={lead.status === "CLOSED"}>
              Close Lead
            </Button>
          </form>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Message</h2>
            <p className="text-white/80 leading-relaxed whitespace-pre-wrap">
              {lead.message || "No message provided."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Project Features</h2>
            <div className="flex flex-wrap gap-2">
              {lead.features ? (
                // Assuming features might be stored as a JSON string or comma-separated
                lead.features.split(',').map((feature, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                    {feature.trim().replace(/"/g, '').replace(/\[|\]/g, '')} 
                  </span>
                ))
              ) : (
                <p className="text-white/50">No specific features requested.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${lead.email}`} className="text-white hover:text-primary transition-colors">
                  {lead.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-white/70">
                  {new Date(lead.createdAt).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold text-white mb-4">Project Scope</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/60">
                  <Tag className="h-4 w-4" /> Type
                </span>
                <span className="font-medium text-white">{lead.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white/60">
                  <DollarSign className="h-4 w-4" /> Budget
                </span>
                <span className="font-medium text-white">{lead.budget}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="text-white/60">Status</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
