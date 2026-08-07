import React, { useState } from 'react';
import { Gauge, Play, Square, AlertOctagon, CheckCircle2, RefreshCw, Send } from 'lucide-react';

export default function VFDControlView() {
  const [frequency, setFrequency] = useState(35.0);
  const [status, setStatus] = useState('READY');
  const [lastLog, setLastLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendCommand = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/vfd/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('ONLINE');
        setLastLog(data);
      } else {
        setStatus('ERROR');
      }
    } catch (err) {
      setStatus('OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  const applyFrequency = () => sendCommand({ frequency: parseFloat(frequency) });
  const startMotor = () => sendCommand({ command: 1 });
  const stopMotor = () => sendCommand({ command: 5 });
  const safeStop = () => {
    setFrequency(0);
    sendCommand({ frequency: 0, command: 5 });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD CONTROL CENTER - VARIADOR OPC UA</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            BL302 · OPC UA Server · TwinCAT · PLC Delta · VFD
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className={`flex items-center space-x-1.5 px-3 py-1 rounded font-bold ${
            status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            <span>BACKEND OPC UA: {status}</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Controls */}
        <div className="lg:col-span-7 glass-panel p-5 space-y-5">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL DE FRECUENCIA Y MOTOR
          </div>

          <div className="text-center space-y-2">
            <div className="text-5xl font-black text-white font-mono tracking-tight">
              {parseFloat(frequency).toFixed(1)} <span className="text-lg text-[#00bdd6]">Hz</span>
            </div>
            <div className="text-xs text-[#57809e] font-semibold">RANGO OPERATIVO 0.0 – 60.0 Hz</div>

            <input
              type="range"
              min="0"
              max="60"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full accent-[#00bdd6] cursor-pointer h-2 bg-[#152e48] rounded-lg"
            />
          </div>

          <div className="flex space-x-3">
            <input
              type="number"
              min="0"
              max="60"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-1/2 bg-[#0b1c2d] border border-[#1a3854] text-white rounded-lg px-4 py-2 font-mono font-bold text-lg focus:border-[#00bdd6]"
            />
            <button
              onClick={applyFrequency}
              disabled={loading}
              className="w-1/2 rounded-lg bg-gradient-to-r from-[#00bdd6] to-[#2563eb] text-slate-950 font-black text-xs hover:brightness-110 flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>APLICAR Hz VIA OPC UA</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={startMotor}
              disabled={loading}
              className="py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>▶ ARRANQUE (CMD 1)</span>
            </button>
            <button
              onClick={stopMotor}
              disabled={loading}
              className="py-3 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white font-black text-xs hover:brightness-110 flex items-center justify-center space-x-2 shadow-lg shadow-rose-500/20"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>■ PARADA (CMD 5)</span>
            </button>
            <button
              onClick={safeStop}
              disabled={loading}
              className="col-span-2 py-2.5 rounded-lg bg-[#1a3854] border border-[#2b5278] text-white font-black text-xs hover:bg-[#20446b]"
            >
              PARADA SEGURA · 0 Hz + COMANDO 5
            </button>
          </div>
        </div>

        {/* Right: OPC UA Telemetry */}
        <div className="lg:col-span-5 glass-panel p-5 space-y-4">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            PARÁMETROS DEL SERVIDORES OPC UA
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between bg-[#0b1c2d] p-2.5 rounded border border-[#1a3854]">
              <span className="text-[#57809e]">Endpoint:</span>
              <span className="text-white font-bold">opc.tcp://172.28.76.226:53881</span>
            </div>
            <div className="flex justify-between bg-[#0b1c2d] p-2.5 rounded border border-[#1a3854]">
              <span className="text-[#57809e]">Frecuencia NodeId:</span>
              <span className="text-[#00bdd6] font-bold">ns=1;s=FrequencySetpointHz</span>
            </div>
            <div className="flex justify-between bg-[#0b1c2d] p-2.5 rounded border border-[#1a3854]">
              <span className="text-[#57809e]">Comando NodeId:</span>
              <span className="text-[#00bdd6] font-bold">ns=1;s=MotorCommand</span>
            </div>
          </div>

          {lastLog && (
            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#00bdd6]/30 space-y-1 text-xs font-mono">
              <div className="text-[10px] text-emerald-400 font-bold uppercase">✔ ÚLTIMA TRANSACCIÓN COMPLETADA</div>
              <pre className="text-[11px] text-slate-300 overflow-x-auto">
                {JSON.stringify(lastLog, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
