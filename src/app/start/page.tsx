import { ConfiguratorWizard } from "@/features/configurator/ConfiguratorWizard";

export default function StartPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
          Build Your Product
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Use our interactive configurator to define your project scope and get an estimated roadmap.
        </p>
      </div>
      
      <ConfiguratorWizard />
    </div>
  );
}
