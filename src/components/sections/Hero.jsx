import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiDownload, FiArrowRight } from "react-icons/fi";
import Container from "../ui/Container";
import Button from "../ui/Button";
import StatusPanel from "../ui/StatusPanel";
import { SOCIAL_LINKS } from "../../constants/nav";
import { resume } from "../../data/resume";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // One orchestrated entrance, staggered slightly between the two columns.
  // Nothing loops, nothing re-triggers on scroll — it happens once, on load.
  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay, ease: "easeOut" },
    }),
  };

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center border-b border-border">
      <Container className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="mb-4 font-mono text-sm text-accent">Hi, I'm Dante Choppa</p>

          <h1 className="text-3xl font-semibold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
            Systems &amp; Network Programmer
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            I build backend systems, networking tools, automation software,
            distributed applications, and infrastructure that other engineers
            depend on. My focus is correctness under load, clear failure
            modes, and systems that stay understandable as they grow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/projects" as="a" variant="primary" icon={FiArrowRight} iconPosition="right">
              View Projects
            </Button>
            <Button href={resume.resumePdfPath} variant="secondary" icon={FiDownload}>
              Download Resume
            </Button>
            <Button href={SOCIAL_LINKS.github} variant="ghost" icon={FiGithub}>
              GitHub
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.15}
          className="flex justify-start lg:justify-end"
        >
          <StatusPanel />
        </motion.div>
      </Container>
    </section>
  );
}
