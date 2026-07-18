import { useEffect, useRef } from "react";
import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import { useTerminal } from "../../hooks/useTerminal";

const PROMPT = "visitor@dantechoppa:~$";

export default function Terminal() {
  const { lines, inputValue, setInputValue, handleSubmit, handleKeyDown } = useTerminal();
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Keep the newest line in view as the buffer grows.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Terminal"
          title="Try it yourself"
          description="A minimal shell simulation. Type a command to explore the site without leaving this page."
        />

        <div className="mt-10 overflow-hidden rounded-lg border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-border" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-border" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-border" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-text-muted">{PROMPT.replace("$", "")}</span>
          </div>

          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="h-80 space-y-3 overflow-y-auto bg-background p-4 font-mono text-sm sm:h-96"
          >
            {lines.map((line) =>
              line.type === "input" ? (
                <p key={line.id}>
                  <span className="text-accent">{PROMPT}</span>{" "}
                  <span className="text-text-primary">{line.content}</span>
                </p>
              ) : (
                <div key={line.id} className="text-text-secondary">
                  {line.content}
                </div>
              )
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <label htmlFor="terminal-input" className="text-accent">
                {PROMPT}
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal command input"
                className="flex-1 bg-transparent text-text-primary caret-accent outline-none"
              />
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
