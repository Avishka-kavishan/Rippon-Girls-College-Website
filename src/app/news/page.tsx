import React from "react";
import type { Metadata } from "next";
import NewsView from "./NewsView";

export const metadata: Metadata = {
  title: "News & Events | Rippon Girl's College Galle",
  description:
    "Stay connected with the latest news, upcoming events, student achievements, and memorable moments from the Rippon Girls' College community.",
};

export default function NewsPage() {
  return <NewsView />;
}
