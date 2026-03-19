import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Cookie } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { useConsent } from "../lib/consent";

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useI18n();
  const { openPreferences } = useConsent();

  return (
    <footer className="bg-card border-t border-border mt-20" id="liens">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-border shadow-sm bg-card">
                <Image
                  src="/logo.jpg"
                  alt={t("footer.aboutTitle")}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-serif text-foreground" data-i18n="footer.aboutTitle">
                {t("footer.aboutTitle")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed" data-i18n="footer.aboutDesc">
              {t("footer.aboutDesc")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("accueil")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("boxes")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Les box
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("evenements")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Événements
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.("a-propos")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  À propos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-foreground" data-i18n="footer.contact">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" aria-hidden />
                <span>contact@coeurdoccitanie.fr</span>
              </li>
              <li className="text-muted-foreground" data-i18n="footer.location">
                {t("footer.location")}
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="mb-4 text-foreground" data-i18n="footer.follow">
              {t("footer.follow")}
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/coeurdoccitanie/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" aria-hidden />
              </a>
              <a
                href="https://www.linkedin.com"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4" data-i18n="footer.join">
              {t("footer.join")}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground" data-i18n="footer.partners">
              {t("footer.partners")}
            </span>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <a
                href="https://www.montpellier-management.fr/"
                target="_blank"
                rel="noreferrer"
                aria-label="Site Montpellier Management"
                className="block"
              >
                <Image
                  src="/images/boxes/logo-moma.png"
                  alt="Montpellier Management"
                  width={140}
                  height={70}
                  className="h-12 w-auto object-contain"
                />
              </a>
              <a
                href="https://www.umontpellier.fr/"
                target="_blank"
                rel="noreferrer"
                aria-label="Université de Montpellier"
                className="block"
              >
                <Image
                  src="/images/boxes/logo-moma2.png"
                  alt="Université de Montpellier"
                  width={160}
                  height={80}
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p data-i18n="footer.copyright">{t("footer.copyright")}</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
              <Link href="/mentions-legales" className="hover:text-primary transition-colors">
                {t("footer.legal")}
              </Link>
              <Link href="/cgv" className="hover:text-primary transition-colors">
                {t("footer.cgv")}
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-primary transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                {t("footer.cookies")}
              </Link>
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Cookie className="w-4 h-4" aria-hidden />
                {t("footer.manageCookies")}
              </button>
              <Link href="/retractation-retours" className="hover:text-primary transition-colors">
                {t("footer.withdrawal")}
              </Link>
              <Link href="/livraison" className="hover:text-primary transition-colors">
                {t("footer.delivery")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
