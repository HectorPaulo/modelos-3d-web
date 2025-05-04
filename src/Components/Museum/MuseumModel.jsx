/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture, Html, useProgress } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Loader() {
  const { progress } = useProgress();
  const progressRef = useRef(progress);
  const [displayProgress, setDisplayProgress] = useState(0);
  
  useEffect(() => {
    progressRef.current = progress;
    setDisplayProgress(Math.floor(progress));
  }, [progress]);

  return (
    <Html center>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-700 text-2xl animate-spin flex items-center justify-center border-t-red-700 rounded-full">
            {displayProgress}%
          </div>
        </div>
      </div>
    </Html>
  );
}

// Modelo OBJ de error
const ErrorModel = ({ color = "#FF5252" }) => {
  const errorModelPath = "/Models/Error/objError.obj";
  console.log("Intentando cargar modelo de error:", errorModelPath);
  
  try {
    const obj = useLoader(OBJLoader, errorModelPath);
    
    if (obj && obj.children && obj.children.length > 0) {
      return (
        <mesh geometry={obj.children[0].geometry}>
          <meshStandardMaterial 
            color={color}
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      );
    }
    
    // If obj doesn't have the expected structure
    throw new Error("Modelo de error inválido o vacío");
    
  } catch (e) {
    // This catch will handle errors from useLoader or from our validation
    console.error("Error cargando modelo de error:", e.message);
    console.log("Mostrando cubo como error fallback");
    
    // Si falla, creamos un cubo de emergencia
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
      </mesh>
    );
  }
};

const OBJModel = ({ modelPath, texturePath, normalMapPath }) => {
  const [obj, setObj] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Don't try to load textures if paths are not provided
  const textureProps = {};
  if (texturePath) textureProps.map = texturePath;
  if (normalMapPath) textureProps.normalMap = normalMapPath;
  
  // Only call useTexture if we have textures to load
  const textures = Object.keys(textureProps).length > 0 
    ? useTexture(textureProps)
    : { map: null, normalMap: null };
  
  // Mejorar el log para la depuración
  useEffect(() => {
    console.log(`Intentando cargar modelo OBJ: ${modelPath}`);
    console.log(`Textura: ${texturePath || 'No especificada'}`);
    console.log(`Mapa normal: ${normalMapPath || 'No especificado'}`);
    
    setLoading(true);
    setError(null);
    
    if (!modelPath) {
      console.error("No se proporcionó una ruta de modelo");
      setError(new Error("No se proporcionó una ruta de modelo"));
      setLoading(false);
      return;
    }
    
    // Verificar si la ruta parece válida
    if (!modelPath.startsWith("/") && !modelPath.startsWith("http")) {
      console.warn("La ruta del modelo podría ser relativa, considera usar una ruta absoluta");
    }
    
    const loader = new OBJLoader();
    
    try {
      loader.load(
        modelPath,
        (loadedObj) => {
          if (loadedObj && loadedObj.children && loadedObj.children.length > 0) {
            console.log("Modelo OBJ cargado exitosamente:", loadedObj);
            setObj(loadedObj);
          } else {
            console.error("Modelo OBJ inválido o vacío");
            setError(new Error("Formato de modelo OBJ inválido o vacío"));
          }
          setLoading(false);
        },
        (xhr) => {
          const loadingProgress = xhr.loaded / xhr.total * 100;
          console.log(`Progreso de carga: ${Math.floor(loadingProgress)}%`);
        },
        (err) => {
          console.error(`Error cargando modelo OBJ: ${err.message}`, err);
          setError(err);
          setLoading(false);
        }
      );
    } catch (e) {
      console.error("Error inesperado al iniciar la carga:", e);
      setError(e);
      setLoading(false);
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [modelPath, texturePath, normalMapPath]);
  
  // Si hay error, mostrar modelo de error
  if (error) {
    return <ErrorModel />;
  }
  
  // Si está cargando, retornar null (Suspense manejará el loader)
  if (loading || !obj) {
    return null;
  }
  
  // Render the model with textures
  return (
    <mesh geometry={obj.children[0].geometry}>
      <meshStandardMaterial
        map={textures.map || null}
        normalMap={textures.normalMap || null}
        metalness={0.2}
        roughness={0.8}
        color={!textures.map ? "#888888" : undefined}
      />
    </mesh>
  );
};

// Modelo STL con mejor manejo de errores
const STLModel = ({ modelPath, color = "#888888" }) => {
  const [error, setError] = useState(null);
  const [geometry, setGeometry] = useState(null);
  
  useEffect(() => {
    console.log(`Intentando cargar modelo STL: ${modelPath}`);
    
    if (!modelPath) {
      console.error("No se proporcionó una ruta de modelo STL");
      setError(new Error("No se proporcionó una ruta de modelo"));
      return;
    }
    
    const loader = new STLLoader();
    
    try {
      loader.load(
        modelPath,
        (loadedGeometry) => {
          console.log("Geometría STL cargada exitosamente");
          setGeometry(loadedGeometry);
          setError(null);
        },
        (xhr) => {
          const loadingProgress = xhr.loaded / xhr.total * 100;
          console.log(`Progreso de carga STL: ${Math.floor(loadingProgress)}%`);
        },
        (err) => {
          console.error(`Error cargando modelo STL: ${err.message}`, err);
          setError(err);
        }
      );
    } catch (e) {
      console.error("Error inesperado al iniciar la carga STL:", e);
      setError(e);
    }
  }, [modelPath]);
  
  // Check for errors and return ErrorModel if needed
  if (error || !modelPath) {
    return <ErrorModel color="#FF5252" />;
  }
  
  // If geometry hasn't loaded yet, return null (Suspense will show the loader)
  if (!geometry) {
    return null;
  }
  
  // Render the model with the loaded geometry
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.5} roughness={0.7} />
    </mesh>
  );
};

// Componente que elige el tipo de modelo
const ModelSelector = ({ modelPath, modelType, texturePath, normalMapPath, color }) => {
  if (!modelPath) return <ErrorModel />;
  
  const fileExtension = modelPath ? modelPath.split('.').pop().toLowerCase() : '';
  // Determinar el tipo de modelo por extensión si no se especifica
  const type = modelType || (fileExtension === 'stl' ? 'stl' : 'obj');

  switch (type) {
    case 'stl':
      return <STLModel modelPath={modelPath} color={color} />;
    case 'obj':
    default:
      return <OBJModel 
        modelPath={modelPath}
        texturePath={texturePath}
        normalMapPath={normalMapPath}
      />;
  }
};

const MuseumModelCanvas = ({
  modelPath,
  modelType = null,
  texturePath,
  normalMapPath,
  color = "#000",
  autoRotate = false,
  background = "transparent",
  cameraConfig = null // Nuevo parámetro para configuración de cámara
}) => {
  const [hasError, setHasError] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Valores predeterminados para la cámara si no se especifican
  const defaultCamera = {
    distance: 5,
    minDistance: 2,
    maxDistance: 10,
    position: [0, 0, 5]
  };
  
  // Combina la configuración predeterminada con la proporcionada
  const camera = cameraConfig ? {...defaultCamera, ...cameraConfig} : defaultCamera;
  
  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = () => {
      console.warn("WebGL context lost - will attempt recovery");
      setContextLost(true);
      
      // Try to recover after a short delay
      setTimeout(() => {
        setContextLost(false);
      }, 2000);
    };
    
    window.addEventListener('webglcontextlost', handleContextLost);
    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost);
    };
  }, []);
  
  useEffect(() => {
    // Al cargar el modelo
    const handleLoadError = (error) => {
      console.error("Error cargando modelo:", error);
      setLoadError(true);
    };
    
    // Agregar try/catch al cargar el modelo
  }, [modelPath]);

  if (loadError) {
    return <div className="text-red-500">Error al cargar el modelo</div>;
  }

  const handleError = (error) => {
    console.error("Error en el canvas WebGL:", error);
    setHasError(true);
  };
  
  if (hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-800 rounded-xl">
        <p className="text-white text-center">
          No se pudo cargar el modelo 3D.<br/>
          <button 
            className="mt-2 px-3 py-1 bg-blue-500 rounded-md"
            onClick={() => setHasError(false)}
          >
            Reintentar
          </button>
        </p>
      </div>
    );
  }
  
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ 
        position: camera.position || [0, 0, camera.distance], 
        fov: 45 
      }}
      gl={{ 
        alpha: true,
        powerPreference: "high-performance", // Request high performance mode
        antialias: false, // Disable antialiasing if performance issues persist
        stencil: false, // Disable stencil buffer if not needed
        depth: true 
      }}
      onCreated={({ gl }) => {
        // Configure the WebGL context for better stability
        gl.setClearColor(new THREE.Color(background === "transparent" ? "#000000" : background), 
                         background === "transparent" ? 0 : 1);
      }}
      onError={handleError}
    >
      <color attach="background" args={[background]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Centrado en el canvas */}
      <Suspense fallback={<Loader />}>
        {/* Grupo contenedor centrado */}
        <group position={[0, 0, 0]}>
          {/* Modelo escalado a 1/3 del tamaño */}
          <group scale={[0.33, 0.33, 0.33]}>
            {modelPath ? (
              <ModelSelector 
                modelPath={modelPath}
                modelType={modelType}
                texturePath={texturePath}
                normalMapPath={normalMapPath}
                color={color}
              />
            ) : (
              <ErrorModel />
            )}
          </group>
        </group>
      </Suspense>
      
      <OrbitControls 
        autoRotate={autoRotate} 
        autoRotateSpeed={2}
        enableZoom={true} 
        enablePan={true} 
        minDistance={camera.minDistance}    // Usa la distancia mínima configurada
        maxDistance={camera.maxDistance}    // Usa la distancia máxima configurada
      />
    </Canvas>
  );
};

export default MuseumModelCanvas;