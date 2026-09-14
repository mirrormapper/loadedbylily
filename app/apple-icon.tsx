import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0B09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 118,
            height: 118,
            borderRadius: 999,
            background: "#C17A3A",
            display: "flex",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 28,
              left: 28,
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#0E0B09",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 44,
              left: 68,
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#0E0B09",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 42,
              width: 15,
              height: 15,
              borderRadius: 999,
              background: "#0E0B09",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  )
}
