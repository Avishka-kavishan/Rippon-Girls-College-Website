import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAssetPath } from "@/utils/assets";

export default function HomePage() {
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
          <h1 className="hero-title">
            Welcome to Rippon Girl&apos;s College
          </h1>

          <p className="hero-subtitle">
            The Oldest Girls&apos; School in the Southern Province of Sri Lanka
          </p>

          <Link href="/about" className="hero-cta-btn">
            <span>Discover more</span>
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
            <span className="discover-eyebrow">Discover Our School</span>

            <h2 className="discover-heading">
              Empowering Girls Through Education, Character and Excellence
            </h2>

            <p className="discover-paragraph">
              Rippon Girls&apos; College, Galle — a school dedicated to nurturing young women through quality education, strong values and a wide range of opportunities.
            </p>

            <p className="discover-paragraph">
              For generations, Rippon Girls&apos; College has provided a supportive environment where students can learn, grow, discover their talents and prepare for the future.
            </p>

            <p className="discover-tagline">
              Learn. Grow. Lead.
            </p>
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
          <span className="section-eyebrow">Academic Program</span>
          <h2 className="section-title">Our Academic Pathway</h2>
        </div>

        <div className="pathway-grid">
          {/* Card 1: Primary Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/primary.jpg")}
                alt="Primary Education"
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">Primary Education</h3>
              <p className="pathway-card-text">
                The Primary Education stage introduces students to the joy of learning and helps them develop the essential knowledge, skills and attitudes needed for their future education.
              </p>
              <p className="pathway-card-text">
                During these important early years, students are encouraged to explore, ask questions, communicate confidently and develop positive learning habits.
              </p>
            </div>
          </div>

          {/* Card 2: Secondary Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/second.jpg")}
                alt="Secondary Education"
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">Secondary Education</h3>
              <p className="pathway-card-text">
                The Secondary Education stage provides students with a broader and deeper learning experience. Students develop their academic knowledge while discovering their interests, abilities and areas of strength.
              </p>
              <p className="pathway-card-text">
                As students progress through the secondary grades, they are encouraged to think critically, solve problems, work independently and take greater responsibility for their learning.
              </p>
            </div>
          </div>

          {/* Card 3: Advance level Education */}
          <div className="pathway-card">
            <div className="pathway-card-media">
              <Image
                src={getAssetPath("/images/advance.jpeg")}
                alt="Advance level Education"
                fill
                className="discover-img"
                sizes="(max-width: 860px) 100vw, 360px"
              />
            </div>
            <div className="pathway-card-body">
              <h3 className="pathway-card-title">Advance level Education</h3>
              <p className="pathway-card-text">
                Advanced Level education provides students with an opportunity to specialise in areas that match their interests, abilities and future goals.
              </p>
              <p className="pathway-card-text">
                Students undertake focused study in their selected stream while developing deeper subject knowledge, analytical thinking, research skills and independent learning abilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SCHOOL LIFE / OUR GALLERY SECTION
          ========================================================================= */}
      <section className="gallery-section" id="gallery">
        <div className="section-header">
          <span className="section-eyebrow">School Life</span>
          <h2 className="section-title">Our Gallery</h2>
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
          <Link href="#gallery" className="gallery-view-btn">
            View All
          </Link>
        </div>
      </section>
    </>
  );
}
