import React, { useState } from 'react';
import {
  Bell, Settings, Trophy, Sparkles,
  Rocket, Zap, Lock, Heart, ThumbsUp,
} from 'lucide-react';

/* ──────────────────────────────────────
   Datos estáticos
────────────────────────────────────── */
const RECONOCIMIENTOS = [
  {
    name: 'Rodrigo (CEO)',
    role: 'Director Creativo',
    time: 'Hace 2 horas',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80',
    quote: '"Mateo, tu propuesta de edición elevó la calidad de toda la campaña mensual. ¡Eres un crack!"',
    medal: '⭐ MVP Creativo',
    medalCls: 'bg-amber-100 text-amber-700',
    likes: 12,
  },
  {
    name: 'Sofía Rocha',
    role: 'Community Manager',
    time: 'Hace 5 horas',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
    quote: '"¡Gracias por salvar la edición del Reel de Entel a última hora, cuate! Sin ti no lo logramos."',
    medal: '🛟 Salvavidas Creativo',
    medalCls: 'bg-blue-100 text-blue-700',
    likes: 8,
  },
];

const MEDALLAS = [
  {
    label: 'Despegue\nRápido',
    Icon: Rocket,
    bg: 'bg-[#2A9D87]',
    iconCls: 'text-white',
    ring: 'ring-[#2A9D87]/30',
    locked: false,
  },
  {
    label: 'Alta\nEnergía',
    Icon: Zap,
    bg: 'bg-[#7C4DFF]',
    iconCls: 'text-white',
    ring: 'ring-[#7C4DFF]/30',
    locked: false,
  },
  {
    label: 'Mente\nClara',
    Icon: Lock,
    bg: 'bg-gray-200',
    iconCls: 'text-gray-400',
    ring: 'ring-gray-200/60',
    locked: true,
  },
];

const BENEFICIOS = [
  {
    title: 'Viernes Libre',
    desc: 'Tarde completa para proyectos personales',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=120&fit=crop',
    cost: 800,
  },
  {
    title: 'Suscripción Midjourney',
    desc: 'Plan Premium por 1 mes completo',
    img: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=300&h=120&fit=crop',
    cost: 500,
  },
];

/* ──────────────────────────────────────
   Pantalla
────────────────────────────────────── */
export default function CulturaScreen() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [likes, setLikes] = useState([12, 8]);
  const [canjeados, setCanjeados] = useState([false, false]);

  const toggleLike = (i) =>
    setLikes((prev) => prev.map((v, idx) => (idx === i ? v + 1 : v)));

  const canjear = (i) =>
    setCanjeados((prev) => prev.map((v, idx) => (idx === i ? true : v)));

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════ NAVBAR ════ */}
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

      {/* ════ CONTENIDO ════ */}
      <main className="flex-1 p-8 flex gap-6">

        {/* ── Columna principal (60%) ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Reconocimiento Comunitario */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-2">
                <Heart size={16} className="text-red-400" />
                <h3 className="text-sm font-bold text-gray-800">Reconocimiento Comunitario</h3>
              </div>
              <button className="bg-[#2A9D87] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#23897A] transition shadow-sm shadow-[#2A9D87]/20">
                Dar Reconocimiento
              </button>
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {RECONOCIMIENTOS.map((rec, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3">
                  {/* Author row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        <img src={rec.img} alt={rec.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-gray-900">{rec.name}</p>
                        <p className="text-[10px] text-gray-400">{rec.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${rec.medalCls}`}>
                        {rec.medal}
                      </span>
                      <span className="text-[10px] text-gray-400">{rec.time}</span>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-gray-600 italic leading-relaxed">{rec.quote}</p>

                  {/* Like */}
                  <button
                    onClick={() => toggleLike(i)}
                    className="flex items-center space-x-1.5 text-gray-400 hover:text-[#2A9D87] transition"
                  >
                    <ThumbsUp size={13} />
                    <span className="text-[11px] font-semibold">{likes[i]}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tus Medallas Recientes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-800 mb-5">Tus Medallas Recientes</h3>
            <div className="flex items-center space-x-5">
              {MEDALLAS.map((med, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className={`w-14 h-14 rounded-full ${med.bg} flex items-center justify-center ring-4 ${med.ring} ${med.locked ? 'opacity-50' : ''}`}>
                    <med.Icon size={22} className={med.iconCls} />
                  </div>
                  <p className={`text-[10px] font-bold text-center leading-tight whitespace-pre-line ${med.locked ? 'text-gray-400' : 'text-gray-700'}`}>
                    {med.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel derecho (40%) ── */}
        <div className="w-72 flex-shrink-0 space-y-4">

          {/* Marketplace de Beneficios */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            {/* Balance */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800">Marketplace de Beneficios</h3>
              <span className="flex items-center space-x-1 bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-100">
                <span>⭐</span>
                <span>2,450</span>
              </span>
            </div>

            {/* Benefit cards */}
            <div className="space-y-3">
              {BENEFICIOS.map((ben, i) => (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="h-20 overflow-hidden">
                    <img src={ben.img} alt={ben.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs font-extrabold text-gray-900">{ben.title}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">{ben.desc}</p>
                      </div>
                      <span className="flex items-center space-x-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex-shrink-0">
                        <span>⭐</span>
                        <span>{ben.cost}</span>
                      </span>
                    </div>
                    <button
                      onClick={() => canjear(i)}
                      disabled={canjeados[i]}
                      className={`w-full text-xs font-bold py-2 rounded-lg transition ${
                        canjeados[i]
                          ? 'bg-green-100 text-green-700 cursor-default'
                          : 'bg-[#2A9D87] text-white hover:bg-[#23897A] shadow-sm shadow-[#2A9D87]/20'
                      }`}
                    >
                      {canjeados[i] ? '✓ Canjeado' : 'Canjear Beneficio'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ¿Tienes una idea? */}
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
              <p className="text-[11px] font-bold text-gray-600">¿Tienes una idea?</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Sugiere un nuevo beneficio para el equipo</p>
              <button className="mt-2 text-[10px] font-bold text-[#2A9D87] hover:underline transition">
                + Proponer beneficio
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ════ Cuate AI Widget flotante ════ */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex items-start space-x-3 w-64 mb-2">
          <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#3AC0A6]/30">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
              alt="Cuate AI"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold text-gray-900">Cuate AI</p>
            <p className="text-[10px] text-gray-500 leading-snug mt-0.5">
              ¡Tienes 3 reconocimientos pendientes!
            </p>
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">3</span>
        </div>
      </div>
    </div>
  );
}
