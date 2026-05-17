import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL    = 'founder@combocuate.com';
const ADMIN_PASSWORD = 'cuate2024';

export default function AdminGateScreen({ onUnlock }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [show,     setShow]     = useState(false);
  const [error,    setError]    = useState('');
  const [shake,    setShake]    = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      onUnlock();
    } else {
      setError('Credenciales incorrectas. Solo el Founder puede acceder.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex items-center justify-center">
      <div
        className={`w-full max-w-md ${shake ? 'animate-[wiggle_0.4s_ease-in-out]' : ''}`}
        style={shake ? { animation: 'shake 0.4s ease-in-out' } : {}}
      >
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

          {/* Top band */}
          <div className="bg-[#1C3581] px-8 py-8 flex flex-col items-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
              <ShieldCheck size={28} className="text-[#3AC0A6]" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-extrabold text-white leading-tight">Área Restringida</h2>
              <p className="text-xs text-white/50 mt-1">Panel Administrativo del Founder</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-7 space-y-5">
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Solo el <span className="font-bold text-[#1C3581]">Founder</span> de El Combo Cuate
              puede acceder a este panel. Ingresa tus credenciales para continuar.
            </p>

            {error && (
              <div className="flex items-center space-x-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-500 flex-shrink-0" />
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2A9D87] uppercase tracking-widest">
                  Correo del Founder
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="founder@combocuate.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#2A9D87] transition"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#2A9D87] uppercase tracking-widest">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-12 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#2A9D87] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2A9D87] text-white font-extrabold py-3.5 rounded-xl text-sm hover:bg-[#23897A] transition shadow-lg shadow-[#2A9D87]/25 flex items-center justify-center space-x-2 mt-2"
              >
                <Lock size={15} />
                <span>Ingresar como Founder</span>
              </button>
            </form>

            <p className="text-[10px] text-center text-gray-400">
              ¿No eres el Founder?{' '}
              <span className="text-[#2A9D87] font-semibold cursor-pointer hover:underline">
                Volver al Dashboard
              </span>
            </p>
          </div>
        </div>

        {/* Hint — solo en desarrollo */}
        <p className="text-center text-[10px] text-gray-400 mt-4">
          Demo: <span className="font-mono text-gray-500">founder@combocuate.com</span> /{' '}
          <span className="font-mono text-gray-500">cuate2024</span>
        </p>
      </div>
    </div>
  );
}
