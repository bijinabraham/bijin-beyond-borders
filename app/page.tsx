import Hero from "@/components/Hero";
import PlacesGrid from "@/components/PlacesGrid";
import Adrenaline from "@/components/Adrenaline";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <PlacesGrid />
        <Adrenaline />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
}
