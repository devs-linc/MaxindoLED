import { describe, it, expect } from 'vitest';
import { estimate, type Line } from './Calculator';

describe('estimate', () => {
  it('multiplies pricePerDay * qty * days for a single line', () => {
    expect(estimate([{ pricePerDay: 1_000_000, qty: 2, days: 3 }])).toBe(6_000_000);
  });

  it('returns 0 for an empty list', () => {
    expect(estimate([])).toBe(0);
  });

  it('sums a two-line mix', () => {
    const lines: Line[] = [
      { pricePerDay: 2_500_000, qty: 1, days: 2 }, // 5_000_000
      { pricePerDay: 1_800_000, qty: 3, days: 2 }, // 10_800_000
    ];
    expect(estimate(lines)).toBe(15_800_000);
  });
});
