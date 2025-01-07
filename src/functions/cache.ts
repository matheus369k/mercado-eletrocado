export const getCache = (key: string) => {
  const productsCacheDatas: string | null = localStorage.getItem(key);

  if (!productsCacheDatas) return [];

  return JSON.parse(productsCacheDatas);
};

export const updateCache = <T>({ datas, key }: { key: string; datas: T | number[] }) => {
  localStorage.setItem(key, JSON.stringify(datas));
};

export const deleteCache = (...keys: string[]) => {
  for (const item of keys) {
    localStorage.removeItem(item);
  }
};
