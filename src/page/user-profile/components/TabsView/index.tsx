import { useState } from 'react';
import styles from './index.module.css';
import { FavoriteProducts } from './Favorite';
import { DeliveriesProducts } from './Delivery';

type SelectedSectionType = 'favorite' | 'delivery';

export const TabsViews = () => {
  const [selectedSection, setSelectedSection] = useState<SelectedSectionType>('favorite');

  const handleSelectSectionToView = (type: SelectedSectionType) => {
    setSelectedSection(type);
  };

  return (
    <div className={styles.favorite_envoy_container}>
      <div className={styles.favorite_envoy_header}>
        <button
          disabled={selectedSection === 'favorite'}
          type="button"
          onClick={() => handleSelectSectionToView('favorite')}>
          Favoritos
        </button>
        <button
          disabled={selectedSection === 'delivery'}
          type="button"
          onClick={() => handleSelectSectionToView('delivery')}>
          Enviados
        </button>
      </div>
      <div className={styles.favorite_envoy_main}>
        <div className={styles.favorite_envoy_main_wrapper}>
          {selectedSection === 'favorite' && <FavoriteProducts />}
          {selectedSection === 'delivery' && <DeliveriesProducts />}
        </div>
      </div>
    </div>
  );
};
