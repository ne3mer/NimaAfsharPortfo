"use client";

import { useState, useTransition } from "react";
import { updateWork } from "@/lib/actions/work";
import { Button } from "@/components/ui/Button";
import { Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface Work {
  id: string;
  title: string;
  slug: string;
  client: string;
  services: string | null;
  year: string | null;
  description: string;
  tags: string;
  content: string;
  status: string;
  image: string | null;
}

const STATUS_OPTIONS = ["Live", "In Review", "Draft"];

export function EditWorkForm({ work }: { work: Work }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await updateWork(work.id, formData);
      
      if (result.success) {
        setMessage({ type: "success", text: "Project updated successfully!" });
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error || "Something went wrong." });
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      {message && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          message.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
        }`}>
          {message.type === "success" ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Title</label>
          <input
            name="title"
            defaultValue={work.title}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Client</label>
          <input
            name="client"
            defaultValue={work.client}
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Services</label>
          <input
            name="services"
            defaultValue={work.services || ""}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
            placeholder="e.g. Full Stack Dev, UI/UX"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Year</label>
          <input
            name="year"
            defaultValue={work.year || ""}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
            placeholder="e.g. 2024"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Slug</label>
          <input
            name="slug"
            defaultValue={work.slug}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.35em] text-white/50">Status</label>
          <select
            name="status"
            defaultValue={work.status}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
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
        <label className="text-xs uppercase tracking-[0.35em] text-white/50">Description</label>
        <textarea
          name="description"
          defaultValue={work.description}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          rows={3}
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.35em] text-white/50">Tags</label>
        <input
          name="tags"
          defaultValue={work.tags}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          placeholder="e.g. Next.js, TypeScript, Tailwind"
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.35em] text-white/50">Content (Markdown)</label>
        <textarea
          name="content"
          defaultValue={work.content}
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors font-mono"
          rows={12}
        />
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.35em] text-white/50">Hero Image URL</label>
        <input
          name="image"
          defaultValue={work.image || ""}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white focus:border-primary/40 focus:outline-none transition-colors"
          placeholder="/images/project-cover.jpg"
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          className="rounded-full bg-primary px-8" 
          type="submit" 
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
