"use client";

import { useEffect } from "react";

// A short buzz when a link or button is tapped on a touch device.
// Works on Android browsers; iOS Safari ignores navigator.vibrate, so it's a no-op there.
export default function Haptics() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (typeof navigator.vibrate !== "function") return;
    const onTap = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest("a, button");
      if (el) navigator.vibrate(12);
    };
    document.addEventListener("pointerdown", onTap, { passive: true });
    return () => document.removeEventListener("pointerdown", onTap);
  }, []);
  return null;
}
