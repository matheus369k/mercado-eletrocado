export const getCache = (key: string, stateproduct: number[]) => {
  const ProductsString: string | null = localStorage.getItem(key);
  const newStateArray: number[] = [];

  if (stateproduct.length == 0 && ProductsString != null) {
    for (const Productsid of ProductsString.split(",")) {
      newStateArray.push(parseInt(Productsid));
    }
  }

  return newStateArray;
};

export const deleteCache = (...keys: string[]) => {
  for (const item of keys) {
    localStorage.removeItem(item);
  }
};
