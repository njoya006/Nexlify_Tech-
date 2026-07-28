"use client";

import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  Suspense,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";

// ─── Tokens ─────────────────────────────────────────────────────────────────
const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";

// ─── Geometry types ──────────────────────────────────────────────────────────
type ShapeType = "sphere" | "box" | "cone" | "torus" | "icosahedron";

// ─── Count-up hook ───────────────────────────────────────────────────────────
function useCountUp(target: number, active: boolean, duration = 2000): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [active, target, duration]);
  return count;
}

// ─── R3F wireframe shape ─────────────────────────────────────────────────────
function WireShape({ shape, hovered }: { shape: ShapeType; hovered: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mesh = useRef<any>(null);
  useFrame((_, dt) => {
    if (!mesh.current) return;
    const s = hovered ? 2.8 : 0.35;
    mesh.current.rotation.x += dt * s * 0.45;
    mesh.current.rotation.y += dt * s;
  });

  return (
    <mesh ref={mesh}>
      {shape === "sphere"      && <sphereGeometry      args={[1, 8, 6]} />}
      {shape === "box"         && <boxGeometry          args={[1.6, 1.6, 1.6]} />}
      {shape === "cone"        && <coneGeometry         args={[1, 1.8, 6]} />}
      {shape === "torus"       && <torusGeometry        args={[0.9, 0.35, 6, 12]} />}
      {shape === "icosahedron" && <icosahedronGeometry  args={[1.1, 0]} />}
      <meshBasicMaterial
        color={CYAN}
        wireframe
        transparent
        opacity={0.15}
        {...({} as any)}
      />
    </mesh>
  );
}

function WireCanvas({ shape, hovered }: { shape: ShapeType; hovered: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.8], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <WireShape shape={shape} hovered={hovered} />
      </Suspense>
    </Canvas>
  );
}

// ─── Stage data ──────────────────────────────────────────────────────────────
interface Stage {
  num:   string;
  side:  "left" | "right";
  title: string;
  desc:  string;
  shape: ShapeType;
}

const STAGES: Stage[] = [
  {
    num:   "01",
    side:  "left",
    title: "DISCOVER",
    desc:  "We immerse ourselves in your world — your goals, your audience, your competitors. No assumptions. Pure discovery.",
    shape: "sphere",
  },
  {
    num:   "02",
    side:  "right",
    title: "STRATEGISE",
    desc:  "We map every decision before touching a tool. Strategy is our foundation — everything else is execution.",
    shape: "box",
  },
  {
    num:   "03",
    side:  "left",
    title: "ARCHITECT",
    desc:  "Systems, structures, and frameworks designed to scale. We build the bones before the skin.",
    shape: "cone",
  },
  {
    num:   "04",
    side:  "right",
    title: "BUILD",
    desc:  "Precision execution. Every pixel, every interaction, every line of code is intentional and tested.",
    shape: "torus",
  },
  {
    num:   "05",
    side:  "left",
    title: "LAUNCH & EVOLVE",
    desc:  "We don't disappear at launch. We measure, iterate, and evolve — because the best work is never finished.",
    shape: "icosahedron",
  },
];

// ─── Stage card ───────────────────────────────────────────────────────────────
interface StageRowProps {
  stage:   Stage;
  index:   number;
  visible: boolean;
  mounted: boolean;
}

const StageRow = forwardRef<HTMLDivElement, StageRowProps>(function StageRow(
  { stage, visible, mounted },
  ref,
) {
  const isLeft = stage.side === "left";
  const [hovered, setHovered] = useState(false);

  /* entrance transform */
  const enterX = isLeft ? "-70px" : "70px";
  const cardTransform = visible
    ? hovered ? "translateY(-6px)" : "translateY(0)"
    : `translateX(${enterX})`;

  return (
    <div
      ref={ref}
      className="process-stage-row"
      style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        marginBottom:   "72px",
        position:       "relative",
      }}
    >
      {/* ── Card ── */}
      <div
        className="process-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:              "42%",
          background:         "rgba(13,13,31,0.7)",
          backdropFilter:     "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border:             `1px solid ${hovered ? "rgba(0,245,255,0.4)" : "rgba(0,245,255,0.1)"}`,
          borderRadius:       "16px",
          padding:            "2.5rem",
          position:           "relative",
          transition:         "all 0.4s ease",
          transform:          cardTransform,
          opacity:            visible ? 1 : 0,
          cursor:             "default",
        }}
      >
        {/* Wireframe icon */}
        <div
          className="process-icon"
          style={{
            position:      "absolute",
            top:           "1.25rem",
            right:         isLeft ? "1.25rem" : undefined,
            left:          isLeft ? undefined  : "1.25rem",
            width:         "88px",
            height:        "88px",
            pointerEvents: "none",
          }}
        >
          {mounted && <WireCanvas shape={stage.shape} hovered={hovered} />}
        </div>

        {/* Number */}
        <div style={{
          fontFamily:    "var(--font-mono)",
          fontSize:      "0.9rem",
          color:         CYAN,
          letterSpacing: "0.12em",
          marginBottom:  "0.6rem",
          textShadow:    `0 0 12px rgba(0,245,255,0.5)`,
        }}>
          {stage.num}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily:    "var(--font-display)",
          fontSize:      "clamp(1.4rem, 2.3vw, 1.9rem)",
          color:         "white",
          margin:        "0 0 1rem 0",
          paddingRight:  isLeft ? "96px" : "0",
          paddingLeft:   isLeft ? "0"    : "96px",
          lineHeight:    1.1,
        }}>
          {stage.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily:  "var(--font-space)",
          fontSize:    "clamp(0.875rem, 1.05vw, 0.975rem)",
          color:       "#D1D5DB",
          lineHeight:  1.75,
          margin:      0,
        }}>
          {stage.desc}
        </p>

        {/* Glow edge on hover */}
        <div style={{
          position:     "absolute",
          inset:        0,
          borderRadius: "16px",
          pointerEvents:"none",
          opacity:      hovered ? 1 : 0,
          transition:   "opacity 0.4s ease",
          background:   "radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.06) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Spine dot ── */}
      <div
        className="process-dot"
        style={{
          position:     "absolute",
          left:         "50%",
          top:          "50%",
          transform:    `translate(-50%, -50%) scale(${hovered ? 1.6 : 1})`,
          width:        "12px",
          height:       "12px",
          borderRadius: "50%",
          background:   CYAN,
          boxShadow:    `0 0 ${hovered ? "28px" : "18px"} rgba(0,245,255,${hovered ? 1 : 0.75})`,
          zIndex:       2,
          transition:   "transform 0.4s ease, box-shadow 0.4s ease",
          flexShrink:   0,
        }}
      />
    </div>
  );
});

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function Process() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* ── header animation ── */
  const headerRef  = useRef<HTMLDivElement>(null);
  const [headerIn, setHeaderIn] = useState(false);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); obs.disconnect(); } },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── stage cards ── */
  const stageRefs    = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const [visible, setVisible] = useState<boolean[]>(Array(5).fill(false));
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stageRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setTimeout(() => setVisible(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            }), i * 150);
            obs.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* ── stats bar ── */
  const statsRef  = useRef<HTMLDivElement>(null);
  const [statsIn, setStatsIn] = useState(false);
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsIn(true); obs.disconnect(); } },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const c1 = useCountUp(100, statsIn, 1800);
  const c2 = useCountUp(47,  statsIn, 1600);
  const c3 = useCountUp(5,   statsIn, 1200);

  const STATS = [
    { value: c1, suffix: "%", label: "Client Satisfaction" },
    { value: c2, suffix: "+", label: "Projects Delivered"  },
    { value: c3, suffix: "+", label: "Years Executing"     },
  ];

  return (
    <section
      id="process"
      style={{
        position:   "relative",
        zIndex:     1,
        background: "transparent",
        borderTop:  "1px solid rgba(0,245,255,0.06)",
        padding:    "clamp(80px, 10vw, 140px) 0 clamp(60px, 8vw, 100px)",
        overflow:   "hidden",
      }}
    >
      {/* ════ TOP HEADER ════ */}
      <div
        ref={headerRef}
        style={{
          textAlign:    "center",
          marginBottom: "clamp(64px, 8vw, 110px)",
          padding:      "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* Label */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <span style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "0.75rem",
            letterSpacing: "0.3em",
            color:         CYAN,
            borderLeft:    `3px solid ${CYAN}`,
            paddingLeft:   "12px",
            textTransform: "uppercase",
            textShadow:    "0 0 12px rgba(0,245,255,0.6)",
            opacity:       headerIn ? 1 : 0,
            transform:     headerIn ? "none" : "translateY(20px)",
            transition:    "opacity 0.6s ease, transform 0.6s ease",
          }}>
            How We Work
          </span>
        </div>

        {/* Heading */}
        <h2 style={{ margin: 0, padding: 0, lineHeight: 1.0 }}>
          {["THE NEXLIFY", "FRAMEWORK"].map((line, i) => (
            <span
              key={line}
              className={i === 1 ? "grad-cyan-violet" : ""}
              style={{
                display:    "block",
                fontFamily: "var(--font-display)",
                fontSize:   "clamp(2.8rem, 6.5vw, 6.5rem)",
                color:      i === 0 ? "white" : undefined,
                opacity:    headerIn ? 1 : 0,
                transform:  headerIn ? "none" : "translateX(-70px)",
                transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        {/* Subline */}
        <p style={{
          fontFamily:  "var(--font-space)",
          fontSize:    "clamp(1rem, 1.4vw, 1.15rem)",
          color:       "#D1D5DB",
          maxWidth:    "540px",
          margin:      "1.75rem auto 0",
          lineHeight:  1.65,
          opacity:     headerIn ? 1 : 0,
          transform:   headerIn ? "none" : "translateY(20px)",
          transition:  "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
        }}>
          A proven 5-stage process that turns bold ideas into world-class reality.
        </p>
      </div>

      {/* ════ TIMELINE ════ */}
      <div
        style={{
          position:  "relative",
          maxWidth:  "1180px",
          margin:    "0 auto",
          padding:   "0 clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        {/* Vertical spine */}
        <div
          className="process-spine"
          style={{
            position:   "absolute",
            left:       "50%",
            top:        "24px",
            bottom:     "24px",
            width:      "1px",
            transform:  "translateX(-50%)",
            background: `linear-gradient(180deg, transparent 0%, ${CYAN} 15%, ${VIOLET} 75%, transparent 100%)`,
            opacity:    0.6,
          }}
        />

        {STAGES.map((stage, i) => (
          <StageRow
            key={stage.num}
            stage={stage}
            index={i}
            visible={visible[i]}
            mounted={mounted}
            ref={(el) => { stageRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* ════ STATS BAR ════ */}
      <div
        ref={statsRef}
        style={{
          maxWidth:           "1180px",
          margin:             "clamp(40px, 6vw, 80px) auto 0",
          padding:            "0 clamp(1.5rem, 5vw, 4rem)",
          opacity:            statsIn ? 1 : 0,
          transform:          statsIn ? "none" : "translateY(30px)",
          transition:         "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{
          background:           "rgba(13,13,31,0.7)",
          backdropFilter:       "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border:               "1px solid rgba(0,245,255,0.08)",
          borderRadius:         "16px",
          padding:              "clamp(1.75rem, 3vw, 2.5rem)",
          display:              "flex",
          justifyContent:       "center",
          alignItems:           "center",
        }}>
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && (
                <div style={{
                  width:      "1px",
                  height:     "52px",
                  background: "rgba(0,245,255,0.28)",
                  flexShrink: 0,
                }} />
              )}
              <div style={{ textAlign: "center", flex: 1, padding: "0 clamp(1.5rem, 4vw, 3.5rem)" }}>
                <div style={{
                  fontFamily:  "var(--font-mono)",
                  fontSize:    "clamp(1.9rem, 3.5vw, 2.8rem)",
                  color:       CYAN,
                  textShadow:  "0 0 24px rgba(0,245,255,0.45)",
                  lineHeight:  1,
                }}>
                  {stat.value}{stat.suffix}
                </div>
                <div style={{
                  fontFamily:    "var(--font-space)",
                  fontSize:      "0.72rem",
                  color:         "#9CA3AF",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginTop:     "0.5rem",
                }}>
                  {stat.label}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ════ RESPONSIVE OVERRIDES ════ */}
      <style>{`
        @media (max-width: 768px) {
          .process-spine { display: none !important; }
          .process-dot   { display: none !important; }

          .process-stage-row {
            justify-content: center !important;
            margin-bottom: 28px !important;
          }

          .process-card {
            width: 100% !important;
            padding-right: 1.75rem !important;
            padding-left:  1.75rem !important;
          }

          .process-card h3 {
            padding-right: 80px !important;
            padding-left:  0    !important;
          }

          .process-icon {
            right: 1rem !important;
            left:  auto !important;
          }
        }
      `}</style>
    </section>
  );
}
