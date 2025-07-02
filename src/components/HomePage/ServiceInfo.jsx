import React from "react";
import aiHand from "../../assets/ai_hand.png";
import aiAR from "../../assets/ai_ar.png";
import looper from "../../assets/looper1.svg";
export const ServiceInfo = () => {
  return (
    <section className="w-full mb-10">
      {/* Section 1: AI Hand */}
      <div className="relative w-full overflow-hidden py-20 px-0 flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* AI Hand Image */}
        <div className="z-10 justify-start hidden md:block">
          <img
            src={aiHand}
            alt="AI Hand"
            className="w-[50vw] h-auto object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="z-10 flex-1 text-white space-y-4 max-w-xl px-6 font-poppins">
          <p className="text-[22px] uppercase text-white font-medium">
            Services
          </p>

          <h2 className="text-[55px] md:text-4xl leading-snug font-poppins">
            <span className="font-semibold text-white">Thử đồ online</span>
            <br />
            <span className="font-bold text-[#18FFFF]">Tối ưu phong cách</span>
          </h2>

          <p className="text-[18px] md:text-lg text-gray-300 font-thin">
            Không cần đến cửa hàng, MyFit mang đến trải nghiệm thử đồ ảo và tư
            vấn phong cách cá nhân hoá ngay trên điện thoại. Chúng tôi giúp bạn
            chọn đúng món đồ, đúng gu và đúng với chính bạn – mọi lúc, mọi nơi.
          </p>
        </div>
      </div>

      {/* Section 2: Full-width AI & AR image */}
      <div className="flex w-full bg-black items-start">
        {/* Hình ảnh chiếm 50%, cao hơn */}
        <div className="w-[50%] h-[400px]">
          <img
            src={aiAR}
            alt="AI & AR"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text chiếm 50% */}
        <div className="w-[50%] px-8">
          <h2 className="text-white text-[55px] leading-tight font-semibold">
            <span className="text-[#18FFFF]">AI & AR </span>– Cặp đôi <br /> công nghệ
            định nghĩa <br /> lại trải nghiệm thời <br /> trang số.
          </h2>
        </div>
      </div>
    </section>
  );
};
