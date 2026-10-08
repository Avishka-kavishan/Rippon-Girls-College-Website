"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="hero-section" id="hero">
        <Image
          src={getAssetPath("/images/Hero_img.jpg")}
          alt="Rippon Girls' College Campus"
          fill
          priority
          className="hero-bg-image"
          sizes="100vw"
        />

        <div className="hero-gradient-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">{t.home.heroTitle}</h1>

          <p className="hero-subtitle">{t.home.heroSubtitle}</p>

          <Link href="/about" className="hero-cta-btn">
            <span>{t.home.discoverMore}</span>
            <ArrowRight size={18} className="hero-cta-arrow" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          2. DISCOVER OUR SCHOOL SECTION
          ========================================================================= */}
      <section className="discover-section" id="about">
        <div className="discover-container">
          {/* Left Column: Text Content */}
          <div className="discover-text-col">
            <span className="discover-eyebrow">{t.home.discoverEyebrow}</span>

            <h2 className="discover-heading">{t.home.discoverHeading}</h2>

            <p className="discover-paragraph">{t.home.discoverP1}</p>

            <p className="discover-paragraph">{t.home.discoverP2}</p>

            <p className="discover-tagline">{t.home.discoverTagline}</p>
          </div>

          {/* Right Column: Framed Photo */}
          <div className="discover-image-col">
            <div className="discover-image-frame">
              <Image
                src={getAssetPath("/images/subhero.jpg")}
                alt="Rippon Girls' College Band & Excellence"
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 440px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ACADEMIC PROGRAM / OUR ACADEMIC PATHWAY SECTION
          ========================================================================= */}
      <section className="pathway-section" id="academics">
        <div className="section-header">
          <span className="section-eyebrow">{t.home.pathwayEyebrow}</span>
          <h2 className="section-title">{t.home.pathwayTitle}</h2>
        </div>

        <div className="pathway-grid">
          {/* Card 1: Primary Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/primary.jpg")}
                alt={t.home.primaryTitle}
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">{t.home.primaryTitle}</h3>
              <p className="pathway-card-text">{t.home.primaryP1}</p>
              <p className="pathway-card-text">{t.home.primaryP2}</p>
            </div>
          </div>

          {/* Card 2: Secondary Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/second.jpg")}
                alt={t.home.secondaryTitle}
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">{t.home.secondaryTitle}</h3>
              <p className="pathway-card-text">{t.home.secondaryP1}</p>
              <p className="pathway-card-text">{t.home.secondaryP2}</p>
            </div>
          </div>

          {/* Card 3: Advance level Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/advance.jpeg")}
                alt={t.home.alTitle}
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">{t.home.alTitle}</h3>
              <p className="pathway-card-text">{t.home.alP1}</p>
              <p className="pathway-card-text">{t.home.alP2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SCHOOL LIFE / OUR GALLERY SECTION
          ========================================================================= */}
      <section className="gallery-section" id="gallery">
        <div className="section-header">
          <span className="section-eyebrow">{t.home.galleryEyebrow}</span>
          <h2 className="section-title">{t.home.galleryTitle}</h2>
        </div>

        <div className="gallery-grid">
          {/* Gallery Item 1 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/Gallery-1.jpeg")}
              alt="Rippon Girls' College Students"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>

          {/* Gallery Item 2 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/gallery 2.jpg")}
              alt="College Library and Study"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>

          {/* Gallery Item 3 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/gallery3.jpg")}
              alt="Science & Technology Laboratory"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>

          {/* Gallery Item 4 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/band2.jpg")}
              alt="Sports & Athletics Meet"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>

          {/* Gallery Item 5 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/band.jpg")}
              alt="Cultural & Drama Festival"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>

          {/* Gallery Item 6 */}
          <div className="gallery-item">
            <Image
              src={getAssetPath("/images/music.jpg")}
              alt="Annual Prize Giving Ceremony"
              fill
              className="gallery-img"
              sizes="(max-width: 640px) 100vw, (max-width: 860px) 50vw, 33vw"
            />
          </div>
        </div>

        <div className="gallery-action">
          <Link href="/gallery" className="gallery-view-btn">
            {t.home.viewAll}
          </Link>
        </div>
      </section>
    </>
  );
}
