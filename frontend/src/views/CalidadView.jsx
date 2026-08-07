import React from 'react';
import { ShieldCheck, PieChart as PieIcon, Activity, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const pieData = [
  { name: 'GOOD', value: 96, color: '#20d69f' },
  { name: 'UNCERTAIN', value: 2, color: '#f7b731' },
  { name: 'BAD', value: 1, color: '#ff4d6d' },
  { name: 'STALE', value: 1, color: '#9d4edd' },
];

const qualityTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:${05 + i * 4}`,
  ai1: 96 + Math.sin(i) * 2,
  ai2: 94 + Math.cos(i) * 3,
  ai3: 82 + Math.sin(i * 1.5) * 5,
  ai4: 97 + Math.cos(i * 0.8) * 1.5,
}));

export default function CalidadView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#00bdd6]" />
            <span>CALIDAD DE SEÑAL</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo de calidad, estabilidad y disponibilidad de entradas analógicas
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <select className="bg-[#0b1c2d] border border-[#1a3854] text-white rounded px-3 py-1.5 font-bold">
            <option>Auto-Refresh</option>
          </select>
        </div>
      </div>

      {/* Top Row: Donut Chart + Channel Quality Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Quality Summary Donut */}
        <div className="lg:col-span-5 glass-panel p-4 flex flex-col justify-between">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            RESUMEN DE CALIDAD
          </div>

          <div className="flex items-center justify-between my-2">
            <div className="w-44 h-44 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white font-mono">96%</span>
                <span className="text-[9px] font-bold text-[#57809e] uppercase">CALIDAD GLOBAL</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#20d69f]"></span>
                <span className="text-[#8ab3cf]">GOOD:</span>
                <span className="font-bold text-white">96% (3.84 h)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f7b731]"></span>
                <span className="text-[#8ab3cf]">UNCERTAIN:</span>
                <span className="font-bold text-white">2% (0.08 h)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d6d]"></span>
                <span className="text-[#8ab3cf]">BAD:</span>
                <span className="font-bold text-white">1% (0.04 h)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9d4edd]"></span>
                <span className="text-[#8ab3cf]">STALE:</span>
                <span className="font-bold text-white">1% (0.04 h)</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-center text-[#57809e] pt-2 border-t border-[#1a3854]">
            Período seleccionado: Últimas 2 horas
          </div>
        </div>

        {/* Channel Quality Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass-panel p-3.5 space-y-2 border-l-4 border-l-[#20d69f]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">AI01 Presión descarga</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">GOOD</span>
            </div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Calidad actual:</span><span className="font-bold text-white font-mono">96%</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Tiempo desde último dato:</span><span className="font-bold text-emerald-400 font-mono">0.7 s</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Estabilidad:</span><span className="font-bold text-emerald-400">Muy estable</span></div>
          </div>

          <div className="glass-panel p-3.5 space-y-2 border-l-4 border-l-[#20d69f]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">AI02 Temperatura aceite</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">GOOD</span>
            </div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Calidad actual:</span><span className="font-bold text-white font-mono">94%</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Tiempo desde último dato:</span><span className="font-bold text-emerald-400 font-mono">0.8 s</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Estabilidad:</span><span className="font-bold text-emerald-400">Estable</span></div>
          </div>

          <div className="glass-panel p-3.5 space-y-2 border-l-4 border-l-[#f7b731]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">AI03 Nivel tanque</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">UNCERTAIN</span>
            </div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Calidad actual:</span><span className="font-bold text-white font-mono">82%</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Tiempo desde último dato:</span><span className="font-bold text-amber-400 font-mono">2.5 s</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Estabilidad:</span><span className="font-bold text-amber-400">Moderada</span></div>
          </div>

          <div className="glass-panel p-3.5 space-y-2 border-l-4 border-l-[#20d69f]">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-white">AI04 Corriente motor</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">GOOD</span>
            </div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Calidad actual:</span><span className="font-bold text-white font-mono">97%</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Tiempo desde último dato:</span><span className="font-bold text-emerald-400 font-mono">0.5 s</span></div>
            <div className="text-xs text-[#8ab3cf] flex justify-between"><span>Estabilidad:</span><span className="font-bold text-emerald-400">Muy estable</span></div>
          </div>
        </div>
      </div>

      {/* Detail Table & Global Quality Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Detail Table */}
        <div className="lg:col-span-7 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            DETALLE DE CALIDAD POR CANAL
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">NOMBRE</th>
                <th className="pb-2">CALIDAD</th>
                <th className="pb-2 text-center">% CALIDAD</th>
                <th className="pb-2">ESTADO</th>
                <th className="pb-2 text-right">PÉRDIDAS (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              <tr><td className="py-2 font-mono text-[#00bdd6]">AI01</td><td>Presión de descarga</td><td className="text-emerald-400 font-bold">GOOD</td><td className="text-center font-mono font-bold">96%</td><td className="text-emerald-400">✔ ONLINE</td><td className="text-right font-mono">0.2%</td></tr>
              <tr><td className="py-2 font-mono text-[#00bdd6]">AI02</td><td>Temperatura aceite</td><td className="text-emerald-400 font-bold">GOOD</td><td className="text-center font-mono font-bold">94%</td><td className="text-emerald-400">✔ ONLINE</td><td className="text-right font-mono">0.4%</td></tr>
              <tr><td className="py-2 font-mono text-[#00bdd6]">AI03</td><td>Nivel tanque</td><td className="text-amber-400 font-bold">UNCERTAIN</td><td className="text-center font-mono font-bold">82%</td><td className="text-emerald-400">✔ ONLINE</td><td className="text-right font-mono text-amber-400">3.1%</td></tr>
              <tr><td className="py-2 font-mono text-[#00bdd6]">AI04</td><td>Corriente motor</td><td className="text-emerald-400 font-bold">GOOD</td><td className="text-center font-mono font-bold">97%</td><td className="text-emerald-400">✔ ONLINE</td><td className="text-right font-mono">0.1%</td></tr>
            </tbody>
          </table>
        </div>

        {/* Historical Quality Chart */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            HISTÓRICO DE CALIDAD GLOBAL
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis domain={[0, 100]} stroke="#57809e" fontSize={9} />
                <Line type="monotone" dataKey="ai1" stroke="#20d69f" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ai2" stroke="#00bdd6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ai3" stroke="#f7b731" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="ai4" stroke="#9d4edd" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
