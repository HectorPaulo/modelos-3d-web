/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import { useResponsiveContext } from "../../context/ResponsiveContext";

const IMGS = [
  "/Assets/ModelImages/porfirio-diaz1.jpeg",
  "/Assets/ModelImages/cruz-de-piedra4.jpeg",
  "/Assets/ModelImages/iglesia1.jpeg",
  "/Assets/ModelImages/sto-domingo1.jpeg",
  "/Assets/ModelImages/teatro-macedonio-alcala-3.jpeg",
  "/Assets/ModelImages/armadura2.jpeg",
  "/Assets/ModelImages/porfirio-diaz3.jpeg",
  "/Assets/ModelImages/iglesia2.jpeg",
  "/Assets/ModelImages/cruz-de-piedra5.jpeg",
  "/Assets/ModelImages/teatro-macedonio-alcala-1.jpeg",
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;

  // Usar nuestro contexto responsive
  const { breakpoint, width, isMobile, isTablet, isDesktop } = useResponsiveContext();

  // Ajustar dimensiones según el tamaño de pantalla
  const getCylinderWidth = () => {
    if (isMobile) return 1100;
    if (isTablet) return 1800;
    return 2200; // Para pantallas grandes
  };
  
  const getFaceWidth = (cylinderWidth, count) => {
    if (isMobile) return (cylinderWidth / count) * 1.5;
    if (isTablet) return (cylinderWidth / count) * 1.6;
    return (cylinderWidth / count) * 1.8; // Más grande para pantallas grandes
  };

  // 3D geometry
  const cylinderWidth = getCylinderWidth();
  const faceCount = images.length;
  const faceWidth = getFaceWidth(cylinderWidth, faceCount);
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`,
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className={`relative ${
      isMobile ? 'hidden' : 'block'
    } h-[700px] w-full -mt-60`}>
      <div
        className="absolute top-0 left-0 h-full w-[48px] z-10"
      />
      <div
        className="absolute top-0 right-0 h-full w-[48px] z-10"
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute flex h-fit items-center justify-center p-[8%] [backface-visibility:hidden] md:p-[6%]"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              <img
                src={url}
                alt="gallery"
                className="pointer-events-none rounded-[15px] object-cover
                           transition-transform duration-300 ease-out group-hover:scale-105
                           sm:h-[50px] sm:w-[110px] 
                           md:h-[75px] md:w-[125px] 
                           lg:h-[175px] lg:w-[150px] 
                           xl:h-[250px] xl:w-[175px] 
                           "
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
