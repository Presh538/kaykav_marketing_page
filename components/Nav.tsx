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
        {/* Full logo — mark + wordmark combined */}
        <a href="#" aria-label="KayKav Academy" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Image
            src="/full-logo.svg"
            alt="KayKav Academy"
            width={145}
            height={45}
            priority
            style={{ height: "45px", width: "auto" }}
          />
        </a>

        {/* Desktop enroll CTA */}
        <a
          href="https://mainstack.com/c/kaykav"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-enroll"
        >
          <span>Enroll Into our Latest Course</span>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13.3006C18 13.3006 31.8766 12.2152 33.8308 14.1693C35.7848 16.1233 34.6992 30 34.6992 30M33 15L13 35" stroke="#D3A35C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
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
          transition: color 0.3s ease;
        }
        .nav-enroll:hover {
          color: #D3A35C;
        }
        .nav-enroll svg {
          width: clamp(14px, 2.5vw, 48px);
          height: clamp(14px, 2.5vw, 48px);
          flex-shrink: 0;
        }
        .nav-enroll svg path {
          transition: stroke 0.3s ease;
        }
        .nav-enroll:hover svg path {
          stroke: #fff; /* gold icon -> white icon */
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
