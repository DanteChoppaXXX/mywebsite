import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/nav";
import Container from "../ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>© {year}  - Dante Choppa</p>

        <ul className="flex flex-wrap gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <a href={link.path} className="hover:text-text-primary">
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-text-primary">
              GitHub
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
