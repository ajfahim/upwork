import React, { useState } from "react";
import Card from "./ui/Card";
import Icon from "./ui/Icon";

interface LoginFormProps {
  onLogin: (pw: string) => void;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, error }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#e0e7ff] via-[#f0fdfa] to-[#bae6fd]">
      <Card>
        <div className="flex justify-center mb-6">
          <Icon bgClass="bg-blue-100" size="w-16 h-16">
            <span className="text-4xl">🔒</span>
          </Icon>
        </div>
        <h2 className="text-3xl font-extrabold text-center mb-2 text-blue-800 tracking-tight">
          Sign In
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your password to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/80 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-lg font-bold shadow-md hover:from-blue-700 hover:to-indigo-600 transition"
          >
            Login
          </button>
          {error && (
            <div className="text-red-600 text-center text-sm font-medium">
              {error}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
