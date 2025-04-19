import React from "react";
import Card from "./ui/Card";
import Icon from "./ui/Icon";

interface WaitPageProps {
  secondsLeft: number;
}

const WaitPage: React.FC<WaitPageProps> = ({ secondsLeft }) => {
  const min = Math.floor(secondsLeft / 60);
  const sec = secondsLeft % 60;
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#bae6fd]">
      <Card>
        <div className="flex justify-center mb-4">
          <Icon bgClass="bg-blue-100">
            <span className="text-3xl">🕒</span>
          </Icon>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-2">Processing...</h2>
        <p className="mb-4 text-gray-700">
          Your file is being generated. Please wait.
        </p>
        <div className="text-4xl font-mono font-extrabold text-blue-600 mb-2 tracking-wider">
          {min}:{sec.toString().padStart(2, "0")}
        </div>
        <div className="text-gray-500 text-sm">remaining</div>
      </Card>
    </div>
  );
};

export default WaitPage;
