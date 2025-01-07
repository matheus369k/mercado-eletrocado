import { useConfigsProfile, useOpenCloseConfigs } from './hooks';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { FaGear } from 'react-icons/fa6';
import styles from './index.module.css';

export const ProfileSettings = () => {
  const { handleDeleteCont, handleLogOut } = useConfigsProfile();
  const { handleOpenCloseConfigs, isOpenConfig } = useOpenCloseConfigs();

  return (
    <div className={styles.settings_container}>
      <i className={styles.settings_icon} onClick={handleOpenCloseConfigs}>
        <FaGear />
      </i>
      <ul
        className={`${styles.settings_options_container} ${isOpenConfig ? '' : styles.open_configs}`}>
        <li onClick={handleDeleteCont}>
          <button type="button">
            <RiDeleteBin6Fill />
            Deletar Conta
          </button>
        </li>
        <li onClick={handleLogOut}>
          <button type="button">
            <RiLogoutBoxFill />
            Desconectar-se
          </button>
        </li>
      </ul>
    </div>
  );
};
