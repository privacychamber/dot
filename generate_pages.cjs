const fs = require('fs');

let template = fs.readFileSync('about.html', 'utf8');

// The main tag starts around line 157 and ends around 189
let startMain = template.indexOf('<main');
let endMain = template.indexOf('</main>') + 7;

let beforeMain = template.substring(0, startMain);
let afterMain = template.substring(endMain);

// Fix the title in beforeMain
let accountBefore = beforeMain.replace('<title>About Us | D.O.T</title>', '<title>Account | D.O.T</title>');
let collectionsBefore = beforeMain.replace('<title>About Us | D.O.T</title>', '<title>Collections | D.O.T</title>');

// ACCOUNT MAIN
const accountMain = `    <!-- ACCOUNT MAIN -->
    <main class="w-full min-h-[100dvh] pt-[120px] bg-primary relative px-6 md:px-12 pb-24 flex items-center justify-center">
      <div class="max-w-md w-full bg-surface p-8 border border-white/5 fade-up" x-data="{ isLogin: true }">
        <div class="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
          <button @click="isLogin = true" :class="isLogin ? 'text-white' : 'text-textSecondary'" class="text-xl font-display font-bold uppercase tracking-widest hover:text-white transition-colors">Login</button>
          <button @click="isLogin = false" :class="!isLogin ? 'text-white' : 'text-textSecondary'" class="text-xl font-display font-bold uppercase tracking-widest hover:text-white transition-colors">Register</button>
        </div>
        
        <form x-show="isLogin" class="flex flex-col gap-6" @submit.prevent="alert('Login successful!')">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] uppercase tracking-widest text-textSecondary font-bold">Email Address</label>
            <input type="email" required class="bg-primary border border-white/10 p-4 text-sm focus:outline-none focus:border-accentBlue transition-colors text-white">
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between">
              <label class="text-[10px] uppercase tracking-widest text-textSecondary font-bold">Password</label>
              <a href="#" class="text-[10px] uppercase tracking-widest text-textSecondary hover:text-white transition-colors">Forgot?</a>
            </div>
            <input type="password" required class="bg-primary border border-white/10 p-4 text-sm focus:outline-none focus:border-accentBlue transition-colors text-white">
          </div>
          <button type="submit" class="w-full py-4 mt-2 bg-white text-primary uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-accentBlue hover:text-white transition-colors">Sign In</button>
        </form>

        <form x-show="!isLogin" style="display:none;" class="flex flex-col gap-6" @submit.prevent="alert('Account created!')">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] uppercase tracking-widest text-textSecondary font-bold">Full Name</label>
            <input type="text" required class="bg-primary border border-white/10 p-4 text-sm focus:outline-none focus:border-accentBlue transition-colors text-white">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] uppercase tracking-widest text-textSecondary font-bold">Email Address</label>
            <input type="email" required class="bg-primary border border-white/10 p-4 text-sm focus:outline-none focus:border-accentBlue transition-colors text-white">
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[10px] uppercase tracking-widest text-textSecondary font-bold">Password</label>
            <input type="password" required class="bg-primary border border-white/10 p-4 text-sm focus:outline-none focus:border-accentBlue transition-colors text-white">
          </div>
          <button type="submit" class="w-full py-4 mt-2 bg-white text-primary uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-accentBlue hover:text-white transition-colors">Create Account</button>
        </form>
      </div>
    </main>`;

// COLLECTIONS MAIN
const collectionsMain = `    <!-- COLLECTIONS MAIN -->
    <main class="w-full min-h-[100dvh] pt-[120px] bg-primary relative px-6 md:px-12 pb-24">
      <div class="max-w-[1600px] mx-auto">
        <div class="mb-16 fade-up text-center">
          <p class="uppercase tracking-[0.3em] text-accentPurple text-xs mb-4">Curated Archives</p>
          <h1 class="text-5xl md:text-7xl font-display font-bold mb-6">Collections.</h1>
        </div>

        <div class="flex flex-col gap-12">
          
          <a href="/shop.html" class="block w-full h-[60vh] relative group overflow-hidden fade-up">
            <div class="absolute inset-0 bg-primary opacity-40 z-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <img src="/images/party_patrol_1781196580837.png" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700">
            <div class="absolute bottom-12 left-12 z-10">
              <p class="uppercase tracking-[0.3em] text-[10px] text-accentBlue mb-2 font-bold">Collection 01</p>
              <h2 class="text-5xl md:text-6xl font-display font-bold tracking-tighter text-white mb-4 group-hover:text-accentBlue transition-colors">Party Patrol</h2>
              <span class="inline-block border-b border-white pb-1 text-xs uppercase tracking-widest group-hover:pr-4 transition-all">Explore</span>
            </div>
          </a>

          <a href="/shop.html" class="block w-full h-[60vh] relative group overflow-hidden fade-up">
            <div class="absolute inset-0 bg-primary opacity-40 z-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <img src="/images/community_neon_1781196631842.png" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700">
            <div class="absolute bottom-12 left-12 z-10">
              <p class="uppercase tracking-[0.3em] text-[10px] text-accentOrange mb-2 font-bold">Collection 02</p>
              <h2 class="text-5xl md:text-6xl font-display font-bold tracking-tighter text-white mb-4 group-hover:text-accentOrange transition-colors">Neon Dreamers</h2>
              <span class="inline-block border-b border-white pb-1 text-xs uppercase tracking-widest group-hover:pr-4 transition-all">Explore</span>
            </div>
          </a>

          <a href="/shop.html" class="block w-full h-[60vh] relative group overflow-hidden fade-up">
            <div class="absolute inset-0 bg-primary opacity-40 z-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <img src="/images/cyber_samurai_1781196605932.png" class="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-700">
            <div class="absolute bottom-12 left-12 z-10">
              <p class="uppercase tracking-[0.3em] text-[10px] text-accentPurple mb-2 font-bold">Collection 03</p>
              <h2 class="text-5xl md:text-6xl font-display font-bold tracking-tighter text-white mb-4 group-hover:text-accentPurple transition-colors">Cyber Samurai</h2>
              <span class="inline-block border-b border-white pb-1 text-xs uppercase tracking-widest group-hover:pr-4 transition-all">Explore</span>
            </div>
          </a>

        </div>
      </div>
    </main>`;

fs.writeFileSync('account.html', accountBefore + accountMain + afterMain);
fs.writeFileSync('collections.html', collectionsBefore + collectionsMain + afterMain);
console.log('Created account.html and collections.html');
