import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/nav";
import { cn } from "../../utils/cn";
import Container from "../ui/Container";

function navLinkClass({ isActive }) {
  return cn("text-sm transition-colors", isActive ? "text-accent" : "text-text-secondary hover:text-text-primary");
}

function mobileNavLinkClass({ isActive }) {
  return cn(
    "block rounded-md px-3 py-2 text-sm transition-colors",
    isActive ? "bg-surface text-accent" : "text-text-secondary hover:bg-surface hover:text-text-primary"
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Never leave the mobile menu open across a navigation.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Escape closes the menu for keyboard users.
  useEffect(() => {
    if (!isOpen) return undefined;
    function handleKeyDown(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((open) => !open);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container as="nav" aria-label="Primary" className="flex h-16 items-center justify-between">
        <NavLink to="/" className="font-mono text-sm font-semibold text-text-primary">
          {"Dante Choppa"}
        </NavLink>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} end={link.path === "/"} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hidden text-sm text-text-secondary hover:text-text-primary md:block">
          GitHub
        </a>

        <button type="button" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={toggleMenu} className="text-text-secondary hover:text-text-primary md:hidden">
          {isOpen ? <FiX className="text-xl" aria-hidden="true" /> : <FiMenu className="text-xl" aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} end={link.path === "/"} className={mobileNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="block rounded-md px-3 py-2 text-sm text-text-secondary hover:bg-surface hover:text-text-primary">
                  GitHub
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
