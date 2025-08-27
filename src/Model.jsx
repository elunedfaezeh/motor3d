import { useRef, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";

export default function Model({ body, undercarriage, Tiers }) {
  const groupRef = useRef();

  // لود مدل
  const gltf = useLoader(GLTFLoader, "./models/motor.glb");

  // چرخش مدل
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= 0.07 * delta;
    }
  });

  // تغییر رنگ بخش‌های مدل
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
        child.material.needsUpdate = true;
      }
    });
  }, [gltf, body, undercarriage, Tiers]);

  // انیمیشن ورود مدل با GSAP
  useEffect(() => {
    if (!groupRef.current || !gltf) return;

    // شروع مدل پایین
    groupRef.current.position.y = -7;

    // حرکت به موقعیت نهایی
    gsap.to(groupRef.current.position, {
      y: -4,       // موقعیت نهایی
      duration: 3,  // زمان انیمیشن
      ease: "power3.out",
    });
  }, [gltf]);

  return (
    <group ref={groupRef} scale={6} position={[0, -4, 0]}>
      {/* مدل */}
      <primitive object={gltf.scene} />

      {/* نورهایی که همراه مدل بچرخن */}
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 5]} intensity={2.5} color={body} />
    </group>
  );
}
