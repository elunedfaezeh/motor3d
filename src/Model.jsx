import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

export default function Model({ body, undercarriage, Tiers }) {
  const groupRef = useRef();
  const gltf = useLoader(GLTFLoader, "./models/motor.glb");

  // 🎨 تغییر رنگ (فقط رنگ آپدیت بشه)
  useEffect(() => {
    if (!gltf) return;

    const colorMap = {
      Object_4: body,
      Object_5: undercarriage,
      Object_47: Tiers,
    };

    gltf.scene.traverse((child) => {
      if (child.isMesh && colorMap[child.name]) {
        child.material.color.set(colorMap[child.name]);
      }
    });
  }, [body, undercarriage, Tiers, gltf]);

  // 🚀 انیمیشن ورود (فقط یک بار)
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.y = -7; // شروع پایین
      gsap.to(groupRef.current.position, {
        y: -4, // موقعیت نهایی
        duration: 1.5,
        ease: "power3.out",
      });
    }
  }, [gltf]); // 👈 فقط وقتی مدل لود شد اجرا بشه

  // 🔄 چرخش مدل
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.07 * delta;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={window.innerWidth < 768 ? 5 : 6}
      position={[0, -4, 0]}
    >
      <primitive object={gltf.scene} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 5]} intensity={2.5} color={body} />
    </group>
  );
}
