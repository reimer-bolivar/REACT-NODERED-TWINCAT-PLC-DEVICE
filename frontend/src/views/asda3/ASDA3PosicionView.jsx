import React, { useState } from 'react';
import { Target, RefreshCw, Play, Pause, Square, Home, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const posTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${60 - i * 4}s`,
  actual: 12345.678 + Math.sin(i / 2) * 3000,
  target: 12345.678 + Math.sin(i / 2) * 3000,
  err: 0.003 + Math.sin(i) * 0.001,
}));

export default function ASDA3PosicionView() {
  const [targetPos, setTargetPos] = useState(12345.678);
  const [profileVel, setProfileVel] = useState(2500);

  const savedPosList = [
    { num: 1, name: 'Home', pos: '0.000' },
    { num: 2, name: 'Carga', pos: '10,000.000' },
    { num: 3, name: 'Descarga', pos: '25,000.000' },
    { num: 4, name: 'Inspección', pos: '5,000.000' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Target className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · POSICIÓN</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real de la posición del eje y control de movimiento
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>DISPOSITIVO ONLINE</span>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>REFRESCAR</span>
          </button>
        </div>
      </div>

      {/* Top Banner Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO DEL DRIVE</div>
          <div className="text-xs font-black text-emerald-400 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>READY</span>
          </div>
          <div className="text-[9px] text-[#8ab3cf]">Operativo</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO ACTIVO</div>
          <div className="text-sm font-black text-[#00bdd6]">CSP</div>
          <div className="text-[9px] text-[#8ab3cf]">Control de Posición</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POSICIÓN ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">12,345.678</div>
          <div className="text-[9px] text-[#8ab3cf]">unidades</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD ACTUAL</div>
          <div className="text-xl font-black text-white font-mono">2,500 rpm</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POSICIÓN OBJETIVO</div>
          <div className="text-xl font-black text-white font-mono">12,345.678</div>
          <div className="text-[9px] text-[#8ab3cf]">unidades</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ERROR DE POSICIÓN</div>
          <div className="text-xl font-black text-emerald-400 font-mono">0.003</div>
          <div className="text-[9px] text-[#8ab3cf]">unidades</div>
        </div>
      </div>

      {/* Main Grid: Position Command Form + Trend Chart + Saved Positions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Position Command Form Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            COMANDO DE POSICIÓN
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Posición Objetivo (unid.)</label>
              <input type="number" value={targetPos} onChange={(e) => setTargetPos(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Velocidad de Perfil (rpm)</label>
              <input type="number" value={profileVel} onChange={(e) => setProfileVel(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Aceleración</label>
                <input type="text" value="2000 unid/s²" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Desaceleración</label>
                <input type="text" value="2000 unid/s²" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button className="flex-1 py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
                <Play className="w-4 h-4 fill-current" />
                <span>MOVE ABS</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-amber-600 text-white font-black text-xs flex items-center justify-center space-x-1">
                <Pause className="w-4 h-4" />
                <span>PAUSE</span>
              </button>
            </div>

            <button className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
              <Square className="w-4 h-4 fill-current" />
              <span>STOP</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a3854]">
              <button className="py-2 rounded bg-[#102b3e] border border-[#204a6b] text-[#00bdd6] font-bold text-xs hover:bg-[#1a3854] flex items-center justify-center space-x-1">
                <Home className="w-3.5 h-3.5" />
                <span>HOME (HOMING)</span>
              </button>
              <button className="py-2 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-xs hover:bg-[#1a3854] flex items-center justify-center space-x-1">
                <Save className="w-3.5 h-3.5" />
                <span>GUARDAR POS.</span>
              </button>
            </div>
          </div>
        </div>

        {/* Position Trend Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA DE POSICIÓN (TIEMPO REAL)
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={posTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="actual" stroke="#00bdd6" strokeWidth={2} dot={false} name="Posición Actual" />
                <Line type="monotone" dataKey="target" stroke="#20d69f" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Posición Objetivo" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-2 border-t border-[#1a3854]">
            <div className="bg-[#0b1c2d] p-2 rounded"><span className="text-[9px] text-[#57809e] block font-sans">ERROR ACTUAL</span><span className="text-emerald-400 font-bold">0.003</span></div>
            <div className="bg-[#0b1c2d] p-2 rounded"><span className="text-[9px] text-[#57809e] block font-sans">ERROR PROMEDIO</span><span className="text-white font-bold">0.002</span></div>
            <div className="bg-[#0b1c2d] p-2 rounded"><span className="text-[9px] text-[#57809e] block font-sans">ERROR MÁXIMO</span><span className="text-white font-bold">0.012</span></div>
          </div>
        </div>

        {/* Saved Positions Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            POSICIONES GUARDADAS
          </div>

          <div className="space-y-2 font-mono">
            {savedPosList.map((p) => (
              <div key={p.num} className="p-2.5 rounded bg-[#0b1c2d] border border-[#1a3854] flex justify-between items-center">
                <div>
                  <span className="text-[#00bdd6] font-bold block">{p.num}. {p.name}</span>
                  <span className="text-white font-bold text-sm">{p.pos} unid</span>
                </div>
                <button className="px-2 py-1 bg-[#102b3e] text-[#00bdd6] text-[10px] font-bold rounded hover:bg-[#00bdd6] hover:text-slate-950">
                  IR ➔
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
