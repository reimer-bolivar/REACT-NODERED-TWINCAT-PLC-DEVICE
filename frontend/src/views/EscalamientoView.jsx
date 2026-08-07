import React, { useState } from 'react';
import { Sliders, Plus, Download, Check, X, LineChart as ChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const scalingTableData = [
  { id: 'AI01', desc: 'Presión de descarga', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.00, ingMax: 16.00, unit: 'bar', decimals: 2, status: 'ACTIVO' },
  { id: 'AI02', desc: 'Temperatura aceite', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.0, ingMax: 120.0, unit: '°C', decimals: 1, status: 'ACTIVO' },
  { id: 'AI03', desc: 'Nivel tanque', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.0, ingMax: 100.0, unit: '%', decimals: 1, status: 'ACTIVO' },
  { id: 'AI04', desc: 'Corriente motor', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.00, ingMax: 30.00, unit: 'A', decimals: 2, status: 'ACTIVO' },
  { id: 'AI05', desc: 'Voltaje entrada', signal: '0 - 10 V', rawMin: 0, rawMax: 27648, ingMin: 0.0, ingMax: 300.0, unit: 'V', decimals: 1, status: 'ACTIVO' },
  { id: 'AI06', desc: 'Potencia activa', signal: '0 - 10 V', rawMin: 0, rawMax: 27648, ingMin: 0.00, ingMax: 10.00, unit: 'kW', decimals: 2, status: 'ACTIVO' },
  { id: 'AI07', desc: 'Flujo', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.0, ingMax: 50.0, unit: 'L/min', decimals: 1, status: 'ACTIVO' },
  { id: 'AI08', desc: 'Vibración', signal: '4 - 20 mA', rawMin: 8192, rawMax: 32768, ingMin: 0.00, ingMax: 10.00, unit: 'mm/s', decimals: 2, status: 'ACTIVO' },
];

const conversionChartData = [
  { raw: 8192, ing: 0.00 },
  { raw: 16384, ing: 4.00 },
  { raw: 24576, ing: 12.00 },
  { raw: 32768, ing: 16.00 },
];

export default function EscalamientoView() {
  const [selected, setSelected] = useState(scalingTableData[0]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#00bdd6]" />
            <span>ESCALAMIENTO</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Configuración de conversión Raw → Valor de ingeniería
          </p>
        </div>

        <div className="flex space-x-2">
          <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#00bdd6]/10 border border-[#00bdd6]/30 text-xs font-bold text-[#00bdd6] hover:bg-[#00bdd6]/20">
            <Plus className="w-4 h-4" />
            <span>NUEVO ESCALAMIENTO</span>
          </button>
          <button className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white">
            <Download className="w-4 h-4" />
            <span>EXPORTAR CONFIGURACIÓN</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Table Left, Config Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Table Left */}
        <div className="lg:col-span-7 glass-panel p-4 overflow-x-auto">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider mb-3">
            CONFIGURACIÓN DE ESCALAMIENTO
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1a3854] text-[#57809e] uppercase font-bold text-[10px]">
                <th className="pb-2">CANAL</th>
                <th className="pb-2">DESCRIPCIÓN</th>
                <th className="pb-2">TIPO SEÑAL</th>
                <th className="pb-2 text-center">RANGO RAW (MÍN-MÁX)</th>
                <th className="pb-2 text-center">RANGO ING (MÍN-MÁX)</th>
                <th className="pb-2">UNIDAD</th>
                <th className="pb-2">ESTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a3854]">
              {scalingTableData.map((item) => {
                const isSelected = selected.id === item.id;
                return (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`cursor-pointer hover:bg-[#0b1c2d] transition-colors ${
                      isSelected ? 'bg-[#00bdd6]/10 text-white font-bold' : 'text-[#8ab3cf]'
                    }`}
                  >
                    <td className="py-2.5 font-mono text-[#00bdd6]">{item.id}</td>
                    <td className="py-2.5">{item.desc}</td>
                    <td className="py-2.5">{item.signal}</td>
                    <td className="py-2.5 font-mono text-center">{item.rawMin} - {item.rawMax}</td>
                    <td className="py-2.5 font-mono text-center">{item.ingMin} - {item.ingMax}</td>
                    <td className="py-2.5 font-semibold text-white">{item.unit}</td>
                    <td className="py-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Config Panel Right */}
        <div className="lg:col-span-5 glass-panel p-4 space-y-4">
          <div className="border-b border-[#1a3854] pb-2 flex justify-between items-center">
            <div>
              <span className="text-xs font-black uppercase text-[#00bdd6]">{selected.id}</span>
              <span className="text-xs text-[#8ab3cf] font-semibold ml-2">{selected.desc}</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
              ESTADO ACTIVO
            </span>
          </div>

          {/* Configuration Form */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#00bdd6] uppercase">CONFIGURACIÓN</div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Tipo de señal</label>
                <select className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]">
                  <option>4 - 20 mA</option>
                  <option>0 - 10 V</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Unidad</label>
                <input
                  type="text"
                  defaultValue={selected.unit}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 focus:border-[#00bdd6]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Mínimo (RAW)</label>
                <input
                  type="number"
                  defaultValue={selected.rawMin}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Máximo (RAW)</label>
                <input
                  type="number"
                  defaultValue={selected.rawMax}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Mínimo (Ing.)</label>
                <input
                  type="number"
                  defaultValue={selected.ingMin}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#57809e] uppercase font-bold block mb-1">Máximo (Ing.)</label>
                <input
                  type="number"
                  defaultValue={selected.ingMax}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white rounded p-2 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Conversion Chart RAW -> Engineering */}
          <div className="pt-2 border-t border-[#1a3854]">
            <div className="text-xs font-bold text-[#00bdd6] uppercase mb-2">CONVERSIÓN RAW → INGENIERÍA</div>
            <div className="h-36 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3854" />
                  <XAxis dataKey="raw" stroke="#57809e" fontSize={9} />
                  <YAxis stroke="#57809e" fontSize={9} />
                  <Tooltip contentStyle={{ backgroundColor: '#0b1c2d', borderColor: '#1a3854', borderRadius: '6px' }} />
                  <Line type="linear" dataKey="ing" stroke="#00bdd6" strokeWidth={2} dot={{ fill: '#20d69f', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Examples Table */}
          <div className="bg-[#0b1c2d] p-3 rounded-lg border border-[#1a3854] space-y-1 text-xs">
            <div className="text-[10px] font-bold text-[#57809e] uppercase mb-1">EJEMPLOS DE CONVERSIÓN</div>
            <div className="flex justify-between font-mono"><span>Raw  8192</span><span className="text-[#00bdd6]">→  0.00 {selected.unit}</span></div>
            <div className="flex justify-between font-mono"><span>Raw 16384</span><span className="text-[#00bdd6]">→  4.00 {selected.unit}</span></div>
            <div className="flex justify-between font-mono"><span>Raw 24576</span><span className="text-[#00bdd6]">→ 12.00 {selected.unit}</span></div>
            <div className="flex justify-between font-mono"><span>Raw 32768</span><span className="text-[#00bdd6]">→ 16.00 {selected.unit}</span></div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-2">
            <button className="px-4 py-2 rounded bg-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-700">CANCELAR</button>
            <button className="px-4 py-2 rounded bg-[#2563eb] text-xs font-bold text-white hover:bg-blue-600">APLICAR</button>
            <button className="px-4 py-2 rounded bg-[#00bdd6] text-xs font-bold text-slate-950 hover:bg-cyan-400">GUARDAR</button>
          </div>
        </div>
      </div>
    </div>
  );
}
