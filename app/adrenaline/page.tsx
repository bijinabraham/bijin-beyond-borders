"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdrenalineIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/adrenaline/mma");
  }, [router]);
  return null;
}
