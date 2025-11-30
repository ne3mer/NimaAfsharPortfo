"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";
// We'll use server actions for login in a real app, but for now we'll use a simple form
// that calls signIn from next-auth/react (which we need to wrap or use server actions)
// For simplicity in this step, we'll use a server action in a separate file or inline if possible.
// Actually, let's use the standard next-auth/react signIn for client side, or a server action.
// Let's stick to a server action approach for cleaner Next.js 14 code.

import { authenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        
        <form action={dispatch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required
              className="w-full px-4 py-2 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary"
            />
          </div>
          
          <LoginButton />
          
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="premium" className="w-full" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </Button>
  );
}
