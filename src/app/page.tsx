import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import LatestNewsSection from '@/components/home/LatestNewsSection';
import DiscoverSection from '@/components/home/DiscoverSection';
import AcademicPathwaySection from '@/components/home/AcademicPathwaySection';
import HomeGallerySection from '@/components/home/HomeGallerySection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Latest News Section */}
      <LatestNewsSection />

      {/* 3. Discover Our School Section */}
      <DiscoverSection />

      {/* 4. Academic Program / Pathway Section */}
      <AcademicPathwaySection />

      {/* 5. School Life / Gallery Section */}
      <HomeGallerySection />
    </div>
  );
}
