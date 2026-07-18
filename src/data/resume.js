export const resume = {
  summary:
    "Systems and network programmer who builds backend services, networking tools, and infrastructure automation, with a focus on reliability, observability, and understanding systems from the wire up rather than through a framework's abstractions. Comfortable operating close to the OS and the network stack, and equally comfortable working within a team's CI/CD and cloud infrastructure.",
  experience: [
    {
      role: "Backend & Infrastructure Engineer",
      company: "Company Name",
      location: "Remote",
      start: "2024",
      end: "Present",
      points: [
        "Designed and operated internal service infrastructure (Docker, Kubernetes, Nginx) supporting production traffic across multiple environments",
        "Built deployment automation that reduced manual release steps from a multi-hour checklist to a single command",
        "Investigated and resolved network-level production incidents, including DNS misconfiguration and TCP connection exhaustion under load",
        "Introduced structured logging and metrics across backend services, cutting average incident diagnosis time",
      ],
    },
    {
      role: "Software Engineer",
      company: "Company Name",
      location: "City, Country",
      start: "2022",
      end: "2024",
      points: [
        "Developed and maintained backend services in Go and Python handling production traffic",
        "Wrote CI/CD pipelines automating testing and deployment across staging and production environments",
        "Worked with the infrastructure team to migrate legacy services to containerized deployments",
      ],
    },
    {
      role: "IT & Network Support Technician",
      company: "Company Name",
      location: "City, Country",
      start: "2020",
      end: "2022",
      points: [
        "Administered internal network infrastructure — VLANs, firewalls, DHCP, and DNS — for a growing office environment",
        "Provided technical support and documented recurring issues into a self-serve internal knowledge base",
        "Automated routine administrative tasks with shell and Python scripts",
      ],
    },
  ],
  education: [
    {
      degree: "B.Sc. in Computer Science",
      school: "University Name",
      start: "2016",
      end: "2020",
    },
  ],
  certifications: [
    { name: "CompTIA Network+", issuer: "CompTIA", date: "2021" },
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", date: "2023" },
  ],
  resumePdfPath: "/resume.pdf",
};
