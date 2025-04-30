import React, { createContext, useContext } from "react";
import useResponsive from "../hooks/useResponsive";

const ResponsiveContext = createContext(null);

export const ResponsiveProvider = ({ children }) => {
  const responsiveData = useResponsive();
  
  return (
    <ResponsiveContext.Provider value={responsiveData}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export const useResponsiveContext = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error("useResponsiveContext debe ser usado dentro de un ResponsiveProvider");
  }
  return context;
};