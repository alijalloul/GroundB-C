"use client";

import { CameraControls, Grid, RenderTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Scene } from "./Scene";

import { scenes } from "@/constants/scene";

const CameraHandler = ({ slide, slideDistance }) => {
  const viewport = useThree((state) => state.viewport);
  const cameraControls = useRef();
  const nextSlideX = viewport.width + slideDistance;

  const { dollyDistance } = useControls({
    dollyDistance: {
      value: 10,
      min: 0,
      max: 50,
    },
  });

  async function moveToSlide() {
    await cameraControls.current.setLookAt(
      (slide - 1 < 0 ? 2 : slide - 1) * nextSlideX,
      3,
      dollyDistance,
      (slide - 1 < 0 ? 2 : slide - 1) * nextSlideX,
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      (slide + 1) * nextSlideX,
      1,
      dollyDistance,
      slide * nextSlideX,
      0,
      0,
      true
    );

    await cameraControls.current.setLookAt(
      slide * nextSlideX,
      0,
      5,
      slide * nextSlideX,
      0,
      0,
      true
    );
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      cameraControls.current.setLookAt(
        slide * nextSlideX,
        0,
        5,
        slide * nextSlideX,
        0,
        0
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [viewport]);

  useEffect(() => {
    moveToSlide();
  }, [slide]);

  return (
    <CameraControls
      ref={cameraControls}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
      }}
    />
  );
};

const Experience = ({ slide }) => {
  const viewport = useThree((state) => state.viewport);

  const { slideDistance } = useControls({
    slideDistance: {
      value: 1,
      min: 0,
      max: 10,
    },
  });

  return (
    <>
      <CameraHandler slide={slide} slideDistance={slideDistance} />

      <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionThickness={1}
        cellSize={0.5}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      />

      {scenes.map((scene, index) => (
        <mesh
          key={index}
          position={[index * (viewport.width + slideDistance), 0, 0]}
        >
          <planeGeometry args={[viewport.width, viewport.height]} />

          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <Scene {...scene} />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};

export default Experience;
