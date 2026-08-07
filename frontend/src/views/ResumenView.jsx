import React from 'react';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Gauge,
  Radio,
  Server,
  TrendingUp,
  Cpu
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const mockTrendData = [
  { time: '14:47', ai1: 6.40, ai2: 78.1, ai3: 54.5, ai4: 12.30 },
  { time: '14:48', ai1: 6.42, ai2: 78.2, ai3: 54.7, ai4: 12.35 },
  { time: '14:49', ai1: 6.41, ai2: 78.4, ai3: 54.6, ai4: 12.32 },
  { time: '14:50', ai1: 6.43, ai2: 78.3, ai3: 54.8, ai4: 12.38 },
  { time: '14:51', ai1: 6.42, ai2: 78.3, ai3: 54.7, ai4: 12.36 },
];

export default function ResumenView() {
  const gauges = [
    { id: 'AI01', title: 'Presión de descarga', val: '6.42', unit: 'bar', raw: '16342', max: 16, color: '#20d69f', percent: 40 },
    { id: 'AI02', title: 'Temperatura aceite', val: '78.3', unit: '°C', raw: '20015', max: 120, color: '#00bdd6', percent: 65 },
    { id: 'AI03', title: 'Nivel tanque', val: '54.7', unit: '%', raw: '13520', max: 100, color: '#f7b731', percent: 55 },
    { id: 'AI04', title: 'Corriente motor', val: '12.36', unit: 'A', raw: '12360', max: 30, color: '#9d4edd', percent: 41 },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner Status Info */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">ESTADO</div>
          <div className="text-sm font-black text-emerald-400 mt-1 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ONLINE</span>
          </div>
        </div>
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">COMUNICACIÓN</div>
          <div className="text-xs font-bold text-white mt-1">COM2 / RS-485</div>
        </div>
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">PROTOCOLO</div>
          <div className="text-xs font-bold text-white mt-1">Modbus RTU</div>
        </div>
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">SLAVE ID</div>
          <div className="text-sm font-black text-white font-mono mt-0.5">1</div>
        </div>
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">CANALES</div>
          <div className="text-sm font-black text-white font-mono mt-0.5">4 / 4</div>
        </div>
        <div className="glass-panel p-3">
          <div className="text-[10px] font-bold uppercase text-[#57809e]">CALIDAD GLOBAL</div>
          <div className="text-xs font-black text-emerald-400 mt-1">GOOD</div>
        </div>
      </div>

      {/* Main Gauges Grid */}
      <div>
        <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-2 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-[#00bdd6]" />
          <span>RESUMEN DE ENTRADAS ANALÓGICAS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {gauges.map((g) => (
            <div key={g.id} className="glass-panel-interactive p-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black text-[#00bdd6] font-mono">{g.id}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  GOOD
                </span>
              </div>
              <div className="text-xs font-semibold text-[#8ab3cf] mt-1 truncate">{g.title}</div>
              
              <div className="my-3 flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white font-mono tracking-tight">{g.val}</span>
                <span className="text-xs font-bold text-[#00bdd6]">{g.unit}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${g.percent}%`, backgroundColor: g.color }}
                ></div>
              </div>

              <div className="mt-2 flex justify-between text-[10px] text-[#57809e] font-mono">
                <span>RANGO: 0 - {g.max} {g.unit}</span>
                <span>{g.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: Comms + Fast Trend + Alarms */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* State of Comms */}
        <div className="glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-2">
            ESTADO DE COMUNICACIÓN
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5">
              <span className="text-[#57809e]">Puerto</span>
              <span className="font-bold text-white font-mono">COM2</span>
            </div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5">
              <span className="text-[#57809e]">Baud Rate</span>
              <span className="font-bold text-white font-mono">9600 bps</span>
            </div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5">
              <span className="text-[#57809e]">Paridad</span>
              <span className="font-bold text-white">Ninguna</span>
            </div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5">
              <span className="text-[#57809e]">Bits de datos</span>
              <span className="font-bold text-white font-mono">8</span>
            </div>
            <div className="flex justify-between border-b border-[#1a3854] pb-1.5">
              <span className="text-[#57809e]">Tiempo de respuesta</span>
              <span className="font-bold text-emerald-400 font-mono">32 ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#57809e]">Estado Enlace</span>
              <span className="text-emerald-400 font-extrabold text-xs">COMUNICACIÓN OK</span>
            </div>
          </div>
        </div>

        {/* Fast Trend Chart */}
        <div className="glass-panel p-4 flex flex-col justify-between">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-2 flex justify-between">
            <span>TENDENCIA RÁPIDA (ÚLTIMOS 5 MINUTOS)</span>
            <span className="text-[10px] text-[#00bdd6] font-mono">LIVE</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderColor: '#1a3854', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="ai1" stroke="#20d69f" strokeWidth={2} dot={false} name="AI01 Presión" />
                <Line type="monotone" dataKey="ai2" stroke="#00bdd6" strokeWidth={2} dot={false} name="AI02 Temp" />
                <Line type="monotone" dataKey="ai3" stroke="#f7b731" strokeWidth={2} dot={false} name="AI03 Nivel" />
                <Line type="monotone" dataKey="ai4" stroke="#9d4edd" strokeWidth={2} dot={false} name="AI04 Corriente" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Info & Active Alarms */}
        <div className="glass-panel p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-2">
              INFORMACIÓN DEL EQUIPO
            </div>
            <div className="space-y-1.5 text-xs text-[#8ab3cf]">
              <div className="flex justify-between">
                <span>Modelo:</span>
                <span className="font-bold text-white">VOLISON ADM</span>
              </div>
              <div className="flex justify-between">
                <span>Descripción:</span>
                <span className="font-semibold text-white">Módulo Adquisición Analógica</span>
              </div>
              <div className="flex justify-between">
                <span>Ubicación:</span>
                <span className="font-semibold text-white">Tablero General - Sala Eléctrica</span>
              </div>
              <div className="flex justify-between">
                <span>Alimentación:</span>
                <span className="font-semibold text-emerald-400">24 VDC</span>
              </div>
              <div className="flex justify-between">
                <span>Firmware:</span>
                <span className="font-mono text-white">v2.4.7</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1a3854]">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-2 flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-emerald-400" />
              <span>ALARMAS ACTIVAS</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-emerald-400">SIN ALARMAS ACTIVAS</div>
              <div className="text-[10px] text-[#8ab3cf]">Todos los canales dentro de parámetros</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
