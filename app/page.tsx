"use client";

import { useState, useEffect } from "react";
import Hero         from "@/components/Hero";
import About        from "@/components/About";
import Manifesto    from "@/components/Manifesto";
import Process      from "@/components/Process";
import Work         from "@/components/Work";
import Services     from "@/components/Services";
import Team         from "@/components/Team";
import Contact      from "@/components/Contact";
import StatsCounter from "@/components/StatsCounter";
import Marquee      from "@/components/Marquee";
import Preloader    from "@/components/Preloader";
import Testimonials from "@/components/Testimonials";
import WhyNexlify   from "@/components/WhyNexlify";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(false);
  const [ready,         setReady]         = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("nx_seen");
    if (!seen) {
      setShowPreloader(true);
    } else {
      setReady(true);
    }
  }, []);

  const handlePreloaderDone = () => {
    sessionStorage.setItem("nx_seen", "1");
    setShowPreloader(false);
    setReady(true);
  };

  return (
    <main>
      {showPreloader && <Preloader onDone={handlePreloaderDone} />}

      <div style={{
        opacity:    ready ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}>
        <Hero />
        <StatsCounter />
        <Marquee />
        <About />
        <Manifesto />
        <Process />
        <Work />
        <WhyNexlify />
        <Marquee />
        <Services />
        <Testimonials />
        <Team />
        <Contact />
      </div>
    </main>
  );
}
