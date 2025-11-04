// scripts/generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * GENERADOR DE SITEMAP DINÁMICO
 *
 * FUNCIONALIDAD:
 * - Genera sitemap.xml automáticamente con fechas actuales
 * - Incluye todas las secciones del portfolio
 * - Se ejecuta en cada build (npm run build)
 * - Estructura optimizada para SEO
 *
 * IMPORTANCIA:
 * - Google usa lastmod para decidir cuándo re-crawlear
 * - Fechas actuales = mejor indexación
 * - Información de imágenes ayuda a Google Images
 * - Prioridades correctas mejoran crawling efficiency
 *
 * USO:
 * - Automático: Se ejecuta en cada build
 * - Manual: node scripts/generate-sitemap.js
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del sitio
const SITE_URL = 'https://osifraga.vercel.app';
const TODAY = new Date().toISOString().split('T')[0]; // Formato: YYYY-MM-DD

// Estructura de URLs del sitio
const pages = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    lastmod: TODAY,
    images: [
      {
        loc: '/og-image.png',
        title: 'Héctor Garza Portfolio',
        caption: 'Full Stack Developer specializing in React, FastAPI, and AI/ML'
      }
    ]
  },
  {
    url: '/#home',
    changefreq: 'monthly',
    priority: '0.9',
    lastmod: TODAY
  },
  {
    url: '/#experience',
    changefreq: 'monthly',
    priority: '0.8',
    lastmod: TODAY
  },
  {
    url: '/#projects',
    changefreq: 'weekly',
    priority: '0.9',
    lastmod: TODAY,
    images: [
      {
        loc: '/images/smartcolonia/cover.jpg',
        title: 'SmartColonia Project',
        caption: 'Digital platform with 20,000+ monthly users'
      },
      {
        loc: '/images/topografia/campo-captura.jpg',
        title: 'Topografía CEMEX Project',
        caption: 'LiDAR data processing and 3D visualization'
      },
      {
        loc: '/images/acervo/acervo.jpg',
        title: 'Acervo Bibliográfico Digital LABNL',
        caption: 'Digital library with advanced search capabilities'
      }
    ]
  },
  {
    url: '/#contact',
    changefreq: 'yearly',
    priority: '0.7',
    lastmod: TODAY
  }
];

/**
 * Genera el XML del sitemap
 */
function generateSitemapXML(pages) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  pages.forEach(page => {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;

    // Agregar imágenes si existen
    if (page.images && page.images.length > 0) {
      page.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${SITE_URL}${image.loc}</image:loc>\n`;
        xml += `      <image:title>${escapeXML(image.title)}</image:title>\n`;
        if (image.caption) {
          xml += `      <image:caption>${escapeXML(image.caption)}</image:caption>\n`;
        }
        xml += '    </image:image>\n';
      });
    }

    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

/**
 * Escapa caracteres especiales en XML
 */
function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Genera el sitemap.xml y lo guarda
 */
function generateSitemap() {
  try {
    const sitemapXML = generateSitemapXML(pages);

    // Determinar la ruta de salida
    const publicDir = path.resolve(__dirname, '../public');
    const distDir = path.resolve(__dirname, '../dist');

    // Guardar en public/ (para desarrollo)
    if (fs.existsSync(publicDir)) {
      const publicPath = path.join(publicDir, 'sitemap.xml');
      fs.writeFileSync(publicPath, sitemapXML, 'utf8');
      console.log('✅ Sitemap generado en public/sitemap.xml');
    }

    // Guardar en dist/ (para producción) si existe
    if (fs.existsSync(distDir)) {
      const distPath = path.join(distDir, 'sitemap.xml');
      fs.writeFileSync(distPath, sitemapXML, 'utf8');
      console.log('✅ Sitemap generado en dist/sitemap.xml');
    }

    // Estadísticas
    console.log('\n📊 Estadísticas del Sitemap:');
    console.log(`   - URLs: ${pages.length}`);
    console.log(`   - Imágenes: ${pages.reduce((sum, p) => sum + (p.images?.length || 0), 0)}`);
    console.log(`   - Fecha: ${TODAY}`);
    console.log(`   - URL base: ${SITE_URL}`);

  } catch (error) {
    console.error('❌ Error generando sitemap:', error);
    process.exit(1);
  }
}

// Ejecutar el script
console.log('🗺️  Generando sitemap dinámico...\n');
generateSitemap();

export default generateSitemap;
