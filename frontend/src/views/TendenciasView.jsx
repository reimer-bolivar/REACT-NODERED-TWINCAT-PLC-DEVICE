import React, { useState } from 'react';
import { TrendingUp, Calendar, Clock, Download, Maximize2, Table } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

const mockTrendDataData = Array.from({ length: 20 }).map((_, i) => ({
  time: `14:${30 + i}:00`,
  ai1: 6.4 + Math.sin(i / 2) * 0.1,
  ai2: 78.0 + Math.cos(i / 3) * 0.5,
  ai3: 54.0 + Math.sin(i / 4) * 0.8,
  ai4: 12.3 + Math.cos(i / 2) * 0.2,
}));

export default function TendenciasView() {
  const [selectedChannels, setSelectedChannels] = useState({
    ai1: true,
    ai2: true,
    ai3: true,
    ai4: true,
  });

  const toggleChannel = (key) => {
    setSelectedChannels((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="glass-panel p-3 flex flex-wrap gap-3 justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#00bdd6]" />
            <span>TENDENCIAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Visualización histórica de entradas analógicas
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select className="bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-1.5 font-semibold">
            <option>4 seleccionados</option>
          </select>
          <select className="bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-1.5 font-semibold">
            <option>Últimas 2 horas</option>
            <option>Última hora</option>
            <option>24 horas</option>
          </select>
          <select className="bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-1.5 font-semibold">
            <option>1 segundo</option>
            <option>5 segundos</option>
          </select>
          
          <button className="px-3 py-1.5 rounded bg-[#2563eb] text-white font-bold hover:bg-blue-600">AUTO</button>
          <button className="px-3 py-1.5 rounded bg-[#00bdd6] text-slate-950 font-bold hover:bg-cyan-400">APLICAR</button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <Download className="w-4 h-4" />
            <span>EXPORTAR</span>
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart Panel */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-4">
          <div className="flex justify-between items-center border-b border-[#1a3854] pb-2">
            <span className="text-xs font-black uppercase text-[#00bdd6]">GRÁFICO MULTICANAL TIEMPO REAL</span>
            <button className="text-[#8ab3cf] hover:text-white"><Maximize2 className="w-4 h-4" /></button>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendDataData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderColor: '#1a3854', borderRadius: '8px' }} />
                {selectedChannels.ai1 && <Line type="monotone" dataKey="ai1" stroke="#20d69f" strokeWidth={2} dot={false} name="AI01 Presión (bar)" />}
                {selectedChannels.ai2 && <Line type="monotone" dataKey="ai2" stroke="#00bdd6" strokeWidth={2} dot={false} name="AI02 Temp (°C)" />}
                {selectedChannels.ai3 && <Line type="monotone" dataKey="ai3" stroke="#f7b731" strokeWidth={2} dot={false} name="AI03 Nivel (%)" />}
                {selectedChannels.ai4 && <Line type="monotone" dataKey="ai4" stroke="#9d4edd" strokeWidth={2} dot={false} name="AI04 Corriente (A)" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Sidebar: Channels & Stats */}
        <div className="lg:col-span-4 space-y-3">
          {/* Channel Selector */}
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              CANALES
            </div>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer hover:border-[#20d69f]">
                <div className="flex items-center space-x-2 text-xs">
                  <input type="checkbox" checked={selectedChannels.ai1} onChange={() => toggleChannel('ai1')} className="accent-[#20d69f]" />
                  <span className="font-bold text-white">AI01 - Presión de descarga</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#20d69f]">6.42 bar</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer hover:border-[#00bdd6]">
                <div className="flex items-center space-x-2 text-xs">
                  <input type="checkbox" checked={selectedChannels.ai2} onChange={() => toggleChannel('ai2')} className="accent-[#00bdd6]" />
                  <span className="font-bold text-white">AI02 - Temperatura aceite</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00bdd6]">78.3 °C</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer hover:border-[#f7b731]">
                <div className="flex items-center space-x-2 text-xs">
                  <input type="checkbox" checked={selectedChannels.ai3} onChange={() => toggleChannel('ai3')} className="accent-[#f7b731]" />
                  <span className="font-bold text-white">AI03 - Nivel tanque</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#f7b731]">54.7 %</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer hover:border-[#9d4edd]">
                <div className="flex items-center space-x-2 text-xs">
                  <input type="checkbox" checked={selectedChannels.ai4} onChange={() => toggleChannel('ai4')} className="accent-[#9d4edd]" />
                  <span className="font-bold text-white">AI04 - Corriente motor</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#9d4edd]">12.36 A</span>
              </label>
            </div>
          </div>

          {/* Statistics Table */}
          <div className="glass-panel p-4 space-y-2 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              ESTADÍSTICAS (PERÍODO SELECCIONADO)
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-1">CANAL</th>
                  <th className="pb-1 text-center">MÍNIMO</th>
                  <th className="pb-1 text-center">MÁXIMO</th>
                  <th className="pb-1 text-center">PROMEDIO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854] font-mono">
                <tr><td className="py-1.5 font-bold text-[#20d69f]">AI01 (bar)</td><td className="text-center">4.21</td><td className="text-center">7.89</td><td className="text-center">6.02</td></tr>
                <tr><td className="py-1.5 font-bold text-[#00bdd6]">AI02 (°C)</td><td className="text-center">72.1</td><td className="text-center">83.6</td><td className="text-center">77.8</td></tr>
                <tr><td className="py-1.5 font-bold text-[#f7b731]">AI03 (%)</td><td className="text-center">42.3</td><td className="text-center">61.8</td><td className="text-center">52.6</td></tr>
                <tr><td className="py-1.5 font-bold text-[#9d4edd]">AI04 (A)</td><td className="text-center">10.21</td><td className="text-center">14.87</td><td className="text-center">12.31</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
