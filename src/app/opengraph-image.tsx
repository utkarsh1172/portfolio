import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Utkarsh Kamble, full-stack engineer for logistics and e-commerce";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const photo = await readFile(join(process.cwd(), "public/images/utkarsh-kamble.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0b0b0f",
        color: "#ececf0",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 64px 72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              border: "4px solid #ff7033",
              borderRadius: 12,
              color: "#ff7033",
              fontSize: 28,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            UK
          </div>
          <div style={{ fontSize: 28, color: "#9c9ca8" }}>Senior Software Developer, Mumbai</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -3,
          }}
        >
          <span>UTKARSH</span>
          <span>KAMBLE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 30, color: "#c8c8d0" }}>
          <span>I build the software between the order and the doorstep.</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 24, color: "#9c9ca8" }}>
            <div style={{ width: 80, height: 6, background: "#ff7033", borderRadius: 3 }} />
            Order automation, logistics, CRM and e-commerce
          </div>
        </div>
      </div>
      <div style={{ width: 430, height: 630, display: "flex", position: "relative" }}>
        <img
          src={photoSrc}
          width={630}
          height={630}
          alt=""
          style={{ position: "absolute", right: -100, top: 0, width: 630, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, #0b0b0f 0%, rgba(11,11,15,0.55) 22%, rgba(11,11,15,0) 45%)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
