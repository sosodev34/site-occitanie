import { Heart, Instagram, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="font-serif text-foreground">Cœur d'Occitanie</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Terroir & vibes campus. Précommande ta box, récupère-la à l'event, profite.
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
              <li className="text-muted-foreground">
                Montpellier, Occitanie
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="mb-4 text-foreground">Suivez-nous</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Rejoins la team et ne rate aucun event.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
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


