import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Bell, Trophy,
  Mic, Bot, Settings, Zap, Wand2, Send,
  Calendar, FileText, TrendingUp,
  CheckCircle, Circle, RefreshCw, Sparkles,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════
   DATOS POR REGIÓN — copys, métricas y tips diferenciados
══════════════════════════════════════════════════════ */
const REGION_DATA = {
  Camba: {
    copy: `🤠 ¡Ya pariente! Tu gancho para TikTok está listo:\n\n"¿Pensabas que el e-commerce en Santa Cruz era aburrido? Mirá este buey... nosotros lo cambiamos todo."\n\n📱 Versión Reel 15s:\n"Aquí en el oriente digital no nos quedamos atrás, ¿o qué bicho? Cuate te conecta con tu mercado de forma brutal y sin vueltas."\n\n💡 Tip camba: Usa el slang cruceño con confianza — el público del oriente valora la autenticidad sobre la perfección.`,
    metrics: { claridad: 88, contexto: 97, originalidad: 74 },
    tip: '¡El slang cruceño dispara un 43% más de engagement! Añade jerga local auténtica en los primeros 3 segundos para retener al usuario oriental boliviano.',
    moodboard: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=120&h=80&fit=crop',
    ],
  },
  Colla: {
    copy: `🏔️ ¡Ya ya Jilata! Estructura Cyber-Andina detectada:\n\n"No te compliques más, hermano. Te traemos la verdadera solución digital para tu negocio, con visión paceña y tecnología del futuro."\n\n📱 Versión Reel 15s:\n"Del mercado Las Brujas al marketplace global: Cuate hace posible lo que antes era solo un sueño andino. ¡Suma, no divides!"\n\n💡 Tip colla: El público andino responde al enfoque estratégico y al valor comunitario. Conecta tradición con innovación.`,
    metrics: { claridad: 92, contexto: 99, originalidad: 68 },
    tip: 'La cosmovisión andina tiene alcance emocional único. Incorpora elementos de identidad colectiva aymara/quechua para mayor impacto cultural en el altiplano.',
    moodboard: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1478720568477-152d9b5b0c42?w=120&h=80&fit=crop',
    ],
  },
  Chapaico: {
    copy: `🍇 ¡Qué tal che! Tu propuesta tarijeña viene recargada:\n\n"La chura Tarija ya tiene su aliado digital. Cuate es el empuje que necesitaba tu negocio, con la calidez que solo el sur de Bolivia puede dar."\n\n📱 Versión Reel 15s:\n"¿Sos de Tarija y querés crecer en digital? Che, no lo pienses más. El Combo Cuate es tu cuate de toda la vida, pero en versión tech."\n\n💡 Tip chapaico: El tono tarijeño cálido y directo conecta mejor con audiencias familiares — úsalo como ventaja diferencial.`,
    metrics: { claridad: 84, contexto: 95, originalidad: 81 },
    tip: 'El tono tarijeño cálido y cercano conecta con audiencias familiares. Esa cercanía es tu mayor ventaja competitiva frente a contenido genérico.',
    moodboard: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=80&fit=crop',
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=120&h=80&fit=crop',
    ],
  },
};

/* Ideas precargadas por botón de acción rápida */
const IDEAS_RAPIDAS = {
  'Gancho TikTok':   'Gancho viral para reel de comida rápida con IA en Bolivia 🚀',
  'Script de 15s':   'Script de 15 segundos para el combo digital más explosivo del oriente boliviano 🎬',
  'Analítica Viral': 'Analiza el potencial viral de mi campaña Cyber-Andina para TikTok y Reels 📊',
};

/* Transcripciones rotativas simuladas "En Vivo" */
const TRANSCRIPCIONES = [
  '"...necesitamos una campaña que resuene con el orgullo cruceño pero con un toque futurista..."',
  '"...el cliente quiere algo que grite Bolivia 2077, autenticidad y tecnología al mismo tiempo..."',
  '"...la Identidad Regional es clave, pero debe traducirse en contenido viral para TikTok Q4..."',
  '"...¿podemos mezclar Cyber-Andina con modismos locales para el pitch del viernes?"',
];

const LENGUAJES = ['Camba', 'Colla', 'Chapaico'];

const ACCIONES = [
  { label: 'Gancho TikTok',   icon: Calendar   },
  { label: 'Script de 15s',   icon: FileText   },
  { label: 'Analítica Viral', icon: TrendingUp },
];

/* Configuración de insignias del Mentor IA */
const BADGES_CONFIG = [
  { id: 'primer-prompt', emoji: '🎯', label: 'Primer Prompt',       desc: 'Primera generación IA',          at: 1  },
  { id: 'explorador',    emoji: '🗺️', label: 'Explorador Regional', desc: '3 generaciones completadas',     at: 3  },
  { id: 'ia-nativo',    emoji: '🤖', label: 'IA Nativo',            desc: '6 prompts dominados',            at: 6  },
  { id: 'maestro-ia',   emoji: '⭐', label: 'Maestro IA',           desc: '10 generaciones de alto impacto',at: 10 },
];

/* ══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════ */
export default function EspacioIAscreen() {
  /* ── Estados del Brief (Col 1) ── */
  const [briefMode,     setBriefMode]     = useState('live'); // 'live' | 'procesar'
  const [briefInput,    setBriefInput]    = useState('');
  const [briefOutput,   setBriefOutput]   = useState(null);
  const [briefLoading,  setBriefLoading]  = useState(false);
  const [briefChecklist,setBriefChecklist]= useState([]);
  const [activeObjectives, setActiveObjectives] = useState([
    { id: 'regional', label: 'Identidad Regional Boliviana', sel: true  },
    { id: 'cyber',    label: 'Estética Cyber-Andina',        sel: false },
    { id: 'tiktok',   label: 'Lanzamiento TikTok Q4',        sel: false },
  ]);
  const [transcIdx,  setTranscIdx]  = useState(0);
  const [transcShow, setTranscShow] = useState(true);

  /* ── Estados del Copiloto (Col 2) ── */
  const [region,        setRegion]        = useState('Camba');
  const [promptInput,   setPromptInput]   = useState('');
  const [outputContent, setOutputContent] = useState('');
  const [isLoading,     setIsLoading]     = useState(false);
  const [activeTab,     setActiveTab]     = useState('misiones');

  /* ── Estados del Mentor IA (Col 3) ── */
  const [metrics, setMetrics] = useState({ claridad: 85, contexto: 92, originalidad: 64 });
  const [mentorTip, setMentorTip] = useState(
    "Tu idea es buena, pero intenta añadir un 'contraste inesperado' para captar la atención en los primeros 3 segundos."
  );
  const [moodboard,            setMoodboard]            = useState(REGION_DATA.Camba.moodboard);
  const [generaciones,         setGeneraciones]         = useState(0);
  const [iaXP,                 setIaXP]                 = useState(0);
  const [badgesDesbloqueadas,  setBadgesDesbloqueadas]  = useState([]);
  const [nuevaBadge,           setNuevaBadge]           = useState(null);

  /* ── Estado: Bloqueo Creativo ── */
  const [bloqueado, setBloqueado] = useState(false);

  /* ── useEffect: limpiar output al cambiar de región ── */
  useEffect(() => {
    setOutputContent('');
    setPromptInput('');
  }, [region]);

  /* ── useEffect: rotar transcripción cada 4s (solo en modo live) ── */
  useEffect(() => {
    if (briefMode !== 'live') return;
    const id = setInterval(() => {
      setTranscShow(false);
      setTimeout(() => {
        setTranscIdx((i) => (i + 1) % TRANSCRIPCIONES.length);
        setTranscShow(true);
      }, 300);
    }, 4000);
    return () => clearInterval(id);
  }, [briefMode]);

  /* ── Toggle individual de checkboxes del brief ── */
  const toggleObjective = (id) =>
    setActiveObjectives((prev) =>
      prev.map((o) => (o.id === id ? { ...o, sel: !o.sel } : o))
    );

  /* ── toggleBriefChecklist ── */
  const toggleBriefCheck = (id) =>
    setBriefChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: !c.done } : c))
    );

  /* ── procesarBrief: convierte texto caótico en brief estructurado ── */
  const procesarBrief = () => {
    if (!briefInput.trim() || briefLoading) return;
    setBriefLoading(true);
    setBriefOutput(null);
    setTimeout(() => {
      const t = briefInput.toLowerCase();
      const esVideo   = t.includes('video') || t.includes('reel') || t.includes('tiktok');
      const esUrgente = t.includes('urgente') || t.includes('mañana') || t.includes('hoy') || t.includes('viernes');
      let reg = 'Bolivia';
      if      (t.includes('santa cruz') || t.includes('camba'))  reg = 'Santa Cruz';
      else if (t.includes('la paz')     || t.includes('colla'))   reg = 'La Paz';
      else if (t.includes('tarija')     || t.includes('chapaico'))reg = 'Tarija';
      else if (t.includes('cochabamba'))                           reg = 'Cochabamba';
      let fecha = 'Próximos 7 días';
      if      (t.includes('viernes')) fecha = 'Este viernes';
      else if (t.includes('mañana'))  fecha = 'Mañana';
      else if (t.includes('semana'))  fecha = 'Esta semana';
      const tareas = esVideo
        ? ['Redactar script 15-30s', 'Grabación con luz natural', 'Edición + subtítulos', 'Publicar y programar']
        : ['Definir concepto creativo', 'Producir piezas gráficas', 'Redactar copies', 'Validar con founder'];
      setBriefOutput({
        objetivo:    esVideo ? `Producir video de alto impacto para ${reg}` : `Campaña de contenido creativo para ${reg}`,
        tareas,
        responsable: 'Equipo Creativo',
        entregable:  esVideo ? 'Video TikTok/Reel publicado' : 'Campaña lista para lanzar',
        calendario:  fecha,
        prioridad:   esUrgente ? 'Alta 🔴' : 'Normal 🟡',
      });
      setBriefChecklist([
        { id: 1, texto: 'Brief aprobado por founder',                   done: false },
        { id: 2, texto: esVideo ? 'Script validado' : 'Concepto OK',    done: false },
        { id: 3, texto: esVideo ? 'Grabación lista'  : 'Piezas listas', done: false },
        { id: 4, texto: 'Publicación programada',                        done: false },
      ]);
      setBriefLoading(false);
    }, 1500);
  };

  /* ── handleGenerar: simulación IA + progresión Mentor ── */
  const handleGenerar = () => {
    if (isLoading) return;
    const finalPrompt = promptInput.trim() || `Campaña digital con identidad ${region} para redes sociales`;
    setPromptInput(finalPrompt);
    setIsLoading(true);
    setOutputContent('');

    setTimeout(() => {
      const data = REGION_DATA[region];
      setOutputContent(data.copy);
      setMetrics(data.metrics);
      setMentorTip(data.tip);
      setMoodboard(data.moodboard);

      // ── Progresión Mentor IA ──
      const xpGanado = 50 + Math.floor(Math.random() * 30);
      setIaXP((prev) => prev + xpGanado);
      const nuevasGen = generaciones + 1;
      setGeneraciones(nuevasGen);
      // desbloquear badges según umbral
      BADGES_CONFIG.forEach((b) => {
        if (nuevasGen === b.at) {
          setBadgesDesbloqueadas((prev) =>
            prev.find((x) => x.id === b.id) ? prev : [...prev, b]
          );
          setNuevaBadge(b);
          setTimeout(() => setNuevaBadge(null), 3000);
        }
      });

      setIsLoading(false);
    }, 1500);
  };

  /* ── Precarga de idea rápida en el textarea ── */
  const handleAccionRapida = (label) => {
    setOutputContent('');
    setPromptInput(IDEAS_RAPIDAS[label]);
  };

  /* Nivel IA calculado desde generaciones */
  const iaLevel = Math.floor(generaciones / 3) + 1;
  const xpParaSiguienteNivel = iaLevel * 150;
  const xpEnNivelActual = iaXP % xpParaSiguienteNivel;

  /* métricas como array para el render */
  const metricItems = [
    { label: 'Claridad',          pct: metrics.claridad,     bar: 'bg-[#2A9D87]', txt: 'text-[#3AC0A6]' },
    { label: 'Contexto Regional', pct: metrics.contexto,     bar: 'bg-[#3AC0A6]', txt: 'text-[#3AC0A6]' },
    { label: 'Originalidad',      pct: metrics.originalidad, bar: 'bg-[#7C4DFF]', txt: 'text-[#7C4DFF]' },
  ];

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
        <div className="flex items-center space-x-3 flex-shrink-0">

          {/* Botón Bloqueo Creativo */}
          <button
            onClick={() => setBloqueado(true)}
            className="flex items-center space-x-1.5 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-500/30 hover:border-orange-400/60 transition group"
          >
            <span className="text-sm group-hover:animate-bounce">🧱</span>
            <span>Bloqueo Creativo</span>
          </button>

          {/* Estado dinámico */}
          <span className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition ${
            bloqueado
              ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              : 'bg-green-500/20 text-green-400 border-green-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${bloqueado ? 'bg-orange-400' : 'bg-green-400 animate-pulse'}`} />
            <span>{bloqueado ? 'Bloqueado' : 'Inspirado'}</span>
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

          {/* Header + tabs de modo */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Mic size={20} className="text-white" />
              <h2 className="text-lg font-extrabold text-white leading-tight">
                Brief<br />Inteligente
              </h2>
            </div>
            <div className="flex rounded-xl overflow-hidden border border-white/10 text-[10px] font-bold">
              <button
                onClick={() => setBriefMode('live')}
                className={`px-2.5 py-1.5 transition ${briefMode === 'live' ? 'bg-[#2A9D87] text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
              >● En Vivo</button>
              <button
                onClick={() => setBriefMode('procesar')}
                className={`px-2.5 py-1.5 transition ${briefMode === 'procesar' ? 'bg-[#2A9D87] text-white' : 'bg-white/5 text-gray-500 hover:text-gray-300'}`}
              >🧠 Procesar</button>
            </div>
          </div>

          {/* ── MODO: En Vivo ── */}
          {briefMode === 'live' && (
            <>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-gray-500 font-medium tracking-wide">09:41 AM — Transcripción</p>
                  <span className="flex space-x-0.5 items-end">
                    {[6, 9, 7].map((h, i) => (
                      <span key={i} className="w-0.5 bg-[#3AC0A6] rounded-full animate-bounce"
                        style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </span>
                </div>
                <p className="text-sm text-gray-300 italic leading-relaxed transition-opacity duration-300"
                  style={{ opacity: transcShow ? 1 : 0 }}>
                  {TRANSCRIPCIONES[transcIdx]}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-bold text-[#3AC0A6] uppercase tracking-widest">Objetivos Detectados</p>
                  <span className="text-[9px] text-gray-500 font-medium">
                    {activeObjectives.filter((o) => o.sel).length}/{activeObjectives.length} activos
                  </span>
                </div>
                <div className="space-y-2">
                  {activeObjectives.map((obj) => (
                    <button key={obj.id} onClick={() => toggleObjective(obj.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-sm transition ${
                        obj.sel ? 'bg-[#2A9D87]/15 border border-[#2A9D87]/40 text-white'
                               : 'bg-white/5 border border-white/5 text-gray-400 hover:border-white/15'}`}
                    >
                      {obj.sel ? <CheckCircle size={16} className="text-[#3AC0A6] flex-shrink-0" />
                               : <Circle      size={16} className="text-gray-600 flex-shrink-0" />}
                      <span className={`font-medium text-sm leading-snug flex-1 ${!obj.sel ? 'line-through opacity-40' : ''}`}>
                        {obj.label}
                      </span>
                      {obj.sel && <span className="text-[9px] font-bold text-[#3AC0A6] bg-[#3AC0A6]/10 px-1.5 py-0.5 rounded-full flex-shrink-0">✓</span>}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── MODO: Procesar Brief Inteligente ── */}
          {briefMode === 'procesar' && (
            <div className="flex flex-col space-y-3 flex-1">
              <p className="text-[10px] text-gray-500 leading-relaxed">
                Pega un audio transcrito, nota desordenada o mensaje de WhatsApp. Cuate lo convierte en un brief estructurado.
              </p>

              {/* Textarea de entrada */}
              <textarea
                value={briefInput}
                onChange={(e) => { setBriefInput(e.target.value); setBriefOutput(null); }}
                placeholder={'Ej: "necesito que hagas un video para que vendamos más cositas en santa cruz para el viernes, algo rápido y viral con nuestro producto..."'}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-gray-200 placeholder-gray-600 focus:outline-none focus:border-[#3AC0A6]/40 resize-none transition leading-relaxed"
              />

              <button
                onClick={procesarBrief}
                disabled={briefLoading || !briefInput.trim()}
                className="flex items-center justify-center space-x-2 bg-[#2A9D87] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#23897A] transition disabled:opacity-40"
              >
                {briefLoading
                  ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Procesando...</span></>
                  : <><Wand2 size={13} /><span>🧠 Procesar con IA</span></>
                }
              </button>

              {/* Output estructurado */}
              {briefOutput && !briefLoading && (
                <div className="bg-white/5 border border-[#3AC0A6]/20 rounded-xl p-3 space-y-3 overflow-y-auto flex-1">
                  <div className="flex items-center space-x-1.5 pb-2 border-b border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3AC0A6]" />
                    <span className="text-[9px] font-bold text-[#3AC0A6] uppercase tracking-widest">Brief Generado</span>
                  </div>

                  {/* Campos del brief */}
                  {[
                    { icon: '🎯', key: 'Objetivo',    val: briefOutput.objetivo    },
                    { icon: '📦', key: 'Entregable',  val: briefOutput.entregable  },
                    { icon: '👤', key: 'Responsable', val: briefOutput.responsable },
                    { icon: '📅', key: 'Calendario',  val: briefOutput.calendario  },
                    { icon: '⚡', key: 'Prioridad',   val: briefOutput.prioridad   },
                  ].map(({ icon, key, val }) => (
                    <div key={key} className="flex items-start space-x-2">
                      <span className="text-sm flex-shrink-0">{icon}</span>
                      <div>
                        <p className="text-[9px] font-bold text-gray-500 uppercase">{key}</p>
                        <p className="text-[11px] text-gray-200 font-medium">{val}</p>
                      </div>
                    </div>
                  ))}

                  {/* Tareas */}
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase mb-1.5">📋 Tareas</p>
                    <ul className="space-y-1">
                      {briefOutput.tareas.map((t, i) => (
                        <li key={i} className="flex items-center space-x-1.5 text-[11px] text-gray-300">
                          <span className="w-1 h-1 rounded-full bg-[#3AC0A6] flex-shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Checklist interactivo */}
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase mb-1.5">
                      ✅ Checklist ({briefChecklist.filter(c => c.done).length}/{briefChecklist.length})
                    </p>
                    <div className="space-y-1.5">
                      {briefChecklist.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => toggleBriefCheck(item.id)}
                          className={`w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-left transition ${
                            item.done ? 'bg-[#2A9D87]/15 border border-[#2A9D87]/30' : 'bg-white/5 border border-white/5 hover:border-white/15'}`}
                        >
                          {item.done
                            ? <CheckCircle size={13} className="text-[#3AC0A6] flex-shrink-0" />
                            : <Circle      size={13} className="text-gray-600 flex-shrink-0" />}
                          <span className={`text-[11px] font-medium ${item.done ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                            {item.texto}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Spacer empuja las cards al fondo solo en modo live */}
          {briefMode === 'live' && <div className="flex-1" />}

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
        </div>{/* ── fin Col 1 ── */}

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
              <p className="text-sm text-gray-400 mt-0.5">
                {isLoading ? '⚡ Cuate está pensando...' : 'Generando ideas de alto impacto'}
              </p>
            </div>
          </div>

          {/* ── Área central: loading / output / textarea ── */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="relative flex-1 min-h-[200px]">

              {/* ESTADO: cargando */}
              {isLoading && (
                <div className="w-full min-h-[200px] h-full bg-white/5 border border-[#3AC0A6]/30 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4">
                  <div className="flex space-x-1.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-[#3AC0A6] rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-[#3AC0A6] font-bold animate-pulse">
                    Cuate está pensando en modo {region}...
                  </p>
                  <p className="text-[10px] text-gray-500">Analizando modismos regionales bolivianos</p>
                </div>
              )}

              {/* ESTADO: output generado */}
              {!isLoading && outputContent && (
                <div className="w-full min-h-[200px] h-full bg-white/5 border border-[#3AC0A6]/20 rounded-2xl p-4 overflow-y-auto">
                  {/* Badge de región */}
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-[#3AC0A6]" />
                      <span className="text-[10px] font-bold text-[#3AC0A6] uppercase tracking-widest">
                        Generado por Cuate IA
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-gradient-to-r from-[#2A9D87] to-[#7C4DFF] text-white px-2.5 py-1 rounded-full">
                      Región: {region}
                    </span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                    {outputContent}
                  </p>
                  <button
                    onClick={() => { setOutputContent(''); setPromptInput(''); }}
                    className="mt-4 flex items-center space-x-1.5 text-gray-600 hover:text-gray-300 text-xs transition"
                  >
                    <RefreshCw size={11} />
                    <span>Limpiar y escribir nueva idea</span>
                  </button>
                </div>
              )}

              {/* ESTADO: textarea (vacío o con texto) */}
              {!isLoading && !outputContent && (
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={`Cambiaste de región. Por favor, haz clic en Generar para actualizar el contenido con voz ${region}.`}
                  className="w-full h-full min-h-[200px] bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#3AC0A6]/40 resize-none transition leading-relaxed"
                />
              )}

              {/* Botón Generar — fijo en la esquina inferior derecha del área */}
              {!isLoading && (
                <button
                  onClick={handleGenerar}
                  className={`absolute bottom-4 right-4 flex items-center space-x-2 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow-lg ${
                    outputContent
                      ? 'bg-[#7C4DFF] hover:opacity-90 shadow-[#7C4DFF]/30'
                      : 'bg-[#2A9D87] hover:bg-[#23897A] shadow-[#2A9D87]/30'
                  }`}
                >
                  {outputContent ? <Sparkles size={14} /> : <Send size={14} />}
                  <span>{outputContent ? 'Re-generar' : 'Generar'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Botones de acción rápida */}
          <div className="flex flex-wrap gap-2 justify-center">
            {ACCIONES.map(({ label, icon: Icon }) => (
              <button
                key={label}
                onClick={() => handleAccionRapida(label)}
                className="flex items-center space-x-2 bg-white/5 border border-white/10 text-gray-300 px-4 py-2 rounded-full text-xs font-medium hover:bg-white/10 hover:text-white hover:border-white/20 transition"
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Selector de lenguaje regional */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 font-medium">Lenguaje Regional:</span>
              <div className="flex space-x-1.5">
                {LENGUAJES.map((l) => (
                  <button
                    key={l}
                    onClick={() => setRegion(l)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      region === l
                        ? 'bg-[#2A9D87] text-white shadow-sm shadow-[#2A9D87]/40'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <span className="text-xs text-[#3AC0A6] font-semibold animate-pulse">
              {isLoading ? '⚡ Procesando...' : 'Cuate está escuchando'}
            </span>
          </div>
        </div>

        {/* ══════════════════════════
            COL 3 — Mentor IA
            ══════════════════════════ */}
        <div className="flex flex-col space-y-5">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings size={18} className="text-gray-300" />
              <h2 className="text-lg font-extrabold text-white">Mentor IA</h2>
            </div>
            {outputContent && (
              <span className="text-[9px] font-bold text-[#3AC0A6] bg-[#3AC0A6]/10 px-2 py-1 rounded-full border border-[#3AC0A6]/20 animate-pulse">
                ● Actualizado
              </span>
            )}
          </div>

          {/* ── Nivel IA + XP ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2A9D87] to-[#7C4DFF] flex items-center justify-center text-xs font-black text-white">
                  {iaLevel}
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white leading-none">Nivel IA</p>
                  <p className="text-[9px] text-gray-500 mt-0.5">{generaciones} generaciones</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-[#3AC0A6] tabular-nums">{iaXP} XP</p>
                <p className="text-[9px] text-gray-600">meta: {xpParaSiguienteNivel} XP</p>
              </div>
            </div>
            {/* Barra de XP */}
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2A9D87] to-[#7C4DFF] transition-all duration-700"
                style={{ width: `${Math.min((xpEnNivelActual / xpParaSiguienteNivel) * 100, 100)}%` }}
              />
            </div>
            {/* Badges desbloqueadas */}
            <div className="space-y-1.5">
              <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">Insignias</p>
              <div className="flex flex-wrap gap-1.5">
                {BADGES_CONFIG.map((b) => {
                  const unlocked = badgesDesbloqueadas.find((u) => u.id === b.id);
                  return (
                    <div
                      key={b.id}
                      title={b.desc}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition-all duration-500 ${
                        unlocked
                          ? 'bg-[#2A9D87]/20 border-[#2A9D87]/40 text-[#3AC0A6]'
                          : 'bg-white/5 border-white/5 text-gray-700'
                      }`}
                    >
                      <span>{b.emoji}</span>
                      <span>{b.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Calidad de prompts — barras enlazadas a estado `metrics` */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Calidad de Prompts
              </p>
              {outputContent && (
                <span className="text-[9px] font-medium text-gray-600">
                  Modo: {region}
                </span>
              )}
            </div>
            {metricItems.map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                  <span className={`text-xs font-black tabular-nums ${item.txt}`}>
                    {item.pct}%
                  </span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${item.bar} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tip de mentoría — dinámico según región */}
          <div className="bg-red-900/20 border border-red-500/20 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-bold text-red-400">Tip de Mentoría</p>
            <p className="text-xs text-gray-300 leading-relaxed transition-all duration-500">
              "{mentorTip}"
            </p>
          </div>

          {/* Moodboard sugerido — dinámico por región */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Moodboard Sugerido
              </p>
              <span className="text-[9px] text-gray-600 font-medium">
                Región: {region}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moodboard.map((src, i) => (
                <div
                  key={`${region}-${i}`}
                  className="h-20 rounded-xl overflow-hidden border border-white/5 hover:border-[#3AC0A6]/30 transition cursor-pointer"
                >
                  <img src={src} alt="moodboard" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ════ Toast — Badge desbloqueada ════ */}
      {nuevaBadge && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-3 bg-[#0D1B3E] border border-[#2A9D87]/50 rounded-2xl px-5 py-3.5 shadow-2xl shadow-[#2A9D87]/20 animate-bounce">
          <span className="text-2xl">{nuevaBadge.emoji}</span>
          <div>
            <p className="text-xs font-black text-[#3AC0A6] leading-none">¡Insignia desbloqueada!</p>
            <p className="text-[11px] text-white font-bold mt-0.5">{nuevaBadge.label}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{nuevaBadge.desc}</p>
          </div>
          <Sparkles size={16} className="text-[#3AC0A6]" />
        </div>
      )}

      {/* ════════════════════════════════
          MODAL — Bloqueo Creativo
          ════════════════════════════════ */}
      {bloqueado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6"
             style={{ background: 'rgba(10,19,41,0.92)', backdropFilter: 'blur(6px)' }}>
          <div className="w-full max-w-lg bg-[#0D1B3E] border border-orange-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/30">

            {/* Header del modal */}
            <div className="px-7 pt-7 pb-5 border-b border-white/5">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {/* Ícono animado */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                    <div className="relative w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-2xl">
                      🧱
                    </div>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-white leading-tight">
                      Modo Bloqueo Creativo
                    </h2>
                    <p className="text-xs text-orange-400 mt-0.5 font-medium">
                      Métricas pausadas · Presión desactivada
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setBloqueado(false)}
                  className="text-gray-600 hover:text-gray-300 text-xl leading-none transition mt-1"
                >✕</button>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mt-4">
                Está bien tener momentos de bloqueo. <span className="text-white font-semibold">Todos los grandes creativos los tienen.</span> Aquí tienes recursos para retomar tu flujo sin presión.
              </p>
            </div>

            {/* Grid de sugerencias */}
            <div className="p-6 grid grid-cols-2 gap-3">

              {/* 1 — Pausa Activa */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-orange-500/30 transition cursor-pointer group">
                <div className="text-2xl mb-2">🧘</div>
                <p className="text-xs font-extrabold text-white mb-1">Pausa Activa</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Tómate 5 minutos. El mejor contenido nace del descanso. Respira, camina, vuelve fresco.
                </p>
              </div>

              {/* 2 — Idea Rescate */}
              <button
                onClick={() => {
                  setBloqueado(false);
                  setPromptInput('¿Y si cambias el formato? Prueba contar el error más grande de una startup boliviana en 15 segundos...');
                  setOutputContent('');
                }}
                className="bg-[#2A9D87]/10 border border-[#2A9D87]/30 rounded-2xl p-4 text-left hover:border-[#3AC0A6]/60 transition group"
              >
                <div className="text-2xl mb-2">💡</div>
                <p className="text-xs font-extrabold text-white mb-1">Idea Rescate</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Cuate precarga una idea base para desbloquearte. <span className="text-[#3AC0A6] font-semibold">Clic para activar →</span>
                </p>
              </button>

              {/* 3 — Pedir Apoyo */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-purple-500/30 transition cursor-pointer">
                <div className="text-2xl mb-2">🤝</div>
                <p className="text-xs font-extrabold text-white mb-1">Pedir Apoyo</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Tu equipo puede co-crear contigo. Activa el modo colaborativo para compartir el brief.
                </p>
              </div>

              {/* 4 — Enfoque Mínimo */}
              <button
                onClick={() => {
                  setBloqueado(false);
                  setPromptInput('Solo la primera oración. Olvida el brief perfecto:');
                  setOutputContent('');
                }}
                className="bg-[#7C4DFF]/10 border border-[#7C4DFF]/30 rounded-2xl p-4 text-left hover:border-[#7C4DFF]/60 transition"
              >
                <div className="text-2xl mb-2">🎯</div>
                <p className="text-xs font-extrabold text-white mb-1">Enfoque Mínimo</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Escribe solo la primera oración. Cuate construye el resto. <span className="text-[#7C4DFF] font-semibold">Clic para empezar →</span>
                </p>
              </button>
            </div>

            {/* Footer del modal */}
            <div className="px-6 pb-6 space-y-3">
              {/* Barra de progreso "pausa" */}
              <div className="flex items-center space-x-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3">
                <span className="text-sm">⏸</span>
                <div className="flex-1">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Presión de entrega</span>
                    <span className="text-orange-400 font-bold">PAUSADA</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full">
                    <div className="bg-orange-500/40 h-full rounded-full w-2/3" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setBloqueado(false)}
                className="w-full bg-gradient-to-r from-[#2A9D87] to-[#7C4DFF] text-white font-extrabold py-3.5 rounded-xl text-sm hover:opacity-90 transition shadow-lg flex items-center justify-center space-x-2"
              >
                <span>⚡</span>
                <span>Retomar el Flujo Creativo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
