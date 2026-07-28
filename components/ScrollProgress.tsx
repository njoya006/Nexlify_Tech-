"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min((top / max) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        height:        "2px",
        width:         `${pct}%`,
        background:    "linear-gradient(90deg, #00F5FF 0%, #7B2FFF 55%, #FF2D78 100%)",
        zIndex:        99997,
        pointerEvents: "none",
        boxShadow:     "0 0 10px rgba(0,245,255,0.75), 0 0 24px rgba(0,245,255,0.30)",
        transition:    "width 0.08s linear",
      }}
    />
  );
}
