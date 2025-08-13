// Script to generate sitemap.xml for portfolio
const fs = require("fs");

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const lastmod = getCurrentDate();

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  '  ',
  '  <!-- Homepage - Main landing page -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>1.0</priority>',
  '    <image:image>',
  '      <image:loc>https://mbeck.vercel.app/assets/profilepicture.png</image:loc>',
  '      <image:title>Muhamed Beck - Software Developer Portfolio</image:title>',
  '    </image:image>',
  '  </url>',
  '',
  '  <!-- Project: AR Data Visualization -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/projects/ar-data-visualization</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.9</priority>',
  '  </url>',
  '',
  '  <!-- Project: LLM Maven Plugin -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/projects/llm-maven-plugin</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.9</priority>',
  '  </url>',
  '',
  '  <!-- Section: About -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/#about</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.8</priority>',
  '  </url>',
  '',
  '  <!-- Section: Projects -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/#projects</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>weekly</changefreq>',
  '    <priority>0.8</priority>',
  '  </url>',
  '',
  '  <!-- Section: Contact -->',
  '  <url>',
  '    <loc>https://mbeck.vercel.app/#contact</loc>',
  `    <lastmod>${lastmod}</lastmod>`,
  '    <changefreq>monthly</changefreq>',
  '    <priority>0.7</priority>',
  '  </url>',
  '',
  '</urlset>',
];

fs.writeFileSync("public/sitemap.xml", sitemap.join("\n"), "utf8");
console.log(`sitemap.xml generated successfully with ${lastmod} lastmod date`);
