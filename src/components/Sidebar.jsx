import React from 'react';
import {
  LayoutDashboard, Rocket, Sparkles, User,
  Heart, BarChart2, Settings, HelpCircle, LogOut, Plus,
} from 'lucide-react';

/* ── Menú Trabajador: lo que ve el equipo creativo ── */
const MENU_TRABAJADOR = [
  { id: 'dashboard', label: 'Inicio',          icon: LayoutDashboard },
  { id: 'misiones',  label: 'Misiones',         icon: Rocket          },
  { id: 'ia',        label: 'Espacio Creativo', icon: Sparkles        },
  { id: 'perfil',    label: 'Perfil',           icon: User            },
  { id: 'culturaWorker', label: 'Cultura',      icon: Heart           },
];

/* ── Menú Admin/Founder: acceso exclusivo ── */
const MENU_ADMIN = [
  { id: 'energia',      label: 'Mapa de Energía',    icon: BarChart2 },
  { id: 'culturaAdmin', label: 'Cultura · Admin',    icon: Heart     },
  { id: 'admin',        label: 'Panel del Founder',  icon: Settings  },
];

export default function Sidebar({ currentScreen, setScreen, userRole = 'trabajador' }) {
  const menu    = userRole === 'admin' ? MENU_ADMIN : MENU_TRABAJADOR;
  const isAdmin = userRole === 'admin';

  return (
    <div className="w-64 h-screen bg-[#0D1B3E] text-white flex flex-col fixed left-0 top-0 z-40">

      {/* Marca + indicador de rol */}
      <div className="px-6 pt-8 pb-5">
        <p className="text-base font-extrabold text-white tracking-wide">El Combo Cuate</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            isAdmin
              ? 'bg-[#2A9D87]/20 text-[#3AC0A6] border border-[#3AC0A6]/30'
              : 'bg-white/10 text-gray-400 border border-white/10'
          }`}>
            {isAdmin ? '⚡ Founder' : '👤 Trabajador'}
          </span>
        </div>
      </div>

      {/* Navegación filtrada por rol */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {menu.map(({ id, label, icon: Icon }) => {
          const active = currentScreen === id;
          return (
            <button
              key={id}
              onClick={() => setScreen(id)}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} className={active ? 'text-[#3AC0A6]' : 'text-gray-500'} />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* CTA contextual según rol */}
      <div className="px-4 py-4">
        {isAdmin ? (
          <button
            onClick={() => setScreen('admin')}
            className="w-full bg-[#1C3581] hover:bg-[#1a2f70] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-[#1C3581]/30"
          >
            <Settings size={17} />
            <span>Panel del Founder</span>
          </button>
        ) : (
          <button
            onClick={() => setScreen('misiones')}
            className="w-full bg-[#2A9D87] hover:bg-[#23897A] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-[#2A9D87]/20"
          >
            <Plus size={17} />
            <span>Nueva Misión</span>
          </button>
        )}
      </div>

      {/* Ayuda + Cerrar sesión */}
      <div className="px-3 pb-6 border-t border-white/5 pt-3 space-y-0.5">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-500 hover:text-white text-sm rounded-xl hover:bg-white/5 transition">
          <HelpCircle size={16} />
          <span>Ayuda</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-500 hover:text-white text-sm rounded-xl hover:bg-white/5 transition">
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}
