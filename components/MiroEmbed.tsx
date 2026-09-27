"use client";

import { useState } from "react";

// Miro's live embed loads and draws slowly, and shows a blank box meanwhile.
// We show a still preview of the same frame straight away and fade the live
// board in over it a moment after its iframe finishes loading.
export default function MiroEmbed({ src, preview, title }: { src: string; preview: string; title: string }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="miro-embed">
      <img className="miro-preview" src={preview} alt="" aria-hidden="true" />
      <iframe
        src={src}
        title={title}
        loading="eager"
        allowFullScreen
        className={ready ? "is-ready" : ""}
        onLoad={() => setTimeout(() => setReady(true), 1500)}
      />
    </div>
  );
}
