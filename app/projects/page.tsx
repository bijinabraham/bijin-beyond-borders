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

export default function ProjectsPage() {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <main className={styles.page}>

      {/* ── HEADER ── */}
      <div className={styles.header}>
        <motion.h1 className={styles.title} {...fadeUp(0)}>Projects</motion.h1>
        <motion.p className={styles.subtitle} {...fadeUp(0.1)}>
          {projects.filter(p => p.live).length} live &middot; {projects.length} total
        </motion.p>
      </div>

      {/* ── FEATURED PROJECT ── */}
      {featured.screenshot && (
        <motion.div
          className={styles.featured}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
        >
          {/* Screenshot */}
          <div className={styles.screenshotWrap}>
            <img
              src={photo(featured.screenshot)}
              alt={featured.name}
              className={styles.screenshot}
              draggable={false}
            />
            <div className={styles.screenshotOverlay} />
          </div>

          {/* Info strip */}
          <div className={styles.featuredInfo}>
            <div className={styles.featuredLeft}>
              <span className={styles.featuredNum}>{featured.num}</span>
              <div>
                <h2 className={styles.featuredName}>{featured.name}</h2>
                <p className={styles.featuredDesc}>{featured.longDesc}</p>
              </div>
            </div>

            <div className={styles.featuredRight}>
              <div className={styles.metaBlock}>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Type</span>
                  <span className={styles.metaValue}>{featured.tag}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Year</span>
                  <span className={styles.metaValue}>{featured.year}</span>
                </div>
                {featured.role && (
                  <div className={styles.metaRow}>
                    <span className={styles.metaLabel}>Role</span>
                    <span className={styles.metaValue}>{featured.role}</span>
                  </div>
                )}
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Stack</span>
                  <span className={styles.metaValue}>{featured.stack.join(", ")}</span>
                </div>
              </div>

              {featured.url && (
                <MagneticBtn>
                  <a
                    href={featured.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.visitBtn}
                    data-cursor="btn"
                  >
                    Visit site ↗
                  </a>
                </MagneticBtn>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── REMAINING PROJECTS ── */}
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

    </main>
  );
}
