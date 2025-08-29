import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const logoRef = useRef();
  const btnRef = useRef();
  const menuRef = useRef();
  const menuItemsRef = useRef([]);
  const tl = useRef();

  // انیمیشن لوگو و دکمه ثابت
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        delay: 1,
        duration: 2,
        repeat: -1,
        yoyo: true,
      }
    );

    gsap.to(btnRef.current, {
      x: 300,
      rotation: 360,
      delay: 1.5,
      duration: 7,
      ease: "expo.inOut",
      borderRadius: 300,
    });
  }, []);

  // انیمیشن منوی موبایل
  useEffect(() => {
    if (menuOpen) {
      tl.current = gsap.timeline();
      tl.current
        .fromTo(
          menuRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        )
        .fromTo(
          menuItemsRef.current,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.1"
        );
    } else {
      if (tl.current) {
        tl.current.reverse(); // وقتی منو بسته میشه انیمیشن برعکس بشه
      }
    }
  }, [menuOpen]);

  return (
    <header className="relative w-full z-50 flex justify-center">
      <div
        className="w-full max-w-3xl px-4 py-5 rounded-2xl 
        flex items-center justify-between relative"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {/* لوگو */}
        <h5
          ref={logoRef}
          className="font-bold text-2xl mx-6"
          style={{ color: "var(--theme-color)" }}
        >
          SUZUKI
        </h5>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex gap-6 items-center flex-1">
          <ul className="flex gap-6 list-none text-sm">
            {["HOME", "CART", "PRODUCTS", "ABOUT US"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-white font-medium transition hover:text-[var(--theme-color)]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={btnRef}
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
          className="md:hidden text-white z-50 relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <span className="text-2xl">&times;</span>
          ) : (
            <>
              <div className="w-6 h-0.5 bg-white my-1"></div>
              <div className="w-6 h-0.5 bg-white my-1"></div>
              <div className="w-6 h-0.5 bg-white my-1"></div>
            </>
          )}
        </button>

        {/* منوی موبایل (GSAP) */}
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute top-full left-0 w-full mt-2 
              rounded-2xl p-6 flex flex-col gap-4 md:hidden
              bg-black
              backdrop-blur-3xl shadow-xl"
          >
            {["HOME", "CART", "PRODUCTS", "ABOUT US"].map((item, i) => (
              <a
                key={item}
                ref={(el) => (menuItemsRef.current[i] = el)}
                href="#"
                className="text-white text-lg font-semibold tracking-wide
                hover:text-[var(--theme-color)] transition transform hover:translate-x-2"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <button
              ref={(el) =>
                (menuItemsRef.current[menuItemsRef.current.length] = el)
              }
              className="mt-4 px-4 py-2 rounded-xl font-medium 
                bg-[var(--theme-color)] text-black 
                shadow-lg hover:shadow-[0_0_15px_var(--theme-color)] transition"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
