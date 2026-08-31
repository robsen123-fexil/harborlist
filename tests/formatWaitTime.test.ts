import { describe, it, expect } from 'vitest';
import { formatWaitTime, formatLength } from '@/utils/formatWaitTime';

describe('formatWaitTime', () => {
  it('returns em dash for zero or negative minutes', () => {
    expect(formatWaitTime(0)).toBe('—');
    expect(formatWaitTime(-5)).toBe('—');
  });

  it('formats minutes under an hour', () => {
    expect(formatWaitTime(45)).toBe('45m');
  });

  it('formats whole hours', () => {
    expect(formatWaitTime(120)).toBe('2h');
  });

  it('formats hours and minutes', () => {
    expect(formatWaitTime(75)).toBe('1h 15m');
  });
});

describe('formatLength', () => {
  it('formats length in feet', () => {
    expect(formatLength(32)).toBe('32 ft');
  });
});
