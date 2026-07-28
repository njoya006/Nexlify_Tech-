"use client";

import {
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- Constants ---
const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";

// Cinematic humanoid robot on black background — Unsplash / Gabriele Malaspina (free licence)
const ROBOT_IMG =
  "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?w=1000&q=88&auto=format&fit=crop";

// --- Glass Magnetic Button ---
interface GlassBtnProps {
  label:    string;
  onClick?: () => void;
  variant?: "cyan" | "violet";
}

function GlassButton({ label, onClick, variant = "cyan" }: GlassBtnProps) {
  const RADIUS = 90;
  const ref    = useRef<HTMLButtonElement>(null!);
  const bc     = variant === "cyan" ? "rgba(0,245,255,0.5)"  : "rgba(123,47,255,0.5)";
  const bh     = variant === "cyan" ? "rgba(0,245,255,0.9)"  : "rgba(123,47,255,0.9)";
  const col    = variant === "cyan" ? CYAN                    : VIOLET;
  const bg     = variant === "cyan" ? "rgba(0,245,255,0.05)" : "rgba(123,47,255,0.05)";
  const sh     = variant === "cyan"
    ? "0 0 22px rgba(0,245,255,0.28), 0 0 55px rgba(0,245,255,0.10)"
    : "0 0 22px rgba(123,47,255,0.28), 0 0 55px rgba(123,47,255,0.10)";

  const onMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r  = ref.current.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (d < RADIUS) {
      gsap.to(ref.current, { x: dx * (1 - d / RADIUS) * 0.4, y: dy * (1 - d / RADIUS) * 0.4, duration: 0.30, ease: "power2.out" });
    }
  }, []);

  const onEnter = useCallback(() => {
    gsap.to(ref.current, { borderColor: bh, boxShadow: sh, duration: 0.22 });
  }, [bh, sh]);

  const onLeave = useCallback(() => {
    gsap.to(ref.current, { x: 0, y: 0, borderColor: bc, boxShadow: "none", duration: 0.5, ease: "elastic.out(1,0.4)" });
  }, [bc]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "14px 32px", borderRadius: "9999px",
        border: `1px solid ${bc}`,
        background: bg,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        color: col, fontFamily: "var(--font-space)", fontWeight: 700,
        fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase",
        cursor: "none", willChange: "transform", whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// --- Active section tracker ---
const NAV_LINKS = [
  { label: "Home",     href: "#",         id: ""          },
  { label: "About",    href: "#about",    id: "about"     },
  { label: "Works",    href: "#work",     id: "work"      },
  { label: "Services", href: "#services", id: "services"  },
  { label: "Contact",  href: "#contact",  id: "contact"   },
];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const ids = ["about", "manifesto", "process", "work", "services", "team", "contact"];
    const onScroll = () => {
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = id;
      }
      // Map sub-sections to nav ids
      if (current === "manifesto" || current === "process") current = "about";
      if (current === "team") current = "work";
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

// --- Navbar ---
function Navbar({ soundActive, onToggleSound }: { soundActive: boolean; onToggleSound: () => void }) {
  const active = useActiveSection();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-5">
      <div className="flex items-center gap-2.5">
        <span className="text-white select-none" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", letterSpacing: "0.06em" }}>
          NEXLIFY TECH
        </span>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: CYAN, boxShadow: `0 0 8px ${CYAN}, 0 0 22px rgba(0,245,255,0.45)` }} />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map(({ label, href, id }) => {
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.72rem",
                letterSpacing: "0.12em",
                fontVariant:   "small-caps",
                color:         isActive ? CYAN : "rgba(209,213,219,0.45)",
                textDecoration:"none",
                paddingBottom: "3px",
                borderBottom:  isActive
                  ? "1px solid rgba(0,245,255,0.55)"
                  : "1px solid transparent",
                textShadow:    isActive ? "0 0 12px rgba(0,245,255,0.55)" : "none",
                transition:    "color 0.3s, text-shadow 0.3s, border-color 0.3s",
                cursor:        "none",
              }}
            >
              {label}
            </a>
          );
        })}
      </nav>

      <div className="flex items-center gap-6">
        <span className="text-[#D1D5DB]/35 hover:text-[#D1D5DB]/65 transition-colors" style={{ fontFamily: "var(--font-space)", fontSize: "0.68rem", letterSpacing: "0.14em", cursor: "none" }}>
          EN
        </span>
        <button onClick={onToggleSound} className="flex items-center gap-1.5 text-[#D1D5DB]/35 hover:text-[#00F5FF]/65 transition-colors duration-300" style={{ cursor: "none" }} aria-label={soundActive ? "Mute" : "Unmute"}>
          {soundActive ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}

// --- Social Sidebar ---
function SocialSidebar() {
  const links = ["Ig", "Li", "Yt", "X"];
  return (
    <div className="fixed right-7 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-5">
      {links.map((s) => (
        <a key={s} href="#"
          className="text-[#D1D5DB]/28 hover:text-[#00F5FF]/65 transition-colors duration-300"
          style={{ fontFamily: "var(--font-space)", fontSize: "0.62rem", letterSpacing: "0.15em", writingMode: "vertical-rl", textTransform: "uppercase", cursor: "none" }}
        >
          {s}
        </a>
      ))}
      <div className="w-px h-14 mt-2" style={{ background: "linear-gradient(to bottom, rgba(209,213,219,0.12), transparent)" }} />
    </div>
  );
}

// --- SoundManager ---
class SoundManager {
  private clickSfx: any = null;
  muted = true;
  private loaded = false;

  async toggle(): Promise<boolean> {
    if (!this.loaded) {
      try {
        const { Howl } = (await import("howler")) as any;
        this.clickSfx = new Howl({ src: ["/sounds/click.mp3"], volume: 0.45 });
        this.loaded = true;
      } catch { /* silent */ }
    }
    this.muted = !this.muted;
    return !this.muted;
  }

  playClick() {
    if (!this.muted && this.clickSfx) this.clickSfx.play();
  }
}

// --- Cursor ---
function useCursor() {
  useEffect(() => {
    const cursor = document.getElementById("nexlify-cursor");
    if (!cursor) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top  = `${e.clientY}px`;
      });
    };
    // Event delegation — covers all current and future a/button elements
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) cursor.classList.add("hovering");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) cursor.classList.remove("hovering");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover",  onOver, { passive: true });
    document.addEventListener("mouseout",   onOut,  { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover",  onOver);
      document.removeEventListener("mouseout",   onOut);
      cancelAnimationFrame(raf);
    };
  }, []);
}

// --- Hero ---
export default function Hero() {
  useCursor();
  const imgRef  = useRef<HTMLDivElement>(null);
  const soundMgr = useRef(new SoundManager());
  const [soundActive, setSoundActive] = useState(false);
  const [visible, setVisible]         = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      // Subtle parallax on the robot photo — moves opposite to cursor for depth
      if (imgRef.current) {
        const nx = (e.clientX / window.innerWidth  - 0.5);
        const ny = (e.clientY / window.innerHeight - 0.5);
        gsap.to(imgRef.current, {
          x: nx * -22,
          y: ny * -14,
          duration: 1.6,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleToggleSound = useCallback(async () => {
    const active = await soundMgr.current.toggle();
    setSoundActive(active);
  }, []);

  const handleExplore = useCallback(() => {
    soundMgr.current.playClick();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleViewWork = useCallback(() => {
    soundMgr.current.playClick();
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ position: "relative", zIndex: 10, background: "#050508" }}>
      <Navbar soundActive={soundActive} onToggleSound={handleToggleSound} />
      <SocialSidebar />

      <section className="relative w-full h-screen overflow-hidden bg-[#050508]">

        {/* Bottom fade — dissolves into the section below */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
          style={{
            height: "120px",
            background: "linear-gradient(to bottom, transparent, #050508)",
          }}
          aria-hidden="true"
        />

        {/* Radial glow behind text — very subtle, no blue wash */}
        <div
          className="absolute top-0 left-0 w-[60%] h-full pointer-events-none z-0"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(0,245,255,0.04) 0%, transparent 60%)" }}
        />

        {/* Two-column layout */}
        <div className="relative z-10 flex h-full">

          {/* ══ LEFT 55% ══ */}
          <div className="flex items-center w-[55%] pr-8 pt-20" style={{ paddingLeft: "clamp(2rem, 5vw, 6rem)", overflow: "visible" }}>
            <div className="flex flex-col gap-6 max-w-xl">

              {/* Cyan label */}
              <motion.div className="flex items-center" initial={{ opacity: 0, x: -24 }} animate={{ opacity: visible ? 1 : 0, x: 0 }} transition={{ delay: 0.10, duration: 0.55 }}>
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-space)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "#00F5FF",
                    borderLeft: "3px solid #00F5FF",
                    paddingLeft: "12px",
                    letterSpacing: "0.25em",
                    textShadow: "0 0 12px rgba(0,245,255,0.6)",
                  }}
                >
                  Here and now
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-white leading-[0.92] tracking-widest select-none"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.92 }}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: visible ? 1 : 0, y: 0 }}
                transition={{ delay: 0.20, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                NEXLIFY<br />TECH
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-[#D1D5DB]/70"
                style={{ fontFamily: "var(--font-space)", fontSize: "clamp(0.95rem,1.5vw,1.15rem)", fontWeight: 400 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: visible ? 1 : 0, y: 0 }}
                transition={{ delay: 0.35, duration: 0.70 }}
              >
                We build the future. You lead it.
              </motion.p>

              {/* Body */}
              <motion.p
                className="text-[#D1D5DB]/42 max-w-sm"
                style={{ fontFamily: "var(--font-inter)", fontSize: "clamp(0.82rem,1.05vw,0.92rem)", fontWeight: 300, lineHeight: 1.80 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: visible ? 1 : 0, y: 0 }}
                transition={{ delay: 0.46, duration: 0.70 }}
              >
                We work with a select few ambitious leaders to build what the world hasn&apos;t seen yet.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="h-px rounded-full"
                style={{ background: "linear-gradient(90deg, rgba(0,245,255,0.40) 0%, transparent 100%)", maxWidth: "180px" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: visible ? 1 : 0 }}
                transition={{ delay: 0.52, duration: 0.85 }}
              />

              {/* CTA */}
              <motion.div
                className="flex flex-wrap items-center gap-4 pt-1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: visible ? 1 : 0, y: 0 }}
                transition={{ delay: 0.62, duration: 0.70 }}
              >
                <GlassButton label="Explore"       onClick={handleExplore}  variant="cyan"   />
                <GlassButton label="View Our Work" onClick={handleViewWork} variant="violet" />
              </motion.div>
            </div>
          </div>

          {/* ══ RIGHT 45% ══ */}
          <div className="relative w-[45%] h-full overflow-hidden">

            {/* Robot photo — parallax container is oversized so parallax shift never shows blank */}
            <motion.div
              ref={imgRef}
              className="absolute inset-[-6%]"
              style={{ willChange: "transform" }}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: visible ? 1 : 0, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={ROBOT_IMG}
                alt="Humanoid AI figure"
                className="w-full h-full object-cover object-[center_18%]"
                style={{
                  filter: "brightness(0.52) contrast(1.18) saturate(0.20) grayscale(0.45)",
                  userSelect: "none",
                  pointerEvents: "none",
                  draggable: "false",
                } as React.CSSProperties}
              />

              {/* Cyan rim — left edge, very subtle */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(96deg, rgba(0,245,255,0.055) 0%, transparent 35%)",
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                }}
              />
              {/* Violet rim — right edge, very subtle */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(264deg, rgba(123,47,255,0.06) 0%, transparent 38%)",
                  mixBlendMode: "screen",
                  pointerEvents: "none",
                }}
              />
              {/* Top vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, #050508 0%, transparent 22%)",
                  pointerEvents: "none",
                }}
              />
            </motion.div>

            {/* Edge seamless blends — on top of parallax layer */}
            <div
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: [
                  "linear-gradient(to right,  #050508 0%, transparent 20%)",
                  "linear-gradient(to left,   #050508 0%, transparent 10%)",
                  "linear-gradient(to bottom, #050508 0%, transparent 18%)",
                  "linear-gradient(to top,    #050508 0%, transparent 32%)",
                ].join(", "),
              }}
            />

            {/* Floating label: AI */}
            <motion.div className="absolute top-[13%] right-[10%] z-20 pointer-events-none" initial={{ opacity: 0, y: -8 }} animate={{ opacity: visible ? 0.65 : 0, y: 0 }} transition={{ delay: 1.1, duration: 0.9 }}>
              <span className="block tracking-[0.24em] uppercase border px-3 py-1.5" style={{ fontFamily: "var(--font-space)", fontSize: "0.56rem", fontWeight: 700, color: "rgba(0,245,255,0.78)", borderColor: "rgba(0,245,255,0.20)" }}>
                Artificial Intelligence
              </span>
            </motion.div>

            {/* Floating label: Innovation */}
            <motion.div className="absolute bottom-[22%] left-[8%] z-20 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.45 : 0 }} transition={{ delay: 1.3, duration: 0.9 }}>
              <span className="block tracking-[0.20em] uppercase text-[#D1D5DB]/50" style={{ fontFamily: "var(--font-space)", fontSize: "0.53rem" }}>
                Innovation
              </span>
            </motion.div>

            {/* Floating label: Technology */}
            <motion.div className="absolute bottom-[15%] left-[30%] z-20 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: visible ? 0.45 : 0 }} transition={{ delay: 1.55, duration: 0.9 }}>
              <span className="block tracking-[0.20em] uppercase text-[#D1D5DB]/50" style={{ fontFamily: "var(--font-space)", fontSize: "0.53rem" }}>
                Technology
              </span>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-[27%] z-20 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 0.38 : 0 }}
          transition={{ delay: 1.8, duration: 1.0 }}
        >
          <div className="w-px h-11 animate-pulse" style={{ background: "linear-gradient(to bottom, rgba(0,245,255,0.55), transparent)" }} />
          <span className="uppercase text-[#D1D5DB]/70" style={{ fontFamily: "var(--font-space)", fontSize: "0.55rem", letterSpacing: "0.22em" }}>
            Scroll
          </span>
        </motion.div>
      </section>
    </div>
  );
}
