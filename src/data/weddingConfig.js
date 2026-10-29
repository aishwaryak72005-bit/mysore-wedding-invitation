/**
 * Wedding Content Configuration
 * Editable configuration for the Royal Mysore Dasara Wedding Invitation
 * Vistarae Creative Studio
 */

export const weddingConfig = {
  // Traditional Invocations
  invocation: {
    sanskrit: "॥ ಶ್ರೀ ರಂಗನಾಥಸ್ವಾಮಿ ಪ್ರಸನ್ನಃ ॥",
    sanskritIast: "|| Sri Ranganathaswamy Prasanna ||",
    english: "With the divine blessings of our ancestors and Lord Sri Ranganathaswamy",
  },

  // Couple Information
  couple: {
    groom: {
      firstName: "Aditya",
      fullName: "Aditya Varma",
      parents: "Smt. Shailaja & Sri. Krishna Murthy Varma",
      familyLineage: "The Varma Family of Bengaluru",
      bio: "Architect & Creative Director who finds poetry in ancient stone and modern design."
    },
    bride: {
      firstName: "Radhika",
      fullName: "Radhika Raj",
      parents: "Smt. Sunitha & Sri. Raghavendra Rao Raj",
      familyLineage: "The Raj Family of Mysuru",
      bio: "Classical vocalist & heritage curator devoted to the living traditions of Karnataka."
    },
    photo: "/assets/couple.jpg", // User-uploaded authentic royal wedding portrait
    weddingDateText: "Sunday, 6th December 2026",
    muhurthamTime: "09:30 AM – 10:45 AM (Dhanur Lagna)",
    city: "Mysuru, Karnataka",
    invitationGreeting: "Together with their beloved families",
    invitationLead: "cordially invite you to grace the auspicious occasion of the wedding ceremonies and bless the union of their children",
  },

  // Our Story
  story: {
    title: "A Royal Chapter",
    subtitle: "From Mysore's Chamundi foothills to a lifelong covenant",
    paragraphs: [
      "Our paths crossed beneath the quiet arches of the Jayalakshmi Vilas Palace, where an impromptu conversation on classical Carnatic ragas and Hoysala temple geometry turned an ordinary autumn afternoon into the genesis of a shared journey.",
      "Over four years of shared dawn walks around Karanji Lake, cherished cups of filter coffee, and deep mutual respect for our heritage, we discovered in each other our truest companion, confidant, and eternal anchor.",
      "As the royal trumpets herald the festive Dasara season, we invite you to be part of our most treasured day as we take our seven sacred steps (Saptapadi) around the holy fire."
    ],
    quote: "“In the sacred presence of fire, under the gaze of heritage, two souls weave their lives into one eternal melody.”",
    blessing: "Your presence and heartfelt blessings are the greatest gifts we could cherish as we commence our new life together."
  },

  // Ceremonies Itinerary
  ceremonies: [
    {
      id: "sangeet",
      title: "Sangeet & Royal Mehfil",
      tagline: "An Evening of Royal Melodies, Dance & Festivities",
      date: "Friday, 4th December 2026",
      time: "06:30 PM Onwards",
      venue: "The Lalitha Mahal Palace Ballroom, Mysuru",
      dressCode: "Regal Indian Glamour / Velvet & Jewel Tones",
      description: "A celebration of music, family dance performances, and traditional feast beneath crystal chandeliers.",
      mapUrl: "https://maps.google.com/?q=Lalitha+Mahal+Palace+Hotel+Mysuru"
    },
    {
      id: "haldi",
      title: "Haldi & Mangala Snanam",
      tagline: "Golden Turmeric, Auspicious Songs & Fragrant Blooms",
      date: "Saturday, 5th December 2026",
      time: "10:00 AM – 01:00 PM",
      venue: "Courtyard of Heritage Villa, Chamundi Hill Road, Mysuru",
      dressCode: "Sunshine Yellow & Traditional Festive Cottons",
      description: "An intimate ritual of turmeric paste, floral blessings, laughter, and fragrant rosewater showers.",
      mapUrl: "https://maps.google.com/?q=Chamundi+Hill+Road+Mysuru"
    },
    {
      id: "muhurtham",
      title: "The Royal Muhurtham",
      tagline: "Sacred Saptapadi & The Wedding Vows",
      date: "Sunday, 6th December 2026",
      time: "09:30 AM – 11:30 AM",
      venue: "The Grand Durbar Kalyana Mantapa, Palace Grounds, Mysuru",
      dressCode: "Traditional Kanjeevaram Silks & Royal Mysore Peta / Dhotis",
      description: "The sacred Vedic wedding rites, Kanyadaana, and Mangalsutra dharana amidst chanting and royal shehnai.",
      mapUrl: "https://maps.google.com/?q=Mysore+Palace+Grounds"
    },
    {
      id: "reception",
      title: "The Grand Royal Reception",
      tagline: "A Twilight Gala Under the Illuminated Palace Arches",
      date: "Sunday, 6th December 2026",
      time: "07:00 PM Onwards",
      venue: "The Royal Durbar Lawns, Mysore Palace Enclosure, Mysuru",
      dressCode: "Royal Traditional / Formal Bandhgalas & Sarees",
      description: "A banquet celebrating the newlyweds with royal Mysore delicacies, live shehnai & sitar symphony.",
      mapUrl: "https://maps.google.com/?q=Mysore+Palace"
    }
  ],

  // Venue & Travel
  venue: {
    name: "The Grand Palace Enclosure & Durbar Hall",
    subName: "Palace Grounds, Sayyaji Rao Road",
    address: "Sayyaji Rao Road, Agrahara, Chamrajpura, Mysuru, Karnataka 570001",
    googleMapsUrl: "https://maps.google.com/?q=Mysore+Palace+Sayyaji+Rao+Road+Mysuru",
    airportInfo: "Mysuru Airport (MYQ) is 12 km away; Kempegowda International Airport (BLR) is 170 km via the 10-lane expressway.",
    trainInfo: "Mysuru Junction (MYS) is 2.5 km from the venue with frequent Vande Bharat connections."
  },

  // RSVP Form Defaults
  rsvp: {
    deadline: "Please respond by 15th November 2026",
    maxGuests: 5,
    mealPreferences: ["Royal South Indian Traditional Feast (Pure Veg)", "Jain Traditional", "Vegan Feast"],
    contactPhone: "+91 98450 12345",
    contactEmail: "weddings@vistarae.com"
  },

  // Studio Credits
  studio: {
    name: "Vistarae Creative Studio",
    tagline: "Architects of Cinematic Heritage Invitations",
    website: "https://vistarae.com",
    watermark: "A Vistarae Heritage Experience"
  }
};
