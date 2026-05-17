import React, { useState } from 'react';
import { Bell, Settings, Trophy, Target, Lock } from 'lucide-react';

/* ──────────────────────────────────────
   Datos estáticos
────────────────────────────────────── */
const ESTADOS = [
  { id: 'concentrado', label: 'Concentrado' },
  { id: 'inspirado',   label: 'Inspirado'   },
  { id: 'saturado',    label: 'Saturado'    },
  { id: 'colaborar',   label: 'Colaborar'   },
  { id: 'pausa',       label: 'En Pausa'    },
];

const ENERGIA_OPTS = [
  { id: 'energia',   emoji: '⚡', label: 'Energía'   },
  { id: 'bienestar', emoji: '😊', label: 'Bienestar' },
  { id: 'foco',      emoji: '🧘', label: 'Foco'       },
  { id: 'descanso',  emoji: '😴', label: 'Descanso'  },
];

const CUATE_BARS = [
  { label: 'Constancia',             val: 75 },
  { label: 'Cumplimiento Saludable', val: 60 },
  { label: 'Colaboración',           val: 85 },
  { label: 'Aprendizaje',            val: 90 },
];

const HITOS = [
  { label: 'Primer Reel\naprobado',      sub: '15 Mar 2024',   type: 'done'     },
  { label: '100 diseños\ncompletados',   sub: '02 May 2024',   type: 'done'     },
  { label: 'Certificación\nSenior',      sub: 'En curso',      type: 'progress' },
  { label: 'Dirección\nde Arte',         sub: 'Próximamente',  type: 'locked'   },
];

const TOOLS = [
  { label: 'N',  bg: 'bg-black',       color: 'text-white'  },
  { label: '📋', bg: 'bg-blue-50',     color: 'text-blue-600' },
  { label: '◉',  bg: 'bg-purple-50',   color: 'text-purple-600' },
  { label: '●',  bg: 'bg-green-50',    color: 'text-green-600' },
  { label: '💬', bg: 'bg-[#25D366]/10',color: 'text-[#25D366]' },
  { label: '▲',  bg: 'bg-gray-100',    color: 'text-gray-500' },
];

/* ──────────────────────────────────────
   Mascota mini para el card Tu Cuate
────────────────────────────────────── */
function MascotaMini() {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-lg">
      <ellipse cx="50" cy="114" rx="28" ry="6" fill="rgba(0,0,0,0.1)" />
      <circle cx="50" cy="72" r="36" fill="#3AC0A6" />
      <circle cx="50" cy="62" r="26" fill="#2EAF96" />
      {/* Gorra */}
      <rect x="30" y="30" width="40" height="22" fill="#1C3581" rx="6" />
      <rect x="24" y="40" width="52" height="9" fill="#0D1B3E" rx="4" />
      <text x="43" y="49" fontSize="8" fill="#3AC0A6" fontWeight="bold">CC</text>
      {/* Ojos */}
      <circle cx="42" cy="60" r="6" fill="#0D1B3E" />
      <circle cx="58" cy="60" r="6" fill="#0D1B3E" />
      <circle cx="44" cy="58" r="2.5" fill="white" />
      <circle cx="60" cy="58" r="2.5" fill="white" />
      {/* Sonrisa */}
      <path d="M 42 70 Q 50 78 58 70" stroke="#0D1B3E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Mejillas */}
      <circle cx="33" cy="65" r="5" fill="#F4A261" opacity="0.35" />
      <circle cx="67" cy="65" r="5" fill="#F4A261" opacity="0.35" />
      {/* Chaleco */}
      <path d="M 28 80 Q 38 90 50 90 Q 62 90 72 80 L 76 112 L 24 112 Z" fill="#1C3581" />
    </svg>
  );
}

/* ──────────────────────────────────────
   Componente principal
────────────────────────────────────── */
export default function DashboardScreen() {
  const [estado,   setEstado]   = useState('inspirado');
  const [energia,  setEnergia]  = useState('bienestar');
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════════════════════════════════
          TOP NAVBAR
          ════════════════════════════════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        {/* Marca + tabs */}
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

        {/* Acciones derecha */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="flex items-center space-x-1.5 text-sm font-bold text-gray-800">
            <Trophy size={15} className="text-[#2A9D87]" />
            <span>+500 XP</span>
          </span>
          <Bell    size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
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
      <main className="flex-1 p-8 space-y-6 max-w-6xl mx-auto w-full">

        {/* ── Saludo + Estado creativo ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-5">
          <div>
            <p className="text-sm text-gray-400 font-medium">Hola de nuevo,</p>
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">Mateo</h1>
            <p className="text-sm text-gray-500 mt-0.5">Editor Audiovisual • Nivel 14</p>
            {/* Barra XP */}
            <div className="mt-2.5">
              <div className="w-52 bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2A9D87] h-full rounded-full" style={{ width: '67%' }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-1 font-medium">7,420 / 11,000 XP para Nivel 15</p>
            </div>
          </div>

          {/* Botones de estado */}
          <div className="flex flex-wrap gap-2">
            {ESTADOS.map((e) => {
              const isActive = estado === e.id;
              let cls = 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50';
              if (isActive && e.id === 'inspirado') cls = 'bg-[#2A9D87] text-white border-[#2A9D87]';
              else if (isActive && e.id === 'saturado') cls = 'bg-red-100 text-red-500 border-red-100';
              else if (isActive) cls = 'bg-[#1C3581] text-white border-[#1C3581]';
              return (
                <button
                  key={e.id}
                  onClick={() => setEstado(e.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition border ${cls}`}
                >
                  {e.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Cards: Energía + Tu Cuate ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* Card Medidor de Energía */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-5">Medidor de Energía y Bienestar</h3>
            <div className="grid grid-cols-4 gap-3">
              {ENERGIA_OPTS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setEnergia(opt.id)}
                  className={`flex flex-col items-center py-4 px-2 rounded-2xl transition ${
                    energia === opt.id
                      ? 'bg-[#F0FAF8] ring-2 ring-[#2A9D87]'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl mb-1.5">{opt.emoji}</span>
                  <span
                    className={`text-[10px] font-semibold ${
                      energia === opt.id ? 'text-[#2A9D87]' : 'text-gray-400'
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Card Tu Cuate Virtual */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Tu Cuate Virtual — Progreso de la Semana</h3>
            <div className="flex items-start gap-5">
              {/* Preview + mascota superpuesta */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EBF5F3] to-[#D8EEEB] border border-gray-100 overflow-hidden p-2">
                  <div className="space-y-1.5">
                    {[80, 60, 45].map((w, i) => (
                      <div key={i} className="bg-[#3AC0A6]/25 rounded-full h-1.5" style={{ width: `${w}%` }} />
                    ))}
                    <div className="flex gap-1 mt-2">
                      {[30, 50, 40].map((h, i) => (
                        <div key={i} className="flex-1 bg-[#1C3581]/15 rounded-sm" style={{ height: `${h / 4}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Mascota encima */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16">
                  <MascotaMini />
                </div>
              </div>

              {/* Barras de progreso */}
              <div className="flex-1 space-y-3 pt-1">
                {CUATE_BARS.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between text-[11px] font-medium text-gray-500 mb-1">
                      <span>{bar.label}</span>
                      <span className="font-bold text-gray-700">{bar.val}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#2A9D87] h-full rounded-full transition-all duration-700"
                        style={{ width: `${bar.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Línea de Evolución Profesional ── */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-7">Línea de Evolución Profesional</h3>

          <div className="relative flex justify-between items-start">
            {/* Línea horizontal conectora */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100 z-0" />

            {HITOS.map((hito, i) => (
              <div key={i} className="flex flex-col items-center flex-1 relative z-10 text-center px-1">
                {/* Nodo */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mb-3 flex-shrink-0 ${
                    hito.type === 'done'
                      ? 'bg-[#2A9D87] text-white shadow-md shadow-[#2A9D87]/30'
                      : hito.type === 'progress'
                      ? 'bg-white border-2 border-[#2A9D87] text-[#2A9D87]'
                      : 'bg-white border-2 border-gray-200 text-gray-300'
                  }`}
                >
                  {hito.type === 'done'     && <span className="text-sm font-bold">✓</span>}
                  {hito.type === 'progress' && <Target size={15} />}
                  {hito.type === 'locked'   && <Lock size={13} />}
                </div>

                {/* Texto */}
                <p className={`text-xs font-bold leading-tight whitespace-pre-line ${
                  hito.type === 'locked' ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  {hito.label}
                </p>

                {/* Sub-badge */}
                {hito.type === 'done' && (
                  <p className="text-[10px] text-gray-400 mt-1">{hito.sub}</p>
                )}
                {hito.type === 'progress' && (
                  <span className="mt-1 text-[10px] font-bold text-[#2A9D87]">{hito.sub}</span>
                )}
                {hito.type === 'locked' && (
                  <p className="text-[10px] text-gray-400 mt-1">{hito.sub}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Accesos Rápidos ── */}
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Accesos Rápidos
          </p>
          <div className="flex space-x-3">
            {TOOLS.map((t, i) => (
              <button
                key={i}
                className={`w-10 h-10 ${t.bg} ${t.color} rounded-xl border border-gray-100 flex items-center justify-center text-sm font-bold shadow-sm hover:scale-105 hover:shadow-md transition-all`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
