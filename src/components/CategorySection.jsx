import React from "react";

const CategorySection = () => {
  const categories = [
    {
      title: "Casual Wear",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop"
    },
    {
      title: "50% Summer Collection", 
      image: "https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=400&h=300&fit=crop"
    },
    {
      title: "Sports Ready",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer">
              <img 
                src={category.image} 
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-white text-2xl font-bold">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;