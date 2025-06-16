import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRegisterType } from '@/@types/user-schema';
import { COOKIES_KEYS, AUTO_CONNECTION } from '@/util/const';
import { cookiesVariables } from '@/util/cookies';

const restoreUserDatas = cookiesVariables.get(COOKIES_KEYS.USER_DATAS);
const initialState: { userDatas: Omit<UserRegisterType, 'auto_connection'> | null } = {
  userDatas: AUTO_CONNECTION && restoreUserDatas ? restoreUserDatas : null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserRegisterType>) => {
      state.userDatas = action.payload;
    },
    removeUser: (state) => {
      state.userDatas = null;
    },
  },
});

export const { addUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
