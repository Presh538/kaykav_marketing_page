"use client";
import { useEffect, useRef } from "react";

// Real photographic images via Unsplash CDN (crossorigin supported)
const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=560&fit=crop", // colour mesh gradient
  "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?w=800&h=560&fit=crop", // dark cave glow
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=560&fit=crop", // dark purple abstract
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=560&fit=crop", // moody landscape
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=560&fit=crop", // green circuit
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800&h=560&fit=crop", // warm forest light
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&h=560&fit=crop", // warm abstract
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&h=560&fit=crop", // blue neon geometric
  "https://images.unsplash.com/photo-1545486332-9e0999397c0a?w=800&h=560&fit=crop", // pink neon
];

// Per-card config: width, height (world units), and subtle individual tilts
const CARDS = [
  { w: 3.4, h: 2.1, rx:  0.10, rz: -0.06 },
  { w: 2.8, h: 1.8, rx: -0.14, rz:  0.09 },
  { w: 2.5, h: 1.9, rx:  0.06, rz: -0.13 },
  { w: 3.1, h: 2.0, rx: -0.08, rz:  0.05 },
  { w: 2.2, h: 1.7, rx:  0.13, rz:  0.07 },
  { w: 2.6, h: 1.7, rx: -0.05, rz: -0.11 },
  { w: 2.9, h: 1.8, rx:  0.09, rz:  0.08 },
  { w: 2.4, h: 1.7, rx: -0.12, rz: -0.04 },
  { w: 2.0, h: 1.6, rx:  0.04, rz:  0.10 },
];

// Fallback gradient while image loads
function makePlaceholder(idx: number, THREE: typeof import("three")) {
  const colors = [
    ["#0a0020","#7c3aed"], ["#001529","#0ea5e9"], ["#001a0f","#10b981"],
    ["#1a0010","#e11d48"], ["#0d0d20","#6366f1"], ["#1a0900","#f59e0b"],
    ["#001919","#14b8a6"], ["#0c0020","#a855f7"], ["#001a0a","#22c55e"],
  ];
  const [c1, c2] = colors[idx % colors.length];
  const cv = document.createElement("canvas");
  cv.width = 4; cv.height = 4;
  const ctx = cv.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 4, 4);
  g.addColorStop(0, c1); g.addColorStop(1, c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, 4, 4);
  return new THREE.CanvasTexture(cv);
}

// Curved card geometry — cylindrical bend along X + slight bow on Y
function makeCardGeo(w: number, h: number, THREE: typeof import("three")) {
  const geo = new THREE.PlaneGeometry(w, h, 24, 6);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const xn = pos.getX(i) / (w * 0.5);   // –1 → +1
    const yn = pos.getY(i) / (h * 0.5);   // –1 → +1
    pos.setZ(i, -0.5 * xn * xn - 0.08 * yn * yn);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

export default function HeroCollage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let alive = true;

    (async () => {
      const THREE = await import("three");
      const gsap  = (await import("gsap")).default;
      if (!alive) return;

      const W = wrap.clientWidth  || window.innerWidth;
      const H = wrap.clientHeight || window.innerHeight;

      // ── Renderer ──────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      // Allow pointer events for drag interaction
      renderer.domElement.style.cursor = "grab";
      wrap.style.pointerEvents = "auto";
      wrap.appendChild(renderer.domElement);

      // ── Scene / Camera ────────────────────────────────────────────────
      const scene  = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
      camera.position.set(-1.8, 0, 12);
      camera.lookAt(2.2, 0, 0);

      // ── Scene graph: tilt container → rotating orbit ──────────────────
      const tilt = new THREE.Group();
      tilt.position.set(2.2, 0, 0);
      tilt.rotation.x =  0.68;   // ~39° forward tilt → spreads cards vertically
      tilt.rotation.z = -0.09;
      scene.add(tilt);

      const orbit = new THREE.Group();
      tilt.add(orbit);

      // ── Build cards ───────────────────────────────────────────────────
      const R = 4.8;
      const meshes: THREE.Mesh[] = [];
      const loader = new THREE.TextureLoader();

      CARDS.forEach((cfg, i) => {
        const angle = (i / CARDS.length) * Math.PI * 2;

        // Start with gradient placeholder
        const mat = new THREE.MeshBasicMaterial({
          map: makePlaceholder(i, THREE),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
        });

        const mesh = new THREE.Mesh(makeCardGeo(cfg.w, cfg.h, THREE), mat);
        mesh.position.set(
          Math.sin(angle) * R,
          Math.sin(angle * 2.2 + i * 0.3) * 0.55,
          Math.cos(angle) * R
        );
        mesh.lookAt(0, mesh.position.y, 0);
        mesh.rotation.x += cfg.rx;
        mesh.rotation.z += cfg.rz;

        orbit.add(mesh);
        meshes.push(mesh);

        // Load real image async, swap in when ready
        loader.setCrossOrigin("anonymous");
        loader.load(
          CARD_IMAGES[i],
          (tex) => {
            if (!alive) return;
            tex.colorSpace = THREE.SRGBColorSpace;
            mat.map = tex;
            mat.needsUpdate = true;
          },
          undefined,
          () => { /* keep placeholder on error */ }
        );
      });

      // ── GSAP drag-to-spin with momentum ──────────────────────────────
      let isDragging = false;
      let lastPointerX = 0;
      let lastPointerTime = 0;
      let pointerVelocity = 0;
      let autoRotSpeed = 0.0032;   // baseline auto-spin speed

      const onPointerDown = (e: PointerEvent) => {
        isDragging = true;
        lastPointerX = e.clientX;
        lastPointerTime = performance.now();
        pointerVelocity = 0;
        renderer.domElement.style.cursor = "grabbing";
        gsap.killTweensOf(orbit.rotation);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return;
        const now = performance.now();
        const dx  = e.clientX - lastPointerX;
        const dt  = Math.max(now - lastPointerTime, 1);
        pointerVelocity = dx / dt;              // px/ms
        orbit.rotation.y += dx * 0.006;
        lastPointerX = e.clientX;
        lastPointerTime = now;
      };

      const onPointerUp = () => {
        if (!isDragging) return;
        isDragging = false;
        renderer.domElement.style.cursor = "grab";
        // Inertia: carry the momentum, then resume auto-spin
        const throwDist = pointerVelocity * 60;
        gsap.to(orbit.rotation, {
          y: orbit.rotation.y + throwDist,
          duration: 1.8,
          ease: "power2.out",
          onComplete: () => { autoRotSpeed = 0.0032; },
        });
        autoRotSpeed = 0; // pause auto-spin during throw
      };

      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);

      // ── Mouse parallax (only when not dragging) ───────────────────────
      let tx = 0, ty = 0, mx = 0, my = 0;
      const onMouseMove = (e: MouseEvent) => {
        tx = (e.clientX / window.innerWidth  - 0.5) * 2;
        ty = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // ── Resize ────────────────────────────────────────────────────────
      const onResize = () => {
        const w = wrap.clientWidth, h = wrap.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      // ── Render loop ───────────────────────────────────────────────────
      let t = 0;
      const tmp = new THREE.Vector3();
      const camBase = { x: -1.8 };

      const loop = () => {
        if (!alive) return;
        raf = requestAnimationFrame(loop);
        t += 0.004;

        // Auto-rotate
        if (!isDragging) orbit.rotation.y += autoRotSpeed;

        // Camera parallax
        mx += (tx - mx) * 0.04;
        my += (ty - my) * 0.04;
        camera.position.x += (camBase.x + mx * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (my * 0.7 - camera.position.y) * 0.04;
        camera.lookAt(2.2, 0, 0);

        // Per-card float + DoF (opacity + subtle scale)
        meshes.forEach((mesh, i) => {
          // Gentle individual float
          mesh.position.y =
            Math.sin(t * 0.5 + i * 1.15) * 0.12 +
            Math.sin((i / CARDS.length) * Math.PI * 4) * 0.5;

          // Re-face orbit centre then re-apply individual tilt
          mesh.lookAt(0, mesh.position.y, 0);
          mesh.rotation.x += CARDS[i].rx;
          mesh.rotation.z += CARDS[i].rz;

          // World Z → opacity (DoF approximation)
          mesh.getWorldPosition(tmp);
          const zNorm = THREE.MathUtils.mapLinear(tmp.z, -R - 1, R + 1, 0, 1);
          const op    = THREE.MathUtils.clamp(0.2 + zNorm * 0.8, 0.2, 1.0);
          (mesh.material as THREE.MeshBasicMaterial).opacity = op;

          // Subtle scale — front cards slightly larger (parallax depth cue)
          const sc = THREE.MathUtils.mapLinear(tmp.z, -R - 1, R + 1, 0.88, 1.06);
          mesh.scale.setScalar(THREE.MathUtils.clamp(sc, 0.88, 1.06));
        });

        renderer.render(scene, camera);
      };

      loop();

      // ── Cleanup ───────────────────────────────────────────────────────
      (wrapRef as any)._cleanup = () => {
        alive = false;
        cancelAnimationFrame(raf);
        renderer.domElement.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        meshes.forEach(m => {
          m.geometry.dispose();
          const mat = m.material as THREE.MeshBasicMaterial;
          mat.map?.dispose();
          mat.dispose();
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      (wrapRef as any)._cleanup?.();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        cursor: "grab",
      }}
    />
  );
}
