import { Link } from "react-router-dom";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import ProjectThumbnail from "./ProjectThumbnail";

export default function ProjectCard({ project }) {
  const detailPath = `/projects/${project.slug}`;

  return (
    <Card as="article" interactive className="flex flex-col">
      <Link to={detailPath} className="rounded-md focus-visible:outline-2 focus-visible:outline-accent">
        <ProjectThumbnail image={project.image} alt={`${project.name} screenshot`} />
      </Link>

      <div className="mt-4 flex flex-1 flex-col">
        <Link to={detailPath} className="w-fit">
          <h3 className="text-lg font-semibold text-text-primary hover:text-accent">
            {project.name}
          </h3>
        </Link>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-border-muted pt-4 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary"
            >
              <FiGithub aria-hidden="true" />
              Code
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary"
            >
              <FiExternalLink aria-hidden="true" />
              Demo
            </a>
          )}

          <Link
            to={detailPath}
            className="ml-auto flex items-center gap-1.5 text-accent hover:text-accent-hover"
          >
            Read case study
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
