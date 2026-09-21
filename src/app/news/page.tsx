import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import "./news.css";

export const metadata: Metadata = {
  title: "News & Events | Rippon Girl's College Galle",
  description:
    "Stay connected with the latest news, upcoming events, student achievements, and memorable moments from the Rippon Girls' College community.",
};

const latestNewsData = [
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

const upcomingEventsData = [
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

const studentAchievementsData = [
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

export default function NewsPage() {
  return (
    <div className="news-page-wrapper">
      {/* =========================================================================
          1. HERO BANNER SECTION
          ========================================================================= */}
      <section className="news-hero-section" id="news-hero">
        <Image
          src={getAssetPath("/images/news-hero-bg.jpg")}
          alt="Rippon Girls' College Historic Archives and News"
          fill
          priority
          className="news-hero-bg-img"
          sizes="100vw"
        />

        <div className="news-hero-overlay" />

        <div className="news-hero-content">
          <h1 className="news-hero-title">News</h1>
          <p className="news-hero-subtitle">
            Stay connected with the latest news, events, achievements and memorable
            moments from the Rippon Girls&apos; College community.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. LATEST NEWS SECTION
          ========================================================================= */}
      <section className="news-latest-section" id="latest-news">
        <div className="news-section-container">
          <h2 className="news-main-heading">Latest News</h2>

          <div className="news-cards-grid">
            {latestNewsData.map((item) => (
              <article key={item.id} className="news-item-card">
                <div className="news-item-media">
                  <Image
                    src={getAssetPath(item.image)}
                    alt={item.alt}
                    fill
                    className="news-item-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                </div>

                <div className="news-item-body">
                  <p className="news-item-text">{item.description}</p>
                  <Link href={item.href} className="news-item-link">
                    <span>{item.linkText}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. UPCOMING EVENTS SECTION (DARK NAVY)
          ========================================================================= */}
      <section className="news-events-section" id="upcoming-events">
        <div className="news-events-container">
          <div className="news-events-header">
            <span className="news-events-eyebrow">Discover Our Upcoming Events</span>
            <h2 className="news-events-title">Upcoming Events</h2>
          </div>

          <div className="news-events-grid">
            {upcomingEventsData.map((event) => (
              <Link
                key={event.id}
                href={`#${event.id}`}
                className="event-card-box"
                aria-label={event.title}
              >
                <div className="event-card-left">
                  <div className="event-date-badge">
                    <span className="event-date-month">{event.month}</span>
                    <span className="event-date-day">{event.day}</span>
                  </div>
                  <div className="event-details">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-meta">
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={22} className="event-card-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. STUDENT ACHIEVEMENTS SECTION
          ========================================================================= */}
      <section className="news-achievements-section" id="student-achievements">
        <div className="news-section-container">
          <div className="news-achievements-header">
            <span className="news-achievements-eyebrow">
              Success Worth Celebrating
            </span>
            <h2 className="news-achievements-title">Student Achievements</h2>
          </div>

          <div className="news-cards-grid">
            {studentAchievementsData.map((achievement) => (
              <article key={achievement.id} className="news-item-card">
                <div className="news-item-media">
                  <Image
                    src={getAssetPath(achievement.image)}
                    alt={achievement.alt}
                    fill
                    className="news-item-img"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                  />
                </div>

                <div className="news-item-body">
                  <p className="news-item-text">{achievement.description}</p>
                  <Link href={achievement.href} className="news-item-link">
                    <span>{achievement.linkText}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
