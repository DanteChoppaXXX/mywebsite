import { FiLayers, FiWifi, FiTerminal, FiShield } from "react-icons/fi";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

const FOCUS_AREAS = [
  {
    icon: FiLayers,
    title: "Systems Thinking",
    description:
      "I trace a bug to its root cause instead of patching the symptom, and design for the failure case before the happy path.",
  },
  {
    icon: FiWifi,
    title: "Networking & Protocols",
    description:
      "Comfortable from Ethernet frames to HTTP semantics — I've built tools at nearly every layer of the stack to see how they actually behave, not just how they're documented.",
  },
  {
    icon: FiTerminal,
    title: "Automation",
    description:
      "If I do something by hand twice, the third time is scripted. Infrastructure should be reproducible, not remembered.",
  },
  {
    icon: FiShield,
    title: "Security-Minded",
    description:
      "I default to least privilege and treat input as hostile until proven otherwise — habits from networking that carry directly into how I write backend code.",
  },
];

export default function About() {
  return (
    <section className="border-b border-border py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow="About" title="How I approach this work" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div className="max-w-2xl space-y-5 leading-relaxed text-text-secondary">
            <p>
              I think about software the way I think about infrastructure: as
              a system with failure modes, not just a feature set. Most of my
              work sits below the application layer — servers, protocols,
              schedulers, the pieces that have to keep working quietly while
              everything else changes on top of them.
            </p>
            <p>
              That means I spend more time reading RFCs and source code than
              documentation written for public consumption, and more time in
              a terminal than in a browser. I'd rather understand why a TCP
              retransmit happened than memorize which flag suppresses the
              symptom.
            </p>
            <p>
              Security and reliability aren't concerns I bolt on afterward —
              a system that fails predictably and a system that resists
              misuse are usually built the same way: by being explicit about
              every assumption. I keep a running list of things I don't yet
              understand, and working through it is most of how I learn.
            </p>
          </div>

          <dl className="divide-y divide-border-muted border-y border-border-muted">
            {FOCUS_AREAS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <Icon className="mt-0.5 shrink-0 text-lg text-accent" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-text-primary">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
