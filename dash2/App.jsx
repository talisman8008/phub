import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShoppingBag, BookOpen, LayoutDashboard, Gamepad2 } from 'lucide-react';
import './index.css';
import Dashboard from './Dashboard.jsx';
import data from './data.json';

// ── Level config (synced with Dashboard) ─────────────────────
const LEVEL_CONFIG = {
  1: { color: '#f97316' },
  2: { color: '#94a3b8' },
  3: { color: '#3b82f6' },
  4: { color: '#a855f7' },
};

const NAV_LINKS = [
  { to: '/',        label: 'Dashboard', icon: LayoutDashboard },
  { to: '/store',   label: 'Store',     icon: ShoppingBag },
  { to: '/library', label: 'Library',   icon: BookOpen },
];

// ── Leaderboard Dropdown ─────────────────────────────────────
function LeaderboardDropdown() {
  const [open, setOpen] = useState(false);
  const lvColor = LEVEL_CONFIG[data.currentUser.level]?.color ?? '#3b82f6';

  const levelColors = { 4: '#a855f7', 3: '#3b82f6', 2: '#94a3b8', 1: '#f97316' };

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/50 hover:text-white transition-colors"
        aria-label="Leaderboard"
      >
        <Trophy size={18} style={{ color: open ? lvColor : undefined }} />
        <span className="text-xs font-display tracking-widest uppercase hidden sm:block">Ranks</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 w-72 rounded-xl overflow-hidden z-50"
            style={{
              background: 'rgba(8, 14, 28, 0.95)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: `0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)`,
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <Trophy size={14} style={{ color: lvColor }} />
              <span className="text-xs font-display tracking-widest uppercase" style={{ color: lvColor }}>
                Global Leaderboard
              </span>
            </div>

            {/* Rows */}
            <div className="py-2">
              {data.leaderboard.map((player, i) => {
                const isCurrentUser = player.username === data.currentUser.username;
                const lc = levelColors[player.level] ?? '#94a3b8';

                return (
                  <motion.div
                    key={player.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={`flex items-center gap-3 px-4 py-2 transition-colors ${
                      isCurrentUser ? 'bg-white/5' : 'hover:bg-white/4'
                    }`}
                  >
                    {/* Rank */}
                    <span
                      className="w-5 text-center text-xs font-display font-bold"
                      style={{
                        color: player.rank <= 3
                          ? ['#fbbf24', '#d1d5db', '#c97c2c'][player.rank - 1]
                          : 'rgba(255,255,255,0.3)',
                      }}
                    >
                      {player.rank}
                    </span>

                    {/* Avatar */}
                    <div
                      className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
                      style={{ border: `1.5px solid ${lc}66` }}
                    >
                      <img src={player.avatar} alt={player.username}
                           className="w-full h-full object-cover bg-ps-dark" />
                    </div>

                    {/* Name + level */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-body font-semibold truncate ${isCurrentUser ? 'text-white' : 'text-white/70'}`}>
                        {player.username}
                        {isCurrentUser && <span className="ml-1 text-white/40 font-normal">(you)</span>}
                      </p>
                      <p className="text-white/30 text-xs">Lv.{player.level}</p>
                    </div>

                    {/* Trophy count */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-body font-bold text-white/70">🏆 {player.trophyCount}</p>
                      <p className="text-white/25 text-xs">{player.xp.toLocaleString()} xp</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/5">
              <button className="w-full text-center text-xs font-display tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors">
                View Full Leaderboard →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Mario Hopping Navbar ─────────────────────────────────────
function Navbar() {
  const location = useLocation();
  const lvColor = LEVEL_CONFIG[data.currentUser.level]?.color ?? '#3b82f6';

  // Track which link currently has the mario
  const currentPath = location.pathname;

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: 'rgba(2, 6, 23, 0.88)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-14 gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 flex-shrink-0">
          <Gamepad2 size={20} style={{ color: lvColor }} />
          <span className="font-display font-black text-sm tracking-widest text-white uppercase hidden sm:block">
            PS<span style={{ color: lvColor }}>Hub</span>
          </span>
        </div>

        {/* Nav links with Mario hop */}
        <nav className="flex items-center gap-1 relative">
          {NAV_LINKS.map(({ to, label, icon: Icon }) => {
            // NavLink isActive logic
            const isActive = to === '/' ? currentPath === '/' : currentPath.startsWith(to);

            return (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className="relative px-3 py-1.5 flex items-center gap-1.5 text-sm font-display tracking-wide rounded-lg transition-colors"
                style={({ isActive: ia }) => ({
                  color: ia ? '#fff' : 'rgba(255,255,255,0.45)',
                })}
              >
                {({ isActive: ia }) => (
                  <>
                    {/* Highlight pill under active link */}
                    {ia && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: lvColor + '18', border: `1px solid ${lvColor}33` }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
                      />
                    )}

                    {/* Mario hop — only on active link */}
                    {ia && (
                      <motion.div
                        layoutId="mario-hop"
                        className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 20,
                          mass: 0.6,
                        }}
                      >
                        <img
                          src="/mario-hopping.gif"
                          alt="Mario"
                          className="w-7 h-7 object-contain"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </motion.div>
                    )}

                    <Icon size={14} className="relative z-[1]" />
                    <span className="relative z-[1]">{label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Leaderboard hover trophy */}
          <LeaderboardDropdown />

          {/* User mini-avatar */}
          <div
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
            style={{ border: `2px solid ${lvColor}88` }}
          >
            <img
              src={data.currentUser.avatar}
              alt={data.currentUser.username}
              className="w-full h-full object-cover bg-ps-dark"
            />
          </div>

          <div className="hidden sm:block">
            <p className="text-white text-xs font-display font-bold leading-tight">{data.currentUser.username}</p>
            <p className="text-white/40 text-xs font-body leading-tight">
              Lv.{data.currentUser.level} · #{data.currentUser.rank}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── Placeholder pages ─────────────────────────────────────────
function PlaceholderPage({ title, icon: Icon, description }) {
  const lvColor = LEVEL_CONFIG[data.currentUser.level]?.color ?? '#3b82f6';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: lvColor + '18', border: `1px solid ${lvColor}44` }}
      >
        <Icon size={36} style={{ color: lvColor }} />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <h1 className="font-display text-3xl font-black text-white mb-2">{title}</h1>
        <p className="text-white/40 font-body text-sm max-w-sm">{description}</p>
      </motion.div>
    </div>
  );
}

// ── Root App with Router ──────────────────────────────────────
function AppInner() {
  return (
    <div className="min-h-screen bg-ps-black">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Dashboard />
            </motion.div>
          } />
          <Route path="/store" element={
            <motion.div
              key="store"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlaceholderPage
                title="PlayStation Store"
                icon={ShoppingBag}
                description="Browse the latest games, DLC, and PlayStation exclusives. Your wishlist is ready."
              />
            </motion.div>
          } />
          <Route path="/library" element={
            <motion.div
              key="library"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlaceholderPage
                title="Game Library"
                icon={BookOpen}
                description="All your purchased and downloaded games in one place, synced across your PlayStation devices."
              />
            </motion.div>
          } />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
