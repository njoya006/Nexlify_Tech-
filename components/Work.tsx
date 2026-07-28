"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { PROJECTS, type ProjectData } from "@/lib/projects";

function ProjectCard({ p, index, visible }: { p: ProjectData; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/work/${p.slug}`}
      style={{ display: "block", textDecoration: "none" }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:           "rgba(13,13,31,0.75)",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border:               `1px solid rgba(${p.accentRgb},${hovered ? 0.45 : 0.10})`,
          borderRadius:         "16px",
          overflow:             "hidden",
          height:               "100%",
          transition:           `
            opacity      0.65s ease ${index * 0.08}s,
            transform    0.65s ease ${index * 0.08}s,
            border-color 0.3s ease,
            box-shadow   0.3s ease
          `,
          opacity:   visible ? 1 : 0,
          transform: visible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(48px)",
          boxShadow: hovered
            ? `0 0 36px rgba(${p.accentRgb},0.12), 0 20px 60px rgba(0,0,0,0.5)`
            : "none",
        }}
      >
        {/* ── Image / preview area ── */}
        <div
          style={{
            height:     "190px",
            background: p.gradient,
            position:   "relative",
            overflow:   "hidden",
          }}
        >
          {/* Grid line overlay */}
          <div
            aria-hidden="true"
            style={{
              position:        "absolute",
              inset:           0,
              backgroundImage: `
                linear-gradient(rgba(${p.accentRgb},0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(${p.accentRgb},0.12) 1px, transparent 1px)
              `,
              backgroundSize:  "44px 44px",
            }}
          />

          {/* Large project number — watermark */}
          <span
            aria-hidden="true"
            style={{
              position:      "absolute",
              bottom:        "-0.1em",
              right:         "1rem",
              fontFamily:    "var(--font-display)",
              fontSize:      "5.5rem",
              color:         `rgba(${p.accentRgb},0.10)`,
              lineHeight:    1,
              userSelect:    "none",
              letterSpacing: "-0.02em",
            }}
          >
            {p.num}
          </span>

          {/* Category badge */}
          <div
            style={{
              position:     "absolute",
              top:          "1.1rem",
              left:         "1.2rem",
              background:   `rgba(${p.accentRgb},0.12)`,
              border:       `1px solid rgba(${p.accentRgb},0.32)`,
              borderRadius: "9999px",
              padding:      "4px 12px",
            }}
          >
            <span
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.58rem",
                fontWeight:    700,
                color:         p.accent,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {p.cat}
            </span>
          </div>

          {/* Hover overlay — stat + CTA */}
          <div
            style={{
              position:       "absolute",
              inset:          0,
              display:        "flex",
              flexDirection:  "column",
              alignItems:     "center",
              justifyContent: "center",
              gap:            "0.75rem",
              background:     `rgba(5,5,8,${hovered ? 0.58 : 0})`,
              transition:     "background 0.35s ease",
            }}
          >
            {/* Stat badge */}
            <div
              style={{
                background:    `rgba(${p.accentRgb},0.15)`,
                border:        `1px solid rgba(${p.accentRgb},0.40)`,
                borderRadius:  "9999px",
                padding:       "5px 16px",
                opacity:       hovered ? 1 : 0,
                transform:     hovered ? "translateY(0) scale(1)" : "translateY(8px) scale(0.92)",
                transition:    "opacity 0.28s ease 0.04s, transform 0.28s ease 0.04s",
              }}
            >
              <span
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.64rem",
                  color:         p.accent,
                  letterSpacing: "0.10em",
                  textShadow:    `0 0 10px rgba(${p.accentRgb},0.6)`,
                }}
              >
                {p.stat}
              </span>
            </div>

            {/* CTA text */}
            <span
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.68rem",
                fontWeight:    700,
                color:         p.accent,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity:       hovered ? 1 : 0,
                transform:     hovered ? "translateY(0)" : "translateY(10px)",
                transition:    "opacity 0.28s ease 0.10s, transform 0.28s ease 0.10s",
                display:       "flex",
                alignItems:    "center",
                gap:           "0.5rem",
              }}
            >
              View Case Study
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* ── Content area ── */}
        <div style={{ padding: "1.75rem" }}>
          <h3
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.15rem,1.9vw,1.5rem)",
              color:         "white",
              margin:        "0 0 0.7rem 0",
              lineHeight:    1.1,
              letterSpacing: "0.04em",
            }}
          >
            {p.title}
          </h3>

          <p
            style={{
              fontFamily: "var(--font-space)",
              fontSize:   "clamp(0.78rem,0.9vw,0.88rem)",
              color:      "#D1D5DB",
              lineHeight: 1.72,
              margin:     "0 0 1.2rem 0",
            }}
          >
            {p.desc}
          </p>

          {/* Tech tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {p.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.60rem",
                  color:         "rgba(209,213,219,0.50)",
                  background:    "rgba(255,255,255,0.04)",
                  border:        "1px solid rgba(255,255,255,0.07)",
                  borderRadius:  "4px",
                  padding:       "3px 9px",
                  letterSpacing: "0.06em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
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
      id="work"
      style={{
        position:   "relative",
        zIndex:     1,
        background: "transparent",
        padding:    "clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px)",
        overflow:   "hidden",
      }}
    >
      {/* Top glow separator — cyan */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "min(800px,70%)",
          height:        "1px",
          background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.55) 0%, transparent 70%)",
          boxShadow:     "0 0 22px 4px rgba(0,245,255,0.10)",
          pointerEvents: "none",
        }}
      />

      {/* Pink accent glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "5%",
          right:         "-5%",
          width:         "55vw",
          height:        "55vw",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(255,45,120,0.04) 0%, transparent 65%)",
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
              color:         "#00F5FF",
              borderLeft:    "3px solid #00F5FF",
              paddingLeft:   "12px",
              textTransform: "uppercase",
              textShadow:    "0 0 12px rgba(0,245,255,0.6)",
              opacity:       headerIn ? 1 : 0,
              transform:     headerIn ? "none" : "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Selected Work
          </span>
        </div>

        <h2 style={{ margin: 0, lineHeight: 1.0 }}>
          {["PROJECTS THAT", "MOVE MARKETS"].map((line, i) => (
            <span
              key={line}
              className={i === 1 ? "grad-cyan-violet" : ""}
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
          A curated selection of work that defines what world-class execution looks like.
        </p>
      </div>

      {/* ── Project Grid ── */}
      <div
        style={{
          maxWidth:            "1180px",
          margin:              "0 auto",
          padding:             "0 clamp(1.5rem,5vw,4rem)",
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap:                 "1.5rem",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} visible={cardsIn} />
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
            color:                "#00F5FF",
            letterSpacing:        "0.14em",
            textTransform:        "uppercase",
            background:           "rgba(0,245,255,0.05)",
            border:               "1px solid rgba(0,245,255,0.30)",
            borderRadius:         "9999px",
            padding:              "14px 36px",
            backdropFilter:       "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display:              "inline-flex",
            alignItems:           "center",
            gap:                  "0.5rem",
            textDecoration:       "none",
            transition:           "background 0.25s, box-shadow 0.25s, border-color 0.25s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background  = "rgba(0,245,255,0.10)";
            el.style.borderColor = "rgba(0,245,255,0.70)";
            el.style.boxShadow   = "0 0 22px rgba(0,245,255,0.20)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background  = "rgba(0,245,255,0.05)";
            el.style.borderColor = "rgba(0,245,255,0.30)";
            el.style.boxShadow   = "none";
          }}
        >
          Start a Project
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
