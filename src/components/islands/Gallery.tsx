import { useCallback, useEffect, useState } from 'preact/hooks';

export interface GalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: GalleryImage[];
}

export default function Gallery({ images }: Props) {
  // `index` is the currently open image, or null when the lightbox is closed.
  const [index, setIndex] = useState<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);

  const prev = useCallback(() => {
    setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === null ? i : (i + 1) % images.length));
  }, [images.length]);

  // Global keyboard controls while the overlay is open.
  useEffect(() => {
    if (!isOpen) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    }

    document.addEventListener('keydown', onKey);
    // Prevent the page behind the overlay from scrolling.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, prev, next]);

  const current = index === null ? null : images[index];

  return (
    <>
      <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {images.map((img, i) => (
          <li key={img.src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open image: ${img.alt}`}
              class="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20"
              />
            </button>
          </li>
        ))}
      </ul>

      {isOpen && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            class="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
            </svg>
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              class="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:left-6"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m15 18-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          )}

          {/* Image */}
          <figure
            class="max-h-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              class="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <figcaption class="mt-3 text-center text-sm text-muted">
              {current.alt}
              <span class="ml-2 text-white/40">
                {index! + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              class="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent md:right-6"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
