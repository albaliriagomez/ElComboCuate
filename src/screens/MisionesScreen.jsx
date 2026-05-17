import React, { useState, useEffect, useRef } from 'react';
import {
  Search, Bell, Trophy, Settings, Filter, Plus,
  Clock, Eye, Zap, Calendar, CheckCircle, MessageSquare,
  Flame, Target, Star, ChevronRight, ArrowUp, Play,
  Sparkles, Users, TrendingUp, Award, X, MoreHorizontal,
  AlertCircle, Rocket, Heart,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DATOS
───────────────────────────────────────────── */
const INITIAL_DATA = {
  disponibles: [
    {
      id: 1,
      title: 'Diseño de Landing para Lanzamiento',
      badge: 'En Cola',
      badgeColor: 'amber',
      desc: 'Optimizar el flujo de conversión para la campaña Q4.',
      xp: 120,
      avatars: 2,
      type: 'Diseño',
      deadline: '3 días',
      priority: 'media',
    },
    {
      id: 5,
      title: 'Estrategia de Contenido Q4',
      badge: 'En Cola',
      badgeColor: 'amber',
      desc: 'Definir calendario editorial para el próximo trimestre.',
      xp: 90,
      avatars: 1,
      type: 'Estrategia',
      deadline: '5 días',
      priority: 'baja',
    },
    {
      id: 6,
      title: 'Diseño de Banners Google Ads',
      badge: 'En Cola',
      badgeColor: 'amber',
      desc: 'Crear piezas display para campaña de reactivación.',
      xp: 110,
      avatars: 1,
      type: 'Diseño',
      deadline: '2 días',
      priority: 'alta',
    },
  ],
  desarrollo: [
    {
      id: 2,
      title: 'Editar Reel para Tiendas de Barrio',
      badge: 'Urgente',
      badgeColor: 'red',
      featured: true,
      timer: '2h',
      desc: 'Ajustar transiciones y color para el segmento retail.',
      progress: 65,
      okr: 'OKR-1',
      xp: 150,
      assignee: 'Lucas',
      type: 'Video',
      skill: 'Edición Audiovisual',
    },
    {
      id: 3,
      title: 'Script de Automatización',
      badge: 'En Progreso',
      badgeColor: 'yellow',
      progress: 22,
      xp: 80,
      type: 'Tech',
      skill: 'IA Creativa',
      timer: '5h',
    },
    {
      id: 7,
      title: 'Campaña TikTok Semana Santa',
      badge: 'En Progreso',
      badgeColor: 'blue',
      progress: 45,
      xp: 130,
      type: 'Social',
      skill: 'Copywriting',
      timer: '8h',
      assignee: 'Sofía',
    },
  ],
  publicado: [
    {
      id: 4,
      title: 'Campaña "Eco-Cuate"',
      desc: 'Publicado en LinkedIn e Instagram.',
      views: '12.4k',
      likes: '890',
      reach: '45k',
      xp: 200,
    },
    {
      id: 8,
      title: 'Reel Producto Principal',
      desc: 'Publicado en Instagram y TikTok.',
      views: '8.1k',
      likes: '612',
      reach: '22k',
      xp: 160,
    },
  ],
  completadas: [
    { id: 9,  title: 'Branding de Producto',       date: '12 Oct', xp: 300, skill: 'Branding' },
    { id: 10, title: 'Newsletter Mensual',           date: '05 Oct', xp: null, skill: 'Copywriting' },
    { id: 11, title: 'Reel Lanzamiento App',         date: '28 Sep', xp: 200, skill: 'Edición' },
    { id: 12, title: 'Copy Campaña Entel',           date: '20 Sep', xp: 150, skill: 'Copywriting' },
    { id: 13, title: 'Motion Intro YouTube',         date: '14 Sep', xp: 250, skill: 'Motion' },
    { id: 14, title: 'Carrusel Instagram x6',        date: '08 Sep', xp: 120, skill: 'Diseño' },
    { id: 15, title: 'Guión Podcast Ep. 1',          date: '01 Sep', xp: 130, skill: 'Storytelling' },
    { id: 16, title: 'Campaña Back to School',       date: '25 Ago', xp: 180, skill: 'Estrategia' },
  ],
};

/* ─────────────────────────────────────────────
   COLORES POR BADGE
───────────────────────────────────────────── */
const BADGE_STYLES = {
  amber:  'bg-amber-100 text-amber-700 border border-amber-200',
  red:    'bg-red-100 text-red-600 border border-red-200',
  yellow: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  blue:   'bg-blue-100 text-blue-700 border border-blue-200',
};

const PRIORITY_DOT = {
  alta:  'bg-red-500',
  media: 'bg-amber-400',
  baja:  'bg-green-400',
};

/* ─────────────────────────────────────────────
   MODAL NUEVA MISIÓN
───────────────────────────────────────────── */
function NuevaMisionModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ title: '', type: '', xp: '', priority: 'media', desc: '' });

  const types = ['Diseño', 'Video', 'Copywriting', 'Estrategia', 'Social', 'Tech'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0D1B3E] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl shadow-black/50 animate-modal">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#2A9D87] flex items-center justify-center">
              <Rocket size={16} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Nueva Misión</h3>
              <p className="text-gray-500 text-[11px]">Paso {step} de 2</p>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-6">
          <div className="h-full rounded-full bg-[#2A9D87] transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1.5 block">Nombre de la Misión</label>
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2A9D87]/50 transition"
                placeholder="Ej: Reel para campaña navideña..."
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Tipo de Contenido</label>
              <div className="flex flex-wrap gap-2">
                {types.map(t => (
                  <button
                    key={t}
                    onClick={() => setForm({ ...form, type: t })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                      form.type === t ? 'bg-[#2A9D87] border-[#2A9D87] text-white' : 'bg-white/5 border-white/10 text-gray-400 hover:border-[#2A9D87]/50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-2 block">Prioridad</label>
              <div className="flex gap-2">
                {['alta', 'media', 'baja'].map(p => (
                  <button
                    key={p}
                    onClick={() => setForm({ ...form, priority: p })}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border capitalize transition ${
                      form.priority === p ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${PRIORITY_DOT[p]}`} />
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1.5 block">Descripción</label>
              <textarea
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#2A9D87]/50 transition h-24 resize-none"
                placeholder="¿Qué se necesita lograr con esta misión?"
                value={form.desc}
                onChange={e => setForm({ ...form, desc: e.target.value })}
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider mb-1.5 block">XP Asignados</label>
              <div className="flex gap-2">
                {[50, 80, 100, 150, 200].map(xp => (
                  <button
                    key={xp}
                    onClick={() => setForm({ ...form, xp: xp })}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      form.xp === xp ? 'bg-[#2A9D87]/20 border-[#2A9D87] text-[#2A9D87]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    +{xp}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-2">Vista previa</p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white text-xs font-bold">{form.title || 'Sin título'}</p>
                  <p className="text-gray-500 text-[11px] mt-1">{form.type || '—'} · Prioridad {form.priority}</p>
                </div>
                <span className="text-[#2A9D87] text-xs font-bold flex items-center space-x-1">
                  <Zap size={11} /><span>+{form.xp || '?'} XP</span>
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/5 transition">
              Atrás
            </button>
          )}
          <button
            onClick={() => step === 1 ? setStep(2) : onClose()}
            className="flex-1 py-2.5 rounded-xl bg-[#2A9D87] text-white text-sm font-bold hover:bg-[#23897A] transition flex items-center justify-center space-x-2"
          >
            {step === 1 ? <><span>Siguiente</span><ChevronRight size={15} /></> : <><Rocket size={15} /><span>Crear Misión</span></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CARDS
───────────────────────────────────────────── */
function CardDisponible({ card, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-enter group bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full transition-transform duration-700 ${hovered ? 'translate-x-full' : ''}`} style={{ pointerEvents: 'none' }} />

      <div className="flex items-center justify-between mb-3">
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[card.badgeColor]}`}>
          {card.badge}
        </span>
        <div className="flex items-center space-x-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[card.priority]}`} />
          <span className="text-[10px] text-gray-400 font-medium">{card.deadline}</span>
        </div>
      </div>

      <h4 className="text-sm font-bold text-gray-800 leading-snug mb-2">{card.title}</h4>
      <p className="text-[11px] text-gray-400 leading-relaxed mb-3">{card.desc}</p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <div className="flex -space-x-2">
          {Array.from({ length: card.avatars }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#2A9D87] to-[#1C3581] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">{['LG', 'SR'][i]}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-lg font-medium">{card.type}</span>
          <span className="flex items-center space-x-1 text-xs font-bold text-[#2A9D87]">
            <Zap size={12} />
            <span>+{card.xp} XP</span>
          </span>
        </div>
      </div>

      {/* Hover CTA */}
      <div className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2A9D87] to-[#2A9D87]/80 flex items-center justify-center py-2.5 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
        <span className="text-white text-xs font-bold flex items-center space-x-1.5">
          <Play size={12} fill="white" />
          <span>Iniciar Misión</span>
        </span>
      </div>
    </div>
  );
}

function CardDesarrollo({ card, index }) {
  const [progress, setProgress] = useState(card.progress || 0);

  useEffect(() => {
    const t = setTimeout(() => setProgress(card.progress || 0), 300 + index * 150);
    return () => clearTimeout(t);
  }, [card.progress, index]);

  return (
    <div
      className={`card-enter bg-white rounded-2xl shadow-sm border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer ${
        card.featured ? 'border-l-4 border-l-[#2A9D87] border-gray-100' : 'border-gray-100'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${BADGE_STYLES[card.badgeColor]}`}>
            {card.badge}
          </span>
          {card.timer && (
            <span className="flex items-center space-x-1 text-[11px] text-red-400 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
              <Clock size={11} />
              <span>{card.timer}</span>
            </span>
          )}
        </div>

        <h4 className="text-sm font-bold text-gray-800 leading-snug">{card.title}</h4>
        {card.desc && <p className="text-[11px] text-gray-400 leading-relaxed">{card.desc}</p>}

        {card.skill && (
          <span className="inline-flex items-center space-x-1 text-[10px] text-purple-600 bg-purple-50 px-2 py-1 rounded-lg font-semibold border border-purple-100">
            <Star size={9} />
            <span>{card.skill}</span>
          </span>
        )}

        {card.progress !== undefined && (
          <div>
            <div className="flex justify-between text-[11px] font-semibold text-gray-500 mb-1.5">
              <span className="text-[#2A9D87]">Progreso</span>
              <span className="font-bold text-gray-700">{progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2A9D87] to-[#7C4DFF] transition-all duration-1000 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#7C4DFF] shadow-sm" />
              </div>
            </div>
          </div>
        )}

        {card.okr && (
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="flex items-center space-x-1.5 text-gray-500 font-medium">
              <Target size={12} className="text-[#2A9D87]" />
              <span>Impacto: <span className="font-bold text-gray-700">{card.okr}</span></span>
            </span>
            <span className="flex items-center space-x-1 font-bold text-[#2A9D87]">
              <Zap size={12} />
              <span>+{card.xp} XP</span>
            </span>
          </div>
        )}

        {card.assignee && (
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2A9D87] to-[#1C3581] flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">{card.assignee[0]}</span>
              </div>
              <span className="text-[11px] text-gray-500">Asignado a <span className="font-semibold text-gray-700">{card.assignee}</span></span>
            </div>
            <MessageSquare size={14} className="text-gray-300 hover:text-[#2A9D87] cursor-pointer transition" />
          </div>
        )}

        {!card.okr && !card.assignee && (
          <div className="flex justify-end">
            <span className="flex items-center space-x-1 text-xs font-bold text-[#2A9D87] bg-[#2A9D87]/10 px-2 py-1 rounded-lg">
              <Zap size={12} />
              <span>+{card.xp} XP</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function CardPublicado({ card, index }) {
  const [count, setCount] = useState(0);
  const targetViews = parseInt(card.views.replace('k', '')) * 1000;

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = targetViews / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetViews) { setCount(targetViews); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const formatNum = n => n >= 1000 ? (n / 1000).toFixed(1) + 'k' : n;

  return (
    <div className="card-enter bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative h-28 bg-gradient-to-br from-[#1C003A] via-[#2D1060] to-[#0A1329] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-2 left-4 w-16 h-16 rounded-full bg-[#7C4DFF]/30 blur-xl animate-pulse" />
          <div className="absolute bottom-2 right-4 w-12 h-12 rounded-full bg-[#2A9D87]/30 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-black text-white">{formatNum(count)}</p>
            <p className="text-[10px] text-gray-400 font-medium">vistas totales</p>
          </div>
        </div>
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-1 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full">
          <Eye size={10} />
          <span>{card.views}</span>
        </div>
        <div className="absolute top-2.5 right-2.5 flex items-center space-x-1 bg-red-500/80 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          <Heart size={9} fill="white" />
          <span>{card.likes}</span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="text-sm font-bold text-gray-800">{card.title}</h4>
        <p className="text-[11px] text-gray-400">{card.desc}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center space-x-1">
            <TrendingUp size={10} />
            <span>Publicado</span>
          </span>
          <span className="flex items-center space-x-1 text-[11px] font-bold text-[#2A9D87] bg-[#2A9D87]/10 px-2 py-1 rounded-lg">
            <Zap size={11} />
            <span>+{card.xp} XP</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function ItemCompletada({ item, index }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), index * 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`flex items-start justify-between py-2.5 border-b border-gray-50 last:border-0 group hover:bg-gray-50/50 px-1 rounded-lg transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
      style={{ transitionDelay: `${index * 40}ms` }}>
      <div className="flex items-start space-x-2.5 min-w-0">
        <CheckCircle size={15} className="text-[#2A9D87] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-gray-400 line-through leading-snug truncate">{item.title}</p>
          <div className="flex items-center space-x-2 mt-0.5">
            <div className="flex items-center space-x-1">
              <Calendar size={9} className="text-gray-300" />
              <span className="text-[10px] text-gray-400">{item.date}</span>
            </div>
            {item.skill && (
              <span className="text-[9px] text-purple-500 font-semibold">{item.skill}</span>
            )}
          </div>
        </div>
      </div>
      {item.xp && (
        <span className="flex-shrink-0 text-[10px] font-bold bg-[#2A9D87]/10 text-[#2A9D87] px-2 py-1 rounded-lg ml-2 whitespace-nowrap">
          +{item.xp}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATS BAR
───────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { label: 'Misiones Activas', value: '5', icon: Rocket, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'XP Esta Semana', value: '+780', icon: Zap, color: 'text-[#2A9D87]', bg: 'bg-[#2A9D87]/10' },
    { label: 'Habilidades', value: '4', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Completadas', value: '8', icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Publicadas', value: '2', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="grid grid-cols-5 gap-3 mb-6">
      {stats.map((s, i) => (
        <div key={s.label} className="card-enter bg-white rounded-2xl p-3.5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-center space-x-3"
          style={{ animationDelay: `${i * 60}ms` }}>
          <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
            <s.icon size={16} className={s.color} />
          </div>
          <div>
            <p className="text-lg font-black text-gray-900 leading-none">{s.value}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-0.5 leading-tight">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PANTALLA PRINCIPAL
───────────────────────────────────────────── */
export default function MisionesScreen() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('todos');
  const [xpAnim, setXpAnim] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setXpAnim(v => !v), 3000);
    return () => clearInterval(t);
  }, []);

  const filters = ['todos', 'urgentes', 'diseño', 'video', 'social'];

  return (
    <>
      <style>{`
        @keyframes cardEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: cardEnter 0.4s ease both; }

        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal { animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both; }

        @keyframes xpPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(42,157,135,0); }
          50%      { box-shadow: 0 0 0 6px rgba(42,157,135,0.25); }
        }
        .xp-pulse { animation: xpPulse 3s ease-in-out infinite; }

        @keyframes floatCuate {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        .float-cuate { animation: floatCuate 2.5s ease-in-out infinite; }

        @keyframes badgeShine {
          0%   { opacity:0; left:-80px; }
          50%  { opacity:1; }
          100% { opacity:0; left:110%; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 99px; }
      `}</style>

      <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

        {/* ══ NAVBAR ══ */}
        <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2.5 w-60">
              <Search size={14} className="text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar misiones..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
              />
            </div>
            <div className="flex gap-1.5">
              {filters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold capitalize transition-all ${
                    activeFilter === f ? 'bg-[#0D1B3E] text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Inspirado</span>
            </span>
            <span className={`flex items-center space-x-1.5 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full xp-pulse transition-all ${xpAnim ? 'scale-105' : ''}`}>
              <Zap size={12} className="text-[#3AC0A6]" />
              <span>+ 500 XP</span>
            </span>
            <div className="flex items-center space-x-2 border-l border-gray-100 pl-3">
              <Bell size={17} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
              <Trophy size={17} className="text-amber-400 cursor-pointer hover:text-amber-500 transition" />
              <Settings size={17} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2A9D87] to-[#1C3581] flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-[11px] text-white font-black">LG</span>
              </div>
            </div>
          </div>
        </header>

        {/* ══ CONTENIDO ══ */}
        <main className="flex-1 p-8 max-w-[1600px] w-full">

          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center space-x-2 mb-1">
              <p className="text-xs text-gray-400">
                <span className="hover:text-gray-600 cursor-pointer">Misiones</span>
                <span className="mx-1.5">›</span>
                <span className="text-gray-600 font-medium">Panel de Operaciones</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Panel de Misiones</h1>
                <p className="text-sm text-gray-400 mt-0.5">Tu trabajo de hoy construye tu portafolio de mañana</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition shadow-sm">
                  <Filter size={14} />
                  <span>Filtrar</span>
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center space-x-2 bg-[#2A9D87] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#23897A] transition shadow-lg shadow-[#2A9D87]/25 hover:shadow-[#2A9D87]/40 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Plus size={15} />
                  <span>Nueva Misión</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <StatsBar />

          {/* Kanban */}
          <div className="grid grid-cols-4 gap-5">

            {/* Col 1 – Disponibles */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-gray-300" />
                <span className="text-sm font-bold text-gray-700">Misiones Disponibles</span>
                <span className="ml-auto text-[11px] font-bold text-gray-400 bg-gray-100 w-5 h-5 rounded-full flex items-center justify-center">{INITIAL_DATA.disponibles.length}</span>
              </div>
              <div className="space-y-3">
                {INITIAL_DATA.disponibles.map((c, i) => (
                  <CardDisponible key={c.id} card={c} index={i} />
                ))}
                <button onClick={() => setShowModal(true)} className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-xs font-semibold hover:border-[#2A9D87]/40 hover:text-[#2A9D87] transition flex items-center justify-center space-x-1.5">
                  <Plus size={13} />
                  <span>Agregar misión</span>
                </button>
              </div>
            </div>

            {/* Col 2 – Desarrollo */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm font-bold text-gray-700">Misiones en Desarrollo</span>
                <span className="ml-auto text-[11px] font-bold text-blue-500 bg-blue-50 w-5 h-5 rounded-full flex items-center justify-center">{INITIAL_DATA.desarrollo.length}</span>
              </div>
              <div className="space-y-3">
                {INITIAL_DATA.desarrollo.map((c, i) => (
                  <CardDesarrollo key={c.id} card={c} index={i} />
                ))}
              </div>
            </div>

            {/* Col 3 – Publicado */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm font-bold text-gray-700">Contenido Publicado</span>
                <span className="ml-auto text-[11px] font-bold text-green-600 bg-green-50 w-5 h-5 rounded-full flex items-center justify-center">{INITIAL_DATA.publicado.length}</span>
              </div>
              <div className="space-y-3">
                {INITIAL_DATA.publicado.map((c, i) => (
                  <CardPublicado key={c.id} card={c} index={i} />
                ))}

                {/* Total de impacto */}
                <div className="bg-gradient-to-br from-[#0D1B3E] to-[#1C3581] rounded-2xl p-4 text-center">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">Impacto Total</p>
                  <p className="text-2xl font-black text-white">67k</p>
                  <p className="text-[11px] text-[#3AC0A6] font-medium">personas alcanzadas</p>
                  <div className="flex justify-center space-x-3 mt-3">
                    <div className="text-center">
                      <p className="text-sm font-black text-white">20.5k</p>
                      <p className="text-[9px] text-gray-500">Vistas</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-sm font-black text-white">1.5k</p>
                      <p className="text-[9px] text-gray-500">Likes</p>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="text-center">
                      <p className="text-sm font-black text-white">+360</p>
                      <p className="text-[9px] text-gray-500">XP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4 – Completadas */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#2A9D87]" />
                <span className="text-sm font-bold text-gray-700">Campañas Completadas</span>
                <span className="ml-auto text-[11px] font-bold text-[#2A9D87] bg-[#2A9D87]/10 w-5 h-5 rounded-full flex items-center justify-center">{INITIAL_DATA.completadas.length}</span>
              </div>

              {/* XP Total Banner */}
              <div className="bg-gradient-to-r from-[#2A9D87] to-[#1C3581] rounded-2xl p-3 mb-3 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-white/60 font-semibold uppercase tracking-wider">XP Acumulado</p>
                  <p className="text-xl font-black text-white">+1,530 XP</p>
                </div>
                <Award size={28} className="text-white/30" />
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 divide-y divide-gray-50">
                {INITIAL_DATA.completadas.map((item, i) => (
                  <ItemCompletada key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>

          </div>
        </main>

        {/* Botón flotante Cuate */}
        <button
          className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-50 float-cuate"
          onClick={() => setShowModal(true)}
        >
          <span className="text-white font-black text-sm">CC</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center animate-pulse">1</span>
        </button>

      </div>

      {/* Modal */}
      {showModal && <NuevaMisionModal onClose={() => setShowModal(false)} />}
    </>
  );
}