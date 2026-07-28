"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Canvas, useFrame } from "@react-three/fiber";

// ─── Constants ────────────────────────────────────────────────────────────────
const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";

// module-level scroll speed — kept but capped very low for subtle effect
let _scrollSpeed = 0;

// ─── Ghost wireframe — single quiet icosahedron ───────────────────────────────
function GhostShape() {
  const ref = useRef<any>(null!);

  useFrame((_, delta) => {
    ref.current.rotation.x += 0.001 + _scrollSpeed * 0.002;
    ref.current.rotation.y += 0.0015 + _scrollSpeed * 0.003;
    _scrollSpeed = Math.max(0, _scrollSpeed - delta * 1.5);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        {...{ color: "#00f5ff", wireframe: true, transparent: true, opacity: 0.06 } as any}
      />
    </mesh>
  );
}

function WireCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <GhostShape />
      </Suspense>
    </Canvas>
  );
}

// Loaded only on the client — prevents SSR removeChild crash
const WireCanvasClient = dynamic(() => Promise.resolve(WireCanvas), { ssr: false });

// ─── Principle Card ───────────────────────────────────────────────────────────
interface Principle {
  num:   string;
  title: string;
  desc:  string;
}

const PRINCIPLES: Principle[] = [
  { num: "01", title: "Think Boldly",     desc: "We challenge every assumption before we build anything." },
  { num: "02", title: "Build Precisely",  desc: "Every pixel, every line of code, every decision is intentional." },
  { num: "03", title: "Move Fast",        desc: "Speed without chaos. We ship, learn, and iterate relentlessly." },
  { num: "04", title: "Deliver Results",  desc: "Our work is measured in outcomes, not outputs." },
  { num: "05", title: "Last Forever",     desc: "We build things that outlast trends and outlive expectations." },
];

interface CardProps {
  p:        Principle;
  index:    number;
  show:     boolean;
  rowWidth: "33" | "50";
}

function PrincipleCard({ p, index, show, rowWidth }: CardProps) {
  const entered = show;

  return (
    <div
      style={{
        flex:            `0 1 calc(${rowWidth}% - 0.7rem)`,
        minWidth:        "220px",
        background:      "rgba(13,13,31,0.70)",
        backdropFilter:  "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border:          "1px solid rgba(0,245,255,0.10)",
        borderRadius:    "12px",
        padding:         "2rem 1.5rem",
        display:         "flex",
        flexDirection:   "column",
        gap:             "0.75rem",
        cursor:          "default",
        transition:      `
          opacity 0.65s ease ${index * 0.1}s,
          transform 0.65s ease ${index * 0.1}s,
          filter 0.65s ease ${index * 0.1}s,
          border-color 0.3s ease,
          box-shadow 0.3s ease
        `,
        opacity:         entered ? 1 : 0,
        transform:       entered ? "translateY(0)" : "translateY(60px)",
        filter:          entered ? "blur(0px)" : "blur(6px)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(0,245,255,0.40)";
        el.style.boxShadow   = "0 0 28px rgba(0,245,255,0.10), 0 8px 32px rgba(0,0,0,0.4)";
        el.style.transform   = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(0,245,255,0.10)";
        el.style.boxShadow   = "none";
        el.style.transform   = entered ? "translateY(0)" : "translateY(60px)";
        el.style.filter      = entered ? "blur(0px)" : "blur(6px)";
      }}
    >
      {/* Number */}
      <span
        style={{
          fontFamily:    "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize:      "0.72rem",
          fontWeight:    700,
          color:         CYAN,
          letterSpacing: "0.08em",
          lineHeight:    1,
          opacity:       0.8,
        }}
      >
        {p.num}
      </span>

      {/* Title */}
      <span
        style={{
          fontFamily: "var(--font-space)",
          fontSize:   "clamp(0.85rem, 1.1vw, 1rem)",
          fontWeight: 700,
          color:      "#FFFFFF",
          lineHeight: 1.25,
        }}
      >
        {p.title}
      </span>

      {/* Divider */}
      <div
        style={{
          position:        "relative",
          height:          "1px",
          overflow:        "hidden",
          transformOrigin: "left",
          transform:       entered ? "scaleX(1)" : "scaleX(0)",
          opacity:         entered ? 1 : 0,
          transition:      `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.35 + index * 0.1}s,
                            opacity   0.4s ease ${0.35 + index * 0.1}s`,
        }}
      >
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(90deg, rgba(0,245,255,0.45), rgba(123,47,255,0.2), transparent)",
            boxShadow:  "0 0 6px rgba(0,245,255,0.15)",
          }}
        />
      </div>

      {/* Description */}
      <span
        style={{
          fontFamily: "var(--font-space)",
          fontSize:   "clamp(0.72rem, 0.85vw, 0.82rem)",
          fontWeight: 400,
          color:      "#D1D5DB",
          lineHeight: 1.65,
        }}
      >
        {p.desc}
      </span>
    </div>
  );
}

// ─── Manifesto ────────────────────────────────────────────────────────────────
export default function Manifesto() {
  const sectionRef  = useRef<HTMLElement>(null);
  const wordRef     = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  // IntersectionObserver — trigger at 20%
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); io.disconnect(); } },
      { threshold: 0.20 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll parallax on INNOVATION word + icosahedron speed boost
  useEffect(() => {
    const section = sectionRef.current;
    const word    = wordRef.current;
    if (!section || !word) return;

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const rect     = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      const scale    = 0.75 + progress * 0.25;   // 0.75 → 1.0
      word.style.transform = `scale(${scale})`;

      // boost icosahedron speed on scroll
      const delta = Math.abs(window.scrollY - lastScrollY);
      _scrollSpeed = Math.min(_scrollSpeed + delta * 0.012, 3);
      lastScrollY  = window.scrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      style={{
        position:   "relative",
        zIndex:     1,
        background: "transparent",
        width:      "100%",
        minHeight:  "100vh",
        display:    "flex",
        alignItems: "center",
        overflow:   "hidden",
        padding:    "7rem 0 6rem",
      }}
    >
      {/* ── Centered violet radial pulse ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          pointerEvents: "none",
          background:    "radial-gradient(ellipse 600px 400px at 50% 50%, rgba(123,47,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Ghost wireframe centered ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          width:         "400px",
          height:        "400px",
          pointerEvents: "none",
          zIndex:        0,
          opacity:       0.4,
        }}
      >
        <WireCanvasClient />
      </div>

      {/* ── All content above canvas ── */}
      <div
        style={{
          position:   "relative",
          zIndex:     2,
          width:      "100%",
          display:    "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:        "0",
          paddingLeft:  "clamp(1.5rem, 5vw, 5rem)",
          paddingRight: "clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* Label */}
        <div
          style={{
            marginBottom:  "2.5rem",
            opacity:       entered ? 1 : 0,
            transform:     entered ? "translateY(0)" : "translateY(20px)",
            transition:    "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            className="uppercase"
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "0.75rem",
              color:         CYAN,
              borderLeft:    `3px solid ${CYAN}`,
              paddingLeft:   "12px",
              letterSpacing: "0.3em",
              textShadow:    "0 0 12px rgba(0,245,255,0.6)",
            }}
          >
            Our Ideology
          </span>
        </div>

        {/* ── INNOVATION word ── */}
        <div
          ref={wordRef}
          style={{
            width:         "100%",
            textAlign:     "center",
            lineHeight:    1,
            userSelect:    "none",
            marginBottom:  "2.5rem",
            opacity:       entered ? 1 : 0,
            transform:     entered ? "scale(1)" : "scale(0.85)",
            transition:    "opacity 1.2s ease, transform 1.2s ease",
            transformOrigin: "center",
          }}
        >
          <span
            style={{
              fontFamily:          "var(--font-display)",
              fontSize:            "clamp(2.5rem, 8vw, 8rem)",
              display:             "block",
              whiteSpace:          "nowrap",
              WebkitTextStroke:    "1px rgba(0,245,255,0.40)",
              WebkitTextFillColor: "transparent",
              color:               "transparent",
              textShadow:          "0 0 80px rgba(0,245,255,0.10)",
            }}
          >
            INNOVATION
          </span>
        </div>

        {/* ── Gradient divider ── */}
        <div
          aria-hidden="true"
          style={{
            width:         "min(640px, 80%)",
            height:        "1px",
            marginBottom:  "2.8rem",
            position:      "relative",
            overflow:      "hidden",
            opacity:       entered ? 1 : 0,
            transition:    "opacity 0.01s ease 0.25s",
          }}
        >
          {/* Line that draws from center outward */}
          <div
            className={entered ? "divider-draw" : ""}
            style={{
              position:      "absolute",
              inset:         0,
              transformOrigin: "center",
              transform:     entered ? undefined : "scaleX(0)",
              background:    "linear-gradient(90deg, transparent, rgba(0,245,255,0.5) 30%, rgba(123,47,255,0.4) 70%, transparent)",
              boxShadow:     "0 0 8px 1px rgba(0,245,255,0.18)",
            }}
          />
          {/* Shimmer — bright spot travels left → right after draw */}
          {entered && (
            <div
              className="divider-shimmer"
              style={{
                position:       "absolute",
                inset:          0,
                width:          "30%",
                left:           0,
                background:     "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), rgba(0,245,255,0.5), transparent)",
                filter:         "blur(1px)",
              }}
            />
          )}
        </div>

        {/* ── Quote ── */}
        <p
          style={{
            fontFamily:  "var(--font-playfair)",
            fontSize:    "clamp(1.2rem, 2vw, 1.8rem)",
            fontStyle:   "italic",
            fontWeight:  400,
            color:       "rgba(209,213,219,0.6)",
            textAlign:   "center",
            maxWidth:    "640px",
            lineHeight:  1.6,
            marginBottom: "4.5rem",
            opacity:     entered ? 1 : 0,
            transform:   entered ? "translateY(0)" : "translateY(20px)",
            transition:  "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          &ldquo;Innovation isn&rsquo;t a department. It&rsquo;s a discipline.&rdquo;
        </p>

        {/* ── 5 Principle Cards — 3+2 grid ── */}
        <div
          style={{
            width:        "100%",
            display:      "flex",
            flexDirection:"column",
            gap:          "1rem",
            marginBottom: "4.5rem",
          }}
        >
          {/* Row 1: cards 0-2 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {PRINCIPLES.slice(0, 3).map((p, i) => (
              <PrincipleCard key={p.num} p={p} index={i} show={entered} rowWidth="33" />
            ))}
          </div>
          {/* Row 2: cards 3-4 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {PRINCIPLES.slice(3).map((p, i) => (
              <PrincipleCard key={p.num} p={p} index={i + 3} show={entered} rowWidth="50" />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          style={{
            display:    "flex",
            flexDirection: "column",
            alignItems: "center",
            gap:        "1.25rem",
            opacity:    entered ? 1 : 0,
            transform:  entered ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s",
          }}
        >
          <p
            style={{
              fontFamily:    "var(--font-space)",
              fontSize:      "clamp(0.9rem, 1.1vw, 1.05rem)",
              fontWeight:    500,
              color:         "rgba(209,213,219,0.55)",
              letterSpacing: "0.06em",
              textAlign:     "center",
            }}
          >
            This is how we work.
          </p>

          <button
            type="button"
            style={{
              fontFamily:    "var(--font-space)",
              fontSize:      "0.78rem",
              fontWeight:    700,
              color:         CYAN,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              background:    "rgba(0,245,255,0.05)",
              border:        "1px solid rgba(0,245,255,0.30)",
              borderRadius:  "9999px",
              padding:       "12px 32px",
              backdropFilter:"blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              cursor:        "none",
              display:       "flex",
              alignItems:    "center",
              gap:           "0.5rem",
              transition:    "background 0.25s, box-shadow 0.25s, border-color 0.25s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background   = "rgba(0,245,255,0.10)";
              el.style.borderColor  = "rgba(0,245,255,0.70)";
              el.style.boxShadow    = "0 0 22px rgba(0,245,255,0.20)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background   = "rgba(0,245,255,0.05)";
              el.style.borderColor  = "rgba(0,245,255,0.30)";
              el.style.boxShadow    = "none";
            }}
            onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}
          >
            See Our Process
            <svg
              width="13" height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
