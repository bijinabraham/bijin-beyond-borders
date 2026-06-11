"use client";

import { motion } from "framer-motion";
import styles from "./about.module.css";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { delay, duration: 0.65, ease },
});

const adventures = [
  { name: "MMA",      tag: "Combat",        seed: "mma-training" },
  { name: "Ski",      tag: "Mountain",      seed: "ski-mountain" },
  { name: "Surf",     tag: "Ocean",         seed: "ocean-surf"   },
  { name: "Snorkel",  tag: "Underwater",    seed: "snorkel-reef" },
  { name: "Skydive",  tag: "Soon",          seed: "sky-freefall" },
  { name: "Scuba",    tag: "Soon",          seed: "scuba-deep"   },
];

const connect = [
  { label: "Instagram", handle: "@bijinbeyondborders", href: "https://instagram.com/bijinbeyondborders" },
  { label: "LinkedIn",  handle: "linkedin.com/in/bijinabraham", href: "https://linkedin.com/in/bijinabraham" },
  { label: "GitHub",    handle: "github.com/bijinabraham",     href: "https://github.com/bijinabraham" },
];

export default function AboutPage() {
  return (
    <main className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <motion.p className={styles.heroOverline} {...fadeUp(0.1)}>
            About
          </motion.p>
          <h1 className={styles.heroTitle}>
            {["A person", "who builds", "and goes"].map((line, i) => (
              <motion.span
                key={line}
                className={`${styles.heroLine} ${i === 1 ? styles.heroLineAccent : ""} ${i === 2 ? styles.heroLineOutline : ""}`}
                initial={{ clipPath: "inset(0 0 110% 0)" }}
                animate={{ clipPath: "inset(-20% -5% -20% -5%)" }}
                transition={{ delay: 0.3 + i * 0.13, duration: 0.85, ease }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p className={styles.heroDesc} {...fadeUp(0.75)}>
            Software professional. Relentless traveler. Someone who found
            that the best way to understand the world is to move through
            all of it, slowly.
          </motion.p>
        </div>
        <div className={styles.heroImage}>
          <motion.img
            src="https://picsum.photos/seed/wb-portrait/800/1000"
            alt="Portrait"
            className={styles.heroImg}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1.1, ease }}
          />
        </div>
      </section>

      {/* ── BIO ── */}
      <section className={styles.bio}>
        <motion.p className={styles.bioPullQuote} {...fadeUp(0)}>
          "I build things by day and go places by every other chance I get."
        </motion.p>
        <div className={styles.bioColumns}>
          <motion.div {...fadeUp(0.1)}>
            <p>
              Based wherever the next project or mountain takes me. I work
              in tech, building products that live in browsers and pockets.
              I care about craft whether I am writing code or reading a wave.
            </p>
            <p>
              The name Bijin Beyond Borders is a reflection of how I
              move through life: with attention, intention, and a quiet
              refusal to stay in one lane.
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.18)}>
            <p>
              Fifteen countries in, fifty-five cities down, and the list
              keeps growing. Japan has a piece of my soul. Europe keeps
              pulling me back. The Americas are still revealing themselves.
            </p>
            <p>
              This site is the archive. The record of what I have built,
              where I have been, and how far I am willing to push to find
              out what comes next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section className={styles.work}>
        <div className={styles.workInner}>
          <div className={styles.workLeft}>
            <motion.h2 className={styles.sectionTitle} {...fadeUp(0)}>
              What I do
            </motion.h2>
            <motion.p className={styles.workDesc} {...fadeUp(0.1)}>
              I work at the intersection of product thinking and technical
              execution. I care about the details that most people skip.
            </motion.p>
          </div>
          <div className={styles.workRight}>
            {[
              { area: "Web applications",  detail: "Full-stack, browser-first products" },
              { area: "Mobile apps",       detail: "iOS and Android, React Native" },
              { area: "Product design",    detail: "Systems, flows, and sharp interfaces" },
              { area: "Infrastructure",    detail: "APIs, data pipelines, cloud architecture" },
              { area: "Team leadership",   detail: "Building and growing high-performing tech teams" },
              { area: "Value selling",     detail: "Articulating technology's impact in business terms" },
            ].map((item, i) => (
              <motion.div key={item.area} className={styles.workItem} {...fadeUp(i * 0.07)}>
                <span className={styles.workArea}>{item.area}</span>
                <span className={styles.workDetail}>{item.detail}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADVENTURES ── */}
      <section className={styles.adventures}>
        <div className={styles.adventuresHeader}>
          <motion.h2 className={styles.sectionTitle} {...fadeUp(0)}>
            Beyond work
          </motion.h2>
          <motion.a href="/adrenaline" className={styles.seeAll} {...fadeUp(0.1)}>
            All adventures &rarr;
          </motion.a>
        </div>
        <div className={styles.adventureGrid}>
          {adventures.map((a, i) => (
            <motion.div
              key={a.name}
              className={styles.adventureCard}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              {/* Tint overlay */}
              <div className={styles.adventureTint} />
              <img
                src={`https://picsum.photos/seed/${a.seed}/400/500`}
                alt={a.name}
                className={styles.adventureImg}
              />
              <div className={styles.adventureMeta}>
                {(a.tag === "Soon") && (
                  <span className={styles.adventureBadge}>On the horizon</span>
                )}
                <span className={styles.adventureName}>{a.name}</span>
                <span className={styles.adventureTag}>{a.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONNECT ── */}
      <section className={styles.connect}>
        <motion.h2 className={styles.sectionTitle} {...fadeUp(0)}>
          Say hello
        </motion.h2>
        <div className={styles.connectList}>
          {connect.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.connectItem}
              {...fadeUp(i * 0.08)}
            >
              <span className={styles.connectLabel}>{item.label}</span>
              <span className={styles.connectHandle}>{item.handle}</span>
              <span className={styles.connectArrow}>&rarr;</span>
            </motion.a>
          ))}
        </div>
      </section>

    </main>
  );
}
