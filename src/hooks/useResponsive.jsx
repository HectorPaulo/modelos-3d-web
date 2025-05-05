import { useState, useEffect } from "react";

// Definición centralizada de breakpoints
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
};

const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < breakpoints.md : false,
    isTablet: typeof window !== 'undefined' ? window.innerWidth >= breakpoints.md && window.innerWidth < breakpoints.lg : false,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= breakpoints.lg : true,
    breakpoint: getBreakpoint(typeof window !== 'undefined' ? window.innerWidth : 0)
  });

  function getBreakpoint(width) {
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints["2xl"]) return 'xl';
    return '2xl';
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        height: window.innerHeight,
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        breakpoint: getBreakpoint(width)
      });
    };

    // Inicialmente establecer el estado
    handleResize();

    // Utilizar ResizeObserver para mejor rendimiento que el evento de ventana
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  return screenSize;
};

export default useResponsive;