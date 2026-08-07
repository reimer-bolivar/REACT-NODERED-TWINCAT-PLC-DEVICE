import React, { useState } from 'react';
import { Zap, RefreshCw, Play, Square, Pause, CheckCircle2, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const torqueTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${60 - i * 4}s`,
  actual: 18.7 + Math.sin(i / 2) * 15,
  ref: 20.0,
  limit: 100.0,
  sat: 0.0,
}));

const torqueDistData = [
  { name: 'Dentro de rango (|T| ≤ 30%)', value: 70, color: '#20d69f' },
  { name: 'Advertencia (30% < |T| ≤ 80%)', value: 25, color: '#f7b731' },
  { name: 'Alarma (|T| > 80%)', value: 5, color: '#ff4d6d' },
];

export default function ASDA3TorqueView() {
  const [torqueRef, setTorqueRef] = useState(20.0);
  const [torqueLimit, setTorqueLimit] = useState(100.0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · TORQUE</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real del torque y control del límite de torque
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
          <div className="text-sm font-black text-[#00bdd6]">CST</div>
          <div className="text-[9px] text-[#8ab3cf]">Control de Torque</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EJE SELECCIONADO</div>
          <div className="text-sm font-black text-white">Eje X</div>
          <div className="text-[9px] text-[#8ab3cf]">1 de 4</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TORQUE ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">18.7 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TORQUE REFERENCIA</div>
          <div className="text-xl font-black text-white font-mono">20.0 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TORQUE LÍMITE</div>
          <div className="text-xl font-black text-emerald-400 font-mono">100.0 %</div>
        </div>
      </div>

      {/* Main Grid: Torque Controls Left + Trend Center + Medidor Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Torque Controls Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL DE TORQUE
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Referencia de Torque: {torqueRef} %</label>
              <input type="range" min="-100" max="100" step="1" value={torqueRef} onChange={(e) => setTorqueRef(e.target.value)} className="w-full accent-[#00bdd6]" />
            </div>

            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Límite de Torque: {torqueLimit} %</label>
              <input type="range" min="10" max="100" step="5" value={torqueLimit} onChange={(e) => setTorqueLimit(e.target.value)} className="w-full accent-[#00bdd6]" />
            </div>

            <div className="space-y-2 pt-2">
              <button className="w-full py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
                <Play className="w-4 h-4 fill-current" />
                <span>ENABLE TORQUE</span>
              </button>
              <button className="w-full py-2.5 rounded bg-amber-600 text-white font-black text-xs flex items-center justify-center space-x-1">
                <Pause className="w-4 h-4" />
                <span>HOLD</span>
              </button>
              <button className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
                <Square className="w-4 h-4 fill-current" />
                <span>DISABLE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Torque Trend Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA DE TORQUE (TIEMPO REAL)
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={torqueTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis domain={[-50, 120]} stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="actual" stroke="#00bdd6" strokeWidth={2} dot={false} name="Torque Actual (%)" />
                <Line type="monotone" dataKey="ref" stroke="#20d69f" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Referencia (%)" />
                <Line type="monotone" dataKey="limit" stroke="#f7b731" strokeWidth={1.5} strokeDasharray="2 2" dot={false} name="Límite (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono pt-2 border-t border-[#1a3854]">
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">MÍNIMO</span><span className="text-white font-bold">-28.4 %</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">MÁXIMO</span><span className="text-white font-bold">62.3 %</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">PROMEDIO</span><span className="text-[#00bdd6] font-bold">18.7 %</span></div>
            <div className="bg-[#0b1c2d] p-1.5 rounded"><span className="text-[9px] text-[#57809e] block font-sans">RMS</span><span className="text-white font-bold">21.6 %</span></div>
          </div>
        </div>

        {/* Medidor & Distribution Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            MEDIDOR DE TORQUE ACTUAL
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-36 h-36 rounded-full border-4 border-emerald-400 flex flex-col items-center justify-center bg-[#0b1c2d]">
              <span className="text-3xl font-black text-white font-mono">18.7</span>
              <span className="text-xs font-bold text-emerald-400">%</span>
              <span className="text-[9px] text-[#8ab3cf] mt-1">Nominal</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#1a3854]">
            <div className="text-[10px] text-[#57809e] font-bold uppercase mb-1">DISTRIBUCIÓN DE TORQUE</div>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={torqueDistData} cx="50%" cy="50%" innerRadius={20} outerRadius={38} dataKey="value">
                    {torqueDistData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
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
