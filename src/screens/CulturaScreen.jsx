import React, { useState } from 'react';
import {
  Bell, Settings, Trophy, Sparkles, Rocket, Zap, Lock,
  Heart, ThumbsUp, Star, Gift, BookOpen, Users, Lightbulb,
  Award, Target, TrendingUp, Coffee, Monitor, Headphones,
  ChevronRight, X, Plus, Check, Search, Filter, ArrowLeft,
  MessageCircle, Send, Smile, Crown, Shield, Flame, Leaf,
  Music, Camera, Code, Palette, Globe, Clock, ChevronDown,
  LogOut, BarChart2, UserCheck, Package, Ticket,
} from 'lucide-react';

/* ─────────────────────────────────────
   DATOS GLOBALES
───────────────────────────────────── */
const CUENTAS = [
  { id: 'admin',   nombre: 'Admin',          email: 'admin@combocuate.com',   pass: 'admin123',   rol: 'admin'    },
  { id: 'mateo',   nombre: 'Mateo Torres',   email: 'mateo@startup.com',      pass: '1234',       rol: 'trabajador', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80' },
  { id: 'sofia',   nombre: 'Sofía Rocha',    email: 'sofia@startup.com',      pass: '1234',       rol: 'trabajador', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80' },
  { id: 'rodrigo', nombre: 'Rodrigo Vega',   email: 'rodrigo@startup.com',    pass: '1234',       rol: 'trabajador', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' },
  { id: 'vale',    nombre: 'Valentina Cruz', email: 'vale@startup.com',       pass: '1234',       rol: 'trabajador', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80' },
  { id: 'luis',    nombre: 'Luis Mendez',    email: 'luis@startup.com',       pass: '1234',       rol: 'trabajador', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80' },
];

const MEDALLAS_CAT = [
  { id: 'mvp',      Icon: Crown,      label: 'MVP Creativo',    color: '#F59E0B', bg: '#FEF3C7', xp: 200 },
  { id: 'salvador', Icon: Shield,     label: 'Salvavidas',      color: '#3B82F6', bg: '#DBEAFE', xp: 150 },
  { id: 'rocket',   Icon: Rocket,     label: 'Despegue Rápido', color: '#2A9D87', bg: '#D1FAE5', xp: 100 },
  { id: 'energia',  Icon: Zap,        label: 'Alta Energía',    color: '#7C4DFF', bg: '#EDE9FE', xp: 120 },
  { id: 'fuego',    Icon: Flame,      label: 'En Llamas',       color: '#EF4444', bg: '#FEE2E2', xp: 180 },
  { id: 'lider',    Icon: TrendingUp, label: 'Liderazgo',       color: '#EC4899', bg: '#FCE7F3', xp: 160 },
  { id: 'verde',    Icon: Leaf,       label: 'Mente Clara',     color: '#10B981', bg: '#D1FAE5', xp: 130 },
  { id: 'global',   Icon: Globe,      label: 'Impacto Global',  color: '#0EA5E9', bg: '#E0F2FE', xp: 250 },
];

const BENEFICIOS_CAT = [
  { id: 1, title: 'Viernes Libre',          desc: 'Tarde completa para proyectos personales', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop', cost: 800,  category: 'Tiempo',       Icon: Clock,      stock: 3  },
  { id: 2, title: 'Suscripción Midjourney', desc: 'Plan Premium 1 mes para tu creatividad',   img: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&h=200&fit=crop', cost: 500,  category: 'Herramienta',   Icon: Palette,    stock: 5  },
  { id: 3, title: 'Mentoría con el CEO',    desc: 'Sesión 1h con Rodrigo para tu desarrollo', img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=200&fit=crop', cost: 1200, category: 'Mentoría',      Icon: Users,      stock: 2  },
  { id: 4, title: 'Curso Online',           desc: 'Cualquier curso de Platzi o Domestika',   img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop', cost: 700,  category: 'Aprendizaje',   Icon: BookOpen,   stock: 10 },
  { id: 5, title: 'Audífonos Premium',      desc: 'Sony WH-1000XM5 para concentrarte',       img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop', cost: 2000, category: 'Equipamiento',  Icon: Headphones, stock: 1  },
  { id: 6, title: 'Día de Home Office',     desc: 'Trabaja desde donde quieras',              img: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=200&fit=crop', cost: 400,  category: 'Tiempo',        Icon: Monitor,    stock: 8  },
];

const getMedalla = (id) => MEDALLAS_CAT.find((m) => m.id === id);
const getCuenta  = (id) => CUENTAS.find((c) => c.id === id);

/* ─────────────────────────────────────
   ESTADO GLOBAL COMPARTIDO (singleton)
   Se inicializa una vez, persiste en memoria
───────────────────────────────────── */
const estadoGlobal = {
  reconocimientos: [
    { id: 1, fromId: 'admin', toId: 'mateo', medalId: 'mvp',      pts: 200, time: 'Hace 2h', msg: 'Mateo, tu propuesta elevó la calidad de toda la campaña. ¡Eres un crack!', canjeado: false, likes: 12, hasLiked: false },
    { id: 2, fromId: 'admin', toId: 'luis',  medalId: 'salvador', pts: 150, time: 'Hace 5h', msg: '¡Gracias por salvar la edición del Reel de Entel a última hora!',          canjeado: false, likes: 8,  hasLiked: false },
    { id: 3, fromId: 'admin', toId: 'sofia', medalId: 'energia',  pts: 120, time: 'Ayer',    msg: 'Sofía siempre sube la energía del equipo. ¡Gracias!',                      canjeado: false, likes: 5,  hasLiked: false },
  ],
  beneficiosCatalogo: BENEFICIOS_CAT.map((b) => ({ ...b })),
  canjesEnviados: [],  // { id, userId, benId, fecha }
};

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────── */
function Avatar({ src, name, size = 9 }) {
  const initials = name ? name.split(' ').map((w) => w[0]).slice(0, 2).join('') : '?';
  return src ? (
    <div className={`w-${size} h-${size} rounded-full overflow-hidden flex-shrink-0 border-2 border-white shadow-sm`}>
      <img src={src} alt={name} className="w-full h-full object-cover" />
    </div>
  ) : (
    <div className={`w-${size} h-${size} rounded-full bg-[#2A9D87] flex items-center justify-center flex-shrink-0 border-2 border-white shadow-sm`}>
      <span className="text-white text-xs font-bold">{initials}</span>
    </div>
  );
}

function Badge({ medalId }) {
  const m = getMedalla(medalId);
  if (!m) return null;
  const MIcon = m.Icon;
  return (
    <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: m.bg, color: m.color }}>
      <MIcon size={10} />{m.label}
    </span>
  );
}

function XPBar({ current, max, color = 'linear-gradient(90deg,#2A9D87,#7C4DFF)' }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

/* ─────────────────────────────────────
   LOGIN SCREEN
───────────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [email, setEmail]   = useState('');
  const [pass,  setPass]    = useState('');
  const [error, setError]   = useState('');

  const handleSubmit = () => {
    const cuenta = CUENTAS.find((c) => c.email === email.trim() && c.pass === pass);
    if (!cuenta) { setError('Credenciales incorrectas. Intenta de nuevo.'); return; }
    setError('');
    onLogin(cuenta);
  };

  return (
    <div className="w-full min-h-screen flex">
      {/* Izquierda — formulario */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-10 md:px-16 py-12 bg-white">
        <div className="max-w-sm w-full mx-auto space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold text-[#1C3581]">El Combo Cuate</h1>
            <p className="text-sm text-gray-400">Impulsa tu startup con creatividad y propósito.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                placeholder="nombre@startup.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 transition"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#2A9D87] uppercase tracking-widest mb-1.5">Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2A9D87]/30 transition"
              />
            </div>
            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          </div>

          <button onClick={handleSubmit} className="w-full bg-[#2A9D87] text-white font-bold py-3.5 rounded-xl text-sm hover:bg-[#23897A] transition shadow-lg shadow-[#2A9D87]/25">
            Ingresar
          </button>

          {/* Hint cuentas de prueba */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-1.5">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Cuentas de prueba</p>
            <p className="text-[11px] text-gray-500">Admin: <span className="font-mono text-gray-700">admin@combocuate.com</span> / admin123</p>
            <p className="text-[11px] text-gray-500">Trabajador: <span className="font-mono text-gray-700">mateo@startup.com</span> / 1234</p>
          </div>
        </div>
      </div>

      {/* Derecha — panel visual */}
      <div className="hidden md:flex w-[55%] bg-[#2A9D87] flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3AC0A6]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-[#1C3581]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 w-full max-w-md space-y-4">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Sistema de Reconocimientos</p>
            <p className="text-white text-xl font-black leading-snug">Celebra los logros,<br />canjea tu energía.</p>
            <p className="text-white/60 text-xs mt-2 leading-relaxed">El admin entrega puntos y medallas. Tú los canjeas por beneficios reales.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {['Medallas', 'Puntos XP', 'Cupones'].map((l, i) => (
              <div key={i} className="bg-white/10 border border-white/20 rounded-xl p-3 text-center">
                <p className="text-white font-black text-lg">{['🏅','⭐','🎟️'][i]}</p>
                <p className="text-white/70 text-[10px] font-semibold mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   SIDEBAR genérico
───────────────────────────────────── */
function Sidebar({ tabs, activeTab, setActiveTab, usuario, onLogout }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-[#0D1B3E] flex flex-col z-40">
      <div className="px-5 py-6 border-b border-white/10">
        <p className="text-white font-extrabold text-base">El Combo Cuate</p>
        <p className="text-white/40 text-[11px] mt-0.5">{usuario.rol === 'admin' ? 'Panel Admin' : 'Panel Trabajador'}</p>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {tabs.map((t) => {
          const TIcon = t.Icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition text-left
                ${activeTab === t.id ? 'bg-[#2A9D87] text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
            >
              <TIcon size={16} />
              {t.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <Avatar src={usuario.img} name={usuario.nombre} size={8} />
          <div className="min-w-0">
            <p className="text-white text-xs font-bold truncate">{usuario.nombre}</p>
            <p className="text-white/40 text-[10px] truncate">{usuario.email}</p>
          </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-2 text-white/40 hover:text-red-400 text-xs font-medium transition px-1 py-1">
          <LogOut size={14} /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════
   ADMIN APP
══════════════════════════════════════ */

/* Modal: Dar Reconocimiento (Admin) */
function ModalDarReconocimiento({ onClose, onSubmit, adminId }) {
  const [step, setStep]               = useState(1);
  const [selectedMember, setMember]   = useState(null);
  const [selectedMedal, setMedal]     = useState(null);
  const [pts, setPts]                 = useState(100);
  const [msg, setMsg]                 = useState('');

  const trabajadores = CUENTAS.filter((c) => c.rol === 'trabajador');

  const handleSubmit = () => {
    if (!selectedMember || !selectedMedal || !msg.trim()) return;
    onSubmit({ member: selectedMember, medal: selectedMedal, pts, msg });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {step > 1 && <button onClick={() => setStep(step - 1)} className="p-1 hover:bg-gray-100 rounded-lg"><ArrowLeft size={16} /></button>}
            <Award size={16} className="text-[#2A9D87]" />
            <h2 className="text-sm font-extrabold text-gray-900">Dar Reconocimiento</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
        </div>

        <div className="p-5">
          {/* Stepper */}
          <div className="flex items-center gap-2 mb-5">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition
                  ${step >= s ? 'bg-[#2A9D87] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {step > s ? <Check size={12} /> : s}
                </div>
                {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-[#2A9D87]' : 'bg-gray-100'}`} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="text-xs font-bold text-gray-700 mb-3">¿A quién reconoces?</p>
              <div className="space-y-2">
                {trabajadores.map((m) => (
                  <button key={m.id} onClick={() => { setMember(m); setStep(2); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition hover:border-[#2A9D87]
                      ${selectedMember?.id === m.id ? 'border-[#2A9D87] bg-green-50' : 'border-gray-100'}`}>
                    <Avatar src={m.img} name={m.nombre} size={8} />
                    <div className="text-left">
                      <p className="text-xs font-bold text-gray-900">{m.nombre}</p>
                      <p className="text-[10px] text-gray-400">{m.email}</p>
                    </div>
                    {selectedMember?.id === m.id && <Check size={14} className="ml-auto text-[#2A9D87]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-xs font-bold text-gray-700 mb-3">Elige medalla y puntos</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {MEDALLAS_CAT.map((med) => {
                  const MIcon = med.Icon;
                  const sel = selectedMedal?.id === med.id;
                  return (
                    <button key={med.id} onClick={() => setMedal(med)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition
                        ${sel ? 'border-[#2A9D87] shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: med.bg }}>
                        <MIcon size={18} style={{ color: med.color }} />
                      </div>
                      <p className="text-[9px] font-bold text-gray-600 text-center leading-tight">{med.label}</p>
                    </button>
                  );
                })}
              </div>
              <div className="mb-4">
                <label className="text-xs font-bold text-gray-700 block mb-2">Puntos a otorgar: <span className="text-[#2A9D87]">{pts} pts</span></label>
                <input type="range" min={50} max={500} step={50} value={pts} onChange={(e) => setPts(Number(e.target.value))}
                  className="w-full accent-[#2A9D87]" />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>50</span><span>500</span></div>
              </div>
              <button disabled={!selectedMedal} onClick={() => setStep(3)}
                className="w-full bg-[#2A9D87] text-white text-xs font-bold py-2.5 rounded-xl disabled:opacity-40 hover:bg-[#23897A] transition">
                Continuar →
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                <Avatar src={selectedMember?.img} name={selectedMember?.nombre} size={8} />
                <div>
                  <p className="text-xs font-bold text-gray-900">{selectedMember?.nombre}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge medalId={selectedMedal?.id} />
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+{pts} pts</span>
                  </div>
                </div>
              </div>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder="Escribe un mensaje de reconocimiento..." rows={4}
                className="w-full border border-gray-200 rounded-xl p-3 text-xs text-gray-700 resize-none focus:outline-none focus:border-[#2A9D87] transition" />
              <button disabled={!msg.trim()} onClick={handleSubmit}
                className="w-full bg-[#2A9D87] text-white text-xs font-bold py-3 rounded-xl disabled:opacity-40 hover:bg-[#23897A] transition flex items-center justify-center gap-2">
                <Send size={14} /> Enviar Reconocimiento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Modal: Añadir Beneficio (Admin) */
function ModalNuevoBeneficio({ onClose, onSubmit }) {
  const [titulo, setTitulo]   = useState('');
  const [desc, setDesc]       = useState('');
  const [costo, setCosto]     = useState(500);
  const [stock, setStock]     = useState(5);
  const [categoria, setCat]   = useState('Tiempo');

  const handleSubmit = () => {
    if (!titulo.trim()) return;
    onSubmit({ titulo, desc, costo, stock, categoria });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Package size={16} className="text-[#2A9D87]" /><h2 className="text-sm font-extrabold">Nuevo Beneficio</h2></div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Nombre</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej: Día libre extra"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2A9D87]" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Descripción</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} placeholder="Descripción breve..."
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs resize-none focus:outline-none focus:border-[#2A9D87]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Costo (pts)</label>
              <input type="number" value={costo} onChange={(e) => setCosto(Number(e.target.value))} min={50} step={50}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2A9D87]" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} min={1}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2A9D87]" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Categoría</label>
            <select value={categoria} onChange={(e) => setCat(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#2A9D87]">
              {['Tiempo','Herramienta','Aprendizaje','Equipamiento','Bienestar','Mentoría'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <button disabled={!titulo.trim()} onClick={handleSubmit}
            className="w-full bg-[#2A9D87] text-white text-xs font-bold py-3 rounded-xl disabled:opacity-40 hover:bg-[#23897A] transition">
            Crear Beneficio
          </button>
        </div>
      </div>
    </div>
  );
}

/* Admin: Dashboard */
function AdminDashboard({ reconocimientos, setReconocimientos, onOpenModal }) {
  const trabajadores = CUENTAS.filter((c) => c.rol === 'trabajador');
  const ptsTotal     = reconocimientos.reduce((sum, r) => sum + r.pts, 0);

  /* handleLike — alterna like en un reconocimiento del feed */
  const handleLike = (id) => {
    setReconocimientos((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, hasLiked: !r.hasLiked, likes: r.hasLiked ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Trabajadores', value: trabajadores.length, icon: Users, color: '#2A9D87' },
          { label: 'Reconocimientos', value: reconocimientos.length, icon: Award, color: '#7C4DFF' },
          { label: 'Puntos entregados', value: ptsTotal.toLocaleString(), icon: Star, color: '#F59E0B' },
          { label: 'Canjes solicitados', value: estadoGlobal.canjesEnviados.length, icon: Ticket, color: '#3B82F6' },
        ].map((k, i) => {
          const KIcon = k.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: k.color + '20' }}>
                <KIcon size={18} style={{ color: k.color }} />
              </div>
              <p className="text-xl font-extrabold text-gray-900">{k.value}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Feed + Ranking */}
      <div className="grid grid-cols-2 gap-6">
        {/* Feed reconocimientos */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">Reconocimientos enviados</h3>
            <button onClick={onOpenModal}
              className="bg-[#2A9D87] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#23897A] transition flex items-center gap-1.5">
              <Plus size={13} /> Dar Reconocimiento
            </button>
          </div>
          <div className="space-y-3">
            {reconocimientos.length === 0 && <p className="text-xs text-gray-400 text-center py-4">Aún no hay reconocimientos.</p>}
            {reconocimientos.map((r) => {
              const to = getCuenta(r.toId);
              return (
                <div key={r.id} className="border border-gray-100 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar src={to?.img} name={to?.nombre} size={7} />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{to?.nombre}</p>
                        <p className="text-[10px] text-gray-400">{r.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge medalId={r.medalId} />
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+{r.pts} pts</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg">"{r.msg}"</p>
                  {/* Botón like — conectado a handleLike */}
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handleLike(r.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all duration-200 ${
                        r.hasLiked
                          ? 'bg-red-50 text-red-500 border border-red-200 scale-105'
                          : 'bg-gray-50 text-gray-400 border border-gray-100 hover:border-red-200 hover:text-red-400'
                      }`}
                    >
                      <Heart size={11} className={r.hasLiked ? 'fill-red-500' : ''} />
                      <span key={r.likes} className="tabular-nums animate-[pulse_0.3s_ease-out_1]">{r.likes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking trabajadores */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Puntos por trabajador</h3>
          <div className="space-y-3">
            {trabajadores.map((t, i) => {
              const sumPts = reconocimientos.filter((r) => r.toId === t.id).reduce((s, r) => s + r.pts, 0);
              return (
                <div key={t.id} className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0
                    ${i === 0 ? 'bg-amber-100 text-amber-600' : i === 1 ? 'bg-gray-100 text-gray-500' : i === 2 ? 'bg-orange-100 text-orange-500' : 'text-gray-300'}`}>{i + 1}</span>
                  <Avatar src={t.img} name={t.nombre} size={7} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{t.nombre}</p>
                    <XPBar current={sumPts} max={Math.max(500, ...trabajadores.map((x) => reconocimientos.filter((r) => r.toId === x.id).reduce((s, r) => s + r.pts, 0)))} />
                  </div>
                  <span className="text-xs font-extrabold text-[#2A9D87] flex-shrink-0">{sumPts} pts</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Admin: Catálogo de Beneficios */
function AdminBeneficios({ catalogo, setCatalogo }) {
  const [modalNuevo, setModalNuevo] = useState(false);
  const canjesGlobal = estadoGlobal.canjesEnviados;

  const agregarBeneficio = ({ titulo, desc, costo, stock, categoria }) => {
    const nuevo = {
      id: Date.now(),
      title: titulo, desc, cost: costo, stock, category: categoria,
      img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop',
      Icon: Gift,
    };
    setCatalogo((prev) => [...prev, nuevo]);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-gray-900">Catálogo de Beneficios</h2>
        <button onClick={() => setModalNuevo(true)}
          className="bg-[#2A9D87] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#23897A] transition flex items-center gap-1.5">
          <Plus size={14} /> Nuevo Beneficio
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {catalogo.map((ben) => {
          const canjesEste = canjesGlobal.filter((c) => c.benId === ben.id).length;
          const BIcon = ben.Icon;
          return (
            <div key={ben.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-24 overflow-hidden relative">
                <img src={ben.img} alt={ben.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold px-2 py-0.5 rounded-full text-gray-700">{ben.category}</span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm font-extrabold text-gray-900">{ben.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{ben.desc}</p>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-amber-600">⭐ {ben.cost} pts</span>
                  <span className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${ben.stock > 2 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-500'}`}>{ben.stock} en stock</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 border-t border-gray-50 pt-2">
                  <span>Canjes recibidos: <strong className="text-gray-700">{canjesEste}</strong></span>
                  <button onClick={() => {
                    setCatalogo((prev) => prev.map((b) => b.id === ben.id ? { ...b, stock: b.stock + 1 } : b));
                  }} className="text-[#2A9D87] font-bold hover:underline">+Stock</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Canjes recibidos */}
      {canjesGlobal.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Solicitudes de Canje</h3>
          <div className="space-y-2">
            {canjesGlobal.map((canje, i) => {
              const usuario = getCuenta(canje.userId);
              const ben     = catalogo.find((b) => b.id === canje.benId);
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Avatar src={usuario?.img} name={usuario?.nombre} size={7} />
                    <div>
                      <p className="text-xs font-bold text-gray-800">{usuario?.nombre}</p>
                      <p className="text-[10px] text-gray-400">Quiere: {ben?.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-amber-600">-{ben?.cost} pts</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${canje.aprobado ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {canje.aprobado ? 'Aprobado' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {modalNuevo && (
        <ModalNuevoBeneficio onClose={() => setModalNuevo(false)} onSubmit={agregarBeneficio} />
      )}
    </div>
  );
}

/* Admin: Lista Trabajadores */
function AdminTrabajadores({ reconocimientos }) {
  const trabajadores = CUENTAS.filter((c) => c.rol === 'trabajador');
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-extrabold text-gray-900">Trabajadores</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Trabajador</th>
              <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Email</th>
              <th className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Reconocimientos</th>
              <th className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Puntos</th>
              <th className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest px-5 py-3">Canjes</th>
            </tr>
          </thead>
          <tbody>
            {trabajadores.map((t) => {
              const recs  = reconocimientos.filter((r) => r.toId === t.id);
              const pts   = recs.reduce((s, r) => s + r.pts, 0);
              const canjs = estadoGlobal.canjesEnviados.filter((c) => c.userId === t.id).length;
              return (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={t.img} name={t.nombre} size={8} />
                      <p className="text-sm font-bold text-gray-800">{t.nombre}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs text-gray-500">{t.email}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-extrabold text-[#7C4DFF]">{recs.length}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-extrabold text-amber-600">⭐ {pts}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-extrabold text-[#2A9D87]">{canjs}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ADMIN APP WRAPPER */
function AdminApp({ usuario, onLogout, reconocimientos, setReconocimientos, catalogo, setCatalogo }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [modalRec, setModalRec]   = useState(false);

  const tabs = [
    { id: 'dashboard',    label: 'Dashboard',    Icon: BarChart2   },
    { id: 'trabajadores', label: 'Trabajadores',  Icon: Users       },
    { id: 'beneficios',   label: 'Beneficios',    Icon: Package     },
  ];

  const handleNuevoRec = ({ member, medal, pts, msg }) => {
    const nuevo = {
      id: Date.now(),
      fromId: 'admin',
      toId: member.id,
      medalId: medal.id,
      pts,
      time: 'Ahora',
      msg,
      canjeado: false,
    };
    setReconocimientos((prev) => [nuevo, ...prev]);
    estadoGlobal.reconocimientos = [nuevo, ...estadoGlobal.reconocimientos];
  };

  return (
    <div className="min-h-screen bg-[#F4F6F5] flex">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} usuario={usuario} onLogout={onLogout} />
      <main className="pl-60 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'dashboard'    && <AdminDashboard reconocimientos={reconocimientos} setReconocimientos={setReconocimientos} onOpenModal={() => setModalRec(true)} />}
          {activeTab === 'trabajadores' && <AdminTrabajadores reconocimientos={reconocimientos} />}
          {activeTab === 'beneficios'   && <AdminBeneficios catalogo={catalogo} setCatalogo={setCatalogo} />}
        </div>
      </main>
      {modalRec && (
        <ModalDarReconocimiento
          onClose={() => setModalRec(false)}
          onSubmit={handleNuevoRec}
          adminId={usuario.id}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   TRABAJADOR APP
══════════════════════════════════════ */

/* Modal: Detalle Cupón */
function ModalCupon({ ben, ptsDisponibles, yaCanjeado, onClose, onCanjear }) {
  const [confirmando, setConfirmando] = useState(false);
  const puedeCanjear = ptsDisponibles >= ben.cost && !yaCanjeado && ben.stock > 0;
  const BIcon = ben.Icon;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={ben.img} alt={ben.title} className="w-full h-40 object-cover" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full"><X size={14} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-gray-900">{ben.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{ben.desc}</p>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <div>
                <p className="text-xs text-gray-500">Costo</p>
                <p className="text-sm font-extrabold text-amber-600">{ben.cost.toLocaleString()} pts</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Tu saldo</p>
              <p className={`text-sm font-extrabold ${ptsDisponibles >= ben.cost ? 'text-green-600' : 'text-red-500'}`}>
                {ptsDisponibles.toLocaleString()} pts
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Stock</span>
            <span className={`font-bold ${ben.stock <= 2 ? 'text-red-500' : 'text-green-600'}`}>{ben.stock} restantes</span>
          </div>

          {!confirmando ? (
            <button onClick={() => puedeCanjear && setConfirmando(true)} disabled={!puedeCanjear}
              className={`w-full py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2
                ${yaCanjeado ? 'bg-green-100 text-green-700' : !puedeCanjear ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#2A9D87] text-white hover:bg-[#23897A]'}`}>
              {yaCanjeado ? <><Check size={14} /> Ya canjeado</> :
               ptsDisponibles < ben.cost ? `Necesitas ${ben.cost - ptsDisponibles} pts más` :
               ben.stock === 0 ? 'Sin stock' :
               <><Gift size={14} /> Canjear cupón</>}
            </button>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-center text-gray-600 font-medium">¿Confirmas el canje?</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmando(false)} className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-gray-200 hover:bg-gray-50">Cancelar</button>
                <button onClick={() => { onCanjear(ben.id, ben.cost); onClose(); }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#2A9D87] text-white hover:bg-[#23897A]">✓ Confirmar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Trabajador: Mis Puntos */
function TrabajadorPuntos({ usuario, reconocimientos }) {
  const misRecs = reconocimientos.filter((r) => r.toId === usuario.id);
  const totalPts = misRecs.reduce((s, r) => s + r.pts, 0);
  const canjesU  = estadoGlobal.canjesEnviados.filter((c) => c.userId === usuario.id);
  const ptsUsados = canjesU.reduce((s, c) => {
    const ben = estadoGlobal.beneficiosCatalogo.find((b) => b.id === c.benId);
    return s + (ben?.cost ?? 0);
  }, 0);
  const saldo = totalPts - ptsUsados;
  const nivel = Math.floor(totalPts / 200) + 1;

  return (
    <div className="space-y-5">
      {/* Header perfil */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <Avatar src={usuario.img} name={usuario.nombre} size={14} />
            <span className="absolute -bottom-1 -right-1 bg-[#7C4DFF] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Nv.{nivel}</span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">{usuario.nombre}</h2>
            <p className="text-sm text-gray-400">{usuario.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">⭐ {saldo.toLocaleString()} pts disponibles</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Total ganado', value: `${totalPts} pts`, color: '#2A9D87' },
            { label: 'Usados',       value: `${ptsUsados} pts`, color: '#EF4444' },
            { label: 'Disponibles',  value: `${saldo} pts`,    color: '#F59E0B' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-xl py-3">
              <p className="text-base font-extrabold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reconocimientos recibidos */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Reconocimientos recibidos</h3>
        {misRecs.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">Aún no tienes reconocimientos.<br/>¡El admin puede enviarte uno pronto!</p>
        ) : (
          <div className="space-y-3">
            {misRecs.map((r) => {
              const med = getMedalla(r.medalId);
              return (
                <div key={r.id} className="border border-gray-100 rounded-xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#2A9D87]/10 flex items-center justify-center">
                        <Award size={14} className="text-[#2A9D87]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-700">Del Admin</p>
                        <p className="text-[10px] text-gray-400">{r.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge medalId={r.medalId} />
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">+{r.pts} pts</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-500 italic bg-gray-50 px-3 py-2 rounded-lg">"{r.msg}"</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* Trabajador: Cupones */
function TrabajadorCupones({ usuario, reconocimientos, catalogo, puntosXP, purchasedItems = [], onCanjear }) {
  const [selectedBen, setSelectedBen] = useState(null);
  const [filtro, setFiltro]           = useState('Todos');

  // Canjeados = los que vienen del padre (purchasedItems) + historial previo de sesión
  const canjeados = purchasedItems;
  const saldo     = puntosXP; // El padre gestiona el saldo real

  const handleCanjearLocal = (benId, cost) => {
    // Registrar en estadoGlobal para el panel admin
    const ben = catalogo.find((b) => b.id === benId);
    const nuevoCanje = { id: Date.now(), userId: usuario.id, benId, fecha: 'Ahora', aprobado: false };
    estadoGlobal.canjesEnviados.push(nuevoCanje);
    // Reducir stock del catálogo global
    const idx = estadoGlobal.beneficiosCatalogo.findIndex((b) => b.id === benId);
    if (idx !== -1) estadoGlobal.beneficiosCatalogo[idx].stock = Math.max(0, estadoGlobal.beneficiosCatalogo[idx].stock - 1);
    // Delegar XP + toast al padre
    if (onCanjear) onCanjear(benId, cost, ben?.title ?? 'Beneficio');
  };

  const categorias = ['Todos', ...new Set(catalogo.map((b) => b.category))];
  const filtrados  = filtro === 'Todos' ? catalogo : catalogo.filter((b) => b.category === filtro);

  return (
    <div className="space-y-5">
      {/* Saldo */}
      <div className="bg-gradient-to-r from-[#2A9D87] to-[#1C3581] rounded-2xl p-6 text-white">
        <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Tu saldo disponible</p>
        <p className="text-4xl font-extrabold mt-1">⭐ {saldo.toLocaleString()}</p>
        <p className="text-white/60 text-xs mt-1">{canjeados.length} canje(s) realizados · {totalPts} pts ganados en total</p>
        <div className="mt-4">
          <XPBar current={saldo} max={Math.max(saldo, 2000)} color="rgba(255,255,255,0.8)" />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setFiltro(cat)}
            className={`text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0 transition
              ${filtro === cat ? 'bg-[#2A9D87] text-white' : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid cupones */}
      <div className="grid grid-cols-2 gap-4">
        {filtrados.map((ben) => {
          const yaCanjeado   = canjeados.includes(ben.id);
          const puedeCanjear = saldo >= ben.cost && !yaCanjeado && ben.stock > 0;
          return (
            <div key={ben.id} onClick={() => setSelectedBen(ben)}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
              <div className="relative h-28 overflow-hidden">
                <img src={ben.img} alt={ben.title} className="w-full h-full object-cover" />
                {yaCanjeado && (
                  <div className="absolute inset-0 bg-green-500/80 flex flex-col items-center justify-center">
                    <Check size={28} className="text-white" />
                    <p className="text-white text-[10px] font-bold mt-1">Solicitado</p>
                  </div>
                )}
                {ben.stock <= 2 && !yaCanjeado && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">¡Solo {ben.stock}!</span>
                )}
                <span className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold px-2 py-0.5 rounded-full text-gray-700">{ben.category}</span>
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs font-extrabold text-gray-900 leading-tight">{ben.title}</p>
                <p className="text-[10px] text-gray-400 leading-snug line-clamp-2">{ben.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-amber-600">⭐ {ben.cost}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full
                    ${yaCanjeado ? 'bg-green-100 text-green-700' : puedeCanjear ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-400'}`}>
                    {yaCanjeado ? '✓ Canjeado' : puedeCanjear ? 'Disponible' : 'Sin saldo'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Historial canjes */}
      {canjeados.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Mis Canjes</h3>
          <div className="space-y-2">
            {canjeados.map((benId, i) => {
              const ben = catalogo.find((b) => b.id === benId);
              if (!ben) return null;
              const canje = estadoGlobal.canjesEnviados.find((c) => c.userId === usuario.id && c.benId === benId);
              return (
                <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Ticket size={14} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800">{ben.title}</p>
                    <p className="text-[10px] text-gray-400">-{ben.cost} pts · {canje?.fecha}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${canje?.aprobado ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-700'}`}>
                    {canje?.aprobado ? 'Aprobado' : 'Pendiente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedBen && (
        <ModalCupon
          ben={selectedBen}
          ptsDisponibles={saldo}
          yaCanjeado={canjeados.includes(selectedBen.id)}
          onClose={() => setSelectedBen(null)}
          onCanjear={handleCanjearLocal}
        />
      )}
    </div>
  );
}

/* TRABAJADOR APP WRAPPER */
function TrabajadorApp({ usuario, onLogout, reconocimientos, catalogo }) {
  const [activeTab,    setActiveTab]   = useState('puntos');

  /* ── 1. Estados de simulación solicitados ── */
  // XP visible en header — arranca en 2450 (valor del Marketplace en el diseño)
  const [puntosXP,      setPuntosXP]     = useState(2450);
  // Toast de canje: null | { nombre, exito, msg }
  const [canjeToast,    setCanjeToast]   = useState(null);
  // Modal de nuevo reconocimiento comunitario (trabajador puede proponer)
  const [isModalOpen,   setIsModalOpen]  = useState(false);
  // Items ya canjeados en esta sesión
  const [purchasedItems,setPurchasedItems] = useState([]);

  /* ── 2. handleCanjear — evaluación XP + toast + deducción ── */
  const handleCanjear = (id, costo, nombreBeneficio) => {
    if (puntosXP >= costo) {
      setPuntosXP((prev) => prev - costo);
      setPurchasedItems((prev) => [...prev, id]);
      setCanjeToast({
        exito: true,
        msg: `¡Canje Exitoso! Has desbloqueado: ${nombreBeneficio}. El código de activación fue enviado a tu WhatsApp.`,
      });
    } else {
      setCanjeToast({
        exito: false,
        msg: `Saldo insuficiente. Necesitas ${costo - puntosXP} puntos más para canjear ${nombreBeneficio}.`,
      });
    }
    // Auto-cierre del toast a los 4s
    setTimeout(() => setCanjeToast(null), 4000);
  };

  const tabs = [
    { id: 'puntos',   label: 'Mis Puntos',   Icon: Star    },
    { id: 'cupones',  label: 'Mis Cupones',   Icon: Ticket  },
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F5] flex">
      <Sidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} usuario={usuario} onLogout={onLogout} />
      <main className="pl-60 flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Header con XP visible */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-gray-900">
                {activeTab === 'puntos' ? 'Mis Puntos' : 'Mis Cupones'}
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                {activeTab === 'puntos'
                  ? 'Aquí ves los puntos que el admin te ha otorgado.'
                  : 'Canjea tus puntos por beneficios reales.'}
              </p>
            </div>
            {/* Contador XP global — se actualiza al canjear */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 flex-shrink-0">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-[10px] text-amber-600 font-semibold uppercase tracking-widest leading-none">Tu saldo</p>
                <p
                  key={puntosXP}
                  className="text-lg font-extrabold text-amber-700 tabular-nums animate-[pulse_0.5s_ease-out_1] leading-tight"
                >
                  {puntosXP.toLocaleString()} pts
                </p>
              </div>
            </div>
          </div>

          {activeTab === 'puntos'  && <TrabajadorPuntos  usuario={usuario} reconocimientos={reconocimientos} />}
          {activeTab === 'cupones' && (
            <TrabajadorCupones
              usuario={usuario}
              reconocimientos={reconocimientos}
              catalogo={catalogo}
              puntosXP={puntosXP}
              purchasedItems={purchasedItems}
              onCanjear={handleCanjear}
            />
          )}
        </div>
      </main>

      {/* ── Toast de canje — éxito o error ── */}
      {canjeToast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-start gap-4 px-5 py-4 rounded-2xl shadow-2xl border max-w-sm w-full mx-4 transition-all ${
          canjeToast.exito
            ? 'bg-white border-green-200 shadow-green-900/10'
            : 'bg-white border-red-200 shadow-red-900/10'
        }`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
            canjeToast.exito ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {canjeToast.exito
              ? <Check size={18} className="text-green-500" />
              : <X     size={18} className="text-red-500"   />}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-xs font-extrabold leading-tight ${canjeToast.exito ? 'text-gray-900' : 'text-red-700'}`}>
              {canjeToast.exito ? '¡Canje registrado!' : 'Saldo insuficiente'}
            </p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{canjeToast.msg}</p>
          </div>
          <button onClick={() => setCanjeToast(null)} className="text-gray-300 hover:text-gray-600 transition flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
export default function App() {
  const [usuario,          setUsuario]         = useState(null);
  const [reconocimientos,  setReconocimientos] = useState(estadoGlobal.reconocimientos);
  const [catalogo,         setCatalogo]        = useState(estadoGlobal.beneficiosCatalogo);

  const handleLogin  = (cuenta) => setUsuario(cuenta);
  const handleLogout = () => setUsuario(null);

  if (!usuario) return <LoginScreen onLogin={handleLogin} />;

  if (usuario.rol === 'admin') {
    return (
      <AdminApp
        usuario={usuario}
        onLogout={handleLogout}
        reconocimientos={reconocimientos}
        setReconocimientos={setReconocimientos}
        catalogo={catalogo}
        setCatalogo={setCatalogo}
      />
    );
  }

  return (
    <TrabajadorApp
      usuario={usuario}
      onLogout={handleLogout}
      reconocimientos={reconocimientos}
      catalogo={catalogo}
    />
  );
}