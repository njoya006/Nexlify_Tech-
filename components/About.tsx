"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────
const CYAN   = "#00F5FF";
const VIOLET = "#7B2FFF";

// ─── Particle Aura ────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  angle: number;       // starting angle in radians
  radius: number;      // orbit radius in px
  size: number;
  duration: number;    // orbit period in seconds
  delay: number;
}

function ParticleAura() {
  const particles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    angle: (i / 15) * Math.PI * 2,
    radius: 160 + (i % 3) * 28,
    size: 2 + (i % 3) * 1.2,
    duration: 14 + (i % 5) * 3,
    delay: -(i * 1.1),
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width:  p.size,
            height: p.size,
            background: CYAN,
            top:  "50%",
            left: "50%",
            boxShadow: `0 0 ${p.size * 3}px ${CYAN}`,
            opacity: 0.55,
          }}
          animate={{
            x: [
              Math.cos(p.angle)                    * p.radius,
              Math.cos(p.angle + Math.PI * 0.5)   * p.radius,
              Math.cos(p.angle + Math.PI)          * p.radius,
              Math.cos(p.angle + Math.PI * 1.5)   * p.radius,
              Math.cos(p.angle + Math.PI * 2)     * p.radius,
            ],
            y: [
              Math.sin(p.angle)                    * p.radius,
              Math.sin(p.angle + Math.PI * 0.5)   * p.radius,
              Math.sin(p.angle + Math.PI)          * p.radius,
              Math.sin(p.angle + Math.PI * 1.5)   * p.radius,
              Math.sin(p.angle + Math.PI * 2)     * p.radius,
            ],
          }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            repeat:   Infinity,
            ease:     "linear",
          }}
        />
      ))}
    </div>
  );
}

// ─── 3D Tilt Card ─────────────────────────────────────────────────────────────
function FounderCard({ inView }: { inView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 140, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 140, damping: 22 });

  const transform = useTransform(
    [sRotX, sRotY],
    ([rx, ry]: number[]) =>
      `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
  );

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    rotX.set(((e.clientY - cy) / (rect.height / 2)) * -8);
    rotY.set(((e.clientX - cx) / (rect.width  / 2)) *  8);
  }, [rotX, rotY]);

  const onMouseLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
  }, [rotX, rotY]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0, x: -60 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Particle aura — behind the card */}
      <ParticleAura />

      {/* The card */}
      <motion.div
        ref={cardRef}
        style={{ transform }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative"
        // Extra layer of cursor override for this element
      >
        <div
          style={{
            width:         "min(320px, 36vw)",
            aspectRatio:   "3 / 4",
            background:    "rgba(13,13,31,0.85)",
            backdropFilter:"blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border:        "1px solid rgba(0,245,255,0.15)",
            borderRadius:  "16px",
            boxShadow:     "0 0 40px rgba(0,245,255,0.06), 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
            overflow:      "hidden",
            position:      "relative",
          }}
        >
          {/* Pamela's photo */}
          <div className="absolute inset-0">
            <Image
              src="/assets/pamela.jpg"
              alt="Pamela — Chief Marketing Officer"
              fill
              sizes="(max-width: 768px) 90vw, 36vw"
              className="object-cover object-top"
              priority
            />
            {/* Subtle vignette overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 55%, rgba(5,5,8,0.72) 100%)",
              }}
            />
            {/* Cyan bottom edge glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`,
                opacity: 0.35,
              }}
            />
          </div>

          {/* Cyan gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(180deg, transparent 60%, rgba(0,245,255,0.08) 100%)",
              zIndex: 5,
            }}
          />

          {/* Floating badge — bottom left */}
          <div
            className="absolute bottom-5 left-5 z-10 flex items-center gap-2"
            style={{
              background:    "rgba(0,245,255,0.1)",
              border:        "1px solid rgba(0,245,255,0.3)",
              borderRadius:  "9999px",
              padding:       "6px 16px",
              backdropFilter:"blur(10px)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{
                background: CYAN,
                boxShadow:  `0 0 6px ${CYAN}`,
              }}
            />
            <span
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.62rem",
                fontWeight:    700,
                color:         CYAN,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Chief Marketing Officer
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Stat Counter ─────────────────────────────────────────────────────────────
function StatCounter({ inView }: { inView: boolean }) {
  const [count, setCount] = useState(0);
  const triggered = useRef(false);

  useEffect(() => {
    if (!inView || triggered.current) return;
    triggered.current = true;
    const duration  = 1800;
    const target    = 5;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased    = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <div className="flex items-end gap-3">
      <span
        style={{
          fontFamily:    "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize:      "clamp(3.5rem, 5vw, 5.5rem)",
          fontWeight:    700,
          color:         CYAN,
          lineHeight:    1,
          textShadow:    `0 0 28px rgba(0,245,255,0.45)`,
          letterSpacing: "-0.02em",
        }}
      >
        {count}+
      </span>
      <div className="pb-2 flex flex-col">
        <span
          style={{
            fontFamily:    "var(--font-space)",
            fontSize:      "0.65rem",
            fontWeight:    700,
            color:         "rgba(209,213,219,0.45)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Years of
        </span>
        <span
          style={{
            fontFamily:    "var(--font-space)",
            fontSize:      "0.65rem",
            fontWeight:    700,
            color:         "rgba(209,213,219,0.45)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Innovation
        </span>
      </div>
    </div>
  );
}

// ─── Para Separator ───────────────────────────────────────────────────────────
function ParaSep() {
  return (
    <div
      className="h-px w-full my-1"
      style={{
        background: "linear-gradient(90deg, #00F5FF, #7B2FFF, transparent)",
        opacity: 0.18,
      }}
    />
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.20 });

  // Text stagger variants
  const containerVariants = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      style={{ background: "transparent", position: "relative", zIndex: 1 }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)",
        }}
        aria-hidden="true"
      />

      {/* Violet radial glow — top right */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: 0, right: 0,
          width: "60%", height: "60%",
          background: "radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center gap-16 px-[8vw] py-28">

        {/* ══ LEFT — 45% ══ */}
        <div className="w-full lg:w-[45%] flex items-center justify-center lg:justify-start">
          <FounderCard inView={inView} />
        </div>

        {/* ══ RIGHT — 55% ══ */}
        <motion.div
          className="w-full lg:w-[55%] flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {/* Label */}
          <motion.div variants={itemVariants}>
            <span
              className="uppercase"
              style={{
                fontFamily:    "var(--font-display)",
                fontSize:      "0.75rem",
                color:         CYAN,
                borderLeft:    "3px solid #00F5FF",
                paddingLeft:   "12px",
                letterSpacing: "0.3em",
                textShadow:    "0 0 12px rgba(0,245,255,0.6)",
              }}
            >
              Who we are
            </span>
          </motion.div>

          {/* Heading — 3 lines, each staggered */}
          <div className="flex flex-col gap-0">
            {["BUILDING WHAT", "THE WORLD HASN'T", "SEEN YET."].map((line, i) => (
              <motion.h2
                key={i}
                variants={itemVariants}
                className="leading-[0.92] tracking-widest text-white select-none"
                style={{
                  fontFamily:    "var(--font-display)",
                  fontSize:      "clamp(2rem, 6vw, 5rem)",
                  letterSpacing: "0.03em",
                }}
              >
                {line}
              </motion.h2>
            ))}
          </div>

          {/* Stat */}
          <motion.div variants={itemVariants}>
            <StatCounter inView={inView} />
          </motion.div>

          {/* Paragraphs */}
          <motion.div variants={itemVariants} className="flex flex-col gap-0 max-w-lg">
            <p
              style={{
                fontFamily:  "var(--font-space)",
                fontSize:    "clamp(0.85rem, 1.05vw, 0.95rem)",
                color:       "#D1D5DB",
                lineHeight:  1.82,
                fontWeight:  400,
                paddingBottom: "1.1rem",
              }}
            >
              We started Nexlify Tech with one belief — that innovation isn&apos;t a buzzword,
              it&apos;s a discipline. Every project we touch is built to outlast trends and
              outperform expectations.
            </p>
            <ParaSep />
            <p
              style={{
                fontFamily:  "var(--font-space)",
                fontSize:    "clamp(0.85rem, 1.05vw, 0.95rem)",
                color:       "#D1D5DB",
                lineHeight:  1.82,
                fontWeight:  400,
                paddingTop:  "1.1rem",
                paddingBottom: "1.1rem",
              }}
            >
              Our team operates at the intersection of technology, design, and strategy. We
              don&apos;t just build products — we architect experiences that move people and
              move markets.
            </p>
            <ParaSep />
            <p
              style={{
                fontFamily: "var(--font-space)",
                fontSize:   "clamp(0.85rem, 1.05vw, 0.95rem)",
                color:      "#D1D5DB",
                lineHeight: 1.82,
                fontWeight: 400,
                paddingTop: "1.1rem",
              }}
            >
              From our first viral project to the clients we serve today, our signature
              framework has remained constant: think boldly, build precisely, deliver results.
            </p>
          </motion.div>

          {/* Pull-quote */}
          <motion.blockquote
            variants={itemVariants}
            style={{
              margin:        "0.25rem 0 0",
              padding:       "1rem 1.5rem",
              borderLeft:    "3px solid rgba(0,245,255,0.35)",
              background:    "rgba(0,245,255,0.03)",
              borderRadius:  "0 8px 8px 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize:   "clamp(1.05rem,1.4vw,1.3rem)",
                fontStyle:  "italic",
                fontWeight: 400,
                color:      "rgba(209,213,219,0.60)",
                lineHeight: 1.65,
                margin:     0,
              }}
            >
              &ldquo;We don&rsquo;t ship features. We ship futures.&rdquo;
            </p>
          </motion.blockquote>

          {/* CTA link */}
          <motion.div variants={itemVariants}>
            <a
              href="#team"
              className="group inline-flex items-center gap-2"
              style={{
                fontFamily:    "var(--font-space)",
                fontSize:      "0.82rem",
                fontWeight:    700,
                color:         CYAN,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration:"none",
                cursor:        "none",
              }}
            >
              <span
                className="relative"
                style={{
                  paddingBottom: "2px",
                  borderBottom:  "1px solid rgba(0,245,255,0.28)",
                  transition:    "border-color 0.25s, text-shadow 0.25s",
                }}
              >
                Meet the full team
              </span>
              <svg
                width="14" height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
