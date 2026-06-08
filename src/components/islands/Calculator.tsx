import { useMemo, useState } from 'preact/hooks';
import { waLink } from '../../consts';

/** A single line in the rental estimate. */
export type Line = { pricePerDay: number; qty: number; days: number };

/**
 * Pure estimator: sum of pricePerDay * qty * days across every line.
 * Returns 0 for an empty list. No side effects, no formatting.
 */
export function estimate(lines: Line[]): number {
  return lines.reduce((total, { pricePerDay, qty, days }) => total + pricePerDay * qty * days, 0);
}

interface CatalogItem {
  id: string;
  name: { id: string; en: string };
  pricePerDay: number;
}

/** Representative rental catalog (daily prices in IDR). */
const CATALOG: CatalogItem[] = [
  { id: 'led-p39-indoor', name: { id: 'LED Screen P3.9 Indoor (per m²)', en: 'LED Screen P3.9 Indoor (per m²)' }, pricePerDay: 2_500_000 },
  { id: 'led-p49-outdoor', name: { id: 'LED Screen P4.9 Outdoor (per m²)', en: 'LED Screen P4.9 Outdoor (per m²)' }, pricePerDay: 3_000_000 },
  { id: 'sound-system', name: { id: 'Sound System (2000 Watt)', en: 'Sound System (2000 Watt)' }, pricePerDay: 1_800_000 },
  { id: 'lighting-par', name: { id: 'Lighting PAR LED (set 8)', en: 'PAR LED Lighting (set of 8)' }, pricePerDay: 1_200_000 },
  { id: 'projector', name: { id: 'Projector 6000 Lumen', en: 'Projector 6000 Lumen' }, pricePerDay: 900_000 },
  { id: 'video-switcher', name: { id: 'Video Switcher & Operator', en: 'Video Switcher & Operator' }, pricePerDay: 1_500_000 },
  { id: 'truss-rigging', name: { id: 'Truss & Rigging (per set)', en: 'Truss & Rigging (per set)' }, pricePerDay: 1_000_000 },
  { id: 'genset', name: { id: 'Genset 50 KVA', en: 'Generator 50 KVA' }, pricePerDay: 2_000_000 },
];

interface Props {
  lang: 'id' | 'en';
}

const COPY = {
  id: {
    item: 'Peralatan',
    pricePerDay: 'Harga / hari',
    qty: 'Jumlah',
    days: 'Durasi sewa (hari)',
    total: 'Perkiraan total',
    decrease: 'Kurangi',
    increase: 'Tambah',
    waCta: 'Kirim Penawaran via WhatsApp',
    empty: 'Pilih minimal satu peralatan untuk membuat penawaran.',
    waHeader: 'Halo Maxindo LED, saya ingin meminta penawaran untuk:',
    waDays: 'hari',
    waTotal: 'Perkiraan total',
    waFooter: 'Mohon konfirmasi ketersediaan dan harga final. Terima kasih.',
  },
  en: {
    item: 'Equipment',
    pricePerDay: 'Price / day',
    qty: 'Qty',
    days: 'Rental duration (days)',
    total: 'Estimated total',
    decrease: 'Decrease',
    increase: 'Increase',
    waCta: 'Send quote via WhatsApp',
    empty: 'Select at least one item to build a quote.',
    waHeader: 'Hello Maxindo LED, I would like a quote for:',
    waDays: 'day(s)',
    waTotal: 'Estimated total',
    waFooter: 'Please confirm availability and the final price. Thank you.',
  },
} as const;

const formatIDR = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

export default function Calculator({ lang }: Props) {
  const c = COPY[lang];
  const [days, setDays] = useState(1);
  const [qtys, setQtys] = useState<Record<string, number>>(() =>
    Object.fromEntries(CATALOG.map((item) => [item.id, 0])),
  );

  const safeDays = Math.max(1, days || 1);

  const selected = useMemo(
    () => CATALOG.filter((item) => (qtys[item.id] ?? 0) > 0),
    [qtys],
  );

  const total = useMemo(
    () =>
      estimate(
        selected.map((item) => ({
          pricePerDay: item.pricePerDay,
          qty: qtys[item.id],
          days: safeDays,
        })),
      ),
    [selected, qtys, safeDays],
  );

  const setQty = (id: string, value: number) =>
    setQtys((prev) => ({ ...prev, [id]: Math.max(0, value) }));

  const buildMessage = () => {
    const lines = selected.map((item) => {
      const qty = qtys[item.id];
      const lineTotal = item.pricePerDay * qty * safeDays;
      return `• ${item.name[lang]} × ${qty} × ${safeDays} ${c.waDays} = ${formatIDR(lineTotal)}`;
    });
    return [
      c.waHeader,
      '',
      ...lines,
      '',
      `${c.waTotal}: ${formatIDR(total)}`,
      '',
      c.waFooter,
    ].join('\n');
  };

  const waHref = waLink(buildMessage());

  return (
    <div class="rounded-xl border border-white/10 bg-surface p-5 md:p-6">
      {/* Days input */}
      <div class="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label for="rental-days" class="text-sm font-semibold text-white/90">
          {c.days}
        </label>
        <input
          id="rental-days"
          type="number"
          min={1}
          inputMode="numeric"
          value={days}
          onInput={(e) => setDays(parseInt((e.currentTarget as HTMLInputElement).value, 10) || 1)}
          class="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-white sm:w-28"
        />
      </div>

      {/* Catalog list */}
      <ul class="divide-y divide-white/10">
        {CATALOG.map((item) => {
          const qty = qtys[item.id] ?? 0;
          return (
            <li
              key={item.id}
              class="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div class="min-w-0">
                <p class="font-medium text-white">{item.name[lang]}</p>
                <p class="text-sm text-muted">
                  {c.pricePerDay}: {formatIDR(item.pricePerDay)}
                </p>
              </div>

              <div class="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={c.decrease}
                  onClick={() => setQty(item.id, qty - 1)}
                  class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-lg text-white hover:bg-white/5"
                >
                  −
                </button>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  aria-label={`${c.qty} ${item.name[lang]}`}
                  value={qty}
                  onInput={(e) =>
                    setQty(item.id, parseInt((e.currentTarget as HTMLInputElement).value, 10) || 0)
                  }
                  class="w-14 rounded-lg border border-white/10 bg-bg px-2 py-1.5 text-center text-white"
                />
                <button
                  type="button"
                  aria-label={c.increase}
                  onClick={() => setQty(item.id, qty + 1)}
                  class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-lg text-white hover:bg-white/5"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Live total */}
      <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
        <span class="text-sm font-semibold uppercase tracking-wide text-muted">{c.total}</span>
        <span class="text-2xl font-extrabold text-accent">{formatIDR(total)}</span>
      </div>

      {/* WhatsApp CTA */}
      <div class="mt-5">
        {selected.length === 0 ? (
          <p class="text-sm text-muted">{c.empty}</p>
        ) : (
          <a class="btn-wa w-full justify-center" rel="nofollow" target="_blank" href={waHref}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.717zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            {c.waCta}
          </a>
        )}
      </div>
    </div>
  );
}
