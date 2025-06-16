export const browserLocalStorage = {
  add: ({ key, value }: { key: string; value: string }) => {
    window.localStorage.setItem(key, value);
  },
  get: (key: string) => {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  remove: (key: string) => {
    window.localStorage.removeItem(key);
  },
  removeAll: () => {
    window.localStorage.clear();
  },
};

export const browserSessionStorage = {
  add: ({ key, value }: { key: string; value: string }) => {
    window.sessionStorage.setItem(key, value);
  },
  get: (key: string) => {
    const value = window.sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  },
  remove: (key: string) => {
    window.sessionStorage.removeItem(key);
  },
  removeAll: () => {
    window.sessionStorage.clear();
  },
};
