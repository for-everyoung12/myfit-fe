import React, { useEffect, useState } from "react";
import { getAllPlans } from "../../services/plan.service";
import { getCurrentUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import ellipse from "../../assets/ellipse.png";

const PlanInfo = () => {
  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansData, userData] = await Promise.all([
          getAllPlans(),
          getCurrentUser(),
        ]);
        setPlans(plansData);
        setUser(userData);
      } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectPlan = (plan) => {
    if (user?.planId === plan.id || user?.planId === plan._id) return;
    navigate("/payment", { state: { plan } });
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 min-h-[100vh] flex flex-col justify-start text-white pt-20 pb-16 px-6">
      <div className="text-center mb-14">
        <p className="text-sm text-gray-400">Pricing Plan</p>
        <h2 className="text-4xl font-bold">
          Our <span className="text-cyan-400">Pricing Plan</span>
        </h2>
      </div>

      {/* ✅ Grid tối đa 4 cột trên màn hình lớn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {plans.map((plan) => {
          const discountedPrice = plan.price * (1 - plan.discountPercent / 100);
          const isCurrentPlan =
            user?.planId === plan.id || user?.planId === plan._id;
          const isBetaPlan = plan.name === "Gói BETA Cao Cấp 3 Tháng";

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 text-center flex flex-col justify-between space-y-6 transition duration-300 w-full max-w-[360px] mx-auto
                ${
                  isBetaPlan
                    ? "bg-gradient-to-br from-fuchsia-700 to-indigo-900 border-2 border-pink-500 shadow-xl scale-[1.05]"
                    : "bg-black/80 hover:shadow-2xl hover:scale-[1.03]"
                }
              `}
            >
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={ellipse}
                  alt="Plan Icon"
                  className="w-16 h-16 object-contain"
                />
                <h3 className="text-2xl font-bold">{plan.name}</h3>

                {/* 🔥 Badge cho gói BETA */}
                {isBetaPlan && (
                  <span className="text-xs bg-pink-500 text-white px-3 py-1 rounded-full font-bold mt-2 animate-pulse">
                    Đặc biệt
                  </span>
                )}

                {/* Giá sau giảm */}
                <p className="text-4xl font-extrabold text-white">
                  {(discountedPrice / 1000).toFixed(2)}{" "}
                  <span className="text-base">k</span>
                </p>

                {/* Giá gốc nếu có giảm */}
                {plan.discountPercent > 0 && (
                  <p className="text-sm text-gray-400 line-through">
                    {(plan.price / 1000).toFixed(2)} k
                  </p>
                )}

                <ul className="text-sm text-left text-gray-300 space-y-2 mt-2">
                  <li>• Truy cập trong {plan.durationMonths} tháng</li>
                  <li>
                    •{" "}
                    {plan.discountPercent > 0
                      ? `Tiết kiệm ${plan.discountPercent}%`
                      : "Không giảm giá"}
                  </li>
                </ul>
              </div>

              {/* Nút chọn hoặc bị disable */}
              <button
                onClick={() => handleSelectPlan(plan)}
                disabled={isCurrentPlan}
                className={`mt-6 inline-block px-6 py-2 rounded-full text-sm font-semibold transition ${
                  isCurrentPlan
                    ? "bg-gray-500 text-white cursor-not-allowed"
                    : isBetaPlan
                    ? "bg-pink-500 text-white hover:bg-pink-600"
                    : "bg-cyan-400 text-black hover:bg-cyan-500"
                }`}
              >
                {isCurrentPlan ? "You are here" : "Get This Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanInfo;
