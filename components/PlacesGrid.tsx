"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { photo } from "@/lib/basePath";
import { destinations } from "@/lib/travelsData";
import TiltCard from "./TiltCard";
import styles from "./PlacesGrid.module.css";

const FALLBACK_SEEDS: Record<string, string> = {
  "tokyo-2025": "tokyo-jp/900/1100",
  "las-vegas": "vegas-us/900/1100",
  "new-york":  "ny-us/900/1100",
  "kyoto":     "wb-kyoto/600/500",
  "dubai":     "dubai-ae/600/500",
};

const places = [
  { city: "Tokyo",     country: "Japan",         slug: "tokyo-2025" },
  { city: "Las Vegas", country: "United States", slug: "las-vegas" },
  { city: "New York",  country: "United States", slug: "new-york"  },
  { city: "Kyoto",     country: "Japan",         slug: "kyoto"     },
  { city: "Dubai",     country: "UAE",           slug: "dubai"     },
];

function placeHero(slug: string): string {
  const dest = destinations[slug];
  if (dest?.heroPhoto) return photo(`/photos/${slug}/${dest.heroPhoto}`);
  return `https://picsum.photos/seed/${FALLBACK_SEEDS[slug] ?? slug}`;
}

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
        <Link href="/travels" className={styles.seeAll}>All &rarr;</Link>
      </div>

      <div className={styles.grid}>
        {places.map((p, i) => (
          <TiltCard
            key={p.city}
            href={`/travels/${p.slug}`}
            className={`${styles.card} ${i === 0 ? styles.cardLarge : ""}`}
          >
            <div className={styles.imgWrap}>
              <img draggable={false}
                src={placeHero(p.slug)}
                alt={`${p.city}, ${p.country}`}
                className={styles.img}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
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
