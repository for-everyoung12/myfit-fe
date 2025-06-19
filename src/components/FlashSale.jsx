import { useState } from "react";
import ProductCard from "./ProductCard";

const FlashSale = () => {
  const [activeCategory, setActiveCategory] = useState("WOMEN");
  
  const categories = ["MEN", "WOMEN", "KIDS", "ACCESSORIES"];
  
  const products = [
    {
      id: 1,
      name: "Blazer",
      description: "Turn heads with the elegant fitted silhouette featuring a perfect blend of sophistication and charm.",
      price: "$99",
      image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop",
      colors: ["#D4A574", "#8B4513", "#2E8B57"]
    },
    {
      id: 2,
      name: "T-shirt",
      description: "Turn heads with the elegant fitted silhouette featuring a perfect blend of sophistication and charm.",
      price: "$39",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      colors: ["#FFA500", "#32CD32", "#4169E1"]
    },
    {
      id: 3,
      name: "Black casual",
      description: "Turn heads with the elegant fitted silhouette featuring a perfect blend of sophistication and charm.",
      price: "$79",
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop",
      colors: ["#FFA500", "#32CD32", "#4169E1"]
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-transparent"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          FLASH SALE
        </h2>
        
        {/* Category tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-slate-800/50 rounded-full p-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === category
                    ? "bg-cyan-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-12 space-x-2">
          {[1, 2, 3, 4].map((dot) => (
            <div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-cyan-400" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlashSale;