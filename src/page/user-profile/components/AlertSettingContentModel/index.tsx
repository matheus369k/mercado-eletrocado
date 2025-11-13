import { Button, DropdownModelClose, DropdownModelContent } from '@/components';
import { GrFormClose } from 'react-icons/gr';
import styles from './index.module.css';

type AlertSettingsActionContentModelProps = {
  referenceId: string;
  handleClick: () => void;
  message: 'logout' | 'delete';
  email: string;
};

const messages = {
  logout: 'desconectar',
  delete: 'deletar',
};

export const AlertSettingsActionContentModel = (props: AlertSettingsActionContentModelProps) => {
  const { handleClick, message, referenceId, email } = props;

  return (
    <DropdownModelContent className={styles.alert_content} mode="model" referenceId={referenceId}>
      <DropdownModelClose
        className={styles.alert_close_icon}
        mode="model"
        referenceId={referenceId}>
        <GrFormClose className={styles.icon} />
      </DropdownModelClose>

      <span className={styles.alert_message}>
        Tem certeza, que deseja <strong>{messages[message]}</strong> a conta{' '}
        <strong>{email}</strong>?
      </span>

      <div className={styles.buttons_options_container}>
        <DropdownModelClose type="button" mode="model" referenceId={referenceId}>
          <Button type="button" customClass="btn_form">
            cancelar
          </Button>
        </DropdownModelClose>
        <Button btnType="outline" onClick={handleClick} customClass="btn_form">
          Confirmar
        </Button>
      </div>
    </DropdownModelContent>
  );
};
