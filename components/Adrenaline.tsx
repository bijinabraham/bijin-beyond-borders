"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Adrenaline.module.css";

const activities = [
  { name: "MMA",     tag: "Combat training",    seed: "mma-training", horizon: false },
  { name: "Ski",     tag: "On the mountain",     seed: "ski-mountain", horizon: false },
  { name: "Surf",    tag: "In the water",        seed: "ocean-surf",   horizon: false },
  { name: "Snorkel", tag: "Beneath the surface", seed: "snorkel-reef", horizon: false },
  { name: "Skydive", tag: "Coming soon",         seed: "sky-freefall", horizon: true  },
  { name: "Scuba",   tag: "Coming soon",         seed: "scuba-deep",   horizon: true  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Adrenaline() {
  const trackRef   = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const startScroll = useRef(0);
  const velX        = useRef(0);
  const lastX       = useRef(0);

  function cardWidth() {
    const track = trackRef.current;
    if (!track) return 320;
    const first = track.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth : 320;
  }

  function snapTo(idx: number, smooth = true) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(idx, activities.length - 1));
    track.scrollTo({ left: clamped * cardWidth(), behavior: smooth ? "smooth" : "instant" });
    setActiveIdx(clamped);
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onDown = (e: MouseEvent) => {
      isDragging.current  = true;
      startX.current      = e.pageX;
      startScroll.current = track.scrollLeft;
      velX.current        = 0;
      lastX.current       = e.pageX;
      track.style.cursor  = "grabbing";
      // disable CSS snap so drag feels raw & direct
      track.style.scrollSnapType = "none";
    };

    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      velX.current        = e.pageX - lastX.current;
      lastX.current       = e.pageX;
      track.scrollLeft    = startScroll.current - (e.pageX - startX.current);
    };

    const onUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      track.style.cursor = "grab";
      track.style.scrollSnapType = "x mandatory";

      // use velocity to decide which card to snap to
      const current  = track.scrollLeft;
      const cw       = cardWidth();
      const rawIdx   = current / cw;
      const snapped  = velX.current < -3
        ? Math.ceil(rawIdx)
        : velX.current > 3
        ? Math.floor(rawIdx)
        : Math.round(rawIdx);

      snapTo(snapped);
    };

    track.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup",  onUp);

    return () => {
      track.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup",  onUp);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          Adrenaline
        </motion.h2>
        <span className={styles.dragHint}>
          Drag <span className={styles.dragArrow}>→</span>
        </span>
      </div>

      <div className={styles.track} ref={trackRef}>
        {activities.map((a) => {
          const inner = (
            <div className={styles.card} key={a.name}>
              <img
                draggable={false}
                src={`https://picsum.photos/seed/${a.seed}/500/700`}
                alt={a.name}
                className={styles.img}
              />
              <div className={styles.overlay}>
                {a.horizon && <span className={styles.badge}>On the horizon</span>}
                <span className={styles.name}>{a.name}</span>
                <span className={styles.tag}>{a.tag}</span>
                {!a.horizon && <span className={styles.arrow}>Explore →</span>}
              </div>
            </div>
          );

          return a.horizon ? (
            <div key={a.name} className={styles.cardWrap}>{inner}</div>
          ) : (
            <Link
              key={a.name}
              href={`/adrenaline/${a.name.toLowerCase()}`}
              className={styles.cardWrap}
              draggable={false}
              onClick={(e) => { if (isDragging.current) e.preventDefault(); }}
            >
              {inner}
            </Link>
          );
        })}
      </div>

      <div className={styles.pips}>
        {activities.map((a, i) => (
          <button
            key={a.name}
            className={`${styles.pip} ${i === activeIdx ? styles.pipActive : ""}`}
            onClick={() => snapTo(i)}
            aria-label={a.name}
          />
        ))}
      </div>
    </section>
  );
}
