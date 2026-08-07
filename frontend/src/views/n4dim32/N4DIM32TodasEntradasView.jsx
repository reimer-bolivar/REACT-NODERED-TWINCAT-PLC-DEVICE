import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Search, Download, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const allInputs = [
  { id: 'IN-01', name: 'Marcha Molino 1', state: 'ACTIVA', val: 1, time: '14:54:10' },
  { id: 'IN-02', name: 'Paro Molino 1', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-03', name: 'Nivel Bajo Tanque 1', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-04', name: 'Nivel Alto Tanque 1', state: 'ACTIVA', val: 1, time: '14:53:58' },
  { id: 'IN-05', name: 'Presión Baja Bomba 1', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-06', name: 'Presión Alta Bomba 1', state: 'ACTIVA', val: 1, time: '14:53:45' },
  { id: 'IN-07', name: 'Falla Bomba 1', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-08', name: 'Marcha Molino 2', state: 'ACTIVA', val: 1, time: '14:53:12' },
  { id: 'IN-09', name: 'Paro Molino 2', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-10', name: 'Nivel Bajo Tanque 2', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-11', name: 'Nivel Alto Tanque 2', state: 'ACTIVA', val: 1, time: '14:53:33' },
  { id: 'IN-12', name: 'Presión Baja Bomba 2', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-13', name: 'Presión Alta Bomba 2', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-14', name: 'Falla Bomba 2', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-15', name: 'Emergencia General', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-16', name: 'Puerta Acceso Abierta', state: 'ALARMA', val: 1, time: '14:51:02' },

  { id: 'IN-17', name: 'Ventilación ON', state: 'ACTIVA', val: 1, time: '14:54:21' },
  { id: 'IN-18', name: 'Detect. Humo Sala Eléctrica', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-19', name: 'Filtro Prensa 1 Ciclo', state: 'ACTIVA', val: 1, time: '14:53:05' },
  { id: 'IN-20', name: 'Filtro Prensa 1 Fin Ciclo', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-21', name: 'Filtro Prensa 2 Ciclo', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-22', name: 'Filtro Prensa 2 Fin Ciclo', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-23', name: 'Nivel Bajo Sol. Rica', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-24', name: 'Nivel Alto Sol. Rica', state: 'ACTIVA', val: 1, time: '14:53:47' },
  { id: 'IN-25', name: 'Flujo Solución Rica OK', state: 'ACTIVA', val: 1, time: '14:53:40' },
  { id: 'IN-26', name: 'Caudal Agua Proceso OK', state: 'ACTIVA', val: 1, time: '14:53:09' },
  { id: 'IN-27', name: 'VFD 1 Listo', state: 'ACTIVA', val: 1, time: '14:53:11' },
  { id: 'IN-28', name: 'VFD 1 Falla', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-29', name: 'VFD 2 Listo', state: 'ACTIVA', val: 1, time: '14:53:14' },
  { id: 'IN-30', name: 'VFD 2 Falla', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-31', name: 'Reserva', state: 'INACTIVA', val: 0, time: '--' },
  { id: 'IN-32', name: 'Reserva', state: 'INACTIVA', val: 0, time: '--' },
];

const pieData = [
  { name: 'Activas', value: 12, color: '#20d69f' },
  { name: 'Inactivas', value: 19, color: '#334155' },
  { name: 'Alarmas', value: 1, color: '#f7b731' },
];

export default function N4DIM32TodasEntradasView() {
  const [filterState, setFilterState] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const col1 = allInputs.slice(0, 16);
  const col2 = allInputs.slice(16, 32);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-[#00bdd6]" />
            <span>N4DIM32 · 32 ENTRADAS DIGITALES</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Estado en tiempo real de las 32 entradas digitales (24 VDC)
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

      {/* Main Grid: 2 Column 32 Inputs Table Left + Summary Donut & Quick Stats Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* 32 Inputs Table Left */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between items-center">
            <span>MONITOREO DE CANALES (32 DI)</span>
            <div className="flex items-center space-x-2 font-normal text-slate-300">
              <span className="text-[10px] font-bold text-[#8ab3cf]">LEYENDA:</span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span><span className="text-[10px]">ACTIVA (1)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span><span className="text-[10px]">INACTIVA (0)</span></span>
              <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-[10px]">ALARMA</span></span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Col 1: IN-01 to IN-16 */}
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">N°</th>
                  <th className="pb-2">ETIQUETA</th>
                  <th className="pb-2 text-center">ESTADO</th>
                  <th className="pb-2 text-center">VALOR</th>
                  <th className="pb-2 text-right">TIEMPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {col1.map((item) => (
                  <tr key={item.id} className="hover:bg-[#0b1c2d]">
                    <td className="py-1.5 text-[#00bdd6] font-bold">{item.id}</td>
                    <td className="text-white font-sans text-[11px]">{item.name}</td>
                    <td className="text-center">
                      <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                        item.state === 'ACTIVA' ? 'bg-emerald-400 shadow-[0_0_6px_#20d69f]' :
                        item.state === 'ALARMA' ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                      }`}></span>
                    </td>
                    <td className="text-center font-bold text-white">{item.val}</td>
                    <td className="text-right text-[#8ab3cf] text-[10px]">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Col 2: IN-17 to IN-32 */}
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">N°</th>
                  <th className="pb-2">ETIQUETA</th>
                  <th className="pb-2 text-center">ESTADO</th>
                  <th className="pb-2 text-center">VALOR</th>
                  <th className="pb-2 text-right">TIEMPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {col2.map((item) => (
                  <tr key={item.id} className="hover:bg-[#0b1c2d]">
                    <td className="py-1.5 text-[#00bdd6] font-bold">{item.id}</td>
                    <td className="text-white font-sans text-[11px]">{item.name}</td>
                    <td className="text-center">
                      <span className={`w-2.5 h-2.5 rounded-full inline-block ${
                        item.state === 'ACTIVA' ? 'bg-emerald-400 shadow-[0_0_6px_#20d69f]' :
                        item.state === 'ALARMA' ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'
                      }`}></span>
                    </td>
                    <td className="text-center font-bold text-white">{item.val}</td>
                    <td className="text-right text-[#8ab3cf] text-[10px]">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Donut + Quick Stats + Filters */}
        <div className="lg:col-span-4 space-y-4">
          {/* Donut Chart */}
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              RESUMEN DE ENTRADAS
            </div>
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                    {pieData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <div className="text-xl font-black text-white font-mono">32</div>
                <div className="text-[9px] text-[#8ab3cf]">Total</div>
              </div>
            </div>
            <div className="space-y-1 text-xs text-[#8ab3cf]">
              <div className="flex justify-between"><span className="text-emerald-400 font-bold">Activas:</span><span className="font-mono text-white">12 (37.5 %)</span></div>
              <div className="flex justify-between"><span>Inactivas:</span><span className="font-mono text-white">19 (59.4 %)</span></div>
              <div className="flex justify-between"><span className="text-amber-400 font-bold">Alarmas:</span><span className="font-mono text-amber-400">1 (3.1 %)</span></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-panel p-4 space-y-2 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              ESTADÍSTICAS RÁPIDAS
            </div>
            <div className="space-y-1.5 text-[#8ab3cf]">
              <div className="flex justify-between"><span>Primer cambio hoy:</span><span className="font-mono text-white">06:12:33</span></div>
              <div className="flex justify-between"><span>Total de cambios hoy:</span><span className="font-mono text-white font-bold">186</span></div>
              <div className="flex justify-between"><span>Entrada con más cambios:</span><span className="font-mono text-[#00bdd6] font-bold">IN-06 (18)</span></div>
              <div className="flex justify-between"><span>Entradas sin cambios:</span><span className="font-mono text-white">14</span></div>
              <div className="flex justify-between"><span>Tiempo promedio activa:</span><span className="font-mono text-white">02:34:18</span></div>
            </div>
          </div>

          {/* Filters Box */}
          <div className="glass-panel p-4 space-y-3 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              FILTRO / BÚSQUEDA
            </div>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Buscar etiqueta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]"
              />
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]"
              >
                <option value="Todas">Todas las entradas</option>
                <option value="Activas">Solo Activas</option>
                <option value="Inactivas">Solo Inactivas</option>
                <option value="Alarmas">Solo Alarmas</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
