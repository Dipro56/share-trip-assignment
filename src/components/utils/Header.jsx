'use client';
// import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
// import { Box, button, div, TextField } from '@radix-ui/themes';
import React, { useEffect, useState, useCallback } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useUser } from '@/hooks/useUsers';
import Image from 'next/image';
// import UserDropdown from './UserDropdown';
// import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { getUserCartData } from '@/redux/features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
// import { debounce } from '@/utils/config/globalFunctions';

function Header() {
  //let { user } = useUser();
  let router = useRouter();
  // const searchParams = useSearchParams();
  // const order = searchParams.get('order');
  // const [searchQuery, setSearchQuery] = useState<string>('');
  // const pathname = usePathname();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getUserCartData());

    // if (user && user.id) {
    //   dispatch(getUserCartData(user.id));
    // }
  }, [dispatch]);

  // const debouncedHandleSearchRoute = useCallback(
  //   debounce((query) => {
  //     const url = order
  //       ? `/search?product_name=${query}&order=${order}`
  //       : `/search?product_name=${query}`;
  //     router.push(url);
  //   }, 500),
  //   [order, router] // Correctly specify dependencies
  // );

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
        {/* <button
          onClick={() => {
            router.push('/login');
          }}
          className="cursor-pointer"
        >
          Login
        </button> */}

        {/* {user?.image ? (
          <div>
            <Image
              src={user?.image}
              alt="user"
              width={40}
              height={40}
              className="rounded-[50%]"
            />
          </div>
        ) : (
          <button
            radius="full"
            onClick={() => {
              router.push('/login');
            }}
            variant="soft"
            className="cursor-pointer"
          >
            Login
          </button>
        )} */}
      </div>
    </div>
  );
}

export default Header;
