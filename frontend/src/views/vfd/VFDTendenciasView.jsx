import React, { useState } from 'react';
import { TrendingUp, Download, Pause, Play, RefreshCw, Maximize2, CheckCircle2 } from 'lucide-react';
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

const mockVfdMultiTrend = Array.from({ length: 20 }).map((_, i) => ({
  time: `14:${24 + i}`,
  freq: 31.9 + Math.sin(i / 2) * 0.5,
  current: 23.4 + Math.cos(i / 3) * 0.8,
  power: 12.3 + Math.sin(i / 4) * 0.4,
  dcBus: 540 + Math.cos(i / 2) * 2,
  rpm: 1150 + Math.sin(i / 2) * 15,
}));

export default function VFDTendenciasView() {
  const [selectedVars, setSelectedVars] = useState({
    freq: true,
    current: true,
    power: true,
    dcBus: true,
    rpm: true,
  });

  const toggleVar = (key) => setSelectedVars((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · TENDENCIAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Análisis de tendencias históricas en tiempo real de las variables del variador
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

      {/* Status Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">31.90 Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">53.2 % del rango</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CORRIENTE ACTUAL</div>
          <div className="text-xl font-black text-emerald-400 font-mono">23.4 A</div>
          <div className="text-[9px] text-[#8ab3cf]">52.1 % del nominal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POTENCIA ACTUAL</div>
          <div className="text-xl font-black text-white font-mono">12.3 kW</div>
          <div className="text-[9px] text-[#8ab3cf]">35.1 % del nominal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TENSIÓN DC BUS</div>
          <div className="text-xl font-black text-amber-400 font-mono">540 VDC</div>
          <div className="text-[9px] text-[#8ab3cf]">Nominal: 540 VDC</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD ACTUAL</div>
          <div className="text-xl font-black text-white font-mono">1,150 RPM</div>
          <div className="text-[9px] text-[#8ab3cf]">4 polos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-sm font-black text-white font-mono">14:54:12</div>
          <div className="text-[9px] text-[#8ab3cf]">07/08/2026</div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chart Panel */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-[#1a3854] pb-2">
            <span className="text-xs font-black uppercase text-[#00bdd6]">TENDENCIAS EN TIEMPO REAL</span>
            <div className="flex items-center space-x-2 text-xs">
              <select className="bg-[#0b1c2d] border border-[#1a3854] text-white rounded px-2 py-1 font-semibold">
                <option>Últimos 30 minutos</option>
                <option>Última hora</option>
              </select>
              <button className="flex items-center space-x-1 px-3 py-1 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold">
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSAR</span>
              </button>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockVfdMultiTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '8px' }} />
                {selectedVars.freq && <Line type="monotone" dataKey="freq" stroke="#00bdd6" strokeWidth={2} dot={false} name="Frecuencia (Hz)" />}
                {selectedVars.current && <Line type="monotone" dataKey="current" stroke="#20d69f" strokeWidth={2} dot={false} name="Corriente (A)" />}
                {selectedVars.power && <Line type="monotone" dataKey="power" stroke="#f7b731" strokeWidth={2} dot={false} name="Potencia (kW)" />}
                {selectedVars.dcBus && <Line type="monotone" dataKey="dcBus" stroke="#ff4d6d" strokeWidth={1.5} dot={false} name="DC Bus (V)" />}
                {selectedVars.rpm && <Line type="monotone" dataKey="rpm" stroke="#9d4edd" strokeWidth={1.5} dot={false} name="Velocidad (RPM)" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Variables selector & quick analysis */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              VARIABLES MOSTRADAS
            </div>
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedVars.freq} onChange={() => toggleVar('freq')} className="accent-[#00bdd6]" />
                  <span className="font-bold text-white">Frecuencia (Hz)</span>
                </div>
                <span className="font-mono text-[#00bdd6] font-bold">31.85 Hz</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedVars.current} onChange={() => toggleVar('current')} className="accent-[#20d69f]" />
                  <span className="font-bold text-white">Corriente (A)</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">23.4 A</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedVars.power} onChange={() => toggleVar('power')} className="accent-[#f7b731]" />
                  <span className="font-bold text-white">Potencia (kW)</span>
                </div>
                <span className="font-mono text-[#f7b731] font-bold">12.3 kW</span>
              </label>

              <label className="flex items-center justify-between p-2 rounded bg-[#0b1c2d] border border-[#1a3854] cursor-pointer">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={selectedVars.dcBus} onChange={() => toggleVar('dcBus')} className="accent-[#ff4d6d]" />
                  <span className="font-bold text-white">DC Bus (V)</span>
                </div>
                <span className="font-mono text-rose-400 font-bold">540 VDC</span>
              </label>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-2 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              ANÁLISIS RÁPIDO
            </div>
            <div className="space-y-1.5 text-[#8ab3cf]">
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>La frecuencia se mantiene estable dentro del rango.</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>No se detectan picos anormales de corriente.</span>
              </div>
              <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>El voltaje DC Bus permanece constante.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
