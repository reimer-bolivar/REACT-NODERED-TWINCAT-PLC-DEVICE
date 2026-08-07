import React, { useState } from 'react';
import { Sliders, RefreshCw, Download, Upload, RotateCcw, CheckCircle2, Save, Search } from 'lucide-react';

const paramCategories = [
  { id: '00', name: 'Básicos', count: 38 },
  { id: '01', name: 'Arranque / Parada', count: 24 },
  { id: '02', name: 'Referencia de Frecuencia', count: 28 },
  { id: '03', name: 'V/F y Curvas', count: 16 },
  { id: '04', name: 'Control de Motor', count: 34 },
  { id: '05', name: 'Terminales y E/S', count: 45 },
  { id: '06', name: 'Protecciones', count: 37 },
  { id: '07', name: 'Comunicaciones', count: 19 },
  { id: '08', name: 'PID y Control Avanzado', count: 30 },
  { id: '09', name: 'Ahorro de Energía', count: 16 },
  { id: '10', name: 'Mantenimiento', count: 22 },
  { id: '11', name: 'Especiales', count: 26 },
  { id: '12', name: 'Usuario', count: 20 },
];

const mockParams = [
  { code: '00-00', name: 'Selección de Modo de Control', val: '0 : V/F', unit: '--', range: '0: V/F | 1: SVC | 2: FOC+PG', def: '0', access: 'R/W' },
  { code: '00-01', name: 'Comando de Arranque', val: '0 : Teclado (HMI)', unit: '--', range: '0: Teclado | 1: Terminales | 2: Comm.', def: '0', access: 'R/W' },
  { code: '00-02', name: 'Fuente de Frecuencia', val: '0 : Teclado (HMI)', unit: '--', range: '0: Teclado | 1: AI1 | 2: AI2 | 3: Comm.', def: '0', access: 'R/W' },
  { code: '00-03', name: 'Frecuencia Máxima', val: '60.00', unit: 'Hz', range: '1.00 ~ 599.00 Hz', def: '60.00', access: 'R/W' },
  { code: '00-04', name: 'Frecuencia Mínima', val: '0.00', unit: 'Hz', range: '0.00 ~ 599.00 Hz', def: '0.00', access: 'R/W' },
  { code: '00-05', name: 'Frecuencia Base', val: '60.00', unit: 'Hz', range: '10.00 ~ 599.00 Hz', def: '60.00', access: 'R/W' },
  { code: '00-06', name: 'Voltaje Base del Motor', val: '400', unit: 'V', range: '50 ~ 690 V', def: '400', access: 'R/W' },
  { code: '00-07', name: 'Corriente Base del Motor', val: '78.0', unit: 'A', range: '0.1 ~ 2000.0 A', def: '78.0', access: 'R/W' },
  { code: '00-08', name: 'Compatibilidad del Motor', val: '0 : Normal', unit: '--', range: '0: Normal | 1: PM Motor', def: '0', access: 'R/W' },
  { code: '00-09', name: 'Número de Polos del Motor', val: '4', unit: 'Polos', range: '2 ~ 12', def: '4', access: 'R/W' },
  { code: '00-10', name: 'Tiempo de Aceleración 1', val: '10.0', unit: 's', range: '0.1 ~ 600.0 s', def: '10.0', access: 'R/W' },
  { code: '00-11', name: 'Tiempo de Desaceleración 1', val: '10.0', unit: 's', range: '0.1 ~ 600.0 s', def: '10.0', access: 'R/W' },
  { code: '00-12', name: 'Selección de Paro', val: '0 : Rampa', unit: '--', range: '0: Rampa | 1: Libre | 2: DC Brake', def: '0', access: 'R/W' },
];

export default function VFDParametrosView() {
  const [selectedCat, setSelectedCat] = useState('00');
  const [selectedParam, setSelectedParam] = useState(mockParams[3]);
  const [editValue, setEditValue] = useState(mockParams[3].val);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="glass-panel p-3 flex justify-between items-center">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <Sliders className="w-5 h-5 text-[#00bdd6]" />
            <span>VFD DELTA C2000 · PARÁMETROS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Configuración y monitoreo de parámetros del variador
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

      {/* Top Banner Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">MODO DE CONTROL</div>
          <div className="text-sm font-black text-[#00bdd6]">V/F</div>
          <div className="text-[9px] text-[#8ab3cf]">Voltaje / Frecuencia</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FUENTE DE REFERENCIA</div>
          <div className="text-sm font-black text-white">HMI (Local)</div>
          <div className="text-[9px] text-[#8ab3cf]">Teclado del variador</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">FRECUENCIA ACTUAL</div>
          <div className="text-xl font-black text-[#00bdd6] font-mono">31.90 Hz</div>
          <div className="text-[9px] text-[#8ab3cf]">53.2 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VELOCIDAD ACTUAL</div>
          <div className="text-xl font-black text-white font-mono">1,150 RPM</div>
          <div className="text-[9px] text-[#8ab3cf]">4 polos</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">CORRIENTE ACTUAL</div>
          <div className="text-xl font-black text-emerald-400 font-mono">23.4 A</div>
          <div className="text-[9px] text-[#8ab3cf]">52.1 %</div>
        </div>

        <div className="glass-panel p-3 text-center space-y-1">
          <div className="text-[10px] text-[#57809e] font-bold uppercase">VOLTAJE DC BUS</div>
          <div className="text-xl font-black text-amber-400 font-mono">540 VDC</div>
        </div>
      </div>

      {/* Main Grid: Categories Left + Parameters Table Center + Quick Edit Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Categories Sidebar */}
        <div className="lg:col-span-3 glass-panel p-3 space-y-2">
          <div className="text-xs font-black uppercase text-[#8ab3cf] tracking-wider border-b border-[#1a3854] pb-2">
            CATEGORÍAS DE PARÁMETROS
          </div>

          <div className="space-y-1 max-h-[460px] overflow-y-auto pr-1">
            {paramCategories.map((cat) => {
              const isSel = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-bold transition-all ${
                    isSel ? 'bg-[#00bdd6]/20 text-[#00bdd6] border-l-4 border-[#00bdd6]' : 'text-[#8ab3cf] hover:bg-[#0b1c2d] hover:text-white'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#102b3e] text-slate-400 font-mono">{cat.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Parameters Table Center */}
        <div className="lg:col-span-6 glass-panel p-4 space-y-3">
          <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between">
            <span>PARÁMETROS ({selectedCat} - BÁSICOS)</span>
            <span className="text-slate-400 font-mono">Mostrando 1 a {mockParams.length} de 38</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-[10px] text-[#57809e] uppercase border-b border-[#1a3854]">
                  <th className="pb-2">CÓDIGO</th>
                  <th className="pb-2">NOMBRE DEL PARÁMETRO</th>
                  <th className="pb-2 text-center">VALOR ACTUAL</th>
                  <th className="pb-2 text-center">UNIDAD</th>
                  <th className="pb-2 text-right">ACCESO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a3854]">
                {mockParams.map((p) => {
                  const isSel = selectedParam.code === p.code;
                  return (
                    <tr
                      key={p.code}
                      onClick={() => {
                        setSelectedParam(p);
                        setEditValue(p.val);
                      }}
                      className={`cursor-pointer hover:bg-[#0b1c2d] ${isSel ? 'bg-[#00bdd6]/10 font-bold' : ''}`}
                    >
                      <td className="py-2.5 text-[#00bdd6] font-bold">{p.code}</td>
                      <td className="text-white font-sans">{p.name}</td>
                      <td className="text-center text-emerald-400 font-bold">{p.val}</td>
                      <td className="text-center text-[#8ab3cf]">{p.unit}</td>
                      <td className="text-right text-emerald-400 font-bold">{p.access}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Edit Right */}
        <div className="lg:col-span-3 glass-panel p-4 space-y-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2">
              EDICIÓN RÁPIDA
            </div>

            <div className="my-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-[#1a3854] pb-1"><span className="text-[#57809e]">Código:</span><span className="font-mono text-[#00bdd6] font-bold">{selectedParam.code}</span></div>
              <div className="flex justify-between border-b border-[#1a3854] pb-1"><span className="text-[#57809e]">Nombre:</span><span className="font-bold text-white text-right">{selectedParam.name}</span></div>
              <div className="flex justify-between border-b border-[#1a3854] pb-1"><span className="text-[#57809e]">Unidad:</span><span className="font-mono text-white">{selectedParam.unit}</span></div>
              <div className="flex justify-between border-b border-[#1a3854] pb-1"><span className="text-[#57809e]">Rango:</span><span className="font-mono text-slate-300">{selectedParam.range}</span></div>
              <div className="flex justify-between"><span className="text-[#57809e]">Por defecto:</span><span className="font-mono text-white">{selectedParam.def}</span></div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#1a3854]">
              <label className="text-[10px] text-[#57809e] font-bold uppercase block">NUEVO VALOR</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full bg-[#0b1c2d] border border-[#1a3854] text-white text-center font-mono font-bold text-sm rounded p-2 focus:border-[#00bdd6]"
                />
                <span className="px-3 py-2 bg-[#102b3e] text-[#8ab3cf] text-xs font-bold rounded flex items-center">{selectedParam.unit}</span>
              </div>

              <button className="w-full py-2.5 rounded bg-[#00bdd6] hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-1 shadow-lg shadow-cyan-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>APLICAR CAMBIO</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1a3854]">
            <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white flex items-center justify-center space-x-1">
              <Upload className="w-3.5 h-3.5" />
              <span>CARGAR DESDE ARCHIVO</span>
            </button>
            <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-[#8ab3cf] hover:text-white flex items-center justify-center space-x-1">
              <Save className="w-3.5 h-3.5" />
              <span>GUARDAR A ARCHIVO</span>
            </button>
            <button className="w-full py-2 rounded bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center justify-center space-x-1">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>RESTABLECER POR DEFECTO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
