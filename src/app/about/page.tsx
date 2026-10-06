import React from "react";
import type { Metadata } from "next";
import AboutView from "./AboutView";

export const metadata: Metadata = {
  title: "About Us | Rippon Girl's College Galle",
  description:
    "Learn about Rippon Girls' College, Galle — our rich heritage dating back to 1817, vision & mission, academic leadership, student population, and modern facilities.",
};

export default function AboutPage() {
  return <AboutView />;
}
