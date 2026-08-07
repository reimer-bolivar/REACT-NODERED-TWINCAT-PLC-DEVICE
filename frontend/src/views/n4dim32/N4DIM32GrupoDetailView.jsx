import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Activity, CheckCircle2, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

const mockGroupWaveform = Array.from({ length: 20 }).map((_, i) => ({
  time: `14:${24 + i}`,
  val: (i % 6 < 3) ? 1 : 0,
}));

export default function N4DIM32GrupoDetailView({ groupId = 1 }) {
  const startIdx = (groupId - 1) * 8 + 1;
  const endIdx = groupId * 8;

  const mockGroupInputs = Array.from({ length: 8 }).map((_, i) => {
    const num = startIdx + i;
    const padNum = num < 10 ? `0${num}` : `${num}`;
    const names = [
      'Marcha Molino 1', 'Paro Molino 1', 'Nivel Bajo Tanque 1', 'Nivel Alto Tanque 1',
      'Presión Baja Bomba 1', 'Presión Alta Bomba 1', 'Falla Bomba 1', 'Marcha Molino 2',
      'Paro Molino 2', 'Nivel Bajo Tanque 2', 'Nivel Alto Tanque 2', 'Presión Baja Bomba 2',
      'Presión Alta Bomba 2', 'Falla Bomba 2', 'Emergencia General 2', 'Puerta Acceso Cerrada',
      'Ventilación ON', 'Detect. Humo Sala Eléctrica', 'Filtro Prensa 1 Ciclo', 'Filtro Prensa 1 Fin Ciclo',
      'Filtro Prensa 2 Ciclo', 'Filtro Prensa 2 Fin Ciclo', 'Nivel Bajo Sol. Rica', 'Nivel Alto Sol. Rica',
      'Flujo Solución Rica OK', 'Caudal Agua Proceso OK', 'VFD 1 Listo', 'VFD 1 Falla',
      'VFD 2 Listo', 'VFD 2 Falla', 'Reserva 1', 'Reserva 2'
    ];

    const isActive = (i % 3 !== 2);
    return {
      num: i + 1,
      id: `IN-${padNum}`,
      name: names[num - 1] || `Entrada Digital ${padNum}`,
      state: isActive ? 'ACTIVA' : 'INACTIVA',
      val: isActive ? 1 : 0,
      voltage: isActive ? 24.3 : 0.1,
      time: `14:53:${10 + i * 5}`,
      counter: 15234 - i * 1200,
      filter: 20,
    };
  });

  const [selectedInput, setSelectedInput] = useState(mockGroupInputs[0]);

  const activeCount = mockGroupInputs.filter((x) => x.state === 'ACTIVA').length;
  const inactiveCount = 8 - activeCount;

  const groupDonut = [
    { name: 'Activas', value: activeCount, color: '#20d69f' },
    { name: 'Inactivas', value: inactiveCount, color: '#334155' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-[#00bdd6]" />
            <span>N4DIM32 · GRUPO {groupId} (IN-{startIdx < 10 ? `0${startIdx}` : startIdx} A IN-{endIdx < 10 ? `0${endIdx}` : endIdx})</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real del Grupo {groupId} de entradas digitales (24 VDC)
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

      {/* Group Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ENTRADAS DEL GRUPO</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">8</div>
          <div className="text-[9px] text-[#8ab3cf]">IN-{startIdx < 10 ? `0${startIdx}` : startIdx} a IN-{endIdx < 10 ? `0${endIdx}` : endIdx}</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ACTIVAS</div>
          <div className="text-xl font-black text-emerald-400 font-mono">{activeCount}</div>
          <div className="text-[9px] text-emerald-400 font-bold">{((activeCount / 8) * 100).toFixed(1)} %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">INACTIVAS</div>
          <div className="text-xl font-black text-slate-400 font-mono">{inactiveCount}</div>
          <div className="text-[9px] text-[#8ab3cf]">{((inactiveCount / 8) * 100).toFixed(1)} %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS / FALLA</div>
          <div className="text-xl font-black text-emerald-400 font-mono">0</div>
          <div className="text-[9px] text-[#8ab3cf]">0.0 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMO CAMBIO</div>
          <div className="text-sm font-black text-white font-mono">14:54:10</div>
          <div className="text-[9px] text-[#8ab3cf]">IN-01 (ON)</div>
        </div>
      </div>

      {/* Main Grid: Group Inputs Table + Right Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Real-time Group Inputs Table Left */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADO EN TIEMPO REAL - GRUPO {groupId}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">N°</th>
                  <th className="pb-2">ETIQUETA</th>
                  <th className="pb-2">DESCRIPCIÓN</th>
                  <th className="pb-2 text-center">ESTADO</th>
                  <th className="pb-2 text-center">VALOR</th>
                  <th className="pb-2 text-center">TENSIÓN (V)</th>
                  <th className="pb-2 text-center">TIEMPO ACT.</th>
                  <th className="pb-2 text-right">CONTADOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {mockGroupInputs.map((item) => {
                  const isSel = selectedInput.id === item.id;
                  return (
                    <tr key={item.id} onClick={() => setSelectedInput(item)} className={`cursor-pointer hover:bg-[#0b1c2d] ${isSel ? 'bg-[#00bdd6]/10 font-bold' : ''}`}>
                      <td className="py-2.5 text-[#57809e]">{item.num}</td>
                      <td className="text-[#00bdd6] font-bold">{item.id}</td>
                      <td className="text-white font-sans">{item.name}</td>
                      <td className="text-center">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                          item.state === 'ACTIVA' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.state}
                        </span>
                      </td>
                      <td className="text-center text-white font-bold">{item.val} ({item.state === 'ACTIVA' ? 'ON' : 'OFF'})</td>
                      <td className="text-center text-emerald-400 font-bold">{item.voltage.toFixed(1)}</td>
                      <td className="text-center text-[#8ab3cf]">{item.time}</td>
                      <td className="text-right text-white">{item.counter}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Selected Input Waveform Detail Panel */}
          <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] space-y-2 mt-3">
            <div className="text-xs font-black uppercase text-[#00bdd6] flex justify-between border-b border-[#1a3854] pb-1">
              <span>DETALLE DE ENTRADA SELECCIONADA: {selectedInput.id} - {selectedInput.name}</span>
              <span className="text-emerald-400">HISTORIAL DE ESTADO (ÚLTIMOS 30 MIN)</span>
            </div>

            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGroupWaveform}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                  <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                  <YAxis domain={[0, 1.2]} ticks={[0, 1]} stroke="#57809e" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                  <Line type="stepAfter" dataKey="val" stroke="#20d69f" strokeWidth={2} dot={false} name="Estado (1/0)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Panel: Group LED Map + Donut + Specs */}
        <div className="lg:col-span-4 space-y-4">
          {/* LED Map for Group */}
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              MAPA DEL GRUPO {groupId}
            </div>

            <div className="grid grid-cols-4 gap-2 py-2">
              {mockGroupInputs.map((item) => (
                <div key={item.id} className="flex flex-col items-center justify-center p-2 rounded bg-[#0b1c2d] border border-[#1a3854]">
                  <span className="text-[10px] font-mono text-[#00bdd6] font-bold mb-1">{item.id}</span>
                  <span className={`w-3.5 h-3.5 rounded-full ${
                    item.state === 'ACTIVA' ? 'bg-emerald-400 shadow-[0_0_8px_#20d69f]' : 'bg-slate-700'
                  }`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Donut */}
          <div className="glass-panel p-4 space-y-3">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              ESTADÍSTICAS DEL GRUPO {groupId}
            </div>
            <div className="h-40 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={groupDonut} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                    {groupDonut.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 text-xs text-[#8ab3cf]">
              <div className="flex justify-between"><span className="text-emerald-400 font-bold">Activas ({activeCount}):</span><span className="font-mono text-white">{((activeCount / 8) * 100).toFixed(1)} %</span></div>
              <div className="flex justify-between"><span>Inactivas ({inactiveCount}):</span><span className="font-mono text-white">{((inactiveCount / 8) * 100).toFixed(1)} %</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
