import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'qty'>>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.qty += 1;
      else state.items.push({ ...action.payload, qty: 1 });
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (!item) return;
      if (item.qty === 1)
        state.items = state.items.filter(i => i.id !== action.payload);
      else item.qty -= 1;
    },
    deleteFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
