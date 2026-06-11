"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.span
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.025 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
          }}
          style={{ display: "inline-block", marginInlineEnd: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function About() {
  return (
    <section className={styles.section}>
      <div className={styles.textPanel}>
        <motion.p
          className={styles.tag}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          Who I am
        </motion.p>

        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
        >
          Slow<br />
          <span className={styles.outline}>Looking</span><br />
          Far<br />
          <span className={styles.outline}>Going</span>
        </motion.h2>

        <div className={styles.body}>
          <p>
            <WordReveal text="I move through places the way some people move through books, completely, with attention to the margins. This site is where I keep what stays with me." />
          </p>
          <p>
            <WordReveal text="Part travel record, part creative archive. No itineraries, no optimization. Just the things worth remembering." />
          </p>
        </div>
      </div>

      <motion.div
        className={styles.imagePanel}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.15, duration: 0.8 }}
      >
        <img
          src="https://picsum.photos/seed/wb-portrait/700/900"
          alt="Portrait"
          className={styles.portrait}
        />
      </motion.div>
    </section>
  );
}
