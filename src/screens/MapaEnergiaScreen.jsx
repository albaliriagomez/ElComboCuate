import React, { useState } from 'react';
import {
  Search, Bell, Trophy, Settings,
  TrendingUp, TrendingDown, AlertTriangle,
  Coffee, X, CheckCircle, Zap,
} from 'lucide-react';

/* ══════════════════════════════════════════════════════
   DATOS ESTÁTICOS: Equipo — fuente de verdad del estado
   Refleja exactamente los colores y porcentajes de la UI
══════════════════════════════════════════════════════ */
const TEAM_ENERGY_DATA = [
  {
    name:      'Elena Ramos',
    role:      'Lead UI/UX Designer',
    img:       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    status:    'Estable',
    statusCls: 'text-green-600',
    statusBg:  'bg-green-50 border-green-200',
    ring:      'ring-green-500',
    energia:   92,
    Icon:      TrendingUp,
    iconCls:   'text-green-400',
    barColor:  'bg-green-500',
  },
  {
    name:      'Marcos Silva',
    role:      'Fullstack Developer',
    img:       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
    status:    'En Riesgo',
    statusCls: 'text-yellow-600',
    statusBg:  'bg-yellow-50 border-yellow-200',
    ring:      'ring-yellow-400',
    energia:   64,
    Icon:      TrendingDown,
    iconCls:   'text-yellow-400',
    barColor:  'bg-yellow-400',
  },
  {
    name:      'Julián Ortiz',
    role:      'Product Manager',
    img:       'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120',
    status:    'Burnout',
    statusCls: 'text-red-600',
    statusBg:  'bg-red-50 border-red-200',
    ring:      'ring-red-500',
    energia:   31,
    Icon:      AlertTriangle,
    iconCls:   'text-red-400',
    barColor:  'bg-red-500',
  },
];

/* ══════════════════════════════════════════════════════
   DATOS HISTÓRICOS: Gráfica de barras recalculada
   por empleado — vista diaria de la semana actual
══════════════════════════════════════════════════════ */
const CHART_BY_EMPLOYEE = {
  default: [
    { name: 'Elena',  carga: 65, energia: 85 },
    { name: 'Marcos', carga: 80, energia: 48 },
    { name: 'Julián', carga: 92, energia: 22 },
    { name: 'Lucía',  carga: 48, energia: 72 },
    { name: 'Tomás',  carga: 62, energia: 62 },
  ],
  'Elena Ramos': [
    { name: 'Lun', carga: 52, energia: 95 },
    { name: 'Mar', carga: 58, energia: 91 },
    { name: 'Mié', carga: 60, energia: 89 },
    { name: 'Jue', carga: 55, energia: 94 },
    { name: 'Vie', carga: 48, energia: 92 },
  ],
  'Marcos Silva': [
    { name: 'Lun', carga: 74, energia: 72 },
    { name: 'Mar', carga: 82, energia: 61 },
    { name: 'Mié', carga: 88, energia: 50 },
    { name: 'Jue', carga: 93, energia: 39 },
    { name: 'Vie', carga: 80, energia: 64 },
  ],
  'Julián Ortiz': [
    { name: 'Lun', carga: 87, energia: 44 },
    { name: 'Mar', carga: 92, energia: 36 },
    { name: 'Mié', carga: 96, energia: 27 },
    { name: 'Jue', carga: 99, energia: 19 },
    { name: 'Vie', carga: 91, energia: 31 },
  ],
};

const CHART_TITLE_BY_EMPLOYEE = {
  default:       'Balance de Carga de Trabajo vs. Energía — Equipo',
  'Elena Ramos': 'Historial Semanal · Elena Ramos · Tendencia Estable ✅',
  'Marcos Silva':'Historial Semanal · Marcos Silva · Sobrecarga Progresiva ⚠️',
  'Julián Ortiz':'Historial Semanal · Julián Ortiz · Zona Crítica de Burnout 🔴',
};

const HISTORIAL = [
  { dot: 'bg-blue-500',   title: 'Pico de energía detectado',      sub: 'Hace 2 horas · Proyecto Alpha'      },
  { dot: 'bg-yellow-400', title: 'Marcos entró en zona de riesgo', sub: 'Hace 5 horas · Sobrecarga de tareas' },
  { dot: 'bg-green-500',  title: 'Sesión de Focus completada',      sub: 'Hace 8 horas · Equipo Diseño'       },
];

const MAX_H = 160; // px — altura máxima de las barras

/* ══════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL
══════════════════════════════════════════════════════ */
export default function MapaEnergiaScreen() {

  /* ── 1. Estados de simulación ── */
  const [teamEnergyData]   = useState(TEAM_ENERGY_DATA);
  const [selectedEmployee,  setSelectedEmployee]  = useState(null);
  const [julianStatus,      setJulianStatus]      = useState({ status: 'Burnout', energia: 31, carga: 85 });
  const [isIntervening,     setIsIntervening]     = useState(false);
  const [interventionToast, setInterventionToast] = useState(false);

  /* ── Estados auxiliares de UI ── */
  const [interventionModal,  setInterventionModal]  = useState(null);
  const [interventionTarget, setInterventionTarget] = useState('Julián Ortiz');

  /* ── Datos del gráfico — patcha la barra de Julián con julianStatus en tiempo real ── */
  const rawChartData = CHART_BY_EMPLOYEE[selectedEmployee] ?? CHART_BY_EMPLOYEE.default;
  const chartData = rawChartData.map((d) => {
    if (!selectedEmployee && d.name === 'Julián')
      return { ...d, carga: julianStatus.carga, energia: julianStatus.energia };
    if (selectedEmployee === 'Julián Ortiz' && d.name === 'Vie')
      return { ...d, carga: julianStatus.carga, energia: julianStatus.energia };
    return d;
  });
  const chartTitle = CHART_TITLE_BY_EMPLOYEE[selectedEmployee] ?? CHART_TITLE_BY_EMPLOYEE.default;

  /* ── 2a. handleIntervenir — botón "Intervenir Ahora" ── */
  const handleIntervenir = (employeeName) => {
    if (isIntervening) return;
    setIsIntervening(true);
    setTimeout(() => {
      setIsIntervening(false);
      setJulianStatus({ status: 'En Intervención', energia: 55, carga: 45 });
      setInterventionToast(true);
      setTimeout(() => setInterventionToast(false), 4500);
    }, 1500);
  };

  /* ── 2b. handleEmployeeClick — clic en tarjeta del equipo ── */
  const handleEmployeeClick = (employeeName) => {
    // Toggle: si ya está seleccionado, vuelve a la vista general
    const next = selectedEmployee === employeeName ? null : employeeName;
    setSelectedEmployee(next);
    // Si se selecciona Julián o Marcos, apunta el botón de intervención a ese empleado
    if (next && next !== 'Elena Ramos') {
      setInterventionTarget(next);
    } else if (!next) {
      setInterventionTarget('Julián Ortiz');
    }
  };

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════ NAVBAR ════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2.5 w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar en el equipo..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            +500 XP
          </span>
          <Bell     size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Trophy   size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Settings size={18} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
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
      <main className="flex-1 p-8 flex gap-6">

        {/* ── Columna principal ── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Título + leyenda */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">Founder's Radar</h1>
              <p className="text-sm text-gray-500 mt-1">
                Monitoreo de estabilidad emocional y energía del equipo en tiempo real.
              </p>
            </div>
            <div className="flex items-center space-x-5 text-xs font-semibold text-gray-600 pt-1 flex-shrink-0">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500" /><span>Estable</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-400" /><span>Riesgo</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" /><span>Burnout</span>
              </span>
            </div>
          </div>

          {/* ── Cards de miembros — clic activa handleEmployeeClick ── */}
          {selectedEmployee && (
            <div className="flex items-center space-x-2 bg-[#1C3581]/8 border border-[#1C3581]/15 rounded-xl px-4 py-2.5">
              <Zap size={13} className="text-[#1C3581]" />
              <p className="text-xs font-bold text-[#1C3581]">
                Mostrando historial de <span className="text-gray-900">{selectedEmployee}</span>
              </p>
              <button
                onClick={() => handleEmployeeClick(selectedEmployee)}
                className="ml-auto text-gray-400 hover:text-gray-700 transition"
              >
                <X size={13} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            {teamEnergyData.map((m) => {
              const isSelected  = selectedEmployee === m.name;
              const isJulian    = m.name === 'Julián Ortiz';
              const intervened  = isJulian && julianStatus.status === 'En Intervención';

              const displayStatus    = isJulian ? julianStatus.status  : m.status;
              const displayEnergia   = isJulian ? julianStatus.energia : m.energia;
              const displayStatusCls = intervened ? 'text-blue-600'              : m.statusCls;
              const displayStatusBg  = intervened ? 'bg-blue-50 border-blue-200' : m.statusBg;
              const displayBarColor  = intervened ? 'bg-blue-400'                : m.barColor;
              const DisplayIcon      = intervened ? TrendingUp                    : m.Icon;
              const displayIconCls   = intervened ? 'text-blue-400'              : m.iconCls;

              return (
                <div
                  key={m.name}
                  onClick={() => handleEmployeeClick(m.name)}
                  className={`bg-white rounded-2xl p-5 border shadow-sm cursor-pointer transition-all duration-300 select-none ${
                    isSelected
                      ? 'border-[#1C3581] ring-2 ring-[#1C3581]/20 shadow-md scale-[1.02]'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-md hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-full overflow-hidden ring-4 ring-offset-2 transition-all duration-300 ${
                      isSelected ? 'ring-[#1C3581]' : m.ring
                    }`}>
                      <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <DisplayIcon size={18} className={displayIconCls} />
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900">{m.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 mb-4">{m.role}</p>

                  {/* Barra de energía */}
                  <div className="mb-3">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`${displayBarColor} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${displayEnergia}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      key={displayStatus}
                      className={`text-xs font-bold px-2 py-0.5 rounded-full border animate-[pulse_0.5s_ease-out_1] ${displayStatusBg} ${displayStatusCls}`}
                    >
                      {displayStatus}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">Energía: <strong>{displayEnergia}%</strong></span>
                  </div>

                  {/* Indicador de selección */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C3581] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#1C3581]">Analizando historial semanal...</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Gráfica de barras — datos reactivos a selectedEmployee ── */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  key={chartTitle}
                  className="text-sm font-bold text-gray-800 transition-all animate-[pulse_0.5s_ease-out_1]"
                >
                  {chartTitle}
                </h3>
                {selectedEmployee && (
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Datos históricos de la semana actual · Recalculado en tiempo real
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-5 text-xs font-semibold flex-shrink-0">
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#1C3581]" />
                  <span className="text-gray-600">Carga</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#E76F51]" />
                  <span className="text-gray-600">Energía</span>
                </span>
              </div>
            </div>

            {/* Barras — altura animada con transition-all */}
            <div
              className="flex items-end justify-around gap-2 border-b border-gray-100"
              style={{ height: `${MAX_H}px` }}
            >
              {chartData.map((d) => (
                <div
                  key={`${selectedEmployee ?? 'default'}-${d.name}`}
                  className="flex items-end justify-center gap-1.5 flex-1"
                  style={{ height: `${MAX_H}px` }}
                >
                  <div
                    className="bg-[#1C3581] rounded-t-md w-5 transition-all duration-700 ease-out"
                    style={{ height: `${(d.carga / 100) * MAX_H}px` }}
                  />
                  <div
                    className="bg-[#E76F51] rounded-t-md w-5 transition-all duration-700 ease-out"
                    style={{ height: `${(d.energia / 100) * MAX_H}px` }}
                  />
                </div>
              ))}
            </div>

            {/* Etiquetas */}
            <div className="flex justify-around mt-3">
              {chartData.map((d) => (
                <div key={d.name} className="flex-1 text-center">
                  <span className="text-xs text-gray-500 font-medium">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Panel derecho ── */}
        <div className="w-64 flex-shrink-0 space-y-4">

          {/* Alerta crítica — botón conectado a handleIntervenir */}
          <div className="bg-white border-2 border-red-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle size={17} className="text-red-500" />
              <span className="text-sm font-extrabold text-red-600">Alerta Crítica</span>
            </div>
            <h4 className="text-base font-extrabold text-gray-900 leading-snug mb-2">
              Riesgo de Rotación Temprana
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-1">
              Exceso de revisiones detectado en Desarrollo. <strong>{interventionTarget}</strong> muestra
              patrones de fatiga cognitiva altos.
            </p>
            <p className="text-[10px] text-gray-400 mb-4 italic">
              {selectedEmployee ? `← Empleado activo: ${selectedEmployee}` : 'Selecciona una tarjeta para enfocar'}
            </p>

            <button
              onClick={() => handleIntervenir(interventionTarget)}
              disabled={isIntervening || julianStatus.status === 'En Intervención'}
              className={`w-full flex items-center justify-center space-x-2 font-bold py-2.5 rounded-xl text-sm transition-all duration-300 shadow-md relative overflow-hidden ${
                isIntervening
                  ? 'bg-red-400 text-white/80 cursor-not-allowed'
                  : julianStatus.status === 'En Intervención'
                  ? 'bg-blue-500 text-white cursor-default shadow-blue-500/20'
                  : 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30'
              }`}
            >
              {isIntervening ? (
                <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <span>Enviando Apoyo...</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]" />
                </>
              ) : julianStatus.status === 'En Intervención' ? (
                <>
                  <CheckCircle size={14} />
                  <span>Intervención Activa ✓</span>
                </>
              ) : (
                <>
                  <Coffee size={14} />
                  <span>Intervenir Ahora</span>
                </>
              )}
            </button>
          </div>

          {/* Historial de energía */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Historial de Energía
            </p>
            <div className="space-y-4">
              {HISTORIAL.map((h, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <span className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${h.dot}`} />
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-snug">{h.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{h.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-5 bg-white border border-gray-200 text-gray-600 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-50 transition">
              Ver Reporte Completo
            </button>
          </div>
        </div>
      </main>

      {/* ════ MODAL — Intervención exitosa ════ */}
      {interventionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(3px)' }}
          onClick={(e) => e.target === e.currentTarget && setInterventionModal(null)}
        >
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Banda verde superior */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-400 px-6 py-5 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Coffee size={22} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">
                  Cuate AI · Intervención IA
                </p>
                <h3 className="text-base font-extrabold text-white leading-tight mt-0.5">
                  ¡Intervención Registrada!
                </h3>
              </div>
            </div>

            {/* Cuerpo */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  Invitación de <strong>café virtual</strong> enviada a{' '}
                  <span className="font-extrabold text-gray-900">{interventionModal.name}</span>{' '}
                  para una charla de apoyo. Intervención registrada.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-3 space-y-1.5 border border-gray-100">
                {[
                  '✅ Notificación empática enviada por Cuate AI',
                  '📋 Caso registrado en el Radar del Founder',
                  '🔔 Seguimiento programado en 24 horas',
                ].map((item) => (
                  <p key={item} className="text-xs text-gray-600 font-medium">{item}</p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setInterventionModal(null)}
                className="w-full bg-[#1C3581] text-white font-extrabold py-3 rounded-xl text-sm hover:opacity-90 transition shadow-lg shadow-[#1C3581]/20"
              >
                Entendido · Continuar Monitoreando
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast — Intervención exitosa */}
      {interventionToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-start gap-4 bg-white border border-green-200 rounded-2xl px-5 py-4 shadow-2xl shadow-green-900/10 max-w-sm w-full">
          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} className="text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-gray-900 leading-tight">¡Intervención Exitosa!</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Alerta mitigada. Se programó una sesión de focus y un café virtual automático con Julián.
            </p>
          </div>
          <button onClick={() => setInterventionToast(false)} className="text-gray-300 hover:text-gray-600 transition flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Bot flotante */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-40">
        <span className="text-white text-xl">🤖</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">1</span>
      </button>
    </div>
  );
}
