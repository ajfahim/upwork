import React from "react";
import Card from "./ui/Card";
import Icon from "./ui/Icon";

interface BusySplashProps {
  onReset: () => void;
}

const BusySplash: React.FC<BusySplashProps> = ({ onReset }) => (
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#bae6fd]">
    <Card>
      <div className="flex justify-center mb-4">
        <Icon bgClass="bg-red-100">
          <span className="text-3xl">⏳</span>
        </Icon>
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Session Busy</h2>
      <p className="mb-6 text-gray-700">
        Sorry, another session is in use.
        <br />
        Please wait or contact <span className="font-semibold">Nick</span> for a reset.
      </p>
      <button
        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow hover:from-red-600 hover:to-pink-600 transition"
        onClick={onReset}
      >
        Reset Session (Nick only)
      </button>
    </Card>
  </div>
);

export default BusySplash;
