import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const ogSize = { width: 1200, height: 630 };

const initials = profile.name
  .split(" ")
  .map((w) => w[0])
  .join("");

/** Shared Open Graph card: dark base, soft accent bloom, a hairline glass panel. */
export function ogImage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 56,
        background:
          "radial-gradient(900px 520px at 85% 10%, rgba(142,155,255,0.30), transparent 60%), radial-gradient(700px 480px at 0% 100%, rgba(118,92,240,0.22), transparent 60%), #0a0b0f",
        color: "#eceef3",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 60px",
          borderRadius: 36,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#8e9bff",
              color: "#0a0b0f",
              fontSize: 24,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {initials}
          </div>
          <div style={{ fontSize: 26, color: "#a7adbd" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 30, lineHeight: 1.35, color: "#c4c8d4", maxWidth: 940 }}>{body}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#a7adbd" }}>
          <div style={{ width: 64, height: 4, borderRadius: 2, background: "#8e9bff" }} />
          {profile.name} · {profile.role}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
