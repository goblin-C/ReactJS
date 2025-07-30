import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
interface cartState {
    data?: any[]; // Adjust based on API response
    recordCount?: number;
    discount?: number;
    deliveryFee?: number;
}


// Initial state
const initialState: cartState = {
    data: [],
    recordCount: 0,
    discount: 0,
    deliveryFee: 0,
};

// Create the slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        resetState: (state) => {
            Object.assign(state, initialState);
        },
        updateCart: (state, action: PayloadAction<any[]>) => {
            state.data = action.payload;
            state.recordCount = action.payload.length;
        },
        updateQuantity: (state, action: PayloadAction<{id: number, quantity: number}>) => {
            const { id, quantity } = action.payload;
            const item = state.data?.find(item => item.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.data = state.data?.filter(item => item.id !== action.payload) || [];
            state.recordCount = state.data.length;
        },
        setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        setDeliveryFee: (state, action: PayloadAction<number>) => {
            state.deliveryFee = action.payload;
        },
        addItem: (state, action: PayloadAction<any>) => {
            const newItem = action.payload;
            const existingItemIndex = state.data?.findIndex(
                item => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
            ) ?? -1;
            
            if (existingItemIndex >= 0 && state.data) {
                state.data[existingItemIndex].quantity += newItem.quantity;
            } else {
                state.data = [...(state.data || []), newItem];
            }
            state.recordCount = state.data?.reduce((total, item) => total + item.quantity, 0) || 0;
        }
    },
});
export const { resetState, updateCart, updateQuantity, removeItem, setDiscount, setDeliveryFee, addItem } = cartSlice.actions;
export default cartSlice.reducer;
