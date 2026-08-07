import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

import ResumenView from './views/ResumenView';
import EntradasAnalogicasView from './views/EntradasAnalogicasView';
import EscalamientoView from './views/EscalamientoView';
import TendenciasView from './views/TendenciasView';
import CalidadView from './views/CalidadView';
import RS485View from './views/RS485View';
import DiagnosticoView from './views/DiagnosticoView';
import VFDControlView from './views/VFDControlView';

export default function App() {
  const [currentView, setCurrentView] = useState('resumen');
  const [activeDevice, setActiveDevice] = useState('volison');

  const renderMainView = () => {
    if (activeDevice === 'vfd') {
      return <VFDControlView />;
    }

    switch (currentView) {
      case 'resumen':
        return <ResumenView />;
      case 'entradas':
        return <EntradasAnalogicasView />;
      case 'escalamiento':
        return <EscalamientoView />;
      case 'tendencias':
        return <TendenciasView />;
      case 'calidad':
        return <CalidadView />;
      case 'rs485':
        return <RS485View />;
      case 'diagnostico':
        return <DiagnosticoView />;
      default:
        return <ResumenView />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#071524] text-slate-100 overflow-hidden font-sans">
      {/* SCADA Top Header */}
      <Header />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={(view) => {
            setActiveDevice('volison');
            setCurrentView(view);
          }}
        />

        {/* View Content Workspace */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#071524]">
          {renderMainView()}
        </main>
      </div>

      {/* Bottom Device Hardware Selector */}
      <BottomNav
        activeDevice={activeDevice}
        setActiveDevice={(dev) => {
          setActiveDevice(dev);
        }}
      />
    </div>
  );
}
