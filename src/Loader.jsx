import { useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress(); // درصد واقعی لودینگ

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center 
        bg-black z-50 transition-opacity duration-700
        ${progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* لوگو */}
      <h1
        className="text-3xl font-bold mb-6"
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

      {/* درصد لود */}
      <p className="mt-3 text-sm text-white/70 font-orbitron">
        {Math.floor(progress)}%
      </p>
    </div>
  );
}
