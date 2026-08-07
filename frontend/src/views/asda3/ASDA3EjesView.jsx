import React from 'react';
import { Cpu, RefreshCw, Download, CheckCircle2, Settings, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

const sparklineData = Array.from({ length: 10 }).map((_, i) => ({
  val: 2000 + Math.sin(i) * 500,
}));

const axesDonut = [
  { name: 'Activos', value: 4, color: '#20d69f' },
  { name: 'Deshabilitados', value: 1, color: '#334155' },
];

export default function ASDA3EjesView() {
  const axesList = [
    { num: 1, name: 'Eje X', state: 'READY', mode: 'CSP', pos: '12345.678', vel: '2500', torque: '18.7 %', alarms: 0, load: 32, err: '0.003' },
    { num: 2, name: 'Eje Y', state: 'READY', mode: 'CSP', pos: '-5432.100', vel: '1800', torque: '12.3 %', alarms: 0, load: 28, err: '0.002' },
    { num: 3, name: 'Eje Z', state: 'READY', mode: 'PP', pos: '200.000', vel: '800', torque: '8.5 %', alarms: 0, load: 18, err: '0.005' },
    { num: 4, name: 'Eje R (Rotativo)', state: 'READY', mode: 'CST', pos: '359.250 °', vel: '1200', torque: '15.1 %', alarms: 0, load: 26, err: '0.010 °' },
    { num: 5, name: 'Eje U (Auxiliar)', state: 'DISABLED', mode: '--', pos: '0.000', vel: '0', torque: '0.0 %', alarms: 0, load: 0, err: '--' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · EJES</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo y estado de los ejes controlados por el servo drive
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <Download className="w-3.5 h-3.5" />
            <span>EXPORTAR</span>
          </button>
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>REFRESCAR</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Axes Summary Table Left + Donut & Sync Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Axes Summary Table */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>EJES RESUMEN</span>
            <button className="text-[10px] text-[#00bdd6] font-bold flex items-center space-x-1"><Settings className="w-3 h-3" /><span>CONFIGURAR EJES</span></button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">EJE</th>
                  <th className="pb-2">NOMBRE</th>
                  <th className="pb-2 text-center">ESTADO</th>
                  <th className="pb-2 text-center">MODO</th>
                  <th className="pb-2 text-center">POSICIÓN ACTUAL</th>
                  <th className="pb-2 text-center">VELOCIDAD</th>
                  <th className="pb-2 text-center">TORQUE</th>
                  <th className="pb-2 text-right">ALARMAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {axesList.map((ax) => (
                  <tr key={ax.num} className="hover:bg-[#0b1c2d]">
                    <td className="py-2.5 text-[#00bdd6] font-bold">{ax.num}</td>
                    <td className="text-white font-sans font-semibold">{ax.name}</td>
                    <td className="text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                        ax.state === 'READY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {ax.state}
                      </span>
                    </td>
                    <td className="text-center font-bold text-[#00bdd6]">{ax.mode}</td>
                    <td className="text-center text-white font-bold">{ax.pos}</td>
                    <td className="text-center text-white">{ax.vel} rpm</td>
                    <td className="text-center text-emerald-400 font-bold">{ax.torque}</td>
                    <td className="text-right text-emerald-400 font-bold">{ax.alarms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Donut & Sync Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              RESUMEN GENERAL DE EJES
            </div>
            <div className="h-36 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={axesDonut} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                    {axesDonut.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="text-xl font-black text-white font-mono">4 / 5</div>
                <div className="text-[9px] text-[#8ab3cf]">Activos</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-2 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              SINCRONIZACIÓN ETHERCAT
            </div>
            <div className="space-y-1.5 text-[#8ab3cf]">
              <div className="flex justify-between"><span>Estado de sincronía:</span><span className="font-bold text-emerald-400">SYNCHRONIZED ✔</span></div>
              <div className="flex justify-between"><span>Desfase de ciclo:</span><span className="font-mono text-white">0.12 ms</span></div>
              <div className="flex justify-between"><span>Jitter máximo:</span><span className="font-mono text-white">0.45 ms</span></div>
              <div className="flex justify-between"><span>Referencia de tiempo:</span><span className="font-bold text-emerald-400">OK</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detalle por Eje 5 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {axesList.map((ax) => (
          <div key={ax.num} className="glass-panel p-3 space-y-2">
            <div className="flex justify-between items-center border-b border-[#1a3854] pb-1 text-xs">
              <span className="font-black text-white">{ax.name}</span>
              <span className={`text-[9px] font-bold ${ax.state === 'READY' ? 'text-emerald-400' : 'text-slate-500'}`}>{ax.state}</span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between"><span className="text-[#57809e] font-sans">Modo:</span><span className="text-[#00bdd6] font-bold">{ax.mode}</span></div>
              <div className="flex justify-between"><span className="text-[#57809e] font-sans">Posición:</span><span className="text-white font-bold">{ax.pos}</span></div>
              <div className="flex justify-between"><span className="text-[#57809e] font-sans">Velocidad:</span><span className="text-white">{ax.vel} rpm</span></div>
              <div className="flex justify-between"><span className="text-[#57809e] font-sans">Torque:</span><span className="text-emerald-400 font-bold">{ax.torque}</span></div>
              <div className="flex justify-between"><span className="text-[#57809e] font-sans">Error pos.:</span><span className="text-white">{ax.err}</span></div>
            </div>

            <div className="h-10 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line type="monotone" dataKey="val" stroke={ax.state === 'READY' ? '#20d69f' : '#475569'} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
