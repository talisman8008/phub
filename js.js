const gameData = [
    {
        title: "Ghost of Tsushima",
        type: "Action RPG",
        match: "92%",
        xp: "450 XP",
        image: "assets/ghost-of-tsushima.jpg"
    },
    {
        title: "Spider-Man 2",
        type: "Adventure",
        match: "88%",
        xp: "120 XP",
        image: "assets/spider.jpg"
    },
    {
        title: "God of War",
        type: "Action",
        match: "75%",
        xp: "600 XP",
        image:"assets/godofwar.webp"
    }
];

const friends = [
    { name: "Viper_01", status: "In Lobby", game: "Valorant", color: "bg-green-500" },
    { name: "Ghost_User", status: "Online", game: "Spider-Man 2", color: "bg-green-500" },
    { name: "Sage_Support", status: "Away", game: "Resting", color: "bg-slate-500" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fixed Hero Image (Shadow of the Erdtree)
    const heroContainer = document.querySelector('.group.h-\\[400px\\] .bg-cover');
    if (heroContainer) {
        heroContainer.style.backgroundImage = "url('https://image.api.playstation.com/vulcan/ap/rnd/202402/1510/6817559e2101297e68e4.png')";
    }

    // 2. Render Discovery Cards
    const grid = document.getElementById('game-grid');
    grid.innerHTML = gameData.map(game => `
        <div class="game-card group relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 p-6 cursor-pointer">
            <div class="w-full h-44 rounded-2xl mb-6 overflow-hidden relative">
                <img src="${game.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="${game.title}">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-black italic uppercase text-lg leading-tight">${game.title}</h4>
                <span class="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">${game.match}</span>
            </div>
            <p class="text-[10px] text-slate-500 uppercase tracking-widest mb-4">${game.type}</p>
            <div class="flex justify-between items-center pt-4 border-t border-white/5">
                <span class="text-[9px] font-black text-slate-400 uppercase tracking-tighter">POTENTIAL: <span class="text-white">${game.xp}</span></span>
                <button onclick="levelUpEffect()" class="text-[9px] bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-bold transition-all uppercase">Track</button>
            </div>
        </div>
    `).join('');

    // 3. Render Social
    const social = document.getElementById('social-list');
    social.innerHTML = friends.map(f => `
        <div class="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all">
            <div class="relative">
                <div class="w-12 h-12 rounded-full bg-slate-800 border-2 border-transparent group-hover:border-blue-500 transition-all"></div>
                <div class="absolute bottom-0 right-0 w-3 h-3 ${f.color} rounded-full border-2 border-black"></div>
            </div>
            <div class="flex-1">
                <p class="text-sm font-bold group-hover:text-blue-400 transition-colors">${f.name}</p>
                <p class="text-[9px] text-slate-500 uppercase tracking-tighter font-bold">${f.status} • ${f.game}</p>
            </div>
        </div>
    `).join('');
});

function levelUpEffect() {
    const bar = document.getElementById('xp-bar');
    const title = document.getElementById('main-title');
    bar.style.width = '95%';
    title.innerText = "QUEST STARTED!";
    title.style.color = "#3b82f6";
    setTimeout(() => {
        title.innerText = "THE LATEST";
        title.style.color = "white";
    }, 2000);
}