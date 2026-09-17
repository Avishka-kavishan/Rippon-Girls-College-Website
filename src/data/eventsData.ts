export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Academics' | 'Sports' | 'Culture' | 'Achievements' | 'Notices';
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  imageUrl: string;
  featured?: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  category: 'Sports' | 'Academic' | 'Aesthetic' | 'Religious' | 'Alumni';
  date: string;
  time: string;
  venue: string;
  description: string;
  status: 'Upcoming' | 'Completed' | 'Registration Open';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Academics' | 'Sports' | 'Aesthetic' | 'Tradition' | 'Campus';
  imageUrl: string;
  description: string;
  date: string;
}

export const URGENT_NOTICES = [
  {
    id: "notice-1",
    title: "G.C.E. Advanced Level 2026/2027 Admissions: Application Portal is Now Live!",
    date: "September 2026",
    link: "/admissions",
    isUrgent: true
  },
  {
    id: "notice-2",
    title: "Annual Inter-House Athletic Championship scheduled for October 15th at Galle International Stadium.",
    date: "September 2026",
    link: "/news-events",
    isUrgent: false
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "Outstanding Triumphs at the G.C.E. Ordinary Level Examination",
    slug: "outstanding-ol-results-2025",
    category: "Academics",
    date: "Sep 12, 2026",
    readTime: "3 min read",
    featured: true,
    summary: "Rippon students showcase supreme academic distinction with 100% pass rates across core science and commerce subjects.",
    content: [
      "Rippon Girls' College, Galle, has once again stamped its supremacy in the national education arena with an extraordinary performance at the G.C.E. Ordinary Level Examination.",
      "Over 45 candidates obtained straight 9 A's, and the school achieved a record 99.4% overall qualification rate for Advanced Level studies. The Science and Mathematics departments recorded historic 100% pass results.",
      "Principal Mrs. R. M. D. Samanmalee commended the dedicated teaching faculty, parents, and hardworking students for their tireless dedication."
    ],
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "news-2",
    title: "Annual Colours Night 2026 Honours Over 120 Outstanding Sportswomen",
    slug: "colours-night-2026-honours-sportswomen",
    category: "Sports",
    date: "Aug 28, 2026",
    readTime: "4 min read",
    featured: true,
    summary: "Recognizing national and provincial sporting champions in Athletics, Netball, Badminton, Table Tennis, and Swimming.",
    content: [
      "The prestigious Annual Colours Night of Rippon Girls' College was held with grandeur at the College Main Auditorium, celebrating the exceptional athletic triumphs of our students.",
      "National school champion and track athlete Dinithi Jayawardene was crowned Sportswoman of the Year, having set a new national junior record in the high jump event.",
      "Distinguished chief guests and past pupils praised the holistic development of student-athletes who balance vigorous training with academic brilliance."
    ],
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "news-3",
    title: "Rippon Media Unit Wins Gold at All-Island Broadcasting Summit",
    slug: "media-unit-wins-gold-summit-2026",
    category: "Culture",
    date: "Aug 15, 2026",
    readTime: "3 min read",
    featured: false,
    summary: "The College Media Unit swept the best documentary presentation and live commentary categories.",
    content: [
      "The Rippon Media & Broadcasting Unit brought immense pride to the Southern Province by clinching top accolades at the All-Island Inter-School Media & Journalism Competition.",
      "The team demonstrated phenomenal mastery in investigative journalism, studio broadcasting, and digital graphic design.",
      "Special certificates of merit were awarded to the young news anchors for their exemplary diction in both Sinhala and English languages."
    ],
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "news-4",
    title: "Launch of Smart STEAM & AI Innovation Lab",
    slug: "launch-of-smart-steam-ai-lab",
    category: "Achievements",
    date: "Jul 20, 2026",
    readTime: "2 min read",
    featured: false,
    summary: "Commissioning high-performance computing, 3D printers, and robotics kits funded by the Past Pupils' Association.",
    content: [
      "Marking a giant leap into 21st-century technological education, Rippon Girls' College inaugurated its brand-new Smart STEAM & AI Innovation Lab.",
      "The facility is equipped with 40 high-performance workstations, interactive smart boards, 3D printers, and advanced micro-controller kits for robotics and IoT projects.",
      "The project was generously backed by the PPA Colombo and International Chapters in Australia and the UK."
    ],
    imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80"
  }
];

export const UPCOMING_EVENTS: SchoolEvent[] = [
  {
    id: "event-1",
    title: "155th Inter-House Annual Athletic Championship 2026",
    category: "Sports",
    date: "October 15, 2026",
    time: "08:30 AM - 05:30 PM",
    venue: "Galle International Cricket / Athletics Grounds",
    description: "The most anticipated sporting spectacle of the year featuring Bradby, Peake, Rippon, and Westlake houses in track and field showdowns.",
    status: "Upcoming"
  },
  {
    id: "event-2",
    title: "Annual Prize Giving & Academic Convocation 2026",
    category: "Academic",
    date: "November 08, 2026",
    time: "02:00 PM - 06:00 PM",
    venue: "College Main Heritage Auditorium",
    description: "Honoring academic excellence across Grades 1 to 13, national scholarship recipients, and special memorial trophy winners.",
    status: "Upcoming"
  },
  {
    id: "event-3",
    title: "Global Rippon Alumnae Homecoming & Gala Dinner",
    category: "Alumni",
    date: "December 05, 2026",
    time: "06:30 PM Onwards",
    venue: "Jetwing Lighthouse, Galle",
    description: "Uniting generations of Ripponians from across the world for a night of nostalgic celebration and fundraiser for student scholarships.",
    status: "Registration Open"
  },
  {
    id: "event-4",
    title: "Annual Carol Service & Christmas Pageant",
    category: "Aesthetic",
    date: "December 18, 2026",
    time: "05:00 PM - 07:30 PM",
    venue: "College Chapel & Amphitheatre",
    description: "An evening of heavenly harmonies, choral anthems, and festive drama by the Eastern and Western choirs.",
    status: "Upcoming"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Academic Excellence & Graduation Ceremony",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80",
    description: "Graduation celebration of the G.C.E. Advanced Level batch with top national honors.",
    date: "2026"
  },
  {
    id: "gal-2",
    title: "Inter-House March Past & Drill Display",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
    description: "Dynamic squad drills and parade formations during the Inter-House Sports Meet.",
    date: "2026"
  },
  {
    id: "gal-3",
    title: "Traditional Kandyan & Western Symphony",
    category: "Aesthetic",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    description: "Spectacular stage performances at the All-Island Drama & Music Extravaganza.",
    date: "2026"
  },
  {
    id: "gal-4",
    title: "Historic Richmond Hill Campus Architecture",
    category: "Campus",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=80",
    description: "Scenic view of the lush colonial architecture overlooking the Galle coastline.",
    date: "2026"
  },
  {
    id: "gal-5",
    title: "Modern STEAM Innovation & Robotics Lab",
    category: "Academics",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
    description: "Students collaborating on micro-controller robotics and interactive experiments.",
    date: "2026"
  },
  {
    id: "gal-6",
    title: "Prefects' Guild Induction & Oath Ceremony",
    category: "Tradition",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1000&q=80",
    description: "Investiture of the Senior Board of Prefects upholding dignity, duty, and leadership.",
    date: "2026"
  }
];
