"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Check, Rocket, Smartphone, Globe, Layout, Database } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectType = "landing" | "webapp" | "saas" | "mobile" | "other";
type BudgetRange = "low" | "medium" | "high" | "enterprise";

interface ConfigState {
  type: ProjectType | null;
  features: string[];
  budget: BudgetRange | null;
  name: string;
  email: string;
  details: string;
}

const projectTypes = [
  { id: "landing", title: "Landing Page", icon: Layout, desc: "High-conversion marketing site." },
  { id: "webapp", title: "Web Application", icon: Globe, desc: "Custom functionality & dashboard." },
  { id: "saas", title: "SaaS Platform", icon: Rocket, desc: "Full startup product MVP." },
  { id: "mobile", title: "Mobile App", icon: Smartphone, desc: "iOS & Android application." },
  { id: "other", title: "Custom System", icon: Database, desc: "API, Backend, or Automation." },
];

const featuresList = [
  "User Authentication", "Payment Integration", "Admin Dashboard", 
  "AI Integration", "Real-time Chat", "File Uploads", 
  "Mobile Responsive", "SEO Optimization", "Multi-language"
];

const budgetRanges = [
  { id: "low", label: "€400 - €1,500", desc: "Small projects & MVPs" },
  { id: "medium", label: "€1,500 - €5,000", desc: "Business systems" },
  { id: "high", label: "€5,000 - €15,000", desc: "Full SaaS / Complex apps" },
  { id: "enterprise", label: "€15,000+", desc: "Enterprise solutions" },
];

export function ConfiguratorWizard() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<ConfigState>({
    type: null,
    features: [],
    budget: null,
    name: "",
    email: "",
    details: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const toggleFeature = (feature: string) => {
    setConfig((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const updateField = (field: keyof ConfigState, value: any) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-card border border-white/10 rounded-2xl p-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
          <Check className="h-10 w-10 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Thanks {config.name}. We have received your project details. Nima will review your requirements and get back to you at {config.email} within 24 hours.
        </p>
        <Button variant="outline" onClick={() => window.location.href = "/"}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      {/* Progress Bar */}
      <div className="h-2 bg-secondary w-full">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="p-8 md:p-12 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-white mb-2">What are we building?</h2>
              <p className="text-muted-foreground mb-8">Select the type of project you have in mind.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projectTypes.map((type) => (
                  <button
                    type="button"
                    key={type.id}
                    onClick={() => updateField("type", type.id)}
                    className={cn(
                      "p-6 rounded-xl border text-left transition-all hover:border-primary/50",
                      config.type === type.id
                        ? "bg-primary/10 border-primary ring-1 ring-primary"
                        : "bg-secondary/50 border-white/5 hover:bg-secondary"
                    )}
                  >
                    <type.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold text-white">{type.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Key Features</h2>
              <p className="text-muted-foreground mb-8">Select the core functionalities you need.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {featuresList.map((feature) => (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all flex items-center justify-between",
                      config.features.includes(feature)
                        ? "bg-primary/10 border-primary text-white"
                        : "bg-secondary/50 border-white/5 text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <span className="text-sm font-medium">{feature}</span>
                    {config.features.includes(feature) && <Check className="h-4 w-4 text-primary" />}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Estimated Budget</h2>
              <p className="text-muted-foreground mb-8">This helps us recommend the best tech stack.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {budgetRanges.map((range) => (
                  <button
                    type="button"
                    key={range.id}
                    onClick={() => updateField("budget", range.id)}
                    className={cn(
                      "p-6 rounded-xl border text-left transition-all",
                      config.budget === range.id
                        ? "bg-primary/10 border-primary ring-1 ring-primary"
                        : "bg-secondary/50 border-white/5 hover:bg-secondary"
                    )}
                  >
                    <h3 className="text-xl font-bold text-white">{range.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{range.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold text-white mb-2">Final Step</h2>
              <p className="text-muted-foreground mb-8">Where should we send your project roadmap?</p>
              
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={config.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={config.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">Project Details (Optional)</label>
                  <textarea 
                    value={config.details}
                    onChange={(e) => updateField("details", e.target.value)}
                    className="w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary min-h-[100px]"
                    placeholder="Tell us more about your idea..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-8 border-t border-white/5">
          {step > 1 ? (
            <Button variant="ghost" onClick={prevStep} disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          ) : (
            <div />
          )}
          
          {step < 4 ? (
            <Button 
              variant="premium" 
              onClick={nextStep}
              disabled={
                (step === 1 && !config.type) ||
                (step === 3 && !config.budget)
              }
            >
              Next Step <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="premium" 
              onClick={handleSubmit} 
              disabled={!config.name || !config.email || isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit Project"} 
              {!isSubmitting && <Rocket className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
