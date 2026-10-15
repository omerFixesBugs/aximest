import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// The card shown when the site is shared on LinkedIn, WhatsApp, X, Slack, etc.
export const alt = "Aximest — We build custom software that grows your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const geist = await readFile(
    join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Medium.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#de5849",
          color: "#000",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="58" height="66" viewBox="2 4 78 90">
            <polygon
              points="50,50 30,8 6,90 50,50 76,26 62,75"
              fill="none"
              stroke="#000"
              strokeWidth="7"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 34, letterSpacing: 10 }}>AXIMEST</span>
        </div>

        <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
          We build custom software that grows your business.
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28 }}>
          <span>Web &amp; mobile apps · AI automation · Business platforms</span>
          <span>aximest.com</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 500 }] },
  );
}
