export type ProductIdType = string;
export type QuantityProductType = number;

export interface ProductType {
  _id: string;
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
  category: string;
}

export interface ProductSelectedType {
  _id: ProductIdType;
  data: Omit<ProductType, 'id'>;
}

export interface CategoryProductsType {
  notebook: ProductType[];
  tablet: ProductType[];
  phone: ProductType[];
}

export interface SliceProductCartType {
  data: ProductType;
  quantity: number;
}

export interface SliceProductEnvoyType {
  products: SliceProductCartType[];
  arrival_at: string;
  payment_type: string;
}
