"use client";

import Experience from "@/components/Experience";
import Overlay from "@/components/Overlay";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { useState } from "react";

export default function Home() {
  const [slide, setSlide] = useState(0);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Leva hidden />
      <Overlay slide={slide} setSlide={setSlide} />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <Experience slide={slide} />
      </Canvas>
    </div>
  );
}
