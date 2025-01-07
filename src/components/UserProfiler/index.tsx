import { UserProfilerItem } from './UserProfilerItem';
import { MdOutlineEmail } from 'react-icons/md';
import { MdOutlinePlace } from 'react-icons/md';
import { FaCircleUser } from 'react-icons/fa6';
import { appUseSelector } from '@/redux/hook';
import { GoPeople } from 'react-icons/go';
import styles from './index.module.css';

export const UserProfiler = ({ customClass }: { customClass: string }) => {
  const { userDatas } = appUseSelector((state) => state.user);

  return (
    <ul className={styles[customClass]}>
      <i className={styles.icon_persona}>
        <FaCircleUser />
      </i>
      <div className={styles.user_info}>
        <UserProfilerItem
          icon={<GoPeople />}
          fieldName="Nome"
          userData={userDatas?.name || ''}
        />
        <UserProfilerItem
          icon={<GoPeople />}
          fieldName="Sobrenome"
          userData={userDatas?.lastName || ''}
        />
        <UserProfilerItem
          icon={<MdOutlineEmail />}
          fieldName="E-mail"
          userData={userDatas?.email || ''}
        />
        <UserProfilerItem
          icon={<MdOutlinePlace />}
          fieldName="CEP"
          userData={userDatas?.cep || ''}
        />
      </div>
    </ul>
  );
};
