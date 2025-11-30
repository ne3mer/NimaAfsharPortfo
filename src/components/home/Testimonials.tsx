"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "NIMA Studio didn't just build an app; they built our entire business infrastructure. The level of engineering quality is unmatched.",
    author: "Sarah Jenkins",
    role: "CEO, Nova Finance",
    company: "Fintech Series B"
  },
  {
    quote: "We wasted 6 months with a cheap agency before finding Nima. He fixed our architecture in 2 weeks and launched our MVP a month later.",
    author: "David Chen",
    role: "Founder, CopyFlow",
    company: "AI Startup"
  },
  {
    quote: "The attention to detail in the UI/UX is incredible. Our customers constantly compliment the speed and feel of the platform.",
    author: "Elena Rodriguez",
    role: "Product Director",
    company: "Aura Fashion"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Trusted by Founders.
          </h2>
          <p className="text-muted-foreground">
            We build long-term technical partnerships. Here is what our clients say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/5 relative">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-white mb-6 leading-relaxed">
                "{t.quote}"
              </p>
              <div>
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
                <div className="text-xs text-primary mt-1">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
