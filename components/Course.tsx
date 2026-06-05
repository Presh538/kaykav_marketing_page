"use client";

const curriculum = [
  "Introduction to AI Prompts",
  "Setting up your workspace",
  "Architecture before code",
  "Foundations for your live product",
  "The Build Loop",
];

export default function Course() {
  return (
    <section
      id="course"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <img
        src="/section1-bg.png"
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
          pointerEvents: "none",
          userSelect: "none",
          opacity: 0.9,
        }}
      />

      {/* Content */}
      <div
        className="course-grid"
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "100vh",
        }}
      >
        {/* Left column */}
        <div style={{ padding: "104px 30px 80px" }}>
          <h2
            className="anim-lines"
            style={{
              fontSize: "clamp(32px, 5.2vw, 72px)",
              color: "#000",
              textTransform: "uppercase",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="line-mask">
              <span className="line-inner" style={{ fontWeight: 800, display: "block" }}>What you learn.</span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ fontWeight: 300, display: "block" }}>What you keep.</span>
            </span>
          </h2>

          <a
            href="https://mainstack.com/c/kaykav"
            target="_blank"
            rel="noopener noreferrer"
            className="anim-fade gold-btn"
            style={{
              marginTop: "clamp(24px, 5vh, 68px)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: "#d3a35c",
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

        {/* Right column */}
        <div
          style={{
            padding: "104px 30px 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            className="anim-fade"
            style={{
              fontSize: "clamp(15px, 2.2vw, 36px)",
              fontWeight: 400,
              color: "#000",
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            Four modules, each building on the last. Every concept taught through building something real — not slides, not theory, not notes you&apos;ll never revisit.
          </p>

          {/* Curriculum list */}
          <div style={{ marginTop: "auto" }} className="anim-stagger">
            {curriculum.map((item, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.2)",
                  padding: "clamp(14px, 2vh, 24px) 0",
                }}
              >
                <p style={{
                  fontSize: "clamp(15px, 2.2vw, 36px)",
                  fontWeight: 400,
                  color: "#000",
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gold-btn {
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        .gold-btn:hover {
          background-color: #295898 !important; /* switch to primary blue */
          color: #fff !important;
        }
        .gold-btn svg path {
          transition: stroke 0.3s ease;
        }
        .gold-btn:hover svg path {
          stroke: #fff !important;
        }
        
        @media (max-width: 768px) {
          .course-grid {
            grid-template-columns: 1fr !important;
          }
          .gold-btn { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
