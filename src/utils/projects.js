import { projects } from "../data/projects";

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  };
}

/**
 * "Related" means sharing at least one stack technology with the current
 * project — a simple, honest signal rather than a fake recommendation
 * engine for three static entries.
 */
export function getRelatedProjects(slug, limit = 3) {
  const current = getProjectBySlug(slug);
  if (!current) return [];

  return projects
    .filter(
      (project) =>
        project.slug !== slug &&
        project.stack.some((tech) => current.stack.includes(tech))
    )
    .slice(0, limit);
}
