import React from 'react';
import { Cpu, Radio, Activity, Zap, ShieldCheck, Clock, CheckCircle2, RefreshCw, FileText, Download, Play, Layers } from 'lucide-react';

export default function AdamResumenView() {
  const chainSteps = [
    { num: 1, name: 'ADAM-6060', type: 'Modbus TCP', status: 'OK', detail: 'IP: 192.168.1.60 · Puerto: 502' },
    { num: 2, name: 'Ethernet', type: 'Enlace 100 Mbps', status: 'ONLINE', detail: 'Full Duplex · Sin errores' },
    { num: 3, name: 'PLC (Delta)', type: 'Modbus TCP', status: 'OK', detail: 'IP: 192.168.1.10 · Resp: 14 ms' },
    { num: 4, name: 'TwinCAT', type: 'OPC UA Client', status: 'OK', detail: 'Conectado · Variables: 12' },
    { num: 5, name: 'OPC UA Server', type: 'Node-RED', status: 'ONLINE', detail: 'Sesión activa · Pub: 980 ms' },
    { num: 6, name: 'React.js', type: 'Dashboard', status: 'ONLINE', detail: 'Actualizando tiempo real' },
  ];

  const diList = [
    { id: 'DI01', name: 'Sensor puerta', state: 'ON', quality: 'GOOD', time: '14:54:12' },
    { id: 'DI02', name: 'Presión OK', state: 'ON', quality: 'GOOD', time: '14:54:12' },
    { id: 'DI03', name: 'Falla térmica', state: 'OFF', quality: 'GOOD', time: '14:54:12' },
    { id: 'DI04', name: 'Nivel bajo', state: 'OFF', quality: 'GOOD', time: '14:54:12' },
    { id: 'DI05', name: 'Emergencia', state: 'OFF', quality: 'GOOD', time: '14:54:12' },
    { id: 'DI06', name: 'Permiso marcha', state: 'ON', quality: 'GOOD', time: '14:54:12' },
  ];

  const roList = [
    { id: 'RO01', name: 'Bomba principal', state: 'ON', time: '14:52:48' },
    { id: 'RO02', name: 'Luz torre', state: 'ON', time: '14:53:05' },
    { id: 'RO03', name: 'Alarma sonora', state: 'OFF', time: '14:52:30' },
    { id: 'RO04', name: 'Ventilador', state: 'ON', time: '14:53:12' },
    { id: 'RO05', name: 'Válvula solenoide', state: 'OFF', time: '14:51:58' },
    { id: 'RO06', name: 'Respaldo', state: 'ON', time: '14:53:36' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>ADAM-6060 - RESUMEN</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Verificación general del módulo de entradas digitales y relés
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 px-3 py-1.5 rounded bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white font-bold text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>REFRESCAR</span>
          </button>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>EQUIPO OPERATIVO</span>
          </div>
        </div>
      </div>

      {/* Top Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <Cpu className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">HARDWARE</div>
          <div className="text-xs font-black text-emerald-400">OK</div>
          <div className="text-[9px] text-[#8ab3cf]">Funcionando correctamente</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <Radio className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">COMUNICACIÓN</div>
          <div className="text-xs font-black text-emerald-400">OK</div>
          <div className="text-[9px] text-[#8ab3cf]">Enlace activo y estable</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <Activity className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ENTRADAS</div>
          <div className="text-xs font-black text-emerald-400">6 / 6 OK</div>
          <div className="text-[9px] text-[#8ab3cf]">Todas operativas</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <Layers className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">RELÉS</div>
          <div className="text-xs font-black text-emerald-400">6 / 6 OK</div>
          <div className="text-[9px] text-[#8ab3cf]">Todos operativos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CALIDAD GLOBAL</div>
          <div className="text-xs font-black text-emerald-400">GOOD</div>
          <div className="text-[9px] text-[#8ab3cf]">Parámetros en rango</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <Clock className="w-5 h-5 text-[#00bdd6] mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-xs font-black text-white font-mono">14:54:12</div>
          <div className="text-[9px] text-[#8ab3cf]">07/08/2026</div>
        </div>
      </div>

      {/* Data Flow Chain */}
      <div className="glass-panel p-4 space-y-3">
        <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
          CADENA DE COMUNICACIÓN - FLUJO DE DATOS
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 pt-1">
          {chainSteps.map((s) => (
            <div key={s.num} className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] space-y-1">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-mono text-[#57809e]">{s.num}. {s.name}</span>
                <span className="text-emerald-400 font-bold">✔ {s.status}</span>
              </div>
              <div className="text-xs font-bold text-white">{s.type}</div>
              <div className="text-[10px] text-[#8ab3cf] font-mono">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tables Row: DI Health + Relay Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* DI Health Table */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            SALUD DE LAS ENTRADAS DIGITALES
          </div>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">NOMBRE</th>
                <th className="pb-2 text-center">ESTADO</th>
                <th className="pb-2 text-right">CALIDAD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              {diList.map((di) => (
                <tr key={di.id}>
                  <td className="py-2 text-[#00bdd6] font-bold">{di.id}</td>
                  <td className="text-white">{di.name}</td>
                  <td className="text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                      di.state === 'ON' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {di.state}
                    </span>
                  </td>
                  <td className="text-right text-emerald-400 font-bold">{di.quality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Relay Health Table */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            SALUD DE LOS RELÉS (RO)
          </div>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">NOMBRE</th>
                <th className="pb-2 text-center">ESTADO</th>
                <th className="pb-2 text-right">ÚLTIMO CAMBIO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              {roList.map((ro) => (
                <tr key={ro.id}>
                  <td className="py-2 text-[#00bdd6] font-bold">{ro.id}</td>
                  <td className="text-white">{ro.name}</td>
                  <td className="text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                      ro.state === 'ON' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {ro.state}
                    </span>
                  </td>
                  <td className="text-right text-[#8ab3cf]">{ro.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Diagnostic Actions Right */}
        <div className="lg:col-span-4 glass-panel p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              DIAGNÓSTICO AVANZADO
            </div>
            <div className="mt-3 space-y-2 text-xs text-[#8ab3cf]">
              <div className="flex justify-between"><span>Tiempo de ciclo de adquisición:</span><span className="font-mono text-white font-bold">110 ms</span></div>
              <div className="flex justify-between"><span>Tasa de eventos:</span><span className="font-mono text-white font-bold">12 eventos/s</span></div>
              <div className="flex justify-between"><span>Pérdida de paquetes:</span><span className="font-mono text-emerald-400 font-bold">0.00 %</span></div>
              <div className="flex justify-between"><span>Timeouts de comunicación:</span><span className="font-mono text-white font-bold">0</span></div>
              <div className="flex justify-between"><span>Tiempo sin errores:</span><span className="font-mono text-emerald-400 font-bold">2d 04:17:36</span></div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-black text-emerald-400 uppercase">SISTEMA OPERANDO CORRECTAMENTE</div>
            <p className="text-[10px] text-[#8ab3cf]">Todos los componentes y parámetros se encuentran dentro de rangos normales.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button className="flex items-center justify-center space-x-1 p-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
              <FileText className="w-3.5 h-3.5" />
              <span>GENERAR REPORTE</span>
            </button>
            <button className="flex items-center justify-center space-x-1 p-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
              <Download className="w-3.5 h-3.5" />
              <span>EXPORTAR LOGS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
