import { portfolioData } from "@/data/portfolio";
import { PortfolioCard } from "@/components/work/PortfolioCard";

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          Selected Work
        </h1>
        <p className="text-muted-foreground text-lg">
          A collection of custom software, high-performance web apps, and digital products built for ambitious clients.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
