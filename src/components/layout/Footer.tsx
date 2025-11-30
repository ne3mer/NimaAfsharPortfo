import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-white block mb-6">
              NIMA <span className="text-primary">STUDIO</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Premium custom software development for startups and visionaries. We replace generic templates with high-performance engineering.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Github} />
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/work" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/start" className="hover:text-white transition-colors">Start Project</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Legal</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nima Studio. All rights reserved.</p>
          <p>Designed & Engineered in Europe.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-white/10 hover:text-white transition-colors"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
