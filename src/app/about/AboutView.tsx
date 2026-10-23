"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Landmark, Sparkles, Award, Ruler, CheckCircle2 } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import {
  LearningSpaceIcon,
  ScienceLabsIcon,
  ICTFacilitiesIcon,
  ClubsSocietiesIcon,
  SportsIcon,
  ArtsCultureIcon,
} from "./FacilityIcons";
import {
  defaultAdministration,
  defaultStudentPopulation,
  defaultHeritageContent,
} from "@/data/defaultData";
import { getAllContent, onContentChange } from "@/services/contentService";
import { AdminMember, StudentPopulationStats, HeritageContent, HeritageMilestone } from "@/types/content";
import { useLanguage } from "@/context/LanguageContext";
import "./about.css";

export default function AboutView() {
  const { t } = useLanguage();
  const [adminList, setAdminList] = useState<AdminMember[]>(defaultAdministration);
  const [population, setPopulation] = useState<StudentPopulationStats>(defaultStudentPopulation);
  const [heritage, setHeritage] = useState<HeritageContent>(defaultHeritageContent);
  const [historyEra, setHistoryEra] = useState<"all" | "founding" | "modern">("all");

  const adminScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isDragging = useRef(false);
  const [isDraggingAdmin, setIsDraggingAdmin] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkAdminScroll = useCallback(() => {
    const el = adminScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(checkAdminScroll, 80);
    const el = adminScrollRef.current;
    if (!el) return () => clearTimeout(timeoutId);

    el.addEventListener("scroll", checkAdminScroll, { passive: true });
    window.addEventListener("resize", checkAdminScroll);

    return () => {
      clearTimeout(timeoutId);
      el.removeEventListener("scroll", checkAdminScroll);
      window.removeEventListener("resize", checkAdminScroll);
    };
  }, [adminList, checkAdminScroll]);

  const handleAdminScroll = (direction: "left" | "right") => {
    const el = adminScrollRef.current;
    if (!el) return;
    const scrollAmount = 350;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = adminScrollRef.current;
    if (!el) return;
    isDragging.current = true;
    setIsDraggingAdmin(true);
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    isDragging.current = false;
    setIsDraggingAdmin(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = adminScrollRef.current;
    if (!isDragging.current || !el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.3;
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  useEffect(() => {
    let isMounted = true;
    getAllContent().then((data) => {
      if (isMounted) {
        if (data.administration && data.administration.length > 0) {
          setAdminList(data.administration);
        }
        if (data.studentPopulation) {
          setPopulation(data.studentPopulation);
        }
        if (data.heritage) {
          setHeritage(data.heritage);
        }
      }
    });

    const unsubscribe = onContentChange(() => {
      getAllContent().then((data) => {
        if (isMounted) {
          if (data.administration && data.administration.length > 0) {
            setAdminList(data.administration);
          }
          if (data.studentPopulation) {
            setPopulation(data.studentPopulation);
          }
          if (data.heritage) {
            setHeritage(data.heritage);
          }
        }
      });
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="about-page-wrapper">
      {/* =========================================================================
          1. ABOUT US HERO SECTION
          ========================================================================= */}
      <section className="about-hero-section" id="about-hero">
        <Image
          src={getAssetPath("/images/baner 2.jpeg")}
          alt="Rippon Girls' College School Facade"
          fill
          priority
          className="about-hero-bg-img"
          sizes="100vw"
        />

        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <h1 className="about-hero-title">{t.nav.about}</h1>
          <p className="about-hero-subtitle">
            <span>{t.about.heroSubtitle}</span>
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT OUR SCHOOL SECTION & VISION/MISSION
          ========================================================================= */}
      <section className="about-school-section" id="about-school">
        <div className="about-school-container">
          <h2 className="about-main-heading">{t.about.heritageTitle}</h2>

          <div className="about-school-grid">
            {/* Left Column: School Building Image */}
            <div className="about-school-media">
              <Image
                src={getAssetPath("/images/bird view.jpeg")}
                alt="Rippon Girls' College Historic Building"
                fill
                className="about-school-img"
                sizes="(max-width: 960px) 100vw, 480px"
              />
            </div>

            {/* Right Column: Narrative History */}
            <div className="about-school-text">
              <p className="about-school-paragraph">{t.about.heritageP1}</p>
              <p className="about-school-paragraph">{t.about.heritageP2}</p>
              <p className="about-school-paragraph">{t.about.heritageP3}</p>
            </div>
          </div>

          {/* Vision & Mission Highlight Card */}
          <div className="about-vm-wrapper">
            <div className="about-vm-card">
              <div className="about-vm-row">
                <span className="about-vm-label">{t.about.visionBadge}</span>
                <p className="about-vm-desc">{t.about.visionText}</p>
              </div>

              <div className="about-vm-row">
                <span className="about-vm-label">{t.about.missionBadge}</span>
                <p className="about-vm-desc">{t.about.missionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HISTORY & HERITAGE SECTION
          ========================================================================= */}
      <section className="about-history-section" id="history">
        <div className="about-history-container">
          {/* Section Header */}
          <div className="about-history-header">
            <span className="about-section-eyebrow gold">
              {heritage.eyebrow || t.about.historyEyebrow}
            </span>
            <h2 className="about-history-main-title">
              {heritage.title || t.about.historyTitle}
            </h2>
            <p className="about-history-subtitle">
              {heritage.subtitle || t.about.historySubtitle}
            </p>
          </div>

          {/* Archival Showcase Card */}
          <div className="about-history-archival-card">
            <div className="about-history-archival-media">
              <Image
                src={getAssetPath(
                  heritage.archivalImage &&
                  !heritage.archivalImage.includes("bird view") &&
                  !heritage.archivalImage.includes("school-building")
                    ? heritage.archivalImage
                    : "/images/OGA.jpg"
                )}
                alt="Historic Main Hall of Rippon Girls' College"
                fill
                className="about-history-archival-img"
                sizes="(max-width: 960px) 100vw, 540px"
              />
              <div className="about-history-archival-overlay">
                <span className="about-history-badge">
                  <Landmark size={15} />
                  <span>{heritage.archivalBadge || "Richmond Hill • Est. 1871"}</span>
                </span>
                <p className="about-history-media-caption">
                  {heritage.archivalCaption || t.about.historyArchivalCaption}
                </p>
              </div>
            </div>

            <div className="about-history-archival-content">
              <div className="about-history-motto-box">
                <span className="about-history-motto-label">College Latin Motto</span>
                <blockquote className="about-history-motto-quote">
                  &ldquo;{heritage.motto || t.about.historyMotto}&rdquo;
                </blockquote>
                <p className="about-history-motto-meaning">
                  &mdash; {heritage.mottoMeaning || t.about.historyMottoMeaning}
                </p>
              </div>

              <div className="about-history-stats-grid">
                <div className="about-history-stat-box">
                  <span className="about-history-stat-number">
                    {heritage.genesisYear || "1817"}
                  </span>
                  <span className="about-history-stat-label">
                    {heritage.genesisLabel || "Initial Genesis"}
                  </span>
                </div>
                <div className="about-history-stat-box">
                  <span className="about-history-stat-number">
                    {heritage.boardingYear || "1871"}
                  </span>
                  <span className="about-history-stat-label">
                    {heritage.boardingLabel || "Boarding School"}
                  </span>
                </div>
                <div className="about-history-stat-box">
                  <span className="about-history-stat-number">
                    {heritage.legacyYears || "150+"}
                  </span>
                  <span className="about-history-stat-label">
                    {heritage.legacyLabel || "Years of Legacy"}
                  </span>
                </div>
                <div className="about-history-stat-box">
                  <span className="about-history-stat-number">
                    {heritage.nationalStatus || "1AB"}
                  </span>
                  <span className="about-history-stat-label">
                    {heritage.nationalLabel || "National School"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Filter Controls */}
          <div className="about-history-filters" role="tablist" aria-label="History Milestones Filter">
            <button
              type="button"
              role="tab"
              aria-selected={historyEra === "all"}
              className={`about-history-filter-btn ${historyEra === "all" ? "is-active" : ""}`}
              onClick={() => setHistoryEra("all")}
            >
              <Sparkles size={16} />
              <span>{t.about.historyFilterAll}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={historyEra === "founding"}
              className={`about-history-filter-btn ${historyEra === "founding" ? "is-active" : ""}`}
              onClick={() => setHistoryEra("founding")}
            >
              <Landmark size={16} />
              <span>{t.about.historyFilterFounding}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={historyEra === "modern"}
              className={`about-history-filter-btn ${historyEra === "modern" ? "is-active" : ""}`}
              onClick={() => setHistoryEra("modern")}
            >
              <Award size={16} />
              <span>{t.about.historyFilterModern}</span>
            </button>
          </div>

          {/* Interactive Timeline Track */}
          <div className="about-timeline-wrapper">
            <div className="about-timeline-spine" />
            <div className="about-timeline-list">
              {((heritage.milestones && heritage.milestones.length > 0
                ? (historyEra === "all"
                    ? heritage.milestones
                    : heritage.milestones.filter((m) => m.era === historyEra))
                : (historyEra === "all"
                    ? t.about.historyMilestones
                    : t.about.historyMilestones.filter((m) => m.era === historyEra))) as Array<{
                year: string;
                title: string;
                tag: string;
                desc: string;
                era: string;
              }>).map((item, idx: number) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={`${item.year}-${idx}`}
                    className={`about-timeline-item ${isEven ? "left" : "right"}`}
                  >
                    <div className="about-timeline-node">
                      <div className="about-timeline-dot" />
                    </div>

                    <div className="about-timeline-card">
                      <div className="about-timeline-card-header">
                        <span className="about-timeline-year">{item.year}</span>
                        <span className="about-timeline-tag">{item.tag}</span>
                      </div>
                      <h3 className="about-timeline-title">{item.title}</h3>
                      <p className="about-timeline-desc">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legacy Quote Banner */}
          <div className="about-history-quote-banner">
            <div className="about-history-quote-content">
              <span className="about-history-quote-mark">&ldquo;</span>
              <p className="about-history-quote-text">
                {heritage.legacyQuote || t.about.historyLegacyQuote}
              </p>
              <div className="about-history-quote-author">
                <span className="about-history-author-title">
                  {heritage.authorTitle || "Rippon Girls' College, Galle"}
                </span>
                <span className="about-history-author-subtitle">
                  {heritage.authorSubtitle || "Richmond Hill • Est. 1871"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ACADEMIC STAFF / OUR ADMINISTRATION SECTION
          ========================================================================= */}
      <section className="about-admin-section" id="administration">
        <div className="about-admin-container">
          <div className="about-admin-header">
            <span className="about-section-eyebrow gold">
              {t.about.leadershipEyebrow}
            </span>
            <h2 className="about-admin-title">{t.about.leadershipTitle}</h2>
          </div>

          <div className="about-admin-carousel-wrapper">
            <button
              type="button"
              className={`about-admin-scroll-btn prev ${!canScrollLeft ? "is-hidden" : ""}`}
              onClick={() => handleAdminScroll("left")}
              aria-label="Scroll left"
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>

            <div
              className={`about-admin-scroll-track ${isDraggingAdmin ? "is-dragging" : ""}`}
              ref={adminScrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              tabIndex={0}
              role="region"
              aria-label="Administration Staff List"
            >
              {adminList.map((admin) => (
                <div key={admin.id} className="about-admin-card">
                  <div className="about-admin-media">
                    <Image
                      src={getAssetPath(admin.image || "/images/pin.png")}
                      alt={`${admin.role} ${admin.name}`}
                      fill
                      className="about-admin-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
                    />
                  </div>
                  <div className="about-admin-body">
                    <p className="about-admin-role">{admin.role}</p>
                    <h3 className="about-admin-name">{admin.name}</h3>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`about-admin-scroll-btn next ${!canScrollRight ? "is-hidden" : ""}`}
              onClick={() => handleAdminScroll("right")}
              aria-label="Scroll right"
              disabled={!canScrollRight}
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR STUDENTS / STUDENT POPULATION SECTION
          ========================================================================= */}
      <section className="about-population-section" id="students">
        <div className="about-population-container">
          <span className="about-section-eyebrow gold">
            {t.about.populationEyebrow}
          </span>
          <h2 className="about-population-title">{t.about.populationTitle}</h2>

          <div className="about-population-layout">
            {/* Left Quadrant Items */}
            <div className="about-population-col left">
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-count">{population.totalCount}</span>
                <span className="about-pop-stat-text">{t.about.stats.total.sub}</span>
                <span className="about-pop-stat-sub">{t.about.stats.total.label}</span>
              </div>
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-count">{population.primaryCount}</span>
                <span className="about-pop-stat-text">{t.about.stats.primary.sub}</span>
                <span className="about-pop-stat-sub">{t.about.stats.primary.label}</span>
              </div>
            </div>

            {/* Center Oval Emblem */}
            <div className="about-population-center">
              <div className="about-crest-oval">
                <Image
                  src={getAssetPath("/images/about-crest-oval.png")}
                  alt="Rippon Girls' College Golden Crest"
                  fill
                  className="about-crest-img"
                  sizes="280px"
                />
              </div>
            </div>

            {/* Right Quadrant Items */}
            <div className="about-population-col right">
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-count">{population.secondaryCount}</span>
                <span className="about-pop-stat-text">{t.about.stats.secondary.sub}</span>
                <span className="about-pop-stat-sub">{t.about.stats.secondary.label}</span>
              </div>
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-count">{population.alCount}</span>
                <span className="about-pop-stat-text">{t.about.stats.al.sub}</span>
                <span className="about-pop-stat-sub">{t.about.stats.al.label}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COLLEGE UNIFORM & STUDENT CODE SECTION
          ========================================================================= */}
      <section className="about-uniform-section" id="uniform">
        <div className="about-uniform-container">
          <div className="about-uniform-header">
            <span className="about-section-eyebrow gold">
              {t.about.uniformEyebrow}
            </span>
            <h2 className="about-uniform-title">{t.about.uniformTitle}</h2>
            <p className="about-uniform-subtitle">
              {t.about.uniformSubtitle}
            </p>
          </div>

          <div className="about-uniform-grid">
            <div className="about-uniform-media-card">
              <div className="about-uniform-media-wrapper">
                <Image
                  src={getAssetPath("/images/uniform.jpg")}
                  alt="Official Rippon Girls' College Uniform Tailoring Pattern & Dimensions"
                  width={460}
                  height={800}
                  className="about-uniform-blueprint-img"
                  priority={false}
                />
              </div>
            </div>

            {/* Right Column: Regulations & Guidelines */}
            <div className="about-uniform-content">
              <div className="about-uniform-content-header">
                <h3 className="about-uniform-content-heading">
                  {t.about.uniformGuidelinesTitle}
                </h3>
                <p className="about-uniform-content-intro">
                  Every student of Rippon Girls&apos; College adheres to standardized uniform specifications to maintain our timeless heritage of discipline, equality, and pride.
                </p>
              </div>

              <div className="about-uniform-cards-list">
                {t.about.uniformFeatures.map((feature: { title: string; desc: string }, i: number) => (
                  <div key={i} className="about-uniform-feature-card">
                    <div className="about-uniform-feature-icon">
                      <CheckCircle2 size={20} className="gold-icon" />
                    </div>
                    <div className="about-uniform-feature-body">
                      <h4 className="about-uniform-feature-title">{feature.title}</h4>
                      <p className="about-uniform-feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technical Measurements Highlight Banner */}
              <div className="about-uniform-spec-banner">
                <div className="about-uniform-spec-chip">
                  <span className="spec-label">Pocket Size</span>
                  <span className="spec-val">3″ × 3¼″</span>
                </div>
                <div className="about-uniform-spec-chip">
                  <span className="spec-label">Skirt Hem</span>
                  <span className="spec-val">2″ Below Knee</span>
                </div>
                <div className="about-uniform-spec-chip">
                  <span className="spec-label">Sleeve Hem</span>
                  <span className="spec-val">¾″ Fold</span>
                </div>
                <div className="about-uniform-spec-chip">
                  <span className="spec-label">Pocket Inset</span>
                  <span className="spec-val">½″ from Neck</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SUPPORTING EVERY STUDENT / OUR FACILITIES SECTION
          ========================================================================= */}
      <section className="about-facilities-section" id="facilities">
        <div className="about-facilities-container">
          <span className="about-section-eyebrow gold">
            {t.about.facilitiesEyebrow}
          </span>
          <h2 className="about-facilities-title">{t.about.facilitiesTitle}</h2>

          <div className="about-facilities-grid">
            <div className="about-facility-card">
              <div className="about-facility-top">
                <LearningSpaceIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.classrooms.title}
                </h3>
              </div>
            </div>

            <div className="about-facility-card">
              <div className="about-facility-top">
                <ScienceLabsIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.labs.title}
                </h3>
              </div>
            </div>

            <div className="about-facility-card">
              <div className="about-facility-top">
                <ICTFacilitiesIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.ict.title}
                </h3>
              </div>
            </div>

            <div className="about-facility-card">
              <div className="about-facility-top">
                <ClubsSocietiesIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.clubs.title}
                </h3>
              </div>
            </div>

            <div className="about-facility-card">
              <div className="about-facility-top">
                <SportsIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.sports.title}
                </h3>
              </div>
            </div>

            <div className="about-facility-card">
              <div className="about-facility-top">
                <ArtsCultureIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">
                  {t.about.facilityItems.arts.title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
