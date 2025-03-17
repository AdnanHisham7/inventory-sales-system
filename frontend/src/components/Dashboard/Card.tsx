// Reusable Card Component
import React from "react";
interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, bgColor = 'bg-white' }) => {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-md flex items-center justify-between`}>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  );
};

export default Card;