"use client";
import { useEffect, useRef } from "react";

// Replace these with actual student project screenshot URLs
const PROJECTS = [
  "https://picsum.photos/seed/kav1/800/560",
  "https://picsum.photos/seed/kav2/800/560",
  "https://picsum.photos/seed/kav3/800/560",
  "https://picsum.photos/seed/kav4/800/560",
  "https://picsum.photos/seed/kav5/800/560",
  "https://picsum.photos/seed/kav6/800/560",
  "https://picsum.photos/seed/kav7/800/560",
  "https://picsum.photos/seed/kav8/800/560",
  "https://picsum.photos/seed/kav9/800/560",
];

const CARD_W = 3.2;
const CARD_H = 2.24; // 800:560 aspect ratio
const ORBIT_RADIUS = 4.2;
const CORNER_RADIUS = 0.09; // fraction of shorter side

function makeRoundedTexture(THREE: any, src: string): Promise<any> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const W = 800, H = 560;
      const canvas = document.createElement("canvas");
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d")!;
      const r = H * CORNER_RADIUS;

      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(W, 0, W, H, r);
      ctx.arcTo(W, H, 0, H, r);
      ctx.arcTo(0, H, 0, 0, r);
      ctx.arcTo(0, 0, W, 0, r);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, W, H);

      resolve(new THREE.CanvasTexture(canvas));
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export default function HeroCollage() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId: number;
    let renderer: any;
    let mounted = true;

    // Named handlers for proper cleanup
    let onMouseMove: (e: MouseEvent) => void;
    let onResize: () => void;

    async function init() {
      const THREE = await import("three");
      if (!mounted) return;

      const W = container.clientWidth;
      const H = container.clientHeight;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(W, H);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(62, W / H, 0.1, 100);
      camera.position.set(0, 0, 8);

      const group = new THREE.Group();
      scene.add(group);

      const count = PROJECTS.length; // 9 cards = 3 rings × 3 per ring
      const meshes: Array<{ mesh: any; yBase: number }> = [];

      // Create cards immediately with placeholder color, load textures async
      PROJECTS.forEach((src, i) => {
        const geo = new THREE.PlaneGeometry(CARD_W, CARD_H);
        const mat = new THREE.MeshBasicMaterial({
          color: 0x1e2d4a,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geo, mat);

        const ring = Math.floor(i / 3);
        const slot = i % 3;
        // Each ring is offset by half a slot-angle so rings don't overlap
        const angle = (slot / 3) * Math.PI * 2 + (ring * (Math.PI / 4));
        const yBase = (ring - 1) * (CARD_H + 0.4);

        mesh.position.set(
          Math.sin(angle) * ORBIT_RADIUS,
          yBase,
          Math.cos(angle) * ORBIT_RADIUS
        );
        mesh.rotation.y = angle;
        // Subtle tilt for visual interest
        mesh.rotation.x = Math.sin(i * 1.618) * 0.12;

        group.add(mesh);
        meshes.push({ mesh, yBase });

        // Load rounded texture and swap in
        makeRoundedTexture(THREE, src).then((tex) => {
          if (!mounted || !tex) return;
          mat.map = tex;
          mat.color.set(0xffffff);
          mat.needsUpdate = true;
        });
      });

      // Mouse parallax
      let mx = 0, my = 0;
      onMouseMove = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      onResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      const clock = new THREE.Clock();

      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Continuous orbit rotation
        group.rotation.y += 0.0025;

        // Gentle per-card float
        meshes.forEach(({ mesh, yBase }, i) => {
          mesh.position.y = yBase + Math.sin(t * 0.55 + i * 0.95) * 0.14;
        });

        // Smooth camera parallax from mouse
        camera.position.x += (mx * 0.9 - camera.position.x) * 0.04;
        camera.position.y += (-my * 0.65 - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }

      animate();
    }

    init().catch(console.error);

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      if (onMouseMove) window.removeEventListener("mousemove", onMouseMove);
      if (onResize) window.removeEventListener("resize", onResize);
      if (renderer) {
        renderer.dispose();
        renderer.domElement?.remove();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        width: "65%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
