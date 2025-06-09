import { TitleRoot, TitleContent, Button } from '@/components';
import ShredderIcon from '@/assets/Shredder.svg';
import { appUseSelector } from '@/redux/hook';
import { useRedirect } from '@/hooks';
import { ProductCard } from './components';
import styles from './index.module.css';
import Carousel from 'react-multi-carousel';
import { routesPath } from '@/routes/routes-path';

export const StoreCart = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { handleReplacePage } = useRedirect();

  const handleRedirectionRoute = () => {
    handleReplacePage({ pathName: routesPath.CHECKED_BUY });
  };

  const hasProductDatas = cartProducts.length > 0;
  const CarouselResponsive = {
    desktop: {
      breakpoint: { min: 1024, max: 3000 },
      items: 4,
    },
    tablet: {
      breakpoint: { min: 769, max: 1024 },
      items: 3,
    },
    mobile: {
      breakpoint: { min: 300, max: 769 },
      items: 2,
    },
  };

  return (
    <div className={styles.cart_container}>
      <TitleRoot>
        <TitleContent>Carrinho</TitleContent>
        <Button disabled={!hasProductDatas} onClick={handleRedirectionRoute} type="button">
          Verificar
        </Button>
      </TitleRoot>

      {hasProductDatas && (
        <Carousel responsive={CarouselResponsive} className={styles.cart_product_container}>
          {cartProducts.map((product) => {
            return <ProductCard key={product.data.id} {...product} />;
          })}
        </Carousel>
      )}

      {!hasProductDatas && (
        <div className={styles.cart__empty_container}>
          <img src={ShredderIcon} loading="lazy" alt="Um papel sendo triturado..." />
          <p>Adicione produtos ao carrinho...</p>
        </div>
      )}
    </div>
  );
};
