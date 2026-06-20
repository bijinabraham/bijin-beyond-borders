"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Lightbox.module.css";

interface Props {
  photos: string[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ photos, index, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.img draggable={false}
            key={index}
            src={photos[index]}
            alt=""
            className={styles.img}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          />

          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>

          {photos.length > 1 && (
            <>
              <button
                className={`${styles.nav} ${styles.navPrev}`}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                className={`${styles.nav} ${styles.navNext}`}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next"
              >
                ›
              </button>
            </>
          )}

          <p className={styles.counter}>{(index + 1)} / {photos.length}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
