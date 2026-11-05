/*
  CATÁLOGO DE LEXMI GORROS
  1. Cambia los nombres, precios y categorías cuando tu tía te dé los datos.
  2. Para añadir una foto, coloca el archivo en la carpeta "imagenes"
     y escribe, por ejemplo: image: "imagenes/gorro-floral-01.jpg"
  3. Usa category: "estampados" o category: "lisos".
  4. Si todavía no sabes el precio, deja price: null.
*/
const STORE_CONFIG = {
  whatsapp: "", // Escribe el número de WhatsApp con código de país, solo números. México: 52 + número.
  currency: "MXN",
  storeName: "Lexmi Gorros"
};

const PRODUCTS = [
  { id: 1, name: "Diseño estampado 01", category: "estampados", price: null, image: "", description: "Agrega aquí el nombre o descripción del diseño.", available: true },
  { id: 2, name: "Diseño estampado 02", category: "estampados", price: null, image: "", description: "Agrega aquí el nombre o descripción del diseño.", available: true },
  { id: 3, name: "Diseño estampado 03", category: "estampados", price: null, image: "", description: "Agrega aquí el nombre o descripción del diseño.", available: true },
  { id: 4, name: "Gorro liso 01", category: "lisos", price: null, image: "", description: "Agrega aquí el color del gorro.", available: true },
  { id: 5, name: "Gorro liso 02", category: "lisos", price: null, image: "", description: "Agrega aquí el color del gorro.", available: true },
  { id: 6, name: "Diseño estampado 04", category: "estampados", price: null, image: "", description: "Agrega aquí el nombre o descripción del diseño.", available: true },
  { id: 7, name: "Diseño estampado 05", category: "estampados", price: null, image: "", description: "Agrega aquí el nombre o descripción del diseño.", available: true },
  { id: 8, name: "Gorro liso 03", category: "lisos", price: null, image: "", description: "Agrega aquí el color del gorro.", available: true }
];
