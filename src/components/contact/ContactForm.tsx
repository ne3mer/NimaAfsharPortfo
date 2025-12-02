"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === "success") {
    return (
      <div className="p-8 rounded-2xl bg-card border border-white/10 text-center h-full flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
          <CheckCircle className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-8">
          Thanks for reaching out. We'll get back to you shortly.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-card border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {status === "error" && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm font-medium">Something went wrong. Please try again.</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">{t("firstName")}</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">{t("lastName")}</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">{t("email")}</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">{t("message")}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary transition-colors"
          ></textarea>
        </div>
        <Button variant="premium" className="w-full" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              {t("submit")} <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
