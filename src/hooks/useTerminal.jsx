import { useCallback, useRef, useState } from "react";
import { runCommand, CLEAR } from "../constants/terminalCommands";

const WELCOME_LINE = {
  type: "output",
  content: (
    <p>
      Type <span className="text-accent">help</span> to see available commands.
    </p>
  ),
};

export function useTerminal() {
  const idCounter = useRef(0);
  const nextId = () => `line-${idCounter.current++}`;

  const [lines, setLines] = useState([{ id: nextId(), ...WELCOME_LINE }]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const trimmed = inputValue.trim();

      setLines((prev) => [...prev, { id: nextId(), type: "input", content: inputValue }]);

      if (trimmed !== "") {
        const result = runCommand(trimmed);

        if (result === CLEAR) {
          setLines([]);
        } else if (result) {
          setLines((prev) => [...prev, { id: nextId(), type: "output", content: result }]);
        }

        setCommandHistory((prev) =>
          prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed]
        );
      }

      setInputValue("");
      setHistoryIndex(null);
    },
    [inputValue]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (commandHistory.length === 0) return;
        setHistoryIndex((prev) => {
          const newIndex = prev === null ? commandHistory.length - 1 : Math.max(0, prev - 1);
          setInputValue(commandHistory[newIndex]);
          return newIndex;
        });
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setHistoryIndex((prev) => {
          if (prev === null) return null;
          const newIndex = prev + 1;
          if (newIndex >= commandHistory.length) {
            setInputValue("");
            return null;
          }
          setInputValue(commandHistory[newIndex]);
          return newIndex;
        });
      }
    },
    [commandHistory]
  );

  return { lines, inputValue, setInputValue, handleSubmit, handleKeyDown };
}
