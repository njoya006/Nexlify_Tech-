"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // enter → hold after 300ms, hold → exit after 1.4s total, then call onDone
    const t1 = setTimeout(() => setPhase("hold"),  300);
    const t2 = setTimeout(() => setPhase("exit"),  1400);
    const t3 = setTimeout(() => onDone(),           1900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      aria-hidden="true"
      style={{
        position:       "fixed",
        inset:          0,
        zIndex:         9999,
        background:     "#050508",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexDirection:  "column",
        gap:            "1.5rem",
        opacity:        phase === "exit" ? 0 : 1,
        transform:      phase === "exit" ? "scale(1.04)" : "scale(1)",
        transition:     "opacity 0.5s ease, transform 0.5s ease",
        pointerEvents:  phase === "exit" ? "none" : "all",
      }}
    >
      {/* Logo mark */}
      <div style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(2.2rem,5vw,3.6rem)",
        letterSpacing: "0.06em",
        background:    "linear-gradient(135deg, #00F5FF 0%, #7B2FFF 60%, #FF2D78 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor:  "transparent",
        backgroundClip: "text",
        opacity:       phase === "enter" ? 0 : 1,
        transform:     phase === "enter" ? "translateY(12px)" : "translateY(0)",
        transition:    "opacity 0.5s ease, transform 0.5s ease",
      }}>
        NEXLIFY
      </div>

      {/* Pulse bar */}
      <div style={{
        width:        "clamp(120px,14vw,180px)",
        height:       "2px",
        background:   "rgba(255,255,255,0.08)",
        borderRadius: "2px",
        overflow:     "hidden",
        position:     "relative",
      }}>
        <div style={{
          position:   "absolute",
          inset:      0,
          background: "linear-gradient(90deg, #00F5FF, #7B2FFF, #FF2D78)",
          transformOrigin: "left center",
          transform:  phase === "enter" ? "scaleX(0)" : phase === "hold" ? "scaleX(1)" : "scaleX(1)",
          transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>

      {/* Tag */}
      <div style={{
        fontFamily:    "var(--font-space)",
        fontSize:      "clamp(0.6rem,0.8vw,0.7rem)",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color:         "rgba(209,213,219,0.35)",
        opacity:       phase === "enter" ? 0 : 1,
        transition:    "opacity 0.6s ease 0.2s",
      }}>
        Digital Studio · Cameroon
      </div>
    </div>
  );
}
