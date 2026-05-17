import React, { useState } from 'react';
import {
  Award, Plus, Users, Star, Ticket,
  Shield, Rocket, Zap, Crown,
  Send, X, Package,
} from 'lucide-react';

const MEDALLAS_CAT = [
  { id:'mvp',      Icon:Crown,  label:'MVP Creativo',   color:'#F59E0B', xp:200 },
  { id:'salvador', Icon:Shield, label:'Salvavidas',      color:'#3B82F6', xp:150 },
  { id:'rocket',   Icon:Rocket, label:'Despegue Rápido', color:'#10B981', xp:100 },
  { id:'energia',  Icon:Zap,    label:'Alta Energía',    color:'#7C4DFF', xp:120 },
];

export default function CulturaAdminScreen() {
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [selectedMember, setSelectedMember] = useState('Mateo Torres');
  const [selectedMedal,  setSelectedMedal]  = useState(MEDALLAS_CAT[0]);
  const [customMsg,      setCustomMsg]      = useState('');

  const [reconocimientos, setReconocimientos] = useState([
    { id:1, to:'Mateo Torres', medalId:'mvp',      pts:200, time:'Hace 2h', msg:'Mateo, tu propuesta elevó la calidad de toda la campaña. ¡Eres un crack!' },
    { id:2, to:'Luis Mendez',  medalId:'salvador', pts:150, time:'Hace 5h', msg:'¡Gracias por salvar la edición del Reel de Entel a última hora!'           },
  ]);

  const [catalogo, setCatalogo] = useState([
    { id:1, title:'Viernes Libre',          cost:800, stock:3, category:'Tiempo'      },
    { id:2, title:'Suscripción Midjourney', cost:500, stock:5, category:'Herramienta' },
  ]);

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    setReconocimientos([{ id:Date.now(), to:selectedMember, medalId:selectedMedal.id, pts:selectedMedal.xp, time:'Ahora mismo', msg:customMsg }, ...reconocimientos]);
    setCustomMsg(''); setIsModalOpen(false);
  };

  return (
    <div className="pl-64" style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', fontFamily:'system-ui,sans-serif', background:'#F0F2F5' }}>

        {/* Topbar */}
        <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:'52px', flexShrink:0 }}>
          <div style={{ display:'flex', gap:'24px' }}>
            {['Dashboard','Misiones','Mercado'].map(t => (
              <span key={t} style={{ fontSize:'13px', color:t==='Mercado'?'#10B981':'#6B7280', fontWeight:t==='Mercado'?700:400, borderBottom:t==='Mercado'?'2px solid #10B981':'2px solid transparent', paddingBottom:'2px', cursor:'pointer' }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <span style={{ fontSize:'12px', color:'#6B7280' }}>Estado: <strong style={{ color:'#10B981' }}>Inspirado</strong></span>
            <span style={{ fontSize:'12px', fontWeight:700, color:'#10B981' }}>+ 500 XP</span>
            <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'#0D2137', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'13px' }}>A</div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex:1, overflowY:'auto', padding:'28px' }}>

          {/* Page header */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'24px' }}>
            <div>
              <h1 style={{ margin:0, fontSize:'22px', fontWeight:900, color:'#0D2137', display:'flex', alignItems:'center', gap:'8px' }}>
                <Award size={20} color="#10B981"/> Panel Administrativo de Cultura
              </h1>
              <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#6B7280' }}>Herramientas de asignación macro, auditoría de XP e incentivos para directores.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ background:'#10B981', color:'#fff', border:'none', borderRadius:'12px', padding:'10px 18px', fontSize:'12px', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:'6px', boxShadow:'0 4px 14px rgba(16,185,129,0.3)', whiteSpace:'nowrap' }}>
              <Plus size={14}/> Otorgar Reconocimiento
            </button>
          </div>

          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'24px' }}>
            {[
              { label:'Colaboradores Activos', value:'5',                                              Icon:Users,  color:'#10B981' },
              { label:'Insignias Emitidas',    value:reconocimientos.length,                           Icon:Award,  color:'#7C4DFF' },
              { label:'Total Inversión XP',    value:reconocimientos.reduce((a,r)=>a+r.pts,0),        Icon:Star,   color:'#F59E0B' },
              { label:'Items en Catálogo',     value:catalogo.length,                                 Icon:Ticket, color:'#3B82F6' },
            ].map((c,i) => (
              <div key={i} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'14px', padding:'16px', display:'flex', alignItems:'center', gap:'12px' }}>
                <div style={{ padding:'9px', borderRadius:'10px', background:`${c.color}18`, color:c.color, display:'flex' }}><c.Icon size={19}/></div>
                <div>
                  <div style={{ fontSize:'20px', fontWeight:900, color:'#0D2137' }}>{c.value}</div>
                  <div style={{ fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.05em', color:'#9CA3AF', fontWeight:600, marginTop:'1px' }}>{c.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Grid historial + inventario */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'18px' }}>

            <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'20px' }}>
              <h3 style={{ margin:'0 0 14px', fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#0D2137' }}>Historial de Reconocimientos</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {reconocimientos.map(r => {
                  const medal = MEDALLAS_CAT.find(m=>m.id===r.medalId);
                  return (
                    <div key={r.id} style={{ background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'12px', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px' }}>
                      <div>
                        <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px' }}>
                          <span style={{ fontSize:'12px', fontWeight:700, color:'#0D2137' }}>{r.to}</span>
                          <span style={{ fontSize:'10px', color:'#9CA3AF' }}>• {r.time}</span>
                        </div>
                        <p style={{ margin:0, fontSize:'11px', color:'#6B7280', fontStyle:'italic' }}>"{r.msg}"</p>
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'5px', flexShrink:0 }}>
                        <span style={{ fontSize:'10px', fontWeight:700, color:'#10B981', background:'#ECFDF5', padding:'2px 9px', borderRadius:'999px', border:'1px solid #A7F3D0' }}>+{r.pts} XP</span>
                        <span style={{ fontSize:'9px', fontWeight:700, color:'#6B7280', textTransform:'uppercase', background:'#F3F4F6', padding:'2px 7px', borderRadius:'6px' }}>{medal?.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'16px', padding:'20px' }}>
              <h3 style={{ margin:'0 0 14px', fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#0D2137' }}>Inventario de Premios</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {catalogo.map(b => (
                  <div key={b.id} style={{ background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'12px', padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <div>
                      <p style={{ margin:0, fontSize:'12px', fontWeight:700, color:'#0D2137' }}>{b.title}</p>
                      <p style={{ margin:'2px 0 0', fontSize:'10px', color:'#F59E0B', fontWeight:600 }}>⭐ {b.cost} XP</p>
                    </div>
                    <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                      <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'999px', background:b.stock>1?'#F3F4F6':'#FEF2F2', color:b.stock>1?'#374151':'#DC2626' }}>Stock: {b.stock}</span>
                      <button onClick={() => setCatalogo(p=>p.map(x=>x.id===b.id?{...x,stock:x.stock+1}:x))} style={{ fontSize:'11px', fontWeight:700, color:'#10B981', border:'1px solid #A7F3D0', background:'#ECFDF5', padding:'5px 9px', borderRadius:'8px', cursor:'pointer' }}>+ Reabastecer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* ── MODAL ── */}
      {isModalOpen && (
        <div onClick={e=>e.target===e.currentTarget&&setIsModalOpen(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
          <div style={{ background:'#fff', borderRadius:'20px', width:'100%', maxWidth:'430px', padding:'26px', position:'relative', boxShadow:'0 24px 60px rgba(0,0,0,0.2)' }}>
            <button onClick={()=>setIsModalOpen(false)} style={{ position:'absolute', top:'14px', right:'14px', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF' }}><X size={18}/></button>
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px' }}>
              <Package color="#10B981" size={17}/>
              <h2 style={{ margin:0, fontSize:'13px', fontWeight:900, color:'#0D2137', textTransform:'uppercase', letterSpacing:'0.07em' }}>Emitir Incentivo Corporativo</h2>
            </div>
            <form onSubmit={handleEnviar}>
              <label style={{ display:'block', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, color:'#6B7280', marginBottom:'6px' }}>Colaborador</label>
              <select value={selectedMember} onChange={e=>setSelectedMember(e.target.value)} style={{ width:'100%', background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'10px', padding:'8px 12px', fontSize:'12px', color:'#0D2137', outline:'none', marginBottom:'14px', boxSizing:'border-box' }}>
                {['Mateo Torres','Sofía Rocha','Luis Mendez','Valentina Cruz'].map(m=><option key={m}>{m}</option>)}
              </select>
              <label style={{ display:'block', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, color:'#6B7280', marginBottom:'6px' }}>Medalla</label>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'14px' }}>
                {MEDALLAS_CAT.map(med => (
                  <button type="button" key={med.id} onClick={()=>setSelectedMedal(med)} style={{ padding:'10px 12px', borderRadius:'10px', textAlign:'left', border:selectedMedal.id===med.id?'2px solid #10B981':'1px solid #E5E7EB', background:selectedMedal.id===med.id?'#ECFDF5':'#F9FAFB', cursor:'pointer' }}>
                    <div style={{ fontSize:'11px', fontWeight:700, color:'#0D2137' }}>{med.label}</div>
                    <div style={{ fontSize:'10px', color:'#F59E0B', marginTop:'2px' }}>+{med.xp} XP</div>
                  </button>
                ))}
              </div>
              <label style={{ display:'block', fontSize:'10px', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700, color:'#6B7280', marginBottom:'6px' }}>Mensaje</label>
              <textarea value={customMsg} onChange={e=>setCustomMsg(e.target.value)} rows={3} placeholder="Explica el logro alcanzado..." style={{ width:'100%', background:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'10px', padding:'10px 12px', fontSize:'12px', color:'#0D2137', resize:'none', outline:'none', boxSizing:'border-box', fontFamily:'inherit', marginBottom:'16px' }}/>
              <button type="submit" disabled={!customMsg.trim()} style={{ width:'100%', background:customMsg.trim()?'#10B981':'#D1D5DB', color:'#fff', border:'none', borderRadius:'12px', padding:'12px 0', fontSize:'12px', fontWeight:700, cursor:customMsg.trim()?'pointer':'not-allowed', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
                <Send size={13}/> Desplegar Puntos
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}