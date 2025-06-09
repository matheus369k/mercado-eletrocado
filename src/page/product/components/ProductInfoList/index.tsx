import { ProductInfoItem } from './ProductInfoItem';
import { ProductType } from '@/@types/product';
import styles from './index.module.css';

type ProductInfListProps = Pick<
  ProductType,
  'screen' | 'processor' | 'memory' | 'placeVideo' | 'battery'
>;

export const ProductInfoList = ({
  screen,
  processor,
  memory,
  placeVideo,
  battery,
}: ProductInfListProps) => {
  return (
    <ul className={styles.product_info_container}>
      <ProductInfoItem label="Tela" info={screen} />
      <ProductInfoItem label="Processador" info={processor} />
      <ProductInfoItem label="Memoria" info={memory} />
      {placeVideo ? (
        <ProductInfoItem label="Placa de video" info={placeVideo} />
      ) : (
        <ProductInfoItem label="Bateria" info={battery} />
      )}
    </ul>
  );
};
