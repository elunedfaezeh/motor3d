// Loader.jsx
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import gsap from "gsap";

export default function Loader({ progress }) {
  const logoRef = useRef()

  useEffect(() => {
  gsap.fromTo(
    logoRef.current,
    { opacity: 0 },
    { opacity: 1, delay: 1, duration: 2, repeat: -1, yoyo: true }
  )
}, [])

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center 
        bg-black z-50 transition-opacity duration-500"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      <h1 ref={logoRef}
        className="text-4xl font-bold mb-6"
        style={{
          color: "#643243",
        }}
      >
        SUZUKI
      </h1>

      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--theme-color)] transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="mt-3 text-sm text-white/70 font-orbitron">
        {Math.floor(progress)}%
      </p>
    </div>
  );
}
