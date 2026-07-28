import Hero     from "@/components/Hero";
import About    from "@/components/About";
import Manifesto from "@/components/Manifesto";
import Process  from "@/components/Process";
import Work     from "@/components/Work";
import Services from "@/components/Services";
import Team     from "@/components/Team";
import Contact  from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Manifesto />
      <Process />
      <Work />
      <Services />
      <Team />
      <Contact />
    </main>
  );
}
