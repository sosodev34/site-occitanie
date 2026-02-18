"use client";
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentSection: string;
  cartItemCount: number;
}

export function Header({ onNavigate, currentSection, cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'boxes', label: 'Les box' },
    { id: 'evenements', label: 'Événements' },
    { id: 'a-propos', label: 'À propos' },
  ];

  const handleNavigate = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavigate('accueil')}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center transform transition-transform group-hover:scale-105 shadow-lg">
                <span className="text-lg sm:text-xl text-primary-foreground">❤️</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif tracking-tight text-foreground" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>
                  Cœur d'Occitanie
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Terroir & vibes campus
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative py-2 transition-colors ${
                    currentSection === item.id
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {item.label}
                  {currentSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('panier')}
                className={`relative p-2 transition-colors ${
                  currentSection === 'panier'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </nav>

            {/* Mobile Navigation Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => handleNavigate('panier')}
                className={`relative p-2 transition-colors ${
                  currentSection === 'panier'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-foreground hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-6 py-4 transition-colors border-b border-border last:border-b-0 ${
                  currentSection === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}




