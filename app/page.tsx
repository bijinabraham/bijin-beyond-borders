import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PlacesGrid from "@/components/PlacesGrid";
import Adrenaline from "@/components/Adrenaline";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";

const countries = [
  "Japan", "India", "Hong Kong", "United States", "Canada", "Mexico",
  "UK", "Ireland", "Spain", "Italy", "Vatican City", "Switzerland",
  "Netherlands", "Germany", "Brazil", "UAE", "Hawaii",
];

const activities = [
  "MMA", "Skiing", "Surfing", "Snorkelling", "Skydiving", "Scuba",
];

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Marquee items={countries} direction="left"  variant="primary" />
        <Marquee items={activities} direction="right" variant="accent"  />
        <PlacesGrid />
        <Adrenaline />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
}
