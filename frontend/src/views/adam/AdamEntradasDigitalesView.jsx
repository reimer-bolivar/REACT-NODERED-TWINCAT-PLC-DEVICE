import React from 'react';
import { SlidersHorizontal, RefreshCw, Activity, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const digitalStepData = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:54:${i * 4}`,
  di1: (i % 4 === 0 || i % 4 === 1) ? 1 : 0,
  di2: 0,
  di3: (i % 6 < 3) ? 1 : 0,
  di4: 0,
  di5: 0,
  di6: (i % 5 === 0) ? 1 : 0,
}));

export default function AdamEntradasDigitalesView() {
  const diList = [
    { id: 'DI01', name: 'Nivel Bajo', state: 'ON', val: 1, activeTime: '00:01:13', lastChange: '14:57:18' },
    { id: 'DI02', name: 'Sensor Puerta', state: 'OFF', val: 0, activeTime: '--', lastChange: '14:32:05' },
    { id: 'DI03', name: 'Presión OK', state: 'ON', val: 1, activeTime: '00:00:42', lastChange: '14:58:02' },
    { id: 'DI04', name: 'Falla Térmica', state: 'OFF', val: 0, activeTime: '--', lastChange: '13:45:11' },
    { id: 'DI05', name: 'Emergencia', state: 'OFF', val: 0, activeTime: '--', lastChange: '12:10:33' },
    { id: 'DI06', name: 'Permiso Marcha', state: 'OFF', val: 0, activeTime: '--', lastChange: '11:02:07' },
  ];

  return (
    <div className="space-y-4">
      {/* View Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-[#00bdd6]" />
            <span>ADAM-6060 · ENTRADAS DIGITALES</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real de entradas digitales (DI)
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
        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TOTAL ENTRADAS</div>
          <div className="text-2xl font-black text-white font-mono">6</div>
          <div className="text-[10px] text-[#8ab3cf]">Canales DI</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ENTRADAS ACTIVAS</div>
          <div className="text-2xl font-black text-[#00bdd6] font-mono">2 / 6</div>
          <div className="text-[10px] text-[#00bdd6] font-bold">33.3 %</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO GENERAL</div>
          <div className="text-xl font-black text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>OK</span>
          </div>
          <div className="text-[10px] text-[#8ab3cf]">Dentro de rango</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FILTRO ANTI-REBOTE</div>
          <div className="text-xl font-black text-white font-mono">20 ms</div>
          <div className="text-[10px] text-[#8ab3cf]">Tiempo configurado</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-sm font-black text-white font-mono">14:54:12</div>
          <div className="text-[10px] text-[#8ab3cf]">07/08/2026</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE LECTURA</div>
          <div className="text-sm font-black text-[#00bdd6]">Polling</div>
          <div className="text-[10px] text-[#8ab3cf]">Periódico</div>
        </div>
      </div>

      {/* Main Content: Digital Inputs Table + Real-Time State Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Digital Inputs Table */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADO DE ENTRADAS DIGITALES (DI)
          </div>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">NOMBRE</th>
                <th className="pb-2 text-center">ESTADO</th>
                <th className="pb-2 text-center">VALOR</th>
                <th className="pb-2 text-right">ÚLTIMO CAMBIO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              {diList.map((di) => (
                <tr key={di.id}>
                  <td className="py-2.5 text-[#00bdd6] font-bold">{di.id}</td>
                  <td className="text-white font-sans font-semibold">{di.name}</td>
                  <td className="text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      di.state === 'ON' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {di.state}
                    </span>
                  </td>
                  <td className="text-center font-bold text-white">{di.val}</td>
                  <td className="text-right text-[#8ab3cf]">{di.lastChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Real-time State Diagram */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            DIAGRAMA DE ESTADO (TIEMPO REAL)
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={digitalStepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} domain={[0, 1.2]} ticks={[0, 1]} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="stepAfter" dataKey="di1" stroke="#20d69f" strokeWidth={2} dot={false} name="DI01 Nivel Bajo" />
                <Line type="stepAfter" dataKey="di3" stroke="#00bdd6" strokeWidth={2} dot={false} name="DI03 Presión OK" />
                <Line type="stepAfter" dataKey="di6" stroke="#9d4edd" strokeWidth={2} dot={false} name="DI06 Permiso Marcha" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transition Counters & General Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CONTADORES DE TRANSICIONES
          </div>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2 text-center">ON → OFF</th>
                <th className="pb-2 text-center">OFF → ON</th>
                <th className="pb-2 text-right">TOTAL TRANSICIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854] text-[#8ab3cf]">
              <tr><td className="py-2 text-[#00bdd6] font-bold">DI01</td><td className="text-center">5</td><td className="text-center">6</td><td className="text-right text-white font-bold">11</td></tr>
              <tr><td className="py-2 text-[#00bdd6] font-bold">DI02</td><td className="text-center">3</td><td className="text-center">3</td><td className="text-right text-white font-bold">6</td></tr>
              <tr><td className="py-2 text-[#00bdd6] font-bold">DI03</td><td className="text-center">8</td><td className="text-center">8</td><td className="text-right text-white font-bold">16</td></tr>
              <tr><td className="py-2 text-[#00bdd6] font-bold">DI04</td><td className="text-center">0</td><td className="text-center">0</td><td className="text-right text-white font-bold">0</td></tr>
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-6 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CONFIGURACIÓN DE ENTRADAS
          </div>
          <div className="space-y-2">
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5"><span className="text-[#57809e]">Polaridad:</span><span className="font-bold text-white">Normal (Activa en 1)</span></div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5"><span className="text-[#57809e]">Voltaje de entrada:</span><span className="font-bold text-emerald-400 font-mono">24 VDC</span></div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5"><span className="text-[#57809e]">Filtro anti-rebote:</span><span className="font-bold text-white font-mono">20 ms</span></div>
            <div className="flex justify-between"><span className="text-[#57809e]">Modo de adquisición:</span><span className="font-bold text-[#00bdd6]">Polling</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
