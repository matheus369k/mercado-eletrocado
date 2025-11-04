import { TitleContent, TitleRoot } from '@/components';
import { ProfileSettings, DeliveriesProducts, FavoriteProducts } from './components';
import styles from './index.module.css';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useProfileAccount } from '@/http/use-profile-account';

type SelectedSectionType = 'favorite' | 'delivery';

export const UserProfile = () => {
  const userAccount = useProfileAccount().data;
  const [selectedSection, setSelectedSection] = useState<SelectedSectionType>('favorite');

  const handleSelectSectionToView = (type: SelectedSectionType) => {
    setSelectedSection(type);
  };

  return (
    <div className={styles.user_profiler_container}>
      <TitleRoot>
        <TitleContent>Perfil do Usuario</TitleContent>
      </TitleRoot>

      <div className={styles.user_container}>
        <div className={styles.user_info}>
          <div className={styles.picture_container}>
            <ProfileSettings />
            <IoPersonCircleSharp className={styles.profile_picture} />
          </div>
          <p className={styles.info_items}>
            <strong>Nome: </strong>
            {userAccount?.name || 'desconhecido...'}
          </p>
          <p className={styles.info_items}>
            <strong>E-Mail: </strong>
            {userAccount?.email || 'desconhecido...'}
          </p>
          <p className={styles.info_items}>
            <strong>CEP: </strong>
            {userAccount?.cep || 'desconhecido...'}
          </p>
        </div>

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
            {selectedSection === 'favorite' && <FavoriteProducts />}
            {selectedSection === 'delivery' && <DeliveriesProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
