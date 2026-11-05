# Lexmi Gorros — sitio web inicial

Esta es una tienda estática que puede publicarse gratis con GitHub Pages.

## Archivos
- `index.html`: contenido y estructura de la página.
- `styles.css`: diseño adaptable a celular y computadora.
- `products.js`: número de WhatsApp y catálogo editable.
- `app.js`: buscador, filtros, carrito y pedidos por WhatsApp.
- `imagenes/`: coloca aquí las fotografías reales de los productos.

## Antes de publicar
1. Abre `products.js`.
2. En `STORE_CONFIG.whatsapp`, escribe el número de WhatsApp con código de país, solo números. Ejemplo de formato para México: `52` seguido de los 10 dígitos. No incluyas `+`, espacios ni guiones.
3. Sustituye los productos de ejemplo por los nombres y precios reales.
4. Para cada producto, coloca su foto dentro de `imagenes/` y escribe la ruta en `image`, por ejemplo `imagenes/gorro-floral-01.jpg`.
5. Si no conoces un precio, conserva `price: null`; la tienda mostrará “Consultar precio”.

## Probar en tu computadora
Puedes abrir `index.html` con doble clic en tu navegador. Para probar los pedidos, primero configura el WhatsApp en `products.js`.

## Publicar gratis con GitHub Pages
1. Crea una cuenta en https://github.com/ si no tienes una.
2. Crea un repositorio nuevo llamado `lexmi-gorros`.
3. Sube los archivos de esta carpeta (no la carpeta comprimida).
4. En el repositorio entra a Settings → Pages.
5. En “Build and deployment”, selecciona “Deploy from a branch”.
6. Elige la rama `main` y la carpeta `/ (root)`, y guarda.
7. GitHub mostrará la dirección pública cuando termine de publicar.

## Importante
- No se reciben pagos en línea en esta versión; el pedido se envía por WhatsApp.
- El total es estimado y se confirma con la tienda.
- No publiques hasta reemplazar los datos de ejemplo y revisar el número de WhatsApp.
