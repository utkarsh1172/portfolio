import type { Profile } from "@/types";

/**
 * Personal details. Facts come from Abhay's resume; anything not confirmed yet
 * is a `{{placeholder}}`, which the site never renders.
 */

/** First design role (Bombay Tone internship, Jul 2023). Years of experience derive from this. */
export const CAREER_START = { year: 2023, month: 7 };

export const profile: Profile = {
  name: "Abhay Maske",
  role: "Product Designer | UI/UX Designer",
  pitch:
    "I simplify complex operational workflows across CRM, logistics and SaaS, and build the design systems that keep them consistent.",
  location: "{{LOCATION: city to show on the site}}",
  email: "{{EMAIL: Abhay's contact email}}",
  links: {
    linkedin: "https://www.linkedin.com/in/abhay-maske-866a93200",
  },
  // Add the PDF under public/resume/ and fill this in; the download buttons appear automatically.
  resume: null,
  seeking: "Open to Product Designer and UI/UX Designer roles in B2B SaaS, logistics, fintech and startups.",
};
