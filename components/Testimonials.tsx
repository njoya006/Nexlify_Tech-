"use client";

import { useRef, useState, useEffect } from "react";

const TESTIMONIALS = [
  {
    quote:
      "Nexlify built us something no foreign vendor could — a system that actually understands how law practice works in Cameroon. Offline-first architecture, both official languages, both legal systems. This isn't adapted software. It's built for us.",
    name:    "Barrister A. Mbu",
    role:    "Senior Legal Practitioner, Buea",
    accent:  "#00F5FF",
    accentRgb: "0,245,255",
    initial: "A",
  },
  {
    quote:
      "The LawBridge architecture demo stopped the room. Kubernetes self-healing live, six AI features, full observability — and a team half the size of what we expected. These engineers build like they have something to prove.",
    name:    "Dr. E. Tchamba",
    role:    "Technology Director, Douala",
    accent:  "#7B2FFF",
    accentRgb: "123,47,255",
    initial: "E",
  },
  {
    quote:
      "SkillForge 237 gave our tutors a professional platform instead of a WhatsApp group. The learner dashboards, the progress tracking, the admin tools — it works on 3G. That's what matters here.",
    name:    "Mme. F. Ngomo",
    role:    "Vocational Training Coordinator, Yaoundé",
    accent:  "#FF2D78",
    accentRgb: "255,45,120",
    initial: "F",
  },
  {
    quote:
      "We needed Mobile Money, phone number login, and seller verification built properly — not patched in. Nexlify delivered all three, and the database design held up under real market load without a single data inconsistency.",
    name:    "Mr. C. Nkwenti",
    role:    "E-Commerce Founder, Bamenda",
    accent:  "#00F5FF",
    accentRgb: "0,245,255",
    initial: "C",
  },
];

export default function Testimonials() {
  const sectionRef                    = useRef<HTMLDivElement>(null);
  const [visible, setVisible]         = useState(false);
  const [active,  setActive]          = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-advance every 6s
  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section ref={sectionRef} style={{
      position:  "relative",
      zIndex:    1,
      padding:   "clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,4rem)",
      background: "#050508",
      overflow:  "hidden",
    }}>
      {/* Background glow */}
      <div aria-hidden="true" style={{
        position:   "absolute",
        top: "50%", left: "50%",
        width: "700px", height: "500px",
        transform: "translate(-50%,-50%)",
        background: `radial-gradient(ellipse, rgba(${t.accentRgb},0.05) 0%, transparent 70%)`,
        transition: "background 0.8s ease",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{
          textAlign:  "center",
          marginBottom: "clamp(3rem,6vw,5rem)",
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <div style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "clamp(0.65rem,0.8vw,0.75rem)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#00F5FF",
            marginBottom:  "0.75rem",
          }}>
            — Client Voices
          </div>
          <h2 style={{
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(2rem,4vw,3.2rem)",
            color:         "#fff",
            letterSpacing: "0.04em",
            lineHeight:    1.1,
          }}>
            WHAT THEY SAY
          </h2>
        </div>

        {/* Card */}
        <div
          key={active}
          style={{
            background:   "rgba(255,255,255,0.02)",
            border:       `1px solid rgba(${t.accentRgb},0.15)`,
            borderRadius: "20px",
            padding:      "clamp(2rem,5vw,3.5rem)",
            position:     "relative",
            opacity:      visible ? 1 : 0,
            transform:    visible ? "translateY(0)" : "translateY(32px)",
            transition:   "opacity 0.5s ease, transform 0.5s ease, border-color 0.6s ease",
          }}
        >
          {/* Top accent line */}
          <div style={{
            position:   "absolute",
            top: 0, left: "10%", right: "10%",
            height: "1px",
            background: `linear-gradient(to right, transparent, rgba(${t.accentRgb},0.6), transparent)`,
            transition: "background 0.6s ease",
          }} />

          {/* Quote mark */}
          <div style={{
            fontFamily:  "Georgia, serif",
            fontSize:    "5rem",
            lineHeight:  0.8,
            color:       t.accent,
            opacity:     0.25,
            marginBottom: "1.5rem",
            userSelect:  "none",
          }}>"</div>

          {/* Quote text */}
          <p style={{
            fontFamily:  "var(--font-space)",
            fontSize:    "clamp(1rem,1.6vw,1.2rem)",
            lineHeight:  1.75,
            color:       "rgba(209,213,219,0.85)",
            marginBottom: "2rem",
            fontStyle:   "italic",
          }}>
            {t.quote}
          </p>

          {/* Attribution */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{
              width:        "46px",
              height:       "46px",
              borderRadius: "50%",
              background:   `rgba(${t.accentRgb},0.15)`,
              border:       `1px solid rgba(${t.accentRgb},0.3)`,
              display:      "flex",
              alignItems:   "center",
              justifyContent: "center",
              fontFamily:   "var(--font-display)",
              fontSize:     "1.1rem",
              color:        t.accent,
              flexShrink:   0,
            }}>
              {t.initial}
            </div>
            <div>
              <div style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.95rem",
                fontWeight:    600,
                color:         "#fff",
                letterSpacing: "0.02em",
              }}>
                {t.name}
              </div>
              <div style={{
                fontFamily: "var(--font-space)",
                fontSize:   "0.75rem",
                color:      "rgba(209,213,219,0.45)",
                marginTop:  "0.15rem",
              }}>
                {t.role}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          display:        "flex",
          justifyContent: "center",
          gap:            "0.6rem",
          marginTop:      "2rem",
        }}>
          {TESTIMONIALS.map((tt, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              style={{
                width:        i === active ? "28px" : "8px",
                height:       "8px",
                borderRadius: "4px",
                background:   i === active ? t.accent : "rgba(255,255,255,0.15)",
                border:       "none",
                cursor:       "pointer",
                padding:      0,
                transition:   "width 0.4s ease, background 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
