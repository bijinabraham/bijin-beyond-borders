"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { photo } from "@/lib/basePath";
import styles from "./Hero.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1600;
    const start = performance.now();
    function step(now: number) {
      const t = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [active, target]);
  return val;
}

export default function Hero() {
  const imgRef   = useRef<HTMLImageElement>(null);
  const statRef  = useRef<HTMLDivElement>(null);
  const [statVisible, setStatVisible] = useState(false);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current)
        imgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stat counter trigger
  useEffect(() => {
    const el = statRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count1 = useCounter(15, statVisible);
  const count2 = useCounter(2, statVisible);

  const lines = [
    { text: "Bijin",   cls: styles.line1 },
    { text: "Beyond",  cls: styles.line2 },
    { text: "Borders", cls: styles.line3 },
  ];

  return (
    <section className={styles.hero}>
      <div className={styles.textPanel}>
        <motion.p
          className={styles.index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          A personal archive
        </motion.p>

        <h1 className={styles.title}>
          {lines.map(({ text, cls }, i) => (
            <span key={text} className={styles.titleMask}>
              <motion.span
                className={`${styles.titleLine} ${cls}`}
                initial={{ clipPath: "inset(0 0 110% 0)" }}
                animate={{ clipPath: "inset(-20% -5% -20% -5%)" }}
                transition={{ delay: 0.3 + i * 0.13, duration: 0.85, ease }}
              >
                {text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className={styles.desc}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease }}
        >
          Travels, projects, and the spaces between: collected by someone
          who looks slowly and moves often.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.88, duration: 0.6, ease }}
        >
          <Link href="/travels" className={styles.ctaPrimary}>Enter</Link>
          <Link href="/about"   className={styles.ctaGhost}>About &rarr;</Link>
        </motion.div>
      </div>

      <div className={styles.imagePanel}>
        <div className={styles.imageWrap}>
          <motion.img
            ref={imgRef}
            src={photo("/photos/hero.jpeg")}
            alt="A place"
            className={styles.heroImg}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease }}
          />
        </div>

        <div className={styles.statStrip} ref={statRef}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{count1}</span>
            <span className={styles.statLabel}>Countries visited</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{count2}</span>
            <span className={styles.statLabel}>Projects built</span>
          </div>
        </div>
      </div>
    </section>
  );
}
