import React from "react";
import learnMoreIcon from "../../assets/learn_more.png";
import vr from "../../assets/vr.png";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Glowing light spots */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl"></div>
      <div className="absolute top-[60%] left-[40%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-[15%] w-60 h-60 bg-blue-500/20 rounded-full blur-[100px]"></div>

      {/* Background Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      {/* Main Content Container */}
      <div className="container mx-auto px-20 py-20 max-w-8xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-[66px] font-bold leading-tight text-[#18FFFF]">
                Let's MyFit
              </h1>
              <h2 className="text-3xl lg:text-[66px] font-bold text-white whitespace-nowrap">
                Fit your style - Fit your life
              </h2>
            </div>

            <p className="text-[18px] text-white max-w-lg">
              Trải nghiệm thử đồ ảo, tư vấn cá nhân hóa và mua sắm thông minh.
              Định nghĩa lại cách bạn tương tác với thời trang.
            </p>
            <Link to="/download" className="z-10 relative">
              <div className="flex items-center space-x-3 mt-10">
                <img
                  src={learnMoreIcon}
                  alt="Learn More Icon"
                  className="w-15 h-15"
                />
                <span className="text-cyan-400 font-medium">Learn More</span>
              </div>
            </Link>
          </div>

          {/* Right Content - VR Image */}
          <div className="flex justify-center items-center w-full hidden md:block">
            <img
              src={vr}
              alt="VR"
              className="w-full max-w-[900px] h-auto object-contain hidden xl:block"
            />

            {/* Light blobs near image */}
            <div className="absolute top-[25%] right-[5%] w-28 h-28 bg-yellow-300/30 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-[40%] right-[15%] w-36 h-36 bg-yellow-200/30 rounded-full blur-[60px]"></div>
            <div className="absolute bottom-[15%] right-[10%] w-32 h-32 bg-cyan-300/30 rounded-full blur-2xl animate-glow"></div>
            <div className="absolute bottom-[5%] right-[25%] w-40 h-40 bg-purple-300/20 rounded-full blur-[90px]"></div>
            <div className="absolute top-[55%] right-[2%] w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
