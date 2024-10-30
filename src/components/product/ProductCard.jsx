'use client';
// import { useUser } from '@/hooks/useUsers';
import Image from 'next/image';
import React, { useState } from 'react';
// import { CiStar } from 'react-icons/ci';
// import { FiMinus, FiPlus } from 'react-icons/fi';
// import { useDispatch, useSelector } from 'react-redux';
// import { CiShoppingCart } from 'react-icons/ci';
// import { IoMdStar } from 'react-icons/io';
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';

// import {
//   handleProductAddToCart,
//   handleProductDecrement,
//   handleProductIncrement,
// } from '@/utils/helper/productHelper';
// import { addToCart } from '@/redux/features/cart/cartSlice';
// import { RootState, AppDispatch } from '../../redux/store';

// interface ProductCardProps {
//   product: Product;
// }

const ProductCard = ({ product }) => {
  // let { user } = useUser();
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  // const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const totalPrice = discountedPrice * quantity;

  return (
    <div className="text-black rounded-lg hover:shadow-xl hover:p-1 hover:transform  hover:transition-transform hover:duration-300 flex flex-col justify-between">
      <Link href={`product-details/${product?.id}`}>
        <div className="relative w-full h-52 hover:cursor-pointer bg-[#ECE7E9] rounded-lg">
          <Image fill src={product.thumbnail} alt={product.title} />
          {product.discountPercentage > 0 && (
            <div className="absolute my-2 -translate-x-1">
              <div className="relative">
                <Image
                  src="/asset/discount_bg.svg"
                  height={60}
                  width={60}
                  alt="Discount Background"
                />
                <span className="absolute -translate-x-1 mb-1  inset-0 flex items-center justify-center text-white font-bold text-xs">
                  - ৳ {(product.price - discountedPrice).toFixed(2)}
                </span>
              </div>
            </div>

            // <div className="absolute top-2 left-0 bg-yellow-500 text-black px-2 py-1  text-xs font-bold">
            //   {product.discountPercentage.toFixed(0)}% OFF
            // </div>
          )}
          <div className=" mx-2 relative -bottom-32">
            <button className="w-full flex items-center justify-center py-1 border border-gray-300 backdrop-blur-sm bg-black/10 hover:backdrop-blur-none rounded-lg hover:bg-green-600 transition">
              <span className="text-white text-sm">Add to Cart</span>
            </button>
            <Link href={`product-details/${product?.id}`}>
              <button className="w-full flex items-center justify-center py-1 border border-gray-300 backdrop-blur-sm bg-black/10 hover:backdrop-blur-none rounded-lg hover:bg-green-600 transition my-1 text-white">
                <IoEyeOutline fill="white" size={20} />
                <span className="text-white text-sm ml-1">Quick View</span>
              </button>
            </Link>
          </div>
        </div>
      </Link>
      <div className="p-3">
        <p className="text-xs text-gray-600  truncate">{product.brand}</p>

        <h3 className="text-sm font-semibold truncate">{product.title}</h3>

        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="text-base text-[#1882FF]">
              ৳{discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="ml-2 text-xs text-gray-500 line-through">
                ৳{product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {/* <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                handleProductDecrement(quantity, setQuantity);
              }}
              className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full  transition duration-200"
              aria-label="Decrement quantity"
            >
              <FiMinus />
            </button>
            <span className="text-base font-bold">{quantity}</span>
            <button
              onClick={() => {
                handleProductIncrement(
                  cartItems,
                  product,
                  quantity,
                  setQuantity
                );
              }}
              className="p-1 bg-blue-900 hover:bg-blue-700 text-white rounded-full transition duration-200"
              aria-label="Increment quantity"
            >
              <FiPlus />
            </button>
          </div>
          <div>
            <span className="text-base font-bold text-black">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
        <button
          onClick={() => {
            handleProductAddToCart(
              user,
              cartItems,
              product,
              quantity,
              discountedPrice,
              dispatch,
              addToCart
            );
          }}
          className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center"
        >
          <CiShoppingCart className="text-lg" />
          <span className="ml-1 text-sm"> Add to Cart</span>
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
