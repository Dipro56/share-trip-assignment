import React from 'react';

const CartTableHead = ({ cartTableHeadList }) => {
  return (
    <thead>
      <tr className="border-b border-gray-300">
        {cartTableHeadList?.map((item, index) => {
          return (
            <th key={index} className="py-3 px-4 text-left text-green-600">
              {item}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default CartTableHead;
