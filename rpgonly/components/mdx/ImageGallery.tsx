"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="my-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(img)}
            className="relative aspect-video overflow-hidden rounded-lg cursor-zoom-in"
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={() => setActive(null)}
        >
          <div className="relative max-w-3xl w-full max-h-full">
            <Image
              src={active.src}
              alt={active.alt}
              width={1200}
              height={800}
              className="rounded-lg object-contain w-full h-auto"
            />
            {active.caption && (
              <p
                className="mt-3 text-sm text-center"
                style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-jetbrains)" }}
              >
                {active.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
