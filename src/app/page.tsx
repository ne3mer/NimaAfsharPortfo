import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services />
    </div>
  );
}
