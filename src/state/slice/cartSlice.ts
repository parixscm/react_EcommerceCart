import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartState {
  cartItems: CartItemType[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      state.amount += 1;
      const cartItem = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id
      );
      cartItem
        ? (cartItem.amount! += 1)
        : state.cartItems.push({ ...action.payload, amount: 1 });
    },
    increase: (state, action) => {
      state.amount += 1;
      const itemIdx = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      state.cartItems[itemIdx].amount! += 1;
      // state.total =
      //   state.cartItems[itemIdx].amount! * state.cartItems[itemIdx].price;
    },
    // TODO: Checkout 개수가 0개면 cartItems 리스트에서 삭제해야 함
    decrease: (state, action) => {
      const itemIdx = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      state.cartItems[itemIdx].amount! > 0 &&
        state.cartItems[itemIdx].amount!-- &&
        state.amount--;
    },
  },
});

export const { add, increase, decrease } = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
