import type { Profile } from "@/types";

/**
 * Personal details. Every fact on the site comes from Utkarsh's resume.
 * To add links, fill in `links.github` / `links.linkedin`; the UI shows those
 * buttons automatically once they are non-empty.
 */

/** First professional role (Fxgetactive, Oct 2022). Years of experience derive from this. */
export const CAREER_START = { year: 2022, month: 10 };

/** Shown in About. */
export const LEARNING = "Gen AI and system design, with my focus mostly on team management";

/** Shown in the footer; update it when the content changes. */
export const LAST_UPDATED = "Oct 2026";

export const profile: Profile = {
  name: "Utkarsh Kamble",
  firstName: "Utkarsh",
  role: "Senior Software Developer",
  headline: "Full-stack engineer for logistics, e-commerce and CRM platforms",
  location: "Mumbai, Maharashtra, India",
  email: "utkarsh1172@gmail.com",
  phone: "+91 99203 82812",
  phoneHref: "tel:+919920382812",
  links: {
    github: "https://github.com/utkarsh1172",
    linkedin: "https://www.linkedin.com/in/utkarsh-kamble-a2a543217/",
    site: "https://portfolio-utkarsh1172.netlify.app/",
  },
  resume: { path: "/resume/Utkarsh_Kamble_Resume.pdf", fileName: "Utkarsh_Kamble_Resume.pdf" },
  photo: {
    src: "/images/utkarsh-kamble.jpg",
    alt: "Utkarsh Kamble, smiling, in a navy polo shirt in an office",
  },
  seeking: "Exploring senior full-stack roles at logistics, shipping, e-commerce and enterprise software companies.",
};
