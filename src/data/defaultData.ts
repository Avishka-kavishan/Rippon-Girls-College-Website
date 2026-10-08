import {
  GalleryItem,
  GalleryCategory,
  NewsItem,
  EventItem,
  AdminMember,
  StudentPopulationStats,
  AchievementItem,
  ContactDepartment,
  ContactVisitingItem,
  ContactFaq,
  ContactPageDetails,
  ContactInquiry,
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

export const defaultContactDepartments: ContactDepartment[] = [
  {
    id: "dept-1",
    title: "Principal's Office",
    desc: "Executive administration, institutional governance, appointments, and official delegations.",
    phone: "+94 91 223 4770",
    email: "principal@rippongirlscollege.lk",
    iconName: "Building",
  },
  {
    id: "dept-2",
    title: "Admissions & Student Affairs",
    desc: "Grade 1 admissions, mid-year secondary school admissions, and G.C.E. Advanced Level streaming.",
    phone: "+94 91 223 4769 Ext. 102",
    email: "admissions@rippongirlscollege.lk",
    iconName: "GraduationCap",
  },
  {
    id: "dept-3",
    title: "Examinations & Records",
    desc: "School leaving certificates, character certificates, G.C.E. O/L and A/L student verification records.",
    phone: "+94 91 223 4769 Ext. 104",
    email: "records@rippongirlscollege.lk",
    iconName: "BookOpen",
  },
  {
    id: "dept-4",
    title: "Past Pupils' Association (PPA)",
    desc: "Alumni network, global chapter reunions, scholarship funds, and school development contributions.",
    phone: "+94 91 223 4769 Ext. 106",
    email: "ppa@rippongirlscollege.lk",
    iconName: "Users",
  },
  {
    id: "dept-5",
    title: "Sports & Co-Curricular Council",
    desc: "Interschool tournaments, athletic council, Western band, Eastern orchestra, and cultural troupes.",
    phone: "+94 91 223 4769 Ext. 108",
    email: "sports@rippongirlscollege.lk",
    iconName: "Award",
  },
  {
    id: "dept-6",
    title: "General Reception Desk",
    desc: "Public inquiries, campus visits, general front-desk assistance, and visitor gate passes.",
    phone: "+94 91 223 4769",
    email: "ripponbalika@gmail.com",
    iconName: "Phone",
  },
];

export const defaultContactVisitingGuide: ContactVisitingItem[] = [
  {
    id: "visit-1",
    title: "Main Security Gate",
    desc: "All visitors must report to the Security Gatehouse at Richmond Hill Road, produce a valid National ID Card (NIC), and receive a visitor pass.",
    iconName: "ShieldCheck",
  },
  {
    id: "visit-2",
    title: "Visiting Hours for Parents",
    desc: "Parent-teacher consultations and sectional meetings are conducted after 1:30 PM on school days or by scheduled appointment.",
    iconName: "Clock",
  },
  {
    id: "visit-3",
    title: "How to Reach Us",
    desc: "Situated in Richmond Hill, just 2.5 km (8 minutes) from Galle Fort and Galle Central Railway & Bus stations. Readily accessible via local buses and cabs.",
    iconName: "Compass",
  },
];

export const defaultContactFaqs: ContactFaq[] = [
  {
    id: "faq-1",
    q: "What is the procedure for obtaining a School Leaving Certificate?",
    a: "Past pupils or authorized guardians should visit the College Records Office during weekday morning hours (8:30 AM – 1:00 PM). Please bring the student's Admission Number, National Identity Card (NIC), and clearance form. Processing generally takes 3 to 5 working days.",
  },
  {
    id: "faq-2",
    q: "How can I schedule an official meeting with the Principal?",
    a: "Appointments with the Principal are scheduled for Tuesdays and Thursdays between 9:00 AM and 11:30 AM. To ensure availability, please submit your request via telephone (+94 91 223 4770) or send an email to principal@rippongirlscollege.lk at least two business days in advance.",
  },
  {
    id: "faq-3",
    q: "What are the school session and office working hours?",
    a: "Academic classes operate from 7:30 AM to 1:30 PM, Monday to Friday. The Administrative Secretariat remains open until 3:30 PM on all government school working days. Both academic and administrative offices are closed on weekends and public/mercantile holidays.",
  },
  {
    id: "faq-4",
    q: "How do students apply for Advanced Level (A/L) admission after O/Ls?",
    a: "Admission announcements for the G.C.E. Advanced Level streams (Physical Science, Biological Science, Commerce, Arts, and Technology) are published shortly after official O/L results are issued by the Department of Examinations. Application forms can be obtained from the school administrative desk.",
  },
  {
    id: "faq-5",
    q: "How can alumni register with the Past Pupils' Association (PPA)?",
    a: "Former students who have completed their education at Rippon Girls' College can join the PPA by registering online or at the PPA Secretariat on campus. For membership forms and upcoming alumni reunions, email ppa@rippongirlscollege.lk.",
  },
];

export const defaultContactDetails: ContactPageDetails = {
  heroBadge: "Connect • Richmond Hill, Galle",
  heroTitle: "Contact Rippon Girls' College",
  heroSubtitle:
    "Have a question or need more information? Get in touch with Rippon Girls' College and connect with us for inquiries, school information, admissions, events, and other matters.",
  address: "Rippon Girls' College, Richmond Hill Street, Galle, Southern Province, Sri Lanka.",
  generalPhone: "+94 91 223 4769",
  principalPhone: "+94 91 223 4770",
  primaryEmail: "ripponbalika@gmail.com",
  officialEmail: "info@rippongirlscollege.lk",
  schoolHours: "7:30 AM – 1:30 PM",
  officeHours: "7:30 AM – 3:30 PM (Mon–Fri)",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Rippon+Girls+College+Richmond+Hill+Galle+Sri+Lanka&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapPostalCode: "80000",
  mapCoordinates: "6.0463° N, 80.2075° E",
  departments: defaultContactDepartments,
  visitingGuide: defaultContactVisitingGuide,
  faqs: defaultContactFaqs,
};

export const defaultContactInquiries: ContactInquiry[] = [
  {
    id: "inq-1",
    fullName: "Kamani Jayawardena",
    email: "kamani.j@example.com",
    phone: "+94 77 412 8890",
    role: "Parent / Guardian",
    subject: "Admissions & Enrollment",
    message: "Seeking information regarding Grade 1 enrollment procedures and required documents for the upcoming academic year.",
    submittedAt: "2026-10-07T14:32:00Z",
    referenceId: "RGC-2026-1092",
    status: "unread",
  },
  {
    id: "inq-2",
    fullName: "Nisansala De Silva",
    email: "nisansala.ds@example.com",
    phone: "+94 71 889 1245",
    role: "Alumna (Past Pupil)",
    subject: "Past Pupils' Association (PPA)",
    message: "Would like to inquire about life membership registration and upcoming 125th anniversary reunion celebrations.",
    submittedAt: "2026-10-06T10:15:00Z",
    referenceId: "RGC-2026-1085",
    status: "read",
  },
];

export const defaultInitialSiteContent: SiteContentState = {
  gallery: defaultGalleryPhotos,
  news: defaultNewsData,
  events: defaultUpcomingEvents,
  administration: defaultAdministration,
  studentPopulation: defaultStudentPopulation,
  achievements: defaultAchievements,
  contact: defaultContactDetails,
  contactInquiries: defaultContactInquiries,
};
