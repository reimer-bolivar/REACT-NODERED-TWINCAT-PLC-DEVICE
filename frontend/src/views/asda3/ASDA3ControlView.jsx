import React, { useState } from 'react';
import { Cpu, Play, Pause, Square, RefreshCw, RotateCcw, Home, Save, CheckCircle2, Zap, Sliders } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const positionChartData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${60 - i * 4}s`,
  pos: 12345.678 + Math.sin(i / 2) * 4000,
  cmd: 12345.678 + Math.sin(i / 2) * 4000,
  err: 0.003 + Math.sin(i) * 0.001,
}));

export default function ASDA3ControlView() {
  const [driveEnabled, setDriveEnabled] = useState(true);
  const [jogSpeed, setJogSpeed] = useState(1000);
  const [targetPos, setTargetPos] = useState(15000.000);
  const [targetVel, setTargetVel] = useState(2500);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · CONTROL</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Control manual y automático del servo drive
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
          <div className="text-[9px] text-[#8ab3cf]">Control de Posición</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EJE SELECCIONADO</div>
          <div className="text-sm font-black text-white">Eje X</div>
          <div className="text-[9px] text-[#8ab3cf]">1 de 4</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POSICIÓN ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">12,345.678</div>
          <div className="text-[9px] text-[#8ab3cf]">unidades</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD ACTUAL</div>
          <div className="text-xl font-black text-white font-mono">2,500 rpm</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">TORQUE ACTUAL</div>
          <div className="text-xl font-black text-emerald-400 font-mono">0 %</div>
          <div className="text-[9px] text-[#8ab3cf]">Sin alarmas</div>
        </div>
      </div>

      {/* Main Grid: Control Manual JOG + Control Automático + Monitor Posición */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Control Manual JOG Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL MANUAL (JOG)
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Velocidad JOG: {jogSpeed} rpm</label>
              <input type="range" min="100" max="4000" step="100" value={jogSpeed} onChange={(e) => setJogSpeed(e.target.value)} className="w-full accent-[#00bdd6]" />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <button className="py-3 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-sm hover:border-[#00bdd6] flex items-center justify-center space-x-1">
                <span>◀◀ -</span>
              </button>
              <button className="py-3 rounded bg-rose-600 text-white font-black text-sm flex items-center justify-center">
                <span>STOP</span>
              </button>
              <button className="py-3 rounded bg-[#102b3e] border border-[#204a6b] text-white font-bold text-sm hover:border-[#00bdd6] flex items-center justify-center space-x-1">
                <span>+ ▶▶</span>
              </button>
            </div>

            <div className="pt-3 border-t border-[#1a3854] space-y-2">
              <div className="text-[10px] text-[#57809e] font-bold uppercase">HABILITACIÓN DEL DRIVE</div>
              <div className="flex space-x-2">
                <button onClick={() => setDriveEnabled(true)} className={`flex-1 py-2 rounded font-black text-xs ${driveEnabled ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  DRIVE ON
                </button>
                <button onClick={() => setDriveEnabled(false)} className={`flex-1 py-2 rounded font-black text-xs ${!driveEnabled ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' : 'bg-[#0b1c2d] text-[#8ab3cf]'}`}>
                  DRIVE OFF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Control Automático Center */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL AUTOMÁTICO
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Comando de Posición (unidades)</label>
              <input type="number" value={targetPos} onChange={(e) => setTargetPos(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Velocidad Comando (rpm)</label>
              <input type="number" value={targetVel} onChange={(e) => setTargetVel(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Aceleración</label>
                <input type="text" value="2000 rpm/s" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
              <div>
                <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Desaceleración</label>
                <input type="text" value="2000 rpm/s" readOnly className="w-full bg-[#0b1c2d] border border-[#1a3854] text-slate-300 font-mono text-xs rounded p-1.5 text-center" />
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button className="flex-1 py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
                <Play className="w-4 h-4 fill-current" />
                <span>START</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center space-x-1">
                <Pause className="w-4 h-4" />
                <span>PAUSE</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
                <Square className="w-4 h-4 fill-current" />
                <span>STOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Monitor de Posición Chart Right */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
              MONITOR DE POSICIÓN (TIEMPO REAL)
            </div>

            <div className="h-44 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={positionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                  <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                  <YAxis stroke="#57809e" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                  <Line type="monotone" dataKey="pos" stroke="#00bdd6" strokeWidth={2} dot={false} name="Posición" />
                  <Line type="monotone" dataKey="cmd" stroke="#20d69f" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Comando" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a3854] text-xs">
            <button className="py-2 rounded bg-[#102b3e] border border-[#204a6b] text-[#00bdd6] font-bold hover:bg-[#1a3854] flex items-center justify-center space-x-1">
              <Home className="w-3.5 h-3.5" />
              <span>IR A HOME</span>
            </button>
            <button className="py-2 rounded bg-[#102b3e] border border-[#204a6b] text-amber-400 font-bold hover:bg-[#1a3854] flex items-center justify-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESET DRIVE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
