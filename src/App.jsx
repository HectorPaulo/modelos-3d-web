import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar/navbar';
import React, { useState, useEffect } from 'react';
import Museum from './pages/Museum';
import Footer from './components/Footer/Footer';
import { ResponsiveProvider } from './context/ResponsiveContext';

// Función para determinar el tema según la hora del día
const shouldUseDarkMode = () => {
  const hour = new Date().getHours();
  // Modo oscuro de 7pm a 7am
  return hour >= 19 || hour < 7;
};

function App() {
  // Estado para seguir si el tema está en modo automático
  const [isAutoTheme, setIsAutoTheme] = useState(() => {
    const savedAutoTheme = localStorage.getItem("autoTheme");
    return savedAutoTheme === null ? true : savedAutoTheme === "true";
  });
  
  // Estado para el modo oscuro/claro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    
    // Si hay una preferencia guardada y no está en modo automático
    if (savedTheme && !isAutoTheme) {
      return savedTheme === "dark";
    }
    
    // En modo automático, usar la hora del día
    if (isAutoTheme) {
      return shouldUseDarkMode();
    }
    
    // Fallback a preferencias del sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Efecto para aplicar clases según el tema
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Efecto para actualizar el tema automáticamente cada minuto
  useEffect(() => {
    if (!isAutoTheme) return;
    
    const updateThemeByTime = () => {
      setIsDarkMode(shouldUseDarkMode());
    };
    
    // Actualizar inmediatamente
    updateThemeByTime();
    
    // Configurar intervalo para actualizar cada minuto
    const interval = setInterval(updateThemeByTime, 60000);
    
    return () => clearInterval(interval);
  }, [isAutoTheme]);

  // Toggle manual del tema
  const toggleTheme = () => {
    // Desactivar modo automático al cambiar manualmente
    setIsAutoTheme(false);
    localStorage.setItem("autoTheme", "false");
    
    // Cambiar tema
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Toggle para modo automático
  const toggleAutoTheme = () => {
    const newAutoTheme = !isAutoTheme;
    setIsAutoTheme(newAutoTheme);
    localStorage.setItem("autoTheme", newAutoTheme.toString());
    
    // Si activamos el modo automático, actualizar inmediatamente
    if (newAutoTheme) {
      const shouldBeDark = shouldUseDarkMode();
      setIsDarkMode(shouldBeDark);
      localStorage.removeItem("theme"); // Eliminar preferencia guardada
    }
  };

  return (
    <ResponsiveProvider>
      <Router>
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          isAutoTheme={isAutoTheme}
          toggleAutoTheme={toggleAutoTheme}
        />
        <Routes>
          <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/museum/:modelName" element={<Museum isDarkMode={isDarkMode} />} />
          <Route path="/museum" element={<Museum isDarkMode={isDarkMode} />} />
        </Routes>
        <Footer />
      </Router>
    </ResponsiveProvider>
  );
}

export default App;
