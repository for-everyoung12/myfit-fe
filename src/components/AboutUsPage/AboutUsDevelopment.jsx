import React from "react";
import devImage from "../../assets/about-us-3.png"; // hoặc đổi sang đúng ảnh mày dùng

const AboutUsDevelopment = () => {
  return (
    <section className="bg-[#0a0f2c] text-white overflow-hidden px-6 md:px-20 py-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Bên trái: Hình ảnh */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={devImage}
            alt="Development"
            className="w-full max-w-[400px] aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Bên phải: Nội dung */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-[#18FFFF] text-2xl md:text-3xl font-bold mb-4">
            Chúng tôi đang hoàn thiện sản phẩm với nhiều ý tưởng công nghệ mới
          </h3>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed">
            MyFit đang trong giai đoạn hoàn thiện giao diện, tối ưu kiến trúc hệ thống và thử nghiệm các nguyên mẫu đầu tiên.<br />
            Chúng tôi không ngừng đổi mới để mang đến trải nghiệm thử đồ ảo và tư vấn phong cách tốt nhất. Phiên bản chính thức dự kiến ra mắt vào giữa năm 2025.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsDevelopment;
