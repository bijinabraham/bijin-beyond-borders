"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.css";

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

    // Hover states via event delegation
    const onEnterCard = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest(".tilt-card") && ringRef.current) {
        ringRef.current.classList.add(styles.hoverCard);
        ringRef.current.classList.remove(styles.hoverLink);
      }
    };
    const onEnterLink = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t.closest(".tilt-card") && t.closest("a, button") && ringRef.current) {
        ringRef.current.classList.add(styles.hoverLink);
        ringRef.current.classList.remove(styles.hoverCard);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const t = e.target as Element;
      if (ringRef.current && (t.closest(".tilt-card") || t.closest("a, button"))) {
        ringRef.current.classList.remove(styles.hoverCard, styles.hoverLink);
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnterCard);
    document.addEventListener("mouseover", onEnterLink);
    document.addEventListener("mouseout",  onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnterCard);
      document.removeEventListener("mouseover", onEnterLink);
      document.removeEventListener("mouseout",  onLeave);
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
