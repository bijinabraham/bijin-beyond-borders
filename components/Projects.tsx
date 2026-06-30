"use client";

import { motion } from "framer-motion";
import styles from "./Projects.module.css";

const projects = [
  { num: "01", name: "Sculptura",     desc: "Marketing site for a foam tool insert manufacturer. Built with Next.js, Framer Motion, and Sanity CMS.", tag: "Website", year: "2025", url: "https://dsculptura.in/" },
  { num: "02", name: "Project Two",   desc: "Something built from scratch: what problem it solves, who uses it.", tag: "Mobile",  year: "2024", url: null },
  { num: "03", name: "Project Three", desc: "Another build: the context, the stack, the outcome.",               tag: "Tool",    year: "2023", url: null },
];

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
        >
          <span className={styles.num}>{p.num}</span>
          <span className={styles.info}>
            <span className={styles.name}>{p.name}</span>
            <span className={styles.desc}>{p.desc}</span>
          </span>
          <span className={styles.meta}>
            <span className={styles.tag}>{p.tag}</span>
            <span className={styles.year}>{p.year}</span>
          </span>
          <span className={styles.arrow}>&rarr;</span>
        </motion.a>
      ))}
    </section>
  );
}
