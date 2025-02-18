"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";
import { Canvas, useThree, useFrame } from "@react-three/fiber";

const AsciiRenderer = () => {
  const { gl, scene, camera, size } = useThree();
  const effectRef = useRef<AsciiEffect | null>(null);

  useEffect(() => {
    const effect = new AsciiEffect(gl, " .:-+*=%@#", { invert: true });
    effect.setSize(size.width, size.height);
    effect.domElement.style.color = "white";
    effect.domElement.style.backgroundColor = "black";

    document.body.appendChild(effect.domElement);
    effectRef.current = effect;

    return () => {
      document.body.removeChild(effect.domElement);
    };
  }, [gl, size]);

  useFrame(() => {
    if (effectRef.current) {
      effectRef.current.render(scene, camera);
    }
  });

  return null;
};

const Sphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.z += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 16]} />
      <meshPhongMaterial flatShading />
    </mesh>
  );
};

export default function AsciiSphere() {
  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <Sphere />
      <AsciiRenderer />
    </Canvas>
  );
}
