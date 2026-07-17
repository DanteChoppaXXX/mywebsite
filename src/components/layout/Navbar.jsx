import { NavLink } from "react-router-dom";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/nav";
import { cn } from "../../utils/cn";
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container as="nav" aria-label="Primary" className="flex h-16 items-center justify-between">
        <NavLink to="/" className="font-mono text-sm font-semibold text-text-primary">
          {"Dante Choppa"}
        </NavLink>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  cn(
                    "text-sm transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  )
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noreferrer"
          className="hidden text-sm text-text-secondary hover:text-text-primary md:block"
        >
          GitHub
        </a>

        {/* Mobile menu button — wired up in the responsive-nav step */}
        <button
          type="button"
          aria-label="Open menu"
          className="text-text-secondary md:hidden"
        >
          Menu
        </button>
      </Container>
    </header>
  );
}
