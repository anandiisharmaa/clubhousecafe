const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const heroStart = html.indexOf('<section id="hero"');
const heroEnd = html.indexOf('</section>', heroStart);
console.log(html.substring(heroStart, heroStart + 1500));
