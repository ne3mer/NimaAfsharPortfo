"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-paper paper-grain paper-vignette flex flex-col items-center justify-center px-4">
      <p className="kicker">— Out of print —</p>
      <h1 className="mt-6 font-display text-[clamp(7rem,22vw,18rem)] leading-none italic text-sienna">
        404
      </h1>
      <h2 className="mt-2 font-display text-3xl text-ink md:text-[44px]">
        This page is not in the issue<span className="text-sienna">.</span>
      </h2>
      <p className="mt-4 max-w-md text-center text-ink-mute">
        The coordinates you&rsquo;re looking for may have moved, been renamed, or are set in a future volume.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/">
          <Button variant="ink" size="lg">
            <Home className="me-2 h-4 w-4" strokeWidth={1.5} />
            Back to the cover
          </Button>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="link-underline inline-flex items-center gap-2 px-3 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute hover:text-sienna"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
          Previous page
        </button>
      </div>
    </div>
  );
}
