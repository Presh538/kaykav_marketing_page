"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ── Images ──────────────────────────────────────────────────────────────────
const BASE_IMAGES = [
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1536566482680-fca31930a0bd?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=420&fit=crop",
  "https://images.unsplash.com/photo-1545486332-9e0999397c0a?w=600&h=420&fit=crop",
];
const IMAGES = [...BASE_IMAGES, ...BASE_IMAGES, ...BASE_IMAGES];

// ── Component ────────────────────────────────────────────────────────────────
export default function HeroSpiral() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;
    
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    // Move the camera so it frames the spiral well
    camera.position.z = width < 768 ? 800 : 700;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Group to hold the spiral
    const spiralGroup = new THREE.Group();
    // Offset slightly to the right to match original positioning
    spiralGroup.position.x = width * 0.15;
    scene.add(spiralGroup);

    // --- Geometry & Materials ---
    const TILE_W = 210;
    const TILE_H = 148;
    const SPIRAL_RADIUS = width < 768 ? 160 : 250;
    
    // Create a curved PlaneGeometry to physically bend the images
    const geometry = new THREE.PlaneGeometry(TILE_W, TILE_H, 32, 1);
    const pos = geometry.attributes.position;
    const curveRadius = TILE_W * 0.75; // The tighter this is, the more the image bends
    
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const theta = x / curveRadius;
      const newX = Math.sin(theta) * curveRadius;
      const newZ = (Math.cos(theta) - 1) * curveRadius;
      pos.setX(i, newX);
      pos.setZ(i, newZ);
    }
    geometry.computeVertexNormals();

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");
    const meshes: THREE.Mesh[] = [];

    IMAGES.forEach((src, i) => {
      textureLoader.load(src, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        // Calculate spiral position
        const itemsPerLoop = 6;
        const angle = i * (Math.PI * 2 / itemsPerLoop);
        const yOffset = (i - IMAGES.length / 2) * 50;
        
        mesh.position.x = Math.cos(angle) * SPIRAL_RADIUS;
        mesh.position.y = yOffset;
        mesh.position.z = Math.sin(angle) * SPIRAL_RADIUS;
        
        // Face outwards radially
        mesh.rotation.y = -angle + Math.PI / 2;
        // Apply pitch (tilt) and yaw skew for dynamic fanned-out effect
        mesh.rotation.x = Math.PI / 10;
        mesh.rotation.z = -Math.PI / 16;
        
        spiralGroup.add(mesh);
        meshes.push(mesh);

        // Intro animation
        import("gsap").then(({ default: gsap }) => {
          gsap.fromTo(mesh.material, 
            { opacity: 0 }, 
            { 
              opacity: 1, 
              duration: 1, 
              delay: 0.05 * i,
              onComplete: () => { mesh.userData.introComplete = true; }
            }
          );
        });
      });
    });

    // --- Interaction ---
    let rx = 0;
    let ry = 0;
    let trx = 0.1;
    let try_ = 0;
    let dragging = false;
    let lx = 0, ly = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lx = e.clientX; ly = e.clientY;
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
        containerRef.current.style.cursor = "grabbing";
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      try_ += (e.clientX - lx) * 0.005;
      trx  -= (e.clientY - ly) * 0.005;
      trx = Math.max(-0.4, Math.min(0.4, trx)); // clamp pitch
      lx = e.clientX; ly = e.clientY;
    };
    const onUp = () => { 
      dragging = false; 
      if (containerRef.current) containerRef.current.style.cursor = "grab"; 
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      try_ -= e.deltaY * 0.0015;
      trx  -= e.deltaX * 0.0015;
      trx = Math.max(-0.4, Math.min(0.4, trx));
    };

    const container = containerRef.current;
    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerup", onUp);
    container.addEventListener("pointercancel", onUp);
    container.addEventListener("wheel", onWheel, { passive: false });

    // --- Render Loop ---
    let alive = true;
    let removeTicker: (() => void) | null = null;

    import("gsap").then(({ default: gsap }) => {
      const tick = () => {
        if (!alive) return;

        // Auto spin
        if (!dragging) try_ += 0.002;

        // Soft lerp rotation
        rx += (trx - rx) * 0.08;
        ry += (try_ - ry) * 0.08;

        spiralGroup.rotation.x = rx;
        spiralGroup.rotation.y = ry;

        // Calculate opacity based on depth fading
        meshes.forEach((mesh) => {
          const worldPos = new THREE.Vector3();
          mesh.getWorldPosition(worldPos);
          
          // Z ranges roughly -SPIRAL_RADIUS to +SPIRAL_RADIUS
          const normalizedDepth = (worldPos.z / SPIRAL_RADIUS + 1) * 0.5;
          const targetOpacity = Math.max(0.05, Math.min(1, 0.05 + normalizedDepth * 1.5));
          
          if (mesh.material instanceof THREE.MeshBasicMaterial && mesh.userData.introComplete) {
            mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.15;
          }
        });

        renderer.render(scene, camera);
      };

      gsap.ticker.add(tick);
      removeTicker = () => gsap.ticker.remove(tick);
    });

    // --- Resize ---
    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      
      // Update position based on breakpoint
      spiralGroup.position.x = w < 768 ? 0 : w * 0.15;
      camera.position.z = w < 768 ? 800 : 700;
    };
    window.addEventListener("resize", onResize);

    // --- Cleanup ---
    return () => {
      alive = false;
      removeTicker?.();
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointercancel", onUp);
      container.removeEventListener("wheel", onWheel);
      
      geometry.dispose();
      meshes.forEach(m => {
        if (m.material instanceof THREE.Material) m.material.dispose();
        if (m.material instanceof THREE.MeshBasicMaterial && m.material.map) m.material.map.dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        cursor: "grab",
      }}
    />
  );
}
