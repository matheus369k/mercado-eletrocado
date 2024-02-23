import Favorite from './components/favorite/Favorite';
import ProductEnvoy from './components/envoyProducts/ProductEnvoy';
import UserDatas from '../../../share/components/userData/UserDatas';
import ProfileSettings from './components/profileSetting/ProfileSettings';

import './index.css'
import './response.css'

export const UserProfile = () => {

    return (
        <div className='userProfile'>
            <ProfileSettings/>
            <UserDatas />
            <ProductEnvoy />
            <Favorite />
        </div>
    )
}

export default UserProfile;