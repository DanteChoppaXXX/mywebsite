import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import FeaturedProjects from "../components/sections/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProjects />
      {/* Skills preview, etc. — added in later steps */}
    </>
  );
}
