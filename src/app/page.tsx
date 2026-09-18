import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="hero-section" id="hero">
        {/* Background Hero Campus Image */}
        <Image
          src="/images/hero-image.webp"
          alt="Rippon Girls' College Campus"
          fill
          priority
          className="hero-bg-image"
          sizes="100vw"
        />

        {/* Gradient Overlay */}
        <div className="hero-gradient-overlay" />

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Rippon Girl&apos;s College
          </h1>

          <p className="hero-subtitle">
            Oldest Girl&apos;s School in Southern Province of Sri Lanka
          </p>

          <Link href="#about" className="hero-cta-btn">
            <span>Discover more</span>
            <ArrowRight size={18} className="hero-cta-arrow" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          2. NEXT SECTIONS (Will be added right here in this same file)
          ========================================================================= */}
    </>
  );
}
