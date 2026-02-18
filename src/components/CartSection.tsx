"use client";

import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { CartItem } from '../types';

interface CartSectionProps {
  cartItems: CartItem[];
  onUpdateQuantity: (boxId: string, newQuantity: number) => void;
  onRemoveItem: (boxId: string) => void;
  onNavigate: (section: string) => void;
}

export function CartSection({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
}: CartSectionProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.box.price * item.quantity,
    0
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (isCheckingOut) return;
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            boxId: item.box.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { url?: string; error?: string }
        | null;

      if (!res.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      if (!data?.url) {
        throw new Error('Missing checkout url');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      toast.error('Impossible de démarrer le paiement', {
        description: error instanceof Error ? error.message : 'Erreur inconnue',
      });
      setIsCheckingOut(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section
        className="py-16 sm:py-20 min-h-[60vh] flex items-center scroll-mt-24"
        id="panier"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="font-sans font-extrabold tracking-tight text-foreground text-3xl">
              Panier vide
            </h2>
            <p className="text-muted-foreground">
              Votre panier est vide pour le moment. Découvrez nos délicieuses box
              du terroir !
            </p>
            <Button
              onClick={() => onNavigate('boxes')}
              className="h-auto px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-base"
            >
              <span>Découvrir les box</span>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 scroll-mt-24" id="panier">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('boxes')}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Continuer mes achats</span>
          </button>
          <h2
            className="font-sans font-extrabold tracking-tight text-foreground"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Mon Panier
          </h2>
          <p className="text-muted-foreground mt-2">
            {cartItems.length} {cartItems.length > 1 ? 'box' : 'box'} en
            précommande
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.box.id}
                className="surface rounded-2xl border border-border p-4 sm:p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={item.box.image}
                      alt={item.box.name}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover"
                    />
                  </div>

                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className={[
                            'text-foreground text-lg sm:text-xl mb-1 tracking-tight',
                            item.box.tier === 'premium'
                              ? 'font-serif'
                              : 'font-sans font-bold',
                          ].join(' ')}
                        >
                          {item.box.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Retrait le {item.box.availableDate}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.box.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantité */}
                      <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.box.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.box.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Prix */}
                      <div className="text-right">
                        <div
                          className={[
                            'text-2xl text-primary',
                            item.box.tier === 'premium'
                              ? 'font-serif'
                              : 'font-sans font-extrabold',
                          ].join(' ')}
                        >
                          {(item.box.price * item.quantity).toFixed(2)}€
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            {item.box.price}€ × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="surface rounded-2xl border border-border p-6 sticky top-24 space-y-6 shadow-lg">
              <h3 className="font-sans font-extrabold tracking-tight text-foreground text-xl">
                Récapitulatif
              </h3>

              <div className="space-y-3 py-4 border-y border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Sous-total</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Retrait</span>
                  <span className="text-secondary">Gratuit</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-foreground">Total</span>
                <span className="text-3xl font-sans font-extrabold text-primary">
                  {total.toFixed(2)}€
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full h-auto py-4 px-6 rounded-full shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-base"
              >
                {isCheckingOut ? 'Redirection…' : 'Payer en ligne'}
              </Button>

              <div className="space-y-3 pt-4 text-sm">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary">✓</span>
                  <span>Retrait gratuit lors de l'événement</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary">✓</span>
                  <span>Paiement sécurisé</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-secondary">✓</span>
                  <span>Confirmation par email</span>
                </div>
              </div>

              <div className="p-4 bg-accent/10 rounded-xl text-sm text-muted-foreground">
                💡 Pensez à venir avec votre confirmation de précommande le jour
                de l'événement
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
