import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import Container from "../components/ui/Container";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ProjectThumbnail from "../components/ProjectThumbnail";
import DetailSection from "../components/DetailSection";
import ProjectNav from "../components/ProjectNav";
import ProjectCard from "../components/ProjectCard";
import {
  getProjectBySlug,
  getAdjacentProjects,
  getRelatedProjects,
} from "../utils/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Container className="py-24 text-center">
        <h1 className="text-2xl font-semibold text-text-primary">Project not found</h1>
        <p className="mt-2 text-text-secondary">
          It may have been renamed or removed.
        </p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-1.5 text-accent hover:text-accent-hover">
          <FiArrowLeft aria-hidden="true" />
          Back to all projects
        </Link>
      </Container>
    );
  }

  const { prev, next } = getAdjacentProjects(slug);
  const related = getRelatedProjects(slug);

  // Content sections rendered in a fixed, meaningful order. Any section
  // without content (schema allows empty arrays/strings) is skipped rather
  // than rendered blank.
  const sections = [
    { title: "Overview", type: "text", content: project.overview },
    { title: "Problem", type: "text", content: project.problem },
    { title: "Goals", type: "list", content: project.goals },
    { title: "Architecture", type: "text", content: project.architecture },
    { title: "Technical Decisions", type: "list", content: project.technicalDecisions },
    { title: "Challenges", type: "list", content: project.challenges },
    { title: "Lessons Learned", type: "list", content: project.lessonsLearned },
    { title: "Future Improvements", type: "list", content: project.futureImprovements },
  ].filter((section) =>
    Array.isArray(section.content) ? section.content.length > 0 : Boolean(section.content?.trim())
  );

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link to="/projects" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
          <FiArrowLeft aria-hidden="true" />
          Back to all projects
        </Link>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">{project.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-text-secondary">{project.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.github && (
              <Button href={project.github} variant="secondary" icon={FiGithub}>
                View Code
              </Button>
            )}
            {project.demo && (
              <Button href={project.demo} variant="ghost" icon={FiExternalLink}>
                Live Demo
              </Button>
            )}
          </div>
        </header>

        <div className="mt-10">
          <ProjectThumbnail image={project.image} alt={`${project.name} screenshot`} />
        </div>

        {project.screenshots.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.screenshots.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${project.name} screenshot`}
                loading="lazy"
                className="rounded-md border border-border-muted"
              />
            ))}
          </div>
        )}

        {project.architectureDiagram && (
          <div className="mt-6">
            <img
              src={project.architectureDiagram}
              alt={`${project.name} architecture diagram`}
              loading="lazy"
              className="rounded-md border border-border-muted"
            />
          </div>
        )}

        <div className="mt-4">
          {sections.map((section) => (
            <DetailSection key={section.title} {...section} />
          ))}
        </div>

        {related.length > 0 && (
          <section className="mt-4 border-t border-border-muted pt-8">
            <h2 className="text-lg font-semibold text-text-primary">Related Projects</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((r) => (
                <ProjectCard key={r.slug} project={r} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-10">
          <ProjectNav prev={prev} next={next} />
        </div>
      </Container>
    </article>
  );
}
