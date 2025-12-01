
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Globe, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
          The Studio Behind<br />
          <span className="text-primary">The Code.</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          NIMA Studio is a distributed collective of senior engineers and designers, led by Nima Afsharfar. We don&apos;t just write code; we build businesses.
        </p>
      </div>

      {/* Founder Story */}
      <div className="container mx-auto px-4 mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-card border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="aspect-square bg-secondary rounded-2xl overflow-hidden relative">
            {/* Placeholder for Headshot */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
              <span className="text-muted-foreground">Nima&apos;s Headshot</span>
            </div>
          </div>
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Founder & Lead Architect
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Nima Afsharfar</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                With over 12 years of experience in full-stack development, I&apos;ve seen the good, the bad, and the ugly of software engineering.
              </p>
              <p>
                I started NIMA Studio with a simple mission: to provide startups and businesses with the kind of engineering quality usually reserved for Silicon Valley giants.
              </p>
              <p>
                We reject the &quot;agency model&quot; of outsourcing to junior devs. When you work with us, you work with senior architects who understand your business goals.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <a href="https://linkedin.com" target="_blank" className={buttonVariants({ variant: "outline" })}>LinkedIn</a>
              <a href="https://github.com" target="_blank" className={buttonVariants({ variant: "outline" })}>GitHub</a>
            </div>
          </div>
        </div>
      </div>

      {/* Values / Team */}
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Globe className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Distributed & Global</h3>
            <p className="text-muted-foreground">
              We recruit the best talent regardless of location. Our team spans Europe and the Middle East, offering 24/7 development cycles.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Zap className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Speed & Quality</h3>
            <p className="text-muted-foreground">
              We use a pre-built &quot;Launchpad&quot; stack (Next.js, Supabase, Stripe) to ship MVPs in weeks, not months, without technical debt.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-white/5 border border-white/5">
            <Users className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">Partners, Not Vendors</h3>
            <p className="text-muted-foreground">
              We don&apos;t just take tickets. We challenge assumptions, suggest features, and help you pivot based on market feedback.
            </p>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to build something great?</h2>
          <Link href="/start" className={buttonVariants({ variant: "premium", size: "lg" })}>
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
