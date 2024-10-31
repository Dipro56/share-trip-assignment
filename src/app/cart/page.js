'use client';
import {
  decrementQuantity,
  getUserCartData,
  incrementQuantity,
  removeFromCart,
} from '@/redux/features/cart/cartSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartTitle from '@/components/cart/CartTitle';
import CartTableHead from '@/components/cart/CartTableHead';
import CartTableBody from '@/components/cart/CartTableBody';
import CartTotalSection from '@/components/cart/CartTotalSection';

const cartTableHeadList = ['Image', 'Quantity', 'Product', 'Total', 'Delete'];

function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getUserCartData());
  }, [dispatch]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleIncrementQuantity = (productId) => {
    dispatch(incrementQuantity({ productId }));
  };

  const handleDecrementQuantity = (productId) => {
    dispatch(decrementQuantity({ productId }));
  };

  return (
    <div className="min-h-screen bg-gray-200 text-black py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-xl text-center text-gray-400">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                  <div className="p-4 sm:p-6">
                    <CartTitle title={'Your Cart'} />
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <CartTableHead cartTableHeadList={cartTableHeadList} />
                        <CartTableBody
                          cartItemList={cartItems}
                          handleIncrementQuantity={handleIncrementQuantity}
                          handleDecrementQuantity={handleDecrementQuantity}
                          handleRemoveItem={handleRemoveItem}
                        />
                      </table>
                    </div>
                  </div>
                  <CartTotalSection totalPrice={totalPrice.toFixed(2)} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
