import React from 'react';
import {
  Settings,
  CheckCircle2,
  Cpu,
  Radio,
  Activity,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileText,
  Download,
  RefreshCw,
  Play
} from 'lucide-react';

export default function DiagnosticoView() {
  const chainSteps = [
    { num: 1, name: 'VOLISON ADM', type: 'Adquisición', status: 'OK', detail: 'AI: 4 / 4 · Datos válidos' },
    { num: 2, name: 'RS-485', type: 'Enlace físico', status: 'OK', detail: 'COM2 · 9600 bps' },
    { num: 3, name: 'PLC (Delta)', type: 'Modbus RTU', status: 'OK', detail: 'Slave ID: 1 · Resp: 18 ms' },
    { num: 4, name: 'TwinCAT', type: 'OPC UA Client', status: 'OK', detail: 'Conectado · Variables: 4' },
    { num: 5, name: 'OPC UA Server', type: 'Node-RED', status: 'OK', detail: 'Sesión activa · Pub: 1000 ms' },
    { num: 6, name: 'React.js', type: 'Dashboard', status: 'OK', detail: 'Actualizando tiempo real' },
  ];

  const sysChecks = [
    { name: 'Alimentación 24 VDC', status: 'OK', detail: '23.98 VDC (Rango: 22 - 26 VDC)', time: '14:54:10' },
    { name: 'Temperatura del módulo', status: 'OK', detail: '38.2 °C (Rango: -20 - 70 °C)', time: '14:54:10' },
    { name: 'Memoria interna', status: 'OK', detail: 'Uso 24% (Libre: 76%)', time: '14:54:10' },
    { name: 'Firmware', status: 'OK', detail: 'v2.4.7 (Última versión)', time: '14:54:10' },
    { name: 'Base de datos de calibración', status: 'OK', detail: 'Tabla activa cargada', time: '14:54:10' },
    { name: 'Watchdog interno', status: 'OK', detail: 'Activo (Timeout: 2.0 s)', time: '14:54:10' },
    { name: 'Reloj del sistema', status: 'OK', detail: 'Sincronizado con PLC', time: '14:54:10' },
    { name: 'Sincronización de datos', status: 'OK', detail: 'Desfase: 0 ms', time: '14:54:10' },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Settings className="w-5 h-5 text-[#00bdd6]" />
            <span>VOLISON ADM - DIAGNÓSTICO</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Verificación integral del sistema de adquisición analógica
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

      {/* Health Overview Cards */}
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
          <div className="text-xs font-black text-emerald-400">OK</div>
          <div className="text-[9px] text-[#8ab3cf]">4/4 canales operativos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <Zap className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALIMENTACIÓN</div>
          <div className="text-xs font-black text-emerald-400">OK</div>
          <div className="text-[9px] text-[#8ab3cf]">24 VDC Estable</div>
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

      {/* Communication Data Flow Chain */}
      <div className="glass-panel p-4 space-y-3">
        <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
          CADENA DE COMUNICACIÓN - FLUJO DE DATOS
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 pt-1">
          {chainSteps.map((s, idx) => (
            <div key={s.num} className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] relative space-y-1">
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

      {/* System Checks & Advanced Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* System Verification List */}
        <div className="lg:col-span-7 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            VERIFICACIONES DEL SISTEMA
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">COMPONENTE</th>
                <th className="pb-2">ESTADO</th>
                <th className="pb-2">DETALLE</th>
                <th className="pb-2 text-right">ÚLTIMO CHECK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854] text-[#8ab3cf]">
              {sysChecks.map((item, i) => (
                <tr key={i}>
                  <td className="py-2 text-white font-semibold">{item.name}</td>
                  <td className="text-emerald-400 font-bold">✔ {item.status}</td>
                  <td className="font-mono">{item.detail}</td>
                  <td className="text-right font-mono text-[#57809e]">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Diagnostic Actions & Summary */}
        <div className="lg:col-span-5 glass-panel p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              DIAGNÓSTICO AVANZADO
            </div>
            <div className="mt-3 space-y-2 text-xs text-[#8ab3cf]">
              <div className="flex justify-between"><span>Tiempo de ciclo de adquisición:</span><span className="font-mono text-white font-bold">120 ms</span></div>
              <div className="flex justify-between"><span>Tasa de muestras:</span><span className="font-mono text-white font-bold">8 muestras/s</span></div>
              <div className="flex justify-between"><span>Pérdida de paquetes:</span><span className="font-mono text-emerald-400 font-bold">0.00 %</span></div>
              <div className="flex justify-between"><span>CRC Errors:</span><span className="font-mono text-white font-bold">0</span></div>
              <div className="flex justify-between"><span>Tiempo sin errores:</span><span className="font-mono text-emerald-400 font-bold">2d 04:17:36</span></div>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center space-y-1">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-black text-emerald-400 uppercase">SISTEMA OPERANDO CORRECTAMENTE</div>
            <p className="text-[10px] text-[#8ab3cf]">Todos los componentes dentro de los rangos normales de operación.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a3854]">
            <button className="flex items-center justify-center space-x-1 p-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
              <FileText className="w-3.5 h-3.5" />
              <span>GENERAR REPORTE</span>
            </button>
            <button className="flex items-center justify-center space-x-1 p-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
              <Download className="w-3.5 h-3.5" />
              <span>EXPORTAR LOGS</span>
            </button>
            <button className="flex items-center justify-center space-x-1 p-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white col-span-2">
              <Play className="w-3.5 h-3.5 text-[#00bdd6]" />
              <span>EJECUTAR PRUEBA DE COMUNICACIÓN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
