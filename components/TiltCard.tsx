"use client";

import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export default function TiltCard({ children, className = "", href }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.015)`;
    el.style.zIndex = "2";
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.zIndex = "";
  };

  const shared = {
    ref,
    className: `tilt-card ${className}`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    style: { transition: "transform 0.15s ease" } as React.CSSProperties,
  };

  if (href) {
    return <a href={href} {...shared}>{children}</a>;
  }

  return <div {...shared}>{children}</div>;
}
