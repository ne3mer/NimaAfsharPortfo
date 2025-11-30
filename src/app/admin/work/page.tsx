import { portfolioData } from "@/data/portfolio";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pencil, PlusCircle } from "lucide-react";

const STATUS = ["Live", "In Review", "Draft"];

export default function AdminWorkPage() {
  const works = portfolioData.map((work, idx) => ({
    ...work,
    status: STATUS[idx % STATUS.length],
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">
            Projects
          </p>
          <h1 className="text-3xl font-bold text-white">Work Library</h1>
          <p className="text-white/60">
            Manage case studies, update hero content, and control visibility.
          </p>
        </div>
        <Button className="rounded-full bg-primary px-6">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create new work
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Tags</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {works.map((work) => (
              <tr key={work.id}>
                <td className="px-6 py-5">
                  <div className="font-semibold text-white">{work.title}</div>
                  <p className="text-xs text-white/50">{work.description}</p>
                </td>
                <td className="px-6 py-5 text-white/70">{work.client}</td>
                <td className="px-6 py-5 text-xs text-white/70">
                  {work.tags.join(", ")}
                </td>
                <td className="px-6 py-5">
                  <Badge
                    variant={
                      work.status === "Live"
                        ? "success"
                        : work.status === "In Review"
                        ? "warning"
                        : "default"
                    }
                  >
                    {work.status}
                  </Badge>
                </td>
                <td className="px-6 py-5 text-right">
                  <Button
                    variant="outline"
                    className="h-9 rounded-full border-white/20 text-xs"
                  >
                    <Pencil className="mr-2 h-3.5 w-3.5" />
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
