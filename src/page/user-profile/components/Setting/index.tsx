import { useConfigsProfile } from '../../hooks/use-profile';
import { FaGear } from 'react-icons/fa6';
import styles from './index.module.css';
import { SplitItemButton, SplitItemListContainer } from '@/components/SplitModel/SplitItems';
import { ToggleModelContext } from '../../contexts/toggle-model-context';
import { useContext } from 'react';

export const ProfileSettings = () => {
  const { handleDeleteAccount, handleLogOut } = useConfigsProfile();
  const { openModel } = useContext(ToggleModelContext);

  return (
    <div className={styles.settings_container}>
      <SplitItemButton>
        <FaGear className={styles.icon} />
      </SplitItemButton>

      <SplitItemListContainer className={styles.options_model}>
        <button className={styles.model_items} type="button" onClick={openModel}>
          Atualizar Perfil
        </button>
        <button className={styles.model_items} type="button" onClick={handleLogOut}>
          Desconectar-se
        </button>
        <button className={styles.model_items} onClick={handleDeleteAccount} type="button">
          Deletar Conta
        </button>
      </SplitItemListContainer>
    </div>
  );
};
