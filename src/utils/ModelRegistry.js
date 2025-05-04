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
    color: "#454545",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -5, 35] // Alejado considerablemente
    }
  },
  "Bacija de barro": {
    modelType: "obj",
    modelPath: "/Models/Museum/output.obj",
    texturePath: "/Models/Museum/baked_mesh_tex0.png",
    normalMapPath: "/Models/Museum/baked_mesh_norm0.png",
    camera: {
      distance: 1.5,
      minDistance: 1,
      maxDistance: 3,
      position: [0, 0, 1.5] // Acercado como solicitaste
    }
  },
  "Cruz": {
    modelType: "obj",
    modelPath: "/Models/Cruz/output.obj",
    color: "#963f3f",
    camera: {
      distance: 40,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -15, 40] // Alejado considerablemente
    }
  },
  "Kiosko": {
    modelType: "obj",
    modelPath: "/Models/Kiosko/output.obj",
    color: "#666f56",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] // Alejado considerablemente
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