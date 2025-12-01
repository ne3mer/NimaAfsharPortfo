import { prisma } from "@/lib/prisma";
import { EditWorkForm } from "@/components/admin/EditWorkForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await prisma.work.findUnique({
    where: { id },
  });

  if (!work) {
    notFound();
  }

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
      </div>

      <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
        <EditWorkForm work={work} />
      </div>
    </div>
  );
}
