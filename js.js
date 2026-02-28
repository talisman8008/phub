// 1. mock data
const gameData = [
    {
        title: "Ghost of Tsushima",
        type: "Action RPG",
        match: "92% Match",
        xp: "450 XP",
        image: "assets/ghost.jpg"
    },
    {
        title: "Spider-Man 2",
        type: "Adventure",
        match: "88% Match",
        xp: "120 XP",
        image: "assets/spider.jpg"
    },
    {
        title: "God of War",
        type: "Action",
        match: "75% Match",
        xp: "600 XP",
        image: "assets/god.jpg"
    }
];

const friends = [
    { name: "Viper_01", status: "In Lobby", game: "Valorant", color: "bg-orange-500", avatar: "assets/aa.jpg" },
    { name: "Ghost_User", status: "Online", game: "Spider-Man 2", color: "bg-green-500", avatar: "assets/ghost.jpg" },
    { name: "Sage_Support", status: "Away", game: "Resting", color: "bg-slate-500", avatar: "assets/ava1.jpg" }
];

// 2. Main Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderDiscoveryGrid();
    renderSocialLobby();
    initNeuralAuraScroll();
});

// 3. Discovery Logic
function renderDiscoveryGrid() {
    const grid = document.getElementById('game-grid');
    if (!grid) return;

    grid.innerHTML = gameData.map(game => `
        <div class="game-card group relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 p-6 cursor-pointer hover:bg-white/[0.08] transition-all duration-300">
            <div class="w-full h-44 rounded-2xl mb-6 overflow-hidden relative">
                <img src="${game.image}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                     onerror="this.src='https://placehold.co/400x300/111/fff?text=PS+Exclusive'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-black italic uppercase text-lg leading-tight tracking-tighter">${game.title}</h4>
                <span class="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">${game.match}</span>
            </div>
            <p class="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4">${game.type}</p>
            <div class="flex justify-between items-center pt-4 border-t border-white/5">
                <span class="text-[9px] font-black text-slate-400 uppercase">Gain Potential: <span class="text-white">${game.xp}</span></span>
                <button onclick="triggerLevelUp()" class="text-[9px] bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl font-bold uppercase transition-all shadow-lg shadow-blue-900/20">Track</button>
            </div>
        </div>
    `).join('');
}

// 4. Social Lobby
function renderSocialLobby() {
    const list = document.getElementById('social-list');
    if (!list) return;

    list.innerHTML = friends.map(f => `
        <div class="flex items-center gap-3 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all">
            <div class="relative shrink-0">
                <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
                    <img src="${f.avatar}" class="w-full h-full object-cover" 
                         onerror="this.src='https://ui-avatars.com/api/?name=${f.name}&background=0072ce&color=fff'">
                </div>
                <div class="absolute bottom-0 right-0 w-3 h-3 ${f.color} rounded-full border-2 border-black"></div>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs font-bold group-hover:text-blue-400 transition-colors truncate">${f.name}</p>
                <p class="text-[8px] text-slate-500 uppercase tracking-tighter font-bold truncate">${f.status} • ${f.game}</p>
            </div>
        </div>
    `).join('');
}

// 5. The scroll
const mainArea = document.querySelector('main');
const auraFill = document.getElementById('nav-scroll-fill');
const navIcons = document.querySelectorAll('.nav-icon');

if (mainArea && auraFill) {
    mainArea.addEventListener('scroll', () => {
        // 1. Calculate Scroll %
        const scrollTop = mainArea.scrollTop;
        const scrollHeight = mainArea.scrollHeight - mainArea.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        // 2. Apply Top-to-Bottom Height
        auraFill.style.height = scrollPercent + "%";

        // 3. Aura Pulse Logic (Top-Down)
        const sidebarHeight = auraFill.closest('nav').clientHeight;
        const auraTideLine = sidebarHeight * (scrollPercent / 100);

        navIcons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            const sidebarRect = auraFill.closest('nav').getBoundingClientRect();
            const iconCenterY = iconRect.top + (iconRect.height / 2) - sidebarRect.top;

            // Activate icon if the Top-Down tide has passed it
            if (iconCenterY < auraTideLine) {
                icon.style.opacity = "1";
                icon.style.color = "#3b82f6"; // DualSense Blue
                icon.style.transform = "scale(1.2)";
                icon.style.filter = "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))";
            } else {
                icon.style.opacity = "0.3";
                icon.style.color = "white";
                icon.style.transform = "scale(1)";
                icon.style.filter = "none";
            }
        });
    });
}

// 6. Gamification: Real-time Level Progress simulation
function triggerLevelUp() {
    const bar = document.getElementById('xp-bar');
    const title = document.getElementById('main-title');

    if (bar) {
        bar.style.width = '95%';
        bar.classList.add('animate-pulse');

        if (title) {
            const originalText = title.innerText;
            title.innerText = "QUEST TRACKED! +200 XP";
            title.style.color = "#3b82f6";

            setTimeout(() => {
                title.innerText = originalText;
                title.style.color = "white";
                bar.classList.remove('animate-pulse');
            }, 2500);
        }
    }
}




// New Games Data
const newGamesData = [
    {
        title: "Stellar Blade",
        tag: "Action Adventure",
        desc: "Reclaim Earth for humankind in this blade-wielding combat journey.",
        image: "assets/MarathonStand.jpg"
    },
    {
        title: "Rise of the Ronin",
        tag: "Open World RPG",
        desc: "Embark on an epic journey across 19th-century Japan in this combat-focused open-world action RPG.",
        image: "assets/ronin.webp"
    },
    {
        title: "Dragon's Dogma 2",
        tag: "RPG",
        desc: "The deep, explorable fantasy world of Dragon's Dogma 2 awaits you.",
        image: "assets/dogma.jpg"
    },
    {
        title: "Gran Turismo 7",
        tag: "Racing",
        desc: "Experience the complete Real Driving Simulator with 400+ cars and legendary tracks.",
        image: "assets/Gran Turismo 7.jpg"
    }
];

// Function to Render New Games Grid
function renderNewGames() {
    const grid = document.getElementById('new-games-grid');
    if (!grid) return;

    grid.innerHTML = newGamesData.map((game, index) => `
        <div class="group cursor-pointer" onclick="openModal(${index})">
            <div class="aspect-[3/4] rounded-[24px] overflow-hidden mb-4 border border-white/5 group-hover:border-blue-500/50 transition-all">
                <img src="${game.image}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
            </div>
            <h4 class="font-bold italic uppercase text-xs tracking-tighter truncate">${game.title}</h4>
        </div>
    `).join('');
}

// Modal Logic
function openModal(index) {
    const game = newGamesData[index];
    const modal = document.getElementById('game-modal');
    const container = document.getElementById('modal-container');

    // Fill Data
    document.getElementById('modal-img').src = game.image;
    document.getElementById('modal-title').innerText = game.title;
    document.getElementById('modal-tag').innerText = game.tag;
    document.getElementById('modal-desc').innerText = game.desc;

    // Show Modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        container.classList.remove('scale-95', 'opacity-0');
        container.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('game-modal');
    const container = document.getElementById('modal-container');

    container.classList.add('scale-95', 'opacity-0');
    container.classList.remove('scale-100', 'opacity-100');

    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// DomContentLoaded Update
document.addEventListener('DOMContentLoaded', () => {
    // ... baki calls ...
    renderNewGames();
});