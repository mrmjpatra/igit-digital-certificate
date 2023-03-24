import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    accessToken: "",
    displayName: "",
    emailVerified: false,
    isAnonymous: false,
    photoURL: "",
    email: "",
    uid: "",
};

const googleSlice = createSlice({
    name: "GoogleAuth",
    initialState: () => {
        const localAuth = localStorage.getItem('googleAuth');
        if (localAuth === null) {
            return initialState;
        }
        const load = JSON.parse(localAuth);
        const { accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid } = load;
        return {
            accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid
        };
    },
    reducers: {
        setAtLogin: (state, action) => {
            const { accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid } = action.payload;
            localStorage.setItem('googleAuth', JSON.stringify({ accessToken, displayName, emailVerified, isAnonymous, photoURL, email, uid }));
            state.accessToken = accessToken;
            state.displayName = displayName;
            state.emailVerified = emailVerified;
            state.email = email;
            state.isAnonymous = isAnonymous;
            state.photoURL = photoURL;
            state.uid = uid;
        },
        resetAtLogout: (state) => {
            state = initialState;
            localStorage.removeItem("googleAuth");
        }
    }
});
export const googleReducer = googleSlice.reducer;
export const { setAtLogin, resetAtLogout } = googleSlice.actions;