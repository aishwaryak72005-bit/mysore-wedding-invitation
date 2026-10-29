import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene1Envelope from './components/Scene1Envelope';
import UnifiedCinematicController from './components/UnifiedCinematicController';
import RoyalProcessionExperience from './components/RoyalProcessionExperience';
import GoldenAmbariScroll from './components/GoldenAmbariScroll';
import Scene5CoupleStory from './components/Scene5CoupleStory';
import RoyalElephantHeritage from './components/RoyalElephantHeritage';
import Scene6CeremonySchedule from './components/Scene6CeremonySchedule';
import Scene7VenueAndRsvp from './components/Scene7VenueAndRsvp';
import AudioAccompaniment from './components/AudioAccompaniment';
import BottomNav from './components/BottomNav';
import StickyTwinGuardians from './components/StickyTwinGuardians';
import PushpaVrushti from './components/PushpaVrushti';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [startAudio, setStartAudio] = useState(false);

  useEffect(() => {
    if (isEnvelopeOpen) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isEnvelopeOpen]);

  const handleEnvelopeComplete = () => {
    setIsEnvelopeOpen(true);
    setStartAudio(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSkipIntro = () => {
    setIsEnvelopeOpen(true);
    setStartAudio(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  window.__skipIntro = handleSkipIntro;

  const handleReopenEnvelope = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsEnvelopeOpen(false);
  };

  return (
    <div className="min-h-screen bg-royal-midnight text-royal-ivory selection:bg-royal-gold selection:text-royal-midnight font-sans">
      {/* Scene 1: The Royal Physical 3D Envelope */}
      {!isEnvelopeOpen && (
        <Scene1Envelope
          onOpenComplete={handleEnvelopeComplete}
          onSkipIntro={handleSkipIntro}
        />
      )}

      {/* Main Unified Experience (Retains All Rich Scroll Features + Video Auto-Cruise Mode) */}
      <div className={`transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Unified Cinematic Controller: Top Story Bar & Video Tour Play/Pause Controls */}
        <UnifiedCinematicController
          isEnvelopeOpen={isEnvelopeOpen}
          onReopenEnvelope={handleReopenEnvelope}
        />

        <BottomNav
          isEnvelopeOpen={isEnvelopeOpen}
          onReopenEnvelope={handleReopenEnvelope}
        />

        <main>
          {/* Scenes 2, 3, 4: Palace Reveal, Parasols & Royal Elephant Procession */}
          <RoyalProcessionExperience />

          {/* Innovation 3: The Unfurling of the Golden Ambari Scroll (Kalyana Shasana) */}
          <GoldenAmbariScroll />

          {/* Scene 5: The Couple's Story */}
          <Scene5CoupleStory />

          {/* The Sacred Dasara Gajapade (Innovative Dual Elephant Experience) */}
          <RoyalElephantHeritage />

          {/* Scene 6: Ceremony Schedule */}
          <Scene6CeremonySchedule />

          {/* Scene 7: Venue, Map & RSVP */}
          <Scene7VenueAndRsvp />
        </main>

        {/* Sticky Twin Royal Elephant Guardians (Desktop and Mobile Docked) */}
        <StickyTwinGuardians isEnvelopeOpen={isEnvelopeOpen} />

        {/* Innovation 2: Auspicious Petal Shower (Pushpa Vrushti) */}
        <PushpaVrushti isActive={isEnvelopeOpen} />

        {/* Royal Ambient Audio Accompaniment */}
        {isEnvelopeOpen && <AudioAccompaniment autoPlayTrigger={startAudio} />}
      </div>
    </div>
  );
}
