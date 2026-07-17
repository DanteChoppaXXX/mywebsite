import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ProjectCard";
import { projects } from "../../data/projects";

export default function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Work"
            description="A selection of systems, tools, and infrastructure I've built to understand how things actually work underneath their abstractions."
          />
          <Link
            to="/projects"
            className="flex shrink-0 items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
          >
            View all projects
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
