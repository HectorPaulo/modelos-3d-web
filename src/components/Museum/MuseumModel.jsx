import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useLoader } from "@react-three/fiber";

const MuseumModel = () => {
  const obj = useLoader(OBJLoader, "/Models/Museum/output.obj");
  const textures = useTexture({
    map: "/Models/Museum/baked_mesh_tex0.png",
    normalMap: "/Models/Museum/baked_mesh_norm0.png",
  });

  return (
    <mesh geometry={obj.children[0].geometry}>
      <meshStandardMaterial
        map={textures.map}
        normalMap={textures.normalMap}
      />
    </mesh>
  );
};

const MuseumModelCanvas = () => {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <MuseumModel />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default MuseumModelCanvas;