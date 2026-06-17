const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const searchModal = `
    <!-- FULLSCREEN SEARCH MODAL -->
    <div x-show="$store.search.isOpen" class="fixed inset-0 z-[100] flex flex-col bg-primary/95 backdrop-blur-md" style="display: none;" x-transition:enter="transition-opacity ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="transition-opacity ease-in duration-300" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0">
      <div class="w-full flex justify-end p-6 md:p-8">
        <button @click="$store.search.isOpen = false" class="uppercase text-[10px] tracking-widest text-textSecondary hover:text-white transition-colors flex items-center gap-2">
          Close
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="flex-1 flex flex-col items-center justify-center px-6 max-w-4xl mx-auto w-full">
        <form class="w-full relative" @submit.prevent="alert('Searching for: ' + $store.search.query)">
          <input type="text" x-model="$store.search.query" placeholder="SEARCH FOR DROPS..." class="w-full bg-transparent border-b-2 border-white/20 text-4xl md:text-6xl font-display font-bold text-white pb-4 focus:outline-none focus:border-white transition-colors placeholder:text-white/20 uppercase tracking-tighter" autofocus>
          <button type="submit" class="absolute right-0 bottom-4 text-white hover:text-accentBlue transition-colors">
            <svg class="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
        
        <div class="w-full mt-16 text-left">
          <p class="uppercase tracking-[0.2em] text-[10px] text-textSecondary font-bold mb-6">Trending Searches</p>
          <div class="flex flex-wrap gap-4">
            <button @click="$store.search.query = 'Cyber Samurai'; alert('Searching Cyber Samurai')" class="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-colors font-bold">Cyber Samurai</button>
            <button @click="$store.search.query = 'Party Patrol'; alert('Searching Party Patrol')" class="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-colors font-bold">Party Patrol</button>
            <button @click="$store.search.query = 'Hoodies'; alert('Searching Hoodies')" class="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-colors font-bold">Hoodies</button>
            <button @click="$store.search.query = 'Limited'; alert('Searching Limited')" class="border border-white/20 px-6 py-3 text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-colors font-bold">Limited Edition</button>
          </div>
        </div>
      </div>
    </div>
`;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Collections links (which currently have alert) with /collections.html
  content = content.replace(/<a href="#" @click\.prevent="alert\('Collections coming soon!'\)"([^>]*)>\s*Collections\s*<\/a>/gi, '<a href="/collections.html"$1>Collections</a>');
  content = content.replace(/<button class="([^"]*)" @click\.prevent="alert\('Collections coming soon!'\)">\s*Collections/g, '<button class="$1" onclick="window.location.href=\'/collections.html\'">\n            Collections');
  content = content.replace(/<button class="([^"]*)" @click\.prevent="alert\('Collections coming soon!'\)">\s*Collections\s*<svg/g, '<button class="$1" onclick="window.location.href=\'/collections.html\'">\n            Collections\n            <svg');

  // Also replace any old /shop.html links if they slipped through
  content = content.replace(/<a href="\/shop\.html" class="text-5xl([^>]*)>\s*Collections\s*<\/a>/gi, '<a href="/collections.html" class="text-5xl$1>Collections</a>');
  content = content.replace(/<a href="\/shop\.html" class="text-textSecondary([^>]*)>\s*Collections\s*<\/a>/gi, '<a href="/collections.html" class="text-textSecondary$1>Collections</a>');

  // Replace Account links with /account.html
  content = content.replace(/<a href="#" @click\.prevent="alert\('Account coming soon!'\)"([^>]*)>\s*Account\s*<\/a>/gi, '<a href="/account.html"$1>Account</a>');

  // Replace Search links with @click.prevent="$store.search.isOpen = true"
  content = content.replace(/<a href="#" @click\.prevent="alert\('Search coming soon!'\)"([^>]*)>\s*Search\s*<\/a>/gi, '<a href="#" @click.prevent="$store.search.isOpen = true"$1>Search</a>');

  // Inject search modal if not already present
  if (!content.includes('FULLSCREEN SEARCH MODAL')) {
    // Inject right before <!-- FULLSCREEN MOBILE NAV --> or <!-- DESKTOP MEGA MENU -->
    if (content.includes('<!-- FULLSCREEN MOBILE NAV -->')) {
      content = content.replace('<!-- FULLSCREEN MOBILE NAV -->', searchModal + '\n    <!-- FULLSCREEN MOBILE NAV -->');
    } else {
       // fallback, before </body>
       content = content.replace('</body>', searchModal + '\n  </body>');
    }
  }

  fs.writeFileSync(filePath, content);
}
console.log('Updated links and injected Search Modal in ' + files.length + ' files.');
