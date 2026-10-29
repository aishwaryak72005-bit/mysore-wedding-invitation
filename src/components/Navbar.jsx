import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import { Crown, Sparkles, MailOpen } from 'lucide-react';

export default function Navbar({ onReopenEnvelope, isEnvelopeOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isEnvelopeOpen) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isScrolled ? 'py-3 royal-glass shadow-royal-deep' : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Royal Monogram */}
        <a href="#procession" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-royal-gold/15 border border-royal-gold/60 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Crown className="w-4 h-4 text-royal-gold" />
          </div>
          <span className="font-royal text-sm sm:text-base text-gold-gradient font-bold tracking-widest">
            {weddingConfig.couple.groom.firstName[0]} & {weddingConfig.couple.bride.firstName[0]}
          </span>
        </a>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-serif uppercase tracking-[0.2em] text-royal-cream/80">
          <a href="#procession" className="hover:text-royal-gold transition-colors">Procession</a>
          <a href="#story" className="hover:text-royal-gold transition-colors">Our Story</a>
          <a href="#ceremonies" className="hover:text-royal-gold transition-colors">Ceremonies</a>
          <a href="#rsvp" className="hover:text-royal-gold transition-colors">Venue & RSVP</a>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-serif uppercase tracking-wider text-royal-gold-light/80 hover:text-royal-gold bg-royal-midnight/60 hover:bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold transition-all"
            title="Replay Envelope Opening"
          >
            <MailOpen className="w-3.5 h-3.5 text-royal-gold" />
            <span className="hidden sm:inline">Reopen Envelope</span>
          </button>

          <a
            href="#rsvp"
            className="px-4 py-1.5 rounded-full bg-gold-foil text-royal-midnight font-serif text-xs uppercase tracking-wider font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
          >
            RSVP
          </a>
        </div>
      </div>
    </header>
  );
}
