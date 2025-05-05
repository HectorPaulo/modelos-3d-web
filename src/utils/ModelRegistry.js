/**
 * Registrador de modelos
 * 
 * Helper para el registro y mantenimiento de los modelos
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
      position: [0, -5, 35] 
    }
  },
  "Bacija de barro": {
    modelType: "obj",
    modelPath: "/Models/Museum/output.obj",
    texturePath: "/Models/Museum/baked_mesh_tex0.png",
    normalMapPath: "/Models/Museum/baked_mesh_norm0.png",
    color: "#8b4513",
    camera: {
      distance: 0.5,
      minDistance: 0.1,
      maxDistance: 1.0,
      position: [0, 0, 1]
    }
  },
  "Cruz de piedra": {
    modelType: "obj",
    modelPath: "/Models/Cruz/output.obj",
    color: "#963f3f",
    camera: {
      distance: 1,
      minDistance: 5,
      maxDistance: 80,
      position: [0, 0, 80] 
    }
  },
  "Quiosco": {
    modelType: "obj",
    modelPath: "/Models/Kiosko/output.obj",
    color: "#666f56",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    }
  },
  "Homenaje a Porfirio Diaz": {
    modelType: "obj",
    modelPath: "/Models/HomenajePorfirioDiaz/output.obj",
    color: "#666f56",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    }
  },
  "Iglesia de Jalatlaco": {
    modelType: "obj",
    modelPath: "/Models/IglesiaJalatlaco/output.obj",
    color: "#666f56",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 150,
      position: [0, 0, 120] 
    }
  },
  "Exconvento de Santo Domingo": {
    modelType: "obj",
    modelPath: "/Models/Exconvento/output.obj",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 40] 
    }
  },
  "Iglesia Sangre de Cristo": {
    modelType: "obj",
    modelPath: "/Models/IglesiaSangreCristo/output.obj",
    color: "#ab9063",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    }
  },
  "Catedral de Oaxaca": {
    modelType: "obj",
    modelPath: "/Models/Catedral/output.obj",
    color: "#ab9063",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    }
  },
  "Árlbol del Tule": {
    modelType: "obj",
    modelPath: "/Models/Tule/output.obj",
    color: "#ab9063",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    }
  }
};

const modelAliases = {
  "kiosko": "Quiosco",
  "quiosco": "Quiosco",
  "fuente de las 8 regiones": "Fuente de las 8 regiones",
  "fuente de las ocho regiones": "Fuente de las 8 regiones",
  "fuente regiones": "Fuente de las 8 regiones",
  "Cruz": "Cruz de piedra",
  "cruz": "Cruz de piedra",
  "cruz de piedra": "Cruz de piedra",
  "homenaje a porfirio diaz": "Homenaje a Porfirio Diaz",
  "homenaje porfirio diaz": "Homenaje a Porfirio Diaz",
  "homenaje": "Homenaje a Porfirio Diaz",
  "iglesia de jalatlaco": "Iglesia de Jalatlaco",
  "iglesia jalatlaco": "Iglesia de Jalatlaco",
  "exconvento de santo domingo": "Exconvento de Santo Domingo",
  "exconvento santo domingo": "Exconvento de Santo Domingo",
  "exconvento": "Exconvento de Santo Domingo",
  "bajia de barro": "Bacija de barro",
  "bacia de barro": "Bacija de barro",
  "bacia barro": "Bacija de barro",
  "Iglesia sangre de cristo": "Iglesia Sangre de Cristo",
  "iglesia sangre de cristo": "Iglesia Sangre de Cristo",
  "iglesia sangre": "Iglesia Sangre de Cristo",
  "iglesia cristo": "Iglesia Sangre de Cristo",
};

/**
 * Configuración para cada uno de los modelos
 * @param {string} modelName - Nombre de cada modelo
 * @returns {Object|null} - Configuración de los modelos o nulo si no hay nada
 */
export const getModelConfig = (modelName) => {
  if (!modelName) return null;

  const normalizedName = modelName.toLowerCase().trim();
  for (const [alias, realName] of Object.entries(modelAliases)) {
    if (normalizedName.includes(alias)) {
      console.log(`Alias encontrado: ${alias} -> ${realName}`);
      return modelRegistry[realName];
    }
  }

  console.log(`Modelo buscado: ${modelName}`);
  return modelRegistry[modelName] || null;
};

/**
 * Obtiene todos los modelos registrados
 * @returns {Object} Base de datos de modelos
 */
export const getAllModels = () => {
  return {...modelRegistry};
};

export default modelRegistry;