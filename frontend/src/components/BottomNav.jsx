import React from 'react';
import { Box, Cpu, Gauge, Layers, Zap } from 'lucide-react';

export default function BottomNav({ activeDevice, setActiveDevice }) {
  const devices = [
    { id: 'volison', name: 'VOLISON ADM', sub: 'ACTIVO', icon: Box, status: 'ok' },
    { id: 'adam', name: 'ADAM-6060', sub: 'ONLINE', icon: Cpu, status: 'inactive' },
    { id: 'vfd', name: 'VFD (VARIADOR)', sub: 'OPC UA', icon: Gauge, status: 'vfd' },
    { id: 'n4dim', name: 'N4DIM32', sub: 'STANDBY', icon: Layers, status: 'inactive' },
    { id: 'asda', name: 'ASDA-A3', sub: 'SERVO', icon: Zap, status: 'inactive' },
  ];

  return (
    <footer className="h-16 bg-[#071728] border-t border-[#1a3854] px-4 flex items-center space-x-3 shrink-0 z-20 overflow-x-auto">
      {devices.map((dev) => {
        const Icon = dev.icon;
        const isActive = activeDevice === dev.id;
        return (
          <button
            key={dev.id}
            onClick={() => setActiveDevice(dev.id)}
            className={`flex-1 min-w-[140px] max-w-[220px] h-11 px-3 rounded-lg border flex items-center space-x-3 transition-all ${
              isActive
                ? 'bg-gradient-to-r from-[#00bdd6]/20 to-[#2563eb]/20 border-[#00bdd6] text-white shadow-lg shadow-cyan-500/10'
                : 'bg-[#0b1c2d] border-[#1a3854] text-[#8ab3cf] hover:border-[#2b5278] hover:text-white'
            }`}
          >
            <div className={`p-1.5 rounded-md ${isActive ? 'bg-[#00bdd6] text-slate-950 font-black' : 'bg-[#152e48] text-[#8ab3cf]'}`}>
              <Icon className="w-4 h-4" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-black truncate">{dev.name}</div>
              <div className="flex items-center space-x-1.5 text-[9px] font-bold tracking-wider uppercase">
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`}></span>
                <span className={isActive ? 'text-emerald-400' : 'text-[#57809e]'}>{dev.sub}</span>
              </div>
            </div>
          </button>
        );
      })}
    </footer>
  );
}
