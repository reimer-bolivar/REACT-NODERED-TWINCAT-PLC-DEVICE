import React, { useState } from 'react';
import { Zap, RefreshCw, Power, CheckCircle2, AlertOctagon, Layers, Clock, ShieldAlert } from 'lucide-react';

export default function AdamRelesView() {
  const [relays, setRelays] = useState([
    { id: 'RO01', name: 'Bomba principal', state: 'ON', val: 1, activeTime: '02:13:45', lastChange: '14:52:01', statusBadge: 'CONFIRMADO' },
    { id: 'RO02', name: 'Luz torre', state: 'ON', val: 1, activeTime: '01:05:22', lastChange: '14:48:37', statusBadge: 'CONFIRMADO' },
    { id: 'RO03', name: 'Alarma sonora', state: 'OFF', val: 0, activeTime: '00:00:00', lastChange: '14:53:10', statusBadge: 'ENVIADO' },
    { id: 'RO04', name: 'Ventilador', state: 'ON', val: 1, activeTime: '00:18:33', lastChange: '14:53:54', statusBadge: 'CONFIRMADO' },
    { id: 'RO05', name: 'Válvula solenoide', state: 'OFF', val: 0, activeTime: '00:00:00', lastChange: '14:51:47', statusBadge: 'ESPERA' },
    { id: 'RO06', name: 'Respaldo', state: 'OFF', val: 0, activeTime: '00:00:12', lastChange: '14:53:30', statusBadge: 'CONFIRMADO' },
  ]);

  const toggleRelay = (id, targetState) => {
    setRelays((prev) =>
      prev.map((r) => (r.id === id ? { ...r, state: targetState, val: targetState === 'ON' ? 1 : 0, statusBadge: 'CONFIRMADO' } : r))
    );
  };

  const turnOffAll = () => {
    setRelays((prev) =>
      prev.map((r) => ({ ...r, state: 'OFF', val: 0, statusBadge: 'CONFIRMADO' }))
    );
  };

  const activeCount = relays.filter((r) => r.state === 'ON').length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#00bdd6]" />
            <span>ADAM-6060 · RELÉS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Control y monitoreo en tiempo real de salidas de relé (RO)
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
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TOTAL RELÉS</div>
          <div className="text-2xl font-black text-white font-mono">6</div>
          <div className="text-[10px] text-[#8ab3cf]">Canales RO</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">RELÉS ACTIVOS</div>
          <div className="text-2xl font-black text-[#00bdd6] font-mono">{activeCount} / 6</div>
          <div className="text-[10px] text-[#00bdd6] font-bold">{((activeCount / 6) * 100).toFixed(1)} %</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ESTADO GENERAL</div>
          <div className="text-xl font-black text-emerald-400 flex items-center space-x-1">
            <CheckCircle2 className="w-5 h-5" />
            <span>OK</span>
          </div>
          <div className="text-[10px] text-[#8ab3cf]">Dentro de rango</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TIEMPO DE RESPUESTA</div>
          <div className="text-xl font-black text-emerald-400 font-mono">35 ms</div>
          <div className="text-[10px] text-[#8ab3cf]">Escritura-confirmación</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ÚLTIMA ACTUALIZACIÓN</div>
          <div className="text-sm font-black text-white font-mono">14:54:12</div>
          <div className="text-[10px] text-[#8ab3cf]">07/08/2026</div>
        </div>

        <div className="glass-panel p-3 space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE CONTROL</div>
          <div className="text-sm font-black text-emerald-400">Remoto</div>
          <div className="text-[10px] text-[#8ab3cf]">OPC UA + PLC</div>
        </div>
      </div>

      {/* Main Grid: Status Table Left + Interactive Control Panel Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Relay Status Table Left */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            ESTADO DE SALIDAS DE RELÉ (RO)
          </div>
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">NOMBRE</th>
                <th className="pb-2 text-center">ESTADO</th>
                <th className="pb-2 text-right">TIEMPO ACTIVO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              {relays.map((r) => (
                <tr key={r.id}>
                  <td className="py-2.5 text-[#00bdd6] font-bold">{r.id}</td>
                  <td className="text-white font-sans font-semibold">{r.name}</td>
                  <td className="text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                      r.state === 'ON' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {r.state}
                    </span>
                  </td>
                  <td className="text-right text-[#8ab3cf]">{r.activeTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interactive Relay Control Panel Right */}
        <div className="lg:col-span-7 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            PANEL DE CONTROL DE RELÉS
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relays.map((r) => (
              <div key={r.id} className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] flex items-center justify-between space-x-2">
                <div>
                  <div className="text-xs font-black text-white">{r.id} - {r.name}</div>
                  <div className="flex items-center space-x-1.5 mt-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      r.state === 'ON' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {r.state}
                    </span>
                    <span className="text-[9px] text-[#00bdd6] font-mono font-bold uppercase">{r.statusBadge}</span>
                  </div>
                </div>

                <div className="flex space-x-1">
                  <button
                    onClick={() => toggleRelay(r.id, 'ON')}
                    className={`px-3 py-1.5 rounded text-xs font-black transition-all ${
                      r.state === 'ON' ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30' : 'bg-[#152e48] text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    ON
                  </button>
                  <button
                    onClick={() => toggleRelay(r.id, 'OFF')}
                    className={`px-3 py-1.5 rounded text-xs font-black transition-all ${
                      r.state === 'OFF' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-[#152e48] text-rose-400 hover:bg-rose-500/20'
                    }`}
                  >
                    OFF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1a3854]">
            <button
              onClick={turnOffAll}
              className="flex-1 py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-rose-600/20"
            >
              <Power className="w-4 h-4" />
              <span>DESACTIVAR TODO</span>
            </button>
            <button className="flex-1 py-2.5 px-4 rounded-lg bg-[#2563eb] hover:bg-blue-600 text-white font-black text-xs flex items-center justify-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>PRUEBA DE CONMUTACIÓN</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
