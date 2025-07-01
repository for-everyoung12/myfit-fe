import React from 'react'
import shoppingImage from "../../assets/online-shopping.png";
const AboutUsSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={shoppingImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text section */}
        <div className="text-white md:w-1/2">
          <h2 className="text-[82px] font-bold mb-4">About Us</h2>
          <p className="text-[#18FFFF] text-[24px] font-semibold italic mb-4">“ MyFit là một dự án start up từ sinh viên ”</p>
          <p className="text-[24px] font-semibold leading-relaxed">
            MyFit là một startup sinh viên tại Việt Nam, ra đời năm 2025, tiên phong ứng dụng công nghệ AR và AI vào thử đồ ảo và tư vấn phong cách cá nhân.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection