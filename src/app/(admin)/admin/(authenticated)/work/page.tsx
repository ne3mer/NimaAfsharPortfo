import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/Badge";
import { Button, buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { Pencil, PlusCircle } from "lucide-react";
import { createWork } from "@/lib/actions/work";

const STATUS_OPTIONS = ["Live", "In Review", "Draft"];

function splitTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export default async function AdminWorkPage() {
  const works = await prisma.work.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <Button className="rounded-full bg-primary px-6" form="new-work-form" type="submit">
          <PlusCircle className="mr-2 h-4 w-4" />
          Publish work
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
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
                    {splitTags(work.tags).join(", ")}
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
                    <Link
                      href={`/admin/work/${work.id}`}
                      className={buttonVariants({ variant: "outline", className: "h-9 rounded-full border-white/20 text-xs" })}
                    >
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {works.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-white/60"
                  >
                    No work published yet. Use the form to create your first
                    case study.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Create new work
          </h2>
          <form id="new-work-form" action={createWork} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Title
              </label>
              <input
                name="title"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                placeholder="Project title"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Client
              </label>
              <input
                name="client"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                placeholder="Client name"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Slug (optional)
                </label>
                <input
                  name="slug"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                  placeholder="auto-generated from title"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Status
                </label>
                <select
                  name="status"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status} className="bg-black text-white">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Description
              </label>
              <textarea
                name="description"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                rows={3}
                placeholder="Short summary for cards"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Tags (comma separated)
              </label>
              <input
                name="tags"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                placeholder="Next.js, SaaS, AI"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Content
              </label>
              <textarea
                name="content"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                rows={6}
                placeholder="Detailed write-up (supports markdown-style headings)"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Hero image URL (optional)
              </label>
              <input
                name="image"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
                placeholder="/images/work-hero.jpg"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
