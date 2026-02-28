import { motion, AnimatePresence } from 'framer-motion';
import data from './data.json';

// ── Level config ─────────────────────────────────────────────
const LEVEL_CONFIG = {
  1: { label: 'Recruit',   className: 'level-orange', color: '#f97316', badge: '🟠' },
  2: { label: 'Veteran',   className: 'level-slate',  color: '#94a3b8', badge: '⚪' },
  3: { label: 'Elite',     className: 'level-blue',   color: '#3b82f6', badge: '🔵' },
  4: { label: 'Legend',    className: 'level-purple', color: '#a855f7', badge: '🟣' },
};

const trophyIcons = { platinum: '🏆', gold: '🥇', silver: '🥈', bronze: '🥉' };

// ── AI Game Card ─────────────────────────────────────────────
function AIGameCard({ game }) {
  return (
    <div className="ai-card relative rounded-xl overflow-hidden border border-ps-border group cursor-pointer"
         style={{ aspectRatio: '3/4', minHeight: '320px' }}>
      {/* Background image */}
      <img
        src={game.coverImage}
        alt={game.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Gradient base overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Scanlines */}
      <div className="scanlines absolute inset-0 opacity-30" />

      {/* Match badge */}
      <div className="absolute top-3 right-3 z-10">
        <div
          className="px-2.5 py-1 rounded-full text-xs font-display font-bold tracking-wider"
          style={{
            backgroundColor: game.accentColor + '33',
            color: game.accentColor,
            border: `1px solid ${game.accentColor}66`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {game.matchPercent}% MATCH
        </div>
      </div>

      {/* Default info (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="text-white/50 text-xs font-body uppercase tracking-widest mb-1">{game.genre}</p>
        <h3 className="text-white font-display text-sm font-bold leading-tight">{game.title}</h3>
      </div>

      {/* AI Hover overlay — slides up */}
      <div className="ai-overlay absolute inset-0 z-20 flex flex-col justify-end glass-dark rounded-xl">
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-display tracking-widest uppercase"
                  style={{ color: game.accentColor }}>
              ✦ AI PICK
            </span>
            <span
              className="ml-auto px-2 py-0.5 rounded text-xs font-bold"
              style={{ backgroundColor: game.accentColor + '22', color: game.accentColor }}
            >
              {game.matchPercent}%
            </span>
          </div>
          <h3 className="text-white font-display text-sm font-bold mb-2">{game.title}</h3>
          <p className="text-slate-300 text-xs font-body leading-relaxed line-clamp-5">
            {game.aiReason}
          </p>
          <button
            className="mt-4 w-full py-2 rounded text-xs font-display tracking-widest uppercase transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: game.accentColor + '22',
              color: game.accentColor,
              border: `1px solid ${game.accentColor}44`,
            }}
          >
            View Game →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Trophy row ───────────────────────────────────────────────
function TrophyRow({ type, count }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg">{trophyIcons[type]}</span>
      <span className="text-white font-bold font-body text-sm">{count}</span>
      <span className="text-white/40 text-xs uppercase tracking-widest">{type}</span>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, sublabel }) {
  return (
    <div className="glass rounded-xl p-4 border border-ps-border text-center">
      <div className="text-2xl font-display font-black text-white">{value}</div>
      <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
      {sublabel && <div className="text-white/25 text-xs mt-0.5">{sublabel}</div>}
    </div>
  );
}

// ── Library Card ─────────────────────────────────────────────
function LibraryCard({ game }) {
  return (
    <div className="glass rounded-xl overflow-hidden border border-ps-border group cursor-pointer hover:border-white/20 transition-colors">
      <div className="relative h-32 overflow-hidden">
        <img src={game.coverImage} alt={game.title}
             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-body text-white/70">
          {game.hoursPlayed}h played
        </div>
      </div>
      <div className="p-3">
        <p className="text-white font-body font-semibold text-sm truncate">{game.title}</p>
        <p className="text-white/40 text-xs mt-0.5">{game.lastPlayed}</p>
        <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${game.progress}%`,
              background: game.progress === 100
                ? 'linear-gradient(90deg, #f59e0b, #fbbf24)'
                : 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            }}
          />
        </div>
        <p className="text-white/30 text-xs mt-1">{game.progress}% complete</p>
      </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  const user = data.currentUser;
  const lvlConfig = LEVEL_CONFIG[user.level] || LEVEL_CONFIG[1];
  const xpPercent = Math.round((user.xp / user.xpNextLevel) * 100);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className={`min-h-screen ${lvlConfig.className}`} style={{ background: '#020617' }}>

      {/* ── Hero / Profile section ── */}
      <section className="relative overflow-hidden">
        {/* Ambient glow behind profile */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[80px] pointer-events-none"
          style={{ backgroundColor: lvlConfig.color }}
        />

        <motion.div
          className="relative max-w-7xl mx-auto px-6 pt-10 pb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}
            className="glass rounded-2xl border lv-border lv-glow p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* Avatar ring */}
            <div className="relative flex-shrink-0">
              <div
                className="w-24 h-24 rounded-full overflow-hidden lv-ring"
                style={{ padding: '3px', background: lvlConfig.color }}
              >
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-full h-full rounded-full object-cover bg-ps-dark"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 border-ps-black"
                style={{ backgroundColor: lvlConfig.color }}
              >
                {user.level}
              </div>
            </div>

            {/* User info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                <h1 className="font-display text-2xl font-black text-white">{user.username}</h1>
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-display font-bold tracking-widest lv-text"
                  style={{ backgroundColor: lvlConfig.color + '22', border: `1px solid ${lvlConfig.color}55` }}
                >
                  {lvlConfig.label}
                </span>
              </div>
              <p className="text-white/40 text-sm font-body mb-4">
                Global Rank #{user.rank} · {user.gamesPlayed} games played
              </p>

              {/* XP Bar */}
              <div className="mb-1 flex justify-between text-xs font-body">
                <span className="lv-text font-semibold">Level {user.level} — {lvlConfig.label}</span>
                <span className="text-white/40">{user.xp.toLocaleString()} / {user.xpNextLevel.toLocaleString()} XP</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 overflow-hidden relative">
                <motion.div
                  className="h-full rounded-full lv-bg"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                />
                <div className="shimmer-bar absolute inset-0 rounded-full" />
              </div>
              <p className="text-white/30 text-xs mt-1">{xpPercent}% to Level {user.level + 1}</p>

              {/* Trophies */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {Object.entries(user.trophies).map(([type, count]) => (
                  <TrophyRow key={type} type={type} count={count} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 flex-shrink-0 w-full md:w-auto md:min-w-[200px]">
              <StatCard label="Hours" value={user.hoursPlayed} sublabel="total played" />
              <StatCard label="Games" value={user.gamesPlayed} sublabel="in library" />
              <StatCard label="Rank" value={`#${user.rank}`} sublabel="global" />
              <StatCard label="Level" value={user.level} sublabel={lvlConfig.label} />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── AI Recommendations ── */}
      <motion.section
        className="max-w-7xl mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-display tracking-widest uppercase lv-text mb-1">✦ Personalized For You</p>
            <h2 className="text-2xl font-display font-black text-white">AI Game Picks</h2>
          </div>
          <button className="text-xs font-display tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">
            View All →
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.aiGames.map((game, i) => (
            <motion.div key={game.id} variants={itemVariants}>
              <AIGameCard game={game} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Library ── */}
      <motion.section
        className="max-w-7xl mx-auto px-6 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-display tracking-widest uppercase lv-text mb-1">✦ Your Collection</p>
            <h2 className="text-2xl font-display font-black text-white">Library</h2>
          </div>
          <button className="text-xs font-display tracking-widest uppercase text-white/40 hover:text-white/70 transition-colors">
            Manage →
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.libraryGames.map((game, i) => (
            <motion.div key={game.id} variants={itemVariants}>
              <LibraryCard game={game} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
