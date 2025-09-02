import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Loader() {
  const { progress } = useProgress();
  const [hide, setHide] = useState(false);

  // وقتی کامل لود شد -> بعد ۰.۸ ثانیه مخفی شه
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setHide(true), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center 
        bg-black z-50 transition-all duration-700
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* لوگو */}
      <h1
        className="text-4xl font-bold mb-6"
        style={{
          color: "var(--theme-color)",
          textShadow: `0 0 15px var(--theme-color)`,
        }}
      >
        SUZUKI
      </h1>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--theme-color)] transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* درصد */}
      <p className="mt-3 text-sm text-white/70 font-orbitron">
        {Math.floor(progress)}%
      </p>
    </div>
  );
}
