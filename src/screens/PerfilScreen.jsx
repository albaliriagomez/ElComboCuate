import React, { useState } from 'react';
import {
  Bell, Settings, Trophy, Share2, FileText, Sparkles,
  TrendingUp, X, CheckCircle,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════
   DATOS: Métricas recalculadas al seleccionar un nodo
   Cada habilidad tiene su propio impacto, economía y engagement
══════════════════════════════════════════════════════ */
const SKILL_METRICS = {
  default: {
    impacto:    84,
    economia:   { label: '+12.5%', pct: 68 },
    engagement: { label: '+24.2%', pct: 82 },
    tip: 'Visión general del perfil creativo.',
  },
  'Edición Audiovisual': {
    impacto:    91,
    economia:   { label: '+18.3%', pct: 76 },
    engagement: { label: '+31.7%', pct: 91 },
    tip: 'El video es el formato #1 en Bolivia. Tu impacto sube al activar esta habilidad.',
  },
  'Storytelling': {
    impacto:    88,
    economia:   { label: '+15.8%', pct: 72 },
    engagement: { label: '+28.4%', pct: 87 },
    tip: 'Narrativa auténtica: el diferenciador clave ante la IA genérica.',
  },
  'Estrategia Digital': {
    impacto:    79,
    economia:   { label: '+9.2%',  pct: 58 },
    engagement: { label: '+19.6%', pct: 74 },
    tip: 'Planificación estratégica: menos viral, más sostenible.',
  },
  'IA Creativa': {
    impacto:    95,
    economia:   { label: '+22.1%', pct: 84 },
    engagement: { label: '+38.9%', pct: 96 },
    tip: '¡Techo más alto del equipo! La IA Creativa multiplica cada métrica.',
  },
};

/* ══════════════════════════════════════════════════════
   HELPER: Donut Chart SVG — pct dinámico desde estado
══════════════════════════════════════════════════════ */
function DonutChart({ pct = 84, activeSkill }) {
  const r    = 52;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={pct >= 90 ? '#7C4DFF' : '#2A9D87'}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 70 70)"
          style={{ transition: 'stroke-dasharray 0.8s ease, stroke 0.4s ease' }}
        />
        <text x="70" y="62" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1C3581">
          {pct}%
        </text>
        <text x="70" y="78" textAnchor="middle" fontSize="8" fontWeight="600" fill="#9CA3AF" letterSpacing="1">
          IMPACTO REAL
        </text>
        {activeSkill && (
          <text x="70" y="92" textAnchor="middle" fontSize="7" fontWeight="700" fill="#2A9D87">
            {activeSkill.split(' ')[0].toUpperCase()}
          </text>
        )}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   HELPER: Árbol de Habilidades — nodos interactivos
   Acepta activeSkill y onSkillClick para resaltar y recalcular
══════════════════════════════════════════════════════ */
const NODES = [
  { id: 'av',       label: 'Edición Audiovisual',  icon: '▶', x: 11, y: 22, w: 155, h: 38 },
  { id: 'story',    label: 'Storytelling',          icon: '✏', x: 64, y: 13, w: 130, h: 38 },
  { id: 'main',     label: 'Especialista\nCreativo',icon: null, x: 35, y: 42, w: 150, h: 50, main: true },
  { id: 'strategy', label: 'Estrategia Digital',    icon: '◎', x: 65, y: 48, w: 148, h: 38 },
  { id: 'ia',       label: 'IA Creativa',           icon: '✦', x: 12, y: 65, w: 120, h: 38 },
];

const CENTERS = {
  av:       { x: 11 + 10, y: 22 + 3   },
  story:    { x: 64 + 9,  y: 13 + 3   },
  main:     { x: 35 + 10, y: 42 + 3.5 },
  strategy: { x: 65 + 9,  y: 48 + 3   },
  ia:       { x: 12 + 8,  y: 65 + 3   },
};

const LINES = [
  { from: 'av',  to: 'strategy' },
  { from: 'ia',  to: 'story'    },
];

function SkillTree({ activeSkill, onSkillClick }) {
  return (
    <div className="relative w-full" style={{ height: '320px' }}>

      {/* Líneas conectoras SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {LINES.map((line, i) => {
          const a = CENTERS[line.from];
          const b = CENTERS[line.to];
          return (
            <line
              key={i}
              x1={`${a.x}%`} y1={`${a.y}%`}
              x2={`${b.x}%`} y2={`${b.y}%`}
              stroke="#D1D5DB"
              strokeWidth="0.4"
              strokeDasharray="1.5 1"
            />
          );
        })}
      </svg>

      {/* Círculos decorativos */}
      <div className="absolute w-5 h-5 rounded-full bg-violet-200 opacity-70" style={{ right: '8%', top: '8%' }} />
      <div className="absolute w-3 h-3 rounded-full bg-[#3AC0A6] opacity-50"  style={{ right: '8%', bottom: '10%' }} />

      {/* Nodos — clic activa handleSkillClick */}
      {NODES.map((node) => {
        const isActive = activeSkill === node.label;
        const isClickable = !node.main;
        return (
          <div
            key={node.id}
            onClick={() => isClickable && onSkillClick(node.label)}
            className={`absolute flex items-center justify-center rounded-2xl transition-all duration-300 select-none ${
              node.main
                ? 'bg-[#1C5A4E] text-white font-black shadow-lg shadow-[#2A9D87]/30 text-center cursor-default'
                : isActive
                  ? 'bg-[#7C4DFF] text-white font-bold cursor-pointer scale-105 ring-2 ring-emerald-400 ring-offset-2 ring-offset-white shadow-xl shadow-[#7C4DFF]/50'
                  : 'bg-[#2A9D87] text-white font-semibold shadow-md shadow-[#2A9D87]/20 hover:scale-105 hover:ring-2 hover:ring-emerald-300/50 hover:ring-offset-1 hover:ring-offset-white cursor-pointer'
            }`}
            style={{
              left:   `${node.x}%`,
              top:    `${node.y}%`,
              width:  `${node.w}px`,
              height: `${node.h}px`,
            }}
          >
            {/* Pulso de fondo en nodo activo */}
            {isActive && (
              <span className="absolute inset-0 rounded-2xl bg-[#7C4DFF]/30 animate-ping" />
            )}
            {node.icon && (
              <span className="relative mr-1.5 text-[13px] opacity-90">{node.icon}</span>
            )}
            <span className={`relative whitespace-pre-line leading-tight ${node.main ? 'text-sm' : 'text-xs'}`}>
              {node.label}
            </span>
            {isActive && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PANTALLA PRINCIPAL
══════════════════════════════════════════════════════ */
export default function PerfilScreen() {
  /* ── Navegación ── */
  const [activeTab, setActiveTab] = useState('dashboard');

  /* ── 1. Estados de simulación ── */
  const [exporting,    setExporting]    = useState(false);
  const [cvGenerating, setCvGenerating] = useState(false);
  const [activeSkill,  setActiveSkill]  = useState(null);
  const [metrics,      setMetrics]      = useState(SKILL_METRICS.default);

  /* ── Estados auxiliares de UI ── */
  const [linkedInToast, setLinkedInToast] = useState(false); // toast de éxito LinkedIn
  const [cvModal,       setCvModal]       = useState(false);  // modal CV listo

  /* ── 2a. Exportar a LinkedIn ── */
  const handleExportarLinkedIn = () => {
    if (exporting) return;
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setLinkedInToast(true);
      setTimeout(() => setLinkedInToast(false), 4500);
    }, 1500);
  };

  /* ── 2b. Generar CV Inteligente ── */
  const handleGenerarCV = () => {
    if (cvGenerating) return;
    setCvGenerating(true);
    setTimeout(() => {
      setCvGenerating(false);
      setCvModal(true);
    }, 1200);
  };

  /* ── 2c. Clic en nodo del Árbol — recalcula métricas ── */
  const handleSkillClick = (skillName) => {
    const next = activeSkill === skillName ? null : skillName;
    setActiveSkill(next);
    setMetrics(next ? (SKILL_METRICS[next] ?? SKILL_METRICS.default) : SKILL_METRICS.default);
  };

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════════════════════════════════
          TOP NAVBAR
          ════════════════════════════════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-8">
          <span className="text-base font-extrabold text-[#2A9D87]">El Combo Cuate</span>
          <nav className="flex space-x-6">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'misiones',  label: 'Misiones'  },
              { id: 'mercado',   label: 'Mercado'   },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-sm font-medium pb-0.5 transition ${
                  activeTab === tab.id
                    ? 'text-gray-900 border-b-2 border-gray-900'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="flex items-center space-x-1.5 text-sm font-bold text-gray-800">
            <Sparkles size={14} className="text-[#7C4DFF]" />
            <span>+500 XP</span>
          </span>
          <Bell     size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Trophy   size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Settings size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#3AC0A6]/30">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ════════════════════════════════
          CONTENIDO PRINCIPAL
          ════════════════════════════════ */}
      <main className="flex-1 p-8 space-y-6">

        {/* ── Header de página ── */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1C3581] leading-tight">
              Perfil Profesional Inteligente
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Portafolio digital automatizado y validado por IA.
            </p>
          </div>
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Botón LinkedIn — spinner + estado dinámico */}
            <button
              onClick={handleExportarLinkedIn}
              disabled={exporting}
              className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md overflow-hidden ${
                exporting
                  ? 'bg-[#1C3581]/70 text-white/80 cursor-not-allowed pr-10'
                  : 'bg-[#1C3581] text-white hover:opacity-90 shadow-[#1C3581]/25 hover:shadow-lg hover:shadow-[#1C3581]/30'
              }`}
            >
              {exporting ? (
                <svg className="animate-spin flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (
                <Share2 size={15} />
              )}
              <span>{exporting ? 'Conectando con API de LinkedIn...' : 'Exportar Experiencia Validada'}</span>
              {/* Shimmer de carga */}
              {exporting && (
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </button>

            {/* Botón CV — spinner + estado dinámico */}
            <button
              onClick={handleGenerarCV}
              disabled={cvGenerating}
              className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md overflow-hidden ${
                cvGenerating
                  ? 'bg-[#2A9D87]/70 text-white/80 cursor-not-allowed'
                  : 'bg-[#2A9D87] text-white hover:bg-[#23897A] shadow-[#2A9D87]/25 hover:shadow-lg hover:shadow-[#2A9D87]/30'
              }`}
            >
              {cvGenerating ? (
                <svg className="animate-spin flex-shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              ) : (
                <FileText size={15} />
              )}
              <span>{cvGenerating ? 'Compilando Portafolio con IA...' : 'Generar CV Inteligente'}</span>
              {cvGenerating && (
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_1s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              )}
            </button>
          </div>
        </div>

        {/* ── Hint de skill activa ── */}
        {activeSkill && (
          <div className="flex items-center space-x-3 bg-[#7C4DFF]/10 border border-[#7C4DFF]/25 rounded-2xl px-5 py-3">
            <span className="w-2 h-2 rounded-full bg-[#7C4DFF] animate-pulse flex-shrink-0" />
            <p className="text-sm font-bold text-[#7C4DFF]">
              Habilidad activa: <span className="text-gray-800">{activeSkill}</span>
            </p>
            <span className="ml-auto text-xs text-gray-500 italic">{metrics.tip}</span>
            <button
              onClick={() => handleSkillClick(activeSkill)}
              className="text-gray-400 hover:text-gray-600 transition ml-2"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Layout 2 columnas ── */}
        <div className="grid grid-cols-3 gap-5">

          {/* ── Columna izquierda (1/3) ── */}
          <div className="col-span-1 space-y-5">

            {/* Card Rendimiento de Impacto — métricas dinámicas */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp size={15} className="text-[#2A9D87]" />
                <h3 className="text-sm font-bold text-[#2A9D87]">Rendimiento de Impacto</h3>
              </div>

              {/* Donut con pct del estado */}
              <DonutChart pct={metrics.impacto} activeSkill={activeSkill} />

              {/* Barras de métricas — flash animado al cambiar de habilidad */}
              <div className="space-y-3 mt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Economía Popular</span>
                    {/* key fuerza re-mount → dispara animate-pulse una vez */}
                    <span
                      key={metrics.economia.label}
                      className="font-black text-[#2A9D87] tabular-nums animate-[pulse_0.6s_ease-out_1]"
                    >
                      {metrics.economia.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2A9D87] to-[#3AC0A6] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${metrics.economia.pct}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Engagement Social</span>
                    <span
                      key={metrics.engagement.label}
                      className="font-black text-[#7C4DFF] tabular-nums animate-[pulse_0.6s_ease-out_1]"
                    >
                      {metrics.engagement.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#7C4DFF] to-[#9C6FFF] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${metrics.engagement.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Card Métricas de Engagement */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-[#2A9D87] mb-4">Métricas de Engagement</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-black text-gray-800">1.2k</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Validaciones AI</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-800">48</p>
                  <p className="text-[11px] text-gray-400 font-medium mt-0.5">Proyectos Activos</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Columna derecha (2/3) — Árbol de Habilidades ── */}
          <div className="col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Árbol de Habilidades Inteligente</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Haz clic en un nodo para recalcular tu impacto
                  </p>
                </div>
                <span className="text-[11px] font-bold bg-[#F0FAF8] text-[#2A9D87] border border-[#2A9D87]/20 px-3 py-1 rounded-full">
                  Validado por Cuate AI
                </span>
              </div>

              {/* Árbol interactivo */}
              <div className="flex-1">
                <SkillTree activeSkill={activeSkill} onSkillClick={handleSkillClick} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[
                      'photo-1534528741775-53994a69daeb',
                      'photo-1535713875002-d1d0cf377fde',
                    ].map((slug, i) => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                        <img
                          src={`https://images.unsplash.com/${slug}?w=50`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                      +15
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400">
                  Nodos validados por expertos de la comunidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ════════════════════════════════
          TOAST — LinkedIn exportado
          ════════════════════════════════ */}
      {linkedInToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-start space-x-4 bg-white border border-green-200 rounded-2xl px-6 py-4 shadow-2xl shadow-green-900/10 max-w-md w-full mx-4">
          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} className="text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-extrabold text-gray-900 leading-tight">¡Exportación exitosa!</p>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              4 habilidades verificadas y 3 campañas exportadas a tu perfil de LinkedIn de forma exitosa.
            </p>
          </div>
          <button
            onClick={() => setLinkedInToast(false)}
            className="text-gray-300 hover:text-gray-600 transition flex-shrink-0 mt-0.5"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* ════════════════════════════════
          MODAL — CV Inteligente
          ════════════════════════════════ */}
      {cvModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(28,53,129,0.55)', backdropFilter: 'blur(4px)' }}
          onClick={(e) => e.target === e.currentTarget && setCvModal(false)}
        >
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-[#1C3581] to-[#2A9D87] px-7 py-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Cuate AI · Listo para descargar</p>
                <h3 className="text-lg font-extrabold text-white mt-1 leading-tight">
                  CV Inteligente de Mateo
                </h3>
                <p className="text-xs text-white/70 mt-0.5">Versión Editor Audiovisual · 2024</p>
              </div>
              <button
                onClick={() => setCvModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Cuerpo del modal */}
            <div className="px-7 py-6 space-y-4">
              {/* Secciones del CV */}
              {[
                { label: 'Perfil Profesional',    detail: 'Editor audiovisual con enfoque en identidad regional boliviana y IA creativa.' },
                { label: 'Habilidades Validadas', detail: 'Edición Audiovisual · Storytelling · IA Creativa · Estrategia Digital' },
                { label: 'Campañas Destacadas',   detail: '3 campañas exportadas · 1.2k validaciones AI · 48 proyectos activos' },
                { label: 'Impacto Cuantificado',  detail: `Impacto Real ${activeSkill ? metrics.impacto : 84}% · Engagement ${activeSkill ? metrics.engagement.label : '+24.2%'}` },
              ].map((sec) => (
                <div key={sec.label} className="flex items-start space-x-3">
                  <CheckCircle size={15} className="text-[#2A9D87] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-extrabold text-gray-800">{sec.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{sec.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer del modal */}
            <div className="px-7 pb-6 flex gap-3">
              <button
                onClick={() => setCvModal(false)}
                className="flex-1 bg-[#1C3581] text-white font-extrabold py-3 rounded-xl text-sm hover:opacity-90 transition shadow-lg shadow-[#1C3581]/25 flex items-center justify-center space-x-2"
              >
                <FileText size={15} />
                <span>Descargar PDF</span>
              </button>
              <button
                onClick={() => setCvModal(false)}
                className="flex-1 bg-gray-50 text-gray-600 font-bold py-3 rounded-xl text-sm hover:bg-gray-100 transition border border-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante Cuate AI */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-40">
        <span className="text-white font-black text-sm">CC</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">1</span>
      </button>
    </div>
  );
}
