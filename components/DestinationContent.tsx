"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Destination } from "@/lib/travelsData";
import { photo } from "@/lib/basePath";
import styles from "@/app/travels/[slug]/destination.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

export default function DestinationContent({ dest }: { dest: Destination }) {
  const hasPhotos = (dest.photos?.length ?? 0) > 0;

  const heroSrc = hasPhotos
    ? photo(`/photos/${dest.slug}/${dest.heroPhoto ?? "hero.jpg"}`)
    : `https://picsum.photos/seed/${dest.heroSeed}/1600/900`;

  const galleryPhotos = hasPhotos
    ? dest.photos!.map((f) => photo(`/photos/${dest.slug}/${f}`))
    : [1, 2, 3, 4, 5].map((n) => `https://picsum.photos/seed/${dest.gallerySeed}-g${n}/500/420`);

  return (
    <article>

      {/* ── HERO ── */}
      <div className={styles.hero}>
        <motion.img
          src={heroSrc}
          alt={dest.name}
          className={styles.heroImg}
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <motion.p
            className={styles.heroRegion}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {dest.country} &mdash; {dest.region}
          </motion.p>
          <motion.h1
            className={styles.heroCity}
            initial={{ clipPath: "inset(0 0 110% 0)" }}
            animate={{ clipPath: "inset(-20% -5% -20% -5%)" }}
            transition={{ delay: 0.45, duration: 0.9, ease }}
          >
            {dest.name}
          </motion.h1>
          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55 }}
          >
            <span>
              {Math.abs(dest.lat).toFixed(4)}°{dest.lat > 0 ? "N" : "S"}
              &nbsp;
              {Math.abs(dest.lng).toFixed(4)}°{dest.lng > 0 ? "E" : "W"}
            </span>
            <span className={styles.heroMetaSep} />
            <span>Visited <strong>{dest.visitDate}</strong></span>
            <span className={styles.heroMetaSep} />
            <span><strong>{dest.duration}</strong></span>
          </motion.div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className={styles.body}>

        <div className={styles.story}>
          <motion.p
            className={styles.storyLead}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
          >
            {dest.highlights[0]}
          </motion.p>
          {dest.story.map((para, i) => (
            <motion.p
              key={i}
              className={styles.storyPara}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.locationBlock}>
            <p className={styles.sideLabel}>Location</p>
            <p className={styles.coords}>
              {Math.abs(dest.lat).toFixed(4)}°{dest.lat > 0 ? "N" : "S"}<br />
              {Math.abs(dest.lng).toFixed(4)}°{dest.lng > 0 ? "E" : "W"}
            </p>
            <p className={styles.region}>{dest.region}</p>
            <div className={styles.miniMap}>
              <div className={styles.miniRing} />
              <div className={styles.miniDot} />
            </div>
          </div>

          <div className={styles.highlightsBlock}>
            <p className={styles.sideLabel}>Highlights</p>
            {dest.highlights.map((h, i) => (
              <div key={i} className={styles.highlightItem}>
                <span className={styles.highlightNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.highlightText}>{h}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ── GALLERY ── */}
      <div className={styles.gallery}>
        {galleryPhotos.map((src, i) => (
          <div key={i} className={styles.galleryCell}>
            <img
              src={src}
              alt={`${dest.name} ${i + 1}`}
              loading={i < 3 ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* ── NEXT DESTINATION ── */}
      <Link href={`/travels/${dest.nextSlug}`} className={styles.nextDest}>
        <div>
          <p className={styles.nextLabel}>Next destination</p>
          <p className={styles.nextName}>{dest.nextName}</p>
        </div>
        <span className={styles.nextArrow}>&rarr;</span>
      </Link>

    </article>
  );
}
