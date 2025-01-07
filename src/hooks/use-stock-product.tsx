import { RemoveDivisionOfDatasForCategory } from '@/functions';
import { ProductType } from '@/@types/product';
import { appUseSelector } from '@/redux/hook';

interface HandleCartHasAllProductsOfStockProps extends Pick<ProductType, 'id'> {
  productsAmount: number;
}

interface HandleIsSelectAllProductToRemove extends Pick<ProductType, 'id'> {
  productsLessCount: number;
}

export const useStockProduct = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { datas } = appUseSelector((state) => state.product);
  const stockAllProducts = RemoveDivisionOfDatasForCategory(datas);

  const handleIsStockEmpty = ({ id }: Pick<ProductType, 'id'>) => {
    const productInStockQuantity = stockAllProducts.find((product) => product.id === id)?.stock || 0;
    const storeProductCartQuantity = cartProducts.find((product) => product.id === id)?.quantity || 0;

    const isStockEmpty = productInStockQuantity <= storeProductCartQuantity;

    return {
      isStockEmpty,
    };
  };

  const handleCartHasAllProductsOfStock = ({
    id,
    productsAmount,
  }: HandleCartHasAllProductsOfStockProps) => {
    const productInStockQuantity = stockAllProducts.find((product) => product.id === id)?.stock || 0;
    const storeProductCartQuantity = cartProducts.find((product) => product.id === id)?.quantity || 0;

    const hasCartAllProductsOfStock =
      productInStockQuantity <= productsAmount + storeProductCartQuantity;

    return {
      hasCartAllProductsOfStock,
    };
  };

  const handleIsSelectAllProductToRemove = ({
    id,
    productsLessCount,
  }: HandleIsSelectAllProductToRemove) => {
    const storeProductCartQuantity = cartProducts.find((product) => product.id === id)?.quantity || 0;

    const isGetAllProductToRemove = storeProductCartQuantity <= productsLessCount;

    return {
      isGetAllProductToRemove,
    };
  };

  return {
    handleIsStockEmpty,
    handleCartHasAllProductsOfStock,
    handleIsSelectAllProductToRemove,
  };
};
