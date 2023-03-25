import { configureStore } from "@reduxjs/toolkit";
import {authReducer} from './Auth/sliceAuth';
import {googleReducer} from './GoogleData/sliceGoogle';
import {mobileReducer} from './MobileAuth/sliceMobile'
import userReducer from "./User/user-slice";
import themeReducer from "./Theme/theme-slice";
const store=configureStore({
    reducer:{
        auth:authReducer,
        google:googleReducer,
        mobile:mobileReducer,
        user:userReducer,
        theme:themeReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;