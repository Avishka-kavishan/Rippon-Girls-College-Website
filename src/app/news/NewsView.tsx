"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Maximize2, X } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import {
  defaultNewsData,
  defaultUpcomingEvents,
  defaultAchievements,
} from "@/data/defaultData";
import { getAllContent, onContentChange } from "@/services/contentService";
import { NewsItem, EventItem, AchievementItem } from "@/types/content";
import "./news.css";

export default function NewsView() {
  const [newsList, setNewsList] = useState<NewsItem[]>(defaultNewsData);
  const [eventsList, setEventsList] = useState<EventItem[]>(defaultUpcomingEvents);
  const [achievementsList, setAchievementsList] = useState<AchievementItem[]>(defaultAchievements);

  // Aspect ratio detection map for adaptive rendering
  const [aspectMap, setAspectMap] = useState<Record<string, "portrait" | "landscape" | "square">>({});

  // Full-size image modal state
  const [selectedImageModal, setSelectedImageModal] = useState<{
    title: string;
    image: string;
    alt?: string;
    description?: string;
    tag?: string;
  } | null>(null);

  useEffect(() => {
    let isMounted = true;
    getAllContent().then((data) => {
      if (isMounted) {
        if (data.news && data.news.length > 0) setNewsList(data.news);
        if (data.events && data.events.length > 0) setEventsList(data.events);
        if (data.achievements && data.achievements.length > 0) setAchievementsList(data.achievements);
      }
    });

    const unsubscribe = onContentChange(() => {
      getAllContent().then((data) => {
        if (isMounted) {
          if (data.news && data.news.length > 0) setNewsList(data.news);
          if (data.events && data.events.length > 0) setEventsList(data.events);
          if (data.achievements && data.achievements.length > 0) setAchievementsList(data.achievements);
        }
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImageModal(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            {newsList.map((item) => (
              <article key={item.id} className="news-item-card">
                <div
                  className={`news-item-media ${aspectMap[item.id] ? `media-${aspectMap[item.id]}` : ""}`}
                  onClick={() =>
                    setSelectedImageModal({
                      title: item.title,
                      image: item.image,
                      alt: item.alt,
                      description: item.description,
                      tag: "News",
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedImageModal({
                        title: item.title,
                        image: item.image,
                        alt: item.alt,
                        description: item.description,
                        tag: "News",
                      });
                    }
                  }}
                  title="Click to view full photo"
                  aria-label={`View full photo for ${item.title}`}
                >
                  {/* Soft ambient background for extreme aspect ratios */}
                  <div className="news-media-ambient" aria-hidden="true">
                    <Image
                      src={getAssetPath(item.image)}
                      alt=""
                      fill
                      className="news-ambient-blur-img"
                    />
                  </div>

                  <div className="news-media-foreground">
                    <Image
                      src={getAssetPath(item.image)}
                      alt={item.alt || item.title}
                      fill
                      className={`news-item-img ${aspectMap[item.id] ? `is-${aspectMap[item.id]}` : ""}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      onLoadingComplete={(res) => {
                        const ratio = res.naturalWidth / res.naturalHeight;
                        setAspectMap((prev) => ({
                          ...prev,
                          [item.id]: ratio < 0.88 ? "portrait" : ratio > 1.25 ? "landscape" : "square",
                        }));
                      }}
                    />
                  </div>

                  {/* Hover zoom overlay */}
                  <div className="news-media-zoom-overlay">
                    <span className="news-media-zoom-btn">
                      <Maximize2 size={14} />
                      <span>View Full Photo</span>
                    </span>
                    {aspectMap[item.id] === "portrait" && (
                      <span className="news-ratio-pill">Portrait</span>
                    )}
                  </div>
                </div>

                <div className="news-item-body">
                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                      color: "var(--primary-blue-dark, #072b78)",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="news-item-text">{item.description}</p>
                  <Link href={item.href || "#"} className="news-item-link">
                    <span>{item.linkText || "Learn More"}</span>
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
            {eventsList.map((event) => (
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
            {achievementsList.map((achievement) => (
              <article key={achievement.id} className="news-item-card">
                <div
                  className={`news-item-media ${aspectMap[achievement.id] ? `media-${aspectMap[achievement.id]}` : ""}`}
                  onClick={() =>
                    setSelectedImageModal({
                      title: achievement.title,
                      image: achievement.image,
                      alt: achievement.alt,
                      description: achievement.description,
                      tag: "Achievement",
                    })
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedImageModal({
                        title: achievement.title,
                        image: achievement.image,
                        alt: achievement.alt,
                        description: achievement.description,
                        tag: "Achievement",
                      });
                    }
                  }}
                  title="Click to view full photo"
                  aria-label={`View full photo for ${achievement.title}`}
                >
                  {/* Soft ambient background for extreme aspect ratios */}
                  <div className="news-media-ambient" aria-hidden="true">
                    <Image
                      src={getAssetPath(achievement.image)}
                      alt=""
                      fill
                      className="news-ambient-blur-img"
                    />
                  </div>

                  <div className="news-media-foreground">
                    <Image
                      src={getAssetPath(achievement.image)}
                      alt={achievement.alt || achievement.title}
                      fill
                      className={`news-item-img ${aspectMap[achievement.id] ? `is-${aspectMap[achievement.id]}` : ""}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 360px"
                      onLoadingComplete={(res) => {
                        const ratio = res.naturalWidth / res.naturalHeight;
                        setAspectMap((prev) => ({
                          ...prev,
                          [achievement.id]: ratio < 0.88 ? "portrait" : ratio > 1.25 ? "landscape" : "square",
                        }));
                      }}
                    />
                  </div>

                  {/* Hover zoom overlay */}
                  <div className="news-media-zoom-overlay">
                    <span className="news-media-zoom-btn">
                      <Maximize2 size={14} />
                      <span>View Full Photo</span>
                    </span>
                    {aspectMap[achievement.id] === "portrait" && (
                      <span className="news-ratio-pill">Portrait</span>
                    )}
                  </div>
                </div>

                <div className="news-item-body">
                  <p className="news-item-text">{achievement.description}</p>
                  <Link href={achievement.href || "#"} className="news-item-link">
                    <span>{achievement.linkText || "Learn More"}</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. FULL-SCREEN ADAPTIVE IMAGE LIGHTBOX MODAL
          ========================================================================= */}
      {selectedImageModal && (
        <div
          className="news-modal-overlay"
          onClick={() => setSelectedImageModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedImageModal.title}
        >
          <div
            className="news-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient background blur */}
            <div className="news-modal-ambient" aria-hidden="true">
              <Image
                src={getAssetPath(selectedImageModal.image)}
                alt=""
                fill
                className="news-modal-ambient-img"
              />
              <div className="news-modal-ambient-overlay" />
            </div>

            {/* Close button */}
            <button
              type="button"
              className="news-modal-close-btn"
              onClick={() => setSelectedImageModal(null)}
              aria-label="Close photo preview"
            >
              <X size={22} />
            </button>

            {/* Stage: 100% full view of photo without cropping */}
            <div className="news-modal-stage">
              <Image
                src={getAssetPath(selectedImageModal.image)}
                alt={selectedImageModal.alt || selectedImageModal.title}
                fill
                priority
                className="news-modal-stage-img"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            {/* Caption bar */}
            <div className="news-modal-caption">
              {selectedImageModal.tag && (
                <span className="news-modal-tag">{selectedImageModal.tag}</span>
              )}
              <h3 className="news-modal-title">{selectedImageModal.title}</h3>
              {selectedImageModal.description && (
                <p className="news-modal-desc">{selectedImageModal.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
