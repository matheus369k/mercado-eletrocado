import { describe, it, expect, vi } from 'vitest';
import { formatter } from './formatter';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('formatted function', () => {
  const formattedDateRegex =
    /^(?:([0-2]?\d|3[01])\/(0?\d|1[0-2])\/\d{4}|(0?\d|1[0-2])\/([0-2]?\d|3[01])\/\d{4})$/;

  it('should formatted date as DD/MM/YYYY or MM/DD/YYYY', () => {
    const formattedDate = formatter.dateDefault(faker.date.past().toISOString());

    expect(formattedDateRegex.test(formattedDate)).toBeTruthy();
  });
});
