import React from "react";
import storyImage from "../../assets/about-us-2.png";

const AboutUsStory = () => {
  return (
    <section className="relative bg-[#0a0f2c] text-white overflow-hidden pt-24">
      {/* Wrapper */}
      <div className="relative z-10 max-w-[100vw] w-full flex flex-col gap-32">
        
        {/* PHẦN 1: OUR COMPANY */}
        <div className="text-center max-w-5xl mx-auto px-6 md:px-20">
          <h3 className="text-[#18FFFF] text-3xl font-semibold mb-6">Our company</h3>
          <p className="text-white leading-loose text-lg md:text-xl">
            MyFit là một startup sinh viên ra đời năm 2025 bởi nhóm sinh viên Đại học FPT TP.HCM trong khuôn khổ môn học Khởi nghiệp.
            Dự án ứng dụng công nghệ thực tế tăng cường (AR) vào ngành thời trang và thương mại điện tử; nhằm mang đến trải nghiệm thử đồ ảo
            và tư vấn phong cách cá nhân hoá. Với tinh thần đổi mới, MyFit hướng đến việc xóa nhòa khoảng cách giữa online và offline,
            tạo nên hành trình mua sắm thông minh, liền mạch và phù hợp với hệ tiêu dùng số.
          </p>
        </div>

        {/* PHẦN 2: Ảnh trái – Text phải */}
        <div className="flex flex-col lg:flex-row items-stretch w-full">
          {/* Bên trái: ảnh SÁT MÉP */}
          <div className="w-full lg:w-1/2">
            <img
              src={storyImage}
              alt="AR demo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bên phải: nội dung */}
          <div className="w-full lg:w-1/2 flex flex-col px-6 md:px-20  bg-[#0a0f2c]">
            <h3 className="text-[#18FFFF] text-3xl font-semibold mb-4">Throughout our journey.</h3>
            <p className="text-white leading-loose text-lg md:text-xl">
              Chúng tôi nhận ra mua sắm online còn nhiều bất cập – người dùng khó biết món đồ có phù hợp, dễ chọn sai và hoàn trả.
              MyFit ra đời với công nghệ AR thử đồ ảo và tư vấn phong cách, nhằm giải quyết vấn đề đó – giúp bạn chọn đúng,
              mặc chuẩn và thể hiện cá tính.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsStory;
