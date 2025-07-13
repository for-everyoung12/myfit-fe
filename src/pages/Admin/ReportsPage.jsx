import React from "react";
import dressImg from "../../assets/dress.png";
import vestImg from "../../assets/vest.png";
import kidDressImg from "../../assets/kiddress.png";
import arrowUp from "../../assets/arrow-up.svg";
import arrowDown from "../../assets/arrow-down.svg";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const activityData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 180 },
    { month: "Mar", value: 240 },
    { month: "Apr", value: 290 },
    { month: "May", value: 220 },
    { month: "Jun", value: 260 },
    { month: "Jul", value: 310 },
    { month: "Aug", value: 280 },
    { month: "Sep", value: 300 },
    { month: "Oct", value: 340 },
    { month: "Nov", value: 360 },
    { month: "Dec", value: 390 },
];

const ReportsPage = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Reports</h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <Dropdown label="Timeframe: All-time" />
                <Dropdown label="People: All" />
                <Dropdown label="Topic: All" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-cols-3 gap-4">
                    <StatCard title="Active Users" value="27/80" />
                    <StatCard title="Questions Answered" value="3,298" />
                    <StatCard title="Av. Session Length" value="2m 34s" />
                    <StatCard title="Starting Knowledge" value="64%" />
                    <StatCard title="Current Knowledge" value="86%" />
                    <StatCard title="Knowledge Gain" value="+34%" />
                </div>

                <div className="bg-white rounded-lg shadow p-4 h-full">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-sm font-semibold text-gray-800">Activity</h2>
                        <span className="text-sm text-gray-400">Month ▾</span>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={activityData} barGap={8}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" axisLine={false} tickLine={false} />
                            <Tooltip wrapperStyle={{ outline: "none" }} contentStyle={{ fontSize: "12px", borderRadius: "8px", borderColor: "#e5e7eb" }} cursor={{ fill: "#f3f4f6" }} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="url(#colorUv)" barSize={20} />
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TopicList title="Weakest Topics" color="red" topics={[{ label: "Dress Sexy", percent: 74, image: dressImg }, { label: "Vest", percent: 52, image: vestImg }, { label: "Kid Dress", percent: 36, image: kidDressImg }]} />
                <TopicList title="Strongest Topics" color="green" topics={[{ label: "Pleated Skirt", percent: 95, image: dressImg }, { label: "Tuxedo", percent: 92, image: vestImg }, { label: "Pullover", percent: 89, image: kidDressImg }]} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Leaderboard title="User Leaderboard" users />
                <Leaderboard title="Groups Leaderboard" />
            </div>
        </div>
    );
};

export default ReportsPage;

const Dropdown = ({ label }) => (
    <div className="relative">
        <select className="w-full bg-white border text-sm text-gray-700 px-4 py-2 rounded shadow-sm appearance-none">
            <option>{label}</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">
            ▼
        </div>
    </div>
);

const StatCard = ({ title, value }) => (
    <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const TopicList = ({ title, color, topics }) => {
    const getGradient = () => {
        if (color === "red") return "linear-gradient(to right, #FFBF1A, #FF4080)";
        if (color === "green") return "linear-gradient(to right, #2FEA9B, #7FDD53)";
        return "#e5e5e5";
    };

    return (
        <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-sm font-semibold text-gray-800 mb-5">{title}</h2>
            <div className="space-y-4">
                {topics.map((t) => (
                    <div key={t.label} className="flex items-center gap-4">
                        <img src={t.image} alt={t.label} className="w-10 h-10 rounded object-cover" />
                        <div className="flex-1">
                            <div className="flex justify-between mb-1 text-sm font-medium">
                                <span>{t.label}</span>
                                <span className="text-gray-500">{t.percent}% <span className="text-xs">Correct</span></span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden relative" style={{ background: getGradient() }}>
                                <div className="absolute top-0 bottom-0 right-0" style={{ width: `${100 - t.percent}%`, backgroundColor: "#f1f5f9" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Leaderboard = ({ title, users = false }) => {
    const data = users ? [
        { name: "Jesse Thomas", points: 637, correct: "98%", rank: 1, trend: "up", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
        { name: "Thisal Mathiyazhagan", points: 637, correct: "89%", rank: 2, trend: "down", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "Helen Chuang", points: 637, correct: "88%", rank: 3, trend: "up", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
        { name: "Lura Silverman", points: 637, correct: null, rank: 4, trend: "up", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    ] : [
        { name: "Houston Facility", points: 52, correct: "97%", rank: 1, trend: "up" },
        { name: "Test Group", points: 52, correct: "95%", rank: 2, trend: "down" },
        { name: "Sales Leadership", points: 52, correct: "87%", rank: 3, trend: "up" },
        { name: "Northeast Region", points: 52, correct: null, rank: 4, trend: "up" },
    ];

    return (
        <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">{title}</h2>
            <ul className="space-y-4 text-sm">
                {data.map((item) => (
                    <li key={item.name} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            {users && (
                                <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                            )}
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-gray-500 text-xs">{item.points} Points{item.correct && ` - ${item.correct} Correct`}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold">{item.rank}</span>
                            <img src={item.trend === "up" ? arrowUp : arrowDown} alt={item.trend} className="w-3 h-3" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
