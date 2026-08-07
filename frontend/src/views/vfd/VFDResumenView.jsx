import React, { useState } from 'react';
import { Gauge, Play, Square, RefreshCw, Activity, CheckCircle2, ShieldCheck, Clock, AlertTriangle, Zap } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockVfdTrend = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:${44 + i * 2}`,
  freq: 31.9 + Math.sin(i) * 0.3,
  ref: 31.9,
}));

export default function VFDResumenView() {
  const [freq, setFreq] = useState(31.9);
  const [direction, setDirection] = useState('FWD');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · RESUMEN</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo general del variador de frecuencia (55 kW / 75 HP)
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

      {/* Top Row: Primary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO GENERAL</div>
          <div className="text-xs font-black text-emerald-400 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>OPERATIVO</span>
          </div>
          <div className="text-[9px] text-[#8ab3cf]">Sin alarmas activas</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE OPERACIÓN</div>
          <div className="text-xs font-black text-emerald-400">RUN (RUN FWD)</div>
          <div className="text-[9px] text-[#8ab3cf]">Funcionando</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">31.90 Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">53.2 % del rango</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">REFERENCIA FRECUENCIA</div>
          <div className="text-xl font-black text-white font-mono">31.90 Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">Desde HMI / Remoto</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD MOTOR</div>
          <div className="text-xl font-black text-white font-mono">1,150 RPM</div>
          <div className="text-[9px] text-[#8ab3cf]">4 polos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CARGA DEL MOTOR</div>
          <div className="text-xl font-black text-emerald-400 font-mono">52.1 %</div>
          <div className="text-[9px] text-[#8ab3cf]">23.4 A</div>
        </div>
      </div>

      {/* Secondary Metrics Band */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">TENSIÓN SALIDA (U)</span>
          <span className="text-base font-black text-white font-mono">228 V</span>
        </div>
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">CORRIENTE SALIDA (U)</span>
          <span className="text-base font-black text-emerald-400 font-mono">23.4 A</span>
        </div>
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">POTENCIA SALIDA</span>
          <span className="text-base font-black text-white font-mono">12.3 kW</span>
        </div>
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">VOLTAJE DC BUS</span>
          <span className="text-base font-black text-amber-400 font-mono">540 VDC</span>
        </div>
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">TEMP. DISIPADOR</span>
          <span className="text-base font-black text-white font-mono">42.5 °C</span>
        </div>
        <div className="glass-panel p-2.5 text-center">
          <span className="text-[9px] text-[#57809e] uppercase font-bold block">TIEMPO OPERACIÓN</span>
          <span className="text-base font-black text-white font-mono">124:37:25</span>
        </div>
      </div>

      {/* Main Grid: Control Rápido + Tendencia 10 min + Alarmas Activas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Quick Control Gauge Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL RÁPIDO
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-36 h-36 rounded-full border-4 border-[#00bdd6] flex flex-col items-center justify-center bg-[#0b1c2d]">
              <span className="text-3xl font-black text-white font-mono">31.90</span>
              <span className="text-xs font-bold text-[#00bdd6]">Hz</span>
              <span className="text-[9px] text-[#57809e] mt-1">Referencia</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            <button className="py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
              <Play className="w-4 h-4 fill-current" />
              <span>RUN (FWD)</span>
            </button>
            <button className="py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
              <Square className="w-4 h-4 fill-current" />
              <span>STOP / RESET</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div>
              <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Dirección</label>
              <select value={direction} onChange={(e) => setDirection(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-1.5 font-bold">
                <option value="FWD">FWD (Adelante)</option>
                <option value="REV">REV (Reversa)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Referencia</label>
              <select className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-1.5 font-bold">
                <option>Desde HMI</option>
                <option>Comunicación</option>
              </select>
            </div>
          </div>
        </div>

        {/* 10 Min Frequency Trend Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA DE FRECUENCIA (ÚLTIMOS 10 MINUTOS)
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockVfdTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis domain={[0, 60]} stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="freq" stroke="#20d69f" strokeWidth={2} dot={false} name="Frecuencia Actual (Hz)" />
                <Line type="monotone" dataKey="ref" stroke="#00bdd6" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Referencia (Hz)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Alarms Box Right */}
        <div className="lg:col-span-3 glass-panel p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              ALARMAS ACTIVAS
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center my-4 space-y-1">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <div className="text-xs font-black text-emerald-400 uppercase">SIN ALARMAS</div>
              <p className="text-[10px] text-[#8ab3cf]">El variador opera dentro de los parámetros normales.</p>
            </div>
          </div>

          <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
            VER HISTORIAL
          </button>
        </div>
      </div>

      {/* Bottom Summary Band: Motor Info + DI Status + DO Status + Fault Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">INFORMACIÓN DEL MOTOR</div>
          <div className="flex justify-between"><span>Potencia Nominal:</span><span className="font-mono text-white">55 kW / 75 HP</span></div>
          <div className="flex justify-between"><span>Tensión Nominal:</span><span className="font-mono text-white">230 VAC</span></div>
          <div className="flex justify-between"><span>Corriente Nominal:</span><span className="font-mono text-white">182 A</span></div>
          <div className="flex justify-between"><span>Frecuencia Nominal:</span><span className="font-mono text-white">60.00 Hz</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1 font-mono">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1 font-sans">ESTADO DE ENTRADAS DIGITALES</div>
          <div className="flex justify-between"><span>DI1 - RUN/STOP:</span><span className="text-emerald-400 font-bold">ON</span></div>
          <div className="flex justify-between"><span>DI2 - FWD/REV:</span><span className="text-emerald-400 font-bold">ON</span></div>
          <div className="flex justify-between"><span>DI3 - RESET:</span><span className="text-slate-400">OFF</span></div>
          <div className="flex justify-between"><span>DI4 - JOG:</span><span className="text-slate-400">OFF</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1 font-mono">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1 font-sans">ESTADO DE SALIDAS</div>
          <div className="flex justify-between"><span>DO1 - RUN:</span><span className="text-emerald-400 font-bold">ON</span></div>
          <div className="flex justify-between"><span>DO2 - ALARM:</span><span className="text-slate-400">OFF</span></div>
          <div className="flex justify-between"><span>DO3 - READY:</span><span className="text-emerald-400 font-bold">ON</span></div>
          <div className="flex justify-between"><span>DO4 - AT SPEED:</span><span className="text-emerald-400 font-bold">ON</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">RESUMEN DE FALLAS</div>
          <div className="flex justify-between"><span>Alarmas Activas:</span><span className="font-mono text-white">0</span></div>
          <div className="flex justify-between"><span>Advertencias:</span><span className="font-mono text-white">0</span></div>
          <div className="flex justify-between"><span>Última Alarma:</span><span className="font-mono text-slate-400">---</span></div>
          <div className="flex justify-between"><span>Último Reset:</span><span className="font-mono text-white">07/08/2026</span></div>
        </div>
      </div>
    </div>
  );
}
