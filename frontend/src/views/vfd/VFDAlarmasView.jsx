import React, { useState } from 'react';
import { AlertTriangle, Bell, RefreshCw, CheckCircle2, ShieldAlert, VolumeX, RotateCcw } from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const alarmsList = [
  { id: '1', state: 'ACTIVA', sev: 'CRÍTICA', code: 'OC', desc: 'Sobre Corriente', start: '14:52:24', duration: '01:49', ack: 'No' },
  { id: '2', state: 'ACTIVA', sev: 'CRÍTICA', code: 'OV', desc: 'Sobre Voltaje DC Bus', start: '14:50:31', duration: '03:42', ack: 'No' },
  { id: '3', state: 'ACTIVA', sev: 'ADVERTENCIA', code: 'OH', desc: 'Sobre Temperatura Disipador', start: '14:48:05', duration: '05:08', ack: 'No' },
  { id: '4', state: 'RESUELTA', sev: 'INFORMACIÓN', code: 'PF', desc: 'Pérdida de Fase de Entrada', start: '14:42:18', duration: '00:02', ack: 'Sí' },
  { id: '5', state: 'RESUELTA', sev: 'INFORMACIÓN', code: 'LU', desc: 'Bajo Voltaje de Entrada', start: '14:35:52', duration: '00:10', ack: 'Sí' },
  { id: '6', state: 'RESUELTA', sev: 'INFORMACIÓN', code: 'EF', desc: 'Falla Externa', start: '14:31:10', duration: '00:00', ack: 'Sí' },
  { id: '7', state: 'RESUELTA', sev: 'INFORMACIÓN', code: 'RF', desc: 'Reinicio Automático', start: '14:20:05', duration: '00:01', ack: 'Sí' },
  { id: '8', state: 'RESUELTA', sev: 'INFORMACIÓN', code: 'PO', desc: 'Pérdida de Potencia Momentánea', start: '14:15:41', duration: '00:03', ack: 'Sí' },
];

const pieSevData = [
  { name: 'Críticas', value: 2, color: '#ff4d6d' },
  { name: 'Advertencias', value: 1, color: '#f7b731' },
  { name: 'Información', value: 5, color: '#20d69f' },
];

const alarmsByHour = [
  { hour: '10', count: 1 },
  { hour: '12', count: 1 },
  { hour: '14', count: 4 },
  { hour: '16', count: 2 },
];

export default function VFDAlarmasView() {
  const [selectedAlarm, setSelectedAlarm] = useState(alarmsList[0]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <span>VFD DELTA C2000 · ALARMAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo y gestión de alarmas del variador
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

      {/* Top Metrics Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1 border-l-4 border-l-rose-500">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO DE ALARMAS</div>
          <div className="text-sm font-black text-rose-400">2 ACTIVAS</div>
          <div className="text-[9px] text-[#8ab3cf]">Requieren atención</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS ACTIVAS</div>
          <div className="text-2xl font-black text-rose-400 font-mono">2</div>
          <div className="text-[10px] text-rose-400 font-bold">Críticas</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ADVERTENCIAS ACTIVAS</div>
          <div className="text-2xl font-black text-amber-400 font-mono">1</div>
          <div className="text-[10px] text-amber-400 font-bold">Advertencias</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS TOTALES (HOY)</div>
          <div className="text-2xl font-black text-white font-mono">8</div>
          <div className="text-[10px] text-[#8ab3cf]">Total eventos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMA MÁS RECIENTE</div>
          <div className="text-sm font-black text-rose-400 font-mono">14:53:18</div>
          <div className="text-[9px] text-[#8ab3cf]">07/08/2026</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TIEMPO DESDE ÚLTIMA</div>
          <div className="text-sm font-black text-emerald-400 font-mono">00:00:54</div>
          <div className="text-[9px] text-[#8ab3cf]">h:m:s</div>
        </div>
      </div>

      {/* Main Grid: Alarms Table Left + Selected Alarm Details Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Alarms List Table */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>LISTA DE ALARMAS</span>
            <span className="text-slate-400 font-mono">Mostrando {alarmsList.length} de {alarmsList.length} registros</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">ESTADO</th>
                  <th className="pb-2">SEVERIDAD</th>
                  <th className="pb-2">CÓDIGO</th>
                  <th className="pb-2">DESCRIPCIÓN</th>
                  <th className="pb-2">INICIO</th>
                  <th className="pb-2 text-center">DURACIÓN</th>
                  <th className="pb-2 text-right">RECONOCIDO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {alarmsList.map((a) => {
                  const isSel = selectedAlarm.id === a.id;
                  return (
                    <tr key={a.id} onClick={() => setSelectedAlarm(a)} className={`cursor-pointer hover:bg-[#0b1c2d] ${isSel ? 'bg-[#00bdd6]/10 font-bold' : ''}`}>
                      <td className="py-2.5">
                        <span className={`w-2 h-2 rounded-full inline-block mr-2 ${a.state === 'ACTIVA' ? 'bg-rose-500 animate-pulse' : 'bg-slate-500'}`}></span>
                        <span className={a.state === 'ACTIVA' ? 'text-rose-400 font-bold' : 'text-slate-400'}>{a.state}</span>
                      </td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                          a.sev === 'CRÍTICA' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                          a.sev === 'ADVERTENCIA' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {a.sev}
                        </span>
                      </td>
                      <td className="text-[#00bdd6] font-bold">{a.code}</td>
                      <td className="text-white font-sans">{a.desc}</td>
                      <td className="text-[#8ab3cf]">{a.start}</td>
                      <td className="text-center text-white">{a.duration}</td>
                      <td className={`text-right font-bold ${a.ack === 'No' ? 'text-rose-400' : 'text-emerald-400'}`}>{a.ack}</td>
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
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/30">{selectedAlarm.sev}</span>
            </div>

            <div className="my-3 space-y-2 text-xs">
              <div className="text-base font-black text-rose-400 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>{selectedAlarm.desc} ({selectedAlarm.code})</span>
              </div>
              <div className="space-y-1.5 pt-2 text-xs text-[#8ab3cf]">
                <div className="flex justify-between"><span>Código:</span><span className="font-mono text-white font-bold">{selectedAlarm.code}</span></div>
                <div className="flex justify-between"><span>Estado:</span><span className="font-bold text-rose-400">{selectedAlarm.state}</span></div>
                <div className="flex justify-between"><span>Hora de Inicio:</span><span className="font-mono text-white">{selectedAlarm.start}</span></div>
                <div className="flex justify-between"><span>Duración:</span><span className="font-mono text-white">{selectedAlarm.duration}</span></div>
              </div>
            </div>

            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] space-y-1.5 text-xs text-[#8ab3cf] mt-3">
              <div className="text-[10px] font-bold text-[#00bdd6] uppercase mb-1">INFORMACIÓN ADICIONAL</div>
              <div className="flex justify-between"><span>Corriente de Salida:</span><span className="font-mono text-rose-400 font-bold">28.7 A</span></div>
              <div className="flex justify-between"><span>Corriente Nominal:</span><span className="font-mono text-white">23.4 A</span></div>
              <div className="flex justify-between"><span>Frecuencia Actual:</span><span className="font-mono text-white">31.90 Hz</span></div>
              <div className="flex justify-between"><span>Voltaje DC Bus:</span><span className="font-mono text-amber-400">540 VDC</span></div>
              <div className="flex justify-between"><span>Temp. Disipador:</span><span className="font-mono text-white">62.4 °C</span></div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1a3854]">
            <button className="w-full py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>RECONOCER ALARMA</span>
            </button>
            <button className="w-full py-2.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center space-x-2">
              <VolumeX className="w-4 h-4" />
              <span>SILENCIAR ALARMA</span>
            </button>
            <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-xs hover:bg-[#1a3854]">
              RESET ALARMA
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Severity Distribution & Hour Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            DISTRIBUCIÓN POR SEVERIDAD (HOY)
          </div>
          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieSevData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} dataKey="value">
                  {pieSevData.map((e, idx) => <Cell key={idx} fill={e.color} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            ALARMAS POR HORA (HOY)
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={alarmsByHour}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="hour" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Bar dataKey="count" fill="#f7b731" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
