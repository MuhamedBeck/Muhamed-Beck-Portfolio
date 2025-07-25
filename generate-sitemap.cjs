// Script to generate sitemap.xml for portfolio
const fs = require("fs");
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  "  <url><loc>https://mbeck.vercel.app/</loc></url>",
  "  <url><loc>https://mbeck.vercel.app/projects/ar-data-visualization</loc></url>",
  "  <url><loc>https://mbeck.vercel.app/projects/llm-maven-plugin</loc></url>",
  // Add more URLs as needed
  "</urlset>",
];
fs.writeFileSync("public/sitemap.xml", sitemap.join("\n"), "utf8");
console.log("sitemap.xml generated");
