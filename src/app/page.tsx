import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <TechStack />
      <Services />
      <Testimonials />
    </div>
  );
}
