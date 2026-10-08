import React from "react";
import type { Metadata } from "next";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "Contact Us | Rippon Girl's College Galle",
  description:
    "Get in touch with Rippon Girls' College, Galle — Sri Lanka's oldest girls' school in the Southern Province. Access phone lines, email directories, Google Maps directions, office visiting hours, and online inquiry form.",
};

export default function ContactPage() {
  return <ContactView />;
}
