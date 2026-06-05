"use client";

const features = [
  { icon: <BookHeart />, label: "4 core modules" },
  { icon: <LaptopCode />, label: "Live build capstone" },
  { icon: <Users />, label: "Community access" },
  { icon: <Sparkle />, label: "AI skill Framework" },
];

export default function Enrol() {
  return (
    <section
      id="enrol"
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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingTop: "68px",
        }}
      >
        {/* Headline — right-centre */}
        <div className="enrol-indent">
          <h2
            className="anim-lines"
            style={{
              fontSize: "clamp(32px, 5.2vw, 72px)",
              color: "#fff",
              textTransform: "uppercase",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="line-mask">
              <span className="line-inner" style={{ fontWeight: 400, display: "block" }}>Stop prompting.</span>
            </span>
            <span className="line-mask">
              <span className="line-inner" style={{ fontWeight: 800, display: "block" }}>Start building.</span>
            </span>
          </h2>
        </div>

        {/* Subtext */}
        <div
          className="anim-fade enrol-subtext"
          style={{
            marginTop: "clamp(30px, 5vh, 80px)",
            paddingLeft: "17px",
            paddingRight: "30px",
            maxWidth: "min(684px, 60%)",
          }}
        >
          <p style={{
            fontSize: "clamp(15px, 2.2vw, 36px)",
            fontWeight: 400,
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}>
            Seats are limited each cohort. If you&apos;re serious about shipping production-grade products with AI — this is where you start.
          </p>
        </div>

        {/* Features 2×2 grid */}
        <div
          className="enrol-indent anim-stagger enrol-features"
          style={{
            marginTop: "clamp(30px, 5vh, 60px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(16px, 2.5vh, 28px) clamp(24px, 3vw, 48px)",
            maxWidth: "460px",
          }}
        >
          {features.map(({ icon, label }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {icon}
              <p style={{
                fontSize: "clamp(13px, 1.3vw, 20px)",
                fontWeight: 400,
                color: "#fff",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Placeholder image boxes */}
        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {([283, 326, 326, 283] as const).map((h, i) => (
            <div
              key={i}
              style={{
                background: "#d9d9d9",
                height: `clamp(120px, ${(h / 1080) * 100}vh, ${h}px)`,
                alignSelf: "flex-end",
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <div style={{ display: "flex", justifyContent: "center", padding: "clamp(20px, 3vh, 40px) 0" }}>
          <a
            href="https://mainstack.com/c/kaykav"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
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
      </div>

      <style>{`
        .enrol-indent {
          margin-left: calc(33.33% + 17px);
          padding-right: 30px;
        }
        .enrol-subtext {
          margin-left: 25%;
        }
        .enrol-features {
          margin-left: calc(33.33% + 17px);
        }
        @media (max-width: 768px) {
          .enrol-indent, .enrol-subtext, .enrol-features {
            margin-left: 30px !important;
          }
          .enrol-subtext { max-width: calc(100% - 60px) !important; }
          .enrol-features { max-width: calc(100% - 60px) !important; }
        }
      `}</style>
    </section>
  );
}

function BookHeart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7.5c0-.83.67-1.5 1.5-1.5S15 6.67 15 7.5c0 1.5-2.5 3-2.5 3S10 9 10 7.5C10 6.67 10.67 6 11.5 6s1.5.67 1.5 1.5z" fill="white"/>
    </svg>
  );
}

function LaptopCode() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="13" rx="1" stroke="white" strokeWidth="1.5"/>
      <path d="M2 20h20" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 10l-2 2 2 2M15 10l2 2-2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Users() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="7" r="3" stroke="white" strokeWidth="1.5"/>
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.85" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function Sparkle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}
