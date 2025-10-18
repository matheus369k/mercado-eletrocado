import { TitleRoot, TitleContent, Button } from '@/components';
import { appUseSelector } from '@/redux/hook';
import { useRedirect } from '@/hooks';
import { ProductCard } from './components';
import styles from './index.module.css';
import { Empty } from '@/components/Empty';
import { ROUTES_PATHNAMES } from '@/util/const';

export const StoreCart = () => {
  const { cartProducts } = appUseSelector((state) => state.cart);
  const { userDatas } = appUseSelector((state) => state.user);
  const { handleTogglePage } = useRedirect();

  const handleRedirectionRoute = () => {
    if (userDatas) {
      handleTogglePage({ pathName: ROUTES_PATHNAMES.CHECKED });
      return;
    }
    handleTogglePage({ pathName: ROUTES_PATHNAMES.USER_LOGIN });
  };

  const hasProductDatas = cartProducts.length > 0;

  return (
    <div className={styles.cart_container}>
      <TitleRoot>
        <TitleContent>Carrinho</TitleContent>
        <Button disabled={!hasProductDatas} onClick={handleRedirectionRoute} type="button">
          Verificar
        </Button>
      </TitleRoot>

      {hasProductDatas && (
        <div className={styles.cart_product_container}>
          {cartProducts.map((product) => {
            return <ProductCard key={product.data._id} {...product} />;
          })}
        </div>
      )}

      {!hasProductDatas && <Empty message="Adicione produtos ao carrinho..." />}
    </div>
  );
};
