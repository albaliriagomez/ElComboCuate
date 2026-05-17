import React, { useState } from 'react';
import { Bell, Settings, Trophy, Share2, FileText, Sparkles, TrendingUp } from 'lucide-react';

/* ──────────────────────────────────────
   Donut chart SVG — 84% impacto real
────────────────────────────────────── */
function DonutChart({ pct = 84 }) {
  const r   = 52;
  const circ = 2 * Math.PI * r; // ≈ 327
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Pista gris */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
        {/* Arco de progreso */}
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke="#2A9D87"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform="rotate(-90 70 70)"
        />
        {/* Texto central */}
        <text x="70" y="65" textAnchor="middle" fontSize="24" fontWeight="800" fill="#1C3581">
          {pct}%
        </text>
        <text x="70" y="82" textAnchor="middle" fontSize="9" fontWeight="600" fill="#9CA3AF" letterSpacing="1">
          IMPACTO REAL
        </text>
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────
   Árbol de Habilidades — SVG + nodos
────────────────────────────────────── */
const NODES = [
  { id: 'av',       label: 'Edición Audiovisual', icon: '▶',  x: 11,  y: 22, w: 155, h: 38 },
  { id: 'story',    label: 'Storytelling',         icon: '✏',  x: 64,  y: 13, w: 130, h: 38 },
  { id: 'main',     label: 'Especialista\nCreativo', icon: null, x: 35,  y: 42, w: 150, h: 50, main: true },
  { id: 'strategy', label: 'Estrategia Digital',   icon: '◎',  x: 65,  y: 48, w: 148, h: 38 },
  { id: 'ia',       label: 'IA Creativa',          icon: '✦',  x: 12,  y: 65, w: 120, h: 38 },
];

// Centros de cada nodo en % del contenedor (para las líneas SVG)
const CENTERS = {
  av:       { x: 11 + 10,  y: 22 + 3  },
  story:    { x: 64 + 9,   y: 13 + 3  },
  main:     { x: 35 + 10,  y: 42 + 3.5},
  strategy: { x: 65 + 9,   y: 48 + 3  },
  ia:       { x: 12 + 8,   y: 65 + 3  },
};

// Líneas que forman la X cruzando por "Especialista Creativo"
const LINES = [
  { from: 'av',    to: 'strategy' },
  { from: 'ia',    to: 'story'    },
];

function SkillTree() {
  return (
    <div className="relative w-full" style={{ height: '320px' }}>

      {/* SVG para líneas conectoras */}
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

      {/* Círculos decorativos flotantes */}
      <div className="absolute w-5 h-5 rounded-full bg-violet-200 opacity-70"  style={{ right: '8%',  top:  '8%' }} />
      <div className="absolute w-3 h-3 rounded-full bg-[#3AC0A6] opacity-50"   style={{ right: '8%',  bottom: '10%' }} />

      {/* Nodos */}
      {NODES.map((node) => (
        <div
          key={node.id}
          className={`absolute flex items-center justify-center rounded-2xl cursor-pointer transition-transform hover:scale-105 ${
            node.main
              ? 'bg-[#1C5A4E] text-white font-black shadow-lg shadow-[#2A9D87]/30 text-center'
              : 'bg-[#2A9D87] text-white font-semibold shadow-md shadow-[#2A9D87]/20'
          }`}
          style={{
            left:   `${node.x}%`,
            top:    `${node.y}%`,
            width:  `${node.w}px`,
            height: `${node.h}px`,
          }}
        >
          {node.icon && (
            <span className="mr-1.5 text-[13px] opacity-90">{node.icon}</span>
          )}
          <span className={`whitespace-pre-line leading-tight ${node.main ? 'text-sm' : 'text-xs'}`}>
            {node.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────
   Pantalla principal
────────────────────────────────────── */
export default function PerfilScreen() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
            <button className="flex items-center space-x-2 bg-[#1C3581] text-white px-5 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition shadow-md shadow-[#1C3581]/25">
              <Share2 size={15} />
              <span>Exportar Experiencia Validada</span>
            </button>
            <button className="flex items-center space-x-2 bg-[#2A9D87] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#23897A] transition shadow-md shadow-[#2A9D87]/25">
              <FileText size={15} />
              <span>Generar CV Inteligente</span>
            </button>
          </div>
        </div>

        {/* ── Layout 2 columnas ── */}
        <div className="grid grid-cols-3 gap-5">

          {/* ── Columna izquierda (1/3) ── */}
          <div className="col-span-1 space-y-5">

            {/* Card Rendimiento de Impacto */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp size={15} className="text-[#2A9D87]" />
                <h3 className="text-sm font-bold text-[#2A9D87]">Rendimiento de Impacto</h3>
              </div>

              <DonutChart pct={84} />

              {/* Métricas de impacto */}
              <div className="space-y-3 mt-2">
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Economía Popular</span>
                    <span className="font-bold text-[#2A9D87]">+12.5%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#2A9D87] h-full rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                    <span>Engagement Social</span>
                    <span className="font-bold text-[#7C4DFF]">+24.2%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#7C4DFF] h-full rounded-full" style={{ width: '82%' }} />
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
              {/* Header del card */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-gray-800">Árbol de Habilidades Inteligente</h3>
                <span className="text-[11px] font-bold bg-[#F0FAF8] text-[#2A9D87] border border-[#2A9D87]/20 px-3 py-1 rounded-full">
                  Validado por Cuate AI
                </span>
              </div>

              {/* Árbol SVG */}
              <div className="flex-1">
                <SkillTree />
              </div>

              {/* Footer del árbol */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-4">
                <div className="flex items-center space-x-2">
                  {/* Grupo de avatares */}
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

      {/* Botón flotante del Cuate */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
        <span className="text-white font-black text-sm">CC</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">1</span>
      </button>
    </div>
  );
}
