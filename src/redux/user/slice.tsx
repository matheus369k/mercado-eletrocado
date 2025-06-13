import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRegister } from '@/@types/user-schema';

const initialState: { userDatas: UserRegister | null } = {
  userDatas: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserRegister>) => {
      state.userDatas = action.payload;
    },
    removeUser: (state) => {
      state.userDatas = null;
    },
  },
});

export const { addUser, removeUser } = userReducer.actions;
export default userReducer.reducer;
