import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#0B1120",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 28 28" fill="none">
          <path
            d="M8 22 V12 C8 8 10.5 5 14 5 C17.5 5 20 8 20 12 V22"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1="8" y1="22" x2="20" y2="22" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
