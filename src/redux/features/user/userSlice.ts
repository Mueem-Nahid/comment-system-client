import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../../types/globalTypes.ts";

const initialState: IUser = {
   userInfo: null,
   accessToken: null
}

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setCredentials: (state, action: PayloadAction<IUser>) => {
         state.userInfo = action.payload.userInfo;
         state.accessToken = action.payload.accessToken
      },
      logOutUser: (state) => {
         state.userInfo = null
         state.accessToken = null
         localStorage.removeItem('user');
      }
   }
})

export const {
   setCredentials,
   logOutUser
} = userSlice.actions

export default userSlice.reducer