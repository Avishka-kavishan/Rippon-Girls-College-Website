"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronDown, Maximize2, Tag, Layers } from "lucide-react";
import { getAssetPath } from "@/utils/assets";
import "./gallery.css";

interface Category {
  id: string;
  label: string;
  icon: string;
  image?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  alt: string;
  span?: "featured" | "wide" | "standard";
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
    label: "Campus & Facilities",
    icon: "🏫",
  },
];

// Rich collection of photos mapped with Bento layout spans
const bentoPhotos: GalleryPhoto[] = [
  {
    id: "photo-1",
    title: "Interactive Smart Classroom",
    subtitle: "Digital Learning & Modern STEM Education",
    category: "academic",
    image: "/images/Gallery-1.jpeg",
    alt: "Students engaged in interactive digital classroom lesson",
    span: "wide",
  },
  {
    id: "photo-2",
    title: "Celesta '25 Senior Western Band",
    subtitle: "Rippon Girls' College Music Festival",
    category: "events",
    image: "/images/band.jpg",
    alt: "Celesta '25 Senior Western Band at college festival",
    span: "featured",
  },
  {
    id: "photo-3",
    title: "Annual Sports Meet Procession",
    subtitle: "Inter-House Athletic Championships",
    category: "sports",
    image: "/images/band2.jpg",
    alt: "Annual Inter-House Sports Meet marching band procession",
    span: "standard",
  },
  {
    id: "photo-4",
    title: "A/L Excellence Felicitation Ceremony",
    subtitle: "Honoring Outstanding Academic Triumphs",
    category: "achievements",
    image: "/images/gallery 2.jpg",
    alt: "A/L Excellence Felicitation Ceremony with students and staff",
    span: "standard",
  },
  {
    id: "photo-5",
    title: "Traditional Dance & Cultural Troupe",
    subtitle: "Vibrant Sri Lankan Folk & Classical Rhythms",
    category: "arts",
    image: "/images/gallery3.jpg",
    alt: "Traditional cultural dance performance by students",
    span: "wide",
  },
  {
    id: "photo-6",
    title: "Historic Campus Heritage Architecture",
    subtitle: "Est. 1899 — Rich Tradition in Richmond Hill, Galle",
    category: "facilities",
    image: "/images/image 4.png",
    alt: "Historic campus buildings under bright sky",
    span: "standard",
  },
  {
    id: "photo-7",
    title: "Eastern Cultural Music Troupe",
    subtitle: "Traditional Percussion & Instrumental Orchestra",
    category: "arts",
    image: "/images/music.jpg",
    alt: "Eastern traditional music and drum procession",
    span: "standard",
  },
  {
    id: "photo-8",
    title: "National Karate Tournament Representative",
    subtitle: "National School Games Gold & Silver Honors",
    category: "sports",
    image: "/images/news/1.jpg",
    alt: "National school karate tournament medalist",
    span: "standard",
  },
  {
    id: "photo-9",
    title: "3rd Asian Youth Games Kabaddi Representation",
    subtitle: "International Sports Accolades",
    category: "achievements",
    image: "/images/news/2.jpg",
    alt: "Asian Youth Games student sports felicitation",
    span: "standard",
  },
  {
    id: "photo-10",
    title: "Advanced Level Science & Arts Scholars",
    subtitle: "Preparing Future Female Leaders",
    category: "academic",
    image: "/images/advance.jpeg",
    alt: "Advanced level students in white uniform in classroom",
    span: "wide",
  },
  {
    id: "photo-11",
    title: "Junior School Morning Assembly",
    subtitle: "Nurturing Values from Foundation Years",
    category: "events",
    image: "/images/primary.jpg",
    alt: "Primary school assembly and campus life",
    span: "standard",
  },
  {
    id: "photo-12",
    title: "Main Administrative Quadrangle",
    subtitle: "School Grounds & Infrastructure",
    category: "facilities",
    image: "/images/school-building.jpg",
    alt: "Rippon Girls' College main administration building",
    span: "standard",
  },
];

export default function GalleryView() {
  // "all" or specific category ID
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState<number>(1); // Default to Celesta Band
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") {
      return bentoPhotos;
    }
    return bentoPhotos.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Photos displayed in grid (initially 6 items unless expanded or filtered)
  const displayedPhotos = useMemo(() => {
    if (activeCategory !== "all") {
      return filteredPhotos;
    }
    if (!isExpanded) {
      return filteredPhotos.slice(0, 6);
    }
    return filteredPhotos;
  }, [activeCategory, filteredPhotos, isExpanded]);

  const activePhoto = bentoPhotos[currentLightboxIndex] || bentoPhotos[0];

  const handlePrev = useCallback(() => {
    setCurrentLightboxIndex((prev) =>
      prev === 0 ? bentoPhotos.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentLightboxIndex((prev) =>
      prev === bentoPhotos.length - 1 ? 0 : prev + 1
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

  // Click handler for any bento card
  const handlePhotoClick = (photo: GalleryPhoto) => {
    const foundIndex = bentoPhotos.findIndex((p) => p.id === photo.id);
    if (foundIndex !== -1) {
      setCurrentLightboxIndex(foundIndex);
    }
    const lightboxElem = document.getElementById("image-lightbox");
    if (lightboxElem) {
      lightboxElem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // Click handler for category cards or filter pills
  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    // Find first matching photo in this category for lightbox preview
    if (categoryId !== "all") {
      const idx = bentoPhotos.findIndex((p) => p.category === categoryId);
      if (idx !== -1) {
        setCurrentLightboxIndex(idx);
      }
    }
  };

  // Click handler for "See All" button
  const handleSeeAllClick = () => {
    if (activeCategory !== "all") {
      setActiveCategory("all");
      setIsExpanded(true);
    } else {
      setIsExpanded((prev) => !prev);
    }
  };

  // Helper count for pills
  const getCategoryCount = (catId: string) => {
    if (catId === "all") return bentoPhotos.length;
    return bentoPhotos.filter((p) => p.category === catId).length;
  };

  return (
    <div className="gallery-page-container">
      {/* =========================================================================
          1. HEADER / TITLE SECTION
          ========================================================================= */}
      <section className="gallery-header-section" id="gallery-header">
        <span className="gallery-header-badge">Rippon Photographic Archives</span>
        <h1 className="gallery-page-title">Campus Life & Gallery</h1>
        <p className="gallery-page-subtitle">
          Explore the vibrant moments, historical traditions, student triumphs,
          and everyday experiences that define Rippon Girls&apos; College, Galle.
        </p>
      </section>

      <div className="gallery-header-divider" aria-hidden="true" />

      {/* =========================================================================
          2. GALLERY CATEGORIES SECTION
          ========================================================================= */}
      <section className="gallery-categories-section" id="gallery-categories">
        <h2 className="gallery-section-heading">Browse by Category</h2>

        <div className="categories-grid">
          {categoriesData.map((category) => {
            const hasImage = Boolean(category.image);
            const isCategoryActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  handleCategorySelect(
                    activeCategory === category.id ? "all" : category.id
                  )
                }
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
          3. DYNAMIC BENTO GRID WITH FILTER PILLS
          ========================================================================= */}
      <section className="bento-gallery-section" id="photo-gallery">
        <div className="bento-section-header">
          <div className="bento-title-group">
            <h2 className="gallery-section-heading">Photo Gallery</h2>
            <p className="bento-section-desc">
              Curated highlights of student life, cultural events, sports meets, and academic excellence.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="gallery-filter-pills" role="tablist" aria-label="Photo gallery categories">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => handleCategorySelect("all")}
              className={`filter-pill-btn ${activeCategory === "all" ? "active" : ""}`}
            >
              <Layers size={14} className="pill-icon" />
              <span>All Moments</span>
              <span className="pill-count">{getCategoryCount("all")}</span>
            </button>

            {categoriesData.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`filter-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
              >
                <span className="pill-emoji">{cat.icon}</span>
                <span>{cat.label}</span>
                <span className="pill-count">{getCategoryCount(cat.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="bento-grid">
          {displayedPhotos.map((photo) => {
            // When filtering a single category, adapt spans to fill nicely
            const spanClass =
              activeCategory === "all"
                ? photo.span === "featured"
                  ? "bento-span-featured"
                  : photo.span === "wide"
                  ? "bento-span-wide"
                  : "bento-span-standard"
                : "bento-span-filtered";

            return (
              <article
                key={photo.id}
                onClick={() => handlePhotoClick(photo)}
                className={`bento-card ${spanClass}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePhotoClick(photo);
                  }
                }}
                aria-label={`View ${photo.title} in Lightbox`}
              >
                <div className="bento-media-wrap">
                  <Image
                    src={getAssetPath(photo.image)}
                    alt={photo.alt}
                    fill
                    className="bento-card-img"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="bento-gradient-overlay" />
                </div>

                {/* Glassmorphism Info Overlay */}
                <div className="bento-card-info">
                  <div className="bento-card-meta">
                    <span className="bento-tag">
                      <Tag size={12} />
                      {photo.category}
                    </span>
                    <span className="bento-expand-btn" title="View Fullscreen in Lightbox">
                      <Maximize2 size={15} />
                    </span>
                  </div>

                  <h3 className="bento-card-title">{photo.title}</h3>
                  {photo.subtitle && (
                    <p className="bento-card-subtitle">{photo.subtitle}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* "See All" Action Button */}
        <div className="bento-see-all-wrap">
          <button
            type="button"
            onClick={handleSeeAllClick}
            className="bento-see-all-btn"
            aria-label="View all gallery images"
          >
            <span className="see-all-text">
              {activeCategory !== "all"
                ? "See All Photos"
                : isExpanded
                ? "Show Less"
                : "See All"}
            </span>
            <span className="see-all-count">({bentoPhotos.length} Photos)</span>
            <ChevronDown
              size={18}
              className={`see-all-icon ${
                isExpanded && activeCategory === "all" ? "rotated" : ""
              }`}
            />
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. IMAGE LIGHTBOX SECTION
          ========================================================================= */}
      <section className="image-lightbox-section" id="image-lightbox">
        <div className="lightbox-header-wrap">
          <h2 className="gallery-section-heading">Featured Image Viewer</h2>
          <p className="lightbox-section-desc">
            Click any photo from the bento grid above or use the navigation arrows below to inspect in high definition.
          </p>
        </div>

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
            <ChevronLeft size={28} />
          </button>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="lightbox-nav-btn lightbox-next-btn"
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Bottom Caption Area */}
          <div className="lightbox-caption-area">
            <div className="lightbox-caption-text">
              <span className="lightbox-caption-tag">{activePhoto.category.toUpperCase()}</span>
              <h3 className="lightbox-caption-title">{activePhoto.title}</h3>
              <p className="lightbox-caption-subtitle">
                {activePhoto.subtitle || "Rippon Girls' College, Galle"}
              </p>
            </div>
            <span className="lightbox-counter-badge">
              {currentLightboxIndex + 1} / {bentoPhotos.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
