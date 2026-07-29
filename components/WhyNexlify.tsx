"use client";

import { useRef, useState, useEffect } from "react";

const PILLARS = [
  {
    num:     "01",
    title:   "BUILT FOR AFRICA",
    body:    "Every design decision starts with the African context — Mobile Money, low bandwidth, multilingual users, and local market realities. We don't adapt foreign tools. We build native ones.",
    accent:  "#00F5FF",
    accentRgb: "0,245,255",
  },
  {
    num:     "02",
    title:   "ENGINEERING DEPTH",
    body:    "Production-grade architecture: microservices, offline-first systems, bijural databases, Kubernetes orchestration. We build for real-world scale from the first line of code.",
    accent:  "#7B2FFF",
    accentRgb: "123,47,255",
  },
  {
    num:     "03",
    title:   "ZERO COMPROMISE",
    body:    "We don't ship shortcuts. Every product is validated with real users before it ships, built on well-structured schemas, and designed to outlast the team that built it.",
    accent:  "#FF2D78",
    accentRgb: "255,45,120",
  },
  {
    num:     "04",
    title:   "SPEED WITH INTENT",
    body:    "We move fast — but every sprint has a purpose. Rapid delivery doesn't mean throwing things at the wall. It means having thought through the architecture before writing line one.",
    accent:  "#00F5FF",
    accentRgb: "0,245,255",
  },
];

function Pillar({
  num, title, body, accent, accentRgb, visible, index,
}: typeof PILLARS[0] & { visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex:         "1 1 220px",
        padding:      "2rem 1.8rem",
        background:   hovered ? `rgba(${accentRgb},0.05)` : "rgba(255,255,255,0.015)",
        border:       `1px solid ${hovered ? `rgba(${accentRgb},0.25)` : "rgba(255,255,255,0.05)"}`,
        borderRadius: "16px",
        cursor:       "default",
        opacity:      visible ? 1 : 0,
        transform:    visible ? "translateY(0)" : "translateY(36px)",
        transition:   `opacity 0.7s ease ${index * 0.14}s, transform 0.7s ease ${index * 0.14}s, background 0.35s, border-color 0.35s`,
      }}
    >
      <div style={{
        fontFamily:    "var(--font-mono)",
        fontSize:      "0.7rem",
        letterSpacing: "0.15em",
        color:         accent,
        marginBottom:  "1rem",
        opacity:       0.7,
      }}>
        {num}
      </div>
      <h3 style={{
        fontFamily:    "var(--font-display)",
        fontSize:      "clamp(0.95rem,1.2vw,1.15rem)",
        color:         "#fff",
        letterSpacing: "0.05em",
        marginBottom:  "0.85rem",
        lineHeight:    1.2,
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: "var(--font-space)",
        fontSize:   "clamp(0.8rem,0.9vw,0.88rem)",
        lineHeight: 1.7,
        color:      "rgba(209,213,219,0.55)",
      }}>
        {body}
      </p>
    </div>
  );
}

export default function WhyNexlify() {
  const ref                = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      position:  "relative",
      zIndex:    1,
      padding:   "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,4rem)",
      background: "#050508",
      overflow:  "hidden",
    }}>
      {/* Background grid dot pattern */}
      <div aria-hidden="true" style={{
        position:            "absolute",
        inset:               0,
        backgroundImage:     "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize:      "32px 32px",
        maskImage:           "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
        WebkitMaskImage:     "radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 100%)",
        pointerEvents:       "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Statement headline */}
        <div style={{
          textAlign:    "center",
          marginBottom: "clamp(3.5rem,7vw,6rem)",
          opacity:      visible ? 1 : 0,
          transform:    visible ? "translateY(0)" : "translateY(30px)",
          transition:   "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <div style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "clamp(0.65rem,0.8vw,0.75rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#7B2FFF",
            marginBottom:  "1rem",
          }}>
            — The Nexlify Difference
          </div>

          <h2 style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2.2rem,5vw,4.5rem)",
            color:         "#fff",
            letterSpacing: "0.04em",
            lineHeight:    1.05,
            marginBottom:  "1.5rem",
          }}>
            WHY NEXLIFY?
          </h2>

          <p style={{
            fontFamily: "var(--font-space)",
            fontSize:   "clamp(1rem,1.4vw,1.15rem)",
            color:      "rgba(209,213,219,0.55)",
            maxWidth:   "600px",
            margin:     "0 auto",
            lineHeight: 1.7,
          }}>
            Africa doesn&apos;t need adapted Western software. It needs technology engineered
            for its infrastructure, its languages, and its market realities. That&apos;s what
            we build — and nothing else.
          </p>
        </div>

        {/* Pillars grid */}
        <div style={{
          display:  "flex",
          flexWrap: "wrap",
          gap:      "1.2rem",
        }}>
          {PILLARS.map((p, i) => (
            <Pillar key={p.num} {...p} visible={visible} index={i} />
          ))}
        </div>

        {/* Bottom accent strip */}
        <div style={{
          marginTop:     "clamp(3rem,6vw,5rem)",
          textAlign:     "center",
          opacity:       visible ? 1 : 0,
          transition:    "opacity 1s ease 0.6s",
        }}>
          <div style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            "1rem",
            padding:        "1rem 2rem",
            border:         "1px solid rgba(255,255,255,0.06)",
            borderRadius:   "100px",
            background:     "rgba(255,255,255,0.02)",
          }}>
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "rgba(209,213,219,0.45)",
            }}>
              Based in Cameroon
            </span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "rgba(209,213,219,0.45)",
            }}>
              Building for the Continent
            </span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color:         "rgba(209,213,219,0.45)",
            }}>
              Since 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
