import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getAllProjects } from "@/lib/projects";
import { publicFileExists } from "@/lib/imageMeta";

export default function Home() {
  const projects = getAllProjects();
  const resumeAvailable = publicFileExists("/resume.pdf");

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <FeaturedWork projects={projects} />
        <Contact resumeAvailable={resumeAvailable} />
      </main>
      <Footer />
    </>
  );
}
