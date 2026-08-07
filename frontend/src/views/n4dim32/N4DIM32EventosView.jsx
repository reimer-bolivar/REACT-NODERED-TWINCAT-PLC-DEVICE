import React, { useState } from 'react';
import { ShieldAlert, Filter, RefreshCw, Download, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const mockN4Events = [
  { time: '07/08/2026 14:51:36', type: 'Cambio de Estado', group: 'G4', input: 'IN-25', tag: 'Flujo Solución Rica OK', event: 'ACTIVADA', state: 'ON', detail: '1 → ON' },
  { time: '07/08/2026 14:51:22', type: 'Cambio de Estado', group: 'G4', input: 'IN-28', tag: 'VFD 1 Falla', event: 'DESACTIVADA', state: 'OFF', detail: '0 → OFF' },
  { time: '07/08/2026 14:51:10', type: 'Alarma', group: 'G2', input: 'IN-16', tag: 'Puerta Acceso Cerrada', event: 'ACTIVA', state: 'ON', detail: 'Alarma activada' },
  { time: '07/08/2026 14:50:58', type: 'Cambio de Estado', group: 'G1', input: 'IN-01', tag: 'Marcha Molino 1', event: 'ACTIVADA', state: 'ON', detail: '1 → ON' },
  { time: '07/08/2026 14:50:33', type: 'Cambio de Estado', group: 'G3', input: 'IN-21', tag: 'Filtro Prensa 2 Ciclo', event: 'ACTIVADA', state: 'ON', detail: '1 → ON' },
  { time: '07/08/2026 14:50:21', type: 'Cambio de Estado', group: 'G3', input: 'IN-22', tag: 'Filtro Prensa 2 Fin Ciclo', event: 'DESACTIVADA', state: 'OFF', detail: '0 → OFF' },
  { time: '07/08/2026 14:49:47', type: 'Información', group: 'SISTEMA', input: '--', tag: 'Comunicación Restaurada', event: 'OK', state: '--', detail: 'Módulo reconectado' },
  { time: '07/08/2026 14:49:20', type: 'Alarma', group: 'G4', input: 'IN-32', tag: 'Reserva', event: 'ACTIVA', state: 'ON', detail: 'Entrada inesperada ON' },
  { time: '07/08/2026 14:49:05', type: 'Cambio de Estado', group: 'G2', input: 'IN-11', tag: 'Nivel Alto Tanque 2', event: 'DESACTIVADA', state: 'OFF', detail: '0 → OFF' },
  { time: '07/08/2026 14:48:52', type: 'Cambio de Estado', group: 'G1', input: 'IN-05', tag: 'Presión Baja Bomba 1', event: 'ACTIVADA', state: 'ON', detail: '1 → ON' },
];

const eventPieData = [
  { name: 'Cambio de Estado', value: 1165, color: '#20d69f' },
  { name: 'Alarmas', value: 182, color: '#f7b731' },
  { name: 'Información', value: 85, color: '#00bdd6' },
];

export default function N4DIM32EventosView() {
  const [filterType, setFilterType] = useState('Todos');
  const [filterGroup, setFilterGroup] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockN4Events.filter((ev) => {
    const matchT = filterType === 'Todos' || ev.type === filterType;
    const matchG = filterGroup === 'Todos' || ev.group === filterGroup;
    const matchText = ev.tag.toLowerCase().includes(searchTerm.toLowerCase()) || ev.input.toLowerCase().includes(searchTerm.toLowerCase());
    return matchT && matchG && matchText;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-[#00bdd6]" />
            <span>N4DIM32 · EVENTOS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Registro histórico de eventos del módulo de 32 entradas
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

      {/* Main Grid: Events Table Left + Breakdown Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Events Table Left */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>REGISTRO DE EVENTOS</span>
            <span className="text-slate-400 font-mono">Mostrando {filtered.length} de 1,432 eventos</span>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854] text-xs">
            <div>
              <label className="text-[9px] text-[#57809e] uppercase font-bold block mb-1">Tipo</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full bg-[#102b3e] border border-[#204a6b] text-white rounded p-1">
                <option value="Todos">Todos los tipos</option>
                <option value="Cambio de Estado">Cambio de Estado</option>
                <option value="Alarma">Alarma</option>
                <option value="Información">Información</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] text-[#57809e] uppercase font-bold block mb-1">Grupo</label>
              <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)} className="w-full bg-[#102b3e] border border-[#204a6b] text-white rounded p-1">
                <option value="Todos">Todos los grupos</option>
                <option value="G1">Grupo 1 (IN-01 a IN-08)</option>
                <option value="G2">Grupo 2 (IN-09 a IN-16)</option>
                <option value="G3">Grupo 3 (IN-17 a IN-24)</option>
                <option value="G4">Grupo 4 (IN-25 a IN-32)</option>
                <option value="SISTEMA">Sistema</option>
              </select>
            </div>
            <div>
              <label className="text-[9px] text-[#57809e] uppercase font-bold block mb-1">Buscar</label>
              <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-[#102b3e] border border-[#204a6b] text-white rounded p-1" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">FECHA / HORA</th>
                  <th className="pb-2">TIPO</th>
                  <th className="pb-2">GRUPO</th>
                  <th className="pb-2">ENTRADA</th>
                  <th className="pb-2">ETIQUETA</th>
                  <th className="pb-2">EVENTO</th>
                  <th className="pb-2 text-right">DETALLE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {filtered.map((ev, idx) => (
                  <tr key={idx} className="hover:bg-[#0b1c2d]">
                    <td className="py-2.5 text-[#8ab3cf]">{ev.time}</td>
                    <td>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        ev.type === 'Alarma' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        ev.type === 'Cambio de Estado' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                        'bg-cyan-500/20 text-[#00bdd6] border border-cyan-500/30'
                      }`}>
                        {ev.type}
                      </span>
                    </td>
                    <td className="text-white font-bold">{ev.group}</td>
                    <td className="text-[#00bdd6] font-bold">{ev.input}</td>
                    <td className="text-white font-sans">{ev.tag}</td>
                    <td className="text-white font-bold">{ev.event}</td>
                    <td className="text-right text-[#8ab3cf]">{ev.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              RESUMEN DE EVENTOS (ÚLTIMAS 24H)
            </div>
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={eventPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                    {eventPieData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="text-xl font-black text-white font-mono">1,432</div>
                <div className="text-[9px] text-[#8ab3cf]">Total</div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 space-y-2 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              EVENTOS POR GRUPO
            </div>
            <div className="space-y-2">
              <div><div className="flex justify-between mb-1"><span className="text-slate-300">G1 - Grupo 1</span><span className="font-bold text-white font-mono">356</span></div><div className="w-full bg-[#152e48] h-1.5 rounded-full"><div className="h-full bg-emerald-400 w-[70%]"></div></div></div>
              <div><div className="flex justify-between mb-1"><span className="text-slate-300">G2 - Grupo 2</span><span className="font-bold text-white font-mono">324</span></div><div className="w-full bg-[#152e48] h-1.5 rounded-full"><div className="h-full bg-amber-400 w-[65%]"></div></div></div>
              <div><div className="flex justify-between mb-1"><span className="text-slate-300">G3 - Grupo 3</span><span className="font-bold text-white font-mono">298</span></div><div className="w-full bg-[#152e48] h-1.5 rounded-full"><div className="h-full bg-[#00bdd6] w-[60%]"></div></div></div>
              <div><div className="flex justify-between mb-1"><span className="text-slate-300">G4 - Grupo 4</span><span className="font-bold text-white font-mono">379</span></div><div className="w-full bg-[#152e48] h-1.5 rounded-full"><div className="h-full bg-blue-500 w-[75%]"></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
