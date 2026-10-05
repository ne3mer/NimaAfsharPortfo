"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { authenticate } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, ArrowLeft, Lock } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, dispatch] = useActionState(authenticate, undefined);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07090e] px-4 py-12 text-white">
      {/* Background atmospheric glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to site link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/50 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to public site
          </Link>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-[#0d111d]/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Control Center</h1>
            <p className="mt-1.5 text-xs text-white/50">
              Sign in with your verified administrator credentials
            </p>
          </div>

          <form action={dispatch} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-white/30 transition focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <LoginButton />
            </div>

            {errorMessage && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-xs text-red-300">
                {errorMessage}
              </div>
            )}
          </form>
        </div>

        <p className="mt-6 text-center text-[11px] text-white/30">
          Authorized personnel only • Session protected
        </p>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      variant="premium"
      className="w-full rounded-xl py-3 text-sm font-semibold shadow-lg shadow-primary/20"
      disabled={pending}
    >
      <Lock className="mr-2 h-4 w-4" />
      {pending ? "Verifying..." : "Sign In to Admin"}
    </Button>
  );
}
