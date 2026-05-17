import React, { useState, useEffect } from 'react';
import {
  Trophy, Target, Lock, Sparkles, Zap, Heart, Brain, Moon,
  TrendingUp, Star, Flame, Coffee, ChevronRight,
  CheckCircle2, Users, Layers, Video, Palette, Rocket, Crown,
  ArrowUpRight, Activity, Shield, PartyPopper, BookOpen, X,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════════════
   PALETA
   ══════════════════════════════════════════════════════════════ */
const C = {
  primary: '#2A9D87',
  primaryLight: '#3AC0A6',
  navy: '#1C3581',
  navyDark: '#0D1B3E',
  accent: '#F4A261',
  warm: '#E76F51',
};

const ESTADOS = [
  { id: 'concentrado', label: 'Concentrado', icon: Brain,    color: C.navy,    mood: 'focused' },
  { id: 'inspirado',   label: 'Inspirado',   icon: Sparkles, color: C.primary, mood: 'happy'   },
  { id: 'saturado',    label: 'Saturado',    icon: Flame,    color: C.warm,    mood: 'tired'   },
  { id: 'colaborar',   label: 'Colaborar',   icon: Users,    color: C.navy,    mood: 'love'    },
  { id: 'pausa',       label: 'En Pausa',    icon: Coffee,   color: '#6B7280', mood: 'sleep'   },
];

const ENERGIA_OPTS = [
  { id: 'energia',   icon: Zap,   label: 'Energía',   value: 85, color: C.accent  },
  { id: 'bienestar', icon: Heart, label: 'Bienestar', value: 72, color: C.warm    },
  { id: 'foco',      icon: Brain, label: 'Foco',      value: 90, color: C.primary },
  { id: 'descanso',  icon: Moon,  label: 'Descanso',  value: 65, color: C.navy    },
];

const CUATE_BARS = [
  { label: 'Constancia',             val: 75, icon: Flame    },
  { label: 'Cumplimiento Saludable', val: 60, icon: Shield   },
  { label: 'Colaboración',           val: 85, icon: Users    },
  { label: 'Aprendizaje',            val: 90, icon: BookOpen },
];

const HITOS = [
  { label: 'Primer Reel\naprobado',    sub: '15 Mar 2024',  type: 'done',     icon: Video,   xp: '+50 XP'  },
  { label: '100 diseños\ncompletados', sub: '02 May 2024',  type: 'done',     icon: Palette, xp: '+200 XP' },
  { label: 'Campaña\nViral',           sub: '18 Sep 2024',  type: 'done',     icon: Rocket,  xp: '+500 XP' },
  { label: 'Certificación\nSenior',    sub: 'En curso 67%', type: 'progress', icon: Target  },
  { label: 'Dirección\nde Arte',       sub: 'Próximamente', type: 'locked',   icon: Crown   },
];

const HABILIDADES = [
  { name: 'Edición Audiovisual', level: 8, max: 10, trend: '+12%' },
  { name: 'IA Creativa',         level: 6, max: 10, trend: '+24%' },
  { name: 'Storytelling',        level: 7, max: 10, trend: '+8%'  },
  { name: 'Branding',            level: 5, max: 10, trend: '+5%'  },
];

const RECONOCIMIENTOS = [
  { from: 'Lucía', emoji: '🔥', msg: 'Edición increíble en el reel', time: 'hace 2h' },
  { from: 'Diego', emoji: '⭐', msg: 'Tu copy salvó la campaña',     time: 'hace 5h' },
  { from: 'Sofía', emoji: '🚀', msg: 'Súper colaboración',            time: 'ayer'   },
];

const TOOLS = [
  { label: 'N',  bg: 'bg-black',        color: 'text-white',     name: 'Notion'   },
  { label: 'T',  bg: 'bg-blue-50',      color: 'text-blue-600',  name: 'Trello'   },
  { label: 'F',  bg: 'bg-purple-50',    color: 'text-purple-600',name: 'Figma'    },
  { label: 'G',  bg: 'bg-green-50',     color: 'text-green-600', name: 'Drive'    },
  { label: '💬', bg: 'bg-[#25D366]/10', color: 'text-[#25D366]', name: 'WhatsApp' },
  { label: 'in', bg: 'bg-sky-50',       color: 'text-sky-600',   name: 'LinkedIn' },
];

const MOOD_LABEL = {
  happy: 'Feliz',
  focused: 'Concentrado',
  tired: 'Cansado',
  love: 'Cariñoso',
  sleep: 'Durmiendo',
};

/* ══════════════════════════════════════════════════════════════
   MASCOTA SVG
   ══════════════════════════════════════════════════════════════ */
function Mascota({ mood = 'happy', size = 180 }) {
  const expressions = {
    happy:   { mouth: 'M 40 72 Q 50 82 60 72', blush: 0.6, tilt: 0 },
    focused: { mouth: 'M 43 75 L 57 75',       blush: 0.3, tilt: 0 },
    tired:   { mouth: 'M 42 76 Q 50 70 58 76', blush: 0.4, tilt: -3},
    love:    { mouth: 'M 40 72 Q 50 84 60 72', blush: 0.9, tilt: 0 },
    sleep:   { mouth: 'M 45 74 Q 50 78 55 74', blush: 0.3, tilt: 2 },
  };
  const exp = expressions[mood] || expressions.happy;

  return (
    <div className="relative animate-mascota-float" style={{ width: size, height: size * 1.15 }}>
      <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl"
        style={{ transform: `rotate(${exp.tilt}deg)`, transition: 'transform 0.5s ease' }}>
        <defs>
          <radialGradient id="bodyGrad" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="#4DD4B8" />
            <stop offset="100%" stopColor="#2A9D87" />
          </radialGradient>
          <radialGradient id="faceGrad" cx="0.4" cy="0.3">
            <stop offset="0%" stopColor="#3AC0A6" />
            <stop offset="100%" stopColor="#1E8A75" />
          </radialGradient>
          <linearGradient id="capGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2952B8" />
            <stop offset="100%" stopColor="#1C3581" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="116" rx="26" ry="4" fill="rgba(0,0,0,0.18)" className="animate-mascota-shadow"/>
        <path d="M 22 86 Q 35 96 50 96 Q 65 96 78 86 L 82 116 L 18 116 Z" fill={C.navy}/>
        <path d="M 22 86 Q 35 96 50 96 Q 65 96 78 86 L 80 100 L 20 100 Z" fill={C.navyDark} opacity="0.4"/>
        <circle cx="50" cy="100" r="1.5" fill={C.primaryLight}/>
        <circle cx="50" cy="108" r="1.5" fill={C.primaryLight}/>
        <circle cx="50" cy="60" r="34" fill="url(#bodyGrad)"/>
        <circle cx="50" cy="58" r="28" fill="url(#faceGrad)"/>
        <ellipse cx="40" cy="42" rx="8" ry="5" fill="white" opacity="0.25"/>
        <path d="M 26 38 Q 26 26 50 24 Q 74 26 74 38 L 74 46 L 26 46 Z" fill="url(#capGrad)"/>
        <rect x="20" y="44" width="60" height="8" fill={C.navyDark} rx="3"/>
        <text x="50" y="40" fontSize="9" fill={C.primaryLight} fontWeight="900" textAnchor="middle">CC</text>

        {mood === 'happy' && (
          <g className="animate-mascota-blink">
            <ellipse cx="40" cy="62" rx="6" ry="7" fill={C.navyDark}/>
            <ellipse cx="60" cy="62" rx="6" ry="7" fill={C.navyDark}/>
            <circle cx="42" cy="60" r="2.5" fill="white"/>
            <circle cx="62" cy="60" r="2.5" fill="white"/>
            <circle cx="41" cy="61" r="1" fill="white" opacity="0.8"/>
            <circle cx="61" cy="61" r="1" fill="white" opacity="0.8"/>
          </g>
        )}
        {mood === 'focused' && (
          <g>
            <ellipse cx="40" cy="62" rx="4" ry="5" fill={C.navyDark}/>
            <ellipse cx="60" cy="62" rx="4" ry="5" fill={C.navyDark}/>
            <circle cx="40" cy="60" r="1.5" fill="white"/>
            <circle cx="60" cy="60" r="1.5" fill="white"/>
            <path d="M 34 55 L 44 53" stroke={C.navyDark} strokeWidth="2" strokeLinecap="round"/>
            <path d="M 56 53 L 66 55" stroke={C.navyDark} strokeWidth="2" strokeLinecap="round"/>
            <circle cx="40" cy="62" r="8" stroke={C.navyDark} strokeWidth="1.5" fill="rgba(255,255,255,0.15)"/>
            <circle cx="60" cy="62" r="8" stroke={C.navyDark} strokeWidth="1.5" fill="rgba(255,255,255,0.15)"/>
            <line x1="48" y1="62" x2="52" y2="62" stroke={C.navyDark} strokeWidth="1.5"/>
          </g>
        )}
        {mood === 'tired' && (
          <g>
            <path d="M 34 62 Q 40 66 46 62" stroke={C.navyDark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 54 62 Q 60 66 66 62" stroke={C.navyDark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            <path d="M 35 67 Q 40 69 45 67" stroke={C.warm} strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M 55 67 Q 60 69 65 67" stroke={C.warm} strokeWidth="1" fill="none" opacity="0.5"/>
            <g className="animate-sweat-drop">
              <ellipse cx="72" cy="50" rx="3" ry="4.5" fill="#5BB4E5"/>
              <ellipse cx="71" cy="48" rx="1" ry="1.5" fill="white" opacity="0.6"/>
            </g>
          </g>
        )}
        {mood === 'love' && (
          <>
            <g className="animate-mascota-loveeyes">
              <path d="M 40 58 C 36 54, 32 58, 40 64 C 48 58, 44 54, 40 58 Z" fill="#E76F51"/>
              <path d="M 60 58 C 56 54, 52 58, 60 64 C 68 58, 64 54, 60 58 Z" fill="#E76F51"/>
              <circle cx="38" cy="58" r="1" fill="white" opacity="0.8"/>
              <circle cx="58" cy="58" r="1" fill="white" opacity="0.8"/>
            </g>
            <g className="animate-floating-hearts">
              <text x="14" y="40" fontSize="10" fill={C.warm}>💕</text>
              <text x="78" y="35" fontSize="9" fill={C.warm}>♡</text>
              <text x="10" y="68" fontSize="7" fill={C.warm}>♡</text>
            </g>
          </>
        )}
        {mood === 'sleep' && (
          <>
            <g>
              <path d="M 34 62 Q 40 58 46 62" stroke={C.navyDark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <path d="M 54 62 Q 60 58 66 62" stroke={C.navyDark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </g>
            <g className="animate-zzz">
              <text x="72" y="35" fontSize="8" fill={C.navyDark} fontWeight="900" opacity="0.7">z</text>
              <text x="78" y="28" fontSize="10" fill={C.navyDark} fontWeight="900" opacity="0.8">Z</text>
              <text x="85" y="20" fontSize="12" fill={C.navyDark} fontWeight="900">Z</text>
            </g>
          </>
        )}
        <path d={exp.mouth} stroke={C.navyDark} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {mood === 'happy' && <ellipse cx="50" cy="76" rx="3" ry="1.5" fill="#E76F51" opacity="0.7"/>}
        <circle cx="32" cy="68" r="5" fill={C.accent} opacity={exp.blush} className="animate-mascota-cheeks"/>
        <circle cx="68" cy="68" r="5" fill={C.accent} opacity={exp.blush} className="animate-mascota-cheeks"/>
        <g className="animate-mascota-sparkle">
          <circle cx="18" cy="50" r="1.5" fill={C.accent}/>
          <circle cx="82" cy="55" r="1" fill={C.accent}/>
          <circle cx="85" cy="75" r="1.5" fill="#F4D35E"/>
          <circle cx="15" cy="75" r="1" fill="#F4D35E"/>
        </g>
      </svg>
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#3AC0A6] rounded-full blur-3xl opacity-20 animate-pulse-slow"/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUB-PANTALLA 1: Progreso de la Semana
   ══════════════════════════════════════════════════════════════ */
function SubPantallaProgreso({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(13,27,62,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-modal-in">
        {/* Header mini */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#3AC0A6] to-[#1C3581] flex items-center justify-center">
              <span className="text-white text-[10px] font-black">CC</span>
            </div>
            <span className="text-xs font-black text-gray-800">El Combo Cuate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Dashboard</span>
            <button onClick={onClose} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
              <X size={12} className="text-gray-500"/>
            </button>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-black text-gray-900 text-center mb-5">Tu Cuate Virtual · Progreso de la Semana</h3>

          <div className="flex items-center gap-6">
            {/* Mascota pequeña */}
            <div className="flex-shrink-0">
              <Mascota mood="happy" size={110}/>
            </div>

            {/* Barras */}
            <div className="flex-1 space-y-3">
              {CUATE_BARS.map((bar) => {
                const Icon = bar.icon;
                return (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="flex items-center gap-1 text-gray-600 font-semibold">
                        <Icon size={10} className="text-[#2A9D87]"/>{bar.label}
                      </span>
                      <span className="font-black text-gray-800">{bar.val}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#2A9D87] to-[#3AC0A6] rounded-full animate-bar-grow"
                        style={{ width: `${bar.val}%` }}/>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUB-PANTALLA 2: Evolución de nivel
   ══════════════════════════════════════════════════════════════ */
function SubPantallaEvolucion({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(13,27,62,0.85)', backdropFilter: 'blur(10px)' }}>
      <div className="w-full max-w-sm overflow-hidden animate-modal-in">
        {/* Header barra como en la imagen */}
        <div className="bg-[#0D1B3E] rounded-t-[2rem] flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#3AC0A6] to-[#1C3581] flex items-center justify-center">
              <span className="text-white text-[9px] font-black">CC</span>
            </div>
            <span className="text-xs font-bold text-white">El Combo Cuate</span>
          </div>
          <button onClick={onClose} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <X size={11} className="text-white"/>
          </button>
        </div>

        {/* Cuerpo con gradiente teal */}
        <div className="bg-gradient-to-b from-[#1E7A68] via-[#2A9D87] to-[#3AC0A6] p-8 flex flex-col items-center">
          {/* Confetti decorativo */}
          <div className="absolute pointer-events-none">
            {['🎉','✨','🌟','🎊','⭐'].map((e, i) => (
              <span key={i} className="absolute text-lg animate-confetti"
                style={{ left: `${10 + i * 18}%`, animationDelay: `${i * 0.2}s` }}>{e}</span>
            ))}
          </div>

          {/* Mascota evolucionada con headphones via emoji overlay */}
          <div className="relative mb-4">
            <Mascota mood="happy" size={160}/>
            {/* Headphones overlay */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl pointer-events-none select-none">🎧</div>
          </div>
        </div>

        <div className="bg-white rounded-b-[2rem] p-6 text-center">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">¡Tu Cuate ha evolucionado!</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium">Nivel 3 de Aprendizaje Desbloqueado</p>

          <button onClick={onClose}
            className="mt-5 flex items-center gap-2 bg-gradient-to-r from-[#2A9D87] to-[#1C3581] text-white text-sm font-bold px-6 py-3 rounded-2xl mx-auto shadow-lg hover:scale-105 transition">
            <span className="text-lg">🎓</span>
            +100 XP · Cuate-Core
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SUB-PANTALLA 3: Alerta bienestar / Mental Health
   ══════════════════════════════════════════════════════════════ */
function SubPantallaBienestar({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-[#F4A261] rounded-[2rem] shadow-2xl w-full max-w-xs overflow-hidden animate-modal-in">
        <div className="p-5">
          <div className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Mental health dashboard</div>
          <h3 className="text-base font-black text-white mb-4">El Combo Cuate</h3>

          <div className="flex items-start gap-3">
            {/* Mascota relajada con sillón emoji */}
            <div className="flex-shrink-0 relative">
              <Mascota mood="sleep" size={90}/>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-2xl">🛋️</span>
            </div>

            {/* Mensaje */}
            <div className="flex-1 bg-white rounded-2xl p-3 shadow-sm">
              <p className="text-xs text-gray-700 font-medium leading-relaxed">
                Te noté un poco saturado hoy, cuate. ¿Qué tal si hacemos una pausa creativa o delegamos una misión?
              </p>
              <div className="flex flex-col gap-2 mt-3">
                <button className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#F4A261] text-[#E76F51] text-xs font-bold py-2.5 rounded-xl hover:bg-[#FFF5EC] transition">
                  <Coffee size={13}/>
                  Pausa creativa
                </button>
                <button onClick={onClose} className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-600 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-50 transition">
                  <Users size={13}/>
                  Delegar misión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   GAUGE CIRCULAR
   ══════════════════════════════════════════════════════════════ */
function CircularGauge({ value, color, size = 80, label, icon: Icon, isActive, onClick }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <button onClick={onClick}
      className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-[#F0FAF8] to-[#E0F4EF] ring-2 ring-[#2A9D87] scale-105 shadow-lg shadow-[#2A9D87]/20'
          : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
      }`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle cx={size/2} cy={size/2} r={radius} stroke="#E5E7EB" strokeWidth="6" fill="none"/>
          <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth="6" fill="none"
            strokeLinecap="round" strokeDasharray={circumference}
            strokeDashoffset={isActive ? offset : circumference}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}/>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon size={20} style={{ color: isActive ? color : '#9CA3AF' }}
            className={isActive ? 'animate-bounce-soft' : ''}/>
          {isActive && <span className="text-[10px] font-black mt-0.5" style={{ color }}>{value}%</span>}
        </div>
      </div>
      <span className={`text-[11px] font-bold mt-2 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{label}</span>
    </button>
  );
}

function AnimatedCard({ children, delay = 0, className = '' }) {
  return (
    <div className={`opacity-0 animate-fade-in-up ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DASHBOARD PRINCIPAL
   ══════════════════════════════════════════════════════════════ */
export default function DashboardScreen() {
  const [estado, setEstado]   = useState('inspirado');
  const [energia, setEnergia] = useState('foco');
  const [xpAnim, setXpAnim]   = useState(0);
  const [pulseKey, setPulseKey] = useState(0);

  // Sub-pantallas de mascota
  const [subPantalla, setSubPantalla] = useState(null); // null | 'progreso' | 'evolucion' | 'bienestar'

  const currentMood = ESTADOS.find(e => e.id === estado)?.mood || 'happy';

  useEffect(() => {
    let raf;
    const target = 67;
    const start = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setXpAnim(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setPulseKey(k => k + 1), 4000);
    return () => clearInterval(i);
  }, []);

  return (
    /*
      CLAVE: ml-64 para dejar espacio al sidebar fixed de w-64.
      min-h-screen + w-full para cubrir el resto del espacio.
    */
    <div className="ml-64 min-h-screen w-[calc(100%-16rem)] bg-gradient-to-br from-[#F4F6F5] via-[#EEF6F4] to-[#E8F3F0] relative overflow-hidden">

      {/* Sub-pantallas como modales */}
      {subPantalla === 'progreso'   && <SubPantallaProgreso   onClose={() => setSubPantalla(null)}/>}
      {subPantalla === 'evolucion'  && <SubPantallaEvolucion  onClose={() => setSubPantalla(null)}/>}
      {subPantalla === 'bienestar'  && <SubPantallaBienestar  onClose={() => setSubPantalla(null)}/>}

      {/* Fondo decorativo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3AC0A6] rounded-full blur-3xl opacity-10 animate-blob"/>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#1C3581] rounded-full blur-3xl opacity-10 animate-blob-2"/>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#F4A261] rounded-full blur-3xl opacity-10 animate-blob-3"/>
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle, #1C3581 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}/>
      </div>

      <div className="relative z-10 p-6 lg:p-8 max-w-[1200px] mx-auto space-y-6">

        {/* ── HERO ── */}
        <AnimatedCard delay={0}>
          <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-xl shadow-gray-200/40 border border-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#3AC0A6]/20 to-transparent rounded-full"/>

            <div className="relative flex flex-col xl:flex-row justify-between items-start gap-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <svg className="absolute -inset-2 transform -rotate-90" width="92" height="92" viewBox="0 0 92 92">
                    <circle cx="46" cy="46" r="42" stroke="#E5E7EB" strokeWidth="3" fill="none"/>
                    <circle cx="46" cy="46" r="42" stroke="#2A9D87" strokeWidth="3" fill="none"
                      strokeLinecap="round" strokeDasharray={264}
                      strokeDashoffset={264 - (xpAnim/100) * 264}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(42,157,135,0.5))' }}/>
                  </svg>
                  <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#3AC0A6] to-[#1C3581] p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80"
                        alt="Mateo" className="w-full h-full object-cover"/>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#F4A261] to-[#E76F51] text-white text-[10px] font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg border-2 border-white animate-pulse-badge">
                    14
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Hola de nuevo,</p>
                  <h1 className="text-3xl xl:text-4xl font-black text-gray-900 leading-none tracking-tight">
                    Mateo <span className="inline-block animate-wave origin-bottom-right">👋</span>
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600 font-medium">Editor Audiovisual</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"/>
                    <span className="text-sm font-bold text-[#2A9D87] flex items-center gap-1">
                      <Star size={13} fill="currentColor"/> Nivel 14
                    </span>
                  </div>
                  <div className="mt-3 w-64">
                    <div className="flex justify-between text-[10px] font-bold mb-1.5">
                      <span className="text-gray-500">XP</span>
                      <span className="text-gray-700">7,420 / 11,000</span>
                    </div>
                    <div className="w-full bg-gray-200/70 h-2.5 rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-[#2A9D87] via-[#3AC0A6] to-[#F4A261] rounded-full relative"
                        style={{ width: `${xpAnim}%`, transition: 'width 0.1s linear' }}>
                        <div className="absolute inset-0 bg-white/30 animate-shimmer"/>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 font-medium">
                      <span className="text-[#2A9D87] font-bold">3,580 XP</span> para Nivel 15 · Dirección de Arte 🎬
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-auto">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  ¿Cómo te sientes hoy? <span className="text-[#2A9D87] normal-case font-bold">→ tu cuate cambia contigo</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {ESTADOS.map((e) => {
                    const Icon = e.icon;
                    const isActive = estado === e.id;
                    return (
                      <button key={e.id} onClick={() => setEstado(e.id)}
                        className={`group flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold border-2 transition-all duration-300 ${
                          isActive ? 'text-white border-transparent shadow-lg scale-105'
                                   : 'bg-white/70 border-gray-200 text-gray-600 hover:border-gray-300 hover:scale-105'
                        }`}
                        style={{
                          background: isActive ? `linear-gradient(135deg, ${e.color}, ${e.color}dd)` : undefined,
                          boxShadow: isActive ? `0 8px 20px -4px ${e.color}66` : undefined,
                        }}>
                        <Icon size={13} className={isActive ? 'animate-bounce-soft' : ''}/>
                        {e.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* ── FILA 2: MASCOTA + ENERGÍA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* MASCOTA */}
          <AnimatedCard delay={100} className="lg:col-span-4">
            <div className="bg-gradient-to-br from-[#1C3581] via-[#2952B8] to-[#1E7A68] rounded-[2rem] p-6 shadow-xl shadow-[#1C3581]/30 h-full relative overflow-hidden text-white">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="absolute bg-white rounded-full animate-twinkle"
                    style={{
                      width: Math.random() * 2 + 1, height: Math.random() * 2 + 1,
                      top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                    }}/>
                ))}
              </div>

              <div className="relative">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#3AC0A6]">Tu Cuate Virtual</p>
                    <h3 className="text-lg font-black mt-0.5">Pixel · Nivel 7</h3>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3AC0A6] animate-pulse"/>
                    {MOOD_LABEL[currentMood]}
                  </div>
                </div>

                {/* Mascota clickeable → abre sub-pantalla progreso */}
                <button
                  onClick={() => setSubPantalla('progreso')}
                  className="flex justify-center w-full my-3 relative h-[210px] items-center hover:scale-105 transition-transform cursor-pointer"
                  title="Ver progreso de la semana">
                  <Mascota mood={currentMood} size={180}/>
                  <span className="absolute bottom-2 right-2 bg-white/20 text-white text-[9px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                    Ver progreso →
                  </span>
                </button>

                {/* Tip contextual */}
                <div className="bg-white/10 backdrop-blur rounded-xl p-2.5 text-center mb-3">
                  <p className="text-[10px] text-white/90 font-medium">
                    {currentMood === 'happy'   && '✨ "¡Vamos! Hoy creamos magia, cuate"'}
                    {currentMood === 'focused' && '🎯 "Modo deep work activado. Sin distracciones"'}
                    {currentMood === 'tired'  && '☕ "Toma una pausa de 10 min. Te la mereces"'}
                    {currentMood === 'love'   && '💕 "Tu equipo te necesita hoy. ¡A colaborar!"'}
                    {currentMood === 'sleep'  && '🌙 "Tu IA pausó las métricas. Recupera energía"'}
                  </p>
                </div>

                {/* Barras cuate */}
                <div className="space-y-2.5 mt-4">
                  {CUATE_BARS.map((bar, i) => {
                    const Icon = bar.icon;
                    return (
                      <div key={bar.label} className="opacity-0 animate-fade-in-up"
                        style={{ animationDelay: `${300 + i * 80}ms`, animationFillMode: 'forwards' }}>
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="flex items-center gap-1.5 text-white/80 font-semibold">
                            <Icon size={11}/>{bar.label}
                          </span>
                          <span className="font-black text-white">{bar.val}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden relative">
                          <div className="h-full bg-gradient-to-r from-[#3AC0A6] to-[#F4A261] rounded-full relative"
                            style={{
                              width: `${bar.val}%`,
                              transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              transitionDelay: `${500 + i * 100}ms`,
                            }}>
                            <div key={`${pulseKey}-${i}`} className="absolute inset-0 bg-white/40 animate-shimmer-bar"/>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Botones sub-pantallas */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button onClick={() => setSubPantalla('evolucion')}
                    className="bg-white/10 hover:bg-white/20 transition text-white text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                    🏆 Evolución
                  </button>
                  <button onClick={() => setSubPantalla('bienestar')}
                    className="bg-[#F4A261]/20 hover:bg-[#F4A261]/30 transition text-[#F4A261] text-[10px] font-bold py-2 rounded-xl flex items-center justify-center gap-1">
                    💛 Bienestar
                  </button>
                </div>

                {/* Accesorios */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] mb-2">
                    <span className="text-white/60 font-bold uppercase tracking-wider">Accesorios</span>
                    <span className="text-[#3AC0A6] font-bold">3/12</span>
                  </div>
                  <div className="flex gap-1.5">
                    {['🎓', '⚡', '🎨', '🔒', '🔒'].map((e, i) => (
                      <div key={i} className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${
                        e === '🔒' ? 'bg-white/5 opacity-40' : 'bg-white/15 hover:scale-110 transition cursor-pointer'
                      }`}>
                        {e}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* COL DERECHA */}
          <div className="lg:col-span-8 space-y-5">

            <AnimatedCard delay={150}>
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-lg shadow-gray-200/40 border border-white">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                      <Activity size={18} className="text-[#2A9D87]"/>
                      Medidor de Energía y Bienestar
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">La IA detecta patrones y previene burnout antes de que ocurra</p>
                  </div>
                  <span className="hidden md:flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"/>
                    Estable
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {ENERGIA_OPTS.map((opt) => (
                    <CircularGauge key={opt.id}
                      value={opt.value} color={opt.color} label={opt.label} icon={opt.icon}
                      isActive={energia === opt.id} onClick={() => setEnergia(opt.id)}/>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 bg-gradient-to-r from-[#F0FAF8] to-[#E0F4EF] p-3 rounded-2xl border border-[#2A9D87]/20">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2A9D87] to-[#1C3581] flex items-center justify-center flex-shrink-0 animate-pulse-soft">
                    <Brain size={16} className="text-white"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-900">Tu Cuate IA detecta foco alto</p>
                    <p className="text-[11px] text-gray-600 truncate">Buen momento para misiones creativas complejas ✨</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400"/>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={250}>
              <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-5 shadow-lg shadow-gray-200/40 border border-white">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    Accesos Rápidos · Integraciones
                  </p>
                  <span className="text-[10px] font-bold text-[#2A9D87]">+ Conectar</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {TOOLS.map((t, i) => (
                    <button key={i}
                      className="group flex items-center gap-2 bg-white border border-gray-100 rounded-2xl px-3 py-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                      <div className={`w-8 h-8 ${t.bg} ${t.color} rounded-lg flex items-center justify-center text-sm font-black`}>
                        {t.label}
                      </div>
                      <span className="text-xs font-bold text-gray-700 pr-1">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* ── LÍNEA DE EVOLUCIÓN ── */}
        <AnimatedCard delay={300}>
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 shadow-lg shadow-gray-200/40 border border-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#3AC0A6]/10 to-transparent rounded-full blur-2xl"/>

            <div className="relative flex items-start justify-between mb-7 flex-wrap gap-3">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-[#2A9D87]"/>
                  Línea de Evolución Profesional
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Tu carrera construida automáticamente con cada misión completada</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gray-500">
                  <span className="text-[#2A9D87] text-base font-black">3</span>/5 hitos
                </span>
                <button onClick={() => setSubPantalla('evolucion')}
                  className="text-xs font-bold text-[#2A9D87] flex items-center gap-1 hover:gap-2 transition-all">
                  Ver evolución <ArrowUpRight size={13}/>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-7 left-7 right-7 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#2A9D87] via-[#3AC0A6] to-[#F4A261] animate-line-progress"/>
              </div>

              <div className="relative grid grid-cols-5 gap-2">
                {HITOS.map((hito, i) => {
                  const Icon = hito.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${500 + i * 120}ms`, animationFillMode: 'forwards' }}>
                      <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform hover:scale-110 cursor-pointer ${
                        hito.type === 'done' ? 'bg-gradient-to-br from-[#2A9D87] to-[#1E7A68] text-white shadow-xl shadow-[#2A9D87]/40'
                        : hito.type === 'progress' ? 'bg-white border-[3px] border-[#2A9D87] text-[#2A9D87]'
                        : 'bg-white border-2 border-dashed border-gray-300 text-gray-300'
                      }`}>
                        {hito.type === 'done' && (
                          <>
                            <Icon size={20}/>
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow">
                              <CheckCircle2 size={14} className="text-[#2A9D87]"/>
                            </div>
                          </>
                        )}
                        {hito.type === 'progress' && (
                          <>
                            <Icon size={20} className="animate-spin-slow"/>
                            <div className="absolute -inset-1 rounded-2xl border-2 border-[#2A9D87]/30 animate-ping-slow"/>
                          </>
                        )}
                        {hito.type === 'locked' && <Lock size={18}/>}
                      </div>

                      <p className={`text-[11px] font-black leading-tight whitespace-pre-line ${
                        hito.type === 'locked' ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {hito.label}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1 font-medium">{hito.sub}</p>
                      {hito.xp && (
                        <span className="mt-1.5 inline-flex items-center gap-0.5 bg-[#F4A261]/15 text-[#E76F51] text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          <Trophy size={8}/>{hito.xp}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* ── HABILIDADES + RECONOCIMIENTOS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          <AnimatedCard delay={400}>
            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-lg shadow-gray-200/40 border border-white h-full">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                    <Layers size={18} className="text-[#2A9D87]"/>
                    Árbol de Habilidades
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Verificadas por tus misiones reales</p>
                </div>
                <button className="text-xs font-bold text-[#2A9D87] hover:underline">Ver todas</button>
              </div>

              <div className="space-y-4">
                {HABILIDADES.map((skill, i) => (
                  <div key={skill.name} className="opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${600 + i * 80}ms`, animationFillMode: 'forwards' }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-gray-800">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                          {skill.trend}
                        </span>
                        <span className="text-xs font-black text-gray-700">
                          {skill.level}<span className="text-gray-400 font-medium">/{skill.max}</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(skill.max)].map((_, idx) => (
                        <div key={idx}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            idx < skill.level ? 'bg-gradient-to-r from-[#2A9D87] to-[#3AC0A6] shadow-sm' : 'bg-gray-100'
                          }`}
                          style={{ transitionDelay: `${700 + i * 80 + idx * 30}ms` }}/>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-5 flex items-center justify-center gap-2 bg-gradient-to-r from-[#1C3581] to-[#2952B8] text-white text-xs font-bold py-3 rounded-2xl hover:shadow-lg hover:shadow-[#1C3581]/40 transition-all group">
                <span className="w-5 h-5 bg-white text-[#1C3581] rounded font-black flex items-center justify-center text-[10px]">in</span>
                Exportar habilidades a LinkedIn
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"/>
              </button>
            </div>
          </AnimatedCard>

          <AnimatedCard delay={500}>
            <div className="bg-gradient-to-br from-[#F4A261]/10 via-white to-[#2A9D87]/10 rounded-[2rem] p-6 shadow-lg shadow-gray-200/40 border border-white h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 text-7xl opacity-5">🏆</div>

              <div className="relative flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                    <PartyPopper size={18} className="text-[#F4A261]"/>
                    Muro de Reconocimientos
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Tu equipo te valora ❤️</p>
                </div>
                <span className="bg-[#F4A261]/20 text-[#E76F51] text-[10px] font-black px-2 py-1 rounded-full">
                  +12 esta semana
                </span>
              </div>

              <div className="space-y-3">
                {RECONOCIMIENTOS.map((r, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur rounded-2xl p-3 flex items-center gap-3 hover:scale-[1.02] transition-transform opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${700 + i * 100}ms`, animationFillMode: 'forwards' }}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F4A261] to-[#E76F51] flex items-center justify-center text-lg shadow-md">
                      {r.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-gray-900">
                        {r.from} <span className="font-normal text-gray-500">te reconoció</span>
                      </p>
                      <p className="text-[11px] text-gray-700 truncate">"{r.msg}"</p>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{r.time}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white/80 backdrop-blur border-2 border-dashed border-[#F4A261]/40 text-[#E76F51] text-xs font-bold py-3 rounded-2xl hover:bg-white hover:border-[#F4A261] transition-all">
                <Heart size={14}/>
                Dar reconocimiento a un cuate
              </button>
            </div>
          </AnimatedCard>
        </div>

        {/* Espaciado final */}
        <div className="h-4"/>
      </div>

      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-40">
        <button className="group relative flex items-center gap-2 bg-gradient-to-br from-[#2A9D87] to-[#1C3581] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-[#1C3581]/40 hover:scale-105 transition-transform">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2A9D87] to-[#1C3581] blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10"/>
          <Sparkles size={16} className="animate-pulse"/>
          <span className="text-xs font-black">¿Bloqueo creativo?</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F4A261] rounded-full animate-ping"/>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F4A261] rounded-full"/>
        </button>
      </div>

      {/* ═══════ ANIMACIONES CSS ═══════ */}
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.4, 0, 0.2, 1); }

        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modal-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }

        @keyframes bar-grow {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .animate-bar-grow { animation: bar-grow 1s cubic-bezier(0.4,0,0.2,1) both; }

        @keyframes confetti {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-60px) rotate(360deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti 1.5s ease-out infinite; }

        @keyframes mascota-float {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%      { transform: translateY(-8px) rotate(1deg); }
        }
        .animate-mascota-float { animation: mascota-float 3.5s ease-in-out infinite; }

        @keyframes mascota-shadow {
          0%, 100% { opacity: 0.18; }
          50%      { opacity: 0.1; }
        }
        .animate-mascota-shadow { animation: mascota-shadow 3.5s ease-in-out infinite; }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          93%, 97%      { transform: scaleY(0.1); }
        }
        .animate-mascota-blink {
          animation: blink 4s ease-in-out infinite;
          transform-origin: 50px 62px;
          transform-box: fill-box;
        }

        @keyframes loveeyes {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.15); }
        }
        .animate-mascota-loveeyes {
          animation: loveeyes 0.8s ease-in-out infinite;
          transform-origin: 50px 60px;
          transform-box: fill-box;
        }

        @keyframes cheeks {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 0.9; }
        }
        .animate-mascota-cheeks { animation: cheeks 2s ease-in-out infinite; }

        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }
        .animate-mascota-sparkle { animation: sparkle 2.5s ease-in-out infinite; }

        @keyframes sweat-drop {
          0%   { transform: translateY(-3px); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        .animate-sweat-drop {
          animation: sweat-drop 1.8s ease-in infinite;
          transform-box: fill-box;
        }

        @keyframes floating-hearts {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%      { transform: translateY(-8px); opacity: 1; }
        }
        .animate-floating-hearts {
          animation: floating-hearts 2s ease-in-out infinite;
          transform-box: fill-box;
        }

        @keyframes zzz-anim {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translateY(-12px) translateX(6px); opacity: 0; }
        }
        .animate-zzz {
          animation: zzz-anim 2.5s ease-out infinite;
          transform-box: fill-box;
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 0.35; transform: scale(1.1); }
        }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }

        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.05); }
        }
        .animate-pulse-soft { animation: pulse-soft 2s ease-in-out infinite; }

        @keyframes pulse-badge {
          0%, 100% { box-shadow: 0 0 0 0 rgba(244,162,97,0.6); }
          50%      { box-shadow: 0 0 0 6px rgba(244,162,97,0); }
        }
        .animate-pulse-badge { animation: pulse-badge 2s ease-in-out infinite; }

        @keyframes blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(30px,-50px) scale(1.1); }
          66%      { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob   { animation: blob 18s ease-in-out infinite; }
        .animate-blob-2 { animation: blob 22s ease-in-out infinite reverse; }
        .animate-blob-3 { animation: blob 25s ease-in-out infinite; }

        @keyframes wave {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 30%      { transform: rotate(14deg); }
          20%           { transform: rotate(-8deg); }
          40%, 50%      { transform: rotate(12deg); }
        }
        .animate-wave { animation: wave 2.5s ease-in-out infinite; display: inline-block; }

        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }

        @keyframes shimmer-bar {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-bar { animation: shimmer-bar 1.5s ease-out; }

        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        .animate-bounce-soft { animation: bounce-soft 1.4s ease-in-out infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50%      { opacity: 1; }
        }
        .animate-twinkle { animation: twinkle 2.5s ease-in-out infinite; }

        @keyframes line-progress {
          from { width: 0%; }
          to   { width: 65%; }
        }
        .animate-line-progress {
          animation: line-progress 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 600ms;
          width: 0%;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }

        @keyframes ping-slow {
          0%      { transform: scale(1); opacity: 0.5; }
          75%,100%{ transform: scale(1.4); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
      `}</style>
    </div>
  );
}