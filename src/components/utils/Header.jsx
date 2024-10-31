'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getUserCartData } from '@/redux/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  let router = useRouter();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getUserCartData());
  }, [dispatch]);
  
  return (
    <div className="bg-green-600 shadow-md  lg:px-6 flex justify-between items-center px-10 py-4">
      <div align={'center'}>
        <Link href={'/'}>
          <h1>Shop</h1>
          {/* <Image
            className="cursor-pointer"
            height={80}
            width={80}
            src={'/logo/shop_cart.png'}
            alt="logo"
          /> */}
        </Link>
      </div>

      <div className='flex'>
        <div
          className="relative cursor-pointer"
          onClick={() => {
            router.push('/cart');
          }}
        >
          <div
            className={`bg-orange-400 rounded-full py-1 px-2 absolute top-[-12px] left-[12px] text-xs font-semibold text-white`}
          >
            {cartItems?.length ? cartItems?.length : 0}
          </div>
          <CiShoppingCart className="text-2xl" />
        </div>

      </div>
    </div>
  );
}

export default Header;
