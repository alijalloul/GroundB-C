"use client";

import {
  AccumulativeShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Sphere,
  useGLTF,
} from "@react-three/drei";

import { useEffect } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

import * as THREE from "three";

export const Scene = ({ mainColor, path, ...props }) => {
  const { scene } = useGLTF(`models/${path}`);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <group {...props} scale={2} dispose={null}>
      <Environment background>
        <Sphere scale={15}>
          <meshBasicMaterial color="white" side={THREE.BackSide} />
        </Sphere>
      </Environment>

      <PerspectiveCamera makeDefault position={[3, 3, 20]} />
      <OrbitControls
        autoRotate
        enablePan={false}
        maxPolarAngle={DEG2RAD * 75}
        minDistance={6}
        maxDistance={25}
        autoRotateSpeed={0.5}
      />
      <AccumulativeShadows
        frames={100}
        alphaTest={0.9}
        scale={30}
        position={[0, -0.005, 0]}
        color="white"
        opacity={0.8}
      >
        <RandomizedLight
          amount={4}
          radius={9}
          intensity={0.8}
          ambient={0.25}
          position={[10, 5, 15]}
        />
        <RandomizedLight
          amount={4}
          radius={5}
          intensity={0.5}
          position={[-5, 5, 15]}
          bias={0.001}
        />
      </AccumulativeShadows>
      <primitive object={scene} />
    </group>
  );
};
