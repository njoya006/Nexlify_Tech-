"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";
const PINK   = "#FF2D78";

const PROJECT_TYPES = [
  "Web / App Development",
  "AI & Machine Learning",
  "UX / UI Design",
  "Digital Strategy",
  "Performance & SEO",
  "Cloud & DevOps",
  "Something else",
];

const INFO_ITEMS = [
  {
    label:    "Email",
    value:    "hello@nexlifytech.site",
    href:     "mailto:hello@nexlifytech.site",
    accentRgb: "0,245,255",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00F5FF" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label:    "Location",
    value:    "Remote-first · Global",
    href:     undefined,
    accentRgb: "123,47,255",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B2FFF" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label:    "Response Time",
    value:    "Within 24 hours",
    href:     undefined,
    accentRgb: "255,45,120",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF2D78" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const FOOTER_LINKS = [
  { label: "Home",     href: "#"          },
  { label: "About",    href: "#about"     },
  { label: "Works",    href: "#work"      },
  { label: "Services", href: "#services"  },
  { label: "Team",     href: "#team"      },
  { label: "Contact",  href: "#contact"   },
];

const SOCIAL_LINKS = ["Ig", "Li", "Yt", "X"];

interface FormState {
  name:    string;
  email:   string;
  type:    string;
  message: string;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const [headerIn,  setHeaderIn]  = useState(false);
  const [contentIn, setContentIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({ name: "", email: "", type: "", message: "" });

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
      ([e]) => { if (e.isIntersecting) { setContentIn(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  const inputStyle: React.CSSProperties = {
    width:                "100%",
    background:           "rgba(13,13,31,0.70)",
    border:               "1px solid rgba(0,245,255,0.14)",
    borderRadius:         "10px",
    padding:              "14px 16px",
    fontFamily:           "var(--font-space)",
    fontSize:             "0.88rem",
    color:                "#D1D5DB",
    outline:              "none",
    transition:           "border-color 0.25s, box-shadow 0.25s",
    backdropFilter:       "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxSizing:            "border-box",
  };

  const focusStyle = {
    borderColor: "rgba(0,245,255,0.50)",
    boxShadow:   "0 0 0 3px rgba(0,245,255,0.08)",
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = focusStyle.borderColor;
    e.currentTarget.style.boxShadow   = focusStyle.boxShadow;
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,245,255,0.14)";
    e.currentTarget.style.boxShadow   = "none";
  };

  return (
    <>
      {/* ════ CONTACT SECTION ════ */}
      <section
        ref={sectionRef}
        id="contact"
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

        {/* Cyan glow */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            bottom:        "0",
            left:          "50%",
            transform:     "translateX(-50%)",
            width:         "80vw",
            height:        "40vh",
            background:    "radial-gradient(ellipse at center, rgba(0,245,255,0.04) 0%, transparent 70%)",
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
                color:         CYAN,
                borderLeft:    `3px solid ${CYAN}`,
                paddingLeft:   "12px",
                textTransform: "uppercase",
                textShadow:    "0 0 12px rgba(0,245,255,0.6)",
                opacity:       headerIn ? 1 : 0,
                transform:     headerIn ? "none" : "translateY(20px)",
                transition:    "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              Get In Touch
            </span>
          </div>

          <h2 style={{ margin: 0, lineHeight: 1.0 }}>
            {["LET'S BUILD", "SOMETHING EXTRAORDINARY"].map((line, i) => (
              <span
                key={line}
                className={i === 1 ? "grad-cyan-violet" : ""}
                style={{
                  display:    "block",
                  fontFamily: "var(--font-display)",
                  fontSize:   "clamp(2.2rem,5vw,5rem)",
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

          {/* Playfair subline */}
          <p
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle:  "italic",
              fontSize:   "clamp(1rem,1.25vw,1.15rem)",
              color:      "rgba(209,213,219,0.42)",
              textAlign:  "center",
              margin:     "1.25rem auto 0",
              lineHeight: 1.60,
              maxWidth:   "460px",
              opacity:    headerIn ? 1 : 0,
              transition: "opacity 0.7s ease 0.45s",
            }}
          >
            &ldquo;Every great partnership starts with a single conversation.&rdquo;
          </p>
        </div>

        {/* ── Content: info + form ── */}
        <div
          style={{
            maxWidth:    "1100px",
            margin:      "0 auto",
            padding:     "0 clamp(1.5rem,5vw,4rem)",
            display:     "flex",
            flexWrap:    "wrap",
            gap:         "clamp(2.5rem,5vw,5rem)",
            alignItems:  "flex-start",
            opacity:     contentIn ? 1 : 0,
            transform:   contentIn ? "none" : "translateY(30px)",
            transition:  "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          {/* ── LEFT: Info ── */}
          <div style={{ flex: "1 1 280px" }}>
            <p
              style={{
                fontFamily: "var(--font-space)",
                fontSize:   "clamp(0.92rem,1.1vw,1.02rem)",
                color:      "rgba(209,213,219,0.65)",
                lineHeight: 1.75,
                margin:     "0 0 2.5rem 0",
                maxWidth:   "360px",
              }}
            >
              We work with a select few ambitious teams each quarter. If you have a bold idea,
              we want to hear it.
            </p>

            {/* Info items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {INFO_ITEMS.map(({ label, value, href, icon, accentRgb }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width:        "40px",
                      height:       "40px",
                      borderRadius: "10px",
                      background:   `rgba(${accentRgb},0.10)`,
                      border:       `1px solid rgba(${accentRgb},0.22)`,
                      display:      "flex",
                      alignItems:   "center",
                      justifyContent: "center",
                      flexShrink:   0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily:    "var(--font-space)",
                        fontSize:      "0.62rem",
                        fontWeight:    700,
                        color:         `rgba(${accentRgb},0.60)`,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom:  "2px",
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          fontFamily:    "var(--font-space)",
                          fontSize:      "clamp(0.82rem,0.95vw,0.9rem)",
                          color:         "#D1D5DB",
                          textDecoration: "none",
                          cursor:        "none",
                          transition:    "color 0.25s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = `rgba(${accentRgb},0.9)`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "#D1D5DB"; }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: "var(--font-space)",
                          fontSize:   "clamp(0.82rem,0.95vw,0.9rem)",
                          color:      "#D1D5DB",
                        }}
                      >
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    fontFamily:    "var(--font-space)",
                    fontSize:      "0.60rem",
                    fontWeight:    700,
                    color:         "rgba(209,213,219,0.40)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration:"none",
                    background:    "rgba(255,255,255,0.04)",
                    border:        "1px solid rgba(255,255,255,0.08)",
                    borderRadius:  "7px",
                    padding:       "6px 13px",
                    cursor:        "none",
                    transition:    "color 0.25s, border-color 0.25s, background 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.color        = CYAN;
                    el.style.borderColor  = "rgba(0,245,255,0.40)";
                    el.style.background   = "rgba(0,245,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.color        = "rgba(209,213,219,0.40)";
                    el.style.borderColor  = "rgba(255,255,255,0.08)";
                    el.style.background   = "rgba(255,255,255,0.04)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div style={{ flex: "2 1 400px" }}>
            {submitted ? (
              // ── Success state ──
              <div
                style={{
                  background:           "rgba(13,13,31,0.80)",
                  backdropFilter:       "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border:               "1px solid rgba(0,245,255,0.20)",
                  borderRadius:         "18px",
                  padding:              "clamp(2.5rem,5vw,4rem)",
                  display:              "flex",
                  flexDirection:        "column",
                  alignItems:           "center",
                  gap:                  "1.25rem",
                  textAlign:            "center",
                }}
              >
                {/* Checkmark */}
                <div
                  style={{
                    width:        "60px",
                    height:       "60px",
                    borderRadius: "50%",
                    background:   "rgba(0,245,255,0.10)",
                    border:       "1px solid rgba(0,245,255,0.35)",
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent: "center",
                    boxShadow:    "0 0 28px rgba(0,245,255,0.20)",
                  }}
                >
                  <svg
                    width="26" height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={CYAN}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>

                <h3
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "clamp(1.4rem,2.5vw,2rem)",
                    color:         "white",
                    margin:        0,
                    letterSpacing: "0.03em",
                  }}
                >
                  MESSAGE RECEIVED
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize:   "clamp(0.85rem,1vw,0.95rem)",
                    color:      "rgba(209,213,219,0.65)",
                    lineHeight: 1.70,
                    maxWidth:   "340px",
                    margin:     0,
                  }}
                >
                  We&apos;ll be in touch within 24 hours. Big things take time — but we start fast.
                </p>

                <div
                  style={{
                    height:     "1px",
                    width:      "120px",
                    background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                    opacity:    0.35,
                  }}
                />

                <span
                  style={{
                    fontFamily:    "var(--font-mono)",
                    fontSize:      "0.68rem",
                    color:         "rgba(0,245,255,0.5)",
                    letterSpacing: "0.14em",
                  }}
                >
                  nexlifytech.site
                </span>
              </div>
            ) : (
              // ── Form ──
              <form
                onSubmit={handleSubmit}
                style={{
                  background:           "rgba(13,13,31,0.72)",
                  backdropFilter:       "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border:               "1px solid rgba(0,245,255,0.10)",
                  borderRadius:         "18px",
                  padding:              "clamp(2rem,4vw,3rem)",
                  display:              "flex",
                  flexDirection:        "column",
                  gap:                  "1.25rem",
                }}
              >
                {/* Row: name + email */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                  <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    <label
                      htmlFor="contact-name"
                      style={{
                        fontFamily:    "var(--font-space)",
                        fontSize:      "0.65rem",
                        fontWeight:    700,
                        color:         "rgba(0,245,255,0.55)",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Marcus Webb"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>
                  <div style={{ flex: "1 1 180px", display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                    <label
                      htmlFor="contact-email"
                      style={{
                        fontFamily:    "var(--font-space)",
                        fontSize:      "0.65rem",
                        fontWeight:    700,
                        color:         "rgba(0,245,255,0.55)",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      style={inputStyle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                    />
                  </div>
                </div>

                {/* Project type */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  <label
                    htmlFor="contact-type"
                    style={{
                      fontFamily:    "var(--font-space)",
                      fontSize:      "0.65rem",
                      fontWeight:    700,
                      color:         "rgba(0,245,255,0.55)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    What Are You Building?
                  </label>
                  <select
                    id="contact-type"
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    style={{ ...inputStyle, cursor: "none" }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  >
                    <option value="" disabled style={{ background: "#0d0d1f" }}>
                      Select a service area...
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} style={{ background: "#0d0d1f" }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
                  <label
                    htmlFor="contact-message"
                    style={{
                      fontFamily:    "var(--font-space)",
                      fontSize:      "0.65rem",
                      fontWeight:    700,
                      color:         "rgba(0,245,255,0.55)",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Describe your vision, goals, and timeline..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    style={{
                      ...inputStyle,
                      resize:    "vertical",
                      minHeight: "120px",
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  style={{
                    fontFamily:           "var(--font-space)",
                    fontSize:             "0.78rem",
                    fontWeight:           700,
                    color:                "#050508",
                    letterSpacing:        "0.14em",
                    textTransform:        "uppercase",
                    background:           CYAN,
                    border:               "none",
                    borderRadius:         "9999px",
                    padding:              "16px 36px",
                    cursor:               "none",
                    display:              "flex",
                    alignItems:           "center",
                    justifyContent:       "center",
                    gap:                  "0.5rem",
                    width:                "100%",
                    transition:           "opacity 0.25s, box-shadow 0.25s",
                    boxShadow:            "0 0 30px rgba(0,245,255,0.25)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 45px rgba(0,245,255,0.45)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,255,0.25)"; }}
                >
                  Send Message
                  <svg
                    width="14" height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer
        style={{
          position:   "relative",
          zIndex:     1,
          overflow:   "hidden",
          background: "rgba(5,5,8,0.95)",
          borderTop:  "1px solid rgba(255,255,255,0.05)",
          padding:    "clamp(3rem,5vw,5rem) 0 clamp(1.5rem,3vw,2.5rem)",
        }}
      >
        {/* Background watermark */}
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            bottom:        "-0.15em",
            left:          "50%",
            transform:     "translateX(-50%)",
            fontFamily:    "var(--font-display)",
            fontSize:      "clamp(5rem,13vw,11rem)",
            fontWeight:    700,
            letterSpacing: "0.04em",
            color:         "transparent",
            WebkitTextStroke: "1px rgba(0,245,255,0.06)",
            whiteSpace:    "nowrap",
            pointerEvents: "none",
            userSelect:    "none",
            lineHeight:    1,
          }}
        >
          NEXLIFY
        </div>
        <div
          style={{
            maxWidth: "1100px",
            margin:   "0 auto",
            padding:  "0 clamp(1.5rem,5vw,4rem)",
          }}
        >
          {/* Top row: logo + links */}
          <div
            style={{
              display:        "flex",
              flexWrap:       "wrap",
              justifyContent: "space-between",
              alignItems:     "flex-start",
              gap:            "2rem",
              marginBottom:   "clamp(2rem,4vw,3.5rem)",
            }}
          >
            {/* Brand */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  style={{
                    fontFamily:    "var(--font-display)",
                    fontSize:      "1.1rem",
                    color:         "white",
                    letterSpacing: "0.06em",
                  }}
                >
                  NEXLIFY TECH
                </span>
                <span
                  style={{
                    width:     "7px",
                    height:    "7px",
                    borderRadius: "50%",
                    background: CYAN,
                    boxShadow:  `0 0 8px ${CYAN}, 0 0 20px rgba(0,245,255,0.4)`,
                    flexShrink: 0,
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-space)",
                  fontSize:   "0.82rem",
                  color:      "rgba(209,213,219,0.40)",
                  margin:     0,
                  maxWidth:   "240px",
                  lineHeight: 1.60,
                }}
              >
                We build the future. You lead it.
              </p>
            </div>

            {/* Nav links */}
            <nav
              style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 2rem" }}
              aria-label="Footer navigation"
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily:    "var(--font-space)",
                    fontSize:      "0.72rem",
                    color:         "rgba(209,213,219,0.35)",
                    textDecoration:"none",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    cursor:        "none",
                    transition:    "color 0.25s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(209,213,219,0.80)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(209,213,219,0.35)"; }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  style={{
                    fontFamily:    "var(--font-space)",
                    fontSize:      "0.60rem",
                    fontWeight:    700,
                    color:         "rgba(209,213,219,0.30)",
                    textDecoration:"none",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    background:    "rgba(255,255,255,0.03)",
                    border:        "1px solid rgba(255,255,255,0.07)",
                    borderRadius:  "7px",
                    padding:       "6px 12px",
                    cursor:        "none",
                    transition:    "color 0.25s, border-color 0.25s",
                    writingMode:   "horizontal-tb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color        = CYAN;
                    e.currentTarget.style.borderColor  = "rgba(0,245,255,0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color        = "rgba(209,213,219,0.30)";
                    e.currentTarget.style.borderColor  = "rgba(255,255,255,0.07)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height:     "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,245,255,0.15), rgba(123,47,255,0.12), transparent)",
              marginBottom: "clamp(1.25rem,2.5vw,2rem)",
            }}
          />

          {/* Bottom row: copyright */}
          <div
            style={{
              display:        "flex",
              flexWrap:       "wrap",
              justifyContent: "space-between",
              alignItems:     "center",
              gap:            "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-space)",
                fontSize:   "0.68rem",
                color:      "rgba(209,213,219,0.25)",
                letterSpacing: "0.06em",
              }}
            >
              © {new Date().getFullYear()} Nexlify Tech. All rights reserved.
            </span>
            <span
              style={{
                fontFamily:    "var(--font-mono)",
                fontSize:      "0.62rem",
                color:         "rgba(0,245,255,0.25)",
                letterSpacing: "0.12em",
              }}
            >
              Built with purpose.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
