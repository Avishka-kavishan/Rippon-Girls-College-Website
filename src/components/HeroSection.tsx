import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Background Hero Image */}
      <Image
        src="/images/hero-image.webp"
        alt="Rippon Girls' College Campus"
        fill
        priority
        className="hero-bg-image"
        sizes="100vw"
      />

      {/* Dark gradient overlay for text readability */}
      <div className="hero-gradient-overlay" />

      {/* Overlay Content (Centered Text & Golden CTA) */}
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
  );
}
