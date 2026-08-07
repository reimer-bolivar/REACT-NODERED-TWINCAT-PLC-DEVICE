import React from 'react';
import { Cpu, Radio, Activity, Zap, ShieldCheck, Clock, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

const activeTrend = Array.from({ length: 15 }).map((_, i) => ({
  time: `14:${39 + i}`,
  count: 8 + Math.floor(Math.sin(i) * 3 + (i % 4 === 0 ? 3 : 1)),
}));

const donutData = [
  { name: 'Activas', value: 12, color: '#20d69f' },
  { name: 'Inactivas', value: 20, color: '#334155' },
];

export default function N4DIM32ResumenView() {
  const inputsStatus = Array.from({ length: 32 }).map((_, i) => {
    const activeIndices = [0, 3, 5, 7, 8, 9, 10, 13, 14, 16, 17, 18, 20, 24, 25, 26, 28, 30];
    return {
      num: i + 1,
      active: activeIndices.includes(i),
    };
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>N4DIM32 · RESUMEN DEL MÓDULO</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Estado general y monitoreo del módulo de entradas digitales (32 Canales 24 VDC)
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
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO DEL MÓDULO</div>
          <div className="text-xs font-black text-emerald-400 flex items-center justify-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>OPERATIVO</span>
          </div>
          <div className="text-[9px] text-[#8ab3cf]">Funcionamiento normal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CANALES</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">32</div>
          <div className="text-[9px] text-[#8ab3cf]">Entradas digitales</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ENTRADAS ACTIVAS</div>
          <div className="text-xl font-black text-emerald-400 font-mono">12</div>
          <div className="text-[9px] text-emerald-400 font-bold">37.5 % del total</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ENTRADAS INACTIVAS</div>
          <div className="text-xl font-black text-slate-400 font-mono">20</div>
          <div className="text-[9px] text-[#8ab3cf]">62.5 % del total</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TENSIÓN DE ALIMENTACIÓN</div>
          <div className="text-xl font-black text-white font-mono">24.1 VDC</div>
          <div className="text-[9px] text-[#8ab3cf]">Rango: 18 – 30 VDC</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CONSUMO DEL MÓDULO</div>
          <div className="text-xl font-black text-white font-mono">80 mA</div>
          <div className="text-[9px] text-[#8ab3cf]">@ 24 VDC</div>
        </div>
      </div>

      {/* Main Grid: 32 LED Grid Left + Donut Chart Center + Module Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 32 Digital Input LED Grid Left */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            MAPA DEL MÓDULO (32 ENTRADAS)
          </div>

          <div className="grid grid-cols-8 gap-2 py-2">
            {inputsStatus.map((inp) => (
              <div key={inp.num} className="flex flex-col items-center justify-center p-2 rounded bg-[#0b1c2d] border border-[#1a3854]">
                <span className="text-[10px] font-mono text-[#8ab3cf] mb-1">{inp.num}</span>
                <span className={`w-3.5 h-3.5 rounded-full ${
                  inp.active ? 'bg-emerald-400 shadow-[0_0_8px_#20d69f]' : 'bg-slate-700'
                }`}></span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-6 pt-2 border-t border-[#1a3854] text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="text-white font-semibold">Activas (12)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-slate-700"></span>
              <span className="text-[#8ab3cf] font-semibold">Inactivas (20)</span>
            </div>
          </div>
        </div>

        {/* Resumen Entradas Donut Chart Center */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3 flex flex-col justify-between">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            RESUMEN DE ENTRADAS
          </div>

          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value">
                  {donutData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <div className="text-xl font-black text-white font-mono">37.5%</div>
              <div className="text-[9px] text-[#8ab3cf]">Activas</div>
            </div>
          </div>

          <div className="space-y-1 text-xs pt-2 border-t border-[#1a3854]">
            <div className="flex justify-between"><span>Activas:</span><span className="font-mono text-emerald-400 font-bold">12 (37.5 %)</span></div>
            <div className="flex justify-between"><span>Inactivas:</span><span className="font-mono text-slate-400 font-bold">20 (62.5 %)</span></div>
            <div className="flex justify-between font-bold border-t border-[#1a3854] pt-1"><span className="text-white">Total de entradas:</span><span className="font-mono text-[#00bdd6]">32</span></div>
          </div>
        </div>

        {/* Module Spec Info Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            INFORMACIÓN DEL MÓDULO
          </div>

          <div className="space-y-2 text-[#8ab3cf]">
            <div className="flex justify-between"><span>Modelo:</span><span className="font-bold text-white font-mono">N4DIM32</span></div>
            <div className="flex justify-between"><span>Tipo:</span><span className="font-bold text-white">Módulo Entradas Digitales</span></div>
            <div className="flex justify-between"><span>Canales:</span><span className="font-bold text-white font-mono">32 Entradas</span></div>
            <div className="flex justify-between"><span>Tipo de entrada:</span><span className="font-bold text-emerald-400">Digital (24 VDC)</span></div>
            <div className="flex justify-between"><span>Lógica:</span><span className="font-bold text-white">PNP / NPN (software)</span></div>
            <div className="flex justify-between"><span>Aislamiento:</span><span className="font-bold text-white font-mono">1500 VDC</span></div>
            <div className="flex justify-between"><span>Tiempo respuesta:</span><span className="font-bold text-white font-mono">5 ms (típico)</span></div>
            <div className="flex justify-between"><span>Montaje:</span><span className="font-bold text-white">Riel DIN</span></div>
            <div className="flex justify-between"><span>Temp. operación:</span><span className="font-bold text-white font-mono">-10 °C ~ +60 °C</span></div>
            <div className="flex justify-between border-t border-[#1a3854] pt-1"><span>Firmware:</span><span className="font-bold text-[#00bdd6] font-mono">v1.21</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: 15 Min Trend + Daily Stats + Communication Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Active Inputs Trend 15 Min */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            ENTRADAS ACTIVAS (ÚLTIMAS 15 MIN)
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activeTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis domain={[0, 16]} stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="stepAfter" dataKey="count" stroke="#20d69f" strokeWidth={2} dot={false} name="Entradas Activas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Statistics */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADÍSTICAS DEL DÍA
          </div>
          <div className="space-y-2 text-[#8ab3cf]">
            <div className="flex justify-between"><span>Tiempo de operación:</span><span className="font-mono text-white font-bold">14:54:12</span></div>
            <div className="flex justify-between"><span>Entradas activas (promedio):</span><span className="font-mono text-white font-bold">11 (34.4 %)</span></div>
            <div className="flex justify-between"><span>Máximo de entradas activas:</span><span className="font-mono text-emerald-400 font-bold">15 (46.9 %)</span></div>
            <div className="flex justify-between"><span>Mínimo de entradas activas:</span><span className="font-mono text-white font-bold">7 (21.9 %)</span></div>
            <div className="flex justify-between"><span>Cambios de estado:</span><span className="font-mono text-[#00bdd6] font-bold">186</span></div>
            <div className="flex justify-between"><span>Errores de comunicación:</span><span className="font-mono text-emerald-400 font-bold">0</span></div>
          </div>
        </div>

        {/* Communication Status */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADO DE COMUNICACIÓN
          </div>
          <div className="space-y-2 text-[#8ab3cf]">
            <div className="flex justify-between"><span>Estado:</span><span className="font-bold text-emerald-400">Conectado ✔</span></div>
            <div className="flex justify-between"><span>Última comunicación:</span><span className="font-mono text-white">14:54:12</span></div>
            <div className="flex justify-between"><span>Estado enlace RS-485:</span><span className="font-bold text-emerald-400">OK ✔</span></div>
            <div className="flex justify-between"><span>Tramas recibidas:</span><span className="font-mono text-white font-bold">12,458</span></div>
            <div className="flex justify-between"><span>Tramas con error:</span><span className="font-mono text-emerald-400 font-bold">0</span></div>
            <div className="flex justify-between"><span>Calidad de señal:</span><span className="font-bold text-emerald-400">Excelente (100%)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
