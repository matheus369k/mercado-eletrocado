import { describe, expect, it } from 'vitest';
import { browserLocalStorage } from './browser-storage';

describe('browser local storage function', () => {
  const localStorageProps = {
    key: 'product',
    value: { name: 'test', type: 'product' },
  };
  const localStorageValeuString = JSON.stringify(localStorageProps.value);

  const localStorageGet = (key: string) => {
    return window.localStorage.getItem(key);
  };

  const localStorageSet = ({ key, value }: { key: string; value: string }) => {
    window.localStorage.setItem(key, value);
  };

  it('should set variable to storage', () => {
    browserLocalStorage.add({
      key: localStorageProps.key,
      value: localStorageValeuString,
    });

    expect(localStorageGet('product')).toBe(localStorageValeuString);
  });

  it('should get variable to storage', () => {
    localStorageSet({ key: localStorageProps.key, value: localStorageValeuString });
    const storageValue = browserLocalStorage.get(localStorageProps.key);

    expect(storageValue).toMatchObject(localStorageProps.value);
  });

  it('should remove variable to storage', () => {
    localStorageSet({ key: localStorageProps.key, value: localStorageValeuString });
    expect(localStorageGet(localStorageProps.key)).toBe(localStorageValeuString);

    browserLocalStorage.remove(localStorageProps.key);
    expect(localStorageGet(localStorageProps.key)).toBeNull();
  });

  it('should remove all variables to storage', () => {
    localStorageSet({ key: localStorageProps.key, value: localStorageValeuString });
    localStorageSet({ key: localStorageProps.key.concat('-1'), value: localStorageValeuString });

    expect(localStorageGet(localStorageProps.key)).toBe(localStorageValeuString);
    expect(localStorageGet(localStorageProps.key.concat('-1'))).toBe(localStorageValeuString);

    browserLocalStorage.removeAll();

    expect(localStorageGet(localStorageProps.key)).toBeNull();
    expect(localStorageGet(localStorageProps.key.concat('-1'))).toBeNull();
  });
});
