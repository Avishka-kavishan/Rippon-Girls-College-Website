"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
} from "@/data/defaultData";
import { getAllContent, onContentChange } from "@/services/contentService";
import { AdminMember, StudentPopulationStats } from "@/types/content";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/locales/types";
import "./about.css";

function translateRole(role: string, lang: Language): string {
  if (lang === "en") return role;
  const lower = role.toLowerCase().trim();
  if (lang === "si") {
    if (lower === "principal") return "විදුහල්පතිතුමිය";
    if (lower.includes("deputy principal")) return "නියෝජ්‍ය විදුහල්පති";
    if (lower.includes("vice principal")) return "උප විදුහල්පති";
    if (lower.includes("sectional head")) return "අංශ ප්‍රධානී";
    return role;
  }
  if (lang === "ta") {
    if (lower === "principal") return "அதிபர்";
    if (lower.includes("deputy principal")) return "பிரதி அதிபர்";
    if (lower.includes("vice principal")) return "உப அதிபர்";
    if (lower.includes("sectional head")) return "பிரிவுத் தலைவர்";
    return role;
  }
  return role;
}

export default function AboutView() {
  const { t, language } = useLanguage();
  const [adminList, setAdminList] = useState<AdminMember[]>(defaultAdministration);
  const [population, setPopulation] = useState<StudentPopulationStats>(defaultStudentPopulation);

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
          src={getAssetPath("/images/image 4.png")}
          alt="Rippon Girls' College Campus Facade"
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
            {/* Left Column: Campus Building Image */}
            <div className="about-school-media">
              <Image
                src={getAssetPath("/images/about.png")}
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
                    <p className="about-admin-role">
                      {translateRole(admin.role, language)}
                    </p>
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
          5. SUPPORTING EVERY STUDENT / OUR FACILITIES SECTION
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
