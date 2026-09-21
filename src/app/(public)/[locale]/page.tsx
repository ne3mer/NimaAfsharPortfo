import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";
import { SelectedResults } from "@/components/home/SelectedResults";
import { TargetRoles } from "@/components/home/TargetRoles";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <SelectedResults />
      <TargetRoles />
      <Services />
      <Process />
      <CTA />
    </div>
  );
}
