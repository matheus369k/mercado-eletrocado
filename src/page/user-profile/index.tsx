import { DropdownModelRoot, TitleContent, TitleRoot } from '@/components';
import { ProfileSettings } from './components';
import styles from './index.module.css';
import { lazy, Suspense } from 'react';
import { useProfileAccount } from '@/http/use-profile-account';
import { Avatar } from '@/components/Avatar';
import { useConfigsProfile } from './hooks/use-profile';
import { TabsViews } from './components';

const LazyAlertSettingsActionContentModel = lazy(
  () => import('./components/AlertSettingContentModel'),
);
const LazyUpdateProfileModelForm = lazy(() => import('./components/UpdateProfileModel'));

export const UserProfile = () => {
  const userAccount = useProfileAccount().data;
  const { handleDeleteAccount, handleLogOut } = useConfigsProfile();

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

            <TabsViews />
          </div>

          <Suspense>
            {userAccount && (
              <LazyUpdateProfileModelForm
                cep={userAccount.cep}
                full_name={userAccount.name}
                avatarUrl={userAccount.avatar}
              />
            )}
          </Suspense>
        </DropdownModelRoot>

        <Suspense>
          {userAccount && (
            <LazyAlertSettingsActionContentModel
              email={userAccount.email}
              handleClick={handleLogOut}
              message="logout"
              referenceId="userLogout"
            />
          )}
        </Suspense>
      </DropdownModelRoot>

      <Suspense>
        {userAccount && (
          <LazyAlertSettingsActionContentModel
            email={userAccount.email}
            handleClick={handleDeleteAccount}
            message="delete"
            referenceId="userDelete"
          />
        )}
      </Suspense>
    </DropdownModelRoot>
  );
};
