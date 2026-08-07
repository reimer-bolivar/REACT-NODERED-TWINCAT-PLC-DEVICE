import React from 'react';
import { Cpu, RefreshCw, Download, CheckCircle2, Activity, Zap, ShieldCheck, Thermometer } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const motionTrendData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${60 - i * 4}s`,
  pos: 12345.678 + Math.sin(i / 2) * 5000,
  vel: 2500 + Math.cos(i / 2) * 800,
  torque: 18.7 + Math.sin(i / 3) * 5,
}));

export default function ASDA3ResumenView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · RESUMEN</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Resumen general del Servo Drive Delta (750 W · EtherCAT CoE)
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
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE CONTROL</div>
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
          <div className="text-[9px] text-[#8ab3cf]">Velocidad motor</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TORQUE ACTUAL</div>
          <div className="text-xl font-black text-emerald-400 font-mono">18.7 %</div>
          <div className="text-[9px] text-[#8ab3cf]">De nominal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS ACTIVAS</div>
          <div className="text-xl font-black text-emerald-400 font-mono">0</div>
          <div className="text-[9px] text-[#8ab3cf]">Sin alarmas</div>
        </div>
      </div>

      {/* Main Grid: Estado Detallado + Real-time Trend + System Load */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Estado Detallado Left */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs font-mono">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 font-sans">
            ESTADO DETALLADO
          </div>
          <div className="space-y-2">
            <div className="flex justify-between"><span>Servo On:</span><span className="text-emerald-400 font-bold">ON</span></div>
            <div className="flex justify-between"><span>Drive Enable:</span><span className="text-emerald-400 font-bold">ON</span></div>
            <div className="flex justify-between"><span>Quick Stop:</span><span className="text-slate-400">OFF</span></div>
            <div className="flex justify-between"><span>Alarma:</span><span className="text-emerald-400 font-bold">NO</span></div>
            <div className="flex justify-between"><span>Warning:</span><span className="text-emerald-400 font-bold">NO</span></div>
            <div className="flex justify-between"><span>In Position:</span><span className="text-emerald-400 font-bold">SI (±0.005)</span></div>
            <div className="flex justify-between"><span>Homing Completado:</span><span className="text-emerald-400 font-bold">SI</span></div>
            <div className="flex justify-between border-t border-[#1a3854] pt-1"><span>Freno:</span><span className="text-emerald-400 font-bold">LIBERADO</span></div>
          </div>
        </div>

        {/* Real-time Trend Center */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TENDENCIA EN TIEMPO REAL (ÚLTIMOS 60 S)
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={motionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="pos" stroke="#00bdd6" strokeWidth={2} dot={false} name="Posición (unid)" />
                <Line type="monotone" dataKey="vel" stroke="#20d69f" strokeWidth={1.5} dot={false} name="Velocidad (rpm)" />
                <Line type="monotone" dataKey="torque" stroke="#f7b731" strokeWidth={1.5} dot={false} name="Torque (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Load & Temp Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-4 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CARGA DEL SISTEMA
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1"><span className="text-slate-300">CPU del drive</span><span className="font-bold text-white font-mono">32 %</span></div>
              <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[32%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-slate-300">Potencia de salida</span><span className="font-bold text-white font-mono">28 %</span></div>
              <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden"><div className="h-full bg-[#00bdd6] w-[28%]"></div></div>
            </div>
            <div>
              <div className="flex justify-between mb-1"><span className="text-slate-300">Corriente de salida</span><span className="font-bold text-white font-mono">24 %</span></div>
              <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden"><div className="h-full bg-amber-400 w-[24%]"></div></div>
            </div>
          </div>

          <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-6 h-6 text-emerald-400" />
              <div>
                <span className="text-[10px] text-[#57809e] uppercase font-bold block">TEMPERATURA DRIVE</span>
                <span className="text-lg font-black text-emerald-400 font-mono">38.5 °C</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">NORMAL</span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Drive Info + Key Params + EtherCAT Network */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">INFORMACIÓN DEL DRIVE</div>
          <div className="flex justify-between"><span>Modelo:</span><span className="font-mono text-white font-bold">ASDA-A3 Series</span></div>
          <div className="flex justify-between"><span>Potencia:</span><span className="font-mono text-white">750 W</span></div>
          <div className="flex justify-between"><span>Voltaje Entrada:</span><span className="font-mono text-white">1/3 PH 200-230 VAC</span></div>
          <div className="flex justify-between"><span>Corriente Nominal:</span><span className="font-mono text-white">5.1 Arms</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">PARÁMETROS PRINCIPALES</div>
          <div className="flex justify-between"><span>Modo de Control:</span><span className="font-semibold text-emerald-400">CSP (Posición)</span></div>
          <div className="flex justify-between"><span>Unidades:</span><span className="font-mono text-white">Pulsos (inc)</span></div>
          <div className="flex justify-between"><span>Velocidad Máx:</span><span className="font-mono text-white">3,000 rpm</span></div>
          <div className="flex justify-between"><span>Torque Límite:</span><span className="font-mono text-emerald-400 font-bold">100 %</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1 font-mono">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1 font-sans">I/O DEL DRIVE</div>
          <div className="flex justify-between"><span>Entradas Digitales:</span><span className="text-emerald-400 font-bold">8 / 8 ✔</span></div>
          <div className="flex justify-between"><span>Salidas Digitales:</span><span className="text-emerald-400 font-bold">6 / 6 ✔</span></div>
          <div className="flex justify-between"><span>Entradas Analógicas:</span><span className="text-emerald-400 font-bold">2 / 2 ✔</span></div>
          <div className="flex justify-between"><span>Salidas Analógicas:</span><span className="text-emerald-400 font-bold">2 / 2 ✔</span></div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] font-bold text-[#00bdd6] uppercase border-b border-[#1a3854] pb-1">ESTADO DE RED ETHERCAT</div>
          <div className="flex justify-between"><span>Protocolo:</span><span className="font-mono text-white font-bold">EtherCAT (CoE)</span></div>
          <div className="flex justify-between"><span>Estado Red:</span><span className="font-bold text-emerald-400">OP (Operational)</span></div>
          <div className="flex justify-between"><span>Ciclo de Bus:</span><span className="font-mono text-white">1.00 ms</span></div>
          <div className="flex justify-between"><span>Calidad Señal:</span><span className="font-bold text-emerald-400">100 %</span></div>
        </div>
      </div>
    </div>
  );
}
