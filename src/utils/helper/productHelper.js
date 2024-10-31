import { findCartItem, isStockAvailable } from './cartHelper';
import notifications from '../notification';

export const handleProductIncrement = (
  cartItems,
  productDetails,
  quantity,
  setQuantity
) => {
  const cartItem = findCartItem(cartItems, productDetails.id);

  if (isStockAvailable(cartItem, quantity, productDetails.stock)) {
    setQuantity(quantity + 1);
  } else {
    notifications.error('Stock out!');
  }
};

export const handleProductDecrement = (quantity, setQuantity) => {
  if (quantity != 0) {
    setQuantity(quantity - 1);
  }
};

export const handleProductAddToCart = (
  cartItems,
  productDetails,
  quantity,
  discountedPrice,
  dispatch,
  addToCart
) => {
  const cartItem = findCartItem(cartItems, productDetails.id);
  const isAvailable = isStockAvailable(
    cartItem,
    quantity,
    productDetails.stock
  );

  if (isAvailable || !cartItem) {
    dispatch(
      addToCart({
        id: productDetails.id,
        title: productDetails.title,
        price: discountedPrice,
        quantity,
        thumbnail: productDetails.thumbnail,
        // userId: user.id,
        stock: productDetails.stock,
      })
    );
    notifications.success('Product added successfully');
  } else {
    notifications.error('Stock out!');
  }
};
