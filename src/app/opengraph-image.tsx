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
        background: "#10120f",
        color: "#f0eee6",
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
              border: "4px solid #c5ef6a",
              borderRadius: 12,
              color: "#c5ef6a",
              fontSize: 28,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            UK
          </div>
          <div style={{ fontSize: 28, color: "#a3a99b" }}>Senior Software Developer, Mumbai</div>
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
        <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 30, color: "#f0eee6" }}>
          <span>Web, backend and mobile development.</span>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 24, color: "#a3a99b" }}>
            <div
              style={{
                width: 80,
                height: 6,
                background: "#c5ef6a",
                borderRadius: 3,
              }}
            />
            CRM, logistics and e-commerce applications
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
            background: "linear-gradient(90deg, #10120f 0%, rgba(16,18,15,0.55) 22%, rgba(16,18,15,0) 45%)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
