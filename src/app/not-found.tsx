import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
      <div className="relative">
        <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
        <h1 className="relative text-9xl font-bold text-white mb-4 tracking-tighter">404</h1>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Lost in Cyberspace?</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Button variant="premium" size="lg" asChild>
        <Link href="/">
          <Home className="mr-2 h-4 w-4" /> Return Home
        </Link>
      </Button>
    </div>
  );
}
