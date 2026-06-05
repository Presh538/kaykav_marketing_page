"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonialsData = [
  {
    name: "Ifeoma",
    size: "48px",
    weight: 600,
    color: "#fffde2",
    quote: "This course is a masterclass in visual storytelling. The attention to detail in layout systems and typography has completely reshaped how I approach product design.",
    tagline: "A masterclass in visual storytelling"
  },
  {
    name: "Ngozi",
    size: "49px",
    weight: 600,
    color: "#fffde2",
    quote: "The focus on micro-interactions and motion design was exactly what I needed. It bridged the gap between static screens and high-fidelity prototypes.",
    tagline: "Bridged the gap to high-fidelity"
  },
  {
    name: "Amaka",
    size: "48px",
    weight: 600,
    color: "#fffde2",
    quote: "I’ve taken many courses, but this one stands out. The practical frameworks for styling, token systems, and layouts are directly applicable to my daily work.",
    tagline: "Directly applicable frameworks"
  },
  {
    name: "Ayomide",
    size: "51px",
    weight: 600,
    color: "#fffde2",
    quote: "Every lesson felt like pair programming with an industry expert. The section on responsive grids and components saved me weeks of trial and error.",
    tagline: "Pair programming with experts"
  },
  {
    name: "Chijioke",
    size: "48px",
    weight: 600,
    color: "#fffde2",
    quote: "The content and production quality of this course is next level. HIGHLY recommend for anyone looking to level up their interface design skills.",
    tagline: "Next level course quality"
  },
  {
    name: "Daniel",
    size: "49px",
    weight: 600,
    color: "#fffde2",
    quote: "A clear, step-by-step process that removes guesswork from building interfaces. It teaches you how to think, not just what tools to use.",
    tagline: "Removes guesswork from design"
  },
  {
    name: "Zainab",
    size: "49px",
    weight: 600,
    color: "#fffde2",
    quote: "The design system section alone is worth the price. Setting up scalable typography, color tokens, and layout guidelines has never been clearer.",
    tagline: "Scalable typography & design systems"
  },
  {
    name: "Toyin",
    size: "48px",
    weight: 600,
    color: "#fffde2",
    quote: "This course pushed my skills beyond standard templates. I learned how to create bespoke interactive layouts that truly stand out in the market.",
    tagline: "Create bespoke layouts"
  },
  {
    name: "Lanre",
    size: "48px",
    weight: 600,
    color: "#fffde2",
    quote: "An absolute game-changer. The framework teaches you how to balance visual expression with technical implementation constraints seamlessly.",
    tagline: "Balance visual expression with code"
  }
];

// Generate 36 items by repeating the 9 unique testimonials 4 times
// This fills the entire 360-degree circle (10 degrees spacing between items)
const totalWheelItems = 36;
const itemSpacing = 360 / totalWheelItems; // 10 degrees

const wheelItems = Array.from({ length: totalWheelItems }, (_, i) => {
  const dataIndex = i % testimonialsData.length;
  return {
    ...testimonialsData[dataIndex],
    wheelIndex: i,
    angle: i * itemSpacing,
  };
});

// At progress 0, we want Chijioke (unique index 4) to be active.
// Chijioke's angle is 4 * 10 = 40 deg.
// For Chijioke to be active (screen angle = 0), the initial wheel rotation should be -40 deg.
const START_ROTATION = -40;

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const [activeWheelIndex, setActiveWheelIndex] = useState(4); // Start with Chijioke
  const [displayIndex, setDisplayIndex] = useState(4);
  const [isFading, setIsFading] = useState(false);

  // Smooth fade transition when the displayed testimonial unique index changes
  useEffect(() => {
    const targetDisplayIndex = activeWheelIndex % testimonialsData.length;
    if (targetDisplayIndex !== displayIndex) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayIndex(targetDisplayIndex);
        setIsFading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [activeWheelIndex, displayIndex]);

  // GSAP ScrollTrigger setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const wheel = wheelRef.current;
    if (!section || !wheel) return;

    // As progress goes from 0 to 1, the wheel rotates 360 degrees (from -40 to -400)
    // The section is pinned for 200vh of scroll distance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200%", // Pin for exactly 200% of viewport height (200vh)
        scrub: 0.8, // Smooth inertia
        pin: true, // Programmatic pinning by GSAP
        pinSpacing: true, // Adds padding below to push subsequent content (like footer) down cleanly
        onUpdate: (self) => {
          const progress = self.progress;
          const currentRotation = START_ROTATION - progress * 360;

          // Find which of the 36 items is closest to 0 degrees screen angle (horizontal)
          let minDiff = Infinity;
          let activeIdx = 0;

          for (let i = 0; i < totalWheelItems; i++) {
            const itemAngle = i * itemSpacing;
            let screenAngle = (itemAngle + currentRotation) % 360;
            // Normalize to [-180, 180] range
            if (screenAngle > 180) screenAngle -= 360;
            if (screenAngle < -180) screenAngle += 360;

            const diff = Math.abs(screenAngle);
            if (diff < minDiff) {
              minDiff = diff;
              activeIdx = i;
            }
          }

          setActiveWheelIndex(activeIdx);
        }
      }
    });

    // Save scrollTrigger reference for click calculation
    triggerRef.current = tl.scrollTrigger || null;

    tl.fromTo(
      wheel,
      { rotation: START_ROTATION },
      { rotation: START_ROTATION - 360, ease: "none" }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Click on any name on the wheel to scroll directly to its position
  const handleNameClick = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const start = trigger.start;
    const end = trigger.end;
    const duration = end - start;

    // Solve for target progress p:
    // rotation = -40 - p * 360
    // We want rotation = -index * 10 + k * 360
    // This gives p = (index * 10 - 40 - k * 360) / 360
    // We find the integer k that yields p in [0, 1]
    let targetProgress = 0;
    for (let k = -2; k <= 2; k++) {
      const prog = (index * itemSpacing - 40 - k * 360) / 360;
      if (prog >= 0 && prog <= 1) {
        targetProgress = prog;
        break;
      }
    }

    const targetScroll = start + targetProgress * duration;

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const currentTestimonial = testimonialsData[displayIndex];

  // Circle dimensions
  const radius = "clamp(300px, 24vw, 480px)";
  const wheelLeft = "calc(-1 * clamp(300px, 24vw, 480px))";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        position: "relative",
        height: "100vh", // Viewport-sized container (pin spacing handles track duration)
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Blob overlay */}
      <img
        src="/bg-blob.png"
        alt=""
        aria-hidden
        style={{
          position: "absolute",
          top: "-56px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "115%",
          objectFit: "cover",
          mixBlendMode: "screen",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      />

      {/* Top-right CTA */}
      <div style={{
        position: "absolute",
        top: "140px",
        right: "30px",
        zIndex: 10,
      }}>
        <a
          href="https://mainstack.com/c/kaykav"
          target="_blank"
          rel="noopener noreferrer"
          className="testi-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "#fff",
            color: "#000",
            height: "64px",
            width: "clamp(200px, 24vw, 450px)",
            fontSize: "clamp(12px, 1.2vw, 24px)",
            fontWeight: 400,
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Apply now for cohort 2.0
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 20L20 4M20 4H8M20 4V16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Content Layout */}
      <div
        className="testi-grid"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "41.67% 1fr",
          height: "100vh",
        }}
      >
        {/* Left Column — Rotating circular wheel */}
        <div
          className="wheel-column"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* Wheel outer wrapper */}
          <div
            style={{
              position: "absolute",
              left: wheelLeft,
              top: "50%",
              transform: "translateY(-50%)",
              width: `calc(2 * ${radius})`,
              height: `calc(2 * ${radius})`,
              pointerEvents: "none",
            }}
          >
            {/* Wheel rotating container */}
            <div
              ref={wheelRef}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                transformOrigin: "center center",
                pointerEvents: "auto",
              }}
            >
              {wheelItems.map((item, i) => {
                const isActive = i === activeWheelIndex;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transformOrigin: "left center",
                      transform: `rotate(${item.angle}deg) translate(${radius})`,
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      pointerEvents: "auto",
                      zIndex: isActive ? 5 : 2,
                    }}
                    onClick={() => handleNameClick(i)}
                  >
                    <span
                      style={{
                        fontSize: `clamp(24px, ${parseFloat(item.size) / 19.2}vw, ${item.size})`,
                        fontWeight: item.weight,
                        color: isActive ? "#fffde2" : "rgba(255, 255, 255, 0.15)",
                        letterSpacing: "-1.89px",
                        textTransform: "uppercase",
                        lineHeight: 1.2,
                        display: "block",
                        transform: isActive ? "scale(1.18)" : "scale(1.0)",
                        transformOrigin: "left center",
                        transition: "color 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom heading */}
          <div style={{ position: "absolute", bottom: "clamp(60px, 8vh, 185px)", left: "30px", pointerEvents: "none" }}>
            <h2
              className="anim-lines visible"
              style={{
                fontSize: "clamp(28px, 4.5vw, 72px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="line-mask">
                <span className="line-inner" style={{ display: "block", transform: "translateY(0)" }}>testimonies</span>
              </span>
              <span className="line-mask">
                <span className="line-inner" style={{ display: "block", transform: "translateY(0)" }}>from others</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Right Column — Testimonial Content (centered vertically) */}
        <div
          className="testimonial-content-column"
          style={{
            padding: "80px 30px 80px 13px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Pushes the quote card to the vertical center of the frame
            position: "relative",
            height: "100%",
          }}
        >
          {/* Quote and Author (centered vertically in container) */}
          <div style={{ margin: "auto 0" }}>
            <blockquote
              style={{
                fontSize: "clamp(16px, 2.2vw, 36px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.2,
                margin: 0,
                maxWidth: "771px",
                opacity: isFading ? 0 : 1,
                transform: isFading ? "translateY(15px)" : "translateY(0)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              {currentTestimonial.quote}
            </blockquote>

            <div
              style={{
                marginTop: "clamp(20px, 4vh, 60px)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                opacity: isFading ? 0 : 1,
                transform: isFading ? "translateY(10px)" : "translateY(0)",
                transition: "opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s",
              }}
            >
              <span style={{ fontSize: "clamp(16px, 2.2vw, 36px)", fontWeight: 400, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>—</span>
              <span style={{ fontSize: "clamp(16px, 2.2vw, 36px)", fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>
                {currentTestimonial.name}
              </span>
            </div>
          </div>

          {/* Tagline / Subtext & Progress Indicator (anchored at the bottom) */}
          <div style={{
            position: "absolute",
            bottom: "clamp(60px, 8vh, 130px)",
            right: "30px",
            left: "13px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}>
            <p
              style={{
                fontSize: "clamp(15px, 2.2vw, 36px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.2,
                maxWidth: "529px",
                alignSelf: "flex-end",
                textAlign: "right",
                opacity: isFading ? 0 : 1,
                transform: isFading ? "translateY(10px)" : "translateY(0)",
                transition: "opacity 0.25s ease 0.1s, transform 0.25s ease 0.1s",
              }}
            >
              {currentTestimonial.tagline}
            </p>

            {/* Progress pagination line */}
            <div
              style={{
                alignSelf: "flex-end",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "10px",
              }}
            >
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                {String(displayIndex + 1).padStart(2, "0")}
              </span>
              <div style={{ width: "80px", height: "2px", background: "rgba(255,255,255,0.15)", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: `${((displayIndex + 1) / testimonialsData.length) * 100}%`,
                    background: "#fffde2",
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
              <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                {String(testimonialsData.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testi-cta {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .testi-cta:hover {
          background-color: #D3A35C !important;
          color: #fff !important;
        }
        .testi-cta svg path {
          transition: stroke 0.3s ease;
        }
        .testi-cta:hover svg path {
          stroke: #fff !important;
        }

        @media (max-width: 768px) {
          .testi-grid {
            grid-template-columns: 1fr !important;
          }
          .wheel-column {
            display: none !important;
          }
          .testimonial-content-column {
            padding-top: 140px !important;
            padding-bottom: 60px !important;
            justify-content: space-between !important;
          }
          .testimonial-content-column > div:first-child {
            margin: 0 !important; /* Reset vertical centering margin for mobile */
          }
          .testimonial-content-column blockquote {
            max-width: 100% !important;
          }
          .testimonial-content-column p {
            align-self: flex-start !important;
            text-align: left !important;
            max-width: 100% !important;
          }
          .testimonial-content-column > div:last-child {
            align-self: stretch !important;
            position: static !important;
            margin-top: 40px !important;
            padding: 0 !important;
          }
          .testimonial-content-column > div:last-child > div {
            align-self: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
