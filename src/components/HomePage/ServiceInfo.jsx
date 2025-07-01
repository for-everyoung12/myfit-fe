import React from 'react';
import aiHand from '../../assets/ai_hand.png';
import aiAR from '../../assets/ai_ar.png';
import looper from '../../assets/looper1.svg';
export const ServiceInfo = () => {
    return (
        <section className="w-full">
            {/* Section 1: AI Hand */}
            <div className="relative w-full overflow-hidden py-20 px-0 flex flex-col md:flex-row items-center md:items-start gap-4">

                {/* AI Hand Image */}
                <div className="z-10 flex justify-start hidden md:block">
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
                        <span className="font-semibold text-white">Thử đồ online</span><br />
                        <span className="font-bold text-[#18FFFF]">Tối ưu phong cách</span>
                    </h2>


                    <p className="text-[18px] md:text-lg text-gray-300 font-normal">
                        Không cần đến cửa hàng, MyFit mang đến trải nghiệm thử đồ ảo và tư vấn phong cách cá nhân hoá ngay trên điện thoại.
                        Chúng tôi giúp bạn chọn đúng món đồ, đúng gu và đúng với chính bạn – mọi lúc, mọi nơi.
                    </p>
                </div>

            </div>


            {/* Section 2: Full-width AI & AR image */}
            <div className="w-full bg-black">
                <img
                    src={aiAR}
                    alt="AI & AR"
                    className="w-full max-w-none h-auto object-cover"
                />
            </div>
        </section>
    );
};
