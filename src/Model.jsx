import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

export default function Model({ body, undercarriage, Tiers, onLoad }) {
  const groupRef = useRef();

  // استفاده از useGLTF به جای useLoader
  const gltf = useGLTF("./models/motor.glb");

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

    if (groupRef.current) {
      groupRef.current.position.y = -7;
      gsap.to(groupRef.current.position, {
        y: -4,
        duration: 1.5,
        ease: "power3.out",
      });
    }

    if (onLoad) onLoad();
  }, [gltf, body, undercarriage, Tiers, onLoad]);

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
