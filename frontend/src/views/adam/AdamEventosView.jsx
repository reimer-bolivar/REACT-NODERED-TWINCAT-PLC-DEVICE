import React, { useState } from 'react';
import { ShieldAlert, Filter, Search, RefreshCw, Bell, Mail, Database } from 'lucide-react';

const mockEvents = [
  { time: '07/08/2026 14:54:08', sev: 'INFO', type: 'Estado DI', channel: 'DI03', source: 'Entrada Digital', desc: 'Presión OK → ON' },
  { time: '07/08/2026 14:54:05', sev: 'INFO', type: 'Cambio de estado RO', channel: 'RO01', source: 'Relé', desc: 'Bomba Principal → ON' },
  { time: '07/08/2026 14:53:58', sev: 'WARN', type: 'Tiempo de respuesta', channel: 'DI02', source: 'Entrada Digital', desc: 'Respuesta lenta (125 ms)' },
  { time: '07/08/2026 14:53:47', sev: 'INFO', type: 'Estado DI', channel: 'DI01', source: 'Entrada Digital', desc: 'Nivel Bajo → OFF' },
  { time: '07/08/2026 14:53:32', sev: 'CRIT', type: 'Fallo de comunicación', channel: '--', source: 'Sistema', desc: 'Pérdida temporal de COM2' },
  { time: '07/08/2026 14:53:28', sev: 'INFO', type: 'Recuperación', channel: '--', source: 'Sistema', desc: 'Comunicación restablecida' },
  { time: '07/08/2026 14:53:12', sev: 'INFO', type: 'Estado DI', channel: 'DI05', source: 'Entrada Digital', desc: 'Emergencia → OFF' },
  { time: '07/08/2026 14:52:59', sev: 'WARN', type: 'Reinicio de dispositivo', channel: '--', source: 'Sistema', desc: 'Reinicio por comando remoto' },
  { time: '07/08/2026 14:52:41', sev: 'INFO', type: 'Estado RO', channel: 'RO04', source: 'Relé', desc: 'Ventilador → OFF' },
  { time: '07/08/2026 14:52:18', sev: 'INFO', type: 'Configuración', channel: '--', source: 'Sistema', desc: 'Parámetros guardados' },
  { time: '07/08/2026 14:51:57', sev: 'INFO', type: 'Sincronización', channel: '--', source: 'Sistema', desc: 'Hora sincronizada (NTP)' },
  { time: '07/08/2026 14:51:33', sev: 'CRIT', type: 'Error de alimentación', channel: '--', source: 'Sistema', desc: 'Caída de 24 VDC' },
];

export default function AdamEventosView() {
  const [filterSeverity, setFilterSeverity] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = mockEvents.filter((ev) => {
    const matchSev = filterSeverity === 'Todas' || ev.sev === filterSeverity;
    const matchText = ev.desc.toLowerCase().includes(searchTerm.toLowerCase()) || ev.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSev && matchText;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-[#00bdd6]" />
            <span>ADAM-6060 · EVENTOS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Registro y monitoreo de eventos del sistema
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

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TOTAL EVENTOS (HOY)</div>
          <div className="text-2xl font-black text-white font-mono">128</div>
          <div className="text-[10px] text-[#8ab3cf]">Eventos registrados</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EVENTOS CRÍTICOS</div>
          <div className="text-2xl font-black text-rose-400 font-mono">3</div>
          <div className="text-[10px] text-rose-400 font-bold">2.3 % del total</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ADVERTENCIAS</div>
          <div className="text-2xl font-black text-amber-400 font-mono">12</div>
          <div className="text-[10px] text-amber-400 font-bold">9.4 % del total</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">INFORMATIVOS</div>
          <div className="text-2xl font-black text-[#00bdd6] font-mono">113</div>
          <div className="text-[10px] text-[#00bdd6]">88.3 % del total</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-sm font-black text-white font-mono">14:54:12</div>
          <div className="text-[10px] text-[#8ab3cf]">07/08/2026</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">RETENCIÓN</div>
          <div className="text-sm font-black text-emerald-400">30 días</div>
          <div className="text-[10px] text-[#8ab3cf]">Configurado</div>
        </div>
      </div>

      {/* Main Grid: Events Log Table + Right Sidebar Filters & Config */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Events Table Left */}
        <div className="lg:col-span-8 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>REGISTRO DE EVENTOS (ÚLTIMOS 50)</span>
            <span className="text-slate-400 font-mono">Mostrando {filteredEvents.length} de {mockEvents.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">FECHA / HORA</th>
                  <th className="pb-2">SEVERIDAD</th>
                  <th className="pb-2">TIPO DE EVENTO</th>
                  <th className="pb-2">CANAL</th>
                  <th className="pb-2">FUENTE</th>
                  <th className="pb-2">DESCRIPCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {filteredEvents.map((ev, i) => (
                  <tr key={i} className="hover:bg-[#0b1c2d]">
                    <td className="py-2 text-[#8ab3cf]">{ev.time}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black ${
                        ev.sev === 'CRIT' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                        ev.sev === 'WARN' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {ev.sev}
                      </span>
                    </td>
                    <td className="text-white font-sans">{ev.type}</td>
                    <td className="text-[#00bdd6] font-bold">{ev.channel}</td>
                    <td className="text-[#8ab3cf]">{ev.source}</td>
                    <td className="text-white font-sans">{ev.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Event Filters & Breakdown */}
        <div className="lg:col-span-4 space-y-4">
          {/* Event Breakdown */}
          <div className="glass-panel p-4 space-y-3 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              RESUMEN DE EVENTOS POR TIPO (HOY)
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between mb-1"><span className="text-slate-300">Cambios de estado (DI/RO)</span><span className="font-bold text-white">78 (60.9%)</span></div>
                <div className="w-full bg-[#152e48] h-1.5 rounded-full overflow-hidden"><div className="h-full bg-[#00bdd6] w-[60.9%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-slate-300">Eventos del sistema</span><span className="font-bold text-white">24 (18.8%)</span></div>
                <div className="w-full bg-[#152e48] h-1.5 rounded-full overflow-hidden"><div className="h-full bg-[#2563eb] w-[18.8%]"></div></div>
              </div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-slate-300">Fallos / Alarmas</span><span className="font-bold text-white">15 (11.7%)</span></div>
                <div className="w-full bg-[#152e48] h-1.5 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[11.7%]"></div></div>
              </div>
            </div>
          </div>

          {/* Filters Box */}
          <div className="glass-panel p-4 space-y-3 text-xs">
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              FILTROS DE EVENTOS
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Severidad</label>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]"
                >
                  <option value="Todas">Todas</option>
                  <option value="CRIT">Críticos (CRIT)</option>
                  <option value="WARN">Advertencias (WARN)</option>
                  <option value="INFO">Informativos (INFO)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Texto a buscar</label>
                <input
                  type="text"
                  placeholder="Buscar en descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
