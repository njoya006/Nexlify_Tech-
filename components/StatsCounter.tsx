"use client";

import { useRef, useState, useEffect } from "react";

const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";
const PINK   = "#FF2D78";

const STATS = [
  { value: 7,   suffix: "",  label: "Team Members",         accent: CYAN,   accentRgb: "0,245,255" },
  { value: 6,   suffix: "+", label: "Products Built",       accent: VIOLET, accentRgb: "123,47,255" },
  { value: 3,   suffix: "",  label: "Countries Reached",    accent: PINK,   accentRgb: "255,45,120" },
  { value: 100, suffix: "%", label: "African-Built",        accent: CYAN,   accentRgb: "0,245,255" },
];

function useCount(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
      else setCount(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, accent, accentRgb, active, index }: {
  value: number; suffix: string; label: string;
  accent: string; accentRgb: string; active: boolean; index: number;
}) {
  const count = useCount(value, active, 1600 + index * 120);

  return (
    <div style={{
      flex:          "1 1 160px",
      textAlign:     "center",
      padding:       "2rem 1rem",
      position:      "relative",
      opacity:       active ? 1 : 0,
      transform:     active ? "translateY(0)" : "translateY(30px)",
      transition:    `opacity 0.7s ease ${index * 0.12}s, transform 0.7s ease ${index * 0.12}s`,
    }}>
      {/* Vertical divider (except first) */}
      {index > 0 && (
        <div style={{
          position:   "absolute",
          left:       0, top: "20%", bottom: "20%",
          width:      "1px",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.07), transparent)",
        }} />
      )}

      {/* Number */}
      <div style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(3rem,5vw,5rem)",
        color:         accent,
        lineHeight:    1,
        letterSpacing: "-0.02em",
        textShadow:    `0 0 40px rgba(${accentRgb},0.45)`,
        marginBottom:  "0.5rem",
      }}>
        {count}{suffix}
      </div>

      {/* Label */}
      <div style={{
        fontFamily:    "var(--font-space)",
        fontSize:      "clamp(0.72rem,0.9vw,0.85rem)",
        color:         "rgba(209,213,219,0.55)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsCounter() {
  const ref    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      position:   "relative",
      zIndex:     1,
      background: "rgba(5,5,8,0.60)",
      borderTop:    "1px solid rgba(255,255,255,0.04)",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      {/* Subtle cyan glow behind */}
      <div aria-hidden="true" style={{
        position:   "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,245,255,0.03) 0%, transparent 70%)",
      }} />

      <div style={{
        maxWidth:  "1100px",
        margin:    "0 auto",
        padding:   "0 clamp(1.5rem,5vw,4rem)",
        display:   "flex",
        flexWrap:  "wrap",
        position:  "relative",
        zIndex:    1,
      }}>
        {STATS.map((s, i) => (
          <StatItem key={s.label} {...s} active={active} index={i} />
        ))}
      </div>
    </div>
  );
}
