"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import "./gallery.css";

interface Category {
  id: string;
  label: string;
  icon: string;
  image?: string;
}

interface GalleryPhoto {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  alt: string;
  frameClass?: string;
}

const categoriesData: Category[] = [
  {
    id: "academic",
    label: "Academic",
    icon: "🎓",
    image: "/images/advance.jpeg",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: "🏆",
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚽",
  },
  {
    id: "arts",
    label: "Arts & Culture",
    icon: "🎭",
  },
  {
    id: "events",
    label: "School Events",
    icon: "🎉",
  },
  {
    id: "facilities",
    label: "School buildings and facilities",
    icon: "🏫",
  },
];

// Collage items strictly from existing assets matching the layout in mockup
const collagePhotos: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Interactive Smart Classroom",
    subtitle: "Rippon Girls' College",
    category: "academic",
    image: "/images/Gallery-1.jpeg",
    alt: "Students engaged in interactive digital classroom lesson",
    frameClass: "frame-top-left",
  },
  {
    id: "photo-2",
    title: "A/L Excellence Felicitation Ceremony",
    subtitle: "Rippon Girls' College",
    category: "achievements",
    image: "/images/gallery 2.jpg",
    alt: "A/L Excellence Felicitation Ceremony with students and staff",
    frameClass: "frame-top-center",
  },
  {
    id: "photo-3",
    title: "Traditional Dance & Cultural Troupe",
    subtitle: "Rippon Girls' College",
    category: "arts",
    image: "/images/gallery3.jpg",
    alt: "Traditional cultural dance performance by students",
    frameClass: "frame-top-right",
  },
  {
    id: "photo-4",
    title: "Celesta '25 Senior Western Band",
    subtitle: "Rippon Girls' College",
    category: "events",
    image: "/images/band.jpg",
    alt: "Celesta '25 Senior Western Band at college festival",
    frameClass: "frame-bottom-left",
  },
  {
    id: "photo-5",
    title: "College Campus & Architecture",
    subtitle: "Rippon Girls' College",
    category: "facilities",
    image: "/images/image 4.png",
    alt: "Historic campus buildings under bright sky",
    frameClass: "frame-bottom-center",
  },
  {
    id: "photo-6",
    title: "Sports Meet 2026",
    subtitle: "Rippon Girls' College",
    category: "sports",
    image: "/images/band2.jpg",
    alt: "Annual Inter-House Sports Meet marching band procession",
    frameClass: "frame-tall-right",
  },
];

// Extended list of existing photos for the Lightbox carousel
const allLightboxPhotos: GalleryPhoto[] = [
  ...collagePhotos,
  {
    id: "photo-7",
    title: "Eastern Cultural Music Troupe",
    subtitle: "Rippon Girls' College",
    category: "arts",
    image: "/images/music.jpg",
    alt: "Eastern traditional music and drum procession",
  },
  {
    id: "photo-8",
    title: "National Karate Tournament Representative",
    subtitle: "Rippon Girls' College",
    category: "sports",
    image: "/images/news/1.jpg",
    alt: "National school karate tournament medalist",
  },
  {
    id: "photo-9",
    title: "3rd Asian Youth Games Kabaddi Representative",
    subtitle: "Rippon Girls' College",
    category: "sports",
    image: "/images/news/2.jpg",
    alt: "Asian Youth Games student sports felicitation",
  },
  {
    id: "photo-10",
    title: "Advanced Level Academic Students",
    subtitle: "Rippon Girls' College",
    category: "academic",
    image: "/images/advance.jpeg",
    alt: "Advanced level students in white uniform in classroom",
  },
];

export default function GalleryView() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // Default to the "Sports Meet 2026" image (index 5) matching the mockup screenshot
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number>(5);

  const activePhoto = allLightboxPhotos[currentLightboxIndex] || allLightboxPhotos[0];

  const handlePrev = useCallback(() => {
    setCurrentLightboxIndex((prev) =>
      prev === 0 ? allLightboxPhotos.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentLightboxIndex((prev) =>
      prev === allLightboxPhotos.length - 1 ? 0 : prev + 1
    );
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Click handler on collage item
  const handlePhotoClick = (photo: GalleryPhoto) => {
    const foundIndex = allLightboxPhotos.findIndex((p) => p.id === photo.id);
    if (foundIndex !== -1) {
      setCurrentLightboxIndex(foundIndex);
    }
    // Smooth scroll down to the lightbox section
    const lightboxElem = document.getElementById("image-lightbox");
    if (lightboxElem) {
      lightboxElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Click handler on category card
  const handleCategoryClick = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
      // Find the first photo in this category to show in lightbox
      const photoIdx = allLightboxPhotos.findIndex(
        (p) => p.category === categoryId
      );
      if (photoIdx !== -1) {
        setCurrentLightboxIndex(photoIdx);
      }
    }
  };

  return (
    <div className="gallery-page-container">
      {/* =========================================================================
          1. HEADER / TITLE SECTION
          ========================================================================= */}
      <section className="gallery-header-section" id="gallery-header">
        <h1 className="gallery-page-title">Gallery</h1>
        <p className="gallery-page-subtitle">
          Explore the memorable moments, special events, achievements and everyday
          experiences that bring the Rippon Girls&apos; College community to life.
        </p>
      </section>

      <div className="gallery-header-divider" aria-hidden="true" />

      {/* =========================================================================
          2. GALLERY CATEGORIES SECTION
          ========================================================================= */}
      <section className="gallery-categories-section" id="gallery-categories">
        <h2 className="gallery-section-heading">Gallery Categories</h2>

        <div className="categories-grid">
          {categoriesData.map((category) => {
            const hasImage = Boolean(category.image);
            const isCategoryActive = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryClick(category.id)}
                className={`category-card ${hasImage ? "has-image" : ""} ${
                  isCategoryActive ? "active" : ""
                }`}
                aria-label={`Filter by ${category.label}`}
              >
                {hasImage && category.image && (
                  <>
                    <Image
                      src={getAssetPath(category.image)}
                      alt={category.label}
                      fill
                      className="category-card-bg-img"
                      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 360px"
                    />
                    <div className="category-card-overlay" />
                  </>
                )}

                <div className="category-card-content">
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-title">{category.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. PHOTO GALLERY COLLAGE SECTION
          ========================================================================= */}
      <section className="photo-gallery-section" id="photo-gallery">
        <h2 className="gallery-section-heading">Photo Gallery</h2>

        <div className="collage-grid-container">
          {collagePhotos.map((photo) => {
            const isHighlighted =
              !selectedCategory || photo.category === selectedCategory;

            return (
              <div
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={`gallery-collage-frame ${photo.frameClass || ""}`}
                style={{
                  opacity: isHighlighted ? 1 : 0.45,
                  transition: "all 0.3s ease",
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePhotoClick(photo);
                  }
                }}
                aria-label={`View ${photo.title} in lightbox`}
              >
                <Image
                  src={getAssetPath(photo.image)}
                  alt={photo.alt}
                  fill
                  className="gallery-collage-img"
                  sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 400px"
                />

                <div className="frame-info-badge">
                  <span className="frame-tag">{photo.category}</span>
                  <span className="frame-title">{photo.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. IMAGE LIGHTBOX SECTION
          ========================================================================= */}
      <section className="image-lightbox-section" id="image-lightbox">
        <h2 className="gallery-section-heading">Image Lightbox</h2>

        <div className="lightbox-main-box">
          <div className="lightbox-bg-media">
            <Image
              key={activePhoto.image}
              src={getAssetPath(activePhoto.image)}
              alt={activePhoto.alt}
              fill
              priority
              className="lightbox-main-img"
              sizes="(max-width: 1060px) 100vw, 1060px"
            />
            <div className="lightbox-vignette" />
          </div>

          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="lightbox-nav-btn lightbox-prev-btn"
            aria-label="Previous Image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="lightbox-nav-btn lightbox-next-btn"
            aria-label="Next Image"
          >
            <ChevronRight size={26} />
          </button>

          {/* Bottom Caption Area matching the mockup */}
          <div className="lightbox-caption-area">
            <h3 className="lightbox-caption-title">{activePhoto.title}</h3>
            <p className="lightbox-caption-subtitle">
              {activePhoto.subtitle || "Rippon Girls' College"}
            </p>
            <span className="lightbox-counter-badge">
              {currentLightboxIndex + 1} / {allLightboxPhotos.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
