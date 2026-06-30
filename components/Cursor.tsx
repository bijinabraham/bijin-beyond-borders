"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

type CursorState = "card" | "link" | "btn" | null;

function applyState(ring: HTMLDivElement, state: CursorState) {
  ring.classList.remove(styles.hoverCard, styles.hoverLink, styles.hoverBtn);
  if (state === "card") ring.classList.add(styles.hoverCard);
  if (state === "link") ring.classList.add(styles.hoverLink);
  if (state === "btn")  ring.classList.add(styles.hoverBtn);
}

function getState(target: Element): CursorState {
  if (target.closest(".tilt-card")) return "card";
  const interactive = target.closest("a, button, [data-cursor]");
  if (!interactive) return null;
  const attr = (interactive as HTMLElement).dataset?.cursor;
  if (attr === "btn")  return "btn";
  if (attr === "card") return "card";
  return "link";
}

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + "px";
        dotRef.current.style.top  = mouseY + "px";
      }
      // Update state on every move so it's always in sync with what's under the cursor
      if (ringRef.current) applyState(ringRef.current, getState(e.target as Element));
    };

    function animate() {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + "px";
        ringRef.current.style.top  = ringY + "px";
      }
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div ref={dotRef}  className={styles.dot}  aria-hidden />
      <div ref={ringRef} className={styles.ring} aria-hidden />
    </>
  );
}
