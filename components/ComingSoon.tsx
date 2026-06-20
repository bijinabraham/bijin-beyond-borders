"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./ComingSoon.module.css";

export default function ComingSoon({ slug }: { slug: string }) {
  const name = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className={styles.page}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className={styles.label}>In progress</p>
        <h1 className={styles.city}>{name}</h1>
        <p className={styles.body}>
          This page is being built. The story and photos will be here soon.
        </p>
        <Link href="/travels" className={styles.back}>
          &larr; Back to Travels
        </Link>
      </motion.div>
    </main>
  );
}
