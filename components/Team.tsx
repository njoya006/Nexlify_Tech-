"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";
const PINK   = "#FF2D78";

interface Member {
  initials:  string;
  name:      string;
  role:      string;
  bio:       string;
  accent:    string;
  accentRgb: string;
  gradient:  string;
  photo?:    string;
  socials:   { platform: string; label: string }[];
}

const TEAM: Member[] = [
  {
    initials:  "NA",
    name:      "Njoya Medin-Praise Alambi",
    role:      "Co-Founder & CEO",
    bio:       "Visionary technologist and entrepreneur who built Nexlify Tech from the ground up. Medin-Praise leads company strategy while staying hands-on as the principal backend engineer — architecting the systems behind Nexlify's most demanding client products. He believes the best leaders ship code.",
    accent:    CYAN,
    accentRgb: "0,245,255",
    gradient:  "linear-gradient(135deg, rgba(0,245,255,0.18) 0%, rgba(123,47,255,0.22) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }, { platform: "X", label: "X / Twitter" }],
  },
  {
    initials:  "CH",
    name:      "Che Hermann Bright",
    role:      "CTO & Frontend Architect",
    bio:       "The technical backbone of Nexlify. As CTO, Che sets the engineering standards that every product is held to — from system architecture decisions to the pixel-perfect interfaces clients experience. He leads a culture where technical excellence and product quality are non-negotiable.",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    gradient:  "linear-gradient(135deg, rgba(123,47,255,0.22) 0%, rgba(0,245,255,0.16) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }, { platform: "X", label: "X / Twitter" }],
  },
  {
    initials:  "FC",
    name:      "Fanyi Charlson",
    role:      "Lead Architect",
    bio:       "Systems thinker and infrastructure specialist responsible for the architectural foundations of Nexlify's most complex builds. Charlson translates ambitious product requirements into scalable, production-grade technical designs that teams can actually build and clients can rely on.",
    accent:    PINK,
    accentRgb: "255,45,120",
    gradient:  "linear-gradient(135deg, rgba(255,45,120,0.18) 0%, rgba(123,47,255,0.16) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }],
  },
  {
    initials:  "NP",
    name:      "Ngeminang Precious",
    role:      "Product Owner",
    bio:       "The voice of the client at every product decision. Precious bridges business goals and engineering reality — defining requirements, prioritising features, and ensuring every build is solving the right problem before a line of code is written.",
    accent:    CYAN,
    accentRgb: "0,245,255",
    gradient:  "linear-gradient(135deg, rgba(0,245,255,0.16) 0%, rgba(255,45,120,0.14) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }],
  },
  {
    initials:  "Ph",
    name:      "Ngnindem Phineas",
    role:      "Project Manager",
    bio:       "The operational engine that keeps every Nexlify engagement on track. Phineas orchestrates cross-functional teams, manages delivery timelines, and ensures complex multi-phase projects move forward without friction — so clients always know where their product stands.",
    accent:    VIOLET,
    accentRgb: "123,47,255",
    gradient:  "linear-gradient(135deg, rgba(123,47,255,0.18) 0%, rgba(255,45,120,0.16) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }],
  },
  {
    initials:  "MB",
    name:      "Mengnjoh Beri Pamela",
    role:      "Chief Marketing Officer",
    bio:       "Brand strategist and growth architect behind Nexlify's market presence. Pamela leads go-to-market strategy, brand identity, and client communications — positioning Nexlify as the digital studio that serious companies in Cameroon and beyond choose when the stakes are high.",
    accent:    PINK,
    accentRgb: "255,45,120",
    gradient:  "linear-gradient(135deg, rgba(255,45,120,0.18) 0%, rgba(0,245,255,0.14) 100%)",
    photo:     "/assets/pamela.jpg",
    socials:   [{ platform: "Li", label: "LinkedIn" }, { platform: "Ig", label: "Instagram" }],
  },
  {
    initials:  "LN",
    name:      "Lum Nchifor",
    role:      "Brand Manager",
    bio:       "Creative guardian of the Nexlify identity. Lum ensures every visual and verbal touchpoint — from pitch decks to digital presence — reflects the precision, ambition, and craft that define what Nexlify Tech stands for.",
    accent:    CYAN,
    accentRgb: "0,245,255",
    gradient:  "linear-gradient(135deg, rgba(0,245,255,0.14) 0%, rgba(123,47,255,0.18) 100%)",
    socials:   [{ platform: "Li", label: "LinkedIn" }, { platform: "Ig", label: "Instagram" }],
  },
];

function MemberCard({ m, index, visible }: { m: Member; index: number; visible: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 130, damping: 20 });
  const sRotY = useSpring(rotY, { stiffness: 130, damping: 20 });
  const transform = useTransform(
    [sRotX, sRotY],
    ([rx, ry]: number[]) => `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rotX.set(((e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)) * -6);
    rotY.set(((e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)) *  6);
  }, [rotX, rotY]);

  const onMouseLeave = useCallback(() => { rotX.set(0); rotY.set(0); }, [rotX, rotY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ transform }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          background:           "rgba(13,13,31,0.78)",
          backdropFilter:       "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border:               `1px solid rgba(${m.accentRgb},0.14)`,
          borderRadius:         "18px",
          overflow:             "hidden",
          cursor:               "default",
          transition:           `
            opacity      0.7s ease ${index * 0.1}s,
            transform    0.7s ease ${index * 0.1}s,
            box-shadow   0.35s ease
          `,
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(52px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 40px rgba(${m.accentRgb},0.10), 0 20px 60px rgba(0,0,0,0.5)`;
          e.currentTarget.style.borderColor = `rgba(${m.accentRgb},0.35)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = `rgba(${m.accentRgb},0.14)`;
        }}
      >
        {/* Avatar area */}
        <div
          style={{
            height:   "200px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {m.photo ? (
            <>
              <Image
                src={m.photo}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 90vw, 28vw"
                className="object-cover object-top"
              />
              <div
                style={{
                  position:   "absolute",
                  inset:      0,
                  background: "linear-gradient(to bottom, transparent 50%, rgba(5,5,8,0.80) 100%)",
                }}
              />
              <div
                style={{
                  position:   "absolute",
                  bottom:     0,
                  left:       0,
                  right:      0,
                  height:     "2px",
                  background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
                  opacity:    0.5,
                }}
              />
            </>
          ) : (
            <>
              <div style={{ position: "absolute", inset: 0, background: m.gradient }} />
              {/* Grid overlay */}
              <div
                aria-hidden="true"
                style={{
                  position:        "absolute",
                  inset:           0,
                  backgroundImage: `
                    linear-gradient(rgba(${m.accentRgb},0.10) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(${m.accentRgb},0.10) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Initials */}
              <div
                style={{
                  position:       "absolute",
                  inset:          0,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "4rem",
                    color:         `rgba(${m.accentRgb},0.35)`,
                    letterSpacing: "0.04em",
                    userSelect:    "none",
                  }}
                >
                  {m.initials}
                </span>
              </div>
              <div
                style={{
                  position:   "absolute",
                  bottom:     0,
                  left:       0,
                  right:      0,
                  height:     "2px",
                  background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
                  opacity:    0.45,
                }}
              />
            </>
          )}

          {/* Role badge */}
          <div
            style={{
              position:     "absolute",
              top:          "1rem",
              left:         "1rem",
              background:   `rgba(${m.accentRgb},0.12)`,
              border:       `1px solid rgba(${m.accentRgb},0.28)`,
              borderRadius: "9999px",
              padding:      "4px 12px",
            }}
          >
            <span
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.57rem",
                fontWeight:    700,
                color:         m.accent,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
              }}
            >
              {m.role}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
          <h3
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(1.15rem,1.8vw,1.45rem)",
              color:         "white",
              margin:        "0 0 0.65rem 0",
              lineHeight:    1.15,
              letterSpacing: "0.03em",
            }}
          >
            {m.name}
          </h3>

          {/* Divider */}
          <div
            style={{
              height:     "1px",
              background: `linear-gradient(90deg, rgba(${m.accentRgb},0.40), rgba(${m.accentRgb},0.08), transparent)`,
              marginBottom: "0.9rem",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-space)",
              fontSize:   "clamp(0.78rem,0.88vw,0.86rem)",
              color:      "rgba(209,213,219,0.75)",
              lineHeight: 1.70,
              margin:     "0 0 1.25rem 0",
            }}
          >
            {m.bio}
          </p>

          {/* Socials */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {m.socials.map(({ platform, label }) => (
              <a
                key={platform}
                href="#"
                aria-label={label}
                style={{
                  fontFamily:    "var(--font-space)",
                  fontSize:      "0.60rem",
                  fontWeight:    700,
                  color:         `rgba(${m.accentRgb},0.55)`,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  textDecoration:"none",
                  background:    `rgba(${m.accentRgb},0.07)`,
                  border:        `1px solid rgba(${m.accentRgb},0.18)`,
                  borderRadius:  "6px",
                  padding:       "5px 11px",
                  transition:    "color 0.25s, background 0.25s, border-color 0.25s",
                  cursor:        "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color        = m.accent;
                  el.style.background   = `rgba(${m.accentRgb},0.14)`;
                  el.style.borderColor  = `rgba(${m.accentRgb},0.40)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color        = `rgba(${m.accentRgb},0.55)`;
                  el.style.background   = `rgba(${m.accentRgb},0.07)`;
                  el.style.borderColor  = `rgba(${m.accentRgb},0.18)`;
                }}
              >
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Team() {
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
      id="team"
      style={{
        position:   "relative",
        zIndex:     1,
        background: "transparent",
        padding:    "clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px)",
        overflow:   "hidden",
      }}
    >
      {/* Top glow separator — pink */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           0,
          left:          "50%",
          transform:     "translateX(-50%)",
          width:         "min(800px,70%)",
          height:        "1px",
          background:    "radial-gradient(ellipse at center, rgba(255,45,120,0.60) 0%, transparent 70%)",
          boxShadow:     "0 0 22px 4px rgba(255,45,120,0.12)",
          pointerEvents: "none",
        }}
      />

      {/* Violet accent glow */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          top:           "0%",
          right:         "10%",
          width:         "45vw",
          height:        "45vw",
          borderRadius:  "50%",
          background:    "radial-gradient(ellipse at center, rgba(123,47,255,0.05) 0%, transparent 65%)",
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
              color:         PINK,
              borderLeft:    `3px solid ${PINK}`,
              paddingLeft:   "12px",
              textTransform: "uppercase",
              textShadow:    "0 0 12px rgba(255,45,120,0.6)",
              opacity:       headerIn ? 1 : 0,
              transform:     headerIn ? "none" : "translateY(20px)",
              transition:    "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            The People
          </span>
        </div>

        <h2 style={{ margin: 0, lineHeight: 1.0 }}>
          {["BUILT BY HUMANS,", "DRIVEN BY AMBITION"].map((line, i) => (
            <span
              key={line}
              className={i === 1 ? "grad-pink-cyan" : ""}
              style={{
                display:    "block",
                fontFamily: "var(--font-display)",
                fontSize:   "clamp(2.4rem,5.5vw,5.5rem)",
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
          Small team. Outsized impact. Every person at Nexlify is world-class at what they do.
        </p>
      </div>

      {/* ── Team Grid ── */}
      <div
        style={{
          maxWidth:            "1100px",
          margin:              "0 auto",
          padding:             "0 clamp(1.5rem,5vw,4rem)",
          display:             "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap:                 "1.5rem",
        }}
      >
        {TEAM.map((m, i) => (
          <MemberCard key={m.name} m={m} index={i} visible={cardsIn} />
        ))}
      </div>

      {/* ── Hiring note ── */}
      <div
        style={{
          textAlign:  "center",
          marginTop:  "clamp(52px,7vw,80px)",
          padding:    "0 clamp(1.5rem,5vw,5rem)",
          opacity:    cardsIn ? 1 : 0,
          transform:  cardsIn ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}
      >
        <p
          style={{
            fontFamily:    "var(--font-space)",
            fontSize:      "clamp(0.85rem,1vw,0.95rem)",
            color:         "rgba(209,213,219,0.45)",
            letterSpacing: "0.04em",
            marginBottom:  "1rem",
          }}
        >
          We hire rarely and intentionally.
        </p>
        <a
          href="#contact"
          style={{
            fontFamily:    "var(--font-space)",
            fontSize:      "0.72rem",
            fontWeight:    700,
            color:         PINK,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            textDecoration:"none",
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "0.4rem",
            cursor:        "none",
            paddingBottom: "2px",
            borderBottom:  "1px solid rgba(255,45,120,0.30)",
            transition:    "border-color 0.25s, text-shadow 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor  = "rgba(255,45,120,0.7)";
            e.currentTarget.style.textShadow   = "0 0 10px rgba(255,45,120,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor  = "rgba(255,45,120,0.30)";
            e.currentTarget.style.textShadow   = "none";
          }}
        >
          Think you belong here? Let&apos;s talk
          <svg
            width="12" height="12"
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
