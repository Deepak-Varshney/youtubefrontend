import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
}

export const userSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscription: (state, action) => {
            const userId = action.payload; // UserId to subscribe/unsubscribe
            if (state.currentUser.subscribedTo.includes(userId)) {
                // Unsubscribe
                state.currentUser.subscribedTo = state.currentUser.subscribedTo.filter(id => id !== userId);
            } else {
                // Subscribe
                state.currentUser.subscribedTo.push(userId);
            }
            // Update currentUser in localStorage
            localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logout, subscription } = userSlice.actions;

export default userSlice.reducer;