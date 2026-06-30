"use client";

import styles from "./Marquee.module.css";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
  variant?: "primary" | "accent";
}

export default function Marquee({ items, direction = "left", variant = "primary" }: MarqueeProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={`${styles.wrap} ${styles[variant]}`}>
      <div className={`${styles.track} ${direction === "right" ? styles.reverse : ""}`}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot} aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
