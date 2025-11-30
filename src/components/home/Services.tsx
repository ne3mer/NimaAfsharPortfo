"use client";

import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Small Custom Projects",
    price: "€400 - €1,200",
    description: "For early-stage ideas and personal brands.",
    features: [
      "Custom Landing Pages",
      "Simple Web Systems",
      "Admin Panels",
      "Lead Capture Systems",
      "No WordPress / Templates",
    ],
    cta: "Get Started",
    href: "/start?type=small",
  },
  {
    name: "Business Systems",
    price: "€1,500 - €5,000",
    description: "For growing companies needing automation.",
    features: [
      "Custom Dashboards",
      "CRM Systems",
      "Booking & Reservations",
      "Payment Integrations",
      "Multi-user Roles & Permissions",
    ],
    cta: "Build System",
    href: "/start?type=business",
    featured: true,
  },
  {
    name: "SaaS & Startup MVP",
    price: "€6,000+",
    description: "Full product development for serious founders.",
    features: [
      "Product Strategy & Roadmap",
      "Full UI/UX Design",
      "Advanced Backend & API",
      "Auth, Subscriptions, Analytics",
      "Cloud Deployment & Scaling",
    ],
    cta: "Launch Startup",
    href: "/start?type=saas",
  },
  {
    name: "Monthly Retainer",
    price: "€150 - €800/mo",
    description: "Ongoing support and development.",
    features: [
      "Regular Maintenance",
      "Feature Updates",
      "Server Monitoring",
      "Priority Support",
      "Consulting Sessions",
    ],
    cta: "Subscribe",
    href: "/contact",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 text-white">
            Transparent Pricing.<br />
            <span className="text-primary">Professional Execution.</span>
          </h2>
          <p className="text-muted-foreground">
            Choose the package that fits your stage. From simple custom sites to complex SaaS platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative p-6 rounded-2xl border flex flex-col",
                tier.featured
                  ? "bg-white/5 border-primary/50 shadow-2xl shadow-primary/10"
                  : "bg-background border-white/10 hover:border-white/20 transition-colors"
              )}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <div className="text-2xl font-bold text-primary mb-2">{tier.price}</div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                variant={tier.featured ? "default" : "outline"} 
                className="w-full"
                asChild
              >
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
