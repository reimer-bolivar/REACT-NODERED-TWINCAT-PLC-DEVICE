import React from 'react';
import {
  LayoutDashboard,
  SlidersHorizontal,
  Sliders,
  TrendingUp,
  ShieldCheck,
  Radio,
  Settings,
  Zap,
  Activity,
  Layers,
  ShieldAlert,
  Server,
  Network,
  Gauge,
  AlertTriangle,
  History,
  Wrench,
  Grid
} from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView, activeDevice }) {
  const volisonMenuItems = [
    { id: 'resumen', label: '01  Resumen', icon: LayoutDashboard },
    { id: 'entradas', label: '02  Entradas analógicas', icon: SlidersHorizontal },
    { id: 'escalamiento', label: '03  Escalamiento', icon: Sliders },
    { id: 'tendencias', label: '04  Tendencias', icon: TrendingUp },
    { id: 'calidad', label: '05  Calidad', icon: ShieldCheck },
    { id: 'rs485', label: '06  RS-485', icon: Radio },
    { id: 'diagnostico', label: '07  Diagnóstico', icon: Settings },
  ];

  const adamMenuItems = [
    { id: 'adam-resumen', label: '08  Resumen', icon: LayoutDashboard },
    { id: 'adam-entradas', label: '09  Entradas digitales', icon: SlidersHorizontal },
    { id: 'adam-reles', label: '10  Relés', icon: Zap },
    { id: 'adam-contadores', label: '11  Contadores', icon: Activity },
    { id: 'adam-eventos', label: '12  Eventos', icon: ShieldAlert },
    { id: 'adam-ethernet', label: '13  Ethernet', icon: Network },
    { id: 'adam-modbus', label: '14  Modbus TCP', icon: Server },
    { id: 'adam-diagnostico', label: '15  Diagnóstico', icon: Settings },
  ];

  const vfdMenuItems = [
    { id: 'vfd-resumen', label: '16  Resumen', icon: LayoutDashboard },
    { id: 'vfd-control', label: '17  Control', icon: Gauge },
    { id: 'vfd-frecuencia', label: '18  Frecuencia', icon: Activity },
    { id: 'vfd-electricas', label: '19  Variables eléctricas', icon: Zap },
    { id: 'vfd-tendencias', label: '20  Tendencias', icon: TrendingUp },
    { id: 'vfd-alarmas', label: '21  Alarmas', icon: AlertTriangle },
    { id: 'vfd-parametros', label: '22  Parámetros', icon: Sliders },
    { id: 'vfd-entradas', label: '23  Entradas / Salidas', icon: SlidersHorizontal },
    { id: 'vfd-historial', label: '24  Historial', icon: History },
    { id: 'vfd-comunicacion', label: '25  Comunicación', icon: Radio },
    { id: 'vfd-diagnostico', label: '26  Diagnóstico', icon: Settings },
  ];

  const n4dimMenuItems = [
    { id: 'n4-resumen', label: '25  N4DIM32 · Resumen', icon: LayoutDashboard },
    { id: 'n4-entradas', label: '26  N4DIM32 · 32 Entradas', icon: Grid },
    { id: 'n4-g1', label: '27  N4DIM32 · Grupo 1', icon: SlidersHorizontal },
    { id: 'n4-g2', label: '28  N4DIM32 · Grupo 2', icon: SlidersHorizontal },
    { id: 'n4-g3', label: '29  N4DIM32 · Grupo 3', icon: SlidersHorizontal },
    { id: 'n4-g4', label: '30  N4DIM32 · Grupo 4', icon: SlidersHorizontal },
    { id: 'n4-eventos', label: '31  N4DIM32 · Eventos', icon: ShieldAlert },
    { id: 'n4-diagnostico', label: '32  N4DIM32 · Diagnóstico', icon: Settings },
    { id: 'n4-configuracion', label: '33  N4DIM32 · Configuración', icon: Wrench },
  ];

  let menuItems = volisonMenuItems;
  let title = 'VOLISON ADM';
  let subtitle = 'MÓDULO DE ADQUISICIÓN ANALÓGICA';

  if (activeDevice === 'adam') {
    menuItems = adamMenuItems;
    title = 'ADAM-6060';
    subtitle = 'MÓDULO I/O DIGITAL REMOTO (6 DI / 6 Relés)';
  } else if (activeDevice === 'vfd') {
    menuItems = vfdMenuItems;
    title = 'VFD DELTA C2000';
    subtitle = 'VARIADOR DE FRECUENCIA (55 kW / 75 HP)';
  } else if (activeDevice === 'n4dim32') {
    menuItems = n4dimMenuItems;
    title = 'N4DIM32';
    subtitle = 'MÓDULO DE 32 ENTRADAS DIGITALES (24 VDC)';
  }

  return (
    <aside className="w-64 bg-[#071728] border-r border-[#1a3854] flex flex-col justify-between p-4 shrink-0 overflow-y-auto">
      <div>
        {/* Module Title */}
        <div className="mb-6 pb-4 border-b border-[#1a3854]">
          <h2 className="text-base font-black text-white tracking-wide uppercase">
            {title}
          </h2>
          <p className="text-[10px] text-[#00bdd6] font-bold tracking-wider uppercase mt-0.5">
            {subtitle}
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
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
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
            ESTADO DEL MÓDULO
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#20d69f]"></span>
            <span>ONLINE</span>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <span className="text-[10px] font-bold text-[#57809e] uppercase block">COMUNICACIÓN</span>
            <span className="font-semibold text-white">
              {activeDevice === 'adam' ? 'ETHERNET / MODBUS TCP' : 'COM2 / RS-485'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#57809e] uppercase block">PROTOCOLO</span>
            <span className="font-semibold text-white">
              {activeDevice === 'adam' ? 'Modbus TCP (192.168.1.60)' : 'Modbus RTU (Slave 1)'}
            </span>
          </div>
          <div className="flex justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#57809e] uppercase block">
                {activeDevice === 'vfd' ? 'FRECUENCIA' : 'ENTRADAS'}
              </span>
              <span className="font-bold text-white font-mono">
                {activeDevice === 'vfd' ? '31.90 Hz' : activeDevice === 'n4dim32' ? '12 / 32 DI' : activeDevice === 'adam' ? '6 / 6 DI' : '8 / 8 AI'}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#57809e] uppercase block">
                {activeDevice === 'vfd' ? 'POTENCIA' : activeDevice === 'adam' ? 'RELÉS' : 'TENSIÓN'}
              </span>
              <span className="font-bold text-white font-mono">
                {activeDevice === 'vfd' ? '12.3 kW' : activeDevice === 'n4dim32' ? '24.1 VDC' : activeDevice === 'adam' ? '6 / 6 RO' : '1'}
              </span>
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
