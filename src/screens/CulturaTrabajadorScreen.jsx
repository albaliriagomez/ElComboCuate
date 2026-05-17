import React, { useState } from 'react';
import {
  Heart, Trophy, Gift, Star, Clock, Palette,
  BookOpen, Headphones, Shield, Rocket, Zap, Crown,
  Check, AlertCircle,
} from 'lucide-react';

const MEDALLAS_CAT = [
  { id:'mvp',      Icon:Crown,  label:'MVP Creativo',   color:'#F59E0B', bg:'#FEF3C7' },
  { id:'salvador', Icon:Shield, label:'Salvavidas',      color:'#3B82F6', bg:'#DBEAFE' },
  { id:'rocket',   Icon:Rocket, label:'Despegue Rápido', color:'#10B981', bg:'#D1FAE5' },
  { id:'energia',  Icon:Zap,    label:'Alta Energía',    color:'#7C4DFF', bg:'#EDE9FE' },
];

const BENEFICIOS_CAT = [
  { id:1, title:'Viernes Libre',          desc:'Tarde completa para proyectos personales', cost:800,  category:'Tiempo',       Icon:Clock,      stock:3,  img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop' },
  { id:2, title:'Suscripción Midjourney', desc:'Plan Premium 1 mes para tu creatividad',   cost:500,  category:'Herramienta',  Icon:Palette,    stock:5,  img:'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=400&h=200&fit=crop' },
  { id:3, title:'Curso Online',           desc:'Cualquier curso de Platzi o Domestika',    cost:700,  category:'Aprendizaje',  Icon:BookOpen,   stock:10, img:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop' },
  { id:4, title:'Audífonos Premium',      desc:'Sony WH-1000XM5 para concentrarte',        cost:2000, category:'Equipamiento', Icon:Headphones, stock:1,  img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop' },
];

export default function CulturaTrabajadorScreen() {
  const [puntosXP, setPuntosXP] = useState(2450);
  const [toast,    setToast]    = useState(null);
  const [catalogo, setCatalogo] = useState(BENEFICIOS_CAT);
  const [feed, setFeed] = useState([
    { id:1, from:'Admin', to:'Mateo Torres', medalId:'mvp',      pts:200, time:'Hace 2h', msg:'Mateo, tu propuesta elevó la calidad de toda la campaña. ¡Eres un crack!', likes:12, hasLiked:false },
    { id:2, from:'Admin', to:'Luis Mendez',  medalId:'salvador', pts:150, time:'Hace 5h', msg:'¡Gracias por salvar la edición del Reel de Entel a última hora!',           likes:8,  hasLiked:false },
  ]);

  const handleLike = id => setFeed(p => p.map(r => r.id===id ? {...r, hasLiked:!r.hasLiked, likes:r.hasLiked?r.likes-1:r.likes+1} : r));

  const handleCanjear = (id, costo, titulo) => {
    if (puntosXP < costo) {
      setToast({ type:'error', text:`Saldo insuficiente. Te faltan ${costo-puntosXP} XP.` });
      setTimeout(()=>setToast(null),3000); return;
    }
    setPuntosXP(p=>p-costo);
    setCatalogo(p=>p.map(x=>x.id===id?{...x,stock:x.stock-1}:x));
    setToast({ type:'success', text:`¡Canje Exitoso! Desbloqueaste ${titulo}. Código enviado a tu WhatsApp.` });
    setTimeout(()=>setToast(null),4000);
  };

  return (
    <div className="pl-64" style={{ display:'flex', flexDirection:'column', height:'100vh', overflow:'hidden', fontFamily:'system-ui,sans-serif', background:'#F0F2F5' }}>

        {/* Toast */}
        {toast && (
          <div style={{ position:'fixed', top:'20px', right:'20px', zIndex:200, display:'flex', alignItems:'center', gap:'8px', padding:'12px 16px', borderRadius:'12px', background:toast.type==='success'?'#ECFDF5':'#FEF2F2', border:`1px solid ${toast.type==='success'?'#A7F3D0':'#FECACA'}`, color:toast.type==='success'?'#065F46':'#991B1B', boxShadow:'0 8px 24px rgba(0,0,0,0.12)', fontSize:'12px', fontWeight:700 }}>
            {toast.type==='success'?<Check size={15}/>:<AlertCircle size={15}/>} {toast.text}
          </div>
        )}

        {/* Topbar */}
        <div style={{ background:'#fff', borderBottom:'1px solid #E5E7EB', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', height:'52px', flexShrink:0 }}>
          <div style={{ display:'flex', gap:'24px' }}>
            {['Dashboard','Misiones','Mercado'].map(t=>(
              <span key={t} style={{ fontSize:'13px', color:t==='Mercado'?'#10B981':'#6B7280', fontWeight:t==='Mercado'?700:400, borderBottom:t==='Mercado'?'2px solid #10B981':'2px solid transparent', paddingBottom:'2px', cursor:'pointer' }}>{t}</span>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
            <span style={{ fontSize:'12px', color:'#6B7280' }}>Estado: <strong style={{ color:'#10B981' }}>Inspirado</strong></span>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', background:'#ECFDF5', border:'1px solid #A7F3D0', borderRadius:'12px', padding:'5px 12px' }}>
              <Star size={14} color="#F59E0B" fill="#F59E0B"/>
              <span style={{ fontSize:'13px', fontWeight:900, color:'#0D2137' }}>{puntosXP}</span>
              <span style={{ fontSize:'10px', color:'#6B7280' }}>XP</span>
            </div>
            <div style={{ width:'30px', height:'30px', borderRadius:'50%', background:'#0D2137', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontWeight:700, fontSize:'13px' }}>U</div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex:1, overflowY:'auto', padding:'28px' }}>

          {/* Page title */}
          <div style={{ marginBottom:'24px' }}>
            <h1 style={{ margin:0, fontSize:'22px', fontWeight:900, color:'#0D2137', display:'flex', alignItems:'center', gap:'8px' }}>
              <Trophy size={20} color="#F59E0B"/> Cultura &amp; Recompensas
            </h1>
            <p style={{ margin:'4px 0 0', fontSize:'12px', color:'#6B7280' }}>Celebra los logros de tu equipo y canjea tu energía acumulada.</p>
          </div>

          {/* Body: marketplace + feed */}
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'24px' }}>

            {/* Marketplace */}
            <div>
              <h2 style={{ margin:'0 0 14px', fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#6B7280', display:'flex', alignItems:'center', gap:'6px' }}>
                <Gift size={13} color="#10B981"/> Marketplace de Beneficios
              </h2>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' }}>
                {catalogo.map(item => {
                  const MIcon = item.Icon;
                  const ok = puntosXP >= item.cost && item.stock > 0;
                  return (
                    <div key={item.id} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'16px', overflow:'hidden', display:'flex', flexDirection:'column' }}>
                      <div style={{ height:'120px', overflow:'hidden', position:'relative' }}>
                        <img src={item.img} alt={item.title} style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.85 }}/>
                        <span style={{ position:'absolute', top:'10px', left:'10px', background:'rgba(13,33,55,0.85)', color:'#10B981', fontSize:'9px', fontWeight:700, padding:'3px 10px', borderRadius:'999px', textTransform:'uppercase', letterSpacing:'0.05em' }}>{item.category}</span>
                      </div>
                      <div style={{ padding:'14px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between', gap:'10px' }}>
                        <div>
                          <h3 style={{ margin:0, fontSize:'13px', fontWeight:700, color:'#0D2137', display:'flex', alignItems:'center', gap:'5px' }}>
                            <MIcon size={12} color="#9CA3AF"/> {item.title}
                          </h3>
                          <p style={{ margin:'3px 0 0', fontSize:'11px', color:'#6B7280', lineHeight:1.5 }}>{item.desc}</p>
                        </div>
                        <div>
                          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                            <span style={{ fontSize:'12px', fontWeight:700, color:'#F59E0B' }}>⭐ {item.cost} XP</span>
                            <span style={{ fontSize:'10px', fontWeight:700, padding:'2px 8px', borderRadius:'999px', background:item.stock>0?'#ECFDF5':'#FEF2F2', color:item.stock>0?'#065F46':'#DC2626' }}>
                              {item.stock>0?`${item.stock} disponibles`:'Agotado'}
                            </span>
                          </div>
                          <button disabled={!ok} onClick={()=>handleCanjear(item.id,item.cost,item.title)} style={{ width:'100%', padding:'10px 0', borderRadius:'10px', fontSize:'12px', fontWeight:700, border:'none', background:ok?'#10B981':'#E5E7EB', color:ok?'#fff':'#9CA3AF', cursor:ok?'pointer':'not-allowed', boxShadow:ok?'0 4px 10px rgba(16,185,129,0.25)':'none' }}>
                            {item.stock===0?'Agotado':'Canjear Beneficio'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feed */}
            <div>
              <h2 style={{ margin:'0 0 14px', fontSize:'11px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'#6B7280', display:'flex', alignItems:'center', gap:'6px' }}>
                <Trophy size={13} color="#F59E0B"/> Feed de Reconocimientos
              </h2>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {feed.map(r => {
                  const medal = MEDALLAS_CAT.find(m=>m.id===r.medalId);
                  const MedalIcon = medal?.Icon;
                  return (
                    <div key={r.id} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:'14px', padding:'14px' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                        <div>
                          <p style={{ margin:0, fontSize:'12px', fontWeight:700, color:'#0D2137' }}>{r.to}</p>
                          <p style={{ margin:'2px 0 0', fontSize:'10px', color:'#9CA3AF' }}>De {r.from} • {r.time}</p>
                        </div>
                        <span style={{ fontSize:'10px', fontWeight:700, color:'#F59E0B', background:'#FFFBEB', border:'1px solid #FDE68A', padding:'2px 8px', borderRadius:'999px' }}>+{r.pts} XP</span>
                      </div>
                      {medal && (
                        <div style={{ display:'inline-flex', alignItems:'center', gap:'4px', fontSize:'9px', fontWeight:700, padding:'3px 9px', borderRadius:'999px', textTransform:'uppercase', letterSpacing:'0.06em', background:`${medal.bg}60`, color:medal.color, border:`1px solid ${medal.color}30`, marginBottom:'8px' }}>
                          <MedalIcon size={9}/> {medal.label}
                        </div>
                      )}
                      <p style={{ margin:'0 0 10px', fontSize:'11px', color:'#6B7280', lineHeight:1.5, fontStyle:'italic', background:'#F9FAFB', borderRadius:'10px', padding:'8px 10px', border:'1px solid #F3F4F6' }}>
                        "{r.msg}"
                      </p>
                      <div style={{ display:'flex', justifyContent:'flex-end' }}>
                        <button onClick={()=>handleLike(r.id)} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'5px 12px', borderRadius:'999px', fontSize:'11px', fontWeight:700, border:r.hasLiked?'1px solid #FECACA':'1px solid #E5E7EB', background:r.hasLiked?'#FEF2F2':'#F9FAFB', color:r.hasLiked?'#DC2626':'#9CA3AF', cursor:'pointer' }}>
                          <Heart size={11} color={r.hasLiked?'#DC2626':'#9CA3AF'} fill={r.hasLiked?'#DC2626':'none'}/> {r.likes}
                        </button>
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