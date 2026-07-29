"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useMotionValue, useSpring, useTransform, motion, AnimatePresence } from "framer-motion";

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
    photo:     "/assets/Njoya.jpeg",
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
    photo:     "/assets/Bright.jpeg",
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
    photo:     "/assets/Precious.jpeg",
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
    photo:     "/assets/Lum.jpeg",
    socials:   [{ platform: "Li", label: "LinkedIn" }, { platform: "Ig", label: "Instagram" }],
  },
];

/* ── Bio Modal ── */
function MemberModal({ m, onClose }: { m: Member; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 24 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: "760px",
          background: "rgba(10,10,22,0.95)",
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          border: `1px solid rgba(${m.accentRgb},0.25)`,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: `0 0 60px rgba(${m.accentRgb},0.10), 0 40px 100px rgba(0,0,0,0.6)`,
        }}
      >
        {/* Top accent line */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)`,
          opacity: 0.7,
        }} />

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {/* Photo column */}
          <div style={{
            flex: "0 0 clamp(180px, 38%, 260px)",
            minHeight: "clamp(260px, 40vw, 360px)",
            position: "relative",
          }}>
            {m.photo ? (
              <Image
                src={m.photo}
                alt={m.name}
                fill
                sizes="260px"
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            ) : (
              <>
                <div style={{ position: "absolute", inset: 0, background: m.gradient }} />
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{
                    fontFamily: "var(--font-display)", fontSize: "5rem",
                    color: `rgba(${m.accentRgb},0.35)`, userSelect: "none",
                  }}>
                    {m.initials}
                  </span>
                </div>
              </>
            )}
            {/* Side gradient */}
            <div style={{
              position: "absolute", top: 0, right: 0, bottom: 0, width: "40px",
              background: "linear-gradient(to right, transparent, rgba(10,10,22,0.95))",
            }} />
          </div>

          {/* Info column */}
          <div style={{ flex: 1, padding: "2rem 2rem 2rem 1.5rem", minWidth: "220px" }}>
            {/* Role badge */}
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: m.accent,
              background: `rgba(${m.accentRgb},0.10)`,
              border: `1px solid rgba(${m.accentRgb},0.28)`,
              borderRadius: "9999px", padding: "4px 14px",
              marginBottom: "0.9rem",
            }}>
              {m.role}
            </span>

            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem,2.5vw,1.75rem)",
              color: "white", margin: "0 0 1rem",
              letterSpacing: "0.03em", lineHeight: 1.1,
            }}>
              {m.name}
            </h3>

            <div style={{
              height: "1px",
              background: `linear-gradient(90deg, rgba(${m.accentRgb},0.45), rgba(${m.accentRgb},0.08), transparent)`,
              marginBottom: "1rem",
            }} />

            <p style={{
              fontFamily: "var(--font-space)",
              fontSize: "clamp(0.82rem,1vw,0.92rem)",
              color: "rgba(209,213,219,0.80)",
              lineHeight: 1.80, margin: "0 0 1.5rem",
            }}>
              {m.bio}
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {m.socials.map(({ platform, label }) => (
                <a key={platform} href="#" aria-label={label} style={{
                  fontFamily: "var(--font-space)", fontSize: "0.62rem", fontWeight: 700,
                  color: `rgba(${m.accentRgb},0.65)`, letterSpacing: "0.14em",
                  textTransform: "uppercase", textDecoration: "none",
                  background: `rgba(${m.accentRgb},0.08)`,
                  border: `1px solid rgba(${m.accentRgb},0.22)`,
                  borderRadius: "8px", padding: "7px 16px",
                  transition: "color 0.2s, background 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = m.accent;
                    el.style.background = `rgba(${m.accentRgb},0.16)`;
                    el.style.borderColor = `rgba(${m.accentRgb},0.45)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = `rgba(${m.accentRgb},0.65)`;
                    el.style.background = `rgba(${m.accentRgb},0.08)`;
                    el.style.borderColor = `rgba(${m.accentRgb},0.22)`;
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            width: 32, height: 32, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background 0.2s, color 0.2s",
            fontSize: "1rem", lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.12)";
            el.style.color = "white";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = "rgba(255,255,255,0.06)";
            el.style.color = "rgba(255,255,255,0.55)";
          }}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Member Card ── */
function MemberCard({
  m, index, visible, onClick,
}: { m: Member; index: number; visible: boolean; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 130, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 130, damping: 22 });
  const tilt = useTransform(
    [sRotX, sRotY],
    ([rx, ry]: number[]) => `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rotX.set(((e.clientY - r.top  - r.height / 2) / (r.height / 2)) * -5);
    rotY.set(((e.clientX - r.left - r.width  / 2) / (r.width  / 2)) *  5);
  }, [rotX, rotY]);

  const onMouseLeave = useCallback(() => { rotX.set(0); rotY.set(0); setHovered(false); }, [rotX, rotY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ transform: tilt }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        style={{
          cursor: "pointer",
          borderRadius: "16px",
          overflow: "hidden",
          background: "rgba(10,10,22,0.85)",
          border: `1px solid rgba(${m.accentRgb},${hovered ? 0.42 : 0.10})`,
          boxShadow: hovered
            ? `0 0 40px rgba(${m.accentRgb},0.12), 0 24px 60px rgba(0,0,0,0.55)`
            : "none",
          transition: `
            opacity      0.7s ease ${index * 0.09}s,
            transform    0.7s ease ${index * 0.09}s,
            border-color 0.3s ease,
            box-shadow   0.3s ease
          `,
          opacity:   visible ? 1 : 0,
          transform: visible ? (hovered ? "translateY(-7px)" : "translateY(0)") : "translateY(50px)",
        }}
      >
        {/* ── Photo area (tall) ── */}
        <div style={{ position: "relative", height: "clamp(280px, 34vw, 340px)", overflow: "hidden" }}>
          {m.photo ? (
            <Image
              src={m.photo}
              alt={m.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              style={{ objectFit: "cover", objectPosition: "top center" }}
            />
          ) : (
            <>
              <div style={{ position: "absolute", inset: 0, background: m.gradient }} />
              <div aria-hidden="true" style={{
                position: "absolute", inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(${m.accentRgb},0.10) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(${m.accentRgb},0.10) 1px, transparent 1px)
                `,
                backgroundSize: "38px 38px",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "5rem",
                  color: `rgba(${m.accentRgb},0.30)`, userSelect: "none",
                  letterSpacing: "0.04em",
                }}>
                  {m.initials}
                </span>
              </div>
            </>
          )}

          {/* Bottom gradient — name/role lives here */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: "65%",
            background: "linear-gradient(to top, rgba(5,5,8,0.97) 0%, rgba(5,5,8,0.60) 50%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Hover accent tint */}
          <div style={{
            position: "absolute", inset: 0,
            background: `rgba(${m.accentRgb},${hovered ? 0.06 : 0})`,
            transition: "background 0.35s ease",
            pointerEvents: "none",
          }} />

          {/* Social pills — appear on hover, top-right */}
          <div style={{
            position: "absolute", top: "0.85rem", right: "0.85rem",
            display: "flex", flexDirection: "column", gap: "0.4rem",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(10px)",
            transition: "opacity 0.25s ease 0.05s, transform 0.25s ease 0.05s",
          }}>
            {m.socials.map(({ platform, label }) => (
              <a
                key={platform}
                href="#"
                aria-label={label}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 34, height: 34, borderRadius: "9px",
                  background: `rgba(${m.accentRgb},0.18)`,
                  border: `1px solid rgba(${m.accentRgb},0.35)`,
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-space)", fontSize: "0.56rem", fontWeight: 700,
                  color: m.accent, letterSpacing: "0.06em", textDecoration: "none",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `rgba(${m.accentRgb},0.32)`;
                  el.style.borderColor = `rgba(${m.accentRgb},0.60)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `rgba(${m.accentRgb},0.18)`;
                  el.style.borderColor = `rgba(${m.accentRgb},0.35)`;
                }}
              >
                {platform}
              </a>
            ))}
          </div>

          {/* "View profile" label — hover bottom-right */}
          <div style={{
            position: "absolute", bottom: "4.5rem", right: "1rem",
            display: "flex", alignItems: "center", gap: "0.35rem",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.25s ease 0.08s, transform 0.25s ease 0.08s",
            pointerEvents: "none",
          }}>
            <span style={{
              fontFamily: "var(--font-space)", fontSize: "0.60rem", fontWeight: 700,
              color: m.accent, letterSpacing: "0.16em", textTransform: "uppercase",
              textShadow: `0 0 10px rgba(${m.accentRgb},0.6)`,
            }}>
              View Profile
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={m.accent} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {/* Name + role — always visible at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "1rem 1.2rem 1.1rem",
          }}>
            <div style={{
              fontFamily: "var(--font-mono)", fontSize: "0.56rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: m.accent, marginBottom: "0.3rem",
              textShadow: `0 0 10px rgba(${m.accentRgb},0.5)`,
            }}>
              {m.role}
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.95rem,1.4vw,1.2rem)",
              color: "white", margin: 0,
              letterSpacing: "0.04em", lineHeight: 1.15,
            }}>
              {m.name}
            </h3>
          </div>
        </div>

        {/* ── Bottom accent bar ── */}
        <div style={{
          height: "3px",
          background: `linear-gradient(90deg, rgba(${m.accentRgb},${hovered ? 0.75 : 0.22}), rgba(${m.accentRgb},0.08), transparent)`,
          transition: "background 0.35s ease",
        }} />
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export default function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [headerIn, setHeaderIn] = useState(false);
  const [cardsIn,  setCardsIn]  = useState(false);
  const [active,   setActive]   = useState<Member | null>(null);

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
    <>
      <section
        ref={sectionRef}
        id="team"
        style={{
          position: "relative", zIndex: 1,
          background: "transparent",
          padding: "clamp(80px,10vw,140px) 0 clamp(60px,8vw,100px)",
          overflow: "hidden",
        }}
      >
        {/* Top glow */}
        <div aria-hidden="true" style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "min(800px,70%)", height: "1px",
          background: "radial-gradient(ellipse at center, rgba(255,45,120,0.60) 0%, transparent 70%)",
          boxShadow: "0 0 22px 4px rgba(255,45,120,0.12)", pointerEvents: "none",
        }} />

        {/* Background glow blob */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "0%", right: "10%",
          width: "45vw", height: "45vw", borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(123,47,255,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{ textAlign: "center", marginBottom: "clamp(52px,7vw,88px)", padding: "0 clamp(1.5rem,5vw,5rem)" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
            <span style={{
              fontFamily: "var(--font-display)", fontSize: "0.75rem",
              letterSpacing: "0.3em", color: PINK,
              borderLeft: `3px solid ${PINK}`, paddingLeft: "12px",
              textTransform: "uppercase", textShadow: "0 0 12px rgba(255,45,120,0.6)",
              opacity: headerIn ? 1 : 0,
              transform: headerIn ? "none" : "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}>
              The People
            </span>
          </div>

          <h2 style={{ margin: 0, lineHeight: 1.0 }}>
            {["BUILT BY HUMANS,", "DRIVEN BY AMBITION"].map((line, i) => (
              <span key={line} className={i === 1 ? "grad-pink-cyan" : ""} style={{
                display: "block", fontFamily: "var(--font-display)",
                fontSize: "clamp(2.4rem,5.5vw,5.5rem)",
                color: i === 0 ? "white" : undefined,
                opacity: headerIn ? 1 : 0,
                transform: headerIn ? "none" : "translateX(-50px)",
                transition: `opacity 0.7s ease ${0.1 + i * 0.12}s, transform 0.7s ease ${0.1 + i * 0.12}s`,
              }}>
                {line}
              </span>
            ))}
          </h2>

          <p style={{
            fontFamily: "var(--font-space)", fontSize: "clamp(0.92rem,1.25vw,1.08rem)",
            color: "#D1D5DB", maxWidth: "520px", margin: "1.5rem auto 0", lineHeight: 1.65,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? "none" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          }}>
            Small team. Outsized impact. Click any card to learn more.
          </p>
        </div>

        {/* ── Team Grid ── */}
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          padding: "0 clamp(1.5rem,5vw,4rem)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}>
          {TEAM.map((m, i) => (
            <MemberCard
              key={m.name}
              m={m}
              index={i}
              visible={cardsIn}
              onClick={() => setActive(m)}
            />
          ))}
        </div>

        {/* ── Hiring note ── */}
        <div style={{
          textAlign: "center", marginTop: "clamp(52px,7vw,80px)",
          padding: "0 clamp(1.5rem,5vw,5rem)",
          opacity: cardsIn ? 1 : 0, transform: cardsIn ? "none" : "translateY(20px)",
          transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
        }}>
          <p style={{
            fontFamily: "var(--font-space)", fontSize: "clamp(0.85rem,1vw,0.95rem)",
            color: "rgba(209,213,219,0.45)", letterSpacing: "0.04em", marginBottom: "1rem",
          }}>
            We hire rarely and intentionally.
          </p>
          <a href="#contact" style={{
            fontFamily: "var(--font-space)", fontSize: "0.72rem", fontWeight: 700,
            color: PINK, letterSpacing: "0.16em", textTransform: "uppercase",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.4rem",
            paddingBottom: "2px", borderBottom: "1px solid rgba(255,45,120,0.30)",
            transition: "border-color 0.25s, text-shadow 0.25s",
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,45,120,0.7)";
              e.currentTarget.style.textShadow  = "0 0 10px rgba(255,45,120,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,45,120,0.30)";
              e.currentTarget.style.textShadow  = "none";
            }}
          >
            Think you belong here? Let&apos;s talk
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── Modal (portal-style, outside section) ── */}
      <AnimatePresence>
        {active && <MemberModal m={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
