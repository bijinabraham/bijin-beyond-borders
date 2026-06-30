"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

const navLinks = [
  { href: "/travels",    label: "Travels" },
  { href: "/adrenaline", label: "Adrenaline" },
  { href: "/projects",   label: "Projects" },
  { href: "/map",        label: "Map" },
  { href: "/about",      label: "About" },
];

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const needleRef = useRef<SVGGElement>(null);
  const angleRef  = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    let rafId: number;
    let idle = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (!scrolled && y > 80) setScrolled(true);
      else if (scrolled && y < 40) setScrolled(false);
      const max = document.body.scrollHeight - window.innerHeight;
      targetRef.current = max > 100 ? (y / max) * 720 : 0;
    };

    function spin() {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max < 100) {
        idle += 0.12;
        targetRef.current = idle;
      }
      angleRef.current += (targetRef.current - angleRef.current) * 0.08;
      needleRef.current?.setAttribute("transform", `rotate(${angleRef.current}, 50, 50)`);
      rafId = requestAnimationFrame(spin);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    rafId = requestAnimationFrame(spin);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrolled]);

  // Close drawer on route change / resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.navRow}>
        <div className={styles.left}>
          <Link href="/" className={styles.brand}>
            <svg width="32" height="32" viewBox="0 0 80 80" fill="none" aria-hidden style={{ flexShrink: 0 }}>
              <circle cx="40" cy="40" r="37" stroke="currentColor" strokeWidth="2"/>
              <circle cx="40" cy="40" r="31" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2.5 2"/>
              <text x="40" y="47" textAnchor="middle" fontSize="20" fill="currentColor" fontFamily="serif">美人</text>
              <path id="nta" d="M 12 40 A 28 28 0 0 1 68 40" fill="none"/>
              <text fontFamily="sans-serif" fontSize="6" fill="currentColor" fontWeight="600" letterSpacing="3">
                <textPath href="#nta" startOffset="50%" textAnchor="middle">BIJIN · BEYOND</textPath>
              </text>
              <path id="nba" d="M 12 40 A 28 28 0 0 0 68 40" fill="none"/>
              <text fontFamily="sans-serif" fontSize="6" fill="currentColor" fontWeight="600" letterSpacing="5">
                <textPath href="#nba" startOffset="50%" textAnchor="middle">BORDERS</textPath>
              </text>
            </svg>
            <span>Bijin&nbsp;&nbsp;Beyond&nbsp;&nbsp;Borders</span>
          </Link>

          <svg className={styles.compass} viewBox="0 0 100 100" fill="none" aria-hidden>
            <circle cx="50" cy="50" r="46" className={styles.cRing} strokeWidth="1.5" />
            <line x1="50" y1="5"  x2="50" y2="14" className={styles.cRing} strokeWidth="2" />
            <line x1="50" y1="86" x2="50" y2="95" className={styles.cRing} strokeWidth="1" />
            <line x1="5"  y1="50" x2="14" y2="50" className={styles.cRing} strokeWidth="1" />
            <line x1="86" y1="50" x2="95" y2="50" className={styles.cRing} strokeWidth="1" />
            <text x="50" y="24" textAnchor="middle" className={styles.cLabelN}>N</text>
            <text x="50" y="82" textAnchor="middle" className={styles.cLabelMinor}>S</text>
            <text x="79" y="54" textAnchor="middle" className={styles.cLabelMinor}>E</text>
            <text x="21" y="54" textAnchor="middle" className={styles.cLabelMinor}>W</text>
            <g ref={needleRef}>
              <polygon points="50,16 45,50 55,50" className={styles.cNeedleN} />
              <polygon points="50,84 45,50 55,50" className={styles.cNeedleS} />
              <circle cx="50" cy="50" r="6"   className={styles.cPivotOuter} strokeWidth="1.5" />
              <circle cx="50" cy="50" r="2.5" className={styles.cPivotInner} />
            </g>
          </svg>
        </div>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map(l => (
            <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamOpen : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`} aria-hidden={!menuOpen}>
        <ul className={styles.drawerLinks}>
          {navLinks.map((l, i) => (
            <li key={l.href} style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className={menuOpen ? styles.drawerItemVisible : ""}>
              <Link href={l.href} onClick={() => setMenuOpen(false)}>
                <span>{l.label}</span>
                <span className={styles.drawerArrow}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
