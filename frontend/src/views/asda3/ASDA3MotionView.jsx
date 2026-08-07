import React, { useState } from 'react';
import { Cpu, RefreshCw, Play, Square, Pause, RotateCcw, Download, Activity, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const motionPathData = Array.from({ length: 15 }).map((_, i) => ({
  time: `${i}s`,
  pos: 12345.678 + (i < 8 ? i * 1200 : 9600),
  cmd: 15000.000,
  vel: i < 3 ? i * 800 : i < 10 ? 2500 : (15 - i) * 350,
  torque: 18.7 + Math.sin(i) * 6,
}));

const motionSteps = [
  { num: 1, action: 'Home', param: '--', val: '--', status: '✓ Completado' },
  { num: 2, action: 'Esperar Home', param: '0.0 unid.', val: '100 ms', status: '✓ Completado' },
  { num: 3, action: 'Mover Absoluto', param: 'Posición', val: '15000.000', status: '▶ En ejecución' },
  { num: 4, action: 'Esperar Posición', param: 'Ventana', val: '±10.000', status: '⏳ Pendiente' },
  { num: 5, action: 'Fin de Secuencia', param: '--', val: '--', status: '⏳ Pendiente' },
];

export default function ASDA3MotionView() {
  const [motionType, setMotionType] = useState('PP');
  const [targetPos, setTargetPos] = useState(15000.000);
  const [profileVel, setProfileVel] = useState(2500);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-[#00bdd6]" />
            <span>ASDA-A3 · MOTION</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Control de movimiento, trayectorias y sincronización del eje
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
      <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
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
          <div className="text-sm font-black text-[#00bdd6]">PP</div>
          <div className="text-[9px] text-[#8ab3cf]">Punto a Punto</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EJE SELECCIONADO</div>
          <div className="text-sm font-black text-white">Eje X</div>
          <div className="text-[9px] text-[#8ab3cf]">1 de 4</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">PERFIL ACTIVO</div>
          <div className="text-sm font-black text-emerald-400">Perfil 1</div>
          <div className="text-[9px] text-[#8ab3cf]">Trapecio</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POSICIÓN ACTUAL</div>
          <div className="text-lg font-black text-[#00bdd6] font-mono">12,345.678</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EN MOVIMIENTO</div>
          <div className="text-sm font-black text-emerald-400">SI</div>
          <div className="text-[9px] text-emerald-400 font-bold">En ejecución</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">ALARMAS</div>
          <div className="text-sm font-black text-emerald-400">0</div>
          <div className="text-[9px] text-[#8ab3cf]">Sin alarmas</div>
        </div>
      </div>

      {/* Main Grid: Motion Controls Left + Path Chart Center + Progress Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Motion Controls Left */}
        <div className="lg:col-span-4 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CONTROL DE MOVIMIENTO
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Tipo de Movimiento</label>
              <select value={motionType} onChange={(e) => setMotionType(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]">
                <option value="PP">Punto a Punto (PP)</option>
                <option value="Profile">Perfil Interpolado</option>
                <option value="Continuous">Continuo</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Posición Objetivo (unid.)</label>
              <input type="number" value={targetPos} onChange={(e) => setTargetPos(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div>
              <label className="text-[10px] text-[#57809e] font-bold uppercase block mb-1">Velocidad Perfil (rpm)</label>
              <input type="number" value={profileVel} onChange={(e) => setProfileVel(e.target.value)} className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]" />
            </div>

            <div className="flex space-x-2 pt-1">
              <button className="flex-1 py-2.5 rounded bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-emerald-500/20">
                <Play className="w-4 h-4 fill-current" />
                <span>START</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-amber-600 text-white font-black text-xs flex items-center justify-center space-x-1">
                <Pause className="w-4 h-4" />
                <span>HOLD</span>
              </button>
              <button className="flex-1 py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-rose-600/20">
                <Square className="w-4 h-4 fill-current" />
                <span>STOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Path Chart Center */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            TRAYECTORIA DE MOVIMIENTO (TIEMPO REAL)
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={motionPathData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="time" stroke="#57809e" fontSize={9} />
                <YAxis stroke="#57809e" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="pos" stroke="#00bdd6" strokeWidth={2} dot={false} name="Posición" />
                <Line type="monotone" dataKey="vel" stroke="#20d69f" strokeWidth={1.5} dot={false} name="Velocidad" />
                <Line type="monotone" dataKey="torque" stroke="#f7b731" strokeWidth={1.5} dot={false} name="Torque" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-1 text-center text-xs font-mono pt-2 border-t border-[#1a3854]">
            <div className="bg-[#0b1c2d] p-1 rounded"><span className="text-[8px] text-[#57809e] block font-sans">RECORRIDA</span><span className="text-white font-bold text-[10px]">9,845.6</span></div>
            <div className="bg-[#0b1c2d] p-1 rounded"><span className="text-[8px] text-[#57809e] block font-sans">RESTANTE</span><span className="text-white font-bold text-[10px]">5,154.3</span></div>
            <div className="bg-[#0b1c2d] p-1 rounded"><span className="text-[8px] text-[#57809e] block font-sans">TIEMPO TOT</span><span className="text-white font-bold text-[10px]">6.40 s</span></div>
            <div className="bg-[#0b1c2d] p-1 rounded"><span className="text-[8px] text-[#57809e] block font-sans">TRANSCURRIDO</span><span className="text-emerald-400 font-bold text-[10px]">4.25 s</span></div>
            <div className="bg-[#0b1c2d] p-1 rounded"><span className="text-[8px] text-[#57809e] block font-sans">JERK</span><span className="text-white font-bold text-[10px]">12500</span></div>
          </div>
        </div>

        {/* Sequence Table Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-3 text-xs">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            SECUENCIA DE MOVIMIENTO
          </div>

          <div className="space-y-2 font-mono">
            {motionSteps.map((st) => (
              <div key={st.num} className="p-2 rounded bg-[#0b1c2d] border border-[#1a3854] space-y-0.5">
                <div className="flex justify-between font-sans">
                  <span className="text-[#00bdd6] font-bold">{st.num}. {st.action}</span>
                  <span className="text-emerald-400 text-[10px]">{st.status}</span>
                </div>
                <div className="flex justify-between text-[10px] text-[#8ab3cf]">
                  <span>{st.param}</span>
                  <span className="text-white font-bold">{st.val}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1a3854] space-y-1">
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-slate-300">Progreso del movimiento:</span>
              <span className="font-bold text-emerald-400">66 %</span>
            </div>
            <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 w-[66%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
