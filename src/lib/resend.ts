import { Resend } from "resend";

export interface EmailConfig {
  apiKey: string | null;
  fromEmail: string | null;
  fromName: string;
  adminEmail: string;
  isConfigured: boolean;
  missing: string[];
}

/**
 * Validates required environment variables for sending emails via Resend.
 */
export function getEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY?.trim() || null;
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || null;
  const fromName = process.env.RESEND_FROM_NAME?.trim() || "Nima Studio";
  const adminEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL?.trim() ||
    process.env.ADMIN_EMAIL?.trim() ||
    "ne3mer@gmail.com";

  const missing: string[] = [];
  if (!apiKey) missing.push("RESEND_API_KEY");
  if (!fromEmail) missing.push("RESEND_FROM_EMAIL");

  return {
    apiKey,
    fromEmail,
    fromName,
    adminEmail,
    isConfigured: missing.length === 0,
    missing,
  };
}

/**
 * Returns an instantiated Resend client if RESEND_API_KEY is present,
 * or null if unconfigured. Never uses a fake fallback key.
 */
export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Lazy proxy maintaining backwards compatibility with `import { resend } from "@/lib/resend"`.
 * Throws a clear error at call-time if RESEND_API_KEY is missing, preventing silent failures.
 */
export const resend: Resend = new Proxy({} as Resend, {
  get(_target, prop) {
    const client = getResendClient();
    if (!client) {
      throw new Error(
        "RESEND_API_KEY is missing. Please configure it in your environment variables."
      );
    }
    const value = (client as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});

