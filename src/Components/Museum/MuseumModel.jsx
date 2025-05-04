/* eslint-disable react-hooks/rules-of-hooks */
// MuseumModel.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls, Stage } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Mesh, MeshStandardMaterial, Color } from "three";
import { useLoader } from "@react-three/fiber";

// Componente para el modelo 3D
function Model({ modelPath, modelType, texturePath, normalMapPath, color }) {
  const [model, setModel] = useState(null);
  const meshRef = useRef();
  
  useEffect(() => {
    // Cargar el modelo según su tipo
    if (modelType === 'obj') {
      const objLoader = new OBJLoader();
      objLoader.load(modelPath, (obj) => {
        // Aplicar material a todas las mallas
        obj.traverse(child => {
          if (child instanceof Mesh) {
            const material = new MeshStandardMaterial({ 
              color: new Color(color || "#808080"),
              roughness: 0.5,
              metalness: 0.5
            });
            
            // Si hay textura, aplicarla
            if (texturePath) {
              const texture = useLoader(TextureLoader, texturePath);
              material.map = texture;
            }
            
            // Si hay mapa normal, aplicarlo
            if (normalMapPath) {
              const normalMap = useLoader(TextureLoader, normalMapPath);
              material.normalMap = normalMap;
            }
            
            child.material = material;
          }
        });
        
        setModel(obj);
      });
    } else if (modelType === 'stl') {
      const stlLoader = new STLLoader();
      stlLoader.load(modelPath, (geometry) => {
        const material = new MeshStandardMaterial({ 
          color: new Color(color || "#808080"),
          roughness: 0.5,
          metalness: 0.5 
        });
        const mesh = new Mesh(geometry, material);
        setModel(mesh);
      });
    }
  }, [modelPath, modelType, texturePath, normalMapPath, color]);

  if (!model) return null;
  
  return <primitive ref={meshRef} object={model} />;
}

// Componentes para controlar la cámara
function CameraController({ cameraConfig }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  
  useEffect(() => {
    if (cameraConfig) {
      // Configurar la posición inicial de la cámara
      if (cameraConfig.position) {
        camera.position.set(...cameraConfig.position);
      } 
      // Si no hay posición especificada, colocar la cámara a una distancia predeterminada
      else if (cameraConfig.distance) {
        camera.position.set(0, 0, cameraConfig.distance);
      }
      
      camera.updateProjectionMatrix();
      
      // Actualizar los límites de zoom si están especificados
      if (controlsRef.current) {
        if (cameraConfig.minDistance) {
          controlsRef.current.minDistance = cameraConfig.minDistance;
        }
        if (cameraConfig.maxDistance) {
          controlsRef.current.maxDistance = cameraConfig.maxDistance;
        }
      }
    }
  }, [camera, cameraConfig]);

  return (
    <OrbitControls 
      ref={controlsRef}
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      autoRotate={false}
      autoRotateSpeed={1}
      makeDefault
    />
  );
}

// Componente principal para el canvas 3D
function MuseumModelCanvas({ 
  modelPath, 
  modelType = "obj", 
  texturePath, 
  normalMapPath, 
  color = "#C0C0C0",
  autoRotate = false,
  background = "#141729",
  cameraConfig = {
    distance: 5,
    minDistance: 2,
    maxDistance: 10,
    position: [0, 0, 5]
  }
}) {
  return (
    <Canvas 
      dpr={[1, 2]} 
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ background: background }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Stage contactShadow shadows adjustCamera={false} intensity={0.5}>
        <Model 
          modelPath={modelPath} 
          modelType={modelType} 
          texturePath={texturePath}
          normalMapPath={normalMapPath}
          color={color}
        />
      </Stage>
      
      <CameraController cameraConfig={cameraConfig} />
      
      {autoRotate && (
        <OrbitControls 
          autoRotate={true}
          autoRotateSpeed={1}
          enableZoom={false}
          enablePan={false}
        />
      )}
    </Canvas>
  );
}

export default MuseumModelCanvas;