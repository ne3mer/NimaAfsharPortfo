import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "Contact"});

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("title")}</h1>
            <p className="text-xl text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">{t("info.title")}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">{t("info.email")}</div>
                      <a href="mailto:hello@nimastudio.com" className="text-muted-foreground hover:text-white transition-colors">
                        hello@nimastudio.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">{t("info.phone")}</div>
                      <span className="text-muted-foreground">+1 (555) 123-4567</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="font-medium text-white">{t("info.office")}</div>
                      <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.raw("info.officeDesc") }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
                <h3 className="font-bold text-white mb-2">{t("cta.title")}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("cta.desc")}
                </p>
                <Link href="/start" className={buttonVariants({ variant: "premium", className: "w-full" })}>{t("cta.button")}</Link>
              </div>
            </div>

            {/* Simple Form */}
            <div className="p-8 rounded-2xl bg-card border border-white/10">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">{t("form.firstName")}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">{t("form.lastName")}</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">{t("form.email")}</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">{t("form.message")}</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white focus:outline-none focus:border-primary"></textarea>
                </div>
                <Button variant="premium" className="w-full">{t("form.submit")}</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
