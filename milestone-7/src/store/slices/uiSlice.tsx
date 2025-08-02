import { createSlice } from '@reduxjs/toolkit';

interface UiState {
    showSignUpBanner: boolean;
    toast: {
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info';
    };
}

const initialState: UiState = {
    showSignUpBanner: true,
    toast: {
        show: false,
        message: '',
        type: 'info'
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        hideSignUpBanner: (state) => {
            state.showSignUpBanner = false;
        },
        showToast: (state, action) => {
            state.toast = {
                show: true,
                message: action.payload.message,
                type: action.payload.type || 'info'
            };
        },
        hideToast: (state) => {
            state.toast.show = false;
        },
    },
});

export const { hideSignUpBanner, showToast, hideToast } = uiSlice.actions;
export default uiSlice.reducer;