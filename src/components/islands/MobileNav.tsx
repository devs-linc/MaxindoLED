import { useState } from 'preact/hooks';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  links: NavLink[];
  waHref: string;
  waLabel: string;
}

export default function MobileNav({ links, waHref, waLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        class="flex h-10 w-10 items-center justify-center rounded-full text-ink"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {open ? (
            <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" />
          ) : (
            <path d="M3 6h18M3 12h18M3 18h18" stroke-linecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div
          class="absolute left-0 right-0 top-full border-t border-line bg-white px-4 py-4 shadow-xl"
        >
          <nav class="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                class="rounded-lg px-2 py-2 text-base text-body hover:bg-surface hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            class="btn-wa mt-4 w-full justify-center"
            rel="nofollow"
            target="_blank"
            href={waHref}
          >
            {waLabel}
          </a>
        </div>
      )}
    </div>
  );
}
