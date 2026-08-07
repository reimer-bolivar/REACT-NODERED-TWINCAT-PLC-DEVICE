import React from 'react';
import { Activity, RefreshCw, Zap, Gauge, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const thdData = [
  { order: '1', percent: 100 },
  { order: '3', percent: 2.1 },
  { order: '5', percent: 1.8 },
  { order: '7', percent: 0.9 },
  { order: '9', percent: 0.4 },
  { order: '11', percent: 0.3 },
  { order: '13', percent: 0.2 },
  { order: '15', percent: 0.1 },
  { order: '17', percent: 0.1 },
  { order: '19', percent: 0.05 },
];

export default function VFDElectricasView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Zap className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · VARIABLES ELÉCTRICAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Monitoreo en tiempo real de las variables eléctricas del variador
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

      {/* Top Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VOLTAJE DC BUS</div>
          <div className="text-xl font-black text-amber-400 font-mono">540 VDC</div>
          <div className="text-[9px] text-[#8ab3cf]">Nominal: 540 VDC</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CORRIENTE DE SALIDA</div>
          <div className="text-xl font-black text-emerald-400 font-mono">23.4 A</div>
          <div className="text-[9px] text-[#8ab3cf]">52.1 % del nominal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">POTENCIA DE SALIDA</div>
          <div className="text-xl font-black text-white font-mono">12.3 kW</div>
          <div className="text-[9px] text-[#8ab3cf]">35.1 % del nominal</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FACTOR DE POTENCIA</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">0.87</div>
          <div className="text-[9px] text-[#8ab3cf]">Atrasado (Inductivo)</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA DE SALIDA</div>
          <div className="text-xl font-black text-white font-mono">31.90 Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">53.2 % del rango</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">EFICIENCIA ESTIMADA</div>
          <div className="text-xl font-black text-emerald-400 font-mono">96.2 %</div>
          <div className="text-[9px] text-[#8ab3cf]">Eficiencia actual</div>
        </div>
      </div>

      {/* Main Grid: Voltages, Currents, Powers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Tensiones de Entrada Trifásicas */}
        <div className="glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            TENSIONES DE ENTRADA (TRIFÁSICAS)
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">L1 - L2</span>
              <span className="text-white font-bold text-sm">398.6 V</span>
              <span className="text-emerald-400 font-bold">99.6 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">L2 - L3</span>
              <span className="text-white font-bold text-sm">399.2 V</span>
              <span className="text-emerald-400 font-bold">99.8 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">L3 - L1</span>
              <span className="text-white font-bold text-sm">397.9 V</span>
              <span className="text-emerald-400 font-bold">99.5 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#102b3e] border border-[#204a6b]">
              <span className="text-[#00bdd6] font-sans font-bold">PROMEDIO</span>
              <span className="text-emerald-400 font-black text-sm">398.6 V</span>
              <span className="text-emerald-400 font-bold">99.6 %</span>
            </div>
          </div>
        </div>

        {/* Corrientes de Salida Trifásicas */}
        <div className="glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            CORRIENTES DE SALIDA (TRIFÁSICAS)
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Fase U</span>
              <span className="text-white font-bold text-sm">22.8 A</span>
              <span className="text-emerald-400 font-bold">50.7 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Fase V</span>
              <span className="text-white font-bold text-sm">23.5 A</span>
              <span className="text-emerald-400 font-bold">52.2 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Fase W</span>
              <span className="text-white font-bold text-sm">23.9 A</span>
              <span className="text-emerald-400 font-bold">53.1 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#102b3e] border border-[#204a6b]">
              <span className="text-[#00bdd6] font-sans font-bold">PROMEDIO</span>
              <span className="text-emerald-400 font-black text-sm">23.4 A</span>
              <span className="text-emerald-400 font-bold">52.1 %</span>
            </div>
          </div>
        </div>

        {/* Potencia */}
        <div className="glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
            POTENCIA
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Potencia Aparente (S)</span>
              <span className="text-white font-bold text-sm">14.1 kVA</span>
              <span className="text-emerald-400 font-bold">40.3 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Potencia Activa (P)</span>
              <span className="text-white font-bold text-sm">12.3 kW</span>
              <span className="text-emerald-400 font-bold">35.1 %</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-[#0b1c2d]">
              <span className="text-[#8ab3cf] font-sans">Potencia Reactiva (Q)</span>
              <span className="text-white font-bold text-sm">6.9 kvar</span>
              <span className="text-emerald-400 font-bold">19.7 %</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Energy Meters + Harmonics Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Medidores de Energía Left */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            MEDIDORES DE ENERGÍA
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854]">
              <span className="text-[10px] text-[#57809e] font-bold block uppercase font-sans">ENERGÍA ACTIVA IMPORTADA</span>
              <span className="text-xl font-black text-emerald-400 block mt-1">12,458.6 kWh</span>
              <span className="text-[9px] text-[#57809e] font-sans">Total acumulado</span>
            </div>
            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854]">
              <span className="text-[10px] text-[#57809e] font-bold block uppercase font-sans">ENERGÍA REACTIVA</span>
              <span className="text-xl font-black text-[#00bdd6] block mt-1">6,754.3 kvarh</span>
              <span className="text-[9px] text-[#57809e] font-sans">Total acumulado</span>
            </div>
            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854]">
              <span className="text-[10px] text-[#57809e] font-bold block uppercase font-sans">ENERGÍA APARENTE</span>
              <span className="text-xl font-black text-white block mt-1">14,213.7 kVAh</span>
              <span className="text-[9px] text-[#57809e] font-sans">Total acumulado</span>
            </div>
            <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854]">
              <span className="text-[10px] text-[#57809e] font-bold block uppercase font-sans">TIEMPO DE OPERACIÓN</span>
              <span className="text-xl font-black text-amber-400 block mt-1">124:37:25</span>
              <span className="text-[9px] text-[#57809e] font-sans">(h:m:s)</span>
            </div>
          </div>
        </div>

        {/* Armónicos de Corriente Right */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>ARMÓNICOS DE CORRIENTE (THD)</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">THD TOTAL: 3.2 %</span>
          </div>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={thdData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                <XAxis dataKey="order" stroke="#57809e" fontSize={10} />
                <YAxis stroke="#57809e" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderRadius: '6px' }} />
                <Bar dataKey="percent" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
