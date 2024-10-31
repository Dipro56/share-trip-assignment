'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoEyeOutline } from 'react-icons/io5';
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from '@/redux/features/cart/cartSlice';
import { BiCartAdd } from 'react-icons/bi';
import { LuTrash2 } from 'react-icons/lu';

import {
  handleProductAddToCart,
  handleProductDecrement,
  handleProductIncrement,
} from '@/utils/helper/productHelper';
import { useDispatch, useSelector } from 'react-redux';
import { findCartItem } from '@/utils/helper/cartHelper';

const ProductCard = ({ product }) => {
  // let { user } = useUser();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState();
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
  const totalPrice = discountedPrice * quantity;
  const [isInCart, setIsInCart] = useState();

  useEffect(() => {
    if (findCartItem(cartItems, product?.id)) {
      setIsInCart(true);
      let checkQuantity = cartItems.filter((item) => item?.id === product?.id);
      setQuantity(parseInt(checkQuantity[0]?.quantity));
    } else {
      setQuantity(0);
    }
  }, [cartItems, product]);

  const handleDecrementQuantity = () => {
    let productId = product?.id;
    dispatch(decrementQuantity({ productId }));
  };

  const handleIncrementQuantity = () => {
    let productId = product?.id;
    dispatch(incrementQuantity({ productId }));
  };

  return (
    <div className="text-black rounded-lg hover:shadow-xl hover:p-1 hover:transform  hover:transition-transform hover:duration-300 flex flex-col justify-between">
      <div className="relative w-full h-52 hover:cursor-pointer bg-[#888888] rounded-lg">
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
        )}
        <div className=" mx-2 relative -bottom-32">
          {isInCart && quantity ? (
            <div className="w-full flex items-center justify-between py-1 border bg-green-600 backdrop-blur-sm bg-black/10 hover:backdrop-blur-none rounded-lg  transition px-4">
              <button
                onClick={() => {
                  //handleProductDecrement(quantity, setQuantity);
                  handleDecrementQuantity();
                }}
                className="text-white"
              >
                <LuTrash2 size={18} />
              </button>

              <p className="text-white text-sm ml-1">
                {quantity} Added in cart
              </p>
              <button
                onClick={() => {
                  handleIncrementQuantity();
                }}
                className="text-white"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                handleProductAddToCart(
                  cartItems,
                  product,
                  1,
                  discountedPrice,
                  dispatch,
                  addToCart
                );
              }}
              className="w-full flex items-center justify-center py-1 border border-gray-300 backdrop-blur-sm bg-black/10 hover:backdrop-blur-none rounded-lg hover:bg-green-600 transition"
            >
              <BiCartAdd fill="white" size={20} />
              <span className="text-white text-sm ml-1">Add to Cart</span>
            </button>
          )}

          <Link href={`product-details/${product?.id}`}>
            <button className="w-full flex items-center justify-center py-1 border border-gray-300 backdrop-blur-sm bg-black/10 hover:backdrop-blur-none rounded-lg hover:bg-green-600 transition my-1 text-white">
              <IoEyeOutline fill="white" size={20} />
              <span className="text-white text-sm ml-1">Quick View</span>
            </button>
          </Link>
        </div>
      </div>

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
      </div>
    </div>
  );
};

export default ProductCard;
