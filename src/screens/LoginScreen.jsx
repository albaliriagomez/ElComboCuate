import React, { useState } from 'react';
import { TrendingUp, Rocket } from 'lucide-react';

/* ── Mascota SVG estilo blob redondeado ── */
function MascotaBlob() {
  return (
    <svg viewBox="0 0 140 160" className="w-full h-full drop-shadow-2xl">
      {/* Sombra base */}
      <ellipse cx="70" cy="152" rx="38" ry="8" fill="rgba(0,0,0,0.15)" />
      {/* Cuerpo principal */}
      <circle cx="70" cy="100" r="48" fill="#3AC0A6" />
      {/* Cara */}
      <circle cx="70" cy="88" r="35" fill="#2EAF96" />
      {/* Gorra */}
      <rect x="40" y="46" width="60" height="28" fill="#1C3581" rx="8" />
      <rect x="33" y="56" width="74" height="12" fill="#0D1B3E" rx="6" />
      <text x="58" y="68" fontSize="11" fill="#3AC0A6" fontWeight="bold">CC</text>
      {/* Ojos */}
      <circle cx="58" cy="85" r="8" fill="#0D1B3E" />
      <circle cx="82" cy="85" r="8" fill="#0D1B3E" />
      {/* Brillo ojos */}
      <circle cx="61" cy="82" r="3" fill="white" />
      <circle cx="85" cy="82" r="3" fill="white" />
      {/* Sonrisa */}
      <path d="M 58 98 Q 70 110 82 98" stroke="#0D1B3E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Mejillas */}
      <circle cx="46" cy="93" r="7" fill="#F4A261" opacity="0.4" />
      <circle cx="94" cy="93" r="7" fill="#F4A261" opacity="0.4" />
      {/* Chaleco */}
      <path d="M 40 108 Q 50 118 70 118 Q 90 118 100 108 L 104 140 L 36 140 Z" fill="#1C3581" />
    </svg>
  );
}

export default function LoginScreen({ onLogin }) {
  const [codigo, setCodigo] = useState('');
  const [email,  setEmail]  = useState('');

  return (
    <div className="w-full min-h-screen flex">

      {/* ══════════════════════════════════
          IZQUIERDA — Formulario limpio
          ══════════════════════════════════ */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 py-12 bg-white">
        <div className="max-w-sm w-full mx-auto space-y-6">

          {/* Marca */}
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-[#1C3581]">El Combo Cuate</h1>
            <p className="text-sm text-gray-400">Impulsa tu startup con creatividad y propósito.</p>
          </div>

          {/* Botones OAuth */}
          <div className="space-y-3 pt-1">
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {/* Google SVG oficial */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Cuenta de Google</span>
            </button>

            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              {/* LinkedIn SVG oficial */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          {/* Separador */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-100" />
            <span className="mx-4 text-xs text-gray-400">o vía correo electrónico</span>
            <div className="flex-grow border-t border-gray-100" />
          </div>

          {/* Campos */}
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">
                Código de Invitación de la Startup
              </label>
              <input
                type="text"
                placeholder="CC-XXXX-2024"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="nombre@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onLogin()}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 transition"
              />
            </div>
          </div>

          {/* CTA principal */}
          <button
            onClick={onLogin}
            className="w-full bg-[#2A9D87] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#23897A] transition shadow-lg shadow-[#2A9D87]/25"
          >
            Acceder al Combo
          </button>

          {/* Link registro */}
          <p className="text-center text-xs text-gray-400">
            ¿No tienes una cuenta?{' '}
            <button className="text-[#2A9D87] font-semibold hover:underline">
              Solicitar Acceso
            </button>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════
          DERECHA — Panel visual + mascota
          ══════════════════════════════════ */}
      <div className="hidden md:flex w-[55%] bg-[#2A9D87] flex-col justify-center items-center p-12 relative overflow-hidden">

        {/* Círculos decorativos de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3AC0A6]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#1C3581]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md space-y-4">

          {/* Card 1 — Campañas */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center space-x-4">
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Rocket size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">1,248</p>
              <p className="text-[11px] text-white/65 font-semibold uppercase tracking-widest mt-0.5">
                Campañas Completadas
              </p>
            </div>
          </div>

          {/* Card 2 — Crecimiento (offset a la derecha) */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 ml-12">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={16} className="text-white/80" />
              <p className="text-[11px] text-white/65 font-semibold uppercase tracking-widest">
                Crecimiento Colectivo
              </p>
            </div>
            <p className="text-3xl font-black text-white leading-none mb-3">+85%</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          {/* Card 3 — Niveles */}
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white">Niveles Alcanzados</p>
              <span className="text-[10px] font-bold bg-[#1C3581]/60 text-[#3AC0A6] px-2.5 py-0.5 rounded-full border border-[#3AC0A6]/30">
                PRO EXPERT
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-2xl font-black text-white">45</p>
                <p className="text-[10px] text-white/55 uppercase tracking-widest font-semibold">Habilidades</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">12</p>
                <p className="text-[10px] text-white/55 uppercase tracking-widest font-semibold">Reconocimientos</p>
              </div>
            </div>
            <p className="text-[11px] text-white/55 leading-snug">
              Estás en el top 5% de startups creativas este mes.
            </p>
          </div>

          {/* Mascota */}
          <div className="flex justify-center pt-2">
            <div className="w-44 h-44">
              <MascotaBlob />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
