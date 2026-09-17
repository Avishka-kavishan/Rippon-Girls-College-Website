export interface House {
  id: string;
  name: string;
  color: string;
  textColor: string;
  bgGradient: string;
  borderColor: string;
  motto: string;
  meaning: string;
  namedAfter: string;
  established: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

export interface AcademicStream {
  id: string;
  name: string;
  code: string;
  description: string;
  subjects: string[];
  careerPaths: string[];
  features: string[];
}

export interface ClubSociety {
  id: string;
  name: string;
  category: 'Academic' | 'Cultural & Aesthetic' | 'Leadership & Service' | 'Technology & Media' | 'Spiritual';
  description: string;
  leadTeacher: string;
  meetingDay: string;
  achievements: string[];
}

export interface Sport {
  id: string;
  name: string;
  coach: string;
  season: string;
  achievements: string[];
}

export const SCHOOL_INFO = {
  name: "Rippon Girls' College",
  nativeName: "රිපන් බාලිකා විද්‍යාලය - ගාල්ල",
  location: "Richmond Hill, Galle, Southern Province, Sri Lanka",
  postalCode: "80000",
  establishedYear: 1871,
  motto: "Nisi Dominus Frustra",
  mottoMeaning: "Unless the Lord build the house, they labor in vain",
  vision: "To nurture enlightened, empowered, and virtuous young women equipped with wisdom and modern skills to conquer global frontiers while honoring cultural heritage.",
  mission: "To provide a holistic and vibrant educational environment promoting academic excellence, moral integrity, leadership capabilities, artistic expression, and athletic distinction.",
  type: "National School (1AB School for Girls)",
  studentCount: "3,200+",
  facultyCount: "165+",
  alumnaeCount: "25,000+",
  universityRate: "94.8%",
  phonePrimary: "+94 91 223 4567",
  phoneSecondary: "+94 91 223 8910",
  email: "info@rippongirlscollege.lk",
  principal: {
    name: "Mrs. R. M. D. Samanmalee",
    designation: "Principal (SLEAS I)",
    degrees: "B.Sc., M.Ed., Post Grad. Dip. in Educational Management",
    message: `Welcome to the official digital portal of Rippon Girls' College, Galle. For more than 150 glorious years, our institution has stood as an illustrious beacon of girls' education in Sri Lanka. Nestled upon the historic Richmond Hill in Galle, Rippon continues to mold young girls into confident, empathetic, and intellectually astute global citizens. We balance time-tested traditions with 21st-century technological education, fostering a culture where every young girl discovers her unique genius.`
  }
};

export const HOUSES: House[] = [
  {
    id: "bradby",
    name: "Bradby House",
    color: "#1e40af",
    textColor: "text-blue-700",
    bgGradient: "from-blue-900/90 to-blue-700/80",
    borderColor: "border-blue-500",
    motto: "Strive for the Highest",
    meaning: "Always aim for elevated standards in character, intellect, and leadership.",
    namedAfter: "Miss Bradby (Former Principal)",
    established: "1928",
    iconName: "Shield"
  },
  {
    id: "peake",
    name: "Peake House",
    color: "#b91c1c",
    textColor: "text-red-700",
    bgGradient: "from-red-900/90 to-red-700/80",
    borderColor: "border-red-500",
    motto: "Courage and Honor",
    meaning: "Upholding fearlessness in truth and nobility of spirit in every challenge.",
    namedAfter: "Miss Jane Peake (Founding Principal, 1871)",
    established: "1928",
    iconName: "Flame"
  },
  {
    id: "rippon",
    name: "Rippon House",
    color: "#d97706",
    textColor: "text-amber-600",
    bgGradient: "from-amber-800/90 to-amber-600/80",
    borderColor: "border-amber-500",
    motto: "Faith and Fortitude",
    meaning: "Steadfast faith, moral resilience, and boundless perseverance.",
    namedAfter: "Rev. John Rippon (Pioneering Methodist Founder)",
    established: "1928",
    iconName: "Crown"
  },
  {
    id: "westlake",
    name: "Westlake House",
    color: "#15803d",
    textColor: "text-emerald-700",
    bgGradient: "from-emerald-900/90 to-emerald-700/80",
    borderColor: "border-emerald-500",
    motto: "Service and Sincerity",
    meaning: "Devoted service to society rooted in authentic honesty and kindness.",
    namedAfter: "Miss Westlake (Former Principal)",
    established: "1928",
    iconName: "HeartHandshake"
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: "1871",
    title: "The Genesis on Richmond Hill",
    description: "Founded by Rev. John Rippon of the Wesleyan Methodist Mission with Miss Jane Peake as the first Principal, pioneering female education in the Southern Province.",
    badge: "Foundation"
  },
  {
    year: "1905",
    title: "Expansion & Collegiate Status",
    description: "The school established advanced academic curricula, modern laboratory facilities, and boarding quarters overlooking Galle harbour.",
    badge: "Milestone"
  },
  {
    year: "1928",
    title: "Introduction of the House System",
    description: "Inauguration of Bradby, Peake, Rippon, and Westlake houses to cultivate camaraderie, healthy sportsmanship, and leadership.",
    badge: "Tradition"
  },
  {
    year: "1962",
    title: "Vesting as a Government National School",
    description: "Transitioned to a leading government-assisted national school, expanding accessibility for exceptional students across the island.",
    badge: "Evolution"
  },
  {
    year: "1996",
    title: "Technological & Aesthetic Breakthrough",
    description: "Establishment of the state-of-the-art Computer Resource Centre and the multi-purpose auditorium for performing arts.",
    badge: "Innovation"
  },
  {
    year: "2021",
    title: "Sesquicentennial Jubilee (150 Years)",
    description: "Celebration of 150 glorious years of empowering young Sri Lankan women, marked by the commissioning of the modern Smart Science Complex.",
    badge: "150 Years"
  },
  {
    year: "Present",
    title: "Smart Campus & Global Connections",
    description: "Pioneering STEAM education, digital interactive classrooms, national robotic championships, and international university placements.",
    badge: "Excellence"
  }
];

export const ACADEMIC_STREAMS: AcademicStream[] = [
  {
    id: "biological-science",
    name: "Biological Science",
    code: "BIO-SCI",
    description: "A premier stream preparing future medical practitioners, dental surgeons, biotechnologists, and environmental scientists.",
    subjects: ["Biology", "Chemistry", "Physics", "Agricultural Science"],
    careerPaths: ["Medicine (MBBS)", "Dental Surgery", "Biomedical Sciences", "Genetics", "Pharmacy"],
    features: ["Advanced Microbiology Lab", "Specimen Museum", "Biotech Research Incubator"]
  },
  {
    id: "physical-science",
    name: "Physical Science (Mathematics)",
    code: "MATH-ENG",
    description: "Rigorous curriculum focused on advanced mathematics and physics, fostering top engineering and computing innovators.",
    subjects: ["Combined Mathematics", "Physics", "Chemistry", "Information & Communication Technology (ICT)"],
    careerPaths: ["Civil / Mechanical / Software Engineering", "Data Science", "Aviation", "Architecture"],
    features: ["Physics Mechanics Lab", "Coding Lab", "Robotics Club Workshop"]
  },
  {
    id: "commerce",
    name: "Commerce & Management",
    code: "COMM",
    description: "Equips future chartered accountants, corporate leaders, entrepreneurs, and economists with financial acumen.",
    subjects: ["Accounting", "Business Studies", "Economics", "Business Statistics / ICT"],
    careerPaths: ["Chartered Accountancy (CA / CIMA / ACCA)", "Investment Banking", "Corporate Law", "Marketing"],
    features: ["Mock Stock Exchange Simulation", "Young Entrepreneurs League", "FinTech Workshops"]
  },
  {
    id: "arts-humanities",
    name: "Arts & Humanities",
    code: "ARTS",
    description: "A rich spectrum of languages, social sciences, and aesthetic arts fostering critical thinkers, diplomats, and artists.",
    subjects: ["English / Sinhala / Tamil Literature", "Political Science", "Geography", "Logic & Scientific Method", "Oriental / Western Music", "Dancing", "Drama"],
    careerPaths: ["Diplomacy & Foreign Service", "Law & Judiciary", "Journalism & Media", "Creative Arts"],
    features: ["Language Lab", "Aesthetic Performing Studio", "Debating Chamber"]
  },
  {
    id: "technology",
    name: "Technology Stream",
    code: "TECH",
    description: "Applied sciences and engineering technology equipping students with practical industrial competencies and innovation.",
    subjects: ["Engineering Technology (ET)", "Bio-Systems Technology (BST)", "Science for Technology (SFT)", "ICT / Agro-Tech"],
    careerPaths: ["Applied Engineering", "Food Technology", "Agricultural Tech", "Robotics System Design"],
    features: ["Engineering Mechanical Workshop", "Automated Greenhouse", "Hardware & IoT Testing Bed"]
  }
];

export const CLUBS_SOCIETIES: ClubSociety[] = [
  {
    id: "media-unit",
    name: "Rippon Media & Broadcasting Unit",
    category: "Technology & Media",
    description: "The voice of Rippon, producing daily school news bulletins, live stream events, photography, and documentary journalism.",
    leadTeacher: "Mrs. N. Gunasekara",
    meetingDay: "Tuesdays & Thursdays",
    achievements: ["All-Island Best School Media Unit (Finalist 2024)", "Southern Province Radio Production Champion"]
  },
  {
    id: "science-society",
    name: "Junior & Senior Science Society",
    category: "Academic",
    description: "Fosters scientific curiosity through annual science exhibitions, astronomy nights, and national research Olympiads.",
    leadTeacher: "Mr. K. Senanayake",
    meetingDay: "Wednesdays",
    achievements: ["National Biology Olympiad Gold Medalist", "Sri Lanka Science Fair Top 5 Innovators"]
  },
  {
    id: "interact-club",
    name: "Interact Club of Rippon Girls' College",
    category: "Leadership & Service",
    description: "Sponsored by Rotary Club of Galle, fostering international understanding, community upliftment, and youth leadership.",
    leadTeacher: "Mrs. C. Jayawardene",
    meetingDay: "Fridays",
    achievements: ["District 3220 Best Community Service Project Award", "Annual Coastal Conservation Project"]
  },
  {
    id: "debating-society",
    name: "English & Sinhala Debating Circle",
    category: "Academic",
    description: "Sharpening critical reasoning, parliamentary style oratory, and public discourse.",
    leadTeacher: "Mrs. P. Fernando",
    meetingDay: "Mondays & Thursdays",
    achievements: ["Southern Province Parliamentary Debate Champions", "All-Island Oratory Gold Medal"]
  },
  {
    id: "aeronautical-society",
    name: "Aero & Space Science Society",
    category: "Technology & Media",
    description: "Explores drone tech, aerodynamics, model rocketry, and satellite communications.",
    leadTeacher: "Mr. T. Wickramasinghe",
    meetingDay: "Wednesdays",
    achievements: ["National Water Rocket Championship 1st Runners-up"]
  },
  {
    id: "aesthetic-ensemble",
    name: "Eastern & Western Music Choir & Orchestra",
    category: "Cultural & Aesthetic",
    description: "Orchestral symphonies, traditional Sri Lankan percussion ensembles, and choral harmonies.",
    leadTeacher: "Mrs. V. Weerasinghe",
    meetingDay: "Tuesdays & Fridays",
    achievements: ["All-Island School Choral Festival Champions", "National Folk Dance Gold Trophy"]
  }
];

export const SPORTS_LIST: Sport[] = [
  {
    id: "athletics",
    name: "Track & Field Athletics",
    coach: "Mr. S. Mendis",
    season: "Year-Round",
    achievements: ["All-Island Schools Games 4x100m Gold", "National Junior Athletics High Jump Record"]
  },
  {
    id: "netball",
    name: "Netball",
    coach: "Mrs. H. Dilrukshi",
    season: "Term 1 & Term 2",
    achievements: ["Milo All-Island Netball Tournament Semi-Finalists", "Southern Provincial Champions"]
  },
  {
    id: "badminton",
    name: "Badminton",
    coach: "Mr. R. Alwis",
    season: "Year-Round",
    achievements: ["Sri Lanka Schools Badminton Super League 'A' Division"]
  },
  {
    id: "swimming",
    name: "Swimming & Aquatic Sports",
    coach: "Mr. K. Perera",
    season: "Year-Round",
    achievements: ["National Age Group Aquatic Championship Medals"]
  },
  {
    id: "chess",
    name: "Chess Club & Team",
    coach: "Mrs. M. De Silva",
    season: "Year-Round",
    achievements: ["National Youth Chess Championship Silver Medalist", "Southern Province Inter-School Champions"]
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    coach: "Mr. A. Jayasuriya",
    season: "Term 2 & Term 3",
    achievements: ["All-Island Junior Table Tennis Championship Top 8"]
  }
];

export const SCHOOL_ANTHEM = {
  sinhalaLyrics: [
    "රිපන් මාතා දිනේවා සැරදේවා - විදු නැණ පහනින් අප හද දල්වා",
    "නැණ ගුණ සපිරි දූවරුන් ලෙස සැමදා - ජය කොඩිය නංවමු ලොව සැමදා",
    "රිච්මන්ඩ් ගිරි හිස විදුහල් මාතා - අප දිවි මඟ එළිය කළා සදා",
    "දෙව් පිහිටෙන් නොසැලී පෙරට යමූ - රිපන් නාමය බබළවමු",
    "දිනේවා දිනේවා රිපන් මවුනි - සදා වැජඹේවා විදුහල් මවුනි!"
  ],
  englishTranslation: [
    "Long live mother Rippon, flourishing in glory - lighting our hearts with the lamp of wisdom,",
    "As daughters blessed with wisdom and virtue - we raise the flag of victory across the globe,",
    "Upon the summit of Richmond Hill, our beloved Alma Mater - has illuminated our paths forever,",
    "With divine guidance we march forward unshaken - shining the noble name of Rippon,",
    "Hail, all hail our mother Rippon - thrive forever, cherished Alma Mater!"
  ]
};

export const ALUMNAE_BRANCHES = [
  {
    name: "PPA Galle (Parent Body)",
    president: "Dr. Nilmini Samarasinghe",
    contact: "ppa.galle@rippongirlscollege.lk",
    members: "12,000+",
    location: "Rippon Girls' College Secretariat, Galle"
  },
  {
    name: "PPA Colombo Branch",
    president: "Mrs. Shanthi Wickramatunga",
    contact: "ppa.colombo@rippongirlscollege.lk",
    members: "6,500+",
    location: "Colombo, Sri Lanka"
  },
  {
    name: "PPA United Kingdom Chapter",
    president: "Dr. Anoma Wijesekara",
    contact: "ppa.uk@rippongirlscollege.lk",
    members: "1,200+",
    location: "London, United Kingdom"
  },
  {
    name: "PPA Australia & Oceania Chapter",
    president: "Mrs. Deepika Ratnayake",
    contact: "ppa.australia@rippongirlscollege.lk",
    members: "1,800+",
    location: "Melbourne & Sydney, Australia"
  }
];
