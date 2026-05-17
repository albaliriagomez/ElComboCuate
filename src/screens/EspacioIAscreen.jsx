import React, { useState } from 'react';
import {
  Search, Bell, Trophy,
  Mic, Bot, Settings, Zap, Wand2, Send,
  Calendar, FileText, TrendingUp,
  CheckCircle, Circle,
} from 'lucide-react';

/* ──────────────────────────────────────
   Datos estáticos
────────────────────────────────────── */
const OBJETIVOS_INIT = [
  { id: 'regional', label: 'Identidad Regional Boliviana', sel: true  },
  { id: 'cyber',    label: 'Estética Cyber-Andina',         sel: false },
  { id: 'tiktok',   label: 'Lanzamiento TikTok Q4',         sel: false },
];

const CALIDAD = [
  { label: 'Claridad',          pct: 85, bar: 'bg-[#2A9D87]',  txt: 'text-[#3AC0A6]' },
  { label: 'Contexto Regional', pct: 92, bar: 'bg-[#3AC0A6]',  txt: 'text-[#3AC0A6]' },
  { label: 'Originalidad',      pct: 64, bar: 'bg-[#7C4DFF]',  txt: 'text-[#7C4DFF]' },
];

const LENGUAJES = ['Camba', 'Colla', 'Chapaico'];

const ACCIONES = [
  { label: 'Gancho TikTok',  icon: Calendar  },
  { label: 'Script de 15s',  icon: FileText  },
  { label: 'Analítica Viral', icon: TrendingUp },
];

const MOODBOARD = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&h=80&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop',
];

/* ──────────────────────────────────────
   Pantalla
────────────────────────────────────── */
export default function EspacioIAscreen() {
  const [objetivos, setObjetivos] = useState(OBJETIVOS_INIT);
  const [lenguaje,  setLenguaje]  = useState('Camba');
  const [prompt,    setPrompt]    = useState('');
  const [output,    setOutput]    = useState('');
  const [loading,   setLoading]   = useState(false);
  const [activeTab, setActiveTab] = useState('misiones');

  const toggleObj = (id) =>
    setObjetivos((prev) => prev.map((o) => ({ ...o, sel: o.id === id })));

  const handleGenerar = () => {
    if (loading) return;
    setLoading(true);
    setOutput('');
    setTimeout(() => {
      setOutput(
        `🎯 Hook ${lenguaje}: "${prompt || 'Bolivia 2077'}"\n\n` +
        `Versión 1: "¿Sabías que el orgullo ${lenguaje.toLowerCase()} puede convertirse en viralidad digital? ` +
        `Mira lo que logramos en 15 segundos..."\n\n` +
        `Versión 2: "Tradición + tecnología = el contenido que tu startup necesita ahora mismo. ` +
        `Hecho 100% cuate."`
      );
      setLoading(false);
    }, 1600);
  };

  return (
    <div className="pl-64 min-h-screen bg-[#0A1329] flex flex-col">

      {/* ════════════════════════════════
          NAVBAR oscura con búsqueda + tabs
          ════════════════════════════════ */}
      <header className="bg-[#0D1B3E] border-b border-white/5 px-6 h-14 flex items-center justify-between gap-6 sticky top-0 z-30">

        {/* Búsqueda */}
        <div className="flex items-center space-x-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-52 flex-shrink-0">
          <Search size={14} className="text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Explorar ideas..."
            className="bg-transparent text-sm text-gray-300 placeholder-gray-600 focus:outline-none w-full"
          />
        </div>

        {/* Tabs de navegación centrales */}
        <nav className="flex items-center space-x-6 flex-1 justify-center">
          {['Dashboard', 'Misiones', 'Mercado'].map((t) => {
            const id = t.toLowerCase();
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`text-sm font-medium transition ${
                  activeTab === id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {t}
              </button>
            );
          })}
        </nav>

        {/* Controles derecha */}
        <div className="flex items-center space-x-4 flex-shrink-0">
          <span className="flex items-center space-x-1.5 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/20">
            Estado: Inspirado
          </span>
          <span className="text-sm font-bold text-white/80">+500 XP</span>
          <Bell   size={17} className="text-gray-500 cursor-pointer hover:text-white transition" />
          <Trophy size={17} className="text-gray-500 cursor-pointer hover:text-white transition" />
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/10">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* ════════════════════════════════
          LAYOUT 3 COLUMNAS
          ════════════════════════════════ */}
      <main className="flex-1 p-6 grid grid-cols-3 gap-5 min-h-0">

        {/* ══════════════════════════
            COL 1 — Brief Automatizado
            ══════════════════════════ */}
        <div className="flex flex-col space-y-4">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Mic size={20} className="text-white" />
              <h2 className="text-lg font-extrabold text-white leading-tight">
                Brief<br />Automatizado
              </h2>
            </div>
            <span className="flex items-center space-x-1 bg-[#2A9D87]/20 text-[#3AC0A6] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#3AC0A6]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3AC0A6] animate-pulse" />
              <span>En Vivo</span>
            </span>
          </div>

          {/* Card de transcripción */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <p className="text-[10px] text-gray-500 font-medium tracking-wide">
              09:41 AM — Transcripción
            </p>
            <p className="text-sm text-gray-300 italic leading-relaxed">
              "...necesitamos una campaña que resuene con el orgullo cruceño pero con un toque futurista..."
            </p>
          </div>

          {/* Objetivos detectados */}
          <div>
            <p className="text-[10px] font-bold text-[#3AC0A6] uppercase tracking-widest mb-2">
              Objetivos Detectados
            </p>
            <div className="space-y-2">
              {objetivos.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => toggleObj(obj.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm transition ${
                    obj.sel
                      ? 'bg-[#2A9D87]/15 border border-[#2A9D87]/40 text-white'
                      : 'bg-white/5 border border-white/5 text-gray-400 hover:border-white/15'
                  }`}
                >
                  {obj.sel
                    ? <CheckCircle size={16} className="text-[#3AC0A6] flex-shrink-0" />
                    : <Circle      size={16} className="text-gray-600 flex-shrink-0" />
                  }
                  <span className="font-medium text-sm leading-snug">{obj.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sugerencia de concepto */}
          <div className="bg-[#1C3581]/40 border border-[#1C3581]/60 rounded-2xl p-4 flex items-start space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#2A9D87]/20 flex items-center justify-center flex-shrink-0">
              <Wand2 size={16} className="text-[#3AC0A6]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Sugerencia de Concepto</p>
              <p className="text-[11px] text-gray-400 mt-0.5 italic">"Bolivia 2077: Tradición Digital"</p>
            </div>
          </div>

          {/* Estado IA conectada */}
          <div className="bg-[#2A9D87]/10 border border-[#2A9D87]/20 rounded-2xl px-4 py-3 flex items-center space-x-2">
            <Zap size={14} className="text-[#3AC0A6]" />
            <span className="text-xs font-bold text-[#3AC0A6] uppercase tracking-widest">
              IA Conectada
            </span>
          </div>
        </div>

        {/* ══════════════════════════
            COL 2 — Copiloto IA
            ══════════════════════════ */}
        <div className="flex flex-col space-y-5">

          {/* Header */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2A9D87] to-[#7C4DFF] flex items-center justify-center shadow-lg flex-shrink-0">
              <Bot size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white leading-none">Copiloto IA</h2>
              <p className="text-sm text-gray-400 mt-0.5">Generando ideas de alto impacto</p>
            </div>
          </div>

          {/* Área de texto + botón Generar */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="relative flex-1 min-h-[200px]">
              <textarea
                value={output || prompt}
                onChange={(e) => !output && setPrompt(e.target.value)}
                placeholder="Escribe una idea o deja que Cuate proponga..."
                className="w-full h-full min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#3AC0A6]/40 resize-none transition leading-relaxed"
              />
              <button
                onClick={handleGenerar}
                disabled={loading}
                className="absolute bottom-4 right-4 flex items-center space-x-2 bg-[#2A9D87] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#23897A] transition shadow-lg shadow-[#2A9D87]/30 disabled:opacity-50"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <Send size={14} />
                }
                <span>{loading ? 'Generando...' : 'Generar'}</span>
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-2 justify-center">
            {ACCIONES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => setPrompt(label)}
                className="flex items-center space-x-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition"
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Lenguaje regional */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 font-medium">Lenguaje Regional:</span>
              <div className="flex space-x-1.5">
                {LENGUAJES.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLenguaje(l)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      lenguaje === l
                        ? 'bg-[#2A9D87] text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-[#3AC0A6] font-semibold animate-pulse">
              Cuate está escuchando
            </span>
          </div>
        </div>

        {/* ══════════════════════════
            COL 3 — Mentor IA
            ══════════════════════════ */}
        <div className="flex flex-col space-y-5">

          {/* Header */}
          <div className="flex items-center space-x-2">
            <Settings size={18} className="text-gray-300" />
            <h2 className="text-lg font-extrabold text-white">Mentor IA</h2>
          </div>

          {/* Calidad de prompts */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Calidad de Prompts
            </p>
            {CALIDAD.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                  <span className={`text-xs font-black ${item.txt}`}>{item.pct}%</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${item.bar} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tip de mentoría */}
          <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-red-400">Tip de Mentoría</p>
            <p className="text-xs text-gray-300 leading-relaxed">
              "Tu idea es buena, pero intenta añadir un{' '}
              <span className="font-bold text-white">'contraste inesperado'</span>
              {' '}para captar la atención en los primeros 3 segundos."
            </p>
          </div>

          {/* Moodboard sugerido */}
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">
              Moodboard Sugerido
            </p>
            <div className="grid grid-cols-2 gap-2">
              {MOODBOARD.map((src, i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl overflow-hidden border border-white/5 hover:border-[#3AC0A6]/30 transition cursor-pointer"
                >
                  <img src={src} alt="moodboard" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
