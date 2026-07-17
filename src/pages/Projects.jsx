import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="All Projects"
          description="Systems, tools, and infrastructure — each built to understand a specific mechanism from the ground up, not just to ship a demo."
        />

        {projects.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-text-secondary">
            Nothing published yet — check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}
