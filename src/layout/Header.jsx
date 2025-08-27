import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import gsap from 'gsap'


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // باز/بسته بودن منوی موبایل

  const logoRef = useRef()
  const btnRef = useRef()


  
  useEffect(() => {
    gsap.fromTo(logoRef.current,
      {
        opacity: 0
      },
      {
        opacity: 1,
        delay: 1,
        color: 0xffffff,
        duration: 2,
        repeat: -1,
        yoyo: true,
      },

    ),
      gsap.to(btnRef.current,
        {
          x: 300,
          rotation: 360,
          delay: 1.5,
          duration: 7,
          ease: 'expo.inOut',
          backgroundColor: 'tranparent',
          borderRadius: 300,
        },

      )
  }, [])






  return (
    <header className="relative w-full z-50 flex justify-center">
      {/* باکس هدر */}
      <div
        className="w-full max-w-3xl px-4 py-5 rounded-2xl 
        flex items-center justify-between relative"
        style={{
          backdropFilter: "blur(12px)", // افکت شیشه‌ای
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* لوگو سمت چپ */}
        <h5 ref={logoRef}
          className="font-bold text-2xl mx-6"
          style={{ color: "var(--theme-color)" }}
        >
          SUZUKI
        </h5>

        {/* منوی دسکتاپ */}
        <nav  className="hidden md:flex gap-6 items-center flex-1">
          <ul className="flex gap-6 list-none text-sm">
            {/* آیتم‌های منو */}
            <li>
              <a
                href="#"
                className="text-white font-medium transition hover:text-[var(--theme-color)]"
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white font-medium transition hover:text-[var(--theme-color)]"
              >
                CART
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white font-medium transition hover:text-[var(--theme-color)]"
              >
                PRODUCTS
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white font-medium transition hover:text-[var(--theme-color)]"
              >
                ABOUT US
              </a>
            </li>
          </ul>

          {/* دکمه Contact Us */}
          <button ref={btnRef}
            className="ml-auto px-4 py-2 rounded-lg border-2 font-medium transition hover:shadow-[0_0_15px_var(--theme-color)]"
            style={{
              borderColor: "var(--theme-color)",
              color: "var(--theme-color)",
              boxShadow: "0 0 10px var(--theme-color)",
            }}
          >
            Contact Us
          </button>
        </nav>

        {/* دکمه همبرگری موبایل */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* سه خط منو */}
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
          <div className="w-6 h-0.5 bg-white my-1"></div>
        </button>

        {/* منوی موبایل */}
        {menuOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/50 rounded-xl p-4 flex flex-col gap-2 shadow-lg md:hidden backdrop-blur-md">
            {["HOME", "CART", "PRODUCTS", "ABOUT US"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white text-sm font-medium transition hover:text-[var(--theme-color)]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
