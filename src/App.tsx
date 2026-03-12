"use client";
import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { BoxesSection } from './components/BoxesSection';
import { EventsSection } from './components/EventsSection';
import { AboutSection } from './components/AboutSection';
import { CartSection } from './components/CartSection';
import { Card } from './components/ui/card';
import { Box, CartItem } from './types';
import { boxes } from './data/boxes';
import { Toaster, toast } from 'sonner';

const SECTION_IDS = ['accueil', 'boxes', 'evenements', 'a-propos', 'panier'] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('accueil');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Masquer le badge Next.js Dev Tools (logo "N") en dev
  useEffect(() => {
    const hideDevToolsLogo = () => {
      document
        .querySelectorAll<HTMLElement>('[data-nextjs-dev-tools-button], #next-logo')
        .forEach((el) => {
          el.style.setProperty('display', 'none', 'important');
        });
    };

    hideDevToolsLogo();
    const observer = new MutationObserver(hideDevToolsLogo);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Scroll-spy to highlight the current section in the header.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        const top = visible[0]?.target as HTMLElement | undefined;
        if (top?.id) setActiveSection(top.id as SectionId);
      },
      {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.6],
      }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isStripeSuccess = params.get('stripe_success') === '1';
    const isStripeCancel = params.get('stripe_cancel') === '1';
    const stripeSessionId = params.get('session_id');

    if (isStripeSuccess) {
      localStorage.removeItem('cart');
      setCartItems([]);
      toast.success('Paiement confirmé', {
        description: 'Merci ! Votre précommande est enregistrée.',
      });
      window.history.replaceState({}, '', window.location.pathname);

      if (stripeSessionId) {
        try {
          const key = 'stripe_confirmed_sessions';
          const raw = localStorage.getItem(key);
          const alreadyConfirmed = new Set<string>(
            raw ? (JSON.parse(raw) as string[]) : []
          );

          if (!alreadyConfirmed.has(stripeSessionId)) {
            fetch('/api/confirm', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ sessionId: stripeSessionId }),
            })
              .then(async (res) => {
                const data = (await res.json().catch(() => null)) as
                  | {
                      ok?: boolean;
                      emailStatus?: 'sent' | 'skipped' | 'failed';
                      emailError?: string;
                      to?: string;
                      error?: string;
                    }
                  | null;

                if (!res.ok) {
                  throw new Error(data?.error || `HTTP ${res.status}`);
                }

                if (data?.emailStatus === 'sent' || data?.emailStatus === 'skipped') {
                  alreadyConfirmed.add(stripeSessionId);
                  localStorage.setItem(key, JSON.stringify(Array.from(alreadyConfirmed)));
                }

                if (data?.emailStatus === 'sent') {
                  toast.success('Email de confirmation envoyé', {
                    description: data.to ? `Envoyé à ${data.to}` : undefined,
                  });
                } else if (data?.emailStatus === 'skipped') {
                  toast.info('Paiement confirmé', {
                    description:
                      data.emailError ||
                      "Email de confirmation non configuré pour l'instant.",
                  });
                } else if (data?.emailStatus === 'failed') {
                  toast.error('Paiement confirmé', {
                    description:
                      data.emailError ||
                      "Échec de l'envoi de l'email de confirmation.",
                  });
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error('Paiement confirmé', {
                  description:
                    err instanceof Error
                      ? `Email de confirmation : ${err.message}`
                      : 'Email de confirmation : erreur inconnue',
                });
              });
          }
        } catch (err) {
          console.error(err);
        }
      }

      return;
    }

    if (isStripeCancel) {
      toast.info('Paiement annulé', {
        description: 'Vous pouvez réessayer quand vous voulez.',
      });
      window.history.replaceState({}, '', window.location.pathname);
    }

    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return;

    try {
      const parsed = JSON.parse(savedCart) as unknown;
      if (!Array.isArray(parsed)) return;

      // Always use the current catalog data (prices/description),
      // not stale Box objects from localStorage.
      const boxById = new Map(boxes.map((box) => [box.id, box] as const));

      const restored: CartItem[] = [];
      for (const item of parsed) {
        if (!item || typeof item !== 'object') continue;

        const boxId = (item as any).box?.id;
        const quantity = (item as any).quantity;

        if (typeof boxId !== 'string') continue;
        if (typeof quantity !== 'number' || !Number.isFinite(quantity)) continue;

        const box = boxById.get(boxId);
        if (!box) continue;

        restored.push({ box, quantity: Math.max(1, Math.floor(quantity)) });
      }

      setCartItems(restored);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (box: Box) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.box.id === box.id);
      if (existingItem) {
        toast.success(`Quantité mise à jour : ${box.name}`, {
          description: 'Votre panier a été actualisé',
        });
        return prev.map((item) =>
          item.box.id === box.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast.success(`Box ajoutée au panier : ${box.name}`, {
        description: 'Continuez vos achats ou passez commande',
      });
      return [...prev, { box, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (boxId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.box.id === boxId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (boxId: string) => {
    setCartItems((prev) => prev.filter((item) => item.box.id !== boxId));
    toast.info('Article retiré du panier');
  };

  const handleNavigate = (section: string) => {
    const next = section as SectionId;
    if ((SECTION_IDS as readonly string[]).includes(next)) {
      setActiveSection(next);
    }

    const el = document.getElementById(section);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Toaster 
        position="bottom-right" 
        theme="light"
        toastOptions={{
          style: {
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
      
      <Header
        onNavigate={handleNavigate}
        currentSection={activeSection}
        cartItemCount={cartItemCount}
      />

      <main className="pt-16 sm:pt-20">
        <HeroSection onNavigate={handleNavigate} />

        {/* Concept */}
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2
                className="font-sans font-extrabold tracking-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
              >
                Le concept, en 3 points
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-8 surface rounded-2xl border border-border text-center hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Précommande simple</h3>
                <p className="text-sm text-muted-foreground">
                  Choisis ta box en quelques clics, on prépare le reste.
                </p>
              </Card>
              <Card className="p-8 surface rounded-2xl border border-border text-center hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-foreground mb-2 font-semibold">Format unique</h3>
                <p className="text-sm text-muted-foreground">
                  Une box généreuse, pensée pour les événements et interventions, prête à partager.
                </p>
              </Card>
              <Card
                onClick={() => handleNavigate('liens')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate('liens');
                  }
                }}
                role="button"
                tabIndex={0}
                className="p-8 surface rounded-2xl border border-border text-center hover:shadow-2xl transition-shadow transition-transform duration-300 transform-gpu hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-card"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌾</span>
                </div>
                <h3 className="text-foreground mb-2 font-semibold">100% Occitanie</h3>
                <p className="text-sm text-muted-foreground">
                  Des producteurs locaux, des produits sincères, des saveurs qui racontent le territoire.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <BoxesSection onAddToCart={handleAddToCart} />
        <EventsSection />
        <AboutSection />
        <CartSection
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onNavigate={handleNavigate}
        />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}







