import React from 'react';
import { Radio, RefreshCw, Activity, CheckCircle2, AlertOctagon } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';

const errorCountersData = [
  { name: 'CRC Errors', count: 2 },
  { name: 'Timeouts', count: 3 },
  { name: 'Framing', count: 0 },
  { name: 'Parity', count: 0 },
  { name: 'Overrun', count: 0 },
  { name: 'Exception', count: 1 },
  { name: 'NAK / Retries', count: 2 },
];

const rs485VoltageData = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:53:${i * 2}`,
  volts: 1.24 + Math.sin(i) * 0.1,
}));

export default function RS485View() {
  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Radio className="w-5 h-5 text-[#00bdd6]" />
            <span>VOLISON ADM - RS-485</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo de comunicación serial RS-485
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>COMUNICACIÓN ACTIVA</span>
          </div>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>REFRESCAR</span>
          </button>
        </div>
      </div>

      {/* Top Comms Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="glass-panel p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-[#57809e] uppercase">REQUESTS (TX)</div>
          <div className="text-2xl font-black text-white font-mono">12,458</div>
          <div className="text-[10px] text-emerald-400 font-bold">↑ 125 hoy</div>
        </div>

        <div className="glass-panel p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-[#57809e] uppercase">RESPONSES (RX)</div>
          <div className="text-2xl font-black text-white font-mono">12,451</div>
          <div className="text-[10px] text-emerald-400 font-bold">↑ 123 hoy</div>
        </div>

        <div className="glass-panel p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-[#57809e] uppercase">TASA DE ÉXITO</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">99.94 %</div>
          <div className="w-full bg-[#152e48] h-1.5 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-emerald-400 rounded-full w-[99.9%]"></div>
          </div>
        </div>

        <div className="glass-panel p-3.5 space-y-1">
          <div className="text-[10px] font-bold text-[#57809e] uppercase">TIEMPO RESPUESTA PROM.</div>
          <div className="text-2xl font-black text-[#00bdd6] font-mono">18.6 ms</div>
          <div className="text-[10px] text-[#57809e]">Últimos 100 paquetes</div>
        </div>
      </div>

      {/* Link Status + Error Counters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Error Counters Bar Chart */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CONTADORES DE ERRORES
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={errorCountersData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis type="number" stroke="#57809e" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#8ab3cf" fontSize={10} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Bar dataKey="count" fill="#ff4d6d" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Link Status & Signal Voltage Monitor */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADO DEL ENLACE RS-485
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#0b1c2d] p-2 rounded border border-[#1a3854]">
              <span className="text-[#57809e] text-[10px] block">Nivel de señal (A-B):</span>
              <span className="text-emerald-400 font-bold font-mono">1.24 V</span>
            </div>
            <div className="bg-[#0b1c2d] p-2 rounded border border-[#1a3854]">
              <span className="text-[#57809e] text-[10px] block">Polarización:</span>
              <span className="text-emerald-400 font-bold">Habilitada</span>
            </div>
            <div className="bg-[#0b1c2d] p-2 rounded border border-[#1a3854]">
              <span className="text-[#57809e] text-[10px] block">Terminación:</span>
              <span className="text-white font-bold font-mono">120 Ω</span>
            </div>
            <div className="bg-[#0b1c2d] p-2 rounded border border-[#1a3854]">
              <span className="text-[#57809e] text-[10px] block">Ruido en línea:</span>
              <span className="text-emerald-400 font-bold">Bajo</span>
            </div>
          </div>

          <div className="h-28 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rs485VoltageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} domain={[0, 2]} />
                <Line type="monotone" dataKey="volts" stroke="#20d69f" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Packet History Table */}
      <div className="glass-panel p-4 space-y-3 text-xs">
        <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
          <span>HISTÓRICO DE COMUNICACIÓN</span>
          <button className="text-[10px] font-bold text-[#00bdd6] uppercase">Ver Histórico Completo</button>
        </div>

        <table className="w-full text-left font-mono">
          <thead>
            <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
              <th className="pb-2">HORA</th>
              <th className="pb-2">DIRECCIÓN</th>
              <th className="pb-2">FUNCIÓN</th>
              <th className="pb-2">DATOS</th>
              <th className="pb-2 text-right">TX (ms)</th>
              <th className="pb-2 text-center">ESTADO</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a3854] text-[#8ab3cf]">
            <tr><td>14:53:26.812</td><td>01</td><td>03 Read Holding Registers</td><td>08 00 10 00 04</td><td className="text-right">17.2</td><td className="text-center text-emerald-400">✔</td></tr>
            <tr><td>14:53:26.631</td><td>01</td><td>03 Read Holding Registers</td><td>08 00 10 00 04</td><td className="text-right">16.8</td><td className="text-center text-emerald-400">✔</td></tr>
            <tr><td>14:53:26.451</td><td>01</td><td>03 Read Holding Registers</td><td>08 00 10 00 04</td><td className="text-right">17.4</td><td className="text-center text-emerald-400">✔</td></tr>
            <tr><td>14:53:26.270</td><td>01</td><td>03 Read Holding Registers</td><td>08 00 10 00 04</td><td className="text-right">18.1</td><td className="text-center text-emerald-400">✔</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
