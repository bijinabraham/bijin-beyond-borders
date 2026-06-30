"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projectsData";
import styles from "./Projects.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Projects() {
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
          Projects
        </motion.h2>
        <Link href="/projects" className={styles.seeAll}>All &rarr;</Link>
      </div>

      {projects.map((p, i) => (
        <motion.a
          key={p.num}
          href={p.url ?? "#"}
          target={p.url ? "_blank" : undefined}
          rel={p.url ? "noopener noreferrer" : undefined}
          className={styles.item}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.08, duration: 0.55, ease }}
          data-cursor="card"
        >
          <span className={styles.num}>{p.num}</span>

          <span className={styles.info}>
            <span className={styles.name}>{p.name}</span>
            <span className={styles.desc}>{p.desc}</span>
            {p.stack.length > 0 && (
              <span className={styles.chips}>
                {p.live && <span className={`${styles.chip} ${styles.chipLive}`}>Live</span>}
                {p.stack.map(s => (
                  <span key={s} className={styles.chip}>{s}</span>
                ))}
              </span>
            )}
          </span>

          <span className={styles.meta}>
            <span className={styles.tag}>{p.tag}</span>
            <span className={styles.year}>{p.year}</span>
            {p.url && <span className={styles.extLink}>↗ {new URL(p.url).hostname}</span>}
          </span>

          <span className={styles.arrow}>→</span>
        </motion.a>
      ))}
    </section>
  );
}
