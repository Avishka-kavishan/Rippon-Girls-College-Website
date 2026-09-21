import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { getAssetPath } from "@/utils/assets";
import {
  LearningSpaceIcon,
  ScienceLabsIcon,
  ICTFacilitiesIcon,
  ClubsSocietiesIcon,
  SportsIcon,
  ArtsCultureIcon,
} from "./FacilityIcons";
import "./about.css";

export const metadata: Metadata = {
  title: "About Us | Rippon Girl's College Galle",
  description:
    "Learn about Rippon Girls' College, Galle — our rich heritage dating back to 1817, vision & mission, academic leadership, student population, and modern facilities.",
};

export default function AboutPage() {
  return (
    <div className="about-page-wrapper">
      {/* =========================================================================
          1. ABOUT US HERO SECTION
          ========================================================================= */}
      <section className="about-hero-section" id="about-hero">
        <Image
          src={getAssetPath("/images/IMAGE 4.png")}
          alt="Rippon Girls' College Campus Facade"
          fill
          priority
          className="about-hero-bg-img"
          sizes="100vw"
        />

        <div className="about-hero-overlay" />

        <div className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">
            Our History · Vision &amp; Mission · Principal&apos;s Message · School Leadership · Our Values
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT OUR SCHOOL SECTION & VISION/MISSION
          ========================================================================= */}
      <section className="about-school-section" id="about-school">
        <div className="about-school-container">
          <h2 className="about-main-heading">About Our School</h2>

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
              <p className="about-school-paragraph">
                Rippon Girls&apos; College, Galle, has a rich heritage dating back to 1817. From its early beginnings as the Galle School, the institution developed into a leading national school serving generations of young women.
              </p>
              <p className="about-school-paragraph">
                The school became a government institution in 1929 and was upgraded to National School status in 1994.
              </p>
              <p className="about-school-paragraph">
                Today, Rippon Girls&apos; College provides primary and secondary education and strives to prepare students to meet the challenges of the future with confidence and good attitudes.
              </p>
            </div>
          </div>

          {/* Vision & Mission Highlight Card */}
          <div className="about-vm-wrapper">
            <div className="about-vm-card">
              <div className="about-vm-row">
                <span className="about-vm-label">Our Vision</span>
                <p className="about-vm-desc">
                  To present a fully pledged Sri Lankan woman who is equipped with good attitudes and possesses a self-confident character that can face any challenges.
                </p>
              </div>

              <div className="about-vm-row">
                <span className="about-vm-label">Our Mission</span>
                <p className="about-vm-desc">
                  To reward fully pledged Sri Lankan women enriched with knowledge, creativity and good attitudes with the aim of achieving common goals.
                </p>
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
          <span className="about-section-eyebrow gold">Academic Staff</span>
          <h2 className="about-admin-title">Our Administration</h2>

          <div className="about-admin-grid">
            {/* Administration Card 1 */}
            <div className="about-admin-card">
              <div className="about-admin-media">
                <Image
                  src={getAssetPath("/images/pin.png")}
                  alt="Principal Mrs. M. S. R. Irangani"
                  fill
                  className="about-admin-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
                />
              </div>
              <div className="about-admin-body">
                <p className="about-admin-role">Principle</p>
                <h3 className="about-admin-name">Mrs. M. S. R. Irangani</h3>
              </div>
            </div>

            {/* Administration Card 2 */}
            <div className="about-admin-card">
              <div className="about-admin-media">
                <Image
                  src={getAssetPath("/images/pin.png")}
                  alt="Principal Mrs. M. S. R. Irangani"
                  fill
                  className="about-admin-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
                />
              </div>
              <div className="about-admin-body">
                <p className="about-admin-role">Principle</p>
                <h3 className="about-admin-name">Mrs. M. S. R. Irangani</h3>
              </div>
            </div>

            {/* Administration Card 3 */}
            <div className="about-admin-card">
              <div className="about-admin-media">
                <Image
                  src={getAssetPath("/images/pin.png")}



                  alt="Principal Mrs. M. S. R. Irangani"
                  fill
                  className="about-admin-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
                />
              </div>
              <div className="about-admin-body">
                <p className="about-admin-role">Principle</p>
                <h3 className="about-admin-name">Mrs. M. S. R. Irangani</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR STUDENTS / STUDENT POPULATION SECTION
          ========================================================================= */}
      <section className="about-population-section" id="students">
        <div className="about-population-container">
          <span className="about-section-eyebrow gold">Our Students</span>
          <h2 className="about-population-title">Student Population</h2>

          <div className="about-population-layout">
            {/* Left Quadrant Items */}
            <div className="about-population-col left">
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-text">Since 1817</span>
              </div>
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-text">Primary Students</span>
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
                  sizes="240px"
                />
              </div>
            </div>

            {/* Right Quadrant Items */}
            <div className="about-population-col right">
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-text">Secondary Students</span>
              </div>
              <div className="about-pop-stat-item">
                <span className="about-pop-stat-text">Advance Level Students</span>
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
          <span className="about-section-eyebrow gold">Supporting Every Student</span>
          <h2 className="about-facilities-title">Our Facilities</h2>

          <div className="about-facilities-grid">
            {/* Facility 1: Learning Space */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <LearningSpaceIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">Learning Space</h3>
              </div>
            </div>

            {/* Facility 2: Science Labs */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <ScienceLabsIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">Science Labs</h3>
              </div>
            </div>

            {/* Facility 3: ICT Facilities */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <ICTFacilitiesIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">ICT Facilities</h3>
              </div>
            </div>

            {/* Facility 4: Clubs & Societies */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <ClubsSocietiesIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">Clubs &amp; Societies</h3>
              </div>
            </div>

            {/* Facility 5: Sports */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <SportsIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">Sports</h3>
              </div>
            </div>

            {/* Facility 6: Arts & Culture */}
            <div className="about-facility-card">
              <div className="about-facility-top">
                <ArtsCultureIcon size={58} />
              </div>
              <div className="about-facility-divider" />
              <div className="about-facility-bottom">
                <h3 className="about-facility-name">Arts &amp; Culture</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
