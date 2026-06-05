import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr auto auto",
      background: "#000",
      borderTop: "0.5px solid #222",
    }}>
      <div style={{ borderRight: "0.5px solid #222", padding: "24px 28px", display: "flex", alignItems: "center" }}>
        <Image src="/logo.svg" alt="KayKav" width={100} height={32}
          style={{ height: "20px", width: "auto", opacity: 0.4, filter: "invert(1)" }} />
      </div>
      <div style={{ borderRight: "0.5px solid #222", padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} KayKav Academy. All rights reserved.
        </span>
      </div>
      <div style={{ borderRight: "0.5px solid #222", padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Built, Not Prompted.
        </span>
      </div>
      <div style={{ padding: "24px 32px", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          GMT+1
        </span>
      </div>
      <style>{`
        @media (max-width: 768px) {
          footer { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
