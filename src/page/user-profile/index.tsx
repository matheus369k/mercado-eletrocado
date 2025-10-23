import { TitleContent, TitleRoot } from '@/components';
import { ProfileSettings, EnvoyProducts, FavoriteProducts } from './components';
import styles from './index.module.css';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useProfileAccount } from '@/http/use-profile-account';

type SelectedSectionType = 'favorite' | 'envoy';

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

      <div className={styles.user__content}>
        <div className={styles.user__content__info_container}>
          <div className={styles.user__content__profiler_picture_container}>
            <ProfileSettings />
            <IoPersonCircleSharp className={styles.user__content__profiler_picture} />
          </div>
          <p className={styles.user__content__info_user__items}>
            <strong>Nome: </strong>
            {userAccount?.name || 'desconhecido...'}
          </p>
          <p className={styles.user__content__info_user__items}>
            <strong>E-Mail: </strong>
            {userAccount?.email || 'desconhecido...'}
          </p>
          <p className={styles.user__content__info_user__items}>
            <strong>CEP: </strong>
            {userAccount?.cep || 'desconhecido...'}
          </p>
        </div>

        <div className={styles.user__content__favorite_envoy_container}>
          <div className={styles.user__content__favorite_envoy__header}>
            <button
              disabled={selectedSection === 'favorite'}
              type="button"
              onClick={() => handleSelectSectionToView('favorite')}>
              Favoritos
            </button>
            <button
              disabled={selectedSection === 'envoy'}
              type="button"
              onClick={() => handleSelectSectionToView('envoy')}>
              Enviados
            </button>
          </div>
          <div className={styles.user__content__favorite_envoy__main}>
            {selectedSection === 'favorite' ? <FavoriteProducts /> : <EnvoyProducts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
