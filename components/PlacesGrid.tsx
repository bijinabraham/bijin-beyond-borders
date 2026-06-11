"use client";

import { motion } from "framer-motion";
import TiltCard from "./TiltCard";
import styles from "./PlacesGrid.module.css";

const places = [
  { city: "Tokyo",         country: "Japan",         img: "https://picsum.photos/seed/tokyo-jp/900/1100",    slug: "tokyo" },
  { city: "Las Vegas",     country: "United States", img: "/photos/las-vegas/hero.jpeg",                     slug: "las-vegas" },
  { city: "New York",      country: "United States", img: "/photos/new-york/hero.jpeg",                      slug: "new-york" },
  { city: "Kyoto",         country: "Japan",         img: "https://picsum.photos/seed/wb-kyoto/600/500",     slug: "kyoto" },
  { city: "Dubai",         country: "UAE",           img: "https://picsum.photos/seed/dubai-ae/600/500",     slug: "dubai" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function PlacesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Places
        </motion.h2>
        <a href="/travels" className={styles.seeAll}>All &rarr;</a>
      </div>

      <div className={styles.grid}>
        {places.map((p, i) => (
          <TiltCard
            key={p.city}
            href={`/travels/${p.slug}`}
            className={`${styles.card} ${i === 0 ? styles.cardLarge : ""}`}
          >
            <motion.div
              className={styles.imgWrap}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              whileInView={{ clipPath: "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.9, ease }}
            >
              <img
                src={p.img}
                alt={`${p.city}, ${p.country}`}
                className={styles.img}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </motion.div>
            <div className={styles.label}>
              <span className={styles.city}>{p.city}</span>
              <span className={styles.country}>{p.country}</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
