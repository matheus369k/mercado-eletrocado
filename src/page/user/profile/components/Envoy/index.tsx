import { TbTruckDelivery } from 'react-icons/tb';
import { ProductsSlider } from '@/components';
import styles from './index.module.css';
import '@/styles/card-Products.css';

export const EnvoyProducts = () => {
  return (
    <section className={styles.envoy_product_container}>
      <h2 className={styles.envoy_container_title}>
        <TbTruckDelivery />
        Enviados
      </h2>
      <div className={styles.envoy_products_list}>
        <ProductsSlider showSlider={2} storeType="envoy" />
      </div>
    </section>
  );
};
