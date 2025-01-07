import { createContext, useState } from 'react';

interface ProductsLessContextType {
  productsLessCount: number;
  handleAddProductCount: () => void;
  handleRemoveProductCount: () => void;
  handleResetProductsCount: () => void;
}

export const ProductLessContext = createContext({} as ProductsLessContextType);

export const ProductsLessProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsLessCount, setProductsLessCounts] = useState(1);

  const handleAddProductCount = () => {
    if (productsLessCount === 9) return;

    setProductsLessCounts((state) => state + 1);
  };

  const handleRemoveProductCount = () => {
    if (productsLessCount === 1) return;

    setProductsLessCounts((state) => state - 1);
  };

  const handleResetProductsCount = () => {
    setProductsLessCounts(1);
  };

  return (
    <ProductLessContext.Provider
      value={{
        productsLessCount,
        handleAddProductCount,
        handleRemoveProductCount,
        handleResetProductsCount,
      }}>
      {children}
    </ProductLessContext.Provider>
  );
};
