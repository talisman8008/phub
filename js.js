// 1. Data for Discovery and Social
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
        image: "assets/god.jpg"
    }
];

const friends = [
    { name: "Viper_01", status: "In Lobby", game: "Valorant", color: "bg-green-500", avatar: "assets/aa.jpg" },
    { name: "Ghost_User", status: "Online", game: "Spider-Man 2", color: "bg-green-500", avatar: "assets/ava2.jpg" },
    { name: "Sage_Support", status: "Away", game: "Resting", color: "bg-slate-500", avatar: "assets/ava1.jpg" }
];

// 2. Main Logic
document.addEventListener('DOMContentLoaded', () => {
    // Render the Discovery Cards
    const grid = document.getElementById('game-grid');
    if (grid) {
        grid.innerHTML = gameData.map(game => `
            <div class="game-card group relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 p-6 cursor-pointer">
                <div class="w-full h-44 rounded-2xl mb-6 overflow-hidden relative">
                    <img src="${game.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                         onerror="this.src='https://placehold.co/400x300/111/fff?text=Game+Image'">
                </div>
                <div class="flex justify-between items-start mb-2">
                    <h4 class="font-black italic uppercase text-lg leading-tight">${game.title}</h4>
                    <span class="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">${game.match}</span>
                </div>
                <div class="flex justify-between items-center pt-4 border-t border-white/5">
                    <span class="text-[9px] font-black text-slate-400 uppercase">XP: <span class="text-white">${game.xp}</span></span>
                    <button onclick="levelUpEffect()" class="text-[9px] bg-blue-600 px-3 py-1.5 rounded-lg font-bold uppercase">Track</button>
                </div>
            </div>
        `).join('');
    }

    // Render the Social Lobby (Narrow Width Version)
    const social = document.getElementById('social-list');
    if (social) {
        social.innerHTML = friends.map(f => `
            <div class="flex items-center gap-3 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all">
                <div class="relative shrink-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-600 transition-all">
                        <img src="${f.avatar}" class="w-full h-full object-cover" 
                             onerror="this.src='https://ui-avatars.com/api/?name=${f.name}&background=0072ce&color=fff'">
                    </div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 ${f.color} rounded-full border-2 border-black"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold group-hover:text-blue-400 transition-colors truncate">${f.name}</p>
                    <p class="text-[8px] text-slate-500 uppercase tracking-tighter font-bold truncate">${f.status}</p>
                </div>
            </div>
        `).join('');
    }
});

function levelUpEffect() {
    const bar = document.getElementById('xp-bar');
    if(bar) bar.style.width = '95%';
}