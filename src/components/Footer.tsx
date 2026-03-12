import Image from 'next/image';
import { Instagram, Linkedin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
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
                  alt="Cœur d'Occitanie"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-serif text-foreground">Cœur d'Occitanie</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Terroir & transmission. Précommande ta box, récupère-la lors de nos événements et rencontres avec les producteurs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('accueil')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('boxes')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Les box
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('evenements')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Événements
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate?.('a-propos')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  À propos
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>contact@coeurdoccitanie.fr</span>
              </li>
              <li className="text-muted-foreground">Montpellier, Occitanie</li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="mb-4 text-foreground">Suivez-nous</h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/coeurdoccitanie/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Rejoins la team et ne rate aucun event.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground">
              Partenaires
            </span>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <Image
                src="/images/boxes/logo-moma.png"
                alt="Université Montpellier Management"
                width={140}
                height={70}
                className="h-12 w-auto object-contain"
              />
              <Image
                src="/images/boxes/logo-moma2.png"
                alt="Université Montpellier Management - Variante"
                width={160}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 Cœur d'Occitanie. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
