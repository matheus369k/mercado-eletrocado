import styles from './index.module.css';

interface CategoryFilterProps {
  handleSetCategory: (category: string) => void;
  category: string;
}

export const CategoryFilter = ({ handleSetCategory, category }: CategoryFilterProps) => {
  return (
    <div className={styles.category_products}>
      <button
        className={category === 'all' ? styles.active : ''}
        type="button"
        onClick={() => handleSetCategory('all')}>
        Todos
      </button>
      <button
        className={category === 'notebook' ? styles.active : ''}
        type="button"
        onClick={() => handleSetCategory('notebook')}>
        Notebook
      </button>
      <button
        className={category === 'tablet' ? styles.active : ''}
        type="button"
        onClick={() => handleSetCategory('tablet')}>
        Tablet
      </button>
      <button
        className={category === 'phone' ? styles.active : ''}
        type="button"
        onClick={() => handleSetCategory('phone')}>
        Celular
      </button>
    </div>
  );
};
