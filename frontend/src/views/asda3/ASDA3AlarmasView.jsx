import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Download, CheckCircle2, VolumeX, RotateCcw } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const mockAsdaAlarms = [
  { id: '1', priority: 'ADVERTENCIA', code: 'A.212', desc: 'Sobre carga del motor (Torque actual excede el límite permitido)', state: 'ACTIVA', start: '14:51:32', duration: '00:01:03', origin: 'Motor' },
  { id: '2', priority: 'ADVERTENCIA', code: 'A.311', desc: 'Temperatura del drive alta (Temperatura interna cercana al límite)', state: 'ACTIVA', start: '14:51:28', duration: '00:01:07', origin: 'Drive' },
  { id: '3', priority: 'INFORMACIÓN', code: 'I.301', desc: 'Límite de velocidad alcanzado (Comando limitado por parámetro)', state: 'ACTIVA', start: '14:51:20', duration: '00:01:15', origin: 'Control' },
  { id: '4', priority: 'ALARMA', code: 'E.013', desc: 'Error de comunicación EtherCAT (Pérdida momentánea de comunicación)', state: 'HISTÓRICA', start: '14:48:45', duration: '00:00:02', origin: 'Comunic.' },
  { id: '5', priority: 'ALARMA', code: 'E.021', desc: 'Sobretensión del bus DC (Voltaje del bus DC excede el límite)', state: 'HISTÓRICA', start: '14:47:10', duration: '00:00:01', origin: 'Drive' },
  { id: '6', priority: 'ADVERTENCIA', code: 'A.203', desc: 'Desbalance de carga (Desbalance detectado en las fases)', state: 'HISTÓRICA', start: '14:45:33', duration: '00:00:03', origin: 'Motor' },
  { id: '7', priority: 'INFORMACIÓN', code: 'I.101', desc: 'Power On / Drive Ready (El drive ha sido energizado)', state: 'HISTÓRICA', start: '14:44:12', duration: '00:00:00', origin: 'Sistema' },
];

const alarmPieData = [
  { name: 'Críticas', value: 3, color: '#ff4d6d' },
  { name: 'Advertencias', value: 7, color: '#f7b731' },
  { name: 'Información', value: 8, color: '#2563eb' },
];

const alarmBarData = [
  { hour: '14:00', count: 2 }, { hour: '16:00', count: 5 }, { hour: '18:00', count: 3 },
  { hour: '20:00', count: 4 }, { hour: '22:00', count: 1 }, { hour: '00:00', count: 3 },
  { hour: '02:00', count: 2 }, { hour: '04:00', count: 4 }, { hour: '06:00', count: 2 },
  { hour: '08:00', count: 5 }, { hour: '10:00', count: 3 }, { hour: '12:00', count: 4 },
];

export default function ASDA3AlarmasView() {
  const [selectedAlarm, setSelectedAlarm] = useState(mockAsdaAlarms[0]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>ASDA-A3 · ALARMAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo y diagnóstico de alarmas del servo drive
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
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO ACTIVO</div>
          <div className="text-sm font-black text-[#00bdd6]">CSP</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EJE SELECCIONADO</div>
          <div className="text-sm font-black text-white">Eje X (1 de 4)</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1 border-l-4 border-l-amber-500">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS ACTIVAS</div>
          <div className="text-xl font-black text-amber-400 font-mono">2</div>
          <div className="text-[9px] text-amber-400 font-bold">Advertencias</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS HISTÓRICAS</div>
          <div className="text-xl font-black text-white font-mono">18</div>
          <div className="text-[9px] text-[#8ab3cf]">Totales</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS BLOQUEANTES</div>
          <div className="text-xl font-black text-emerald-400 font-mono">0</div>
          <div className="text-[9px] text-[#8ab3cf]">Sin alarmas</div>
        </div>
      </div>

      {/* Main Grid: Alarms Table Left + Selected Detail Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Alarms Table Left */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>LISTA DE ALARMAS ACTIVAS</span>
            <span className="text-slate-400 font-mono">Mostrando 1 a {mockAsdaAlarms.length} de {mockAsdaAlarms.length} alarmas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">PRIORIDAD</th>
                  <th className="pb-2">CÓDIGO</th>
                  <th className="pb-2">DESCRIPCIÓN</th>
                  <th className="pb-2 text-center">ESTADO</th>
                  <th className="pb-2 text-center">INICIO</th>
                  <th className="pb-2 text-center">DURACIÓN</th>
                  <th className="pb-2 text-right">ORIGEN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {mockAsdaAlarms.map((a) => {
                  const isSel = selectedAlarm.id === a.id;
                  return (
                    <tr key={a.id} onClick={() => setSelectedAlarm(a)} className={`cursor-pointer hover:bg-[#0b1c2d] ${isSel ? 'bg-[#00bdd6]/10 font-bold' : ''}`}>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                          a.priority === 'ALARMA' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          a.priority === 'ADVERTENCIA' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}>
                          {a.priority}
                        </span>
                      </td>
                      <td className="text-[#00bdd6] font-bold">{a.code}</td>
                      <td className="text-white font-sans text-[11px]">{a.desc}</td>
                      <td className="text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${a.state === 'ACTIVA' ? 'text-amber-400' : 'text-slate-400'}`}>{a.state}</span>
                      </td>
                      <td className="text-center text-[#8ab3cf]">{a.start}</td>
                      <td className="text-center text-white">{a.duration}</td>
                      <td className="text-right text-slate-300 font-sans">{a.origin}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Alarm Detail Right */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
              <span>DETALLE DE ALARMA SELECCIONADA</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">{selectedAlarm.priority}</span>
            </div>

            <div className="my-3 space-y-2 text-xs">
              <div className="text-base font-black text-amber-400 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{selectedAlarm.code}</span>
              </div>
              <div className="font-bold text-white font-sans">{selectedAlarm.desc}</div>

              <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] space-y-1.5 text-xs text-[#8ab3cf] mt-3">
                <div className="flex justify-between"><span>Origen:</span><span className="font-bold text-white font-sans">{selectedAlarm.origin}</span></div>
                <div className="flex justify-between"><span>Estado:</span><span className="font-bold text-amber-400">{selectedAlarm.state}</span></div>
                <div className="flex justify-between"><span>Hora de Inicio:</span><span className="font-mono text-white">{selectedAlarm.start}</span></div>
                <div className="flex justify-between"><span>Duración:</span><span className="font-mono text-white">{selectedAlarm.duration}</span></div>
                <div className="flex justify-between border-t border-[#1a3854] pt-1"><span>Código Hex:</span><span className="font-mono text-[#00bdd6]">0x00D4</span></div>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1a3854]">
            <button className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30">
              <RotateCcw className="w-4 h-4" />
              <span>RESET ALARMA</span>
            </button>
            <button className="w-full py-2 rounded bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center space-x-2">
              <VolumeX className="w-4 h-4" />
              <span>SILENCIAR ALARMAS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: 24h Bar Chart + Donut Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            HISTÓRICO DE ALARMAS (ÚLTIMAS 24H)
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alarmBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="hour" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Bar dataKey="count" fill="#f7b731" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            RESUMEN DE ALARMAS
          </div>
          <div className="h-44 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={alarmPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                  {alarmPieData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <div className="text-xl font-black text-white font-mono">18</div>
              <div className="text-[9px] text-[#8ab3cf]">Totales</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
