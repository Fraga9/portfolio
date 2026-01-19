# Scripts de Generación

## generate-og-image.js

Este script genera automáticamente la imagen Open Graph (OG image) que aparece cuando compartes el link de tu portafolio en redes sociales como LinkedIn, Twitter, Facebook, WhatsApp, etc.

### ¿Qué hace?

- Genera una imagen PNG de 1200x630px (tamaño estándar para Open Graph)
- Imita el diseño de tu landing section con:
  - Badge "ITC × TEC"
  - Tu nombre con el texto "Hola, soy Héctor Garza"
  - Descripción profesional compacta
  - Badges de tecnologías (React, Node.js, TypeScript, AWS)
  - URL del sitio con indicador verde
  - Degradado de fondo con múltiples efectos de glow
  - Diseño optimizado para verse bien en miniatura

### Uso

```bash
# Generar la imagen OG
npm run generate-og

# Se ejecuta automáticamente antes del build
npm run build  # Ejecuta generate-og + build
```

### Salida

La imagen se genera en: `public/og-image.png`

### Editar el diseño

Para modificar el contenido o estilo de la imagen OG:

1. Abre `scripts/generate-og-image.js`
2. Modifica el objeto JSX en la función `satori()`
3. Ejecuta `npm run generate-og` para regenerar

**Nota:** Usa solo estilos CSS inline y propiedades soportadas por Satori (ver [documentación](https://github.com/vercel/satori))

### Fuentes

Las fuentes están ubicadas en `public/fonts/`:
- `Poppins-Bold.ttf` - Para títulos y texto destacado
- `PlusJakartaSans-Medium.ttf` - Para texto normal

**No elimines estas fuentes**, son necesarias para generar la imagen correctamente.

### Metadatos Open Graph

Los metadatos están configurados en `index.html`:

```html
<meta property="og:image" content="https://osifraga.dev/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Testing

Para probar cómo se ve tu OG image:

1. **Facebook/LinkedIn:** [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
2. **Twitter:** [Twitter Card Validator](https://cards-dev.twitter.com/validator)
3. **WhatsApp:** Comparte el link en un chat de prueba
4. **General:** [OpenGraph.xyz](https://www.opengraph.xyz/)

**Importante:** Después de desplegar cambios, las redes sociales pueden cachear la imagen antigua. Usa los debuggers para forzar la actualización del caché.

---

## generate-sitemap.js

Script para generar el sitemap.xml del sitio web automáticamente.
