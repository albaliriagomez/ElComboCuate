import React, { useState } from 'react';
import {
  Search, Bell, Trophy, BarChart2, TrendingUp,
  Network, BookOpen, Layers, MessageCircle, LayoutGrid, Plus, Bot, ShieldCheck,
  X, CheckCircle,
} from 'lucide-react';

/* ──────────────────────────────────────
   Toggle switch
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
   Datos
────────────────────────────────────── */
const LINE_CHART = [
  { day: 'LUN', y: 70 },
  { day: 'MAR', y: 50 },
  { day: 'MIE', y: 80 },
  { day: 'JUE', y: 45 },
  { day: 'VIE', y: 65 },
  { day: 'SAB', y: 35 },
];

const INTEGRACIONES_INIT = [
  {
    name: 'Notion',
    desc: 'Sincronización automática de bases de datos y misiones estratégicas.',
    status: 'Conectado: Actualizado hace 2m',
    Icon: BookOpen,
    iconBg: 'bg-gray-900',
    iconCls: 'text-white',
    on: true,
  },
  {
    name: 'Figma',
    desc: 'Extracción de assets y variables de diseño directamente al Espacio Creativo.',
    status: 'Conectado: 48 archivos activos',
    Icon: Layers,
    iconBg: 'bg-violet-600',
    iconCls: 'text-white',
    on: true,
  },
  {
    name: 'WhatsApp',
    desc: 'Notificaciones críticas y reportes de desempeño via API Business.',
    status: 'Desconectado',
    Icon: MessageCircle,
    iconBg: 'bg-[#25D366]',
    iconCls: 'text-white',
    on: false,
  },
  {
    name: 'Trello',
    desc: 'Mapeo de tableros operativos a hitos de recompensa del Combo.',
    status: 'Conectado: 12 tableros',
    Icon: LayoutGrid,
    iconBg: 'bg-blue-500',
    iconCls: 'text-white',
    on: true,
  },
  {
    name: 'Meta Ads',
    desc: 'Seguimiento de ROI y gasto publicitario en tiempo real por proyecto.',
    status: 'Conectado: 3 cuentas',
    Icon: BarChart2,
    iconBg: 'bg-blue-700',
    iconCls: 'text-white',
    on: true,
  },
];

const W = 500;
const H = 120;
const PAD = 20;

function LineChart() {
  const xStep = (W - PAD * 2) / (LINE_CHART.length - 1);
  const points = LINE_CHART.map((d, i) => ({
    x: PAD + i * xStep,
    y: PAD + (d.y / 100) * (H - PAD * 2),
  }));

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = points[i - 1];
    const cpx = (prev.x + p.x) / 2;
    return `${acc} C ${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`;
  }, '');

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: '120px' }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2A9D87" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2A9D87" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path
          d={`${pathD} L ${points[points.length - 1].x},${H} L ${points[0].x},${H} Z`}
          fill="url(#lineGrad)"
        />
        {/* Line */}
        <path d={pathD} fill="none" stroke="#2A9D87" strokeWidth="2" strokeLinecap="round" />
        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="#2A9D87" />
        ))}
      </svg>
      {/* X labels */}
      <div className="flex justify-between px-5 mt-1">
        {LINE_CHART.map((d) => (
          <span key={d.day} className="text-[10px] text-gray-400 font-medium">{d.day}</span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────
   Pantalla
────────────────────────────────────── */
export default function AdminFounderScreen() {
  /* ── Estados base ── */
  const [integraciones,   setIntegraciones]   = useState(INTEGRACIONES_INIT);

  /* ── Nuevos estados de simulación ── */
  const [ahorroRetencion, setAhorroRetencion] = useState(42500);
  const [exportingReport, setExportingReport] = useState(false);
  const [connectingApps,  setConnectingApps]  = useState(new Set()); // apps en estado "Conectando..."
  const [reportToast,     setReportToast]     = useState(null);      // mensaje flotante o null

  /* ── handleToggleIntegration ──
     Activa/desactiva una integración por nombre.
     Al activar: muestra "Conectando..." 1.5s → "¡Conectado en vivo!" + suma $2700 al ahorro. */
  const handleToggleIntegration = (appName) => {
    setIntegraciones((prev) =>
      prev.map((item) => {
        if (item.name !== appName) return item;
        const nextOn = !item.on;
        if (nextOn) {
          // Estado de carga inmediato
          setConnectingApps((s) => new Set([...s, appName]));
          setTimeout(() => {
            // Quita el spinner y actualiza el status a "en vivo"
            setConnectingApps((s) => { const n = new Set(s); n.delete(appName); return n; });
            setIntegraciones((p) =>
              p.map((it) =>
                it.name === appName
                  ? { ...it, status: '¡Conectado en vivo!' }
                  : it
              )
            );
            // Impacto financiero visible al conectar una nueva integración
            setAhorroRetencion((prev) => prev + 2700);
          }, 1500);
          // Texto de transición mientras conecta
          return { ...item, on: true, status: 'Conectando API Business...' };
        }
        // Desactivar: reset inmediato
        return { ...item, on: false, status: 'Desconectado' };
      })
    );
  };

  /* ── handleExportarReporte ──
     Simula compilación 1.2s → toast de éxito que se cierra a los 4s. */
  const handleExportarReporte = () => {
    if (exportingReport) return;
    setExportingReport(true);
    setTimeout(() => {
      setExportingReport(false);
      setReportToast('¡Reporte Financiero de Retención generado con éxito! Enviado al correo del Founder.');
      setTimeout(() => setReportToast(null), 4000);
    }, 1200);
  };

  return (
    <div className="pl-64 min-h-screen bg-[#F4F6F5] flex flex-col">

      {/* ════ NAVBAR ════ */}
      <header className="bg-white border-b border-gray-100 px-8 h-14 flex items-center justify-between sticky top-0 z-30 shadow-sm gap-6">
        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-2 w-64 flex-shrink-0">
          <Search size={14} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar misiones, talentos o integ..."
            className="bg-transparent text-sm text-gray-600 placeholder-gray-400 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0">
          <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full">
            + 500 XP
          </span>
          <span className="flex items-center space-x-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Estado: Inspirado</span>
          </span>
          <Bell   size={17} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
          <Trophy size={17} className="text-gray-400 cursor-pointer hover:text-gray-700 transition" />
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
      <main className="flex-1 p-8 space-y-5">

        {/* Título + botón exportar */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Panel Administrativo del Founder</h1>
            <p className="text-sm text-gray-500 mt-1">
              Monitoreo macro y salud operativa del ecosistema creativo.
            </p>
          </div>
          <button
            onClick={handleExportarReporte}
            disabled={exportingReport}
            className={`relative flex items-center space-x-2 px-5 py-3 rounded-xl text-sm font-bold transition shadow-md overflow-hidden flex-shrink-0 ${
              exportingReport
                ? 'bg-[#2A9D87]/60 text-white/70 cursor-not-allowed'
                : 'bg-[#2A9D87] text-white hover:bg-[#23897A] shadow-[#2A9D87]/20'
            }`}
          >
            {exportingReport ? (
              <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            ) : (
              <BarChart2 size={15} />
            )}
            <span>{exportingReport ? 'Compilando métricas macro...' : 'Exportar Reporte Trimestral'}</span>
            {exportingReport && (
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"/>
            )}
          </button>
        </div>

        {/* ── Fila principal: Gráfica + KPI ── */}
        <div className="grid grid-cols-5 gap-5">

          {/* Índice de Continuidad (3/5) */}
          <div className="col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Índice de Continuidad de Marca</h3>
                <p className="text-xs text-gray-400 mt-0.5">Consistencia visual y operativa en todas las plataformas.</p>
              </div>
              <span className="flex items-center space-x-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-100 flex-shrink-0">
                <TrendingUp size={12} />
                <span>+12% este mes</span>
              </span>
            </div>
            <div className="mt-4">
              <LineChart />
            </div>
          </div>

          {/* Ahorro por Retención (2/5) */}
          <div className="col-span-2 bg-[#1C3581] rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div>
              <h3 className="text-sm font-extrabold text-white">Ahorro por Retención</h3>
              <p className="text-xs text-white/50 mt-1 leading-relaxed">
                Impacto financiero de la baja rotación este año.
              </p>
              {/* Indicador de integración recién conectada */}
              {ahorroRetencion > 42500 && (
                <span className="inline-flex items-center gap-1.5 mt-2 bg-[#3AC0A6]/20 text-[#3AC0A6] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#3AC0A6]/30 animate-[pulse_2s_ease-in-out_infinite]">
                  <TrendingUp size={10} />
                  IA detectó +${(ahorroRetencion - 42500).toLocaleString()} en optimizaciones
                </span>
              )}
            </div>

            <div>
              {/* Número principal — pulsa al actualizarse */}
              <p
                key={ahorroRetencion}
                className="text-4xl font-black text-white mt-4 leading-none tabular-nums animate-[pulse_0.6s_ease-out_1]"
              >
                ${ahorroRetencion.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>

              <span className="inline-flex items-center space-x-1.5 mt-3 bg-[#2A9D87]/20 text-[#3AC0A6] text-xs font-bold px-3 py-1.5 rounded-full border border-[#3AC0A6]/20">
                <ShieldCheck size={13} />
                <span>98.5% Retención de Talento</span>
              </span>

              {/* Barra de progreso meta anual — porcentaje sube con el ahorro */}
              <div className="mt-4">
                {(() => {
                  const meta   = 60000;
                  const progPct = Math.min(99, Math.round((ahorroRetencion / meta) * 100));
                  return (
                    <>
                      <div className="flex justify-between text-xs text-white/60 mb-1.5">
                        <span>Meta Anual</span>
                        <span
                          key={progPct}
                          className="font-bold text-white tabular-nums animate-[pulse_0.5s_ease-out_1]"
                        >
                          {progPct}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#2A9D87] to-[#3AC0A6] h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${progPct}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* ── Macro-Integraciones ── */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                <Network size={18} className="text-gray-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Macro-Integraciones</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Centraliza el flujo de trabajo conectando tus herramientas favoritas.
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-[#2A9D87] hover:underline flex-shrink-0 mt-1">
              Ver todas (24)
            </button>
          </div>

          {/* Contador dinámico de integrations activas */}
          <div className="flex items-center gap-3 mt-4 mb-1">
            {(() => {
              const activas = integraciones.filter((i) => i.on).length;
              return (
                <>
                  <span
                    key={activas}
                    className="text-xs font-extrabold text-[#2A9D87] tabular-nums animate-[pulse_0.5s_ease-out_1]"
                  >
                    {activas}/{integraciones.length} conectadas
                  </span>
                  <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#2A9D87] to-[#3AC0A6] h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${(activas / integraciones.length) * 100}%` }}
                    />
                  </div>
                </>
              );
            })()}
          </div>

          {/* Grid de integraciones */}
          <div className="grid grid-cols-3 gap-4 mt-3">
            {integraciones.map((integ) => {
              const Icon       = integ.Icon;
              const connecting = connectingApps.has(integ.name);
              const justLive   = integ.status === '¡Conectado en vivo!';

              return (
                <div
                  key={integ.name}
                  className={`relative rounded-xl p-4 space-y-3 border-2 transition-all duration-500 overflow-hidden ${
                    connecting
                      ? 'border-amber-300 bg-amber-50/60 shadow-md shadow-amber-200/40'
                      : integ.on
                        ? justLive
                          ? 'border-[#2A9D87] bg-[#F0FAF8] shadow-md shadow-[#2A9D87]/15'
                          : 'border-[#2A9D87]/40 bg-[#F0FAF8]/70'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  {/* Glow ring animado mientras conecta */}
                  {connecting && (
                    <span className="absolute inset-0 rounded-xl border-2 border-amber-400 animate-ping opacity-30 pointer-events-none" />
                  )}

                  {/* Badge "¡En vivo!" que aparece al conectar */}
                  {justLive && !connecting && (
                    <span className="absolute top-2 right-2 flex items-center gap-1 bg-[#2A9D87] text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-[pulse_2s_ease-in-out_infinite]">
                      <span className="w-1 h-1 rounded-full bg-white" />
                      EN VIVO
                    </span>
                  )}

                  {/* Fila: icono + nombre + toggle */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`relative w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${integ.iconBg} ${
                        integ.on ? 'shadow-md' : 'opacity-50 grayscale'
                      }`}>
                        <Icon size={17} className={integ.iconCls} />
                        {/* Halo de actividad */}
                        {integ.on && !connecting && (
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2A9D87] border-2 border-white" />
                        )}
                      </div>
                      <span className={`text-sm font-extrabold transition-colors duration-300 ${integ.on ? 'text-gray-900' : 'text-gray-400'}`}>
                        {integ.name}
                      </span>
                    </div>
                    <Toggle on={integ.on} onToggle={() => handleToggleIntegration(integ.name)} />
                  </div>

                  {/* Descripción */}
                  <p className={`text-xs leading-relaxed transition-colors duration-300 ${integ.on ? 'text-gray-500' : 'text-gray-300'}`}>
                    {integ.desc}
                  </p>

                  {/* Status con spinner / dot / texto */}
                  <div className={`flex items-center space-x-1.5 text-[10px] font-semibold transition-colors duration-300 ${
                    connecting ? 'text-amber-600' : integ.on ? 'text-[#2A9D87]' : 'text-gray-400'
                  }`}>
                    {connecting ? (
                      <svg className="animate-spin flex-shrink-0" width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        integ.on ? 'bg-[#2A9D87] animate-pulse' : 'bg-gray-300'
                      }`} />
                    )}
                    <span key={integ.status} className="animate-[pulse_0.4s_ease-out_1]">
                      {integ.status}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Nueva Integración — tarjeta punteada */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:border-[#2A9D87]/40 transition min-h-[130px]">
              <div className="w-9 h-9 rounded-full bg-[#2A9D87]/10 flex items-center justify-center">
                <Plus size={18} className="text-[#2A9D87]" />
              </div>
              <p className="text-xs font-extrabold text-gray-700 text-center">Nueva Integración</p>
              <p className="text-[10px] text-gray-400 text-center">Explora el Marketplace de Cuate</p>
            </div>
          </div>
        </div>

        {/* ── Footer bar ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between gap-4">

          {/* Cultura interna */}
          <div className="flex items-center space-x-3">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                Cultura Interna
              </p>
              <div className="flex items-center space-x-1.5">
                <div className="flex -space-x-2">
                  {[
                    'photo-1534528741775-53994a69daeb',
                    'photo-1507003211169-0a1dd7228f2d',
                    'photo-1494790108377-be9c29b29330',
                  ].map((slug, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/${slug}?w=50`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-500">
                    +12
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Próximo hito */}
          <div className="flex items-center space-x-2 flex-1 justify-center">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                Próximo Hito
              </p>
              <div className="flex items-center space-x-2">
                <ShieldCheck size={15} className="text-[#2A9D87] flex-shrink-0" />
                <p className="text-xs font-bold text-gray-800">
                  Certificación "Empresa Creativa AA"
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button className="bg-white border border-gray-200 text-gray-600 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-gray-50 transition">
              Ver Logs de Sistema
            </button>
            <button className="bg-[#1C3581] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition shadow-md shadow-[#1C3581]/20">
              Gestionar Membresías
            </button>
          </div>
        </div>
      </main>

      {/* Toast — Reporte exportado */}
      {reportToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-start gap-4 bg-white border border-green-200 rounded-2xl px-5 py-4 shadow-2xl shadow-green-900/10 max-w-sm w-full">
          <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle size={18} className="text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-gray-900 leading-tight">Reporte generado</p>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">{reportToast}</p>
          </div>
          <button onClick={() => setReportToast(null)} className="text-gray-300 hover:text-gray-600 transition flex-shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Botón flotante */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-[#2A9D87] rounded-full shadow-lg shadow-[#2A9D87]/40 flex items-center justify-center hover:scale-110 transition-transform z-50">
        <Bot size={20} className="text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center">2</span>
      </button>
    </div>
  );
}
