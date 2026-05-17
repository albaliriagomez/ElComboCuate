import React from 'react';
import {
  LayoutDashboard, Rocket, Sparkles, User,
  Heart, BarChart2, Settings, HelpCircle, LogOut, Plus,
} from 'lucide-react';

const MENU = [
  { id: 'dashboard', label: 'Inicio',           icon: LayoutDashboard },
  { id: 'misiones',  label: 'Misiones',          icon: Rocket          },
  { id: 'ia',        label: 'Espacio Creativo',  icon: Sparkles        },
  { id: 'perfil',    label: 'Perfil',            icon: User            },
  { id: 'cultura',   label: 'Cultura',           icon: Heart           },
  { id: 'energia',   label: 'Mapa de Energía',   icon: BarChart2       },
  { id: 'admin',     label: 'Ajustes',           icon: Settings        },
];

export default function Sidebar({ currentScreen, setScreen }) {
  return (
    <div className="w-64 h-screen bg-[#0D1B3E] text-white flex flex-col fixed left-0 top-0 z-40">

      {/* Marca */}
      <div className="px-6 pt-8 pb-5">
        <p className="text-base font-extrabold text-white tracking-wide">El Combo Cuate</p>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5">SaaS Creativo</p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {MENU.map(({ id, label, icon: Icon }) => {
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

      {/* Botón Nueva Misión */}
      <div className="px-4 py-4">
        <button
          onClick={() => setScreen('misiones')}
          className="w-full bg-[#2A9D87] hover:bg-[#23897A] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-lg shadow-[#2A9D87]/20"
        >
          <Plus size={17} />
          <span>Nueva Misión</span>
        </button>
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
