export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-white mb-8">Selected Work</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <span className="text-muted-foreground">Project {i} Placeholder</span>
          </div>
        ))}
      </div>
    </div>
  );
}
