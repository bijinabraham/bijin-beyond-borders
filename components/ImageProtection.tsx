"use client";

import { useEffect } from "react";

export default function ImageProtection() {
  useEffect(() => {
    const block = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === "IMG") e.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    return () => document.removeEventListener("contextmenu", block);
  }, []);

  return null;
}
