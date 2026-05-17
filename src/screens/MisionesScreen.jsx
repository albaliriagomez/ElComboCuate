import React, { useState } from 'react';
import {
  Search, Bell, Trophy, Settings, Filter, Plus,
  Clock, Eye, Zap, Calendar, CheckCircle, MessageSquare,
} from 'lucide-react';

/* ──────────────────────────────────────
   Datos del tablero
────────────────────────────────────── */
const INITIAL_DATA = {
  disponibles: [
    {
      id: 1,
      title: 'Diseño de Landing para Lanzamiento',
      badge: 'En Cola',
      badgeColor: 'bg-amber-100 text-amber-700',
      desc: 'Optimizar el flujo de conversión para la campaña Q4.',
      xp: 120,
      avatars: 2,
    },
    {
      id: 5,
      title: 'Estrategia de Contenido Q4',
      badge: 'En Cola',
      badgeColor: 'bg-amber-100 text-amber-700',
      desc: 'Definir calendario editorial para el próximo trimestre.',
      xp: 90,
      avatars: 1,
    },
    {
      id: 6,
      title: 'Diseño de Banners Google Ads',
      badge: 'En Cola',
      badgeColor: 'bg-amber-100 text-amber-700',
      desc: 'Crear piezas display para campaña de reactivación.',
      xp: 110,
      avatars: 1,
    },
  ],
  desarrollo: [
    {
      id: 2,
      title: 'Editar Reel para Tiendas de Barrio',
      badge: 'Urgente',
      badgeColor: 'bg-red-100 text-red-600',
      featured: true,
      timer: '2h',
      desc: 'Ajustar transiciones y color para el segmento retail.',
      progress: 65,
      okr: 'OKR-1',
      xp: 150,
      assignee: 'Lucas',
    },
    {
      id: 3,
      title: 'Script de Automatización',
      badge: 'En Progreso',
      badgeColor: 'bg-yellow-100 text-yellow-700',
      progress: 22,
      xp: 80,
    },
  ],
  publicado: [
    {
      id: 4,
      title: 'Campaña "Eco-Cuate"',
      desc: 'Publicado en LinkedIn e Instagram.',
      views: '12.4k',
    },
  ],
  completadas: [
    { id: 7,  title: 'Branding de Producto',   date: '12 Oct', xp: 300 },
    { id: 8,  title: 'Newsletter Mensual',      date: '05 Oct', xp: null },
    { id: 9,  title: 'Reel Lanzamiento App',    date: '28 Sep', xp: 200 },
    { id: 10, title: 'Copy Campaña Entel',      date: '20 Sep', xp: 150 },
    { id: 11, title: 'Motion Intro YouTube',    date: '14 Sep', xp: 250 },
    { id: 12, title: 'Carrusel Instagram x6',   date: '08 Sep', xp: 120 },
    { id: 13, title: 'Guión Podcast Ep. 1',     date: '01 Sep', xp: 130 },
    { id: 14, title: 'Campaña Back to School',  date: '25 Ago', xp: 180 },
  ],
};

const COUNTS = {
  disponibles: 3, desarrollo: 2, publicado: 1, completadas: 8,
};

const COLS = [
  { id: 'disponibles', label: 'Misiones Disponibles',  dot: 'bg-gray-300' },
  { id: 'desarrollo',  label: 'Misiones en Desarrollo', dot: 'bg-blue-500' },
  { id: 'publicado',   label: 'Contenido Publicado',    dot: 'bg-green-500' },
  { id: 'completadas', label: 'Campañas Completadas',   dot: 'bg-[#2A9D87]' },
];

/* ── Sub-componentes de tarjetas ── */
function CardDisponible({ card }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition space-y-3">
      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
        {card.badge}
      </span>
      <h4 className="text-sm font-bold text-gray-800 leading-snug">{card.title}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed">{card.desc}</p>
      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        {/* Avatares apilados */}
        <div className="flex -space-x-2">
          {Array.from({ length: card.avatars }).map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-[#2A9D87] to-[#1C3581]"
            >
              <img
                src={`https://images.unsplash.com/photo-153${4528741775 + i * 3}-53994a69daeb?w=50`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <span className="flex items-center space-x-1 text-xs font-bold text-[#2A9D87]">
          <Zap size={12} />
          <span>+{card.xp} XP</span>
        </span>
      </div>
    </div>
  );
}

function CardDesarrollo({ card }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden ${
      card.featured ? 'border-l-4 border-l-[#2A9D87]' : ''
    }`}>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${card.badgeColor}`}>
            {card.badge}
          </span>
          {card.timer && (
            <span className="flex items-center space-x-1 text-[11px] text-gray-400 font-medium">
              <Clock size={12} />
              <span>{card.timer}</span>
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-gray-800 leading-snug">{card.title}</h4>
        {card.desc && <p className="text-[11px] text-gray-400 leading-relaxed">{card.desc}</p>}

        {/* Barra de progreso */}
        {card.progress !== undefined && (
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1">
              <span className="text-[#2A9D87]">Progreso</span>
              <span>{card.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2A9D87] to-[#7C4DFF]"
                style={{ width: `${card.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* OKR + XP */}
        {card.okr && (
          <div className="flex items-center justify-between text-[11px]">
            <span className="flex items-center space-x-1.5 text-gray-500 font-medium">
              <span className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              </span>
              <span>Impacto: {card.okr}</span>
            </span>
            <span className="flex items-center space-x-1 font-bold text-[#2A9D87]">
              <Zap size={12} />
              <span>+{card.xp} XP</span>
            </span>
          </div>
        )}

        {/* Asignado */}
        {card.assignee && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2A9D87] to-[#1C3581] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50" alt="" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] text-gray-500 font-medium">Asignado a {card.assignee}</span>
            </div>
            <MessageSquare size={14} className="text-gray-300 hover:text-gray-500 cursor-pointer transition" />
          </div>
        )}

        {/* XP sin OKR (card sin featured) */}
        {!card.okr && !card.assignee && (
          <div className="flex justify-end">
            <span className="flex items-center space-x-1 text-xs font-bold text-[#2A9D87]">
              <Zap size={12} />
              <span>+{card.xp} XP</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CardPublicado({ card }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden">
      {/* Imagen oscura simulada */}
      <div className="relative h-32 bg-gradient-to-br from-[#1C003A] via-[#2D1060] to-[#0A1329] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="w-20 h-20 rounded-full bg-[#7C4DFF]/40 blur-xl" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Badge de vistas */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
          <Eye size={10} />
          <span>{card.views}</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-bold text-gray-800">{card.title}</h4>
        <p className="text-[11px] text-gray-400 leading-relaxed">{card.desc}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
            Publicado
          </span>
          <Settings size={14} className="text-gray-300 hover:text-gray-500 cursor-pointer transition" />
        </div>
      </div>
    </div>
  );
}

function ItemCompletada({ item }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-start space-x-3 min-w-0">
        <CheckCircle size={16} className="text-[#2A9D87] flex-shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-400 line-through leading-snug truncate">
            {item.title}
          </p>
          <div className="flex items-center space-x-1.5 mt-1">
            <Calendar size={10} className="text-gray-300" />
            <span className="text-[10px] text-gray-400">{item.date}</span>
          </div>
        </div>
      </div>
      {item.xp && (
        <span className="flex-shrink-0 text-[10px] font-bold bg-[#2A9D87]/10 text-[#2A9D87] px-2 py-1 rounded-lg ml-2">
          +{item.xp} XP
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────
   Pantalla principal
────────────────────────────────────── */
export default function MisionesScreen() {
  const [search, setSearch] = useState('');

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════════════════════════════════
          NAVBAR específica de Misiones
          ════════════════════════════════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        {/* Buscador */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar misiones..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
          />
        </div>

        {/* Controles derecha */}
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span>+ 500 XP</span>
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
          CONTENIDO
          ════════════════════════════════ */}
      <main className="flex-1 p-8">

        {/* Breadcrumb + Header */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 mb-2">
            <span className="hover:text-gray-600 cursor-pointer">Misiones</span>
            <span className="mx-1.5">›</span>
            <span className="text-gray-600 font-medium">Panel de Operaciones</span>
          </p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-extrabold text-gray-900">Panel de Misiones</h1>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                <Filter size={15} />
                <span>Filtrar</span>
              </button>
              <button className="flex items-center space-x-2 bg-[#2A9D87] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#23897A] transition shadow-md shadow-[#2A9D87]/25">
                <Plus size={16} />
                <span>Nueva Tarea</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── Tablero Kanban ── */}
        <div className="grid grid-cols-4 gap-5">
          {COLS.map((col) => (
            <div key={col.id}>
              {/* Cabecera de columna */}
              <div className="flex items-center space-x-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                <span className="text-sm font-bold text-gray-700">{col.label}</span>
                <span className="ml-auto text-[11px] font-bold text-gray-400 bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center">
                  {COUNTS[col.id]}
                </span>
              </div>

              {/* ── Columna: Disponibles ── */}
              {col.id === 'disponibles' && (
                <div className="space-y-3">
                  {INITIAL_DATA.disponibles.map((c) => (
                    <CardDisponible key={c.id} card={c} />
                  ))}
                </div>
              )}

              {/* ── Columna: Desarrollo ── */}
              {col.id === 'desarrollo' && (
                <div className="space-y-3">
                  {INITIAL_DATA.desarrollo.map((c) => (
                    <CardDesarrollo key={c.id} card={c} />
                  ))}
                </div>
              )}

              {/* ── Columna: Publicado ── */}
              {col.id === 'publicado' && (
                <div className="space-y-3">
                  {INITIAL_DATA.publicado.map((c) => (
                    <CardPublicado key={c.id} card={c} />
                  ))}
                </div>
              )}

              {/* ── Columna: Completadas (lista compacta) ── */}
              {col.id === 'completadas' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 divide-y divide-gray-50">
                  {INITIAL_DATA.completadas.map((item) => (
                    <ItemCompletada key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          ))}
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
