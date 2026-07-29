"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, type ProjectData } from "@/lib/projects";

function ProjectCard({ p, index, visible }: { p: ProjectData; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={`/work/${p.slug}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display:              "flex",
          flexDirection:        "column",
          height:               "100%",
          background:           "rgba(8,8,20,0.88)",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border:               `1px solid rgba(${p.accentRgb},${hovered ? 0.38 : 0.09})`,
          borderRadius:         "18px",
          overflow:             "hidden",
          transition: `
            opacity      0.65s ease ${index * 0.07}s,
            transform    0.65s ease ${index * 0.07}s,
            border-color 0.3s ease,
            box-shadow   0.3s ease
          `,
          opacity:   visible ? 1 : 0,
          transform: visible
            ? (hovered ? "translateY(-7px) scale(1.005)" : "translateY(0) scale(1)")
            : "translateY(52px)",
          boxShadow: hovered
            ? `0 0 0 1px rgba(${p.accentRgb},0.12), 0 24px 80px rgba(0,0,0,0.60), 0 0 60px rgba(${p.accentRgb},0.07)`
            : "0 4px 24px rgba(0,0,0,0.30)",
        }}
      >
        {/* ── Top accent line ── */}
        <div style={{
          height:     "2px",
          background: `linear-gradient(90deg, ${p.accent} 0%, rgba(${p.accentRgb},0.18) 55%, transparent 100%)`,
          opacity:    hovered ? 1 : 0.28,
          transition: "opacity 0.3s ease",
          flexShrink: 0,
        }} />

        {/* ── Preview / visual area ── */}
        <div style={{
          height:     "clamp(210px,26vw,260px)",
          background: p.gradient,
          position:   "relative",
          overflow:   "hidden",
          flexShrink: 0,
        }}>
          {/* Grid */}
          <div aria-hidden="true" style={{
            position:        "absolute", inset: 0,
            backgroundImage: `
              linear-gradient(rgba(${p.accentRgb},0.10) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${p.accentRgb},0.10) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
          }} />

          {/* Radial glow centre */}
          <div aria-hidden="true" style={{
            position:   "absolute", inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, rgba(${p.accentRgb},0.07) 0%, transparent 70%)`,
          }} />

          {/* Logo (when available) */}
          {p.logo ? (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "clamp(1rem,3vw,1.75rem)",
            }}>
              <div style={{ position: "relative", width: "75%", height: "75%" }}>
                <Image
                  src={p.logo}
                  alt={`${p.title} logo`}
                  fill
                  sizes="(max-width: 768px) 80vw, 30vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ) : (
            /* Large number watermark when no logo */
            <span aria-hidden="true" style={{
              position:      "absolute",
              bottom:        "-0.12em",
              right:         "0.75rem",
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(6rem,10vw,9rem)",
              color:         `rgba(${p.accentRgb},0.07)`,
              lineHeight:    1,
              userSelect:    "none",
              letterSpacing: "-0.04em",
            }}>
              {p.num}
            </span>
          )}

          {/* Top bar: category (left) + stat (right) */}
          <div style={{
            position:       "absolute",
            top:            "1rem",
            left:           "1rem",
            right:          "1rem",
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            gap:            "0.5rem",
          }}>
            <span style={{
              fontFamily:    "var(--font-space)",
              fontSize:      "0.57rem",
              fontWeight:    700,
              color:         p.accent,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background:    `rgba(${p.accentRgb},0.12)`,
              border:        `1px solid rgba(${p.accentRgb},0.30)`,
              borderRadius:  "9999px",
              padding:       "4px 12px",
              backdropFilter:"blur(6px)",
              WebkitBackdropFilter:"blur(6px)",
            }}>
              {p.cat}
            </span>
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.54rem",
              color:         "rgba(209,213,219,0.50)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background:    "rgba(5,5,8,0.50)",
              border:        "1px solid rgba(255,255,255,0.08)",
              borderRadius:  "9999px",
              padding:       "4px 12px",
              backdropFilter:"blur(6px)",
              WebkitBackdropFilter:"blur(6px)",
              maxWidth:      "50%",
              overflow:      "hidden",
              textOverflow:  "ellipsis",
              whiteSpace:    "nowrap",
            }}>
              {p.stat}
            </span>
          </div>

          {/* Bottom fade into content */}
          <div style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            right:      0,
            height:     "50%",
            background: "linear-gradient(to top, rgba(8,8,20,0.92) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* ── Content ── */}
        <div style={{
          flex:    1,
          display: "flex",
          flexDirection: "column",
          padding: "1.4rem 1.6rem 1.6rem",
          gap:     "0.9rem",
        }}>

          {/* Title + index number */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.75rem" }}>
            <h3 style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.2rem,1.8vw,1.55rem)",
              color:         "white",
              margin:        0,
              lineHeight:    1.1,
              letterSpacing: "0.03em",
              flex:          1,
            }}>
              {p.title}
            </h3>
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.60rem",
              color:         `rgba(${p.accentRgb},0.35)`,
              letterSpacing: "0.08em",
              flexShrink:    0,
              paddingTop:    "0.3rem",
            }}>
              {p.num}
            </span>
          </div>

          {/* Accent divider */}
          <div style={{
            height:     "1px",
            background: `linear-gradient(90deg, rgba(${p.accentRgb},${hovered ? 0.55 : 0.25}), rgba(${p.accentRgb},0.06), transparent)`,
            transition: "background 0.35s ease",
          }} />

          {/* Description — 2 lines max */}
          <p style={{
            fontFamily:           "var(--font-space)",
            fontSize:             "clamp(0.80rem,0.92vw,0.87rem)",
            color:                "rgba(209,213,219,0.65)",
            lineHeight:           1.75,
            margin:               0,
            display:              "-webkit-box",
            WebkitLineClamp:      2,
            WebkitBoxOrient:      "vertical" as const,
            overflow:             "hidden",
          }}>
            {p.desc}
          </p>

          {/* Footer: tech tags + arrow CTA */}
          <div style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            marginTop:      "auto",
            gap:            "0.75rem",
          }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", flex: 1, minWidth: 0 }}>
              {p.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{
                  fontFamily:    "var(--font-mono)",
                  fontSize:      "0.58rem",
                  color:         `rgba(${p.accentRgb},0.65)`,
                  background:    `rgba(${p.accentRgb},0.07)`,
                  border:        `1px solid rgba(${p.accentRgb},0.16)`,
                  borderRadius:  "5px",
                  padding:       "3px 9px",
                  letterSpacing: "0.05em",
                  whiteSpace:    "nowrap",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Circular arrow button */}
            <div style={{
              width:        38,
              height:       38,
              borderRadius: "50%",
              background:   `rgba(${p.accentRgb},${hovered ? 0.18 : 0.07})`,
              border:       `1px solid rgba(${p.accentRgb},${hovered ? 0.50 : 0.20})`,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              flexShrink:   0,
              transition:   "background 0.28s ease, border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease",
              transform:    hovered ? "translateX(3px)" : "translateX(0)",
              boxShadow:    hovered ? `0 0 14px rgba(${p.accentRgb},0.30)` : "none",
            }}>
              <svg
                width="13" height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke={p.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
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
      {/* Top glow separator */}
      <div aria-hidden="true" style={{
        position:      "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width:         "min(800px,70%)", height: "1px",
        background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.55) 0%, transparent 70%)",
        boxShadow:     "0 0 22px 4px rgba(0,245,255,0.10)", pointerEvents: "none",
      }} />

      {/* Background glow */}
      <div aria-hidden="true" style={{
        position:      "absolute", top: "5%", right: "-5%",
        width:         "55vw", height: "55vw", borderRadius: "50%",
        background:    "radial-gradient(ellipse at center, rgba(255,45,120,0.04) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        style={{ textAlign: "center", marginBottom: "clamp(52px,7vw,88px)", padding: "0 clamp(1.5rem,5vw,5rem)" }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
          <span style={{
            fontFamily:    "var(--font-display)", fontSize: "0.75rem",
            letterSpacing: "0.3em", color: "#00F5FF",
            borderLeft:    "3px solid #00F5FF", paddingLeft: "12px",
            textTransform: "uppercase", textShadow: "0 0 12px rgba(0,245,255,0.6)",
            opacity:    headerIn ? 1 : 0,
            transform:  headerIn ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
            Selected Work
          </span>
        </div>

        <h2 style={{ margin: 0, lineHeight: 1.0 }}>
          {["PROJECTS THAT", "MOVE MARKETS"].map((line, i) => (
            <span key={line} className={i === 1 ? "grad-cyan-violet" : ""} style={{
              display:    "block",
              fontFamily: "var(--font-display)",
              fontSize:   "clamp(2.6rem,6vw,6rem)",
              color:      i === 0 ? "white" : undefined,
              opacity:    headerIn ? 1 : 0,
              transform:  headerIn ? "none" : "translateX(-50px)",
              transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
            }}>
              {line}
            </span>
          ))}
        </h2>

        <p style={{
          fontFamily: "var(--font-space)", fontSize: "clamp(0.92rem,1.25vw,1.08rem)",
          color: "#D1D5DB", maxWidth: "520px", margin: "1.5rem auto 0", lineHeight: 1.65,
          opacity:    headerIn ? 1 : 0,
          transform:  headerIn ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
        }}>
          A curated selection of work that defines what world-class execution looks like.
        </p>
      </div>

      {/* ── Project Grid ── */}
      <div style={{
        maxWidth:            "1180px",
        margin:              "0 auto",
        padding:             "0 clamp(1.5rem,5vw,4rem)",
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap:                 "1.4rem",
        alignItems:          "stretch",
      }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} visible={cardsIn} />
        ))}
      </div>

      {/* ── Bottom CTA ── */}
      <div style={{
        display:        "flex",
        justifyContent: "center",
        marginTop:      "clamp(52px,7vw,80px)",
        opacity:        cardsIn ? 1 : 0,
        transform:      cardsIn ? "none" : "translateY(20px)",
        transition:     "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s",
      }}>
        <a href="#contact" style={{
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
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
