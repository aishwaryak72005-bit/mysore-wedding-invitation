import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../data/weddingConfig';
import { Crown, Heart, Calendar, MailOpen, Send } from 'lucide-react';

export default function BottomNav({ onReopenEnvelope, isEnvelopeOpen }) {
  const [activeSection, setActiveSection] = useState('procession');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      const sections = ['procession', 'story', 'gajapade', 'ceremonies', 'rsvp'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isEnvelopeOpen) return null;

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[95vw] pointer-events-auto select-none"
      aria-label="Royal Invitation Navigation"
    >
      <div className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full bg-[#0a1128]/95 shadow-2xl border border-royal-gold/50 shadow-black/80">
        {/* Monogram / Top Anchor */}
        <a
          href="#procession"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full hover:bg-royal-gold/20 text-royal-gold transition-colors"
          title="The Royal Procession"
        >
          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold" />
          <span className="font-royal text-[11px] sm:text-xs font-bold tracking-wider text-gold-gradient hidden xs:inline">
            {weddingConfig.couple.groom.firstName[0]}&{weddingConfig.couple.bride.firstName[0]}
          </span>
        </a>

        <div className="w-px h-4 bg-royal-gold/30" />

        {/* Story Link */}
        <a
          href="#story"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-serif uppercase tracking-wider transition-all ${
            activeSection === 'story'
              ? 'bg-royal-gold/25 text-royal-gold-light font-bold border border-royal-gold/40'
              : 'text-royal-cream/75 hover:text-royal-gold'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Story</span>
        </a>

        {/* Gajapade Elephants Link */}
        <a
          href="#gajapade"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-serif uppercase tracking-wider transition-all ${
            activeSection === 'gajapade'
              ? 'bg-royal-gold/25 text-royal-gold-light font-bold border border-royal-gold/40'
              : 'text-royal-cream/75 hover:text-royal-gold'
          }`}
          title="The Sacred Dasara Gajapade"
        >
          <img
            src="/assets/elephant-seal.png"
            alt="Elephant"
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="hidden sm:inline">Elephants</span>
        </a>

        {/* Ceremonies Link */}
        <a
          href="#ceremonies"
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] sm:text-xs font-serif uppercase tracking-wider transition-all ${
            activeSection === 'ceremonies'
              ? 'bg-royal-gold/25 text-royal-gold-light font-bold border border-royal-gold/40'
              : 'text-royal-cream/75 hover:text-royal-gold'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Events</span>
        </a>

        {/* Reopen Envelope */}
        <button
          onClick={onReopenEnvelope}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full text-royal-cream/75 hover:text-royal-gold hover:bg-royal-gold/15 transition-all text-[11px] font-serif uppercase flex items-center gap-1"
          title="Replay 3D Envelope Opening"
          aria-label="Reopen 3D Wedding Envelope"
        >
          <MailOpen className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reopen</span>
        </button>

        <div className="w-px h-4 bg-royal-gold/30" />

        {/* Primary RSVP CTA Button */}
        <a
          href="#rsvp"
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-gold-foil text-royal-midnight font-serif text-[11px] sm:text-xs uppercase tracking-wider font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
        >
          <Send className="w-3 h-3 text-royal-midnight" />
          <span>RSVP</span>
        </a>
      </div>
    </nav>
  );
}
