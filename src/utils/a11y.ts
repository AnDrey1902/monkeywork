import type { KeyboardEvent } from "react";

/**
 * Keyboard support for elements with role="button": Enter / Space trigger the click handler.
 */
export function handleActivate(handler: () => void): (e: KeyboardEvent<HTMLElement>) => void {
  return (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler();
    }
  };
}
