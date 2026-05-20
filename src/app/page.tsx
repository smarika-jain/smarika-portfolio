import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Testimonials } from "@/components/Testimonials";
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
        <Testimonials />
        <Contact resumeAvailable={resumeAvailable} />
      </main>
      <Footer />
    </>
  );
}
