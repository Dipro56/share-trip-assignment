// cartSlice.ts
import notifications from '@/utils/notification';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('achcart', JSON.stringify(state.items));
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload.productId
      );

      if (item) {
        if (item.quantity < item?.stock) {
          item.quantity += 1;
        } else {
          notifications.error('Stock out!');
        }
      }

      // Save to local storage
      localStorage.setItem('achcart', JSON.stringify(state.items));
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload.productId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('achcart', JSON.stringify(state.items));
      } else {
        state.items = state.items.filter(
          (item) => !(item.id === action.payload.productId)
        );
        localStorage.setItem('achcart', JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => !(item.id === action.payload.productId)
      );

      // Save to local storage
      localStorage.setItem('achcart', JSON.stringify(state.items));
    },

    getUserCartData: (state, action) => {
      // const userId = action.payload;
      const storedCart = localStorage.getItem('achcart');
      // if (storedCart) {
      //   const parsedCart = JSON.parse(storedCart);
      //   state.items = parsedCart.filter((item) => item.userId === userId);
      // }
      const parsedCart = JSON.parse(storedCart);
      console.log('parsedCart', parsedCart);
      if (parsedCart) state.items = parsedCart;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  getUserCartData,
  removeUserCartData,
} = cartSlice.actions;
export default cartSlice.reducer;
