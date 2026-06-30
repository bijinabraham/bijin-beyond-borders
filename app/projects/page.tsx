"use client";

import { motion } from "framer-motion";
import { photo } from "@/lib/basePath";
import { projects } from "@/lib/projectsData";
import MagneticBtn from "@/components/MagneticBtn";
import styles from "./projects.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6, ease },
});

type Project = (typeof projects)[number];

function StatusValue({ live, note }: { live: boolean; note: string | null }) {
  if (!live) return <span className={styles.metaValue}>In progress</span>;
  return (
    <span className={`${styles.metaValue} ${styles.liveValue}`}>
      <span className={styles.liveDot} />
      Live{note ? ` · ${note}` : ""}
    </span>
  );
}

function MetaStrip({ p }: { p: Project }) {
  return (
    <div className={styles.metaBlock}>
      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Type</span>
        <span className={styles.metaValue}>{p.tag}</span>
      </div>
      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Year</span>
        <span className={styles.metaValue}>{p.year}</span>
      </div>
      {p.role && (
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>{p.role}</span>
        </div>
      )}
      {p.stack.length > 0 && (
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Stack</span>
          <span className={styles.metaValue}>{p.stack.join(", ")}</span>
        </div>
      )}
      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Status</span>
        <StatusValue live={p.live} note={p.statusNote} />
      </div>
    </div>
  );
}

function CtaSlot({ p }: { p: Project }) {
  if (p.url) {
    return (
      <MagneticBtn>
        <a
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visitBtn}
          data-cursor="btn"
        >
          Visit site ↗
        </a>
      </MagneticBtn>
    );
  }
  return <span className={styles.personalBadge}>Personal build</span>;
}

function FeaturedWide({ p, delay }: { p: Project; delay: number }) {
  return (
    <motion.div
      className={styles.featured}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      <div className={styles.screenshotWrap}>
        <img
          src={photo(p.screenshot!)}
          alt={p.name}
          className={styles.screenshot}
          draggable={false}
        />
        <div className={styles.screenshotOverlay} />
      </div>

      <div className={styles.featuredInfo}>
        <div className={styles.featuredLeft}>
          <span className={styles.featuredNum}>{p.num}</span>
          <div>
            <h2 className={styles.featuredName}>{p.name}</h2>
            <p className={styles.featuredDesc}>{p.longDesc ?? p.desc}</p>
          </div>
        </div>

        <div className={styles.featuredRight}>
          <MetaStrip p={p} />
          <CtaSlot p={p} />
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedPhone({ p, delay }: { p: Project; delay: number }) {
  return (
    <motion.div
      className={styles.featuredPhone}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
    >
      <div className={styles.phoneStage}>
        <div className={styles.phoneFrame}>
          <img
            src={photo(p.screenshot!)}
            alt={`${p.name} app screenshot`}
            draggable={false}
          />
        </div>
        <div className={styles.phoneCopy}>
          <span className={styles.phoneEyebrow}>{p.num} · Native mobile</span>
          <h2 className={styles.phoneName}>{p.name}</h2>
          <p className={styles.phoneDesc}>{p.longDesc ?? p.desc}</p>
        </div>
      </div>

      <div className={styles.featuredInfo}>
        <div className={styles.featuredLeft}>
          <span className={styles.featuredNum}>{p.num}</span>
          <div>
            <h2 className={styles.featuredName}>{p.name}</h2>
            <p className={styles.featuredDesc}>{p.desc}</p>
          </div>
        </div>

        <div className={styles.featuredRight}>
          <MetaStrip p={p} />
          <CtaSlot p={p} />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.screenshot);
  const rest = projects.filter((p) => !p.screenshot);
  const liveCount = projects.filter((p) => p.live).length;

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <motion.h1 className={styles.title} {...fadeUp(0)}>Projects</motion.h1>
        <motion.p className={styles.subtitle} {...fadeUp(0.1)}>
          {liveCount} live &middot; {projects.length} total
        </motion.p>
      </div>

      {featured.map((p, i) => {
        const delay = 0.15 + i * 0.1;
        return p.layout === "phone"
          ? <FeaturedPhone key={p.num} p={p} delay={delay} />
          : <FeaturedWide key={p.num} p={p} delay={delay} />;
      })}

      {rest.length > 0 && (
        <div className={styles.list}>
          {rest.map((p, i) => (
            <motion.div
              key={p.num}
              className={styles.listItem}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.55, ease }}
            >
              <span className={styles.listNum}>{p.num}</span>
              <span className={styles.listInfo}>
                <span className={styles.listName}>{p.name}</span>
                <span className={styles.listDesc}>{p.desc}</span>
              </span>
              <span className={styles.listTag}>{p.tag}</span>
              <span className={styles.listYear}>{p.year}</span>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
}
