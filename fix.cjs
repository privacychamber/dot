const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Collections links
  content = content.replace(/<a href="\/shop\.html"([^>]*)>\s*Collections\s*<\/a>/gi, '<a href="#" @click.prevent="alert(\'Collections coming soon!\')"$1>Collections</a>');
  
  // Replace Search links
  content = content.replace(/<a href="\/checkout\.html"([^>]*)>\s*Search\s*<\/a>/gi, '<a href="#" @click.prevent="alert(\'Search coming soon!\')"$1>Search</a>');
  
  // Replace Account links
  content = content.replace(/<a href="\/checkout\.html"([^>]*)>\s*Account\s*<\/a>/gi, '<a href="#" @click.prevent="alert(\'Account coming soon!\')"$1>Account</a>');

  // Replace the Collections button
  content = content.replace(/<button class="([^"]*)">\s*Collections\s*<svg/g, '<button class="$1" @click.prevent="alert(\'Collections coming soon!\')">\n            Collections\n            <svg');

  // Replace Mobile nav Collections button
  content = content.replace(/<button class="([^"]*)" @mouseenter="\$store\.nav\.openMegaMenu\('shop'\)">\s*Collections/g, '<button class="$1" @click.prevent="alert(\'Collections coming soon!\')">\n            Collections');

  fs.writeFileSync(filePath, content);
}
console.log('Replaced links in ' + files.length + ' files.');
