import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#15130f",
          color: "#ece9e4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#e0902f", letterSpacing: 2 }}>
          EVERY FINDING REPRODUCED, NOT ASSERTED
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>
          benchmark/audit
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "#a39d93", maxWidth: 900 }}>
          A growing, public taxonomy of how AI benchmarks and leaderboards
          actually fail.
        </div>
      </div>
    ),
    size
  );
}
