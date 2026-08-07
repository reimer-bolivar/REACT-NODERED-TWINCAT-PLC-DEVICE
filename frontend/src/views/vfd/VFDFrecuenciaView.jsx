import React, { useState } from 'react';
import { Gauge, RefreshCw, Send, PieChart as PieIcon, Sliders, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const freqTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:${39 + i}`,
  actual: 31.9 + Math.sin(i) * 0.4,
  ref: 31.9,
}));

const distData = [
  { name: '0 - 20 Hz', value: 23.7, color: '#2563eb' },
  { name: '20 - 40 Hz', value: 61.1, color: '#20d69f' },
  { name: '40 - 50 Hz', value: 10.3, color: '#f7b731' },
  { name: '> 50 Hz', value: 4.9, color: '#ff4d6d' },
];

export default function VFDFrecuenciaView() {
  const [freq, setFreq] = useState(31.9);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · FRECUENCIA</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo y control de la frecuencia de salida
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

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">{parseFloat(freq).toFixed(2)} Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">{((freq / 60) * 100).toFixed(1)} %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">REFERENCIA FRECUENCIA</div>
          <div className="text-xl font-black text-white font-mono">{parseFloat(freq).toFixed(2)} Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">Desde HMI / Remoto</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA MÍNIMA</div>
          <div className="text-xl font-black text-white font-mono">0.00 Hz</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA MÁXIMA</div>
          <div className="text-xl font-black text-white font-mono">60.00 Hz</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">RANGO FRECUENCIA</div>
          <div className="text-sm font-black text-emerald-400 font-mono">0.00 – 60.00 Hz</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-sm font-black text-white font-mono">14:54:12</div>
          <div className="text-[9px] text-[#8ab3cf]">07/08/2026</div>
        </div>
      </div>

      {/* Main Grid: Chart Left + Frequency Adjuster Center + Presets Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 15 Min Trend Chart Left */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA DE FRECUENCIA (ÚLTIMOS 15 MINUTOS)
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={freqTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis domain={[0, 60]} stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="actual" stroke="#20d69f" strokeWidth={2} dot={false} name="Frecuencia Actual (Hz)" />
                <Line type="monotone" dataKey="ref" stroke="#00bdd6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Referencia (Hz)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Frequency Adjuster Center */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-4 flex flex-col justify-between">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>AJUSTE DE FRECUENCIA</span>
            <span className="text-xs text-[#8ab3cf]">Modo: Local (HMI)</span>
          </div>

          <div className="text-center my-2 space-y-1">
            <div className="text-4xl font-black text-white font-mono">{parseFloat(freq).toFixed(2)} <span className="text-lg text-[#00bdd6]">Hz</span></div>
            <div className="text-xs text-[#57809e]">{((freq / 60) * 100).toFixed(1)} % del rango</div>

            <input
              type="range"
              min="0"
              max="60"
              step="0.1"
              value={freq}
              onChange={(e) => setFreq(e.target.value)}
              className="w-full accent-[#00bdd6] cursor-pointer mt-3"
            />
          </div>

          <div className="flex space-x-2">
            <button onClick={() => setFreq(Math.max(0, parseFloat(freq) - 1))} className="px-4 py-2 rounded bg-[#0b1c2d] border border-[#1a3854] text-white font-bold text-lg hover:border-[#00bdd6]">-</button>
            <input type="number" value={freq} onChange={(e) => setFreq(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white text-center font-mono font-bold text-lg rounded" />
            <button onClick={() => setFreq(Math.min(60, parseFloat(freq) + 1))} className="px-4 py-2 rounded bg-[#0b1c2d] border border-[#1a3854] text-white font-bold text-lg hover:border-[#00bdd6]">+</button>
          </div>

          <div className="grid grid-cols-6 gap-1 pt-1 text-xs">
            {[10, 20, 30, 40, 50, 60].map((val) => (
              <button key={val} onClick={() => setFreq(val)} className="py-1 rounded bg-[#102b3e] border border-[#204a6b] text-[#00bdd6] font-bold text-[10px] hover:bg-[#00bdd6] hover:text-slate-950">
                {val} Hz
              </button>
            ))}
          </div>
        </div>

        {/* Frequency Presets Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            PRESETS DE FRECUENCIA
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              { label: 'PRESET 1', val: '15.00 Hz' },
              { label: 'PRESET 2', val: '30.00 Hz', active: true },
              { label: 'PRESET 3', val: '45.00 Hz' },
              { label: 'PRESET 4', val: '60.00 Hz' },
            ].map((p, idx) => (
              <div key={idx} onClick={() => setFreq(parseFloat(p.val))} className={`p-2.5 rounded border flex justify-between cursor-pointer ${p.active ? 'bg-[#00bdd6]/10 border-[#00bdd6]' : 'bg-[#0b1c2d] border-[#1a3854] hover:border-[#2b5278]'}`}>
                <span className="text-[#57809e] font-sans font-bold">{p.label}</span>
                <span className="text-white font-bold">{p.val}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1a3854]">
            <button className="w-full py-2 rounded bg-[#00bdd6] text-slate-950 font-black text-xs hover:bg-cyan-400">APLICAR PRESET</button>
            <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-xs hover:bg-[#1a3854]">GUARDAR ACTUAL</button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Stats + Distribution + Config + Control State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">ESTADÍSTICAS DE FRECUENCIA</div>
          <div className="flex justify-between"><span>Promedio (hoy):</span><span className="font-mono text-white">31.85 Hz</span></div>
          <div className="flex justify-between"><span>Mínimo (hoy):</span><span className="font-mono text-white">10.20 Hz</span></div>
          <div className="flex justify-between"><span>Máximo (hoy):</span><span className="font-mono text-white">52.10 Hz</span></div>
          <div className="flex justify-between"><span>Tiempo en rango normal:</span><span className="font-mono text-emerald-400 font-bold">98.2 %</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">DISTRIBUCIÓN DE FRECUENCIA</div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distData} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value">
                  {distData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">CONFIGURACIÓN DE FRECUENCIA</div>
          <div className="flex justify-between"><span>Frecuencia mínima (L):</span><span className="font-mono text-white">0.00 Hz</span></div>
          <div className="flex justify-between"><span>Frecuencia máxima (H):</span><span className="font-mono text-white">60.00 Hz</span></div>
          <div className="flex justify-between"><span>Tiempo de aceleración:</span><span className="font-mono text-white">10.0 s</span></div>
          <div className="flex justify-between"><span>Tiempo de desaceleración:</span><span className="font-mono text-white">10.0 s</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">ESTADO DE CONTROL</div>
          <div className="flex justify-between"><span>Fuente de referencia:</span><span className="font-semibold text-emerald-400">HMI Local</span></div>
          <div className="flex justify-between"><span>Modo de control:</span><span className="font-semibold text-white">V/F</span></div>
          <div className="flex justify-between"><span>Estado de marcha:</span><span className="font-semibold text-emerald-400">RUN (FWD)</span></div>
          <div className="flex justify-between"><span>Control PID:</span><span className="font-semibold text-slate-400">DESHABILITADO</span></div>
        </div>
      </div>
    </div>
  );
}
