import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#b8351a",
          borderRadius: "20%",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          OFD
        </span>
      </div>
    ),
    { ...size }
  );
}
