import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Play, Pause, FastForward, RotateCcw, Shield, Award, Crown, Info } from 'lucide-react';

export default function RoyalElephantHeritage() {
  // Video playback ref & state
  const videoHeritageRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [walkSpeed, setWalkSpeed] = useState(1.0);
  const [stepCount, setStepCount] = useState(108);

  // Hotspots for Ultra-HD Imperial Tusker (rendered below photo so photo is 100% visible)
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [blessingShower, setBlessingShower] = useState(false);
  const [elephantView, setElephantView] = useState('twins');

  const hotspots = [
    {
      id: 'nettipattam',
      name: 'Swarna Nettipattam',
      subtitle: '24K Gold Forehead Plate',
      x: '38%',
      y: '32%',
      description: 'Handcrafted by master royal goldsmiths of Mysore. Emblazoned with sun and moon motifs representing eternal prosperity, designed to shield the royal tusker and repel all obstacles.'
    },
    {
      id: 'tusks',
      name: 'Suvarna Danta Kavacha',
      subtitle: 'Gold-Capped Sacred Tusks',
      x: '24%',
      y: '58%',
      description: 'Solid brass and gold caps fitted onto the tusks during Vijayadashami, symbolizing sovereign strength and divine majesty.'
    },
    {
      id: 'caparison',
      name: 'Veera Thorana & Jhool',
      subtitle: 'Embroidered Velvet Saddlecloth',
      x: '62%',
      y: '48%',
      description: 'Woven with crimson Mysore silk, zardozi gold threads, and pure pearls. Features traditional Hoysala floral vine arabesques.'
    },
    {
      id: 'bells',
      name: 'Gaja Ghante',
      subtitle: 'Temple Brass Procession Bells',
      x: '52%',
      y: '68%',
      description: 'Sacred heavy brass bells whose rhythmic resonance announces the arrival of the auspicious procession across the Palace Courtyard.'
    }
  ];

  // Rhythmic step counter linked to video playback
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStepCount((prev) => prev + 1);
    }, Math.max(400, 1200 / walkSpeed));

    return () => clearInterval(interval);
  }, [isPlaying, walkSpeed]);

  // Trigger grand celebratory blessing
  const triggerGrandBlessing = () => {
    setBlessingShower(true);
    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6, x: 0.5 },
        colors: ['#ECC876', '#E1B24B', '#6B1D2F', '#FAF6F0', '#B78328']
      });
    } catch (e) {}

    setTimeout(() => setBlessingShower(false), 3500);
  };

  return (
    <section
      id="gajapade"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-24 xl:px-32 bg-gradient-to-b from-royal-midnight via-[#080d1e] to-royal-midnight overflow-hidden border-y border-royal-gold/20"
    >
      {/* Background ornamentation */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal-gold/10 via-royal-deep-ruby/15 to-transparent blur-3xl" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-midnight/90 border border-royal-gold/50 shadow-royal-gold">
            <Crown className="w-3.5 h-3.5 text-royal-gold" />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light">
              Royal Heritage Showcase
            </span>
          </div>

          <h2 className="font-royal text-3xl sm:text-5xl text-gold-gradient font-bold tracking-wide">
            The Sacred Dasara Gajapade
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-royal-cream/80 max-w-xl mx-auto leading-relaxed">
            In Karnataka's royal lineage, elephants are revered as divine guardians (<span className="text-royal-gold font-serif">Gajaraja</span>), bestowing strength, auspicious fortune, and timeless harmony upon the union of Aditya & Radhika.
          </p>
        </div>

        {/* Dual Interactive Elephant Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* Card 1: The Striding Herald Elephant (Dynamic Walking Gait Asset) */}
          <div className="rounded-3xl bg-[#0c152a] border-2 border-royal-gold/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-royal-gold transition-all duration-300">
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-serif uppercase tracking-widest text-royal-gold font-bold">
                  Asset I: Nishane Aane (Herald Tusker)
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-royal-gold/20 text-royal-gold-light border border-royal-gold/30">
                Pristine 240-Frame Motion
              </span>
            </div>

            {/* Video Viewport: Pristine Full-Framed Walking Tusker (Ambari & Legs 100% Uncut) */}
            <div className="relative h-[48vh] sm:h-[54vh] max-h-[500px] aspect-[9/16] rounded-2xl bg-gradient-to-b from-[#050814] to-[#0c152a] border border-royal-gold/30 flex items-center justify-center overflow-hidden shadow-2xl mx-auto my-3">
              <video
                ref={videoHeritageRef}
                src="/assets/elephant-walking-mysore.mp4"
                poster="/assets/elephant-walking-mysore-poster.webp"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-contain relative z-10"
              />
              <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-royal-gold/20" />
            </div>

            {/* Gait Controls & Live Telemetry */}
            <div className="space-y-4 pt-4 border-t border-royal-gold/20">
              <div className="flex items-center justify-between text-xs font-serif text-royal-cream/90">
                <span>Rhythmic Pace: <strong className="text-royal-gold">{walkSpeed.toFixed(1)}x</strong></span>
                <span>Sacred Steps: <strong className="text-royal-gold-light font-mono">{stepCount}</strong></span>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-serif uppercase text-royal-cream/60">Solemn</span>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={walkSpeed}
                  onChange={(e) => {
                    const sp = parseFloat(e.target.value);
                    setWalkSpeed(sp);
                    if (videoHeritageRef.current) videoHeritageRef.current.playbackRate = sp;
                  }}
                  className="flex-1 accent-royal-gold cursor-pointer h-1.5 bg-royal-midnight rounded-lg"
                  aria-label="Adjust walking gait speed"
                />
                <span className="text-[10px] font-serif uppercase text-royal-cream/60">Parade</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    const next = !isPlaying;
                    setIsPlaying(next);
                    if (videoHeritageRef.current) {
                      if (next) videoHeritageRef.current.play().catch(() => {});
                      else videoHeritageRef.current.pause();
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-royal-gold/20 hover:bg-royal-gold text-royal-gold-light hover:text-royal-midnight border border-royal-gold/40 text-xs font-serif uppercase tracking-wider font-semibold transition-all"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pause Gait' : 'Resume Stride'}</span>
                </button>

                <button
                  onClick={() => {
                    setWalkSpeed(1.0);
                    setIsPlaying(true);
                    if (videoHeritageRef.current) {
                      videoHeritageRef.current.playbackRate = 1.0;
                      videoHeritageRef.current.play().catch(() => {});
                    }
                  }}
                  className="p-2 rounded-xl bg-royal-midnight hover:bg-royal-gold/20 border border-royal-gold/30 text-royal-cream hover:text-royal-gold transition-colors"
                  title="Reset Pace"
                  aria-label="Reset walking pace"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: The Imperial Adorned Hero Elephant (Ultra-HD Hero Asset) */}
          <div className="rounded-3xl bg-[#0c152a] border-2 border-royal-gold/40 shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-royal-gold transition-all duration-300">
            {/* Top Badge & View Selector */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-royal-gold animate-ping" />
                <span className="text-[11px] font-serif uppercase tracking-widest text-royal-gold font-bold">
                  Asset II: Imperial Adorned Guardians
                </span>
              </div>
              
              {/* Perspective Switcher */}
              <div className="flex items-center gap-1 p-0.5 rounded-full bg-royal-midnight border border-royal-gold/40">
                <button
                  onClick={() => setElephantView('twins')}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-serif uppercase tracking-wider transition-all ${
                    elephantView === 'twins' ? 'bg-royal-gold text-royal-midnight font-bold' : 'text-royal-cream/70 hover:text-white'
                  }`}
                >
                  Twin Pair
                </button>
                <button
                  onClick={() => setElephantView('left')}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-serif uppercase tracking-wider transition-all ${
                    elephantView === 'left' ? 'bg-royal-gold text-royal-midnight font-bold' : 'text-royal-cream/70 hover:text-white'
                  }`}
                >
                  Left (Mirrored)
                </button>
                <button
                  onClick={() => setElephantView('right')}
                  className={`px-2 py-0.5 rounded-full text-[9px] font-serif uppercase tracking-wider transition-all ${
                    elephantView === 'right' ? 'bg-royal-gold text-royal-midnight font-bold' : 'text-royal-cream/70 hover:text-white'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>

            {/* Clean Image Display (No star overlays, image is 100% visible and unblemished) */}
            <div className="relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-b from-[#050814] to-[#0c152a] border border-royal-gold/25 flex items-center justify-center overflow-hidden shadow-inner my-2">
              <img
                src={
                  elephantView === 'twins'
                    ? '/assets/elephant-twins.png'
                    : elephantView === 'left'
                    ? '/assets/elephant-left.png'
                    : '/assets/elephant-right.png'
                }
                alt="Imperial Adorned Royal Elephant"
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                onClick={triggerGrandBlessing}
                title="Tap image to receive grand royal blessing"
              />
            </div>

            {/* Regalia Lore Pills & Description (Placed cleanly below image to preserve visibility) */}
            <div className="space-y-3 pt-4 border-t border-royal-gold/20 min-h-[92px]">
              <div className="flex flex-wrap items-center gap-1.5">
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-serif uppercase tracking-wider transition-all border ${
                      activeHotspot?.id === h.id
                        ? 'bg-royal-gold text-royal-midnight border-royal-gold font-bold shadow-md'
                        : 'bg-royal-midnight/80 text-royal-cream/80 border-royal-gold/30 hover:border-royal-gold hover:text-white'
                    }`}
                  >
                    {h.name}
                  </button>
                ))}
              </div>

              {activeHotspot ? (
                <div className="p-3 rounded-2xl bg-royal-midnight/90 border border-royal-gold/50 shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-royal text-sm font-bold text-gold-gradient">
                      {activeHotspot.name}
                    </h4>
                    <span className="text-[10px] font-serif uppercase text-royal-gold-light">
                      {activeHotspot.subtitle}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-royal-cream/90 leading-relaxed">
                    {activeHotspot.description}
                  </p>
                </div>
              ) : (
                <div className="p-3 rounded-2xl bg-royal-midnight/60 border border-royal-gold/20 text-xs font-serif text-royal-cream/80 leading-relaxed">
                  <p>
                    The imperial lead tusker carries the revered heritage of Karnataka. Adorned in pure gold regalia, hand-beaten brass bells, and royal velvet zardozi silk. Select any regalia item above or tap the image for royal blessing.
                  </p>
                </div>
              )}

              {/* Grand Blessing Button */}
              <button
                onClick={triggerGrandBlessing}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gold-foil text-royal-midnight font-serif text-xs uppercase tracking-wider font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-royal-midnight" />
                <span>Receive Sacred Gajaraja Blessing</span>
              </button>
            </div>
          </div>
        </div>

        {/* Celebratory Blessing Banner */}
        {blessingShower && (
          <div className="mt-8 p-4 rounded-3xl bg-royal-deep-ruby/95 border-2 border-royal-gold shadow-2xl text-center max-w-lg mx-auto animate-bounce">
            <h3 className="font-royal text-lg text-gold-gradient font-bold tracking-wider">
              ✦ Om Sri Ganeshaaya Namaha ✦
            </h3>
            <p className="text-xs font-serif text-royal-ivory/90 mt-1">
              May the sacred Dasara elephants bestow boundless joy, longevity, and royal grace upon Aditya & Radhika!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
