"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Loader.module.css";

const BRAND = "BIJIN BEYOND BORDERS";
const LETTER_DELAY = 55;
const HOLD_AFTER   = 600;
const TOTAL = 80 + BRAND.length * LETTER_DELAY + HOLD_AFTER;

export default function Loader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [done,   setDone]   = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setActive(false);
      setDone(false);
      return;
    }
    setActive(true);
    setDone(false);
    const t = setTimeout(() => setDone(true), TOTAL);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!active) return null;

  return (
    <div className={`${styles.loader} ${done ? styles.done : ""}`} aria-hidden>
      <div className={styles.letters}>
        {BRAND.split("").map((char, i) => (
          <span
            key={i}
            className={styles.letter}
            style={{ animationDelay: `${80 + i * LETTER_DELAY}ms` }}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </div>
    </div>
  );
}
