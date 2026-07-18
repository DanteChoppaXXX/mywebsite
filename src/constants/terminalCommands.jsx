import { Link } from "react-router-dom";
import { SOCIAL_LINKS } from "./nav";
import { skillCategories } from "../data/skills";
import { projects } from "../data/projects";
import { blogPosts } from "../data/blog";
import { resume } from "../data/resume";

export const COMMANDS = [
  "help",
  "whoami",
  "skills",
  "projects",
  "blog",
  "resume",
  "contact",
  "github",
  "clear",
];

// Sentinel returned for the "clear" command — the terminal hook checks for
// this specific value to reset its line buffer instead of appending output.
export const CLEAR = Symbol("clear");

const linkClass = "text-accent underline underline-offset-2 hover:text-accent-hover";

/**
 * Returns a React node for a given raw command string, or `null` if the
 * input was empty (re-prompt with no output). Unknown commands fall
 * through to the default case rather than throwing.
 */
export function runCommand(rawInput) {
  const cmd = rawInput.trim().toLowerCase();
  if (cmd === "") return null;

  switch (cmd) {
    case "help":
      return (
        <div className="space-y-1">
          <p>Available commands:</p>
          <ul className="mt-1 space-y-0.5">
            <li><span className="text-accent">help</span> — list available commands</li>
            <li><span className="text-accent">whoami</span> — a short introduction</li>
            <li><span className="text-accent">skills</span> — technical skills by category</li>
            <li><span className="text-accent">projects</span> — list of projects</li>
            <li><span className="text-accent">blog</span> — recent posts</li>
            <li><span className="text-accent">resume</span> — resume page and download</li>
            <li><span className="text-accent">contact</span> — how to reach me</li>
            <li><span className="text-accent">github</span> — GitHub profile</li>
            <li><span className="text-accent">clear</span> — clear the terminal</li>
          </ul>
        </div>
      );

    case "whoami":
      return (
        <p>
          Dante Choppa — Systems &amp; Network Programmer. I build backend
          systems, networking tools, automation software, and infrastructure
          that other engineers depend on.
        </p>
      );

    case "skills":
      return (
        <div className="space-y-1.5">
          {skillCategories.map((category) => (
            <p key={category.category}>
              <span className="text-accent">{category.category}:</span>{" "}
              {category.items.join(", ")}
            </p>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="space-y-1.5">
          {projects.map((project) => (
            <p key={project.slug}>
              <Link to={`/projects/${project.slug}`} className={linkClass}>
                {project.name}
              </Link>{" "}
              — {project.description}
            </p>
          ))}
        </div>
      );

    case "blog":
      return (
        <div className="space-y-1.5">
          {blogPosts.length === 0 && <p>No posts published yet.</p>}
          {blogPosts.slice(0, 5).map((post) => (
            <p key={post.slug}>
              <Link to={`/blog/${post.slug}`} className={linkClass}>
                {post.title}
              </Link>
            </p>
          ))}
        </div>
      );

    case "resume":
      return (
        <p>
          View the full resume at{" "}
          <Link to="/resume" className={linkClass}>/resume</Link>, or{" "}
          <a href={resume.resumePdfPath} className={linkClass}>download the PDF</a> directly.
        </p>
      );

    case "contact":
      return (
        <div className="space-y-1">
          <p>
            Email:{" "}
            <a href={`mailto:${SOCIAL_LINKS.email}`} className={linkClass}>
              {SOCIAL_LINKS.email}
            </a>
          </p>
          <p>
            GitHub:{" "}
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className={linkClass}>
              {SOCIAL_LINKS.github}
            </a>
          </p>
        </div>
      );

    case "github":
      return (
        <p>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className={linkClass}>
            {SOCIAL_LINKS.github}
          </a>
        </p>
      );

    case "clear":
      return CLEAR;

    default:
      return (
        <p className="text-danger">
          command not found: {cmd}. Type <span className="text-accent">help</span> for available commands.
        </p>
      );
  }
}
