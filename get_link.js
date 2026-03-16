const fs = require('fs');
const html = fs.readFileSync('connectme.html', 'utf8');
const cssLink = html.match(/href=\"(\/assets\/index-[^\"]+\.css)\"/);
if (cssLink) { console.log('https://connectme.biz' + cssLink[1]); } else { console.log('Not found'); }
