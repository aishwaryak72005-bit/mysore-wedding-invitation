import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingConfig } from '../data/weddingConfig';
import { Sparkles, Feather } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Scene5CoupleStory() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const contentRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the ornamental transition arch
      gsap.from(frameRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
        scale: 0.92,
        opacity: 0,
        y: 50,
        ease: 'power2.out',
      });

      // Staggered reveal for story paragraphs
      const paragraphs = contentRef.current?.querySelectorAll('p');
      if (paragraphs) {
        gsap.from(paragraphs, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 1.0,
          ease: 'power2.out',
        });
      }

      // Quote reveal
      gsap.from(quoteRef.current, {
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen py-20 sm:py-32 px-3 sm:px-6 lg:px-24 xl:px-32 bg-gradient-to-b from-royal-midnight via-[#090D1C] to-royal-midnight flex items-center justify-center overflow-hidden overflow-x-clip max-w-[100vw]"
    >
      {/* Background ambient gold & ruby dust */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-royal-ruby/15 via-transparent to-transparent" />

      <div className="max-w-6xl w-full mx-auto relative z-10 px-2 sm:px-4">
        {/* Section Proclamation Header */}
        <div className="text-center space-y-2.5 sm:space-y-3 mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-navy/80 border border-royal-gold/40 shadow-royal-gold">
            <Feather className="w-3.5 h-3.5 text-royal-gold" />
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light">
              Scene Five — The Sacred Covenant
            </span>
          </div>
          <h2 className="font-royal text-2xl xs:text-3xl sm:text-5xl text-gold-gradient font-bold tracking-wide">
            {weddingConfig.story.title}
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-royal-cream/80 max-w-md mx-auto">
            {weddingConfig.story.subtitle}
          </p>
        </div>

        {/* Grid: Ornamental Arch Frame with Authentic Couple Portrait & Editorial Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Framed Arch with User's Couple Photo (5 cols) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              ref={frameRef}
              className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[420px] aspect-[1122/1402] flex items-center justify-center select-none"
            >
              {/* Couple Portrait nestled inside the royal ornate arch */}
              <div className="absolute inset-[11%] rounded-2xl overflow-hidden shadow-2xl bg-royal-midnight border border-royal-gold/40 flex flex-col group">
                <img
                  src={weddingConfig.couple.photo}
                  alt={`${weddingConfig.couple.groom.firstName} and ${weddingConfig.couple.bride.firstName}`}
                  className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="font-royal text-lg sm:text-xl text-royal-gold font-bold">
                    {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
                  </p>
                  <p className="text-[10px] font-serif uppercase tracking-widest text-royal-cream/80">
                    Mysuru, Karnataka
                  </p>
                </div>
              </div>

              {/* The Ornate Gold Arch Frame Asset Layered in front */}
              <img
                src="/assets/ornamental-frame.png"
                alt="Mysore Royal Ornamental Arch Frame"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Family Blessings (7 cols) */}
          <div ref={contentRef} className="lg:col-span-7 space-y-7 lg:pl-6">
            {/* Lead Narrative */}
            <div className="space-y-4 text-royal-cream/90 font-serif leading-relaxed text-sm sm:text-base">
              {weddingConfig.story.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-royal first-letter:text-royal-gold first-letter:mr-1 first-letter:float-left">
                  {p}
                </p>
              ))}
            </div>

            {/* Sacred Vedic Quote Box */}
            <div
              ref={quoteRef}
              className="p-5 sm:p-6 rounded-2xl royal-glass border-l-4 border-l-royal-gold relative"
            >
              <p className="font-serif italic text-sm sm:text-base text-royal-gold-light leading-relaxed">
                {weddingConfig.story.quote}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-royal-cream/70 font-sans">
                <span>— Traditional Kannada Wedding Benediction</span>
                <Sparkles className="w-4 h-4 text-royal-gold" />
              </div>
            </div>

            {/* Family Lineage & Blessings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-royal-gold/20">
              <div className="space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-royal-gold font-semibold">
                  Groom's Family
                </span>
                <p className="font-royal text-sm text-royal-ivory font-bold">
                  {weddingConfig.couple.groom.parents}
                </p>
                <p className="text-xs text-royal-cream/70 font-serif italic">
                  {weddingConfig.couple.groom.familyLineage}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-royal-gold font-semibold">
                  Bride's Family
                </span>
                <p className="font-royal text-sm text-royal-ivory font-bold">
                  {weddingConfig.couple.bride.parents}
                </p>
                <p className="text-xs text-royal-cream/70 font-serif italic">
                  {weddingConfig.couple.bride.familyLineage}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-serif italic text-center sm:text-left text-royal-gold-light/80 pt-1">
              {weddingConfig.story.blessing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
