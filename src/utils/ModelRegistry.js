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
    },
    description: "La Fuente de las 8 Regiones de Oaxaca es un tributo a la rica diversidad cultural y geográfica del estado. Es un recordatorio de que, a pesar de nuestras diferencias, todos estamos unidos por la cultura y las raíces. -Jonathan García-Sánchez"
  },
  "Bacija de barro": {
    modelType: "obj",
    modelPath: "/Models/Museum/output.obj",
    texturePath: "/Models/Museum/baked_mesh_tex0.png",
    normalMapPath: "/Models/Museum/baked_mesh_norm0.png",
    camera: {
      distance: 0.5,
      minDistance: 0.1,
      maxDistance: 1.0,
      position: [0, 0, 1]
    },
    description: "Un recipiente tradicional de barro utilizado en la cultura zapoteca. -Héctor  Paulo"
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
    },
    description: "La Cruz de Piedra es un monumento histórico ubicado en el tradicional barrio de Xochimilco, en la ciudad de Oaxaca de Juárez, Oaxaca. Este sitio, compuesto por una gran cruz de cantera erigida sobre una escalinata, data del siglo XVIII y forma parte del antiguo recorrido del Viacrucis que se realizaba durante las celebraciones de Semana Santa. Además de su relevancia religiosa, la Cruz de Piedra es un punto de interés cultural y turístico, debido a su valor patrimonial y su ubicación estratégica, que ofrece una vista panorámica de la ciudad y conecta con otros sitios emblemáticos como el Auditorio Guelaguetza. El lugar simboliza la fusión entre la tradición religiosa y la riqueza arquitectónica de Oaxaca. -David Mendieta"
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
    },
    description: "El kiosko de la ciudad de Oaxaca de Juárez, ubicado en el corazón del zócalo capitalino, es un emblemático punto de encuentro rodeado por jardines, árboles y edificios históricos. Su estructura de hierro forjado y estilo porfiriano lo convierten en un símbolo de la vida social y cultural de la ciudad, donde se celebran conciertos, eventos públicos y reuniones cotidianas que reflejan el espíritu vibrante y tradicional de Oaxaca. -Arturo Celaya"
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
    },
    description: "Este monumento honra al General Porfirio Díaz, hijo ilustre de Oaxaca, y conmemora la histórica Batalla de Miahuatlán, librada el 3 de octubre de 1866. En este lugar, Díaz lideró a las fuerzas republicanas en una victoria decisiva contra el ejército imperialista, marcando un punto de inflexión en la lucha por la Restauración de la República. Conocido como 'el caballito', el monumento no solo celebra al estratega militar, sino también el valor del pueblo de Miahuatlán, que fue testigo y protagonista de uno de los momentos más emblemáticos de la historia nacional. -Uziel López"
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
    },
    description: "Construida en el siglo XVIII, la iglesia conserva su fachada de cantera y su aire tranquilo que invita a la contemplación. Aquí, el bullicio de la ciudad se transforma en susurro, y cada paso que das te conecta con una historia viva. Durante festividades como el Día de Muertos o la Semana Santa, San Matías se llena de flores, velas y música tradicional, ofreciendo al visitante una experiencia profundamente emotiva. -Joshua Israel"
  },
  "Exconvento de Cuilapam": {
    modelType: "obj",
    modelPath: "/Models/Exconvento/output.obj",
    color: "#666f56",
    camera: {
      distance: 35,
      minDistance: 15,
      maxDistance: 60,
      position: [0, -2, 35] 
    },
    description: "Esta construcción de grandes dimensiones se comenzó a mediados del siglo XVI para albergar a la orden dominica. En su diseño sobresalen la fachada de estilo plateresco, la cual incluye dos torres circulares a cada costado, cada una con su propio campanario; su planta de tres naves; y también la espaciosa capilla abierta, en la cual se evangelizaba a los naturales de la zona. -Neri Sosa"
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
    },
    description: "A mediados del siglo XVII, el padre Lorenzo de Olivera destinó un terreno para la construcción de un templo que fue consagrado en 1689. Su fachada, hecha de cantera verde, cuenta con dos torres con pequeños campanarios y está decorada con cuatro nichos alineados verticalmente, enmarcados con pilastras de capitel toscano. El interior es de una sola nave con bóveda de cañón corrido; en el presbiterio destaca una imagen de Cristo Crucificado, acompañado por ángeles y la Virgen Dolorosa al pie de la cruz. En los muros se aprecian esculturas y dos óleos antiguos, uno en el bautisterio que representa a la Santísima Trinidad y otro en la sacristía. -Raúl Técnico"
  },
  "Catedral de Oaxaca": {
    modelType: "obj",
    modelPath: "/Models/Catedral/output.obj",
    color: "#ab9063",
    camera: {
      distance: 50,
      minDistance: 15,
      maxDistance: 65,
      position: [0, -2, 50] 
    },
    description: "Majestuosa guardiana del tiempo y la fe, la Catedral Metropolitana de Nuestra Señora de la Asunción de Oaxaca de Juárez se alza como un puente entre cielos infinitos y raíces profundas. Sus torres gemelas, coronadas por delicados remates barrocos, parecen custodiar los susurros de siglos de devoción y los ecos de las voces indígenas que supieron reconocer en la Virgen un lazo de esperanza. Cada piedra tallada, fruto de manos mestizas, narra historias de encuentro y resistencia; su imponente fachada, bañada por la luz dorada del poniente, invita al caminante a descubrir en su interior un santuario donde el arte y la espiritualidad se funden, haciendo latir al corazón de la ciudad con un pulso que trasciende el tiempo. -Diego Sosa"
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
    },
  },
  "Iglesia de los Pobres": {
    modelType: "obj",
    modelPath: "/Models/IglesiaPobres/output.obj",
    color: "#ab9063",
    camera: {
      distance: 350,
      minDistance: 300,
      maxDistance: 60,
      position: [0, 0, 350] 
    },
    description: "La Parroquia de Nuestra Señora de los Pobres, ubicada en la Colonia Reforma de Oaxaca de Juárez, fue construida a mediados del siglo XX para atender el crecimiento de la ciudad y las necesidades espirituales de sus habitantes. Con una arquitectura sencilla y un fuerte compromiso social, este templo se ha convertido en un espacio de fe, servicio y esperanza, bajo el amparo de la Virgen María. -Fernando Ortega"
  },
  "Iglesia del Carmen Alto": {
    modelType: "stl",
    modelPath: "/Models/CarmenAlto/output.stl",
    color: "#ab9063",
    camera: {
      distance: 100,
      minDistance: 100,
      maxDistance: 60,
      position: [0, 0, 100] 
    },
    description: "La Iglesia del Carmen Alto, ubicada a seis cuadras del Zócalo de Oaxaca sobre la calle García Vigil, es un notable ejemplo de arquitectura neoclásica construida por los Carmelitas Descalzos entre 1696 y 1751. El sitio posee gran valor histórico, pues antes fue un importante centro ceremonial prehispánico dedicado a Centeótl, la Diosa del Maíz. -Luis Santos"
  },
  "Canales de Xochimilco": {
    modelType: "stl",
    modelPath: "/Models/Canales/output.STL",
    color: "#ab9063",
    camera: {
      distance: 500  ,
      minDistance: 100,
      maxDistance: 800,
      position: [0, 0, 500] 
    },
    description: "La obra hidráulica partió del pueblo de San Felipe, pasó por Xochimilco, no sin antes cruzar el Río Jalatlaco, en el sitio llamado 'Pozas Arcas' o 'La Cascada', donde la obra muestra su máxima técnica de ingeniería de la época. Continuó por este sitio (Arquitos de Xochimilco) y terminó en la caja de agua, en una esquina del atrio del templo del Carmen Alto, que aún existe y rememora la obra fechada en 1751. -Fernando Ramírez"
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
  "Exconvento": "Exconvento de Cuilapam",
  "exconvento": "Exconvento de Cuilapam",
  "exconvento cuilapam": "Exconvento de Cuilapam",
  "exconvento de cuilapam": "Exconvento de Cuilapam",
  "bajia de barro": "Bacija de barro",
  "bacia de barro": "Bacija de barro",
  "bacia barro": "Bacija de barro",
  "Iglesia sangre de cristo": "Iglesia Sangre de Cristo",
  "iglesia sangre de cristo": "Iglesia Sangre de Cristo",
  "iglesia sangre": "Iglesia Sangre de Cristo",
  "iglesia cristo": "Iglesia Sangre de Cristo",
  "iglesia del carmen alto": "Iglesia del Carmen Alto",
  "iglesia carmen alto": "Iglesia del Carmen Alto",
  "iglesia del carmen": "Iglesia del Carmen Alto",
  "iglesia carmen": "Iglesia del Carmen Alto",
  "iglesia de los pobres": "Iglesia de los Pobres",
  "iglesia pobres": "Iglesia de los Pobres",
  "Xochimilco": "Canales de Xochimilco",
  "xochimilco": "Canales de Xochimilco",
  "canales xochimilco": "Canales de Xochimilco",
  "canales de xochimilco": "Canales de Xochimilco",
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