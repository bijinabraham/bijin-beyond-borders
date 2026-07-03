"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { photo } from "@/lib/basePath";
import { activities, type Activity } from "@/lib/adrenalineData";
import styles from "./ActivityContent.module.css";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#%&*?";

function useScramble(target: string) {
  const [text, setText] = useState(target.toUpperCase());

  useEffect(() => {
    const upper = target.toUpperCase();
    let iter = 0;
    const total = upper.length * 2 + 10;
    let id: ReturnType<typeof setTimeout>;

    const step = () => {
      setText(
        Array.from({ length: upper.length }, (_, i) =>
          i < Math.floor(iter / 2)
            ? upper[i]
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join("")
      );
      iter++;
      if (iter <= total) id = setTimeout(step, 42);
      else setText(upper);
    };

    step();
    return () => clearTimeout(id);
  }, [target]);

  return text;
}

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease },
});

export default function ActivityContent({ activity }: { activity: Activity }) {
  const hasPhotos = activity.photos.length > 0;
  const scrambledName = useScramble(activity.name);

  // Wave canvas
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(activity.intensity);
  const waveRafRef   = useRef<number>(0);

  // Glitch ref
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Tabs — refs for active-tab centering on mount
  const tabsRef      = useRef<HTMLElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => { intensityRef.current = activity.intensity; }, [activity.intensity]);

  // Center the active tab on mount (mobile: horizontal scroll strip)
  useEffect(() => {
    const active = activeTabRef.current;
    const scroller = tabsRef.current;
    if (!active || !scroller) return;
    // Only meaningful when the tab strip is actually overflowing (mobile).
    // scrollIntoView with inline: "center" on the ancestor scroll container.
    active.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "auto",
    });
  }, []);

  // Idle glitch — fires every 1s
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let removeTimeout: ReturnType<typeof setTimeout>;

    const startDelay = setTimeout(() => {
      intervalId = setInterval(() => {
        const el = nameRef.current;
        if (!el) return;
        el.classList.add(styles.glitching);
        removeTimeout = setTimeout(() => el.classList.remove(styles.glitching), 350);
      }, 1000);
    }, 1500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(intervalId);
      clearTimeout(removeTimeout);
      nameRef.current?.classList.remove(styles.glitching);
    };
  }, []);

  // Wave canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let displayInt = intensityRef.current;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      displayInt += (intensityRef.current - displayInt) * 0.035;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const amp   = (displayInt / 5) * h * 0.44;
      const freq  = 0.006 + (displayInt / 5) * 0.022;
      const speed = 0.028 + (displayInt / 5) * 0.07;
      t += speed;

      const drawWave = (opacity: number, lw: number) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x++) {
          const y =
            h / 2 +
            Math.sin(x * freq + t) * amp +
            Math.sin(x * freq * 1.7 + t * 1.3) * amp * 0.3;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `oklch(0.58 0.19 32 / ${opacity})`;
        ctx.lineWidth = lw;
        ctx.stroke();
      };

      drawWave(0.12, 14);
      drawWave(0.6,  2);

      waveRafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(waveRafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.page}>

      {/* ── TAB SWITCHER (TOP) ── */}
      <nav ref={tabsRef} className={styles.tabs} aria-label="Adrenaline pursuits">
        <div className={styles.tabsGroup}>
          {activities.filter(a => !a.horizon).map((a) => {
            const isActive = a.slug === activity.slug;
            return (
              <Link
                key={a.slug}
                href={`/adrenaline/${a.slug}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                ref={isActive ? activeTabRef : undefined}
                prefetch
              >
                <span className={styles.tabName}>{a.name}</span>
                <span className={styles.tabTag}>{a.tag.split(" · ")[0]}</span>
              </Link>
            );
          })}
        </div>
        <div className={styles.tabsDivider} />
        <div className={styles.tabsGroup}>
          {activities.filter(a => a.horizon).map((a) => {
            const isActive = a.slug === activity.slug;
            return (
              <Link
                key={a.slug}
                href={`/adrenaline/${a.slug}`}
                className={`${styles.tab} ${styles.tabHorizon} ${isActive ? styles.tabActive : ""}`}
                ref={isActive ? activeTabRef : undefined}
                prefetch
              >
                <span className={styles.tabName}>{a.name}</span>
                <span className={styles.tabSoon}>Soon</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img
            src={
              hasPhotos
                ? photo(`/photos/adrenaline/${activity.slug}/${activity.photos[0]}`)
                : `https://picsum.photos/seed/${activity.seed}/1600/900`
            }
            alt={activity.name}
            className={styles.heroImg}
            draggable={false}
          />
          <div className={styles.heroGradient} />
          <div className={`${styles.heroGrain} ${activity.horizon ? styles.heroGrainHeavy : ""}`} />
        </div>

        <div className={styles.heroContent}>
          <motion.span className={styles.heroNum} {...fadeUp(0.05)}>
            0{activities.indexOf(activity) + 1}
          </motion.span>

          {/* Name — scramble + glitch */}
          <h1 ref={nameRef} className={styles.heroName}>{scrambledName}</h1>

          {/* Tag word rotator */}
          <motion.p className={styles.heroTag} {...fadeUp(0.15)}>
            {activity.tagWords.map((word, i) => (
              <span key={word} className={styles.tagWordWrap}>
                <span
                  className={styles.tagWord}
                  style={{ animationDelay: `${i * 1}s` }}
                >
                  {word}
                </span>
                {i < activity.tagWords.length - 1 && (
                  <span className={styles.tagDivider}>·</span>
                )}
              </span>
            ))}
          </motion.p>

          {activity.horizon && (
            <motion.span className={styles.horizonBadge} {...fadeUp(0.25)}>
              On the horizon
            </motion.span>
          )}

          <motion.div className={styles.intensityRow} {...fadeUp(0.3)}>
            <span className={styles.intensityLabel}>Intensity</span>
            <span className={styles.intensityDots}>
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={`${styles.dot} ${i < activity.intensity ? styles.dotFilled : ""}`} />
              ))}
            </span>
          </motion.div>
        </div>

        {/* Wave canvas at bottom of hero */}
        <canvas ref={canvasRef} className={styles.waveCanvas} aria-hidden />
      </section>

      {/* ── STATS ── */}
      {activity.stats.length > 0 && (
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            {activity.stats.map((s, i) => (
              <motion.div
                key={s.label}
                className={styles.stat}
                {...fadeUp(i * 0.05)}
              >
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statValue}>{s.value}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── STORY ── */}
      {activity.longDesc && (
        <section className={styles.storySection}>
          <motion.div className={styles.storyInner} {...fadeUp(0)}>
            <p className={styles.storyEyebrow}>The Pursuit</p>
            <p className={styles.storyBody}>{activity.longDesc}</p>
          </motion.div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      <section className={styles.photosSection}>
        <div className={styles.photosHeader}>
          <motion.h2 className={styles.photosTitle} {...fadeUp(0)}>Sessions</motion.h2>
          {hasPhotos && (
            <motion.span className={styles.photosCount} {...fadeUp(0.05)}>
              {activity.photos.length} {activity.photos.length === 1 ? "photo" : "photos"}
            </motion.span>
          )}
        </div>

        {hasPhotos ? (
          <div className={styles.photoGrid}>
            {activity.photos.map((p, i) => (
              <motion.div
                key={p}
                className={styles.photoCell}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: (i % 4) * 0.06, duration: 0.6, ease }}
              >
                <img
                  src={photo(`/photos/adrenaline/${activity.slug}/${p}`)}
                  alt={`${activity.name} session ${i + 1}`}
                  className={styles.photoImg}
                  loading="lazy"
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div className={styles.empty} {...fadeUp(0.1)}>
            <p className={styles.emptyText}>
              Photos coming soon. Drop them in{" "}
              <code className={styles.emptyCode}>/public/photos/adrenaline/{activity.slug}/</code>{" "}
              and add filenames to{" "}
              <code className={styles.emptyCode}>lib/adrenalineData.ts</code>.
            </p>
          </motion.div>
        )}
      </section>
    </main>
  );
}
