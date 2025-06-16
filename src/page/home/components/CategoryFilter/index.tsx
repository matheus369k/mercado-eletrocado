import { IoFilterSharp } from 'react-icons/io5';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { CategoryButton } from './CategoryButton';
import type { CategoryTypes } from '../../';

interface CategoryFilterProps {
  handleUpdateProducts: (filter: string) => void;
  filter: CategoryTypes;
}

export const CategoryFilter = ({ handleUpdateProducts, filter }: CategoryFilterProps) => {
  const [isToggleModel, setIsToggleModel] = useState(false);

  const handleToggleModel = () => {
    setIsToggleModel((state) => !state);
  };

  const handleManagerFilterModel = (category: string) => {
    handleUpdateProducts(category);
    handleToggleModel();
  };

  useEffect(() => {
    document.addEventListener('keyup', (event) => {
      if (/Escape/i.test(event.code)) {
        setIsToggleModel(false);
      }
    });
  }, []);

  return (
    <div className={styles.home__category_container}>
      <i onClick={handleToggleModel} className={styles.home__category__icon__container}>
        <IoFilterSharp className={styles.home__category__icon} />
      </i>
      <div data-toggle-model={isToggleModel} className={styles.home__category__filters}>
        <CategoryButton category="all" filter={filter} handleClick={handleManagerFilterModel}>
          Todos
        </CategoryButton>
        <CategoryButton category="notebook" filter={filter} handleClick={handleManagerFilterModel}>
          Notebook
        </CategoryButton>
        <CategoryButton category="tablet" filter={filter} handleClick={handleManagerFilterModel}>
          Tablet
        </CategoryButton>
        <CategoryButton category="phone" filter={filter} handleClick={handleManagerFilterModel}>
          Celular
        </CategoryButton>
      </div>
    </div>
  );
};
