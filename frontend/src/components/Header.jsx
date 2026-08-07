import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Bell, User, Wifi, Server, ShieldCheck } from 'lucide-react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('es-ES', { hour12: false });
  const formattedDate = time.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <header className="h-16 bg-[#091a2b] border-b border-[#1a3854] px-4 flex items-center justify-between z-20 shrink-0">
      {/* Brand & Subtitle */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00bdd6] to-[#2563eb] flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-sm font-black tracking-wide text-white uppercase leading-none">
            ARQUITECTURA DIGITAL INDUSTRIAL
          </h1>
          <p className="text-[11px] text-[#8ab3cf] tracking-wider mt-1 font-medium">
            Plataforma de Monitoreo y Control
          </p>
        </div>
      </div>

      {/* System Status Indicators */}
      <div className="hidden lg:flex items-center space-x-2">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
          <span>NODE-RED</span>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">ONLINE</span>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
          <span>OPC UA</span>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">ONLINE</span>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
          <span>TWINCAT</span>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">ONLINE</span>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#102b3e] border border-[#204a6b] text-xs font-bold text-emerald-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
          <span>PLC</span>
          <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300">ONLINE</span>
        </div>
      </div>

      {/* Clock & User Controls */}
      <div className="flex items-center space-x-5">
        <div className="text-right">
          <div className="text-base font-black text-white tracking-widest font-mono">
            {formattedTime}
          </div>
          <div className="text-[11px] text-[#8ab3cf] tracking-wider">
            {formattedDate}
          </div>
        </div>

        <div className="relative">
          <button className="p-2 rounded-full bg-[#102b3e] border border-[#204a6b] text-[#8ab3cf] hover:text-white hover:border-[#00bdd6] transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[10px] font-black text-black rounded-full flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2 pl-2 border-l border-[#1a3854]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#1e3a5a] to-[#2b5278] border border-[#3b6998] flex items-center justify-center text-white font-bold text-sm">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
