import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center text-center px-4">
      <p className="kicker mb-6">— Page not in this issue —</p>
      <h1 className="font-display text-[clamp(6rem,18vw,15rem)] leading-none italic text-sienna">
        404
      </h1>
      <h2 className="mt-4 font-display text-3xl text-ink md:text-[44px]">
        Out of print<span className="text-sienna">.</span>
      </h2>
      <p className="mt-4 max-w-md text-ink-mute">
        The page you&rsquo;re looking for may have moved, been renamed, or is set in a future volume.
      </p>

      <Link href="/" className={`${buttonVariants({ variant: "ink", size: "lg" })} mt-10`}>
        <Home className="me-2 h-4 w-4" strokeWidth={1.5} /> Back to the cover
      </Link>
    </div>
  );
}
