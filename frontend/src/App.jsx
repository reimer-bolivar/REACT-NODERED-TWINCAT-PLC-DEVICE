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

// N4DIM32 Views
import N4DIM32ResumenView from './views/n4dim32/N4DIM32ResumenView';
import N4DIM32TodasEntradasView from './views/n4dim32/N4DIM32TodasEntradasView';
import N4DIM32GrupoDetailView from './views/n4dim32/N4DIM32GrupoDetailView';
import N4DIM32EventosView from './views/n4dim32/N4DIM32EventosView';

// ASDA-A3 Views
import ASDA3ResumenView from './views/asda3/ASDA3ResumenView';
import ASDA3EjesView from './views/asda3/ASDA3EjesView';
import ASDA3ControlView from './views/asda3/ASDA3ControlView';
import ASDA3PosicionView from './views/asda3/ASDA3PosicionView';
import ASDA3VelocidadView from './views/asda3/ASDA3VelocidadView';
import ASDA3TorqueView from './views/asda3/ASDA3TorqueView';
import ASDA3MotionView from './views/asda3/ASDA3MotionView';
import ASDA3AlarmasView from './views/asda3/ASDA3AlarmasView';

export default function App() {
  const [currentView, setCurrentView] = useState('resumen');
  const [activeDevice, setActiveDevice] = useState('volison');

  const handleDeviceChange = (dev) => {
    setActiveDevice(dev);
    if (dev === 'adam') {
      setCurrentView('adam-resumen');
    } else if (dev === 'vfd') {
      setCurrentView('vfd-resumen');
    } else if (dev === 'n4dim32') {
      setCurrentView('n4-resumen');
    } else if (dev === 'asda3') {
      setCurrentView('asda-resumen');
    } else if (dev === 'volison') {
      setCurrentView('resumen');
    }
  };

  const renderMainView = () => {
    if (activeDevice === 'asda3') {
      switch (currentView) {
        case 'asda-resumen':
          return <ASDA3ResumenView />;
        case 'asda-ejes':
          return <ASDA3EjesView />;
        case 'asda-control':
          return <ASDA3ControlView />;
        case 'asda-posicion':
          return <ASDA3PosicionView />;
        case 'asda-velocidad':
          return <ASDA3VelocidadView />;
        case 'asda-torque':
          return <ASDA3TorqueView />;
        case 'asda-motion':
          return <ASDA3MotionView />;
        case 'asda-alarmas':
          return <ASDA3AlarmasView />;
        default:
          return <ASDA3ResumenView />;
      }
    }

    if (activeDevice === 'n4dim32') {
      switch (currentView) {
        case 'n4-resumen':
          return <N4DIM32ResumenView />;
        case 'n4-entradas':
          return <N4DIM32TodasEntradasView />;
        case 'n4-g1':
          return <N4DIM32GrupoDetailView groupId={1} />;
        case 'n4-g2':
          return <N4DIM32GrupoDetailView groupId={2} />;
        case 'n4-g3':
          return <N4DIM32GrupoDetailView groupId={3} />;
        case 'n4-g4':
          return <N4DIM32GrupoDetailView groupId={4} />;
        case 'n4-eventos':
        case 'n4-diagnostico':
        case 'n4-configuracion':
          return <N4DIM32EventosView />;
        default:
          return <N4DIM32ResumenView />;
      }
    }

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
