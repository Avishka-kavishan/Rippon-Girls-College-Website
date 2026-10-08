export type Language = "en" | "si" | "ta";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  shortLabel: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", shortLabel: "EN" },
  { code: "si", name: "Sinhala", nativeName: "සිංහල", shortLabel: "සිං" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", shortLabel: "தம" },
];

export interface TranslationSchema {
  nav: {
    brandTitle: string;
    brandSubtitle: string;
    home: string;
    about: string;
    news: string;
    gallery: string;
    contact: string;
    switchLanguage: string;
    adminPortal: string;
  };
  footer: {
    brandTitle: string;
    brandSubtitle: string;
    address: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    quickLinks: string;
    followUs: string;
    socialDesc: string;
    copyright: string;
    staffAdmin: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    discoverMore: string;
    discoverEyebrow: string;
    discoverHeading: string;
    discoverP1: string;
    discoverP2: string;
    discoverTagline: string;
    pathwayEyebrow: string;
    pathwayTitle: string;
    primaryTitle: string;
    primaryP1: string;
    primaryP2: string;
    secondaryTitle: string;
    secondaryP1: string;
    secondaryP2: string;
    alTitle: string;
    alP1: string;
    alP2: string;
    galleryEyebrow: string;
    galleryTitle: string;
    viewAll: string;
  };
  about: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    highlights: {
      heritage: string;
      students: string;
      streams: string;
      enrichment: string;
    };
    heritageEyebrow: string;
    heritageTitle: string;
    heritageP1: string;
    heritageP2: string;
    heritageP3: string;
    badgeFounded: string;
    badgeLegacy: string;
    visionBadge: string;
    visionTitle: string;
    visionText: string;
    missionBadge: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: {
      integrity: { title: string; desc: string };
      excellence: { title: string; desc: string };
      compassion: { title: string; desc: string };
      leadership: { title: string; desc: string };
    };
    leadershipEyebrow: string;
    leadershipTitle: string;
    leadershipSubtitle: string;
    scrollHint: string;
    populationEyebrow: string;
    populationTitle: string;
    populationSubtitle: string;
    stats: {
      total: { label: string; sub: string };
      primary: { label: string; sub: string };
      secondary: { label: string; sub: string };
      al: { label: string; sub: string };
    };
    facilitiesEyebrow: string;
    facilitiesTitle: string;
    facilitiesSubtitle: string;
    facilityItems: {
      classrooms: { title: string; desc: string };
      labs: { title: string; desc: string };
      ict: { title: string; desc: string };
      sports: { title: string; desc: string };
      clubs: { title: string; desc: string };
      arts: { title: string; desc: string };
    };
  };
  news: {
    heroTitle: string;
    heroSubtitle: string;
    latestNewsHeading: string;
    latestNewsSubtitle: string;
    readMore: string;
    viewFullImage: string;
    upcomingEventsHeading: string;
    upcomingEventsSubtitle: string;
    venueLabel: string;
    timeLabel: string;
    achievementsHeading: string;
    achievementsSubtitle: string;
    modalClose: string;
  };
  gallery: {
    heroTitle: string;
    heroSubtitle: string;
    filterAll: string;
    categories: {
      academic: string;
      achievements: string;
      sports: string;
      arts: string;
      events: string;
      facilities: string;
    };
    viewImage: string;
    photoCount: string;
    categoryLabel: string;
    closeModal: string;
  };
  contact: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    quickCards: {
      addressTitle: string;
      addressLine1: string;
      addressLine2: string;
      addressAction: string;
      phoneTitle: string;
      phoneGeneral: string;
      phoneOffice: string;
      phoneNote: string;
      emailTitle: string;
      emailGeneral: string;
      emailOffice: string;
      emailNote: string;
      hoursTitle: string;
      hoursSchool: string;
      hoursOffice: string;
      hoursNote: string;
    };
    form: {
      title: string;
      subtitle: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      roleLabel: string;
      roles: {
        parent: string;
        prospective: string;
        alumna: string;
        staff: string;
        community: string;
      };
      subjectLabel: string;
      subjects: {
        general: string;
        admissions: string;
        academic: string;
        extracurricular: string;
        transcripts: string;
        other: string;
      };
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      errors: {
        nameRequired: string;
        emailRequired: string;
        emailInvalid: string;
        messageRequired: string;
      };
      success: {
        title: string;
        message: string;
        refLabel: string;
        sendAnother: string;
      };
    };
    departmentsTitle: string;
    departmentsSubtitle: string;
    visitingTitle: string;
    visitingSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
    mapTitle: string;
    mapSubtitle: string;
    openMap: string;
    postalCodeLabel: string;
    coordinatesLabel: string;
  };
}
