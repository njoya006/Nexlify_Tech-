"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProjectData } from "@/lib/projects";

/* ── Custom cursor (duplicated from Hero so the detail page works standalone) ── */
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

/* ── Shared section label ── */
function SectionLabel({
  accent, accentRgb, children,
}: { accent: string; accentRgb: string; children: React.ReactNode }) {
  return (
    <span style={{
      display:       "block",
      fontFamily:    "var(--font-display)",
      fontSize:      "0.68rem",
      letterSpacing: "0.28em",
      color:         accent,
      textTransform: "uppercase",
      textShadow:    `0 0 10px rgba(${accentRgb},0.5)`,
      marginBottom:  "1.5rem",
      borderLeft:    `3px solid ${accent}`,
      paddingLeft:   "10px",
    }}>
      {children}
    </span>
  );
}

/* ── Abstract app mockup (pure CSS — no real screenshots needed) ── */
function AppMockup({ p }: { p: ProjectData }) {
  return (
    <div style={{
      background:   "rgba(6,6,18,0.92)",
      border:       "1px solid rgba(255,255,255,0.07)",
      borderRadius: "14px",
      overflow:     "hidden",
    }}>
      {/* Title bar */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          "0.5rem",
        padding:      "0.65rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background:   "rgba(5,5,8,0.7)",
      }}>
        {(["#FF5F56","#FFBD2E","#27C93F"] as const).map((c) => (
          <span key={c} style={{ width:10, height:10, borderRadius:"50%", background:c, opacity:0.6, flexShrink:0, display:"inline-block" }} />
        ))}
        <div style={{
          flex:1, height:20, maxWidth:320,
          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.05)",
          borderRadius:5, margin:"0 0.5rem",
          display:"flex", alignItems:"center", paddingLeft:"0.5rem",
        }}>
          <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.50rem", color:"rgba(255,255,255,0.18)", letterSpacing:"0.04em" }}>
            nexlifytech.site/work/{p.slug}
          </span>
        </div>
        <div style={{ display:"flex", gap:"0.35rem", marginLeft:"auto" }}>
          {[60,44,44].map((w,i) => (
            <div key={i} style={{ width:w, height:20, background:`rgba(${p.accentRgb},${i===0?0.14:0.05})`, border:`1px solid rgba(${p.accentRgb},${i===0?0.22:0.08})`, borderRadius:5 }} />
          ))}
        </div>
      </div>

      {/* App layout */}
      <div style={{ display:"flex", height:"clamp(240px,30vw,360px)" }}>

        {/* Sidebar */}
        <div style={{
          width:"clamp(130px,14vw,190px)", flexShrink:0,
          borderRight:"1px solid rgba(255,255,255,0.04)",
          background:"rgba(5,5,8,0.4)",
          padding:"0.875rem 0.75rem",
          display:"flex", flexDirection:"column", gap:"0.35rem",
        }}>
          <div style={{ height:32, background:`rgba(${p.accentRgb},0.12)`, border:`1px solid rgba(${p.accentRgb},0.20)`, borderRadius:7, marginBottom:"0.6rem" }} />
          {[1.0,0.82,0.95,0.70,0.88,0.60,0.75,0.50].map((w,i) => (
            <div key={i} style={{
              height:16,
              background: i===0 ? `rgba(${p.accentRgb},0.16)` : "rgba(255,255,255,0.035)",
              border:     i===0 ? `1px solid rgba(${p.accentRgb},0.24)` : "1px solid rgba(255,255,255,0.04)",
              borderRadius:5, width:`${w*100}%`,
            }} />
          ))}
        </div>

        {/* Main panel */}
        <div style={{ flex:1, padding:"0.875rem", display:"flex", flexDirection:"column", gap:"0.65rem", minWidth:0, overflow:"hidden" }}>

          {/* Top action bar */}
          <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
            <div style={{ flex:1, height:26, background:"rgba(255,255,255,0.04)", borderRadius:6 }} />
            <div style={{ width:72, height:26, background:`rgba(${p.accentRgb},0.14)`, border:`1px solid rgba(${p.accentRgb},0.24)`, borderRadius:6 }} />
            <div style={{ width:26, height:26, background:"rgba(255,255,255,0.04)", borderRadius:6 }} />
          </div>

          {/* Stat cards row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem" }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{
                height:"clamp(52px,7vw,68px)",
                background: i===0 ? `rgba(${p.accentRgb},0.10)` : "rgba(255,255,255,0.025)",
                border:     i===0 ? `1px solid rgba(${p.accentRgb},0.20)` : "1px solid rgba(255,255,255,0.04)",
                borderRadius:8, padding:"0.5rem 0.625rem",
                display:"flex", flexDirection:"column", justifyContent:"space-between",
              }}>
                <div style={{ width:"55%", height:8, background: i===0?`rgba(${p.accentRgb},0.40)`:"rgba(255,255,255,0.09)", borderRadius:3 }} />
                <div style={{ width:"35%", height:6, background:"rgba(255,255,255,0.05)", borderRadius:3 }} />
              </div>
            ))}
          </div>

          {/* Data table */}
          <div style={{
            flex:1, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.04)",
            borderRadius:8, padding:"0.625rem", display:"flex", flexDirection:"column", gap:"0.28rem", overflow:"hidden",
          }}>
            <div style={{ display:"flex", gap:"0.5rem", paddingBottom:"0.35rem", borderBottom:"1px solid rgba(255,255,255,0.05)", marginBottom:"0.2rem" }}>
              {[0.24,0.34,0.24,0.14].map((w,i) => (
                <div key={i} style={{ height:7, background:`rgba(${p.accentRgb},0.22)`, borderRadius:3, flex:`0 0 ${w*100}%` }} />
              ))}
            </div>
            {[0,1,2,3,4,5].map((row) => (
              <div key={row} style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                {[0.24,0.34,0.24,0.14].map((w,i) => (
                  <div key={i} style={{ height:6, background:"rgba(255,255,255,0.05)", borderRadius:3, flex:`0 0 ${w*100}%`, opacity:1-row*0.10 }} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right detail panel */}
        <div style={{
          width:"clamp(100px,14vw,190px)", flexShrink:0,
          borderLeft:"1px solid rgba(255,255,255,0.04)",
          background:"rgba(5,5,8,0.3)",
          padding:"0.875rem 0.75rem",
          display:"flex", flexDirection:"column", gap:"0.5rem",
        }}>
          {/* Mini bar chart */}
          <div style={{
            height:"clamp(80px,12vw,130px)",
            background:`rgba(${p.accentRgb},0.05)`, border:`1px solid rgba(${p.accentRgb},0.12)`,
            borderRadius:8, padding:"0.5rem",
            display:"flex", alignItems:"flex-end", gap:"3px",
          }}>
            {[0.45,0.68,0.52,0.88,0.62,0.78,0.55].map((h,i) => (
              <div key={i} style={{
                flex:1, borderRadius:"2px 2px 0 0",
                background:`rgba(${p.accentRgb},${0.18 + h*0.40})`,
                height:`${h*100}%`,
              }} />
            ))}
          </div>
          {[0.85,0.65,0.90,0.50,0.70].map((w,i) => (
            <div key={i} style={{ height:15, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.04)", borderRadius:4, width:`${w*100}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function ProjectDetail({ project: p }: { project: ProjectData }) {
  useCursor();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight:"100vh", background:"#050508", color:"#D1D5DB" }}>

      {/* ═══════════════════════════════════════════ NAV ══ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"1.25rem clamp(1.5rem,5vw,2.5rem)",
        backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        background:"rgba(5,5,8,0.72)",
      }}>
        <Link href="/" style={{ textDecoration:"none" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:"1.15rem", letterSpacing:"0.06em", color:"white" }}>
              NEXLIFY TECH
            </span>
            <span style={{
              width:8, height:8, borderRadius:"50%", display:"inline-block",
              background:"#00F5FF", boxShadow:"0 0 8px #00F5FF, 0 0 22px rgba(0,245,255,0.45)", flexShrink:0,
            }} />
          </div>
        </Link>

        <Link href="/#work" style={{
          display:"inline-flex", alignItems:"center", gap:"0.45rem",
          fontFamily:"var(--font-space)", fontSize:"0.72rem", fontWeight:700,
          letterSpacing:"0.14em", textTransform:"uppercase",
          color:"#D1D5DB", textDecoration:"none", transition:"color 0.25s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = p.accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#D1D5DB"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All Projects
        </Link>
      </header>

      {/* ═══════════════════════════════════════════ HERO ══ */}
      <div style={{
        position:"relative", overflow:"hidden",
        height:"clamp(420px,52vh,600px)",
        background:p.gradient, paddingTop:"80px",
      }}>
        {/* Grid */}
        <div aria-hidden="true" style={{
          position:"absolute", inset:0,
          backgroundImage:`
            linear-gradient(rgba(${p.accentRgb},0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${p.accentRgb},0.10) 1px, transparent 1px)
          `,
          backgroundSize:"48px 48px",
        }} />
        {/* Number watermark */}
        <span aria-hidden="true" style={{
          position:"absolute", bottom:"-0.15em", right:"2rem",
          fontFamily:"var(--font-display)", fontSize:"clamp(8rem,15vw,16rem)",
          color:`rgba(${p.accentRgb},0.07)`, lineHeight:1,
          userSelect:"none", letterSpacing:"-0.02em",
        }}>
          {p.num}
        </span>
        {/* Radial glow */}
        <div aria-hidden="true" style={{
          position:"absolute", inset:0,
          background:`radial-gradient(ellipse 60% 80% at 20% 50%, rgba(${p.accentRgb},0.09) 0%, transparent 70%)`,
          pointerEvents:"none",
        }} />

        {/* Hero text — pinned to bottom */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0,
          padding:"0 clamp(1.5rem,5vw,4rem) 2.75rem",
          maxWidth:"1100px", margin:"0 auto", width:"100%",
        }}>
          {/* Badges */}
          <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1rem", flexWrap:"wrap" }}>
            <span style={{
              fontFamily:"var(--font-display)", fontSize:"0.62rem", fontWeight:700,
              color:p.accent, letterSpacing:"0.20em", textTransform:"uppercase",
              background:`rgba(${p.accentRgb},0.12)`, border:`1px solid rgba(${p.accentRgb},0.35)`,
              borderRadius:"9999px", padding:"4px 14px",
            }}>
              {p.cat}
            </span>
            <span style={{
              fontFamily:"var(--font-mono)", fontSize:"0.60rem",
              color:"rgba(209,213,219,0.55)", letterSpacing:"0.14em", textTransform:"uppercase",
              background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.10)",
              borderRadius:"9999px", padding:"4px 14px",
            }}>
              {p.stat}
            </span>
          </div>

          <h1 style={{
            fontFamily:"var(--font-display)", fontSize:"clamp(2.8rem,6vw,6.5rem)",
            color:"white", margin:"0 0 1rem", lineHeight:1, letterSpacing:"0.03em",
            opacity:visible?1:0, transform:visible?"none":"translateY(30px)",
            transition:"opacity 0.7s ease, transform 0.7s ease",
          }}>
            {p.title}
          </h1>

          <p style={{
            fontFamily:"var(--font-space)", fontSize:"clamp(0.9rem,1.2vw,1.08rem)",
            color:"rgba(255,255,255,0.55)", lineHeight:1.65, margin:0, maxWidth:"640px",
            opacity:visible?1:0, transform:visible?"none":"translateY(20px)",
            transition:"opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
          }}>
            {p.desc}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════ HIGHLIGHTS BAR ══ */}
      <div style={{
        background:"rgba(5,5,8,0.96)",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        borderTop:"1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          maxWidth:"1100px", margin:"0 auto",
          padding:"0 clamp(1.5rem,5vw,4rem)",
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(180px,1fr))",
        }}>
          {p.highlights.map((h, i) => (
            <div key={i} style={{
              padding:"1.75rem 0",
              borderRight: i < p.highlights.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              paddingLeft:  i > 0 ? "clamp(1rem,3vw,2rem)" : 0,
              paddingRight: i < p.highlights.length-1 ? "clamp(1rem,3vw,2rem)" : 0,
            }}>
              <div style={{
                fontFamily:"var(--font-display)", fontSize:"clamp(1.05rem,1.8vw,1.55rem)",
                color:p.accent, letterSpacing:"0.04em", lineHeight:1,
                textShadow:`0 0 18px rgba(${p.accentRgb},0.45)`,
                marginBottom:"0.5rem",
              }}>
                {h.value}
              </div>
              <div style={{
                fontFamily:"var(--font-space)", fontSize:"0.73rem",
                color:"rgba(209,213,219,0.45)", lineHeight:1.45,
              }}>
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════ MAIN CONTENT ══ */}
      <div style={{
        maxWidth:"1100px", margin:"0 auto",
        padding:"clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,4rem) clamp(4rem,8vw,7rem)",
      }}>

        {/* ── App Mockup ── */}
        <div style={{ marginBottom:"clamp(3.5rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Platform Preview</SectionLabel>
          <AppMockup p={p} />
        </div>

        {/* ── Overview ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Overview</SectionLabel>
          <p style={{
            fontFamily:"var(--font-space)", fontSize:"clamp(0.94rem,1.15vw,1.08rem)",
            color:"#D1D5DB", lineHeight:1.90, margin:0, maxWidth:"820px",
          }}>
            {p.overview}
          </p>
        </div>

        {/* ── Challenge + Solution ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Challenge & Solution</SectionLabel>
          <div className="grid md:grid-cols-2 gap-5">

            {/* Challenge card */}
            <div style={{
              position:"relative", overflow:"hidden",
              background:"rgba(13,13,31,0.70)",
              backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
              border:`1px solid rgba(${p.accentRgb},0.10)`,
              borderRadius:"16px", padding:"2.25rem",
            }}>
              <span aria-hidden="true" style={{
                position:"absolute", top:"-0.25em", right:"1rem",
                fontFamily:"var(--font-display)", fontSize:"7rem",
                color:`rgba(${p.accentRgb},0.05)`, lineHeight:1, userSelect:"none",
              }}>
                01
              </span>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"0.58rem",
                letterSpacing:"0.22em", textTransform:"uppercase",
                color:`rgba(${p.accentRgb},0.60)`, marginBottom:"0.8rem",
              }}>
                The Problem
              </div>
              <h3 style={{
                fontFamily:"var(--font-display)", fontSize:"clamp(1.15rem,1.9vw,1.55rem)",
                color:"white", margin:"0 0 1.1rem", letterSpacing:"0.04em", lineHeight:1.15,
              }}>
                What We Needed to Solve
              </h3>
              <p style={{
                fontFamily:"var(--font-space)", fontSize:"clamp(0.84rem,0.95vw,0.92rem)",
                color:"rgba(209,213,219,0.72)", lineHeight:1.85, margin:0,
              }}>
                {p.challenge}
              </p>
            </div>

            {/* Solution card */}
            <div style={{
              position:"relative", overflow:"hidden",
              background:`rgba(${p.accentRgb},0.04)`,
              backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
              border:`1px solid rgba(${p.accentRgb},0.18)`,
              borderRadius:"16px", padding:"2.25rem",
            }}>
              <span aria-hidden="true" style={{
                position:"absolute", top:"-0.25em", right:"1rem",
                fontFamily:"var(--font-display)", fontSize:"7rem",
                color:`rgba(${p.accentRgb},0.08)`, lineHeight:1, userSelect:"none",
              }}>
                02
              </span>
              <div style={{
                fontFamily:"var(--font-mono)", fontSize:"0.58rem",
                letterSpacing:"0.22em", textTransform:"uppercase",
                color:`rgba(${p.accentRgb},0.60)`, marginBottom:"0.8rem",
              }}>
                Our Approach
              </div>
              <h3 style={{
                fontFamily:"var(--font-display)", fontSize:"clamp(1.15rem,1.9vw,1.55rem)",
                color:"white", margin:"0 0 1.1rem", letterSpacing:"0.04em", lineHeight:1.15,
              }}>
                How We Built It
              </h3>
              <p style={{
                fontFamily:"var(--font-space)", fontSize:"clamp(0.84rem,0.95vw,0.92rem)",
                color:"rgba(209,213,219,0.80)", lineHeight:1.85, margin:0,
              }}>
                {p.solution}
              </p>
            </div>
          </div>
        </div>

        {/* ── Key Features ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Key Features</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {p.features.map((feat, i) => (
              <div key={i} style={{
                display:"flex", alignItems:"flex-start", gap:"0.9rem",
                background:"rgba(13,13,31,0.55)",
                border:`1px solid rgba(${p.accentRgb},0.08)`,
                borderRadius:"12px", padding:"1.25rem 1.35rem",
                transition:"border-color 0.25s, background 0.25s",
              }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${p.accentRgb},0.28)`;
                  el.style.background  = `rgba(${p.accentRgb},0.04)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${p.accentRgb},0.08)`;
                  el.style.background  = "rgba(13,13,31,0.55)";
                }}
              >
                <span style={{
                  width:8, height:8, borderRadius:"50%",
                  background:p.accent, flexShrink:0, marginTop:"0.35rem",
                  boxShadow:`0 0 9px rgba(${p.accentRgb},0.7)`,
                }} />
                <span style={{
                  fontFamily:"var(--font-space)", fontSize:"0.87rem",
                  color:"rgba(209,213,219,0.85)", lineHeight:1.55,
                }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Technology Stack ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Technology Stack</SectionLabel>
          <div style={{
            background:"rgba(13,13,31,0.55)", border:`1px solid rgba(${p.accentRgb},0.08)`,
            borderRadius:"14px", padding:"1.75rem 2rem",
          }}>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"0.65rem" }}>
              {p.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily:"var(--font-mono)", fontSize:"0.76rem",
                  color:p.accent,
                  background:`rgba(${p.accentRgb},0.08)`,
                  border:`1px solid rgba(${p.accentRgb},0.28)`,
                  borderRadius:"6px", padding:"7px 18px", letterSpacing:"0.06em",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── At a Glance ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>At a Glance</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { label:"Status",        value: p.status },
              { label:"Category",      value: p.cat    },
              { label:"Stack Size",    value: `${p.tags.length} technologies` },
              { label:"Primary Role",  value: p.role.split(",")[0].trim() },
            ] as const).map(({ label, value }) => (
              <div key={label} style={{
                background:"rgba(13,13,31,0.75)",
                backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
                border:`1px solid rgba(${p.accentRgb},0.10)`,
                borderRadius:"12px", padding:"1.35rem 1.5rem",
              }}>
                <div style={{
                  fontFamily:"var(--font-mono)", fontSize:"0.58rem",
                  letterSpacing:"0.20em", textTransform:"uppercase",
                  color:`rgba(${p.accentRgb},0.65)`, marginBottom:"0.5rem",
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily:"var(--font-space)", fontSize:"0.87rem",
                  color:"rgba(255,255,255,0.85)", lineHeight:1.45,
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Our Role ── */}
        <div style={{ marginBottom:"clamp(3rem,5vw,5rem)" }}>
          <SectionLabel accent={p.accent} accentRgb={p.accentRgb}>Our Role</SectionLabel>
          <div style={{
            background:"rgba(13,13,31,0.75)",
            backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
            border:`1px solid rgba(${p.accentRgb},0.12)`,
            borderRadius:"14px", padding:"2rem 2.25rem",
          }}>
            <p style={{
              fontFamily:"var(--font-space)", fontSize:"clamp(0.94rem,1.15vw,1.08rem)",
              color:"rgba(209,213,219,0.90)", lineHeight:1.85, margin:0,
            }}>
              {p.role}
            </p>
          </div>
        </div>

        {/* ── Glow separator ── */}
        <div aria-hidden="true" style={{
          width:"min(700px,80%)", height:"1px", margin:"0 auto 3rem",
          background:`radial-gradient(ellipse at center, rgba(${p.accentRgb},0.50) 0%, transparent 70%)`,
          boxShadow:`0 0 18px 3px rgba(${p.accentRgb},0.08)`,
        }} />

        {/* ── CTA ── */}
        <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"1rem" }}>
          <a href="/#contact" style={{
            fontFamily:"var(--font-space)", fontSize:"0.78rem", fontWeight:700,
            color:p.accent, letterSpacing:"0.14em", textTransform:"uppercase",
            background:`rgba(${p.accentRgb},0.05)`, border:`1px solid rgba(${p.accentRgb},0.30)`,
            borderRadius:"9999px", padding:"14px 36px",
            backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
            display:"inline-flex", alignItems:"center", gap:"0.5rem",
            textDecoration:"none", transition:"background 0.25s, box-shadow 0.25s, border-color 0.25s",
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = `rgba(${p.accentRgb},0.12)`;
              el.style.borderColor = `rgba(${p.accentRgb},0.70)`;
              el.style.boxShadow   = `0 0 26px rgba(${p.accentRgb},0.22)`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background  = `rgba(${p.accentRgb},0.05)`;
              el.style.borderColor = `rgba(${p.accentRgb},0.30)`;
              el.style.boxShadow   = "none";
            }}
          >
            Start a Similar Project
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <Link href="/#work" style={{
            fontFamily:"var(--font-space)", fontSize:"0.78rem", fontWeight:700,
            color:"rgba(209,213,219,0.55)", letterSpacing:"0.14em", textTransform:"uppercase",
            background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.10)",
            borderRadius:"9999px", padding:"14px 36px",
            display:"inline-flex", alignItems:"center", gap:"0.5rem",
            textDecoration:"none", transition:"color 0.25s, border-color 0.25s",
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color       = "rgba(209,213,219,0.90)";
              el.style.borderColor = "rgba(255,255,255,0.22)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color       = "rgba(209,213,219,0.55)";
              el.style.borderColor = "rgba(255,255,255,0.10)";
            }}
          >
            View More Projects
          </Link>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ FOOTER ══ */}
      <div style={{
        borderTop:"1px solid rgba(255,255,255,0.04)",
        padding:"1.75rem clamp(1.5rem,5vw,4rem)",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:"1rem",
      }}>
        <span style={{
          fontFamily:"var(--font-mono)", fontSize:"0.60rem",
          letterSpacing:"0.12em", color:"rgba(209,213,219,0.22)", textTransform:"uppercase",
        }}>
          © 2025 Nexlify Tech
        </span>
        <Link href="/#work" style={{
          fontFamily:"var(--font-space)", fontSize:"0.65rem",
          letterSpacing:"0.14em", textTransform:"uppercase",
          color:`rgba(${p.accentRgb},0.45)`, textDecoration:"none", transition:"color 0.25s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = p.accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `rgba(${p.accentRgb},0.45)`; }}
        >
          ← Back to all projects
        </Link>
      </div>
    </div>
  );
}
