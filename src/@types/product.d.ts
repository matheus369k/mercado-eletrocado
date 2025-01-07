export type ProductIdType = number;
export type QuantityProductType = number;

export interface ProductType {
  id: number;
  price: number;
  model: string;
  img: string;
  slide: {
    slide1: string;
    slide2: string;
    slide3: string;
  };
  screen: string;
  processor: string;
  memory: string;
  placeVideo?: string;
  battery?: string;
  stock: number;
  category: string;
}

export interface ProductSelectedType {
  id: ProductIdType;
  data: Omit<ProductType, 'id'>;
}

export interface ProductCartAndEnvoyType extends ProductSelectedType {
  quantity: number;
}

export interface CategoryProductsType {
  notebook: ProductType[];
  tablet: ProductType[];
  phone: ProductType[];
}

export interface SliceProductCartAndEnvoyType extends Pick<ProductType, 'id' | 'price'> {
  quantity: number;
}
