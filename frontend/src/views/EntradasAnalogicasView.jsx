import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Maximize2, Activity, ChevronRight } from 'lucide-react';

const channelsData = [
  { id: 'AI01', name: 'Presión de descarga', val: '6.42', unit: 'bar', raw: '16342', range: '0 - 16 bar', quality: 'GOOD', percent: 40, time: '14:52:31', min: '0.00', max: '16.00', signal: '4 - 20 mA' },
  { id: 'AI02', name: 'Temperatura aceite', val: '78.3', unit: '°C', raw: '20015', range: '0 - 120 °C', quality: 'GOOD', percent: 65, time: '14:52:31', min: '0.0', max: '120.0', signal: '4 - 20 mA' },
  { id: 'AI03', name: 'Nivel tanque', val: '54.7', unit: '%', raw: '13520', range: '0 - 100 %', quality: 'GOOD', percent: 55, time: '14:52:31', min: '0.0', max: '100.0', signal: '4 - 20 mA' },
  { id: 'AI04', name: 'Corriente motor', val: '12.36', unit: 'A', raw: '12360', range: '0 - 30 A', quality: 'GOOD', percent: 41, time: '14:52:31', min: '0.00', max: '30.00', signal: '4 - 20 mA' },
  { id: 'AI05', name: 'Voltaje entrada', val: '219.4', unit: 'V', raw: '17932', range: '0 - 300 V', quality: 'GOOD', percent: 73, time: '14:52:31', min: '0.0', max: '300.0', signal: '0 - 10 V' },
  { id: 'AI06', name: 'Potencia activa', val: '5.62', unit: 'kW', raw: '14562', range: '0 - 10 kW', quality: 'GOOD', percent: 56, time: '14:52:31', min: '0.00', max: '10.00', signal: '0 - 10 V' },
  { id: 'AI07', name: 'Flujo', val: '18.7', unit: 'L/min', raw: '9876', range: '0 - 50 L/min', quality: 'GOOD', percent: 37, time: '14:52:31', min: '0.0', max: '50.0', signal: '4 - 20 mA' },
  { id: 'AI08', name: 'Vibración', val: '2.35', unit: 'mm/s', raw: '5123', range: '0 - 10 mm/s', quality: 'GOOD', percent: 23, time: '14:52:31', min: '0.00', max: '10.00', signal: '4 - 20 mA' },
];

export default function EntradasAnalogicasView() {
  const [selectedChannel, setSelectedChannel] = useState(channelsData[0]);

  return (
    <div className="space-y-4">
      {/* View Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 glass-panel p-3">
        <div>
          <h2 className="text-base font-black text-white uppercase flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-[#00bdd6]" />
            <span>ENTRADAS ANALÓGICAS</span>
          </h2>
          <p className="text-xs text-[#8ab3cf] mt-0.5">
            Valores en tiempo real de todos los canales analógicos
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select className="bg-[#0b1c2d] border border-[#1a3854] text-xs font-bold text-white rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#00bdd6]">
            <option>Todos los canales</option>
            <option>Solo Activos</option>
          </select>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Auto-Refresh</span>
          </div>
        </div>
      </div>

      {/* 8 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {channelsData.map((ch) => {
          const isSelected = selectedChannel.id === ch.id;
          return (
            <div
              key={ch.id}
              onClick={() => setSelectedChannel(ch)}
              className={`glass-panel-interactive p-4 cursor-pointer relative ${
                isSelected ? 'border-[#00bdd6] ring-1 ring-[#00bdd6]' : ''
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-[#00bdd6] font-mono">{ch.id}</span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {ch.quality}
                </span>
              </div>
              <div className="text-xs font-semibold text-[#8ab3cf] mt-1 truncate">{ch.name}</div>

              <div className="my-3 flex items-baseline space-x-2">
                <span className="text-3xl font-black text-white font-mono">{ch.val}</span>
                <span className="text-xs font-bold text-[#00bdd6]">{ch.unit}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#152e48] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00bdd6] rounded-full transition-all duration-300"
                  style={{ width: `${ch.percent}%` }}
                ></div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1a3854] grid grid-cols-3 text-[10px] text-center font-mono">
                <div>
                  <span className="text-[#57809e] block">RAW</span>
                  <span className="text-white font-bold">{ch.raw}</span>
                </div>
                <div>
                  <span className="text-[#57809e] block">RANGO</span>
                  <span className="text-white font-bold">{ch.range}</span>
                </div>
                <div>
                  <span className="text-[#57809e] block">CALIDAD</span>
                  <span className="text-emerald-400 font-bold">{ch.quality}</span>
                </div>
              </div>

              <div className="mt-2 text-[9px] text-right text-[#57809e] font-mono">
                ÚLTIMO DATO: {ch.time}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Channel Detail Panel */}
      <div className="glass-panel p-4 space-y-3">
        <div className="text-xs font-black uppercase text-[#00bdd6] tracking-wider border-b border-[#1a3854] pb-2 flex justify-between items-center">
          <span>DETALLE DEL CANAL SELECCIONADO: {selectedChannel.id} - {selectedChannel.name}</span>
          <button className="px-3 py-1 rounded bg-[#00bdd6]/10 border border-[#00bdd6]/30 text-xs text-[#00bdd6] font-bold hover:bg-[#00bdd6]/20">
            Ver tendencia
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-xs">
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">VALOR RAW</span>
            <span className="text-sm font-black text-white font-mono">{selectedChannel.raw}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">VALOR INGENIERÍA</span>
            <span className="text-sm font-black text-[#00bdd6] font-mono">{selectedChannel.val} {selectedChannel.unit}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">UNIDAD</span>
            <span className="text-sm font-bold text-white">{selectedChannel.unit}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">RANGO INGENIERÍA</span>
            <span className="text-xs font-bold text-white font-mono">{selectedChannel.range}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">TIPO DE SEÑAL</span>
            <span className="text-xs font-bold text-white">{selectedChannel.signal}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">VARIACIÓN</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">-0.02</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">CALIDAD</span>
            <span className="text-xs font-extrabold text-emerald-400">{selectedChannel.quality}</span>
          </div>
          <div className="bg-[#0b1c2d] p-2.5 rounded-lg border border-[#1a3854]">
            <span className="text-[10px] text-[#57809e] font-bold block uppercase">ESTADO</span>
            <span className="text-xs font-extrabold text-emerald-400">ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
