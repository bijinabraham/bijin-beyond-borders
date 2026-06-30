"use client";

import { useRef, useEffect } from "react";
import styles from "./MagneticBtn.module.css";

interface MagneticBtnProps {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticBtn({ children, strength = 0.38 }: MagneticBtnProps) {
  const wrapRef  = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const onMove = (e: MouseEvent) => {
      const r  = wrap.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist   = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) * 1.1;
      if (dist < radius) {
        const pull = (1 - dist / radius);
        inner.style.transform = `translate(${dx * pull * strength}px, ${dy * pull * strength}px)`;
      }
    };

    const onLeave = () => {
      inner.style.transform = "translate(0, 0)";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={wrapRef} className={styles.wrap}>
      <span ref={innerRef} className={styles.inner}>
        {children}
      </span>
    </span>
  );
}
