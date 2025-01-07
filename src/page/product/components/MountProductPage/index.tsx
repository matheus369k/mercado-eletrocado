import { ProductInfoList, ProductPreviewSlide, BoyProductControls } from '..';
import { PriceStockInfo, FavoriteButton } from '@/components';
import { ProductType } from '@/@types/product';
import styles from './index.module.css';

export const MountProductPage = ({ datas }: { datas: ProductType }) => {
  return (
    <div className={styles.product_all_info_display}>
      <h3>{datas.model}</h3>
      <ProductPreviewSlide img={datas.img} model={datas.model} slide={datas.slide} />
      <ProductInfoList
        battery={datas.battery}
        memory={datas.memory}
        placeVideo={datas.placeVideo}
        processor={datas.processor}
        screen={datas.screen}
      />
      <PriceStockInfo
        customClass="product_all_info"
        id={datas.id}
        price={datas.price}
        stock={datas.stock}
      />
      <FavoriteButton customClass="product_all_info" id={datas.id} />
      <BoyProductControls price={datas.price} id={datas.id} />
    </div>
  );
};
