import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const severityColor: Record<string, string> = {
  critical: "#dc2626",
  high: "#ea580c",
  medium: "#ca8a04",
  low: "#78716c",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
        <div
          style={{
            fontSize: 24,
            color: post ? severityColor[post.severity] : "#e0902f",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {post ? `${post.severity} · ${post.benchmark}` : "benchmark/audit"}
        </div>
        <div style={{ fontSize: 54, fontWeight: 700, marginTop: 20, lineHeight: 1.15 }}>
          {post ? post.title : "benchmark/audit"}
        </div>
      </div>
    ),
    size
  );
}
