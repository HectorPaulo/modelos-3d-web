/**
 * Registrador de modelos 3D
 * 
 * Este helper facilita el registro y mantenimiento de modelos 3D
 */

const modelRegistry = {
  "Fuente de las 8 regiones": {
    modelType: "obj",
    modelPath: "/Models/Fuente8Regiones/output.obj",
    texturePath: null,  
    normalMapPath: null, 
    color: "#8b5a2b",
    camera: {
      distance: 8,        
      minDistance: 3,     
      maxDistance: 15,    
      position: [1, 2, 8] 
    }
  },
  "Bacija de barro": {
    modelType: "obj",
    modelPath: "/Models/Museum/output.obj",
    texturePath: "/Models/Museum/baked_mesh_tex0.png",
    normalMapPath: "/Models/Museum/baked_mesh_norm0.png",
    camera: {
      distance: 8,
      minDistance: 0.5,
      maxDistance: 0.5,
      position: [1, 2, 0.5]
    }
  },
  "Cruz": {
    modelType: "obj",
    modelPath: "/Models/Cruz/output.obj",
    color: "#964B00", // Marrón oscuro para simular madera
    camera: {
      distance: 15,
      minDistance: 5,
      maxDistance: 30,
      position: [0, 0, 15]
    }
  },
  "Kiosko": {
    modelType: "obj",
    modelPath: "/Models/Kiosko/output.obj",
    color: "#556B2F", // Verde oliva oscuro
    camera: {
      distance: 20,
      minDistance: 10,
      maxDistance: 40,
      position: [0, 2, 20]
    }
  }
};

/**
 * Get configuration for a specific model
 * @param {string} modelName - The name of the model
 * @returns {Object|null} - The model configuration or null if not found
 */
export const getModelConfig = (modelName) => {
  if (!modelName) return null;
  
  // Return the model config if it exists, or null if not found
  return modelRegistry[modelName] || null;
};

/**
 * Obtiene todos los modelos registrados
 * @returns {Object} Base de datos de modelos
 */
export const getAllModels = () => {
  return {...modelRegistry};
};

// Exportamos la base de datos de modelos para su uso en la aplicación
export default modelRegistry;