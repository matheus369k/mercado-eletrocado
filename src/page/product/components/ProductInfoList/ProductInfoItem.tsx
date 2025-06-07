import styles from './index.module.css';

export const ProductInfoItem = ({ info, label }: { label: string; info: string }) => {
  return (
    <li className={styles.product_info__items}>
      <strong>{label}: </strong>
      {info}
    </li>
  );
};
