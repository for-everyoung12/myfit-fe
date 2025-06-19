
// ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Product image */}
      <div className="relative mb-6 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
      </div>
      
      {/* Color options */}
      <div className="flex space-x-2 mb-4">
        {product.colors.map((color, index) => (
          <div
            key={index} // Sử dụng index làm key tạm thời, tốt hơn nên có một id duy nhất cho mỗi màu nếu có.
            className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      {/* Product info */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
      
      {/* Price and buy button */}
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-800">{product.price}</span>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">
          BUY
        </button>
      </div>
    </div>
  );
};

export default ProductCard;