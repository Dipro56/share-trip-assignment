import React from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const CartTableBody = ({
  cartItemList,
  handleIncrementQuantity,
  handleDecrementQuantity,
  handleRemoveItem,
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {cartItemList.map((item) => (
        <tr key={item.id}>
          <td className="py-4 px-4">
            <Image
              src={item.thumbnail}
              height={80}
              width={80}
              alt="product image"
              className="rounded-lg"
            />
          </td>

          {/* Quantity Controls */}
          {(handleIncrementQuantity || handleDecrementQuantity) && (
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                {handleDecrementQuantity && (
                  <button
                    onClick={() =>
                      handleDecrementQuantity(item.id)
                    }
                    className="bg-green-600 text-white rounded-full p-1 hover:bg-green-700"
                  >
                    <FiMinus />
                  </button>
                )}
                <span className="text-lg font-medium">{item.quantity}</span>
                {handleIncrementQuantity && (
                  <button
                    onClick={() =>
                      handleIncrementQuantity(item.id)
                    }
                    className="bg-green-600 text-white rounded-full p-1 hover:bg-green-700"
                  >
                    <FiPlus />
                  </button>
                )}
              </div>
            </td>
          )}

          {/* Product Details */}
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {item.title} <br />
            <span className="text-sm text-gray-600">
              ${item.price.toFixed(2)} * {item.quantity}
            </span>
          </td>

          {/* Total Price */}
          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </td>

          {/* Remove Item */}
          {handleRemoveItem && (
            <td className="px-6 py-4">
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                <FiTrash2 size={20} />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default CartTableBody;
