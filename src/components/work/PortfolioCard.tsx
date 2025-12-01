import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type WorkCardData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  tags: string[];
};

export function PortfolioCard({ project }: { project: WorkCardData }) {
  return (
    <Link 
      href={`/work/${project.slug}`}
      className="group relative block bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
    >
      {/* Image Placeholder */}
      <div className="aspect-video bg-secondary w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 p-6 z-20">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
      </div>

      <div className="p-6 flex items-center justify-between border-t border-white/5 bg-card">
        <div className="flex gap-2 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
    </Link>
  );
}
