import { useConfigsProfile } from '../../hooks/use-profile';
import { FaGear } from 'react-icons/fa6';
import styles from './index.module.css';
import {
  DropdownModelRoot,
  DropdownModelContent,
  DropdownModelItem,
  DropdownModelToggle,
} from '@/components';
import { ImExit } from 'react-icons/im';
import { FaUserEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

export const ProfileSettings = () => {
  const { handleDeleteAccount, handleLogOut } = useConfigsProfile();

  return (
    <DropdownModelRoot
      referenceId="setting"
      mode="dropdown"
      customClass={styles.settings_container}>
      <DropdownModelToggle referenceId="setting" mode="dropdown">
        <FaGear className={styles.icon} />
      </DropdownModelToggle>

      <DropdownModelContent
        className={styles.settings_content}
        referenceId="setting"
        mode="dropdown">
        <DropdownModelItem className={styles.settings_item} referenceId="setting" mode="dropdown">
          <DropdownModelToggle mode="model" referenceId="updateProfile">
            <FaUserEdit /> Atualizar Perfil
          </DropdownModelToggle>
        </DropdownModelItem>
        <DropdownModelItem referenceId="setting" className={styles.settings_item} mode="dropdown">
          <DropdownModelToggle mode="model" referenceId="userLogout">
            <ImExit /> Desconectar-se
          </DropdownModelToggle>
        </DropdownModelItem>
        <DropdownModelItem referenceId="setting" className={styles.settings_item} mode="dropdown">
          <DropdownModelToggle mode="model" referenceId="userDelete">
            <AiFillDelete /> Deletar Conta
          </DropdownModelToggle>
        </DropdownModelItem>
      </DropdownModelContent>
    </DropdownModelRoot>
  );
};
