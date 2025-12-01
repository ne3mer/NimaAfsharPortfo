import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { Testimonials } from "@/components/home/Testimonials";
import { Stats } from "@/components/home/Stats";
import { Process } from "@/components/home/Process";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Stats />
      <TechStack />
      <Services />
      <Process />
      <Testimonials />
      <CTA />
    </div>
  );
}
