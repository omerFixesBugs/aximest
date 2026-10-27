"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { Mark } from "./Icons";
import styles from "./LogoScene.module.css";

/* The symbol from public/Logo/logo/aximest-symbol-*.svg, in its own viewBox
   ("2 4 78 90"), drawn as one closed stroke. */
const POINTS: [number, number][] = [
  [50, 50],
  [30, 8],
  [6, 90],
  [50, 50],
  [76, 26],
  [62, 75],
];
const CENTER: [number, number] = [41, 49];
const TAU = Math.PI * 2;

/* regular: a touch heavier than the 4.5 stroke so it reads as solid.
   bold: a fat, deep bar — the tube is also stretched front to back. */
const WEIGHTS = {
  regular: { radius: 2.6, depth: 1 },
  bold: { radius: 5.4, depth: 1.6 },
} as const;

/**
 * The Aximest symbol as a chrome tube. It leans toward the cursor, can be
 * flicked round with a drag (it always settles back facing front), and
 * turns a little as `section` scrolls past. `fill` is the share of the
 * host's height the symbol takes up.
 */
export default function LogoScene({
  section,
  weight = "regular",
  fill = 0.78,
}: {
  section: RefObject<HTMLElement | null>;
  weight?: keyof typeof WEIGHTS;
  fill?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

  useEffect(() => {
    const el = host.current;
    const sec = section.current;
    if (!el || !sec) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
      if (disposed) return;

      // phones: smaller buffer, no MSAA — the symbol is small there and older
      // GPUs drop frames rendering it at 2x with antialiasing
      const touch = window.matchMedia("(pointer: coarse)").matches;
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: !touch, alpha: true, powerPreference: "high-performance" });
      } catch {
        setState("failed");
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, touch ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTexture;

      const camera = new THREE.PerspectiveCamera(28, 1, 1, 2000);

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xdedfe2,
        metalness: 1,
        roughness: 0.16,
        clearcoat: 1,
        clearcoatRoughness: 0.08,
        envMapIntensity: 1.25,
      });

      // one cylinder per edge plus a sphere on every corner = a round-joined stroke
      const { radius: RADIUS, depth } = WEIGHTS[weight];
      const toVec = ([x, y]: [number, number]) =>
        new THREE.Vector3(x - CENTER[0], -(y - CENTER[1]), 0);
      const logo = new THREE.Group();
      const sphere = new THREE.SphereGeometry(RADIUS, 32, 16);
      const geometries: import("three").BufferGeometry[] = [sphere];
      const up = new THREE.Vector3(0, 1, 0);
      POINTS.forEach((p, i) => {
        const a = toVec(p);
        const b = toVec(POINTS[(i + 1) % POINTS.length]);
        const dir = b.clone().sub(a);
        const cylinder = new THREE.CylinderGeometry(RADIUS, RADIUS, dir.length(), 40, 1, true);
        geometries.push(cylinder);
        const edge = new THREE.Mesh(cylinder, material);
        edge.position.copy(a).add(b).multiplyScalar(0.5);
        edge.quaternion.setFromUnitVectors(up, dir.normalize());
        logo.add(edge);

        const joint = new THREE.Mesh(sphere, material);
        joint.position.copy(a);
        logo.add(joint);
      });
      logo.scale.z = depth;
      scene.add(logo);

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(-40, 60, 80);
      scene.add(key);

      // frame the symbol to `fill` of the host's height, or its width on phones
      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        const half = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const byHeight = ((84 + RADIUS * 2) / fill) / 2 / half;
        const byWidth = ((72 + RADIUS * 2) / 0.82) / 2 / (half * camera.aspect);
        camera.position.set(0, 0, Math.max(byHeight, byWidth));
        camera.updateProjectionMatrix();
        render();
      };

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // --- interaction state ---
      const pointer = { x: 0, y: 0 };
      const tilt = { x: 0, y: 0 };
      let spin = 0;
      let spinVel = 0;
      let dragging = false;
      let lastX = 0;
      let lastT = 0;
      let scroll = 0;

      const onPointerMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
        if (dragging) {
          const now = performance.now();
          const dx = e.clientX - lastX;
          spin += dx * 0.01;
          spinVel = (dx * 0.01) / Math.max(1, now - lastT) * 1000;
          lastX = e.clientX;
          lastT = now;
        }
      };
      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        // leave text selection and links alone
        if ((e.target as HTMLElement).closest("a, button, p, h1, li, span")) return;
        dragging = true;
        lastX = e.clientX;
        lastT = performance.now();
        spinVel = 0;
        sec.style.cursor = "grabbing";
        e.preventDefault();
      };
      const onPointerUp = () => {
        if (!dragging) return;
        dragging = false;
        sec.style.cursor = "";
      };

      const readScroll = () => {
        const rect = sec.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        scroll = Math.max(-1, Math.min(1, 1 - (rect.top + rect.height / 2) / vh));
      };

      // --- loop, only while the section is on screen ---
      const timer = new THREE.Timer();
      let frame = 0;
      let visible = false;

      function render() {
        renderer.render(scene, camera);
      }

      const tick = () => {
        frame = requestAnimationFrame(tick);
        timer.update();
        const dt = Math.min(timer.getDelta(), 1 / 20);
        const t = timer.getElapsed();

        tilt.x += (pointer.y * 0.35 - tilt.x) * Math.min(1, dt * 4);
        tilt.y += (pointer.x * 0.55 - tilt.y) * Math.min(1, dt * 4);

        if (!dragging) {
          // coast, then spring back to the nearest front-facing turn
          const home = Math.round(spin / TAU) * TAU;
          spinVel += (home - spin) * 6 * dt;
          spinVel *= Math.exp(-2.4 * dt);
          spin += spinVel * dt;
        }

        logo.rotation.set(
          tilt.x + scroll * 0.35,
          spin + tilt.y + Math.sin(t * 0.5) * 0.08,
          scroll * -0.12,
        );
        logo.position.y = Math.sin(t * 0.8) * 1.2;
        render();
      };

      const start = () => {
        if (frame || reduced || !visible) return;
        timer.update();
        frame = requestAnimationFrame(tick);
      };
      const stop = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      });
      io.observe(sec);

      const onVisibility = () => (document.hidden ? stop() : start());
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("scroll", readScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      sec.addEventListener("pointerdown", onPointerDown);

      readScroll();
      resize();
      setState("ready");

      cleanup = () => {
        stop();
        timer.dispose();
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("scroll", readScroll);
        document.removeEventListener("visibilitychange", onVisibility);
        sec.removeEventListener("pointerdown", onPointerDown);
        sec.style.cursor = "";
        geometries.forEach((g) => g.dispose());
        material.dispose();
        envTexture.dispose();
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })().catch(() => {
      if (!disposed) setState("failed");
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [section, weight, fill]);

  return (
    <div className={styles.scene} ref={host} data-state={state}>
      {state === "failed" ? (
        <span className={styles.fallback}>
          <Mark />
        </span>
      ) : null}
    </div>
  );
}
