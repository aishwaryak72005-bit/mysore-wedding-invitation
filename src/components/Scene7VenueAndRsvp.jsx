import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { weddingConfig } from '../data/weddingConfig';
import { MapPin, Navigation, Calendar, Share2, Send, CheckCircle2, User, Phone, Mail, Users, Utensils, MessageSquare, Heart, Sparkles } from 'lucide-react';

export default function Scene7VenueAndRsvp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    attendance: 'attending',
    guestCount: 2,
    mealPreference: weddingConfig.rsvp.mealPreferences[0],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact number.';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebratory gold and ruby petals confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#8B1E3F', '#C5A059', '#6B1D2F']
      });
    } catch (err) {
      // safe fallback
    }

    // Save to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({ ...formData, submittedAt: new Date().toISOString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch (e) {
      // safe ignore
    }

    setIsSubmitted(true);
  };

  const handleWhatsAppShare = () => {
    const text = `Royal Wedding Invitation: Aditya & Radhika are getting married on ${weddingConfig.couple.weddingDateText} in Mysuru. Join us in the royal celebration! ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: 'Aditya & Radhika Royal Wedding Invitation',
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 3000);
    }
  };

  return (
    <section
      id="rsvp"
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 lg:px-24 xl:px-32 bg-gradient-to-b from-royal-midnight via-[#070B17] to-black overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-16 sm:space-y-24">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-navy/80 border border-royal-gold/40 shadow-royal-gold">
            <Heart className="w-3.5 h-3.5 text-royal-gold" />
            <span className="text-[11px] sm:text-xs font-serif uppercase tracking-[0.25em] text-royal-gold-light">
              Scene Seven — Royal Presence & RSVP
            </span>
          </div>
          <h2 className="font-royal text-3xl sm:text-5xl text-gold-gradient font-bold tracking-wide">
            Venue & Guest Confirmation
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-royal-cream/80 max-w-md mx-auto">
            {weddingConfig.rsvp.deadline}
          </p>
        </div>

        {/* Top Split: Venue Information & Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Venue Details Card (7 cols) */}
          <div className="lg:col-span-7 royal-glass rounded-2xl p-7 sm:p-10 border border-royal-gold/40 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-royal-gold text-xs font-serif uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                <span>Wedding Destination</span>
              </div>
              <h3 className="font-royal text-2xl sm:text-3xl text-gold-gradient font-bold">
                {weddingConfig.venue.name}
              </h3>
              <p className="text-sm sm:text-base font-serif text-royal-ivory/90 leading-relaxed">
                {weddingConfig.venue.address}
              </p>
              
              <div className="pt-4 border-t border-royal-gold/20 space-y-2 text-xs font-serif text-royal-cream/70 leading-relaxed">
                <p>• <span className="text-royal-gold-light font-medium">By Air:</span> {weddingConfig.venue.airportInfo}</p>
                <p>• <span className="text-royal-gold-light font-medium">By Rail:</span> {weddingConfig.venue.trainInfo}</p>
              </div>
            </div>

            {/* Actions: Google Maps Directions & WhatsApp Share */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-royal-gold/20">
              <a
                href={weddingConfig.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gold-foil text-royal-midnight font-serif text-xs sm:text-sm uppercase tracking-widest font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Driving Directions</span>
              </a>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-royal-midnight/90 hover:bg-royal-midnight border border-royal-gold/50 hover:border-royal-gold text-royal-gold-light font-serif text-xs sm:text-sm uppercase tracking-wider font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Share2 className="w-4 h-4 text-royal-gold" />
                <span>Share Invitation</span>
              </button>
            </div>
          </div>

          {/* Quick Stats / Summary Card (5 cols) */}
          <div className="lg:col-span-5 royal-glass rounded-2xl p-7 sm:p-8 border border-royal-gold/30 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-royal-gold">
                The Auspicious Date
              </span>
              <h4 className="font-royal text-xl sm:text-2xl text-royal-ivory font-bold">
                {weddingConfig.couple.weddingDateText}
              </h4>
              <p className="text-xs sm:text-sm font-serif italic text-royal-gold-light">
                {weddingConfig.couple.muhurthamTime}
              </p>
              <p className="text-xs font-serif text-royal-cream/70 leading-relaxed pt-2">
                "We humbly seek your blessings, love, and royal company as we celebrate our nuptials."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-royal-deep-ruby/40 border border-royal-gold/30 text-xs font-serif text-royal-cream/80 space-y-1">
              <p className="font-semibold text-royal-gold-light">Need Assistance?</p>
              <p>Email: <a href={`mailto:${weddingConfig.rsvp.contactEmail}`} className="underline hover:text-royal-gold">{weddingConfig.rsvp.contactEmail}</a></p>
              <p>Helpline: <span className="text-royal-ivory">{weddingConfig.rsvp.contactPhone}</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Form: Validated Royal RSVP Form */}
        <div className="royal-glass rounded-3xl p-8 sm:p-12 border-2 border-royal-gold/50 shadow-2xl relative overflow-hidden">
          {/* Subtle watermark background elephant */}
          <div
            className="absolute -right-20 -bottom-20 w-96 h-96 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'url(/assets/elephant-seal.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="text-center space-y-2 mb-8">
                <h3 className="font-royal text-2xl sm:text-3xl text-gold-gradient font-bold">
                  Kindly Confirm Your Attendance
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-royal-cream/80">
                  Please let us know if you will be joining our royal celebration in Mysuru.
                </p>
              </div>

              {/* Attendance Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  formData.attendance === 'attending'
                    ? 'bg-royal-gold/20 border-royal-gold shadow-royal-gold'
                    : 'bg-royal-midnight/50 border-royal-gold/20 hover:border-royal-gold/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="attendance"
                      value="attending"
                      checked={formData.attendance === 'attending'}
                      onChange={() => setFormData({ ...formData, attendance: 'attending' })}
                      className="accent-royal-gold w-4 h-4"
                    />
                    <span className="font-royal text-xs sm:text-sm font-bold text-royal-ivory">
                      Joyfully Accept With Honor
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-royal-gold" />
                </label>

                <label className={`cursor-pointer p-4 rounded-xl border flex items-center justify-between transition-all ${
                  formData.attendance === 'declined'
                    ? 'bg-royal-ruby/30 border-royal-ruby shadow-md'
                    : 'bg-royal-midnight/50 border-royal-gold/20 hover:border-royal-gold/40'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="attendance"
                      value="declined"
                      checked={formData.attendance === 'declined'}
                      onChange={() => setFormData({ ...formData, attendance: 'declined' })}
                      className="accent-royal-gold w-4 h-4"
                    />
                    <span className="font-royal text-xs sm:text-sm font-bold text-royal-ivory">
                      Regretfully Decline With Blessings
                    </span>
                  </div>
                </label>
              </div>

              {/* Guest Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="rsvp-name" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-royal-gold" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Smt. & Sri. Narayana"
                    className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory placeholder-royal-cream/30 text-xs sm:text-sm outline-none transition-colors"
                  />
                  {errors.name && <p className="text-[11px] text-red-400 font-sans">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="rsvp-phone" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-royal-gold" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    id="rsvp-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory placeholder-royal-cream/30 text-xs sm:text-sm outline-none transition-colors"
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 font-sans">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="rsvp-email" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-royal-gold" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="guest@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory placeholder-royal-cream/30 text-xs sm:text-sm outline-none transition-colors"
                  />
                  {errors.email && <p className="text-[11px] text-red-400 font-sans">{errors.email}</p>}
                </div>
              </div>

              {formData.attendance === 'attending' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Guest Count */}
                  <div className="space-y-2">
                    <label htmlFor="rsvp-guests" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-royal-gold" />
                      <span>Number of Attendees</span>
                    </label>
                    <select
                      id="rsvp-guests"
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory text-xs sm:text-sm outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num} className="bg-royal-midnight text-royal-ivory">
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dietary Preference */}
                  <div className="space-y-2">
                    <label htmlFor="rsvp-meal" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-royal-gold" />
                      <span>Culinary Preference</span>
                    </label>
                    <select
                      id="rsvp-meal"
                      value={formData.mealPreference}
                      onChange={(e) => setFormData({ ...formData, mealPreference: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory text-xs sm:text-sm outline-none transition-colors"
                    >
                      {weddingConfig.rsvp.mealPreferences.map((pref, i) => (
                        <option key={i} value={pref} className="bg-royal-midnight text-royal-ivory">
                          {pref}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Warm Message / Wishes */}
              <div className="space-y-2">
                <label htmlFor="rsvp-message" className="text-xs font-serif uppercase tracking-widest text-royal-gold-light flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-royal-gold" />
                  <span>Your Heartfelt Blessings or Note for the Couple (Optional)</span>
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a memory, blessing, or song request..."
                  className="w-full px-4 py-3 rounded-xl bg-royal-midnight/80 border border-royal-gold/30 focus:border-royal-gold text-royal-ivory placeholder-royal-cream/30 text-xs sm:text-sm outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="whitespace-nowrap inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gold-foil text-royal-midnight font-serif text-xs sm:text-sm uppercase tracking-wider sm:tracking-[0.2em] font-bold shadow-royal-gold hover:brightness-110 active:scale-95 transition-all duration-300 max-w-[92vw]"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Transmit Royal RSVP</span>
                </button>
                <p className="text-[11px] font-serif text-royal-cream/50 mt-2">
                  * Note: Responses are registered in this interactive demonstration. For production deployment, connect to your studio CRM or API endpoint.
                </p>
              </div>
            </form>
          ) : (
            /* Confirmation Success State */
            <div className="text-center py-12 px-4 space-y-6 animate-[fadeIn_0.6s_ease-out]">
              <div className="w-16 h-16 mx-auto rounded-full bg-royal-gold/20 border-2 border-royal-gold flex items-center justify-center shadow-royal-glow">
                <CheckCircle2 className="w-8 h-8 text-royal-gold" />
              </div>
              <div className="space-y-2">
                <h4 className="font-royal text-2xl sm:text-3xl text-gold-gradient font-bold">
                  Dhanyavadagalu! Your Response is Honored
                </h4>
                <p className="text-xs sm:text-sm font-serif text-royal-cream/90 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-royal-gold font-semibold">{formData.name}</span>. Your {formData.attendance === 'attending' ? 'warm acceptance' : 'blessings'} have been cordially recorded.
                </p>
              </div>

              <div className="p-4 rounded-xl royal-glass max-w-md mx-auto text-xs font-serif text-royal-cream/80 space-y-1 text-left border border-royal-gold/30">
                <p>• <span className="text-royal-gold-light">Attendance:</span> {formData.attendance === 'attending' ? `Joyfully Attending (${formData.guestCount} Guests)` : 'Regretfully Declining'}</p>
                <p>• <span className="text-royal-gold-light">Contact:</span> {formData.phone} | {formData.email}</p>
                {formData.mealPreference && <p>• <span className="text-royal-gold-light">Preference:</span> {formData.mealPreference}</p>}
                {formData.message && <p>• <span className="text-royal-gold-light">Wishes:</span> "{formData.message}"</p>}
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-royal-gold hover:underline pt-4"
              >
                <span>Submit Another Response</span>
              </button>
            </div>
          )}
        </div>

        {/* Studio Signature & Cultural Respect Footer */}
        <footer className="pt-12 border-t border-royal-gold/20 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-royal-gold/60" />
            <span className="font-royal text-sm text-gold-gradient tracking-widest font-bold">
              {weddingConfig.studio.name}
            </span>
            <span className="w-10 h-px bg-gradient-to-l from-transparent to-royal-gold/60" />
          </div>
          <p className="text-xs font-serif text-royal-cream/60 tracking-wider">
            {weddingConfig.studio.tagline} • Built with devotion for Karnataka's Royal Heritage
          </p>
          <p className="text-[10px] text-royal-cream/40 font-sans">
            Inspired by the magnificent Mysore Dasara Jamboo Savari & the Wodeyar Royal Legacy
          </p>
        </footer>
      </div>
    </section>
  );
}
