"use client";

// Ambient mesh background — fixed behind all content, pure CSS.
export default function MeshBackground() {
  return (
    <>
      <style>{`
        /* ── Orb drift keyframes ───────────────────────────────────── */
        @keyframes drift-cyan {
          0%   { transform: translate(0px,    0px)    scale(1);    }
          33%  { transform: translate(120px, -80px)   scale(1.08); }
          66%  { transform: translate(-60px,  100px)  scale(0.94); }
          100% { transform: translate(0px,    0px)    scale(1);    }
        }
        @keyframes drift-violet {
          0%   { transform: translate(0px,   0px)   scale(1);    }
          40%  { transform: translate(-140px, 90px)  scale(1.12); }
          70%  { transform: translate(80px,  -120px) scale(0.92); }
          100% { transform: translate(0px,   0px)   scale(1);    }
        }
        @keyframes drift-pink {
          0%   { transform: translate(0px, 0px)    scale(1);    }
          50%  { transform: translate(70px, 140px)  scale(1.15); }
          100% { transform: translate(0px, 0px)    scale(1);    }
        }
        @keyframes drift-cyan2 {
          0%   { transform: translate(0px,    0px)   scale(1);    }
          45%  { transform: translate(-90px, -110px) scale(1.06); }
          100% { transform: translate(0px,    0px)   scale(1);    }
        }

        /* ── Aurora beam sweep ────────────────────────────────────── */
        @keyframes aurora-sweep {
          0%   { transform: translateY(-30vh) rotate(-8deg); opacity: 0;    }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(130vh) rotate(-8deg); opacity: 0;    }
        }

        /* ── Subtle dot grid ──────────────────────────────────────── */
        .mesh-dot-grid {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.045) 1px,
            transparent 1px
          );
          background-size: 40px 40px;
        }

        /* ── Scanlines ────────────────────────────────────────────── */
        .mesh-scanlines {
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 245, 255, 0.006) 3px,
            rgba(0, 245, 255, 0.006) 4px
          );
        }
      `}</style>

      {/* 1 ── Base black */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
          background:    "#050508",
        }}
      />

      {/* 2 ── Dot grid */}
      <div
        aria-hidden="true"
        className="mesh-dot-grid"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
        }}
      />

      {/* 3 ── Cyan orb — top-left anchor */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "-10vh",
          left:          "-5vw",
          width:         "70vw",
          height:        "70vw",
          zIndex:        0,
          pointerEvents: "none",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, transparent 65%)",
          animation:     "drift-cyan 22s ease-in-out infinite",
          willChange:    "transform",
        }}
      />

      {/* 4 ── Violet orb — bottom-right anchor */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          bottom:        "-15vh",
          right:         "-8vw",
          width:         "75vw",
          height:        "75vw",
          zIndex:        0,
          pointerEvents: "none",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(123,47,255,0.09) 0%, transparent 65%)",
          animation:     "drift-violet 28s ease-in-out infinite",
          willChange:    "transform",
        }}
      />

      {/* 5 ── Pink orb — center anchor */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "30vh",
          left:          "35vw",
          width:         "40vw",
          height:        "40vw",
          zIndex:        0,
          pointerEvents: "none",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(255,45,120,0.05) 0%, transparent 65%)",
          animation:     "drift-pink 20s ease-in-out infinite",
          willChange:    "transform",
        }}
      />

      {/* 6 ── Second cyan orb — top-right counter-drift */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           "5vh",
          right:         "5vw",
          width:         "45vw",
          height:        "45vw",
          zIndex:        0,
          pointerEvents: "none",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.045) 0%, transparent 65%)",
          animation:     "drift-cyan2 26s ease-in-out infinite",
          willChange:    "transform",
        }}
      />

      {/* 7 ── Aurora sweep beam */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          "-20%",
          width:         "140%",
          height:        "1px",
          zIndex:        0,
          pointerEvents: "none",
          background:    "linear-gradient(90deg, transparent 0%, rgba(0,245,255,0.12) 30%, rgba(123,47,255,0.10) 60%, transparent 100%)",
          boxShadow:     "0 0 40px 12px rgba(0,245,255,0.04)",
          animation:     "aurora-sweep 18s ease-in-out infinite",
          animationDelay:"-6s",
          willChange:    "transform, opacity",
        }}
      />

      {/* 8 ── Edge vignette — focuses attention center-screen */}
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
          background:    "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 40%, rgba(2,2,6,0.75) 100%)",
        }}
      />

      {/* 9 ── Scanlines */}
      <div
        aria-hidden="true"
        className="mesh-scanlines"
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
