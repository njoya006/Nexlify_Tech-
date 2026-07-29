"use client";

import { useRef, useEffect } from "react";

const ITEMS = [
  "Next.js",  "Django",  "AWS",      "PostgreSQL", "Flutter",
  "Framer Motion", "Kubernetes", "TypeScript", "React",  "TailwindCSS",
  "Mobile Money", "AI Integration", "Microservices", "CI/CD", "GraphQL",
  "Redis",    "Docker",  "Figma",    "Three.js",  "Python",
];

const SEPARATOR = "✦";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let x = 0;
    let raf: number;
    const speed = 0.45; // px per frame

    const tick = () => {
      x -= speed;
      // Reset when first half has scrolled fully off to the left
      const half = track.scrollWidth / 2;
      if (Math.abs(x) >= half) x = 0;
      track.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const band = [...ITEMS, ...ITEMS]; // doubled for seamless loop

  return (
    <div style={{
      overflow:        "hidden",
      whiteSpace:      "nowrap",
      position:        "relative",
      zIndex:          1,
      borderTop:       "1px solid rgba(255,255,255,0.05)",
      borderBottom:    "1px solid rgba(255,255,255,0.05)",
      background:      "rgba(5,5,8,0.80)",
      padding:         "0.85rem 0",
      maskImage:       "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
    }}>
      <div ref={trackRef} style={{ display: "inline-flex", gap: 0, willChange: "transform" }}>
        {band.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{
              fontFamily:    "var(--font-space)",
              fontSize:      "clamp(0.7rem,0.85vw,0.85rem)",
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color:         i % 5 === 0
                ? "#00F5FF"
                : i % 5 === 2
                  ? "#7B2FFF"
                  : i % 5 === 4
                    ? "#FF2D78"
                    : "rgba(209,213,219,0.45)",
              padding:       "0 1.2rem",
            }}>
              {item}
            </span>
            <span style={{
              color:         "rgba(255,255,255,0.15)",
              fontSize:      "0.55rem",
              lineHeight:    1,
            }}>
              {SEPARATOR}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
