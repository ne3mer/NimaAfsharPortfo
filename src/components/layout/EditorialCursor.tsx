"use client";

import { useEffect, useRef } from "react";

export function EditorialCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    const move = (event: PointerEvent) => {
      cursor.style.transform = `translate3d(${event.clientX + 14}px, ${event.clientY + 14}px, 0)`;
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor-label]"
      );
      if (target) {
        cursor.textContent = target.dataset.cursorLabel ?? "VIEW →";
        cursor.dataset.visible = "true";
      } else {
        cursor.dataset.visible = "false";
      }
    };

    const hide = () => {
      cursor.dataset.visible = "false";
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-visible="false"
      className="editorial-cursor"
    >
      VIEW →
    </div>
  );
}
