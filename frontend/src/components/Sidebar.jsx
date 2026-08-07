import React from 'react';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Sliders,
  TrendingUp,
  ShieldCheck,
  Radio,
  Settings,
  CheckCircle2
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  const menuItems = [
    { id: 'resumen', label: '01  Resumen', icon: LayoutDashboard },
    { id: 'entradas', label: '02  Entradas analógicas', icon: SlidersHorizontal },
    { id: 'escalamiento', label: '03  Escalamiento', icon: Sliders },
    { id: 'tendencias', label: '04  Tendencias', icon: TrendingUp },
    { id: 'calidad', label: '05  Calidad', icon: ShieldCheck },
    { id: 'rs485', label: '06  RS-485', icon: Radio },
    { id: 'diagnostico', label: '07  Diagnóstico', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#071728] border-r border-[#1a3854] flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
      <div>
        {/* Module Title */}
        <div className="mb-6 pb-4 border-b border-[#1a3854]">
          <h2 className="text-base font-black text-white tracking-wide uppercase">
            VOLISON ADM
          </h2>
          <p className="text-[10px] text-[#00bdd6] font-bold tracking-wider uppercase mt-0.5">
            MÓDULO DE ADQUISICIÓN ANALÓGICA
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#00bdd6]/20 to-[#2563eb]/20 text-[#00bdd6] border-l-4 border-[#00bdd6] shadow-md shadow-cyan-500/10'
                    : 'text-[#8ab3cf] hover:bg-[#0f253b] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#00bdd6]' : 'text-[#57809e]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Device Status Sidebar Card */}
      <div className="mt-6 pt-4 border-t border-[#1a3854] space-y-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#57809e] mb-1">
            ESTADO DEL DISPOSITIVO
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
            <span>ONLINE</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#57809e] uppercase block">COMUNICACIÓN</span>
            <span className="font-semibold text-white">COM2 / RS-485</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#57809e] uppercase block">PROTOCOLO</span>
            <span className="font-semibold text-white">Modbus RTU</span>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#57809e] uppercase block">SLAVE ID</span>
              <span className="font-bold text-white font-mono">1</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#57809e] uppercase block">CANALES</span>
              <span className="font-bold text-white font-mono">8 / 8</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#57809e] uppercase block">CALIDAD GLOBAL</span>
            <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-black rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              GOOD
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
