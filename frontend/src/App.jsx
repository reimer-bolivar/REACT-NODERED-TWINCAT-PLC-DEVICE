import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';

// VOLISON ADM Views
import ResumenView from './views/ResumenView';
import EntradasAnalogicasView from './views/EntradasAnalogicasView';
import EscalamientoView from './views/EscalamientoView';
import TendenciasView from './views/TendenciasView';
import CalidadView from './views/CalidadView';
import RS485View from './views/RS485View';
import DiagnosticoView from './views/DiagnosticoView';

// ADAM-6060 Views
import AdamResumenView from './views/adam/AdamResumenView';
import AdamEntradasDigitalesView from './views/adam/AdamEntradasDigitalesView';
import AdamRelesView from './views/adam/AdamRelesView';
import AdamEventosView from './views/adam/AdamEventosView';

// VFD DELTA C2000 Views
import VFDResumenView from './views/vfd/VFDResumenView';
import VFDControlMainView from './views/vfd/VFDControlMainView';
import VFDFrecuenciaView from './views/vfd/VFDFrecuenciaView';
import VFDElectricasView from './views/vfd/VFDElectricasView';
import VFDTendenciasView from './views/vfd/VFDTendenciasView';
import VFDAlarmasView from './views/vfd/VFDAlarmasView';
import VFDParametrosView from './views/vfd/VFDParametrosView';

export default function App() {
  const [currentView, setCurrentView] = useState('resumen');
  const [activeDevice, setActiveDevice] = useState('volison');

  const handleDeviceChange = (dev) => {
    setActiveDevice(dev);
    if (dev === 'adam') {
      setCurrentView('adam-resumen');
    } else if (dev === 'vfd') {
      setCurrentView('vfd-resumen');
    } else if (dev === 'volison') {
      setCurrentView('resumen');
    }
  };

  const renderMainView = () => {
    if (activeDevice === 'vfd') {
      switch (currentView) {
        case 'vfd-resumen':
          return <VFDResumenView />;
        case 'vfd-control':
          return <VFDControlMainView />;
        case 'vfd-frecuencia':
          return <VFDFrecuenciaView />;
        case 'vfd-electricas':
          return <VFDElectricasView />;
        case 'vfd-tendencias':
          return <VFDTendenciasView />;
        case 'vfd-alarmas':
          return <VFDAlarmasView />;
        case 'vfd-parametros':
        case 'vfd-entradas':
        case 'vfd-historial':
        case 'vfd-comunicacion':
        case 'vfd-diagnostico':
        case 'vfd-mantenimiento':
          return <VFDParametrosView />;
        default:
          return <VFDResumenView />;
      }
    }

    if (activeDevice === 'adam') {
      switch (currentView) {
        case 'adam-resumen':
          return <AdamResumenView />;
        case 'adam-entradas':
          return <AdamEntradasDigitalesView />;
        case 'adam-reles':
        case 'adam-contadores':
          return <AdamRelesView />;
        case 'adam-eventos':
        case 'adam-ethernet':
        case 'adam-modbus':
        case 'adam-diagnostico':
          return <AdamEventosView />;
        default:
          return <AdamResumenView />;
      }
    }

    // Default: VOLISON ADM
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
          setCurrentView={(view) => setCurrentView(view)}
          activeDevice={activeDevice}
        />

        {/* View Content Workspace */}
        <main className="flex-1 p-4 overflow-y-auto bg-[#071524]">
          {renderMainView()}
        </main>
      </div>

      {/* Bottom Device Hardware Selector */}
      <BottomNav
        activeDevice={activeDevice}
        setActiveDevice={handleDeviceChange}
      />
    </div>
  );
}
