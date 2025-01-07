import { UserProfiler } from '@/components';
import { GoPeople } from 'react-icons/go';
import { Title } from './Title/';

export const UserSection = () => {
  return (
    <section>
      <Title customClass="user_title">
        Informações do <GoPeople />
        usuário
      </Title>
      <UserProfiler customClass="user_checked_buy" />
    </section>
  );
};
