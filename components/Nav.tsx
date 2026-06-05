"use client";
import Image from "next/image";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "108px",
        background: "#295898",
        borderBottom: "0.5px solid #487dc5",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}>
        {/* Logo mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ position: "relative", width: "44px", height: "47px", flexShrink: 0 }}>
            <Image src="/logo.svg" alt="KayKav Academy" fill style={{ objectFit: "contain" }} priority />
          </div>
          <div style={{
            fontWeight: 600,
            fontSize: "26px",
            color: "#fff",
            lineHeight: 1.09,
            letterSpacing: "0",
          }}>
            <p style={{ margin: 0 }}>KayKav.</p>
            <p style={{ margin: 0 }}>Academy</p>
          </div>
        </div>

        {/* Desktop enroll CTA */}
        <a
          href="https://mainstack.com/c/kaykav"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-enroll"
        >
          <span>Enroll Into our Latest Course</span>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 38L38 10M38 10H18M38 10V30" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          aria-label="Menu"
          style={{ background: "none", border: "none", padding: "8px" }}
        >
          <span style={{ display: "block", width: "24px", height: "1.5px", background: "#fff", marginBottom: "6px", transition: "all .3s", transform: menuOpen ? "rotate(45deg) translateY(7.5px)" : "none" }} />
          <span style={{ display: "block", width: "24px", height: "1.5px", background: "#fff", opacity: menuOpen ? 0 : 1, transition: "all .3s" }} />
          <span style={{ display: "block", width: "24px", height: "1.5px", background: "#fff", marginTop: "6px", transition: "all .3s", transform: menuOpen ? "rotate(-45deg) translateY(-7.5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "#295898", zIndex: 99,
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "108px 30px 60px",
        }}>
          {[
            { label: "Course Details", href: "#course" },
            { label: "Enroll Now", href: "https://mainstack.com/c/kaykav", external: true },
          ].map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontSize: "clamp(32px, 8vw, 64px)",
                fontWeight: 300,
                color: "#fff",
                textDecoration: "none",
                textTransform: "uppercase",
                lineHeight: 1.2,
                borderBottom: "0.5px solid rgba(255,255,255,0.2)",
                paddingBottom: "24px",
                marginBottom: "24px",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .nav-enroll {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 400;
          font-size: clamp(14px, 2.5vw, 48px);
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          line-height: 1;
        }
        .nav-enroll svg {
          width: clamp(14px, 2.5vw, 48px);
          height: clamp(14px, 2.5vw, 48px);
          flex-shrink: 0;
        }
        .nav-hamburger { display: none; }

        @media (max-width: 768px) {
          .nav-enroll { display: none; }
          .nav-hamburger { display: block; }
        }
      `}</style>
    </>
  );
}
