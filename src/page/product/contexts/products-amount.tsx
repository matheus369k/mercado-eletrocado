import { createContext, useState } from 'react';

interface ProductsAmountContextType {
  productsAmount: number;
  handleAddProduct: () => void;
  handleRemoveProduct: () => void;
  handleResetProducts: () => void;
}

export const ProductAmountContext = createContext({} as ProductsAmountContextType);

export const ProductsAmountProvider = ({ children }: { children: React.ReactNode }) => {
  const [productsAmount, setProductsAmount] = useState(1);

  const handleAddProduct = () => {
    if (productsAmount === 9) return;

    setProductsAmount((state) => state + 1);
  };

  const handleRemoveProduct = () => {
    if (productsAmount === 1) return;

    setProductsAmount((state) => state - 1);
  };

  const handleResetProducts = () => {
    setProductsAmount(1);
  };

  return (
    <ProductAmountContext.Provider
      value={{ productsAmount, handleAddProduct, handleRemoveProduct, handleResetProducts }}>
      {children}
    </ProductAmountContext.Provider>
  );
};
