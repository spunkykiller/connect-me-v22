const fs = require('fs');

const content = fs.readFileSync('./src/data/productData.js', 'utf8');

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://connectme.biz/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://connectme.biz/hardware</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://connectme.biz/software</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://connectme.biz/solutions</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://connectme.biz/projects</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://connectme.biz/news-events</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://connectme.biz/contact-us</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://connectme.biz/about</loc>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>
`;

const regex = /"id":\s*"([^"]+)"/g;
let match;
const seen = new Set();
while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  if (!seen.has(id)) {
      seen.add(id);
      sitemap += `  <url>
    <loc>https://connectme.biz/products/any/all/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
  }
}

sitemap += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully with ' + seen.size + ' product links!');
