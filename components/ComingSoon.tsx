"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ComingSoon.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

export default function ComingSoon({ slug }: { slug: string }) {
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const heroSrc = `https://picsum.photos/seed/${slug}-hero/1600/900`;
  const galleryPhotos = [1, 2, 3, 4, 5].map(
    (n) => `https://picsum.photos/seed/${slug}-g${n}/500/420`
  );

  return (
    <article>
      <div className={styles.hero}>
        <motion.img
          draggable={false}
          src={heroSrc}
          alt={name}
          className={styles.heroImg}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.p
            className={styles.heroLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            In progress
          </motion.p>
          <motion.h1
            className={styles.heroCity}
            initial={{ clipPath: "inset(0 0 110% 0)" }}
            animate={{ clipPath: "inset(-20% -5% -20% -5%)" }}
            transition={{ delay: 0.45, duration: 0.9, ease }}
          >
            {name}
          </motion.h1>
          <motion.p
            className={styles.heroNote}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55 }}
          >
            The story and photos will be here soon.
          </motion.p>
        </div>
      </div>

      <div className={styles.gallery}>
        {galleryPhotos.map((src, i) => (
          <div key={i} className={styles.galleryCell}>
            <img
              draggable={false}
              src={src}
              alt={`${name} placeholder ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      <Link href="/travels" className={styles.back}>
        &larr; Back to Travels
      </Link>
    </article>
  );
}
