import React, { useState } from 'react';
import { Gauge, Play, Square, RefreshCw, RotateCcw, AlertTriangle, Radio, Send, CheckCircle2 } from 'lucide-react';

export default function VFDControlMainView() {
  const [frequency, setFrequency] = useState(31.9);
  const [direction, setDirection] = useState('FWD');
  const [source, setSource] = useState('LOCAL');
  const [status, setStatus] = useState('ONLINE');
  const [loading, setLoading] = useState(false);

  const sendCommand = async (payload) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/vfd/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus('ONLINE');
      }
    } catch (err) {
      setStatus('OFFLINE');
    } finally {
      setLoading(false);
    }
  };

  const startMotor = () => sendCommand({ command: 1 });
  const stopMotor = () => sendCommand({ command: 5 });
  const applyFreq = (val) => {
    setFrequency(val);
    sendCommand({ frequency: parseFloat(val) });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Gauge className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · CONTROL</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Control en tiempo real del variador de frecuencia
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

      {/* Status Bar Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE OPERACIÓN</div>
          <div className="text-xs font-black text-emerald-400">RUN (RUN FWD)</div>
          <div className="text-[9px] text-[#8ab3cf]">Funcionando</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FUENTE DE CONTROL</div>
          <div className="text-xs font-black text-[#00bdd6]">LOCAL (HMI)</div>
          <div className="text-[9px] text-[#8ab3cf]">Desde HMI del variador</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">{parseFloat(frequency).toFixed(2)} Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">{((frequency / 60) * 100).toFixed(1)} %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD DEL MOTOR</div>
          <div className="text-xl font-black text-white font-mono">1,150 RPM</div>
          <div className="text-[9px] text-[#8ab3cf]">4 polos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CORRIENTE DEL MOTOR</div>
          <div className="text-xl font-black text-emerald-400 font-mono">23.4 A</div>
          <div className="text-[9px] text-[#8ab3cf]">52.1 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VOLTAJE DC BUS</div>
          <div className="text-xl font-black text-amber-400 font-mono">540 VDC</div>
          <div className="text-[9px] text-[#8ab3cf]">Nominal: 540V</div>
        </div>
      </div>

      {/* Main Grid: Control de Marcha + Frequency Setpoint Dial + Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Control de Marcha Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-4">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL DE MARCHA
          </div>

          <div className="space-y-2">
            <button
              onClick={startMotor}
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>ARRANQUE (RUN)</span>
            </button>

            <button
              onClick={stopMotor}
              disabled={loading}
              className="w-full py-3.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-rose-700/30"
            >
              <Square className="w-5 h-5 fill-current" />
              <span>PARO (STOP / RESET)</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button className="py-2 px-1 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-xs hover:border-[#00bdd6]">
              JOG
            </button>
            <button className="py-2 px-1 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-xs hover:border-[#00bdd6]">
              REVERSA (REV)
            </button>
            <button className="py-2 px-1 rounded bg-[#102b3e] border border-[#204a6b] text-amber-400 font-bold text-xs hover:border-amber-400">
              RESET ALARMA
            </button>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#1a3854] text-xs">
            <div>
              <div className="text-[10px] text-[#57809e] font-bold uppercase mb-1">FUENTE DE MARCHA</div>
              <div className="flex space-x-2">
                <button onClick={() => setSource('LOCAL')} className={`flex-1 py-1.5 rounded font-bold ${source === 'LOCAL' ? 'bg-[#00bdd6] text-slate-950' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  LOCAL (HMI)
                </button>
                <button onClick={() => setSource('DIGITAL')} className={`flex-1 py-1.5 rounded font-bold ${source === 'DIGITAL' ? 'bg-[#00bdd6] text-slate-950' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  DIGITAL
                </button>
                <button onClick={() => setSource('COMM')} className={`flex-1 py-1.5 rounded font-bold ${source === 'COMM' ? 'bg-[#00bdd6] text-slate-950' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  COMUNICACIÓN
                </button>
              </div>
            </div>

            <div>
              <div className="text-[10px] text-[#57809e] font-bold uppercase mb-1">DIRECCIÓN DE MARCHA</div>
              <div className="flex space-x-2">
                <button onClick={() => setDirection('FWD')} className={`flex-1 py-1.5 rounded font-bold ${direction === 'FWD' ? 'bg-emerald-500 text-slate-950' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  FWD (ADELANTE)
                </button>
                <button onClick={() => setDirection('REV')} className={`flex-1 py-1.5 rounded font-bold ${direction === 'REV' ? 'bg-emerald-500 text-slate-950' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  REV (REVERSA)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Referencia de Frecuencia Gauge Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-4 flex flex-col justify-between">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>REFERENCIA DE FRECUENCIA</span>
            <span className="text-xs text-[#8ab3cf]">Modo: Local (HMI)</span>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="w-44 h-44 rounded-full border-4 border-[#00bdd6] flex flex-col items-center justify-center bg-[#0b1c2d] relative shadow-xl shadow-cyan-500/10">
              <span className="text-4xl font-black text-white font-mono">{parseFloat(frequency).toFixed(2)}</span>
              <span className="text-sm font-bold text-[#00bdd6]">Hz</span>
              <span className="text-[10px] text-[#57809e] mt-1">{((frequency / 60) * 100).toFixed(1)} % del rango</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="0.1"
              value={frequency}
              onChange={(e) => applyFreq(e.target.value)}
              className="w-full mt-4 accent-[#00bdd6] cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854]">
            <div>
              <span className="text-[10px] text-[#57809e] uppercase font-bold block">REFERENCIA ACTIVA</span>
              <span className="text-sm font-black text-[#00bdd6] font-mono">{parseFloat(frequency).toFixed(2)} Hz</span>
            </div>
            <div>
              <span className="text-[10px] text-[#57809e] uppercase font-bold block">RANGO DE FRECUENCIA</span>
              <span className="text-sm font-black text-white font-mono">0.00 – 60.00 Hz</span>
            </div>
          </div>
        </div>

        {/* Presets & Modes Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-4">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL RÁPIDO DE FRECUENCIA
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => applyFreq(15.00)} className="p-3 rounded bg-[#0b1c2d] border border-[#1a3854] text-center hover:border-[#00bdd6]">
              <span className="text-[9px] text-[#57809e] block font-bold">PRESET 1</span>
              <span className="text-sm font-black text-white font-mono">15.00 Hz</span>
            </button>
            <button onClick={() => applyFreq(30.00)} className="p-3 rounded bg-[#0b1c2d] border border-[#00bdd6] text-center bg-[#00bdd6]/10">
              <span className="text-[9px] text-[#00bdd6] block font-bold">PRESET 2</span>
              <span className="text-sm font-black text-white font-mono">30.00 Hz</span>
            </button>
            <button onClick={() => applyFreq(45.00)} className="p-3 rounded bg-[#0b1c2d] border border-[#1a3854] text-center hover:border-[#00bdd6]">
              <span className="text-[9px] text-[#57809e] block font-bold">PRESET 3</span>
              <span className="text-sm font-black text-white font-mono">45.00 Hz</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#1a3854] space-y-2">
            <div className="text-xs font-black uppercase text-[#8ab3cf]">MODOS DE OPERACIÓN</div>
            <div className="p-2 rounded bg-[#0b1c2d] border border-[#1a3854] text-xs">
              <span className="font-bold text-emerald-400 block">RUN (RUN FWD)</span>
              <span className="text-[10px] text-[#8ab3cf]">Operación normal en avance</span>
            </div>
            <div className="p-2 rounded bg-[#0b1c2d] border border-[#1a3854] text-xs">
              <span className="font-bold text-slate-300 block">STOP</span>
              <span className="text-[10px] text-[#8ab3cf]">Motor detenido</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
