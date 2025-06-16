import { useConfigsProfile } from './hooks/use-profile';
import { FaGear } from 'react-icons/fa6';
import styles from './index.module.css';
import { SplitItemButton, SplitItemListContainer } from '@/components/SplitModel/SplitItems';

export const ProfileSettings = () => {
  const { handleDeleteAccount, handleLogOut } = useConfigsProfile();

  return (
    <div className={styles.settings_container}>
      <SplitItemButton>
        <FaGear className={styles.settings__icon} />
      </SplitItemButton>

      <SplitItemListContainer className={styles.settings__options_model}>
        <button
          className={styles.settings__options_model__items}
          onClick={handleDeleteAccount}
          type="button">
          Deletar Conta
        </button>
        <button
          className={styles.settings__options_model__items}
          type="button"
          onClick={handleLogOut}>
          Desconectar-se
        </button>
      </SplitItemListContainer>
    </div>
  );
};
