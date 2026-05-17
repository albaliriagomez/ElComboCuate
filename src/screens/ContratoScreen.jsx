import React, { useState } from 'react';
import { Search, Bell, Trophy, PlaySquare, Moon, Timer, ShieldCheck, Bot } from 'lucide-react';

/* ──────────────────────────────────────
   Toggle switch reutilizable
────────────────────────────────────── */
function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${on ? 'bg-[#2A9D87]' : 'bg-gray-200'}`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          on ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

/* ──────────────────────────────────────
   Pantalla
────────────────────────────────────── */
export default function ContratoScreen() {
  const [toggles, setToggles] = useState({ revisiones: true, desconexion: true, asincrona: true });

  const toggle = (id) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════ NAVBAR ════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar acuerdos..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            + 500 XP
          </span>
          <Bell   size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Trophy size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
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
      <main className="flex-1 p-8 max-w-4xl mx-auto w-full space-y-6">

        {/* Título centrado */}
        <div className="text-center space-y-1.5 pt-2">
          <h1 className="text-4xl font-extrabold text-[#1C3581] leading-tight">
            Contrato de Cultura Digital
          </h1>
          <p className="text-sm text-gray-500">
            Acuerdo de Convivencia para un Equipo Creativo de Alto Rendimiento
          </p>
        </div>

        {/* ── Dos tarjetas superiores ── */}
        <div className="grid grid-cols-2 gap-4">

          {/* Card 1 — Revisiones */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <PlaySquare size={18} className="text-gray-500" />
              </div>
              <Toggle on={toggles.revisiones} onToggle={() => toggle('revisiones')} />
            </div>
            <h3 className="text-base font-extrabold text-[#1C3581] mb-2">
              Límite de Revisiones por Video
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Establecemos un máximo de 3 rondas de feedback estructurado por pieza para mantener el
              flujo creativo y evitar el perfeccionismo paralizante.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Activo
              </span>
              <span className="text-[10px] text-gray-400">• Último ajuste: Hace 2 días</span>
            </div>
          </div>

          {/* Card 2 — Desconexión */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <Moon size={18} className="text-gray-500" />
              </div>
              <Toggle on={toggles.desconexion} onToggle={() => toggle('desconexion')} />
            </div>
            <h3 className="text-base font-extrabold text-[#1C3581] mb-2">
              Horarios de Desconexión Saludable
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              No se permiten notificaciones de trabajo después de las 19:00 ni fines de semana.
              Respetamos el descanso como motor de la inspiración.
            </p>
            <div className="flex items-center space-x-2 mt-4">
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                Lun - Vie
              </span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full">
                19:00 - 08:00
              </span>
            </div>
          </div>
        </div>

        {/* ── Tarjeta ancha — Tiempos de Respuesta ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Izquierda: ícono + toggle + texto */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  <Timer size={18} className="text-gray-500" />
                </div>
                <Toggle on={toggles.asincrona} onToggle={() => toggle('asincrona')} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1C3581] mb-2">
                  Tiempos de Respuesta Asíncrona
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Priorizamos el trabajo enfocado. Los mensajes en canales comunes tienen un tiempo
                  de respuesta esperado de hasta 4 horas. Si es urgente, usa el canal "Cuate SOS".
                </p>
              </div>
            </div>

            {/* Derecha: box 4h */}
            <div className="w-40 h-28 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-5xl font-black text-gray-800 leading-none">4h</span>
              <span className="text-xs text-gray-400 font-medium mt-1.5">Margen Máximo</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* ── Firmas ── */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-full h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=130&fit=crop"
                alt="firma fundador"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="text-center">
              <p className="text-base font-extrabold text-gray-900">Fundador</p>
              <p className="text-xs text-gray-400 mt-0.5">El Combo Cuate Leadership</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <div className="w-full h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=130&fit=crop"
                alt="firma equipo"
                className="w-full h-full object-cover opacity-40"
              />
            </div>
            <div className="text-center">
              <p className="text-base font-extrabold text-gray-900">Equipo Creativo</p>
              <p className="text-xs text-gray-400 mt-0.5">Validado por 12 integrantes</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-[#14322A] text-white font-extrabold py-4 rounded-2xl text-base flex items-center justify-center space-x-3 hover:opacity-90 transition shadow-lg shadow-black/10">
          <ShieldCheck size={20} />
          <span>Re-Certificar Acuerdo 2024</span>
        </button>
      </main>

      {/* ════ Widget flotante Cuate AI ════ */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end space-x-3">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 mb-1">
          <p className="text-xs font-extrabold text-gray-900">¿Necesitas ayuda con el acuerdo?</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Pregúntale a Cuate AI</p>
        </div>
        <button className="w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform">
          <Bot size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}
