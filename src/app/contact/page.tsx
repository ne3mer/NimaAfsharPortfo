import { Button, buttonVariants } from "@/components/ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have a question or want to discuss a partnership? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">Email</div>
                      <a href="mailto:hello@nimastudio.com" className="text-muted-foreground hover:text-white transition-colors">
                        hello@nimastudio.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">Phone</div>
                      <span className="text-muted-foreground">+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">Office</div>
                      <span className="text-muted-foreground">
                        Distributed Team<br />
                        Based in Europe & Middle East
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
                <h3 className="font-bold text-white mb-2">Ready to start a project?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Use our project configurator to get a custom estimate.
                </p>
                <a href="/start" className={buttonVariants({ variant: "premium", className: "w-full" })}>Start Project Configurator</a>
              </div>
            </div>

            {/* Simple Form */}
            <div className="p-8 rounded-2xl bg-card border border-white/10">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary"></textarea>
                </div>
                <Button variant="premium" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
