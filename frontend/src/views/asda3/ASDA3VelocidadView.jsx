import React, { useState } from 'react';
import { Activity, RefreshCw, Play, Square, Pause, CheckCircle2, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const velTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${60 - i * 4}s`,
  actual: 2500 + Math.sin(i / 2) * 600,
  ref: 2500,
  err: Math.sin(i) * 10,
}));

const velDistData = [
  { name: 'Óptimo (0-3000 rpm)', value: 82, color: '#20d69f' },
  { name: 'Advertencia (3000-4000 rpm)', value: 15, color: '#f7b731' },
  { name: 'Alarma (4000-5000 rpm)', value: 3, color: '#ff4d6d' },
];

export default function ASDA3VelocidadView() {
  const [velRef, setVelRef] = useState(2500);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · VELOCIDAD</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real de la velocidad del eje y control de referencia
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <Download className="w-3.5 h-3.5" />
            <span>EXPORTAR</span>
          </button>
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
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EJE SELECCIONADO</div>
          <div className="text-sm font-black text-white">Eje X</div>
          <div className="text-[9px] text-[#8ab3cf]">1 de 4</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">2,500 rpm</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD REFERENCIA</div>
          <div className="text-xl font-black text-white font-mono">2,500 rpm</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ERROR VELOCIDAD</div>
          <div className="text-xl font-black text-emerald-400 font-mono">+0.0 rpm</div>
        </div>
      </div>

      {/* Main Grid: Velocity Controls Left + Trend Center + Tachometer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Velocity Controls Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL DE VELOCIDAD
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Referencia de Velocidad (rpm)</label>
              <input type="number" value={velRef} onChange={(e) => setVelRef(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
              <input type="range" min="0" max="5000" step="100" value={velRef} onChange={(e) => setVelRef(e.target.value)} className="w-full accent-[#00bdd6] mt-2" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Aceleración</label>
                <input type="text" value="2000 rpm/s" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Desaceleración</label>
                <input type="text" value="2000 rpm/s" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button className="flex-1 py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
                <Play className="w-4 h-4 fill-current" />
                <span>RUN</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-amber-600 text-white font-black text-xs flex items-center justify-center space-x-1">
                <Pause className="w-4 h-4" />
                <span>HOLD</span>
              </button>
            </div>

            <button className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
              <Square className="w-4 h-4 fill-current" />
              <span>STOP</span>
            </button>
          </div>
        </div>

        {/* Velocity Trend Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA DE VELOCIDAD (TIEMPO REAL)
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="actual" stroke="#00bdd6" strokeWidth={2} dot={false} name="Velocidad Actual (rpm)" />
                <Line type="monotone" dataKey="ref" stroke="#20d69f" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Referencia (rpm)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono pt-2 border-t border-[#1a3854]">
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">MÁXIMA</span><span className="text-white font-bold">3,125 rpm</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">MÍNIMA</span><span className="text-white font-bold">0 rpm</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">PROMEDIO</span><span className="text-white font-bold">1,820 rpm</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">ESTABILIDAD</span><span className="text-emerald-400 font-bold">Excelente</span></div>
          </div>
        </div>

        {/* Speedometer Gauge & Distribution Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            VELOCÍMETRO
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-36 h-36 rounded-full border-4 border-[#00bdd6] flex flex-col items-center justify-center bg-[#0b1c2d]">
              <span className="text-3xl font-black text-white font-mono">2,500</span>
              <span className="text-xs font-bold text-[#00bdd6]">rpm</span>
              <span className="text-[9px] text-emerald-400 mt-1 font-bold">RANGO ÓPTIMO</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1a3854]">
            <div className="text-[10px] text-[#57809e] font-bold uppercase mb-1">DISTRIBUCIÓN DE VELOCIDAD</div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={velDistData} cx="50%" cy="50%" innerRadius={20} outerRadius={38} dataKey="value">
                    {velDistData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
