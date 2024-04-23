import { createContext } from "react";

export interface CartProducts {
  count: number; // no of products in cart
  ids: { [id: string]: number }; // { cartProductId: quantity }
} 

export interface Cart {
  cartProducts: CartProducts;
  setCartProducts: (cart: CartProducts) => void;
}

const CartContext = createContext<Cart>({
  cartProducts: { ids: {}, count: 0 },
  setCartProducts: () => {},
});

CartContext.displayName = "Cart Context";

export default CartContext;
