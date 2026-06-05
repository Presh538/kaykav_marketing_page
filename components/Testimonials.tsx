"use client";

const rotatingNames = [
  { name: "Chijioke", angle: 0, opacity: 1, size: "48px", weight: 600, color: "#fffde2" },
  { name: "Daniel",   angle: 11,  opacity: 0.2, size: "49px", weight: 600, color: "#fffde2" },
  { name: "Zainab",   angle: 22,  opacity: 0.2, size: "49px", weight: 600, color: "#fffde2" },
  { name: "Toyin",    angle: 33,  opacity: 0.2, size: "48px", weight: 600, color: "#fffde2" },
  { name: "Lanre",    angle: 44,  opacity: 0.2, size: "48px", weight: 600, color: "#fffde2" },
  { name: "Ifeoma",   angle: -37, opacity: 0.2, size: "48px", weight: 600, color: "#fffde2" },
  { name: "Ngozi",    angle: -26, opacity: 0.2, size: "49px", weight: 600, color: "#fffde2" },
  { name: "Amaka",    angle: -15, opacity: 0.2, size: "48px", weight: 600, color: "#fffde2" },
  { name: "Ayomide",  angle: -4,  opacity: 0.2, size: "51px", weight: 600, color: "#fffde2" },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: "relative",
        minHeight: "100vh",
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
        }}
      />

      {/* Top-right CTA */}
      <div style={{
        position: "absolute",
        top: "46px",
        right: "30px",
        zIndex: 2,
      }}>
        <a
          href="https://mainstack.com/c/kaykav"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
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
          }}
        >
          Apply now for cohort 2.0
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 20L20 4M20 4H8M20 4V16" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Layout: names left + testimonial right */}
      <div
        className="testi-grid"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "41.67% 1fr",
          minHeight: "100vh",
        }}
      >
        {/* Left — rotating names */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "80px",
            gap: "clamp(8px, 2vh, 18px)",
          }}
        >
          {rotatingNames.map(({ name, angle, opacity, size, weight, color }, i) => (
            <div
              key={i}
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "left center",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{
                fontSize: `clamp(24px, ${parseFloat(size) / 19.2}vw, ${size})`,
                fontWeight: weight,
                color,
                opacity,
                letterSpacing: "-1.89px",
                textTransform: "uppercase",
                lineHeight: 1.2,
                display: "block",
              }}>
                {name}
              </span>
            </div>
          ))}

          {/* Bottom heading */}
          <div style={{ position: "absolute", bottom: "clamp(60px, 8vh, 185px)", left: "30px" }}>
            <h2
              className="anim-lines"
              style={{
                fontSize: "clamp(28px, 4.5vw, 72px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
              }}
            >
              <span className="line-mask"><span className="line-inner" style={{ display: "block" }}>testimonies</span></span>
              <span className="line-mask"><span className="line-inner" style={{ display: "block" }}>from others</span></span>
            </h2>
          </div>
        </div>

        {/* Right — testimonial */}
        <div
          style={{
            padding: "clamp(120px, 15vh, 325px) 30px clamp(60px, 8vh, 130px) 13px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <blockquote
              className="anim-fade"
              style={{
                fontSize: "clamp(16px, 2.2vw, 36px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                lineHeight: 1.2,
                margin: 0,
                maxWidth: "771px",
              }}
            >
              The content and production quality of this course is next level. HIGHLY recommend for anyone looking to level up their interface design skills.
            </blockquote>

            <div
              className="anim-fade"
              style={{
                marginTop: "clamp(20px, 4vh, 60px)",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "clamp(16px, 2.2vw, 36px)", fontWeight: 400, color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>—</span>
              <span style={{ fontSize: "clamp(16px, 2.2vw, 36px)", fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Chijioke</span>
            </div>
          </div>

          <p
            className="anim-fade"
            style={{
              fontSize: "clamp(15px, 2.2vw, 36px)",
              fontWeight: 400,
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.2,
              maxWidth: "529px",
              alignSelf: "flex-end",
            }}
          >
            A clear, step-by-step process that removes guesswork from building
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testi-grid {
            grid-template-columns: 1fr !important;
          }
          .testi-grid > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
