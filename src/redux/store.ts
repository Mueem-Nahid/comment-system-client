import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.ts";
import {api} from "./api/apiSlice.ts";

const userString: string | null = localStorage.getItem('user');
let user;

if (userString) {
   user = JSON.parse(userString);
}

const initialState = {
   user: {
      userInfo: user?.userInfo || null,
      accessToken: user?.accessToken || null,
   },
};

const store = configureStore({
   reducer: {
      user: userReducer,
      [api.reducerPath]: api.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
   preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store