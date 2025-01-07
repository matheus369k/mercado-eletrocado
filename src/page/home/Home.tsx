import { ProductsCards, CategoryFilter } from './components';
import { useProducts } from './hooks/useProducts';
import styles from './index.module.css';
import '@/styles/card-Products.css';
import { useState } from 'react';

export const Home = () => {
  const [category, setCategory] = useState('all');
  const { dataProducts } = useProducts({ category });

  const handleSetCategory = (category: string) => {
    setCategory(category);
  };

  return (
    <>
      <CategoryFilter category={category} handleSetCategory={handleSetCategory} />
      <ul className={styles.home}>
        <ProductsCards ProductDataCards={dataProducts} />
      </ul>
    </>
  );
};
