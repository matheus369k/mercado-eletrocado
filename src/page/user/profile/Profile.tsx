import { ProfileSettings, EnvoyProducts, FavoriteProducts } from './components';
import { UserProfiler } from '@/components';
import styles from './index.module.css';

export const UserProfile = () => {
  return (
    <div className={styles.user_profile_container}>
      <ProfileSettings />
      <UserProfiler customClass="user_profiler" />
      <EnvoyProducts />
      <FavoriteProducts />
    </div>
  );
};

export default UserProfile;
