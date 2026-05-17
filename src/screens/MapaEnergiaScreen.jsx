import React from 'react';
import {
  Search, Bell, Trophy, Settings,
  TrendingUp, TrendingDown, AlertTriangle,
} from 'lucide-react';

/* ──────────────────────────────────────
   Datos del equipo
────────────────────────────────────── */
const MIEMBROS = [
  {
    name: 'Elena Ramos',
    role: 'Lead UI/UX Designer',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    status: 'Estable',
    statusCls: 'text-green-600',
    ring: 'ring-green-500',
    energia: 92,
    Icon: TrendingUp,
    iconCls: 'text-gray-300',
  },
  {
    name: 'Marcos Silva',
    role: 'Fullstack Developer',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    status: 'En Riesgo',
    statusCls: 'text-yellow-600',
    ring: 'ring-yellow-400',
    energia: 64,
    Icon: TrendingDown,
    iconCls: 'text-yellow-400',
  },
  {
    name: 'Julián Ortiz',
    role: 'Product Manager',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    status: 'Burnout',
    statusCls: 'text-red-600',
    ring: 'ring-red-500',
    energia: 31,
    Icon: AlertTriangle,
    iconCls: 'text-red-400',
  },
];

const CHART = [
  { name: 'Elena',  carga: 65, energia: 85 },
  { name: 'Marcos', carga: 80, energia: 48 },
  { name: 'Julián', carga: 92, energia: 22 },
  { name: 'Lucía',  carga: 48, energia: 72 },
  { name: 'Tomás',  carga: 62, energia: 62 },
];

const HISTORIAL = [
  { dot: 'bg-blue-500',   title: 'Pico de energía detectado',     sub: 'Hace 2 horas • Proyecto Alpha'     },
  { dot: 'bg-yellow-400', title: 'Marcos entró en zona de riesgo', sub: 'Hace 5 horas • Sobrecarga de tareas'},
  { dot: 'bg-green-500',  title: 'Sesión de Focus completada',     sub: 'Hace 8 horas • Equipo Diseño'      },
];

const MAX_H = 160; // px altura máxima de barras

/* ──────────────────────────────────────
   Pantalla
────────────────────────────────────── */
export default function MapaEnergiaScreen() {
  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════ NAVBAR con buscador ════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar en el equipo..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            +500 XP
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

        {/* ── Columna principal ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Título + leyenda */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Founder's Radar</h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitoreo de estabilidad emocional y energía del equipo en tiempo real.
              </p>
            </div>
            <div className="flex items-center space-x-5 text-xs font-semibold text-gray-600 pt-1 flex-shrink-0">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" /><span>Estable</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /><span>Riesgo</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" /><span>Burnout</span>
              </span>
            </div>
          </div>

          {/* Cards de miembros */}
          <div className="grid grid-cols-3 gap-4">
            {MIEMBROS.map(({ name, role, img, status, statusCls, ring, energia, Icon, iconCls }) => (
              <div key={name} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  {/* Avatar con ring de color */}
                  <div className={`w-14 h-14 rounded-full overflow-hidden ring-4 ring-offset-2 ${ring}`}>
                    <img src={img} alt={name} className="w-full h-full object-cover" />
                  </div>
                  <Icon size={18} className={iconCls} />
                </div>
                <h4 className="text-sm font-extrabold text-gray-900">{name}</h4>
                <p className="text-xs text-gray-400 mt-0.5 mb-4">{role}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${statusCls}`}>{status}</span>
                  <span className="text-xs text-gray-500 font-medium">Energía: {energia}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gráfica de barras */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-gray-800">
                Balance de Carga de Trabajo vs. Energía
              </h3>
              <div className="flex items-center space-x-5 text-xs font-semibold">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#1C3581]" />
                  <span className="text-gray-600">Carga (Navy)</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#E76F51]" />
                  <span className="text-gray-600">Energía (Naranja)</span>
                </span>
              </div>
            </div>

            {/* Barras */}
            <div
              className="flex items-end justify-around gap-2 border-b border-gray-100"
              style={{ height: `${MAX_H}px` }}
            >
              {CHART.map((d) => (
                <div
                  key={d.name}
                  className="flex items-end justify-center gap-1.5 flex-1"
                  style={{ height: `${MAX_H}px` }}
                >
                  <div
                    className="bg-[#1C3581] rounded-t-md w-5 transition-all duration-700"
                    style={{ height: `${(d.carga / 100) * MAX_H}px` }}
                  />
                  <div
                    className="bg-[#E76F51] rounded-t-md w-5 transition-all duration-700"
                    style={{ height: `${(d.energia / 100) * MAX_H}px` }}
                  />
                </div>
              ))}
            </div>

            {/* Etiquetas */}
            <div className="flex justify-around mt-3">
              {CHART.map((d) => (
                <div key={d.name} className="flex-1 text-center">
                  <span className="text-xs text-gray-500 font-medium">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="w-64 flex-shrink-0 space-y-4">

          {/* Alerta crítica */}
          <div className="bg-white border-2 border-red-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle size={17} className="text-red-500" />
              <span className="text-sm font-extrabold text-red-600">Alerta Crítica</span>
            </div>
            <h4 className="text-base font-extrabold text-gray-900 leading-snug mb-2">
              Riesgo de Rotación Temprana
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">
              Exceso de revisiones detectado en el departamento de Desarrollo. Julián y Marcos
              muestran patrones de fatiga cognitiva altos.
            </p>
            <button className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-red-700 transition shadow-md shadow-red-600/20">
              Intervenir Ahora
            </button>
          </div>

          {/* Historial */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Historial de Energía
            </p>
            <div className="space-y-4">
              {HISTORIAL.map((h, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${h.dot}`} />
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-snug">{h.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 bg-white border border-gray-200 text-gray-600 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-50 transition">
              Ver Reporte Completo
            </button>
          </div>
        </div>
      </main>

      {/* Bot flotante */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
        <span className="text-white text-xl">🤖</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">1</span>
      </button>
    </div>
  );
}
