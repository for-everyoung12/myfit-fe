import React, { useEffect, useState } from "react";
import { getAllPlans } from "../../services/plan.service";
import { useNavigate } from "react-router-dom";
import ellipse from "../../assets/ellipse.png";

const PlanInfo = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await getAllPlans();
                setPlans(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách gói:", error);
            }
        };
        fetchPlans();
    }, []);

    const handleSelectPlan = (plan) => {
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-black/80 rounded-3xl p-8 text-center flex flex-col justify-between space-y-6 hover:shadow-2xl hover:scale-[1.03] transition duration-300 w-full max-w-[360px] mx-auto"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={ellipse}
                                alt="Plan Icon"
                                className="w-16 h-16 object-contain"
                            />
                            <h3 className="text-2xl font-bold">{plan.name}</h3>
                            <p className="text-4xl font-extrabold text-white">
                                {(plan.price / 1000).toFixed(2)} <span className="text-base">k</span>
                            </p>

                            <ul className="text-sm text-left text-gray-300 space-y-2 mt-2">
                                <li>• Truy cập trong {plan.durationMonths} tháng</li>
                                <li>
                                    • {plan.discountPercent > 0
                                        ? `Tiết kiệm ${plan.discountPercent}%`
                                        : "Không giảm giá"}
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => handleSelectPlan(plan)}
                            className="mt-6 inline-block px-6 py-2 bg-cyan-400 text-black rounded-full text-sm font-semibold hover:bg-cyan-500"
                        >
                            Get This Plan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlanInfo;
