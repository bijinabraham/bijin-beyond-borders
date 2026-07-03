"use client";

import { useRef, useEffect } from "react";
import { photo } from "@/lib/basePath";
import styles from "./PhotoTrail.module.css";

const PHOTOS = [
  photo("/photos/tokyo-2025/hero.jpeg"),
  photo("/photos/kyoto/hero.jpeg"),
  photo("/photos/las-vegas/hero.jpeg"),
  photo("/photos/los-angeles/hero.jpeg"),
  photo("/photos/montreal-2024/hero.jpg"),
  photo("/photos/new-york/hero.jpeg"),
  photo("/photos/new-york-sep-2024/hero.jpeg"),
  photo("/photos/niagara-falls/hero.jpeg"),
  photo("/photos/san-francisco/hero.jpeg"),
  photo("/photos/toronto-2024/hero.jpeg"),
  photo("/photos/yosemite/hero.jpeg"),
  photo("/photos/dubai/hero.png"),
  photo("/photos/quebec-city-2024/hero.jpeg"),
  photo("/photos/philadelphia/hero.jpg"),
];

const POOL = 10;
const DIST = 55;

export default function PhotoTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const container = containerRef.current;
    if (!container) return;

    const pool: HTMLDivElement[] = [];
    for (let i = 0; i < POOL; i++) {
      const div = document.createElement("div");
      div.className = styles.img;
      div.style.backgroundImage = `url(${PHOTOS[i % PHOTOS.length]})`;
      container.appendChild(div);
      pool.push(div);
    }

    // Container has pointer-events:none so listen on the parent (heroText div)
    const parent = container.parentElement;
    if (!parent) return;

    let idx = 0;
    let lastX = -999, lastY = -999;

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.hypot(x - lastX, y - lastY) < DIST) return;
      lastX = x; lastY = y;

      const el = pool[idx % POOL];
      idx++;

      const rot = (Math.random() - 0.5) * 20;
      el.style.backgroundImage = `url(${PHOTOS[idx % PHOTOS.length]})`;
      el.style.left      = (x - 60) + "px";
      el.style.top       = (y - 80) + "px";
      el.style.transform = `rotate(${rot}deg) scale(1)`;
      el.style.opacity   = "1";
      el.style.zIndex    = String(idx);

      clearTimeout((el as HTMLDivElement & { _t?: ReturnType<typeof setTimeout> })._t);
      (el as HTMLDivElement & { _t?: ReturnType<typeof setTimeout> })._t = setTimeout(() => {
        el.style.opacity   = "0";
        el.style.transform = `rotate(${rot}deg) scale(0.88) translateY(10px)`;
      }, 650);
    };

    parent.addEventListener("mousemove", onMove);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      pool.forEach(el => el.remove());
    };
  }, []);

  return <div ref={containerRef} className={styles.container} aria-hidden />;
}
