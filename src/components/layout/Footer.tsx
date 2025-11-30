import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="text-xl font-bold tracking-tighter text-white">
            NIMA <span className="text-primary">STUDIO</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Premium custom software development for startups and visionaries. No templates, just engineering.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/#services" className="hover:text-primary">Web Development</Link></li>
            <li><Link href="/#services" className="hover:text-primary">SaaS Platforms</Link></li>
            <li><Link href="/#services" className="hover:text-primary">UI/UX Design</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/work" className="hover:text-primary">Work</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Connect</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">LinkedIn</a></li>
            <li><a href="#" className="hover:text-primary">Twitter</a></li>
            <li><a href="#" className="hover:text-primary">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nima Studio. All rights reserved.
      </div>
    </footer>
  );
}
