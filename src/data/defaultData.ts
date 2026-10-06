import {
  GalleryItem,
  GalleryCategory,
  NewsItem,
  EventItem,
  AdminMember,
  StudentPopulationStats,
  AchievementItem,
  SiteContentState,
} from "@/types/content";

export const defaultGalleryCategories: GalleryCategory[] = [
  {
    id: "academic",
    label: "Academic",
    icon: "🎓",
    image: "/images/advance.jpeg",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "🏆",
    image: "/images/gallery 2.jpg",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
    image: "/images/band2.jpg",
  },
  {
    id: "arts",
    label: "Arts & Culture",
    icon: "🎭",
    image: "/images/gallery3.jpg",
  },
  {
    id: "events",
    label: "School Events",
    icon: "🎉",
    image: "/images/band.jpg",
  },
  {
    id: "facilities",
    label: "Campus & Facilities",
    icon: "🏫",
    image: "/images/about.png",
  },
];

export const defaultGalleryPhotos: GalleryItem[] = [
  {
    id: "photo-1",
    title: "Interactive Smart Classroom",
    subtitle: "Digital Learning & Modern STEM Education",
    category: "academic",
    image: "/images/Gallery-1.jpeg",
    alt: "Students engaged in interactive digital classroom lesson",
    span: "wide",
  },
  {
    id: "photo-2",
    title: "Celesta '25 Senior Western Band",
    subtitle: "Rippon Girls' College Music Festival",
    category: "events",
    image: "/images/band.jpg",
    alt: "Celesta '25 Senior Western Band at college festival",
    span: "featured",
  },
  {
    id: "photo-3",
    title: "Annual Sports Meet Procession",
    subtitle: "Inter-House Athletic Championships",
    category: "sports",
    image: "/images/band2.jpg",
    alt: "Annual Inter-House Sports Meet marching band procession",
    span: "standard",
  },
  {
    id: "photo-4",
    title: "A/L Excellence Felicitation Ceremony",
    subtitle: "Honoring Outstanding Academic Triumphs",
    category: "achievements",
    image: "/images/gallery 2.jpg",
    alt: "A/L Excellence Felicitation Ceremony with students and staff",
    span: "standard",
  },
  {
    id: "photo-5",
    title: "Traditional Dance & Cultural Troupe",
    subtitle: "Vibrant Sri Lankan Folk & Classical Rhythms",
    category: "arts",
    image: "/images/gallery3.jpg",
    alt: "Traditional cultural dance performance by students",
    span: "wide",
  },
  {
    id: "photo-6",
    title: "Historic Campus Heritage Architecture",
    subtitle: "Est. 1899 — Rich Tradition in Richmond Hill, Galle",
    category: "facilities",
    image: "/images/image 4.png",
    alt: "Historic campus buildings under bright sky",
    span: "standard",
  },
  {
    id: "photo-7",
    title: "Eastern Cultural Music Troupe",
    subtitle: "Traditional Percussion & Instrumental Orchestra",
    category: "arts",
    image: "/images/music.jpg",
    alt: "Eastern traditional music and drum procession",
    span: "standard",
  },
  {
    id: "photo-8",
    title: "National Karate Tournament Representative",
    subtitle: "National School Games Gold & Silver Honors",
    category: "sports",
    image: "/images/news/1.jpg",
    alt: "National school karate tournament medalist",
    span: "standard",
  },
  {
    id: "photo-9",
    title: "3rd Asian Youth Games Kabaddi Representation",
    subtitle: "International Sports Accolades",
    category: "achievements",
    image: "/images/news/2.jpg",
    alt: "Asian Youth Games student sports felicitation",
    span: "standard",
  },
  {
    id: "photo-10",
    title: "Advanced Level Science & Arts Scholars",
    subtitle: "Preparing Future Female Leaders",
    category: "academic",
    image: "/images/advance.jpeg",
    alt: "Advanced level students in white uniform in classroom",
    span: "wide",
  },
  {
    id: "photo-11",
    title: "Junior School Morning Assembly",
    subtitle: "Nurturing Values from Foundation Years",
    category: "events",
    image: "/images/primary.jpg",
    alt: "Primary school assembly and campus life",
    span: "standard",
  },
  {
    id: "photo-12",
    title: "Main Administrative Quadrangle",
    subtitle: "School Grounds & Infrastructure",
    category: "facilities",
    image: "/images/school-building.jpg",
    alt: "Rippon Girls' College main administration building",
    span: "standard",
  },
];

export const defaultNewsData: NewsItem[] = [
  {
    id: "news-1",
    title: "Sri Lanka Girl Guides & Cadet Band Achievement",
    image: "/images/news/1.jpg",
    alt: "Rippon Girls' College Band & Girl Guide Achievement",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#news-1",
  },
  {
    id: "news-2",
    title: "Ruwan Udana National Awards Ceremony",
    image: "/images/news/2.jpg",
    alt: "Students and Teachers Receiving the Ruwan Udana Award",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#news-2",
  },
  {
    id: "news-3",
    title: "All-Island Choir & Performing Arts Honors",
    image: "/images/news/3.jpg",
    alt: "College Choir and Drama Group at National Stage",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#news-3",
  },
];

export const defaultUpcomingEvents: EventItem[] = [
  {
    id: "event-1",
    month: "OCT",
    day: "15",
    title: "Annual Inter-House Athletic Meet",
    time: "8:30 AM",
    venue: "College Main Grounds",
  },
  {
    id: "event-2",
    month: "OCT",
    day: "28",
    title: "Annual Speech Day & Prize Giving",
    time: "9:00 AM",
    venue: "College Main Auditorium",
  },
  {
    id: "event-3",
    month: "NOV",
    day: "08",
    title: "Founders' Day Thanksgiving Service",
    time: "8:00 AM",
    venue: "College Chapel & Hall",
  },
  {
    id: "event-4",
    month: "NOV",
    day: "22",
    title: "English Literary & Drama Festival",
    time: "10:00 AM",
    venue: "Junior College Hall",
  },
  {
    id: "event-5",
    month: "DEC",
    day: "04",
    title: "Prefects' Investiture Ceremony",
    time: "9:30 AM",
    venue: "College Auditorium",
  },
  {
    id: "event-6",
    month: "DEC",
    day: "18",
    title: "Science & Innovation Exhibition",
    time: "9:00 AM",
    venue: "Science Laboratories",
  },
];

export const defaultAdministration: AdminMember[] = [
  {
    id: "admin-1",
    role: "Principal",
    name: "Mrs. M. S. R. Irangani",
    image: "/images/pin.png",
    order: 1,
  },
  {
    id: "admin-2",
    role: "Deputy Principal",
    name: "Mrs. K. A. Nayana",
    image: "/images/pin.png",
    order: 2,
  },
  {
    id: "admin-3",
    role: "Vice Principal",
    name: "Mrs. S. H. Nilmini",
    image: "/images/pin.png",
    order: 3,
  },
];

export const defaultStudentPopulation: StudentPopulationStats = {
  totalCount: "2,690+",
  totalSubText: "Since 1871",
  totalLabel: "Total Students",
  primaryCount: "584+",
  primarySubText: "Grades 1 – 5",
  primaryLabel: "Primary Students",
  secondaryCount: "1,346+",
  secondarySubText: "Grades 6 – 11",
  secondaryLabel: "Secondary Students",
  alCount: "760+",
  alSubText: "Grades 12 – 13",
  alLabel: "Advance Level Students",
};

export const defaultAchievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "All-Island Stage Group Merit Award",
    image: "/images/news/1.jpg",
    alt: "All-Island Choir and Cultural Competition Winners",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-1",
  },
  {
    id: "ach-2",
    title: "Junior Badminton Tournament Team Merit",
    image: "/images/news/2.jpg",
    alt: "Badminton Tournament Medalist",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-2",
  },
  {
    id: "ach-3",
    title: "Cadet & Girl Guide Leadership Excellence",
    image: "/images/news/3.jpg",
    alt: "Band Leader and Cadet Honor Recipient",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-3",
  },
  {
    id: "ach-4",
    title: "Special Recognition: Student Congratulations",
    image: "/images/news/4.jpg",
    alt: "Outstanding Student Recognition",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-4",
  },
  {
    id: "ach-5",
    title: "CELESTA '25 Senior Student Leaders",
    image: "/images/news/5.jpg",
    alt: "Celesta '25 Prefects Guild Members",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-5",
  },
  {
    id: "ach-6",
    title: "Ruwan Udana Trophy Presentation",
    image: "/images/news/6.jpg",
    alt: "Award Winning Students with College Principal",
    description:
      "During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.",
    linkText: "Learn More",
    href: "#ach-6",
  },
];

export const defaultInitialSiteContent: SiteContentState = {
  gallery: defaultGalleryPhotos,
  news: defaultNewsData,
  events: defaultUpcomingEvents,
  administration: defaultAdministration,
  studentPopulation: defaultStudentPopulation,
  achievements: defaultAchievements,
};
