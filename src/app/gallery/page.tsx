import React from "react";
import type { Metadata } from "next";
import GalleryView from "./GalleryView";

export const metadata: Metadata = {
  title: "Gallery | Rippon Girl's College Galle",
  description:
    "Explore the memorable moments, special events, achievements and everyday experiences that bring the Rippon Girls' College community to life.",
};

export default function GalleryPage() {
  return <GalleryView />;
}
