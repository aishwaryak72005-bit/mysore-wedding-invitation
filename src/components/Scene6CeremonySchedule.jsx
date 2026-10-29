import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../data/weddingConfig';
import { Calendar, Clock, MapPin, Sparkles, Shirt, ExternalLink, CalendarPlus, Crown, Music, Flower2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom elephant herald badges for each ceremony (clean SVG icons, zero unwanted emojis)
const CEREMONY_HERALDS = [
  {
    subtitle: 'Nishane Herald • Musical Celebrations',
    badge: 'Festive Gajapade',
    iconType: 'music'
  },
  {
    subtitle: 'Dawn Herald • Haldi & Floral Blessings',
    badge: 'Mangala Gajaraja',
    iconType: 'flower'
  },
  {
    subtitle: 'Sacred Ambari • Vedic Saptapadi Rites',
    badge: 'Swarna Ambari Tusker',
    iconType: 'crown'
  },
  {
    subtitle: 'Durbar Royal Herald • Twilight Gala',
    badge: 'Durbar Gajapade',
    iconType: 'sparkles'
  }
];

export default function Scene6CeremonySchedule() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Safe one-way reveal that never hides cards on scroll
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: idx * 0.1,
            ease: 'power2.out',
            clearProps: 'transform,opacity', // Clears inline styles so cards remain 100% visible
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addToCalendar = (ceremony) => {
    const title = encodeURIComponent(`${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} — ${ceremony.title}`);
    const details = encodeURIComponent(`${ceremony.tagline}\n\nDress Code: ${ceremony.dressCode}\n\n${ceremony.description}`);
    const location = encodeURIComponent(ceremony.venue);
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(googleCalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      ref={sectionRef}
      id="ceremonies"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-24 xl:px-32 bg-[#050814] overflow-hidden"
    >
      {/* Background ornamentation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0d1b2a]/90 via-[#050814] to-[#050814]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-royal-deep-ruby/20 via-transparent to-transparent" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0c152a] border border-royal-gold/60 shadow-royal-gold">
            <Sparkles className="w-3.5 h-3.5 text-royal-gold" />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light font-bold">
              Scene Six — Auspicious Celebrations
            </span>
          </div>

          <h2 className="font-royal text-3xl sm:text-5xl text-gold-gradient font-bold tracking-wide">
            Ceremony Itinerary
          </h2>

          <p className="text-xs sm:text-sm font-serif italic text-royal-cream/90 max-w-lg mx-auto leading-relaxed">
            Each sacred moment is choreographed to honor Karnataka's royal traditions, heralded in divine reverence by the Dasara elephants.
          </p>

          {/* Elephant Procession Herald Banner */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <img
              src="/assets/elephant-seal.png"
              alt="Royal Elephant Herald"
              className="w-7 h-7 object-contain drop-shadow"
            />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.2em] text-royal-gold">
              Heralded by the Royal Dasara Gajapade
            </span>
            <img
              src="/assets/elephant-seal.png"
              alt="Royal Elephant Herald"
              className="w-7 h-7 object-contain drop-shadow transform scale-x-[-1]"
            />
          </div>
        </div>

        {/* Ceremonies Grid (High Contrast, Guaranteed Permanent Visibility) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {weddingConfig.ceremonies.map((ceremony, idx) => {
            const herald = CEREMONY_HERALDS[idx] || CEREMONY_HERALDS[0];

            return (
              <div
                key={ceremony.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="group relative rounded-3xl bg-[#0c152a] p-7 sm:p-9 border-2 border-royal-gold/40 hover:border-royal-gold transition-all duration-300 shadow-2xl flex flex-col justify-between"
                style={{ opacity: 1 }} // Guaranteed fallback visibility
              >
                {/* Top Corner Motif & Herald Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-royal-gold/25 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-royal-gold/15 border border-royal-gold/40 flex items-center justify-center text-royal-gold">
                      {herald.iconType === 'music' && <Music className="w-3.5 h-3.5" />}
                      {herald.iconType === 'flower' && <Flower2 className="w-3.5 h-3.5" />}
                      {herald.iconType === 'crown' && <Crown className="w-3.5 h-3.5" />}
                      {herald.iconType === 'sparkles' && <Sparkles className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-widest text-royal-gold font-bold">
                      {herald.badge}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono uppercase tracking-widest text-royal-gold/70 px-2.5 py-0.5 rounded-full border border-royal-gold/30 bg-royal-midnight/80">
                    0{idx + 1}
                  </div>
                </div>

                <div>
                  {/* Event Title & Subtitle */}
                  <div className="space-y-1.5 mb-5">
                    <h3 className="font-royal text-2xl sm:text-3xl text-gold-gradient font-bold group-hover:text-royal-gold-light transition-colors">
                      {ceremony.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif italic text-royal-gold-light font-medium">
                      {ceremony.tagline}
                    </p>
                  </div>

                  {/* Event Logistics (High Contrast) */}
                  <div className="space-y-3 my-5 py-4 border-y border-royal-gold/20 text-xs sm:text-sm font-serif text-white">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-royal-gold shrink-0" />
                      <span className="font-bold text-royal-ivory tracking-wide">{ceremony.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-royal-gold shrink-0" />
                      <span className="text-royal-cream font-medium">{ceremony.time}</span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                      <span className="text-royal-cream/90">{ceremony.venue}</span>
                    </div>

                    <div className="flex items-center gap-3 text-royal-gold-light">
                      <Shirt className="w-4 h-4 text-royal-gold shrink-0" />
                      <span className="text-xs font-medium">Attire: {ceremony.dressCode}</span>
                    </div>
                  </div>

                  {/* Event Description */}
                  <p className="text-xs sm:text-sm font-serif text-royal-cream/85 leading-relaxed mb-6">
                    {ceremony.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-3 border-t border-royal-gold/20">
                  <button
                    onClick={() => addToCalendar(ceremony)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gold-foil text-royal-midnight font-serif text-xs uppercase tracking-wider font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
                  >
                    <CalendarPlus className="w-4 h-4 text-royal-midnight" />
                    <span>Add To Calendar</span>
                  </button>

                  <a
                    href={ceremony.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-royal-midnight hover:bg-royal-gold/20 border border-royal-gold/40 hover:border-royal-gold text-royal-gold-light transition-colors"
                    aria-label={`View ${ceremony.title} venue on Google Maps`}
                    title="View venue directions on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
