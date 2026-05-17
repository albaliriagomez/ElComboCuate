import React, { useState, useEffect } from 'react';
import { TrendingUp, Rocket, Sparkles } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   MASCOTA SVG con animaciones
   ══════════════════════════════════════════════════════════════ */
function MascotaBlob() {
  return (
    <svg viewBox="0 0 140 160" className="w-full h-full drop-shadow-2xl animate-mascota-float">
      {/* Sombra base animada */}
      <ellipse cx="70" cy="152" rx="38" ry="8" fill="rgba(0,0,0,0.15)" className="animate-mascota-shadow" />

      {/* Resplandor detrás */}
      <circle cx="70" cy="100" r="52" fill="rgba(255,255,255,0.08)" />

      {/* Cuerpo principal */}
      <circle cx="70" cy="100" r="48" fill="#3AC0A6" />

      {/* Cara */}
      <circle cx="70" cy="88" r="35" fill="#2EAF96" />

      {/* Reflejo cara */}
      <ellipse cx="57" cy="70" rx="10" ry="6" fill="white" opacity="0.18" />

      {/* Gorra */}
      <rect x="40" y="46" width="60" height="28" fill="#1C3581" rx="8" />
      <rect x="33" y="56" width="74" height="12" fill="#0D1B3E" rx="6" />
      <text x="58" y="68" fontSize="11" fill="#3AC0A6" fontWeight="bold">CC</text>

      {/* Ojos con parpadeo */}
      <g className="animate-blink">
        <ellipse cx="58" cy="85" rx="8" ry="9" fill="#0D1B3E" />
        <ellipse cx="82" cy="85" rx="8" ry="9" fill="#0D1B3E" />
        {/* Brillo ojos */}
        <circle cx="61" cy="82" r="3.5" fill="white" />
        <circle cx="85" cy="82" r="3.5" fill="white" />
        <circle cx="60" cy="83" r="1.2" fill="white" opacity="0.7" />
        <circle cx="84" cy="83" r="1.2" fill="white" opacity="0.7" />
      </g>

      {/* Sonrisa */}
      <path d="M 58 98 Q 70 112 82 98" stroke="#0D1B3E" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Lengüita */}
      <ellipse cx="70" cy="107" rx="4" ry="2.5" fill="#E76F51" opacity="0.8" />

      {/* Mejillas animadas */}
      <circle cx="46" cy="93" r="7" fill="#F4A261" opacity="0.45" className="animate-cheeks" />
      <circle cx="94" cy="93" r="7" fill="#F4A261" opacity="0.45" className="animate-cheeks" />

      {/* Chaleco */}
      <path d="M 40 108 Q 50 118 70 118 Q 90 118 100 108 L 104 140 L 36 140 Z" fill="#1C3581" />
      {/* Botones chaleco */}
      <circle cx="70" cy="122" r="2" fill="#3AC0A6" opacity="0.7" />
      <circle cx="70" cy="130" r="2" fill="#3AC0A6" opacity="0.7" />

      {/* Brillitos flotando */}
      <g className="animate-sparkles">
        <circle cx="20" cy="72" r="2" fill="#F4A261" />
        <circle cx="118" cy="80" r="1.5" fill="#F4D35E" />
        <circle cx="22" cy="108" r="1.5" fill="#3AC0A6" />
        <circle cx="115" cy="110" r="2" fill="#F4A261" />
      </g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTADOR ANIMADO
   ══════════════════════════════════════════════════════════════ */
function CountUp({ target, duration = 1800, suffix = '' }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <>{val.toLocaleString()}{suffix}</>;
}

/* ══════════════════════════════════════════════════════════════
   LOGIN SCREEN
   ══════════════════════════════════════════════════════════════ */
export default function LoginScreen({ onLogin }) {
  const [codigo, setCodigo] = useState('');
  const [email,  setEmail]  = useState('');
  const [loaded, setLoaded]  = useState(false);
  const [role,   setRole]   = useState('trabajador'); // 'trabajador' | 'admin'

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full min-h-screen flex overflow-hidden">

      {/* ══════════════════════════════════
          IZQUIERDA — Formulario
          ══════════════════════════════════ */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 py-12 bg-white relative">

        {/* Decoración fondo sutil */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#3AC0A6]/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#1C3581]/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="max-w-sm w-full mx-auto space-y-6 relative z-10">

          {/* Marca */}
          <div className={`space-y-1 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '0ms' }}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3AC0A6] to-[#1C3581] flex items-center justify-center shadow-md">
                <span className="text-white text-[10px] font-black">CC</span>
              </div>
              <h1 className="text-2xl font-extrabold text-[#1C3581]">El Combo Cuate</h1>
            </div>
            <p className="text-sm text-gray-400">Impulsa tu startup con creatividad y propósito.</p>
          </div>

          {/* Botones OAuth */}
          <div className={`space-y-3 pt-1 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}>
            <button
              onClick={() => onLogin(role)}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Cuenta de Google</span>
            </button>

            <button
              onClick={() => onLogin(role)}
              className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>LinkedIn</span>
            </button>
          </div>

          {/* Separador */}
          <div className={`relative flex items-center transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '200ms' }}>
            <div className="flex-grow border-t border-gray-100" />
            <span className="mx-4 text-xs text-gray-400">o vía correo electrónico</span>
            <div className="flex-grow border-t border-gray-100" />
          </div>

          {/* Campos */}
          <div className={`space-y-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '300ms' }}>
            <div className="group">
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">
                Código de Invitación de la Startup
              </label>
              <input
                type="text"
                placeholder="CC-XXXX-2024"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 focus:bg-white focus:shadow-md transition-all duration-200"
              />
            </div>
            <div className="group">
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">
                Correo Electrónico
              </label>
              <input
                type="email"
                placeholder="nombre@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onLogin(role)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 focus:bg-white focus:shadow-md transition-all duration-200"
              />
            </div>
          </div>

          {/* Selector de rol — discreto, antes del CTA */}
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '370ms' }}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Acceder como</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRole('trabajador')}
                className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                  role === 'trabajador'
                    ? 'border-[#2A9D87] bg-[#2A9D87]/10 text-[#2A9D87]'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                👤 Trabajador
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                  role === 'admin'
                    ? 'border-[#1C3581] bg-[#1C3581]/10 text-[#1C3581]'
                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                ⚡ Founder
              </button>
            </div>
          </div>

          {/* CTA principal — pasa el rol seleccionado */}
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}>
            <button
              onClick={() => onLogin(role)}
              className={`group w-full relative text-white font-bold py-3.5 rounded-xl text-sm active:scale-[0.98] transition-all duration-200 shadow-lg overflow-hidden ${
                role === 'admin'
                  ? 'bg-[#1C3581] hover:bg-[#16296e] shadow-[#1C3581]/25'
                  : 'bg-[#2A9D87] hover:bg-[#23897A] shadow-[#2A9D87]/25'
              }`}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12"/>
              <span className="relative flex items-center justify-center gap-2">
                <Sparkles size={15} className="group-hover:animate-spin-once"/>
                {role === 'admin' ? 'Acceder como Founder' : 'Acceder al Combo'}
              </span>
            </button>
          </div>

          {/* Link registro */}
          <p className={`text-center text-xs text-gray-400 transition-all duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '500ms' }}>
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

        {/* Blobs de fondo animados */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3AC0A6]/25 blur-3xl pointer-events-none animate-blob" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#1C3581]/20 blur-3xl pointer-events-none animate-blob-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#F4A261]/10 blur-3xl pointer-events-none animate-blob-3" />

        {/* Grid de puntos decorativo */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}/>

        <div className="relative z-10 w-full max-w-md space-y-4">

          {/* Card 1 — Campañas */}
          <div className={`bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center space-x-4 transition-all duration-700 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl cursor-default ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '150ms' }}>
            <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 animate-icon-pulse">
              <Rocket size={20} className="text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">
                <CountUp target={1248} duration={1600} />
              </p>
              <p className="text-[11px] text-white/65 font-semibold uppercase tracking-widest mt-0.5">
                Campañas Completadas
              </p>
            </div>
          </div>

          {/* Card 2 — Crecimiento */}
          <div className={`bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 ml-12 transition-all duration-700 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl cursor-default ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '300ms' }}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp size={16} className="text-white/80" />
              <p className="text-[11px] text-white/65 font-semibold uppercase tracking-widest">
                Crecimiento Colectivo
              </p>
            </div>
            <p className="text-3xl font-black text-white leading-none mb-3">
              +<CountUp target={85} duration={1800} suffix="%" />
            </p>
            {/* Barra animada */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
              <div className={`bg-white h-full rounded-full transition-all duration-[1800ms] ease-out ${loaded ? 'w-[85%]' : 'w-0'}`}
                style={{ transitionDelay: '600ms' }}>
                <div className="h-full w-full animate-shimmer-bar bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
              </div>
            </div>
          </div>

          {/* Card 3 — Niveles */}
          <div className={`bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-5 transition-all duration-700 hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl cursor-default ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
            style={{ transitionDelay: '450ms' }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white">Niveles Alcanzados</p>
              <span className="text-[10px] font-bold bg-[#1C3581]/60 text-[#3AC0A6] px-2.5 py-0.5 rounded-full border border-[#3AC0A6]/30 animate-badge-glow">
                PRO EXPERT
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-2xl font-black text-white">
                  <CountUp target={45} duration={1400} />
                </p>
                <p className="text-[10px] text-white/55 uppercase tracking-widest font-semibold">Habilidades</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">
                  <CountUp target={12} duration={1200} />
                </p>
                <p className="text-[10px] text-white/55 uppercase tracking-widest font-semibold">Reconocimientos</p>
              </div>
            </div>
            <p className="text-[11px] text-white/55 leading-snug">
              Estás en el top 5% de startups creativas este mes.
            </p>
          </div>

          {/* Mascota flotante */}
          <div className={`flex justify-center pt-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: '600ms' }}>
            <div className="w-44 h-44 relative">
              {/* Halo detrás de la mascota */}
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl animate-halo" />
              <MascotaBlob />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ CSS ANIMACIONES ═══════ */}
      <style>{`
        /* Flotación suave mascota */
        @keyframes mascota-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(1deg); }
        }
        .animate-mascota-float { animation: mascota-float 4s ease-in-out infinite; }

        /* Sombra sincronizada */
        @keyframes mascota-shadow {
          0%, 100% { transform: scaleX(1); opacity: 0.15; }
          50%       { transform: scaleX(0.75); opacity: 0.08; }
        }
        .animate-mascota-shadow { animation: mascota-shadow 4s ease-in-out infinite; }

        /* Parpadeo */
        @keyframes blink {
          0%, 88%, 100% { transform: scaleY(1); }
          92%, 96%       { transform: scaleY(0.08); }
        }
        .animate-blink {
          animation: blink 5s ease-in-out infinite;
          transform-origin: 70px 85px;
          transform-box: fill-box;
        }

        /* Mejillas pulsantes */
        @keyframes cheeks {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.65; }
        }
        .animate-cheeks { animation: cheeks 2.5s ease-in-out infinite; }

        /* Brillitos */
        @keyframes sparkles {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.3); }
        }
        .animate-sparkles {
          animation: sparkles 3s ease-in-out infinite;
          transform-origin: 70px 90px;
          transform-box: fill-box;
        }

        /* Halo mascota */
        @keyframes halo {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50%       { opacity: 0.7; transform: scale(1.05); }
        }
        .animate-halo { animation: halo 4s ease-in-out infinite; }

        /* Blobs de fondo */
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -60px) scale(1.15); }
          66%       { transform: translate(-30px, 30px) scale(0.9); }
        }
        .animate-blob   { animation: blob 20s ease-in-out infinite; }
        .animate-blob-2 { animation: blob 25s ease-in-out infinite reverse; }
        .animate-blob-3 { animation: blob 18s ease-in-out infinite 3s; }

        /* Shimmer barra de progreso */
        @keyframes shimmer-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-bar { animation: shimmer-bar 2.5s ease-in-out infinite; }

        /* Pulso icono */
        @keyframes icon-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.1); }
        }
        .animate-icon-pulse { animation: icon-pulse 3s ease-in-out infinite; }

        /* Badge glow */
        @keyframes badge-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(58, 192, 166, 0); }
          50%       { box-shadow: 0 0 10px 2px rgba(58, 192, 166, 0.5); }
        }
        .animate-badge-glow { animation: badge-glow 2.5s ease-in-out infinite; }

        /* Shimmer botón CTA */
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .group:hover .group-hover\\:animate-spin-once {
          animation: spin-once 0.5s ease-in-out;
        }

        /* Focus ring suave inputs */
        input:focus {
          box-shadow: 0 0 0 3px rgba(42, 157, 135, 0.15), 0 4px 12px rgba(0,0,0,0.06);
        }
      `}</style>
    </div>
  );
}