import { useState, useRef } from "react";

// ══════════════════════════════════════════════════════════════
// DATOS REALES — Ranking FIFA abril 2026 + Panini 2026
// 48 equipos · 20 figuritas c/u · 980 total
// ══════════════════════════════════════════════════════════════
const EQUIPOS = [
  { id: 1,  rank: 1,  nombre:"Francia",        ban:"🇫🇷", conf:"UEFA",     c1:"#002395", c2:"#ED2939", fi:1   },
  { id: 2,  rank: 2,  nombre:"España",          ban:"🇪🇸", conf:"UEFA",     c1:"#AA151B", c2:"#F1BF00", fi:21  },
  { id: 3,  rank: 3,  nombre:"Argentina",       ban:"🇦🇷", conf:"CONMEBOL", c1:"#74ACDF", c2:"#FFFFFF", fi:41  },
  { id: 4,  rank: 4,  nombre:"Inglaterra",      ban:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", conf:"UEFA",     c1:"#CF142B", c2:"#FFFFFF", fi:61  },
  { id: 5,  rank: 5,  nombre:"Portugal",        ban:"🇵🇹", conf:"UEFA",     c1:"#006600", c2:"#FF0000", fi:81  },
  { id: 6,  rank: 6,  nombre:"Brasil",          ban:"🇧🇷", conf:"CONMEBOL", c1:"#009C3B", c2:"#FEDD00", fi:101 },
  { id: 7,  rank: 7,  nombre:"Países Bajos",    ban:"🇳🇱", conf:"UEFA",     c1:"#FF6600", c2:"#FFFFFF", fi:121 },
  { id: 8,  rank: 8,  nombre:"Marruecos",       ban:"🇲🇦", conf:"CAF",      c1:"#C1272D", c2:"#006233", fi:141 },
  { id: 9,  rank: 9,  nombre:"Bélgica",         ban:"🇧🇪", conf:"UEFA",     c1:"#1a1714", c2:"#FFD900", fi:161 },
  { id:10,  rank:10,  nombre:"Alemania",         ban:"🇩🇪", conf:"UEFA",     c1:"#1a1714", c2:"#DD0000", fi:181 },
  { id:11,  rank:13,  nombre:"Colombia",         ban:"🇨🇴", conf:"CONMEBOL", c1:"#FCD116", c2:"#003087", fi:201 },
  { id:12,  rank:14,  nombre:"Uruguay",          ban:"🇺🇾", conf:"CONMEBOL", c1:"#5B9BD5", c2:"#FFFFFF", fi:221 },
  { id:13,  rank:15,  nombre:"México",           ban:"🇲🇽", conf:"CONCACAF", c1:"#006847", c2:"#CE1126", fi:241 },
  { id:14,  rank:16,  nombre:"Estados Unidos",   ban:"🇺🇸", conf:"CONCACAF", c1:"#B22234", c2:"#3C3B6E", fi:261 },
  { id:15,  rank:17,  nombre:"Senegal",          ban:"🇸🇳", conf:"CAF",      c1:"#00853F", c2:"#FDEF42", fi:281 },
  { id:16,  rank:18,  nombre:"Japón",            ban:"🇯🇵", conf:"AFC",      c1:"#BC002D", c2:"#FFFFFF", fi:301 },
  { id:17,  rank:19,  nombre:"Suiza",            ban:"🇨🇭", conf:"UEFA",     c1:"#FF0000", c2:"#FFFFFF", fi:321 },
  { id:18,  rank:20,  nombre:"Austria",          ban:"🇦🇹", conf:"UEFA",     c1:"#ED2939", c2:"#FFFFFF", fi:341 },
  { id:19,  rank:21,  nombre:"Corea del Sur",    ban:"🇰🇷", conf:"AFC",      c1:"#CD2E3A", c2:"#003478", fi:361 },
  { id:20,  rank:22,  nombre:"Australia",        ban:"🇦🇺", conf:"AFC",      c1:"#006400", c2:"#FFCD00", fi:381 },
  { id:21,  rank:23,  nombre:"Noruega",          ban:"🇳🇴", conf:"UEFA",     c1:"#EF2B2D", c2:"#FFFFFF", fi:401 },
  { id:22,  rank:24,  nombre:"Türkiye",          ban:"🇹🇷", conf:"UEFA",     c1:"#E30A17", c2:"#FFFFFF", fi:421 },
  { id:23,  rank:25,  nombre:"Escocia",          ban:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", conf:"UEFA",     c1:"#003DA5", c2:"#FFFFFF", fi:441 },
  { id:24,  rank:26,  nombre:"Croacia",          ban:"🇭🇷", conf:"UEFA",     c1:"#CC1313", c2:"#FFFFFF", fi:461 },
  { id:25,  rank:27,  nombre:"Ecuador",          ban:"🇪🇨", conf:"CONMEBOL", c1:"#CC8800", c2:"#003DA5", fi:481 },
  { id:26,  rank:28,  nombre:"Irán",             ban:"🇮🇷", conf:"AFC",      c1:"#239F40", c2:"#FFFFFF", fi:501 },
  { id:27,  rank:29,  nombre:"Czechia",          ban:"🇨🇿", conf:"UEFA",     c1:"#D7141A", c2:"#11457E", fi:521 },
  { id:28,  rank:30,  nombre:"Canadá",           ban:"🇨🇦", conf:"CONCACAF", c1:"#FF0000", c2:"#FFFFFF", fi:541 },
  { id:29,  rank:31,  nombre:"Suecia",           ban:"🇸🇪", conf:"UEFA",     c1:"#006AA7", c2:"#FECC02", fi:561 },
  { id:30,  rank:32,  nombre:"Bosnia y Herz.",   ban:"🇧🇦", conf:"UEFA",     c1:"#003DA5", c2:"#FFCD00", fi:581 },
  { id:31,  rank:33,  nombre:"Arabia Saudita",   ban:"🇸🇦", conf:"AFC",      c1:"#006C35", c2:"#FFFFFF", fi:601 },
  { id:32,  rank:34,  nombre:"Argelia",          ban:"🇩🇿", conf:"CAF",      c1:"#006233", c2:"#FFFFFF", fi:621 },
  { id:33,  rank:35,  nombre:"Costa de Marfil",  ban:"🇨🇮", conf:"CAF",      c1:"#F77F00", c2:"#009A44", fi:641 },
  { id:34,  rank:36,  nombre:"Venezuela",        ban:"🇻🇪", conf:"CONMEBOL", c1:"#CF142B", c2:"#003DA5", fi:661 },
  { id:35,  rank:37,  nombre:"Uzbekistán",       ban:"🇺🇿", conf:"AFC",      c1:"#1EB53A", c2:"#FFFFFF", fi:681 },
  { id:36,  rank:38,  nombre:"Egipto",           ban:"🇪🇬", conf:"CAF",      c1:"#CE1126", c2:"#000000", fi:701 },
  { id:37,  rank:39,  nombre:"Ghana",            ban:"🇬🇭", conf:"CAF",      c1:"#006B3F", c2:"#FCD116", fi:721 },
  { id:38,  rank:40,  nombre:"Túnez",            ban:"🇹🇳", conf:"CAF",      c1:"#E70013", c2:"#FFFFFF", fi:741 },
  { id:39,  rank:41,  nombre:"Sudáfrica",        ban:"🇿🇦", conf:"CAF",      c1:"#007A4D", c2:"#FFB81C", fi:761 },
  { id:40,  rank:42,  nombre:"Jordania",         ban:"🇯🇴", conf:"AFC",      c1:"#007A3D", c2:"#CE1126", fi:781 },
  { id:41,  rank:43,  nombre:"Qatar",            ban:"🇶🇦", conf:"AFC",      c1:"#8D1B3D", c2:"#FFFFFF", fi:801 },
  { id:42,  rank:44,  nombre:"Cabo Verde",       ban:"🇨🇻", conf:"CAF",      c1:"#003893", c2:"#CF2027", fi:821 },
  { id:43,  rank:45,  nombre:"Panamá",           ban:"🇵🇦", conf:"CONCACAF", c1:"#DA121A", c2:"#003F87", fi:841 },
  { id:44,  rank:50,  nombre:"DR Congo",         ban:"🇨🇩", conf:"CAF",      c1:"#0062AF", c2:"#F7D918", fi:861 },
  { id:45,  rank:55,  nombre:"Jamaica",          ban:"🇯🇲", conf:"CONCACAF", c1:"#1a1714", c2:"#FED100", fi:881 },
  { id:46,  rank:60,  nombre:"Irak",             ban:"🇮🇶", conf:"AFC",      c1:"#007A3D", c2:"#CE1126", fi:901 },
  { id:47,  rank:73,  nombre:"Curazao",          ban:"🇨🇼", conf:"CONCACAF", c1:"#003DA5", c2:"#F7D018", fi:921 },
  { id:48,  rank:85,  nombre:"Nueva Zelanda",    ban:"🇳🇿", conf:"OFC",      c1:"#00247D", c2:"#CC142B", fi:941 },
];

const ESPECIALES = Array.from({length:20},(_,i)=>({
  numero:961+i,
  label:["MetLife NJ","SoFi LA","AT&T Dallas","Levi's SF","Rose Bowl","Hard Rock Miami",
         "Gillette Boston","Lincoln Phila","Arrowhead KC","Lumen Seattle","MB Atlanta",
         "Azteca MX","BBVA Monterrey","Akron GDL","BC Place VAN","BMO Toronto",
         "Logo Copa","Sede EEUU","Historia","Trofeo FIFA"][i],
}));

const CONF_COL = { UEFA:"#4FC3F7", CONMEBOL:"#81C784", CAF:"#FFB74D", AFC:"#F06292", CONCACAF:"#CE93D8", OFC:"#80DEEA" };
const CONF_LBL = { UEFA:"Europa", CONMEBOL:"Sudamérica", CAF:"África", AFC:"Asia", CONCACAF:"CONCACAF", OFC:"Oceanía" };

const PUNTOS = [
  { nombre:"Parque Rodó",        tipo:"🌳", barrio:"Parque Rodó",   activos:4, horario:"9:00–20:00" },
  { nombre:"Plaza Independencia",tipo:"🏛️", barrio:"Ciudad Vieja",  activos:7, horario:"8:00–22:00" },
  { nombre:"Tres Cruces",        tipo:"🏬", barrio:"Tres Cruces",   activos:2, horario:"10:00–22:00"},
  { nombre:"Parque Batlle",      tipo:"🌳", barrio:"Parque Batlle", activos:3, horario:"9:00–19:00" },
  { nombre:"Rambla Pocitos",     tipo:"🌊", barrio:"Pocitos",       activos:6, horario:"7:00–21:00" },
];
const PUNTO_COLS = ["#00C896","#FFD166","#6C63FF","#FF6B35","#06D6A0"];

const MOCK_CHAT = [
  {de:"Rodrigo M.", txt:"Hola! Te interesa cambiar Argentina #43 por Francia #8?", mio:false},
  {de:"Yo",         txt:"Dale! ¿En Parque Rodó el sábado a las 11?",               mio:true },
  {de:"Rodrigo M.", txt:"Perfecto, nos vemos en la entrada principal 🤝",           mio:false},
];

const initEstado = () => {
  const o = {};
  EQUIPOS.forEach(eq=>{ for(let i=0;i<20;i++) o[eq.fi+i]=0; });
  ESPECIALES.forEach(e=>{ o[e.numero]=0; });
  return o;
};

const getC = v => v===0
  ? {bg:"rgba(255,255,255,0.04)",br:"rgba(255,255,255,0.1)", tx:"#2a2a2a", lbl:""}
  : v===1
  ? {bg:"rgba(0,200,150,0.22)",  br:"#00C896",               tx:"#00C896", lbl:"✓"}
  : {bg:"rgba(255,209,102,0.26)",br:"#FFD166",               tx:"#FFD166", lbl:`×${v}`};

const colorEq = eq => eq.c1==="#1a1714" ? eq.c2 : eq.c1;

function Stars({n}){
  return <span style={{color:"#FFD166",fontSize:10}}>{"★".repeat(n)}{"☆".repeat(5-n)}</span>;
}
function Chip({c,lbl}){
  return <span style={{background:`${c}22`,border:`1px solid ${c}55`,color:c,borderRadius:10,padding:"1px 7px",fontSize:9,fontWeight:"bold"}}>{lbl}</span>;
}

export default function FiguraYa() {
  const [tab,       setTab]       = useState("album");
  const [eqIdx,     setEqIdx]     = useState(0);
  const [estado,    setEstado]    = useState(initEstado);
  const [filtroConf,setFiltroConf]= useState("TODOS");
  const [busqueda,  setBusqueda]  = useState("");
  const [verEsp,    setVerEsp]    = useState(false);
  const [puntoSel,  setPuntoSel]  = useState(null);
  const [chatMsgs,  setChatMsgs]  = useState(MOCK_CHAT);
  const [chatIn,    setChatIn]    = useState("");
  const [confirmado,setConfirmado]= useState(false);
  const [showRev,   setShowRev]   = useState(false);
  const [revScore,  setRevScore]  = useState(0);
  const [revDone,   setRevDone]   = useState(false);

  // swipe
  const [touchX,    setTouchX]   = useState(null);
  const [dragX,     setDragX]    = useState(0);
  const [dragging,  setDragging] = useState(false);

  const eq   = EQUIPOS[eqIdx];
  const figs = Array.from({length:20},(_,i)=>eq.fi+i);
  const eCol = colorEq(eq);

  // Stats globales
  const allVals  = Object.values(estado);
  const pegadas  = allVals.filter(v=>v>=1).length;
  const repetidas= allVals.filter(v=>v>1).reduce((a,v)=>a+(v-1),0);
  const faltan   = 980 - pegadas;
  const pct      = Math.round((pegadas/980)*100);

  // Stats equipo actual
  const eqPeg = figs.filter(n=>(estado[n]||0)>=1).length;
  const eqRep = figs.filter(n=>(estado[n]||0)>1).reduce((a,n)=>a+(estado[n]-1),0);
  const eqPct = Math.round((eqPeg/20)*100);

  const cambiar = (num,d) => setEstado(p=>({...p,[num]:Math.max(0,(p[num]||0)+d)}));
  const goEq    = d => { const n=eqIdx+d; if(n>=0&&n<48) setEqIdx(n); };

  const onTS = e=>{setTouchX(e.touches[0].clientX);setDragging(true);};
  const onTM = e=>{if(dragging&&touchX!==null)setDragX(e.touches[0].clientX-touchX);};
  const onTE = ()=>{if(Math.abs(dragX)>55)goEq(dragX<0?1:-1);setDragX(0);setDragging(false);setTouchX(null);};

  const sendChat = ()=>{if(!chatIn.trim())return;setChatMsgs(p=>[...p,{de:"Yo",txt:chatIn,mio:true}]);setChatIn("");};
  const confirmar= ()=>{setConfirmado(true);setTimeout(()=>setShowRev(true),600);};
  const doReview = s=>{setRevScore(s);setTimeout(()=>{setShowRev(false);setRevDone(true);},400);};

  const confs    = ["TODOS",...Object.keys(CONF_COL)];
  const filtrados= EQUIPOS.filter(e=>
    (filtroConf==="TODOS"||e.conf===filtroConf)&&
    (busqueda===""||e.nombre.toLowerCase().includes(busqueda.toLowerCase()))
  );

  return (
    <div style={{fontFamily:"'Georgia',serif",background:"linear-gradient(160deg,#060810 0%,#0b1828 55%,#06100a 100%)",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px 12px 50px",color:"#f0f0f0"}}>

      {/* ── HEADER ── */}
      <div style={{textAlign:"center",marginBottom:16,width:"100%",maxWidth:400}}>
        <div style={{fontSize:32,fontWeight:"bold",background:"linear-gradient(90deg,#00C896,#FFD166)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>FiguraYa 🇺🇾</div>
        <div style={{fontSize:10,color:"#444",marginTop:3}}>Panini Mundial 2026 · 48 selecciones · 980 figuritas</div>

        {/* Stats row */}
        <div style={{marginTop:10,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",background:"rgba(255,255,255,0.04)",borderRadius:14,border:"1px solid rgba(255,255,255,0.07)",overflow:"hidden"}}>
          {[{l:"Pegadas",v:pegadas,c:"#00C896"},{l:"Faltan",v:faltan,c:"#FF6B35"},{l:"Repetidas",v:repetidas,c:"#FFD166"}].map((s,i)=>(
            <div key={i} style={{padding:"9px 0",textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.05)":"none"}}>
              <div style={{fontSize:18,fontWeight:"bold",color:s.c}}>{s.v}</div>
              <div style={{fontSize:8,color:"#333"}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Barra global */}
        <div style={{marginTop:7}}>
          <div style={{height:5,background:"rgba(255,255,255,0.06)",borderRadius:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#00C896,#FFD166)",borderRadius:5,transition:"width .4s"}}/>
          </div>
          <div style={{fontSize:9,color:"#333",marginTop:2}}>{pegadas} / 980 · {pct}% completado</div>
        </div>
      </div>

      {/* ── CARD PRINCIPAL ── */}
      <div style={{width:"100%",maxWidth:400,background:"rgba(255,255,255,0.035)",borderRadius:22,border:"1px solid rgba(255,255,255,0.08)",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>

        {/* Perfil */}
        <div style={{padding:"11px 16px 9px",background:"linear-gradient(135deg,rgba(0,200,150,0.08),rgba(108,99,255,0.08))",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:12,color:"#aaa"}}>Hola, Nicolás 👋</div>
            <div style={{fontSize:9,color:"#444"}}>📍 Pocitos, Montevideo</div>
            <div style={{marginTop:3,display:"flex",gap:5,alignItems:"center"}}>
              <Stars n={5}/>
              <Chip c="#FFD166" lbl="⚡ Top"/>
              <span style={{fontSize:9,color:"#444"}}>12 cambios</span>
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{background:"linear-gradient(135deg,#00C896,#6C63FF)",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:"bold",color:"#fff",marginBottom:2}}>N</div>
            <div style={{fontSize:8,color:"#FFD166"}}>✓ Verificado</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
          {[{id:"album",l:"📖 Álbum"},{id:"equipos",l:"🌍 Equipos"},{id:"mapa",l:"📍 Mapa"},{id:"chat",l:"💬 Chat"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{flex:1,padding:"9px 3px",background:tab===t.id?"rgba(0,200,150,0.1)":"transparent",border:"none",borderBottom:tab===t.id?"2px solid #00C896":"2px solid transparent",color:tab===t.id?"#00C896":"#444",fontSize:10,cursor:"pointer",whiteSpace:"nowrap",transition:"all .2s"}}>
              {t.l}
            </button>
          ))}
        </div>

        <div style={{minHeight:380,maxHeight:520,overflowY:"auto"}}>

          {/* ══════ ÁLBUM ══════ */}
          {tab==="album" && (
            <div>
              {/* Nav */}
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px 4px"}}>
                <button onClick={()=>goEq(-1)} disabled={eqIdx===0}
                  style={{background:eqIdx===0?"transparent":"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:eqIdx===0?"#1a1a1a":"#fff",borderRadius:8,padding:"5px 11px",cursor:eqIdx===0?"default":"pointer",fontSize:14,transition:"all .2s"}}>‹</button>

                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:9,color:"#333"}}>Equipo {eqIdx+1} / 48</div>
                  <div style={{fontSize:28,lineHeight:1.2}}>{eq.ban}</div>
                  <div style={{fontSize:14,fontWeight:"bold",color:eCol,marginBottom:3}}>{eq.nombre}</div>
                  <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",marginBottom:3}}>
                    <Chip c={CONF_COL[eq.conf]} lbl={CONF_LBL[eq.conf]}/>
                    <Chip c="#666" lbl={`FIFA #${eq.rank}`}/>
                  </div>
                  <div style={{fontSize:9,color:"#333"}}>
                    Figs.{eq.fi}–{eq.fi+19} ·&nbsp;
                    <span style={{color:"#00C896"}}>{eqPeg}/20</span>
                    {eqRep>0&&<span style={{color:"#FFD166"}}> · {eqRep} rep.</span>}
                  </div>
                </div>

                <button onClick={()=>goEq(1)} disabled={eqIdx===47}
                  style={{background:eqIdx===47?"transparent":"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",color:eqIdx===47?"#1a1a1a":"#fff",borderRadius:8,padding:"5px 11px",cursor:eqIdx===47?"default":"pointer",fontSize:14,transition:"all .2s"}}>›</button>
              </div>

              {/* Progreso equipo */}
              <div style={{padding:"4px 12px 8px"}}>
                <div style={{height:4,background:"rgba(255,255,255,0.06)",borderRadius:4,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${eqPct}%`,background:eCol,borderRadius:4,transition:"width .3s"}}/>
                </div>
              </div>

              {/* Página álbum */}
              <div onTouchStart={onTS} onTouchMove={onTM} onTouchEnd={onTE}
                style={{margin:"0 10px 10px",padding:"10px 8px",background:`linear-gradient(155deg,${eCol}14,${eq.c2}07)`,border:`1px solid ${eCol}22`,borderRadius:14,transform:`translateX(${dragX*.1}px)`,transition:dragging?"none":"transform .2s",userSelect:"none"}}>

                {/* Leyenda mini */}
                <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:8,fontSize:8,color:"#333"}}>
                  <span>🛡️ Escudo</span><span>📸 Grupal</span><span>👤 Jug.1–18</span>
                </div>

                {/* Grid 5×4 */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4}}>
                  {figs.map((num,i)=>{
                    const val=(estado[num]||0);
                    const col=getC(val);
                    const esE=i===0, esF=i===1;
                    return (
                      <div key={num} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                        <div style={{width:"100%",aspectRatio:"2/3",minHeight:50,background:col.bg,border:`1.5px solid ${col.br}`,borderRadius:7,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",transition:"all .15s"}}>
                          <div style={{fontSize:esE?13:esF?11:8,lineHeight:1}}>{esE?"🛡️":esF?"📸":"👤"}</div>
                          <div style={{fontSize:8,fontWeight:"bold",color:val>0?col.tx:"#1f1f1f",lineHeight:1,marginTop:1}}>{num}</div>
                          {!esE&&!esF&&<div style={{fontSize:6,color:"#2a2a2a",lineHeight:1}}>J.{i-1}</div>}
                          {val>0&&<div style={{fontSize:8,color:col.tx,lineHeight:1}}>{col.lbl}</div>}
                          {val>=1&&<div style={{position:"absolute",top:2,right:2,width:4,height:4,borderRadius:"50%",background:col.br}}/>}
                        </div>
                        <div style={{display:"flex",gap:2,width:"100%"}}>
                          <button onClick={()=>cambiar(num,-1)}
                            style={{flex:1,height:18,background:val>0?"rgba(255,107,53,0.2)":"rgba(255,255,255,0.03)",border:`1px solid ${val>0?"rgba(255,107,53,.35)":"rgba(255,255,255,.06)"}`,color:val>0?"#FF6B35":"#1a1a1a",borderRadius:4,fontSize:14,cursor:val>0?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>−</button>
                          <button onClick={()=>cambiar(num,1)}
                            style={{flex:1,height:18,background:"rgba(0,200,150,0.15)",border:"1px solid rgba(0,200,150,.3)",color:"#00C896",borderRadius:4,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0,lineHeight:1}}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div style={{textAlign:"center",marginTop:8,fontSize:8,color:"#1f1f1f"}}>‹ deslizá para cambiar equipo ›</div>
              </div>

              {/* Especiales */}
              <div style={{padding:"0 10px 10px"}}>
                <button onClick={()=>setVerEsp(v=>!v)}
                  style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",color:"#555",borderRadius:9,padding:"6px",fontSize:9,cursor:"pointer"}}>
                  {verEsp?"▲":"▼"} Estadios & Sede · Figs. 961–980
                </button>
                {verEsp&&(
                  <div style={{marginTop:7,display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:4}}>
                    {ESPECIALES.map(e=>{
                      const val=(estado[e.numero]||0); const col=getC(val);
                      return (
                        <div key={e.numero} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                          <div style={{width:"100%",aspectRatio:"1",minHeight:42,background:col.bg,border:`1.5px solid ${col.br}`,borderRadius:6,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 2px"}}>
                            <div style={{fontSize:7,color:"#2a2a2a",textAlign:"center",lineHeight:1.2}}>{e.numero}</div>
                            <div style={{fontSize:6,color:val>0?col.tx:"#1a1a1a",textAlign:"center",lineHeight:1.2}}>{e.label}</div>
                            {val>0&&<div style={{fontSize:7,color:col.tx}}>{col.lbl}</div>}
                          </div>
                          <div style={{display:"flex",gap:1,width:"100%"}}>
                            <button onClick={()=>cambiar(e.numero,-1)} style={{flex:1,height:15,background:val>0?"rgba(255,107,53,.2)":"rgba(255,255,255,.03)",border:"1px solid rgba(255,107,53,.3)",color:val>0?"#FF6B35":"#1a1a1a",borderRadius:3,fontSize:12,cursor:"pointer",padding:0,lineHeight:1}}>−</button>
                            <button onClick={()=>cambiar(e.numero,1)}  style={{flex:1,height:15,background:"rgba(0,200,150,.15)",border:"1px solid rgba(0,200,150,.3)",color:"#00C896",borderRadius:3,fontSize:12,cursor:"pointer",padding:0,lineHeight:1}}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Leyenda */}
              <div style={{padding:"0 10px 12px",display:"flex",justifyContent:"center",gap:12}}>
                {[{bg:"rgba(255,255,255,.07)",br:"rgba(255,255,255,.15)",l:"Sin pegar"},{bg:"rgba(0,200,150,.22)",br:"#00C896",l:"Pegada ✓"},{bg:"rgba(255,209,102,.26)",br:"#FFD166",l:"Repetida ×n"}].map(x=>(
                  <div key={x.l} style={{display:"flex",alignItems:"center",gap:4}}>
                    <div style={{width:9,height:13,borderRadius:3,background:x.bg,border:`1px solid ${x.br}`}}/>
                    <span style={{fontSize:8,color:"#444"}}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══════ EQUIPOS ══════ */}
          {tab==="equipos" && (
            <div style={{padding:12}}>
              <input value={busqueda} onChange={e=>setBusqueda(e.target.value)} placeholder="🔍 Buscar selección..."
                style={{width:"100%",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,padding:"7px 12px",color:"#fff",fontSize:11,outline:"none",marginBottom:9,boxSizing:"border-box"}}/>

              <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
                {confs.map(c=>(
                  <button key={c} onClick={()=>setFiltroConf(c)}
                    style={{background:filtroConf===c?(c==="TODOS"?"rgba(255,255,255,.12)":CONF_COL[c]+"30"):"rgba(255,255,255,.04)",border:`1px solid ${filtroConf===c?(c==="TODOS"?"rgba(255,255,255,.2)":CONF_COL[c]):"rgba(255,255,255,.07)"}`,color:filtroConf===c?(c==="TODOS"?"#eee":CONF_COL[c]):"#444",borderRadius:18,padding:"3px 9px",fontSize:9,cursor:"pointer",transition:"all .15s"}}>
                    {c==="TODOS"?"🌐 Todos":CONF_LBL[c]}
                  </button>
                ))}
              </div>

              <div style={{fontSize:8,color:"#333",marginBottom:7}}>{filtrados.length} selecciones · ranking FIFA abril 2026</div>

              {filtrados.map(e=>{
                const eFigs=Array.from({length:20},(_,j)=>e.fi+j);
                const ePeg=eFigs.filter(n=>(estado[n]||0)>=1).length;
                const ePct=Math.round((ePeg/20)*100);
                const idx=EQUIPOS.findIndex(x=>x.id===e.id);
                const ec=colorEq(e);
                return (
                  <div key={e.id} onClick={()=>{setEqIdx(idx);setTab("album");}}
                    style={{display:"flex",alignItems:"center",gap:9,padding:"8px 10px",marginBottom:5,background:"rgba(255,255,255,0.03)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)",cursor:"pointer",transition:"background .15s"}}>
                    <span style={{fontSize:20,flexShrink:0}}>{e.ban}</span>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:3}}>
                        <span style={{fontSize:11,fontWeight:"bold",color:"#eee",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{e.nombre}</span>
                        <Chip c={CONF_COL[e.conf]} lbl={`#${e.rank}`}/>
                      </div>
                      <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:3,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${ePct}%`,background:ec,borderRadius:3,transition:"width .3s"}}/>
                      </div>
                      <div style={{fontSize:7,color:"#333",marginTop:2}}>{ePeg}/20 figs. · {ePct}%</div>
                    </div>
                    <span style={{fontSize:10,color:"#2a2a2a"}}>›</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* ══════ MAPA ══════ */}
          {tab==="mapa" && (
            <div style={{padding:12}}>
              <div style={{height:115,background:"linear-gradient(135deg,#0a1f0a,#0d2b1a)",borderRadius:12,border:"1px solid rgba(6,214,160,.2)",marginBottom:11,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",inset:0,opacity:.12,backgroundImage:"linear-gradient(rgba(0,200,150,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,150,.3) 1px,transparent 1px)",backgroundSize:"26px 26px"}}/>
                {[{t:"28%",l:"42%"},{t:"52%",l:"53%"},{t:"18%",l:"67%"},{t:"44%",l:"24%"},{t:"66%",l:"72%"}].map((p,i)=>(
                  <div key={i} onClick={()=>setPuntoSel(puntoSel===i?null:i)} style={{position:"absolute",top:p.t,left:p.l,transform:"translate(-50%,-50%)",cursor:"pointer"}}>
                    <div style={{width:puntoSel===i?13:9,height:puntoSel===i?13:9,borderRadius:"50%",background:PUNTO_COLS[i],boxShadow:`0 0 ${puntoSel===i?12:6}px ${PUNTO_COLS[i]}`,transition:"all .2s"}}/>
                    {puntoSel===i&&<div style={{position:"absolute",top:-19,left:"50%",transform:"translateX(-50%)",background:"#111",border:`1px solid ${PUNTO_COLS[i]}`,borderRadius:5,padding:"2px 5px",fontSize:7,color:PUNTO_COLS[i],whiteSpace:"nowrap"}}>{PUNTOS[i].nombre}</div>}
                  </div>
                ))}
                <div style={{position:"absolute",top:"50%",left:"46%",transform:"translate(-50%,-50%)"}}>
                  <div style={{width:10,height:10,borderRadius:"50%",background:"#fff",border:"2px solid #00C896",boxShadow:"0 0 8px #00C896"}}/>
                </div>
                <div style={{position:"absolute",bottom:5,right:7,fontSize:7,color:"#2a2a2a"}}>⬤ Vos &nbsp; ⬤ Puntos</div>
              </div>

              <div style={{fontSize:11,color:"#444",marginBottom:9}}>Puntos de encuentro · Montevideo</div>
              {PUNTOS.map((p,i)=>(
                <div key={i} onClick={()=>setPuntoSel(puntoSel===i?null:i)}
                  style={{padding:"9px 11px",marginBottom:6,background:puntoSel===i?`${PUNTO_COLS[i]}12`:"rgba(255,255,255,.03)",borderRadius:10,border:`1px solid ${puntoSel===i?PUNTO_COLS[i]:"rgba(255,255,255,.06)"}`,cursor:"pointer",transition:"all .2s"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:12,fontWeight:"bold",color:PUNTO_COLS[i]}}>{p.tipo} {p.nombre}</div>
                      <div style={{fontSize:9,color:"#444",marginTop:1}}>{p.barrio}</div>
                      {puntoSel===i&&<div style={{fontSize:9,color:"#666",marginTop:4}}>🕐 {p.horario}</div>}
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:15,fontWeight:"bold",color:"#00C896"}}>{p.activos}</div>
                      <div style={{fontSize:8,color:"#333"}}>activos</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ══════ CHAT ══════ */}
          {tab==="chat" && (
            <div style={{display:"flex",flexDirection:"column",height:460}}>
              <div style={{padding:"8px 12px",borderBottom:"1px solid rgba(255,255,255,.05)",display:"flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.02)"}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:"linear-gradient(135deg,#00C896,#6C63FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold",color:"#fff"}}>R</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:12,fontWeight:"bold",color:"#eee"}}>Rodrigo M.</div>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <span style={{fontSize:9,color:"#00C896"}}>● Activo</span>
                    <Stars n={5}/>
                    <Chip c="#FFD166" lbl="⚡ Top"/>
                  </div>
                </div>
                <div style={{background:"rgba(255,107,53,.12)",border:"1px solid rgba(255,107,53,.25)",borderRadius:7,padding:"3px 7px",fontSize:9,color:"#FF6B35",textAlign:"center"}}>
                  <div>Fig.43🇦🇷 ⇄ Fig.8🇫🇷</div>
                  <div style={{fontSize:7,color:"#444"}}>ARG ⇄ FRA</div>
                </div>
              </div>

              <div style={{padding:"5px 12px",background:"rgba(6,214,160,.05)",borderBottom:"1px solid rgba(6,214,160,.1)",display:"flex",alignItems:"center",gap:5}}>
                <span style={{fontSize:11}}>📍</span>
                <span style={{fontSize:10,color:"#06D6A0"}}>Parque Rodó · Sáb 11:00am</span>
              </div>

              <div style={{flex:1,overflowY:"auto",padding:"10px 12px",display:"flex",flexDirection:"column",gap:7}}>
                {chatMsgs.map((m,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:m.mio?"flex-end":"flex-start"}}>
                    <div style={{maxWidth:"76%",padding:"7px 10px",borderRadius:m.mio?"13px 13px 3px 13px":"13px 13px 13px 3px",background:m.mio?"linear-gradient(135deg,#00C896,#00a87a)":"rgba(255,255,255,.07)",color:m.mio?"#fff":"#ddd",fontSize:11,lineHeight:1.4}}>{m.txt}</div>
                  </div>
                ))}

                {!confirmado?(
                  <div style={{background:"rgba(255,209,102,.07)",border:"1px solid rgba(255,209,102,.2)",borderRadius:10,padding:"9px 11px",marginTop:4}}>
                    <div style={{fontSize:10,color:"#FFD166",fontWeight:"bold",marginBottom:4}}>🤝 ¿Realizaron el intercambio?</div>
                    <div style={{fontSize:9,color:"#555",marginBottom:7}}>Confirmá para sumar puntos y habilitar la reseña</div>
                    <button onClick={confirmar} style={{width:"100%",background:"linear-gradient(135deg,#FFD166,#FF6B35)",border:"none",borderRadius:8,padding:"7px",color:"#111",fontSize:11,fontWeight:"bold",cursor:"pointer"}}>✅ Confirmar intercambio</button>
                  </div>
                ):(
                  <div style={{background:"rgba(0,200,150,.1)",border:"1px solid rgba(0,200,150,.25)",borderRadius:10,padding:"9px 11px",textAlign:"center"}}>
                    <div style={{fontSize:14}}>🎉</div>
                    <div style={{fontSize:11,color:"#00C896",fontWeight:"bold"}}>¡Intercambio confirmado!</div>
                    <div style={{fontSize:9,color:"#444"}}>+10 puntos de reputación</div>
                  </div>
                )}

                {showRev&&!revDone&&(
                  <div style={{background:"rgba(108,99,255,.1)",border:"1px solid rgba(108,99,255,.25)",borderRadius:10,padding:"9px 11px"}}>
                    <div style={{fontSize:10,color:"#6C63FF",fontWeight:"bold",marginBottom:5}}>⭐ Calificá a Rodrigo M.</div>
                    <div style={{display:"flex",justifyContent:"center",gap:10}}>
                      {[1,2,3,4,5].map(s=>(
                        <button key={s} onClick={()=>doReview(s)} style={{background:"none",border:"none",fontSize:24,cursor:"pointer",color:revScore>=s?"#FFD166":"#1a1a1a"}}>★</button>
                      ))}
                    </div>
                  </div>
                )}
                {revDone&&(
                  <div style={{textAlign:"center",padding:"5px 0"}}>
                    <Stars n={revScore}/>
                    <div style={{fontSize:9,color:"#444",marginTop:2}}>Reseña enviada · ¡Gracias!</div>
                  </div>
                )}
              </div>

              <div style={{padding:"8px 12px",borderTop:"1px solid rgba(255,255,255,.05)",display:"flex",gap:6,background:"rgba(255,255,255,.02)"}}>
                <input value={chatIn} onChange={e=>setChatIn(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendChat()}
                  placeholder="Escribí tu mensaje..." style={{flex:1,background:"rgba(255,255,255,.07)",border:"1px solid rgba(255,255,255,.1)",borderRadius:18,padding:"7px 12px",color:"#fff",fontSize:11,outline:"none"}}/>
                <button onClick={sendChat} style={{background:"linear-gradient(135deg,#00C896,#6C63FF)",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"#fff"}}>➤</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Selector rápido (solo en álbum) */}
      {tab==="album"&&(
        <div style={{width:"100%",maxWidth:400,marginTop:12}}>
          <div style={{fontSize:8,color:"#222",marginBottom:6,textAlign:"center"}}>Ir directo a un equipo · {eqIdx+1}/48</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center"}}>
            {EQUIPOS.map((e,i)=>{
              const eFigs=Array.from({length:20},(_,j)=>e.fi+j);
              const ePct=Math.round((eFigs.filter(n=>(estado[n]||0)>=1).length/20)*100);
              const ec=colorEq(e);
              return (
                <button key={e.id} onClick={()=>setEqIdx(i)}
                  style={{background:i===eqIdx?`${ec}28`:"rgba(255,255,255,.03)",border:`1px solid ${i===eqIdx?ec:"rgba(255,255,255,.06)"}`,borderRadius:7,padding:"3px 5px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:1,transition:"all .15s",minWidth:28}}>
                  <span style={{fontSize:13}}>{e.ban}</span>
                  <span style={{fontSize:6,color:i===eqIdx?ec:"#222"}}>{ePct}%</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{marginTop:18,fontSize:8,color:"#151515",textAlign:"center"}}>
        FiguraYa 🇺🇾 · v5 · 48 selecciones · 980 figuritas · Panini Mundial 2026
      </div>
    </div>
  );
}
