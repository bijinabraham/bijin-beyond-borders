"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import styles from "./Adrenaline.module.css";

const activities = [
  { name: "MMA",      tag: "Combat training",       seed: "mma-training",  horizon: false },
  { name: "Ski",      tag: "On the mountain",        seed: "ski-mountain",  horizon: false },
  { name: "Surf",     tag: "In the water",           seed: "ocean-surf",    horizon: false },
  { name: "Snorkel",  tag: "Beneath the surface",    seed: "snorkel-reef",  horizon: false },
  { name: "Skydive",  tag: "Coming soon",            seed: "sky-freefall",  horizon: true  },
  { name: "Scuba",    tag: "Coming soon",            seed: "scuba-deep",    horizon: true  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function Adrenaline() {
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
        <a href="/adrenaline" className={styles.seeAll}>All &rarr;</a>
      </div>

      <div className={styles.grid}>
        {activities.map((a, i) => (
          <TiltCard
            key={a.name}
            href={a.horizon ? undefined : `/adrenaline/${a.name.toLowerCase()}`}
            className={styles.card}
          >
            <img
              src={`https://picsum.photos/seed/${a.seed}/600/700`}
              alt={a.name}
              className={styles.img}
            />
            <div className={styles.overlay}>
              {a.horizon && (
                <span className={styles.badge}>On the horizon</span>
              )}
              <span className={styles.name}>{a.name}</span>
              <span className={styles.tag}>{a.tag}</span>
              <span className={styles.arrow}>Explore &rarr;</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
