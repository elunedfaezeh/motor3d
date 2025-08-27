import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import gsap from "gsap";

import { useRef } from "react";

export default function Scene3d() {
  const [body, setBody] = useState("#643243");
  const [undercarriage, setUndercarriage] = useState("#000000");
  const [Tiers, setTiers] = useState("#000000");
const controlsRef = useRef()
const hRef = useRef()

  // تغییر تم
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", body);

    const gradient = `linear-gradient(
      0deg,
      ${body} 0%,
      ${body}CC 15%,
      #000000 40%,
      #000000 100%
    )`;
    document.documentElement.style.setProperty("--theme-gradient", gradient);
    gsap.to(controlsRef.current, {
      y:-200,
      delay: 2,
      duration: 6,
    })
  ,
  gsap.fromTo(hRef.current, 
    {
      opacity: 0
    },
    {
      opacity: 1,
      delay: 1,
      color: 0xffffff,
      duration: 4,
      repeat: 0,
      // yoyo: true,
    },
  
   ),[body] });


 

  return (
    <div ref={hRef} className="w-screen  relative text-white flex flex-col items-center px-4 md:px-12">
      {/* متن و دکمه‌ها */}
      <section className="flex flex-col items-center text-center gap-4 mt-2">
        <h1  className="text-3xl md:text-5xl font-Avega py-3 max-w-[600px] leading-tight">
          THIS IS WHAT{" "}
          <span
            className="bg-clip-text text-transparent drop-shadow-[0_0_10px_var(--theme-color)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--theme-color), white)",
            }}
          >
            THE FUTURE LOOKS
          </span>{" "}
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
            LIKE
          </span>
        </h1>

        <p className="text-xs md:text-sm text-white-200 font-orbitron max-w-[450px] leading-snug my-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maur possimus
          voluptatum iusto.
        </p>

        <div className="flex gap-4 mt-1">
          <button
            className="px-5 py-1.5 rounded-md border font-medium transition text-sm"
            style={{
              borderColor: "var(--theme-color)",
              color: "var(--theme-color)",
              boxShadow: "0 0 10px var(--theme-color)",
            }}
          >
            See All
          </button>
          <button
            className="px-5 py-1.5 rounded-md font-medium transition text-sm"
            style={{
              color: "var(--theme-color)",
            }}
          >
            About Us
          </button>
        </div>
      </section>

      {/* مدل 3D */}
      <div className="w-full max-w-[700px] h-[400px] md:h-[530px] mt-4">
        <Canvas camera={{ position: [10, 0, 0] }}>
          <ambientLight intensity={2} />
          <pointLight position={[5, -7, 7]} intensity={2} />
          <directionalLight position={[5, 10, 5]} intensity={2} />
          <directionalLight position={[30, 5, 5]} intensity={4.5} />
          <directionalLight position={[0, 0, 5]} intensity={3} />

          <Suspense fallback={null}>
            <Model  body={body} undercarriage={undercarriage} Tiers={Tiers} />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>

      {/* کنترل رنگ‌ها */}
      <section ref={controlsRef} className="absolute left-3 md:left-16 bottom-10 md:bottom-28
        flex flex-col gap-2 border border-white/20 py-2 px-3 md:py-4 md:px-5 
        rounded-xl font-orbitron text-[10px] md:text-xs bg-white/10 
        backdrop-blur-md shadow-lg w-32 md:w-44">

        <label className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap">Body</span>
          <input
            type="color"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-5 h-5 md:w-7 md:h-7 shadow-inner cursor-pointer 
            appearance-none overflow-hidden rounded-md"
          />
        </label>

        <label className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap">Bottom</span>
          <input
            type="color"
            value={undercarriage}
            onChange={(e) => setUndercarriage(e.target.value)}
            className="w-5 h-5 md:w-7 md:h-7 shadow-inner cursor-pointer 
            appearance-none overflow-hidden rounded-md"
          />
        </label>

        <label className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap">Tiers</span>
          <input
            type="color"
            value={Tiers}
            onChange={(e) => setTiers(e.target.value)}
            className="w-5 h-5 md:w-7 md:h-7 shadow-inner cursor-pointer 
            appearance-none overflow-hidden rounded-md"
          />
        </label>
      </section>

    </div>
  );
}
