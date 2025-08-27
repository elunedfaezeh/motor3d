import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

export default function Model({ body, undercarriage, Tiers, onLoad }) {
  const groupRef = useRef();

  // لود مدل
  const gltf = useLoader(GLTFLoader, "./models/motor.glb");

  // وقتی مدل کامل لود شد
  useEffect(() => {
    if (!gltf) return;

    // تغییر رنگ بخش‌ها
    const colorMap = {
      Object_4: body,
      Object_5: undercarriage,
      Object_47: Tiers,
    };
    gltf.scene.traverse((child) => {
      if (child.isMesh && colorMap[child.name]) {
        child.material.color.set(colorMap[child.name]);
        child.material.needsUpdate = true;
      }
    });

    // انیمیشن ورود مدل
    if (groupRef.current) {
      groupRef.current.position.y = -7; // شروع پایین
      gsap.to(groupRef.current.position, {
        y: -4,        // موقعیت نهایی
        duration: 1.5, // سرعت سریع‌تر
        ease: "power3.out",
      });
    }

    if (onLoad) onLoad(); // spinner مخفی شود
  }, [gltf, body, undercarriage, Tiers, onLoad]);

  // چرخش مدل
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.07 * delta;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={window.innerWidth < 768 ? 5 : 6} // موبایل کمی کوچکتر
      position={[0, -4, 0]}
    >
      <primitive object={gltf.scene} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 5]} intensity={2.5} color={body} />
    </group>
  );
}
