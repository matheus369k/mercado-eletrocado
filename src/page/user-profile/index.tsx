import { DropdownModelRoot, TitleContent, TitleRoot } from '@/components';
import {
  ProfileSettings,
  DeliveriesProducts,
  FavoriteProducts,
  UpdateProfileModelForm,
} from './components';
import styles from './index.module.css';
import { useState } from 'react';
import { useProfileAccount } from '@/http/use-profile-account';
import { Avatar } from '@/components/Avatar';
import { AlertSettingsActionContentModel } from './components/AlertSettingContentModel';
import { useConfigsProfile } from './hooks/use-profile';

type SelectedSectionType = 'favorite' | 'delivery';

export const UserProfile = () => {
  const userAccount = useProfileAccount().data;
  const { handleDeleteAccount, handleLogOut } = useConfigsProfile();
  const [selectedSection, setSelectedSection] = useState<SelectedSectionType>('favorite');

  const handleSelectSectionToView = (type: SelectedSectionType) => {
    setSelectedSection(type);
  };

  return (
    <DropdownModelRoot mode="model" referenceId="userDelete">
      <DropdownModelRoot mode="model" referenceId="userLogout">
        <DropdownModelRoot
          mode="model"
          referenceId="updateProfile"
          className={styles.user_profiler_container}>
          <TitleRoot>
            <TitleContent>Perfil do Usuario</TitleContent>
          </TitleRoot>

          <div className={styles.user_container}>
            <div className={styles.user_info}>
              <div className={styles.picture_container}>
                <ProfileSettings />
                <Avatar
                  avatarUrl={userAccount?.avatar}
                  name={userAccount?.name || 'desconhecido'}
                />
              </div>
              <div>
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

          {userAccount && (
            <UpdateProfileModelForm
              cep={userAccount.cep}
              full_name={userAccount.name}
              avatarUrl={userAccount.avatar}
            />
          )}
        </DropdownModelRoot>

        {userAccount && (
          <AlertSettingsActionContentModel
            email={userAccount.email}
            handleClick={handleLogOut}
            message="logout"
            referenceId="userLogout"
          />
        )}
      </DropdownModelRoot>

      {userAccount && (
        <AlertSettingsActionContentModel
          email={userAccount.email}
          handleClick={handleDeleteAccount}
          message="delete"
          referenceId="userDelete"
        />
      )}
    </DropdownModelRoot>
  );
};
