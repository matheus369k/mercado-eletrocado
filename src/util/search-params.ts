export const searchParams = {
  getSearchParam: (key: string) => {
    const url = new URL(window.location.toString());
    return url.searchParams.get(key);
  },
  addSearchParam: ({ key, value }: { key: string; value: string }) => {
    const url = new URL(window.location.toString());
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
  },
};
