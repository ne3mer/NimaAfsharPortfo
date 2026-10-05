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
    companyUrl: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success && data?.emailSent) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "", companyUrl: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error || t("errorGeneric")
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(t("networkError"));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full bg-transparent border-0 border-b-2 border-ink/30 px-1 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:border-sienna focus-visible:ring-2 focus-visible:ring-sienna focus-visible:ring-offset-2 focus-visible:ring-offset-paper transition-all font-display text-[19px]";

  if (status === "success") {
    return (
      <div className="passepartout flex h-full flex-col items-center justify-center bg-card p-8 text-center md:p-12">
        <span className="flex h-12 w-12 items-center justify-center border border-olive text-olive">
          <CheckCircle className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <h3 className="mt-5 font-display text-3xl italic text-ink md:text-[40px]">
          {t("successTitle")}
        </h3>
        <p className="mt-3 max-w-[40ch] text-ink-mute">
          {t("successDesc")}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setErrorMessage(null);
          }}
        >
          {t("sendAnother")}
        </Button>
      </div>
    );
  }

  return (
    <div className="passepartout bg-card p-6 md:p-10">
      <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-3">
        <p className="kicker">— Letterform —</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          Form 01 / draft
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-7">
        {/* Honeypot field for bot spam protection - hidden from human users */}
        <div
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
          aria-hidden="true"
          tabIndex={-1}
        >
          <label htmlFor="companyUrl">Leave this field blank</label>
          <input
            type="text"
            id="companyUrl"
            name="companyUrl"
            value={formData.companyUrl}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {status === "error" && (
          <div className="flex items-center gap-3 border border-stamp bg-stamp/[0.08] px-4 py-3 text-stamp">
            <AlertCircle className="h-5 w-5 shrink-0" strokeWidth={1.5} />
            <p className="text-sm font-medium">
              {errorMessage || t("errorGeneric")}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          <Field label={t("firstName")} index="01">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              type="text"
              className={inputClass}
              placeholder={t("firstNamePlaceholder")}
            />
          </Field>
          <Field label={t("lastName")} index="02">
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              type="text"
              className={inputClass}
              placeholder={t("lastNamePlaceholder")}
            />
          </Field>
        </div>

        <Field label={t("email")} index="03">
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            className={inputClass}
            placeholder={t("emailPlaceholder")}
          />
        </Field>

        <Field label={t("message")} index="04">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`${inputClass} resize-none border-b-2 leading-relaxed`}
            placeholder={t("briefPlaceholder")}
          />
        </Field>

        <Button
          variant="sienna"
          size="lg"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="me-2 h-4 w-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              {t("submit")} <Send className="ms-2 h-4 w-4 rtl:rotate-180" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}

function Field({
  label,
  index,
  children,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-sienna">
          {index}
        </span>
      </div>
      {children}
    </label>
  );
}
