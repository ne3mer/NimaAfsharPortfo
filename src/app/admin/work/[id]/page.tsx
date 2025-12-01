import { prisma } from "@/lib/prisma";
import { updateWork } from "@/lib/actions/work";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

const STATUS_OPTIONS = ["Live", "In Review", "Draft"];

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await prisma.work.findUnique({
    where: { id },
  });

  if (!work) {
    notFound();
  }

  const updateWorkWithId = updateWork.bind(null, work.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/work" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Edit Project
            </p>
            <h1 className="text-3xl font-bold text-white">{work.title}</h1>
          </div>
        </div>
        <Button className="rounded-full bg-primary px-6" form="edit-work-form" type="submit">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
        <form id="edit-work-form" action={updateWorkWithId} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Title
              </label>
              <input
                name="title"
                defaultValue={work.title}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Client
              </label>
              <input
                name="client"
                defaultValue={work.client}
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Slug
              </label>
              <input
                name="slug"
                defaultValue={work.slug}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.35em] text-white/50">
                Status
              </label>
              <select
                name="status"
                defaultValue={work.status}
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
              defaultValue={work.description}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
              Tags
            </label>
            <input
              name="tags"
              defaultValue={work.tags}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
              Content
            </label>
            <textarea
              name="content"
              defaultValue={work.content}
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
              rows={12}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-[0.35em] text-white/50">
              Hero Image URL
            </label>
            <input
              name="image"
              defaultValue={work.image || ""}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
