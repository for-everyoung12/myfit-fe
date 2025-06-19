import React from "react";

const LimitedEditionSection = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-orange-600 via-red-600 to-blue-900 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop"
          alt="Limited Edition"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="text-white max-w-md">
          <p className="text-[24px] font-bold mb-2 tracking-wider">LIMITED EDITION</p>
          <h2 className="text-[72px] font-bold mb-6">50% OFF</h2>
          <div variant="outline" className="border-white text-white cursor-pointer">
            see all collection
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedEditionSection;