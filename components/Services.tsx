"use client";

import { useRef, useState, useEffect } from "react";

const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";
const PINK   = "#FF2D78";

interface Service {
  id:        string;
  title:     string;
  desc:      string;
  accent:    string;
  accentRgb: string;
  iconPaths: { tag: "path" | "polyline" | "circle" | "line"; attrs: Record<string, string | number> }[];
}

const SERVICES: Service[] = [
  {
    id:        "web",
    title:     "Web & App Development",
    desc:      "Custom web applications and mobile-first experiences built with cutting-edge frameworks. From MVPs to enterprise systems.",
    accent:    CYAN,
    accentRgb: "0,245,255",
    iconPaths: [
      { tag: "polyline", attrs: { points: "16 18 22 12 16 6" } },
      { tag: "polyline", attrs: { points: "8 6 2 12 8 18" } },
    ],
  },
  {
    id:        "ai",
    title:     "AI & Machine Learning",
    desc:      "Intelligent systems that learn and adapt. LLM integration, predictive models, automation pipelines, and AI-driven products.",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    iconPaths: [
      { tag: "circle",   attrs: { cx: 12, cy: 5,  r: 2 } },
      { tag: "circle",   attrs: { cx: 5,  cy: 19, r: 2 } },
      { tag: "circle",   attrs: { cx: 19, cy: 19, r: 2 } },
      { tag: "line",     attrs: { x1: 12, y1: 7,  x2: 5.5,  y2: 17 } },
      { tag: "line",     attrs: { x1: 12, y1: 7,  x2: 18.5, y2: 17 } },
      { tag: "line",     attrs: { x1: 7,  y1: 19, x2: 17,   y2: 19 } },
    ],
  },
  {
    id:        "design",
    title:     "UX/UI Design",
    desc:      "Design systems, brand identities, and interfaces that turn complexity into clarity. Every pixel is intentional.",
    accent:    PINK,
    accentRgb: "255,45,120",
    iconPaths: [
      { tag: "path", attrs: { d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" } },
    ],
  },
  {
    id:        "strategy",
    title:     "Digital Strategy",
    desc:      "Market positioning, product roadmaps, and go-to-market execution. We think before we build.",
    accent:    CYAN,
    accentRgb: "0,245,255",
    iconPaths: [
      { tag: "polyline", attrs: { points: "22 12 18 12 15 21 9 3 6 12 2 12" } },
    ],
  },
  {
    id:        "performance",
    title:     "Performance & SEO",
    desc:      "Core Web Vitals, lighthouse scores, search visibility, and accessibility — because speed is a feature.",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    iconPaths: [
      { tag: "path", attrs: { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" } },
    ],
  },
  {
    id:        "cloud",
    title:     "Cloud & DevOps",
    desc:      "Infrastructure that scales, deploys reliably, and costs less. CI/CD, containers, and cloud-native architecture.",
    accent:    PINK,
    accentRgb: "255,45,120",
    iconPaths: [
      { tag: "path", attrs: { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" } },
    ],
  },
];

function ServiceIcon({ s }: { s: Service }) {
  return (
    <svg
      width="22" height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={s.accent}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ filter: `drop-shadow(0 0 6px rgba(${s.accentRgb},0.5))` }}
    >
      {s.iconPaths.map((el, i) => {
        if (el.tag === "circle") {
          return <circle key={i} cx={el.attrs.cx} cy={el.attrs.cy} r={el.attrs.r} />;
        }
        if (el.tag === "line") {
          return <line key={i} x1={el.attrs.x1} y1={el.attrs.y1} x2={el.attrs.x2} y2={el.attrs.y2} />;
        }
        if (el.tag === "polyline") {
          return <polyline key={i} points={el.attrs.points as string} />;
        }
        return <path key={i} d={el.attrs.d as string} />;
      })}
    </svg>
  );
}

function ServiceCard({ s, index, visible }: { s: Service; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:           "rgba(13,13,31,0.72)",
        backdropFilter:       "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border:               `1px solid rgba(${s.accentRgb},${hovered ? 0.40 : 0.09})`,
        borderRadius:         "14px",
        padding:              "2rem 1.75rem",
        display:              "flex",
        flexDirection:        "column",
        gap:                  "1rem",
        cursor:               "default",
        position:             "relative",
        overflow:             "hidden",
        transition:           `
          opacity      0.65s ease ${index * 0.07}s,
          transform    0.65s ease ${index * 0.07}s,
          border-color 0.3s ease,
          box-shadow   0.3s ease
        `,
        opacity:   visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-6px)" : "translateY(0)") : "translateY(44px)",
        boxShadow: hovered
          ? `0 0 28px rgba(${s.accentRgb},0.10), 0 16px 48px rgba(0,0,0,0.45)`
          : "none",
      }}
    >
      {/* Corner glow on hover */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          0,
          right:         0,
          height:        "2px",
          background:    `linear-gradient(90deg, transparent, rgba(${s.accentRgb},0.6), transparent)`,
          opacity:       hovered ? 1 : 0,
          transition:    "opacity 0.3s ease",
        }}
      />

      {/* Icon bubble */}
      <div
        style={{
          width:        "46px",
          height:       "46px",
          borderRadius: "12px",
          background:   `rgba(${s.accentRgb},0.10)`,
          border:       `1px solid rgba(${s.accentRgb},0.22)`,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
          transition:   "background 0.3s ease, border-color 0.3s ease",
          ...(hovered ? {
            background:   `rgba(${s.accentRgb},0.16)`,
            borderColor:  `rgba(${s.accentRgb},0.40)`,
          } : {}),
        }}
      >
        <ServiceIcon s={s} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily:    "var(--font-space)",
          fontSize:      "clamp(0.92rem,1.1vw,1.05rem)",
          fontWeight:    700,
          color:         "white",
          margin:        0,
          lineHeight:    1.3,
        }}
      >
        {s.title}
      </h3>

      {/* Divider */}
      <div
        style={{
          height:     "1px",
          background: `linear-gradient(90deg, rgba(${s.accentRgb},0.40), rgba(${s.accentRgb},0.10), transparent)`,
          opacity:    hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-space)",
          fontSize:   "clamp(0.78rem,0.88vw,0.86rem)",
          color:      "#D1D5DB",
          lineHeight: 1.72,
          margin:     0,
          flex:       1,
        }}
      >
        {s.desc}
      </p>

      {/* Learn more */}
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        "0.4rem",
          fontFamily: "var(--font-space)",
          fontSize:   "0.68rem",
          fontWeight: 700,
          color:      s.accent,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          opacity:    hovered ? 1 : 0.45,
          transition: "opacity 0.3s ease",
        }}
      >
        Learn more
        <svg
          width="11" height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform:  hovered ? "translateX(3px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [headerIn, setHeaderIn] = useState(false);
  const [cardsIn,  setCardsIn]  = useState(false);

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

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setCardsIn(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        position:   "relative",
        zIndex:     1,
        background: "transparent",
        padding:    "clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px)",
        overflow:   "hidden",
      }}
    >
      {/* Top glow separator — violet */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "min(800px,70%)",
          height:        "1px",
          background:    "radial-gradient(ellipse at center, rgba(123,47,255,0.60) 0%, transparent 70%)",
          boxShadow:     "0 0 22px 4px rgba(123,47,255,0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Cyan accent glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "10%",
          left:          "-5%",
          width:         "50vw",
          height:        "50vw",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        style={{
          textAlign:    "center",
          marginBottom: "clamp(52px,7vw,88px)",
          padding:      "0 clamp(1.5rem,5vw,5rem)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
          <span
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "0.75rem",
              letterSpacing: "0.3em",
              color:         VIOLET,
              borderLeft:    `3px solid ${VIOLET}`,
              paddingLeft:   "12px",
              textTransform: "uppercase",
              textShadow:    "0 0 12px rgba(123,47,255,0.6)",
              opacity:       headerIn ? 1 : 0,
              transform:     headerIn ? "none" : "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            What We Do
          </span>
        </div>

        <h2 style={{ margin: 0, lineHeight: 1.0 }}>
          {["CAPABILITIES THAT", "DRIVE RESULTS"].map((line, i) => (
            <span
              key={line}
              className={i === 1 ? "grad-violet-pink" : ""}
              style={{
                display:    "block",
                fontFamily: "var(--font-display)",
                fontSize:   "clamp(2.6rem,6vw,6rem)",
                color:      i === 0 ? "white" : undefined,
                opacity:    headerIn ? 1 : 0,
                transform:  headerIn ? "none" : "translateX(-50px)",
                transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
              }}
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          style={{
            fontFamily: "var(--font-space)",
            fontSize:   "clamp(0.92rem,1.25vw,1.08rem)",
            color:      "#D1D5DB",
            maxWidth:   "520px",
            margin:     "1.5rem auto 0",
            lineHeight: 1.65,
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}
        >
          Six core disciplines we&apos;ve sharpened over years of building exceptional products.
        </p>
      </div>

      {/* ── Services Grid ── */}
      <div
        style={{
          maxWidth:            "1180px",
          margin:              "0 auto",
          padding:             "0 clamp(1.5rem,5vw,4rem)",
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap:                 "1.25rem",
        }}
      >
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} s={s} index={i} visible={cardsIn} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "center",
          marginTop:      "clamp(52px,7vw,80px)",
          opacity:        cardsIn ? 1 : 0,
          transform:      cardsIn ? "none" : "translateY(20px)",
          transition:     "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
        }}
      >
        <a
          href="#contact"
          style={{
            fontFamily:           "var(--font-space)",
            fontSize:             "0.78rem",
            fontWeight:           700,
            color:                VIOLET,
            letterSpacing:        "0.14em",
            textTransform:        "uppercase",
            background:           "rgba(123,47,255,0.05)",
            border:               "1px solid rgba(123,47,255,0.30)",
            borderRadius:         "9999px",
            padding:              "14px 36px",
            backdropFilter:       "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            cursor:               "none",
            display:              "inline-flex",
            alignItems:           "center",
            gap:                  "0.5rem",
            textDecoration:       "none",
            transition:           "background 0.25s, box-shadow 0.25s, border-color 0.25s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background  = "rgba(123,47,255,0.12)";
            el.style.borderColor = "rgba(123,47,255,0.70)";
            el.style.boxShadow   = "0 0 22px rgba(123,47,255,0.20)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background  = "rgba(123,47,255,0.05)";
            el.style.borderColor = "rgba(123,47,255,0.30)";
            el.style.boxShadow   = "none";
          }}
        >
          Discuss Your Project
          <svg
            width="13" height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
