import { FiMail, FiGithub, FiLinkedin, FiMessageCircle } from "react-icons/fi";
import Container from "../components/ui/Container";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import ContactLink from "../components/ContactLink";
import { SOCIAL_LINKS } from "../constants/nav";

export default function Contact() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="max-w-2xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="The fastest way to reach me is email. I'm also active on GitHub and LinkedIn."
        />

        <Card className="mt-10 divide-y divide-border-muted p-6">
          <ContactLink
            icon={FiMail}
            label="Email"
            value={SOCIAL_LINKS.email}
            href={`mailto:${SOCIAL_LINKS.email}`}
            external={false}
          />
          <ContactLink
            icon={FiGithub}
            label="GitHub"
            value={SOCIAL_LINKS.github.replace("https://", "")}
            href={SOCIAL_LINKS.github}
          />
          <ContactLink
            icon={FiLinkedin}
            label="LinkedIn"
            value={SOCIAL_LINKS.linkedin.replace("https://", "")}
            href={SOCIAL_LINKS.linkedin}
          />
          {SOCIAL_LINKS.discord && (
            <ContactLink
              icon={FiMessageCircle}
              label="Discord"
              value={SOCIAL_LINKS.discord}
              href={`https://discord.com/users/${SOCIAL_LINKS.discord}`}
            />
          )}
        </Card>
      </Container>
    </section>
  );
}
