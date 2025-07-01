import React from "react";
import learn from "../../assets/learn_more.png";

const ContactPage = () => {
    return (
        <section className="relative bg-[#0a0f2c] text-white px-6 md:px-20 py-24 overflow-hidden">
            {/* Grid chia 2 bên với tỷ lệ 40% - 60% */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[0.2fr_0.8fr] gap-80 relative z-10">
                {/* Left Side - Contact Info */}
                <div className="space-y-10 text-center">
                    <div>
                        <h3 className="text-[24px] font-semibold">Get in touch</h3>
                        <p className="text-white text-sm mt-6">
                            We love to hear from you. Our friendly team is always here to chat.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-[24px] font-semibold">Chat to us</h4>
                        <p className="text-white text-sm mt-6">myfitarofficial@gmail.com</p>
                    </div>

                    <div>
                        <h4 className="text-[24px] font-semibold">Phone</h4>
                        <p className="text-white text-sm">+84 92 771 15 16</p>
                        <p className="text-white text-sm mt-6">Mon – Fri 10AM to 7PM</p>
                    </div>

                    <div>
                        <h4 className="text-[24px] font-semibold">Office</h4>
                        <a
                            href="https://www.tiktok.com/@myfit_ar_official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm block break-words"
                        >
                            https://www.tiktok.com/@myfit_ar_official
                        </a>
                        <a
                            href="https://www.facebook.com/MyFITARfashiontech/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm block break-words mt-2"
                        >
                            https://www.facebook.com/MyFITARfashiontech/
                        </a>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div>
                    <h2 className="text-4xl font-bold mb-6 leading-tight">
                        Be Well Stay Calm And <br />
                        <span className="text-[#18FFFF]">Keep In Touch</span>
                    </h2>

                    <form className="space-y-6">
                        {/* Name */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 text-white text-sm font-medium" htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                className="w-full bg-transparent border border-white px-4 py-3 rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 text-white text-sm font-medium" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="w-full bg-transparent border border-white px-4 py-3 rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 text-white text-sm font-medium" htmlFor="phone">Phone no.</label>
                            <input
                                id="phone"
                                type="tel"
                                className="w-full bg-transparent border border-white px-4 py-3 rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Message */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 text-white text-sm font-medium" htmlFor="message">How can we help?</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full bg-transparent border border-white px-4 py-3 rounded-md focus:outline-none"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="mt-6 flex items-center gap-3 text-[#18FFFF] font-medium group"
                        >
                            <img src={learn} alt="learn icon" className="w-6 h-6" />
                            Get Started
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default ContactPage;
