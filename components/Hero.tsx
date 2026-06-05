"use client";
import { useEffect, useRef } from "react";
import HeroSpiral from "./HeroSpiral";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const lines = ref.current?.querySelectorAll<HTMLElement>(".hl-inner");
    lines?.forEach((el, i) => {
      setTimeout(() => { el.style.transform = "translateY(0)"; }, 80 + i * 160);
    });
    const fades = ref.current?.querySelectorAll<HTMLElement>(".hl-fade");
    fades?.forEach((el, i) => {
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 500 + i * 100);
    });
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#295898",
        overflow: "hidden",
        paddingTop: "108px",
      }}
    >
      <HeroSpiral />

      {/* Blob overlay — mix-blend-screen */}
      <img
        src="/bg-blob.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: "-45px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "115%",
          objectFit: "cover",
          mixBlendMode: "screen",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "calc(100vh - 108px)",
          display: "flex",
          flexDirection: "column",
          padding: "0 30px",
        }}
      >
        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 5.2vw, 72px)",
          fontWeight: 300,
          color: "#fff",
          textTransform: "uppercase",
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          marginTop: "clamp(60px, 9vw, 127px)",
          maxWidth: "min(783px, 52%)",
        }}>
          {["Built, Not Prompted.", "Ship Real MVPs with AI Agents"].map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: 1.25 }}>
              <span
                className="hl-inner"
                style={{
                  display: "block",
                  transform: "translateY(110%)",
                  transition: `transform 0.95s cubic-bezier(.16,1,.3,1) ${i * 0.14}s`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Bottom row */}
        <div
          className="hero-bottom"
          style={{
            marginTop: "auto",
            paddingBottom: "clamp(60px, 8vh, 130px)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "40px",
          }}
        >
          {/* Subtext */}
          <p
            className="hl-fade"
            style={{
              fontSize: "clamp(15px, 2.2vw, 36px)",
              fontWeight: 400,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.2,
              maxWidth: "min(659px, 44%)",
              opacity: 0,
              transform: "translateY(10px)",
              transition: "opacity .8s ease, transform .8s ease",
            }}
          >
            AI coding tools promised app building by description. You tried it, but the demo broke when used.{" "}
            <strong style={{ fontWeight: 800 }}>This is different.</strong>
          </p>

          {/* CTA button */}
          <a
            href="#course"
            className="hl-fade hero-cta"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "#fff",
              color: "#000",
              height: "64px",
              width: "clamp(240px, 28vw, 450px)",
              fontSize: "clamp(13px, 1.4vw, 24px)",
              fontWeight: 400,
              textTransform: "uppercase",
              textDecoration: "none",
              flexShrink: 0,
              opacity: 0,
              transform: "translateY(10px)",
              transition: "opacity .8s ease .1s, transform .8s ease .1s, background-color 0.3s, color 0.3s",
            }}
          >
            Course Details
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 18.502V5.00195" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 13.002C18 13.002 13.5811 19.0019 12 19.002C10.4188 19.002 6 13.002 6 13.002" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #hero h1 { max-width: 100% !important; }
          .hero-bottom { flex-direction: column; align-items: flex-start !important; }
          .hero-bottom p { max-width: 100% !important; }
          .hero-cta { width: 100% !important; }
        }
        .hero-cta:hover {
          background-color: #D3A35C !important;
          color: #fff !important;
        }
        .hero-cta svg path {
          transition: stroke 0.3s ease;
        }
        .hero-cta:hover svg path {
          stroke: #fff !important;
        }
      `}</style>
    </section>
  );
}
