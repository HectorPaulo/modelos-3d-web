export default {
  darkMode: 'class', // Habilita el modo oscuro basado en clases
  content: ['./index.html', './src/**/*.{js,jsx}'], // Asegúrate de incluir todas las rutas relevantes
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-in-out',
        // Mantén la animación slideDown existente
        slideDown: 'slideDown 0.3s ease-out forwards',
        // Añade la nueva animación scaleIn
        scaleIn: 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { transform: 'translate(-50%, -100%)', opacity: 0 },
          '100%': { transform: 'translate(-50%, 0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1300px', // Agregar este breakpoint
      '2xl': '1536px',
    },
  },
  plugins: [],
};