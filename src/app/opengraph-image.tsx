import { profile } from "@/data/profile";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${profile.name}, ${profile.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OG() {
  return ogImage({ eyebrow: "Portfolio", title: profile.name, body: profile.pitch });
}
