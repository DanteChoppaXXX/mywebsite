import { FiDownload } from "react-icons/fi";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import DetailSection from "../components/DetailSection";
import ExperienceItem from "../components/ExperienceItem";
import { resume } from "../data/resume";
import { skillCategories } from "../data/skills";
import { projects } from "../data/projects";

export default function Resume() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary sm:text-4xl">Resume</h1>
            <p className="mt-1 text-text-secondary">Systems &amp; Network Programmer</p>
          </div>
          <Button href={resume.resumePdfPath} variant="primary" icon={FiDownload} className="shrink-0">
            Download PDF
          </Button>
        </header>

        <div className="mt-4">
          <DetailSection title="Summary" type="text" content={resume.summary} />

          <DetailSection title="Experience" type="custom">
            <div className="divide-y divide-border-muted">
              {resume.experience.map((job) => (
                <ExperienceItem key={`${job.company}-${job.role}`} {...job} />
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Projects" type="custom">
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.slug} className="leading-relaxed text-text-secondary">
                  <a href={`/projects/${project.slug}`} className="text-text-primary underline underline-offset-2 hover:text-accent">
                    {project.name}
                  </a>{" "}
                  — {project.stack.join(", ")}
                </li>
              ))}
            </ul>
          </DetailSection>

          <DetailSection title="Skills" type="custom">
            <div className="space-y-2">
              {skillCategories.map((category) => (
                <p key={category.category} className="leading-relaxed text-text-secondary">
                  <span className="text-text-primary">{category.category}:</span>{" "}
                  {category.items.join(", ")}
                </p>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Education" type="custom">
            <div className="divide-y divide-border-muted">
              {resume.education.map((edu) => (
                <div key={edu.school} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium text-text-primary">{edu.degree}</p>
                    <p className="text-sm text-text-muted">{edu.school}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-text-muted">
                    {edu.start} — {edu.end}
                  </span>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Certifications" type="custom">
            <div className="divide-y divide-border-muted">
              {resume.certifications.map((cert) => (
                <div key={cert.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4 first:pt-0 last:pb-0">
                  <div>
                    <p className="font-medium text-text-primary">{cert.name}</p>
                    <p className="text-sm text-text-muted">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-text-muted">{cert.date}</span>
                </div>
              ))}
            </div>
          </DetailSection>
        </div>
      </Container>
    </section>
  );
}
