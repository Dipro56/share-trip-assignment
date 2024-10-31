export const findCartItem = (cartItems, productId) => {
  return cartItems.find((item) => item?.id === productId);
};

export const isStockAvailable = (cartItem, quantity, stock) => {
  return cartItem ? cartItem?.quantity + quantity <= stock : quantity < stock;
};
