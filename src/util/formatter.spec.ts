import { describe, it, expect } from 'vitest';
import { formatter } from './formatter';

describe('formatted function', () => {
  it('should formatted date how 31/12/1969', () => {
    const date = new Date(0).toString();
    expect(formatter.dateDefault(date)).toBe('31/12/1969');
  });
});
