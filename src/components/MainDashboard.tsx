import React, { useState } from 'react';
import Sidebar, { TabValue } from './layout/Sidebar';
import ResumenGeneral from '../pages/ResumenGeneral';
import GoogleAdsPage from '../pages/GoogleAdsPage';
import MetaAdsPage from '../pages/MetaAdsPage';
import VentasReservasPage from '../pages/VentasReservasPage';
import DiccionarioPage from '../pages/DiccionarioPage';
import AcumuladoPage from '../pages/AcumuladoPage';
import AcumuladoGooglePage from '../pages/AcumuladoGooglePage';
import AcumuladoMetaPage from '../pages/AcumuladoMetaPage';
import AcumuladoVentasPage from '../pages/AcumuladoVentasPage';
import InsightsPage from '../pages/InsightsPage';
import { useClient } from '../App';
import allMonthsData, { MonthData } from '../data/allMonthsData';

const MainDashboard: React.FC = () => {
  const { client } = useClient();
  const [activeTab, setActiveTab] = useState<TabValue>('resumen-general');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('febrero2026');

  const currentMonthData: MonthData = allMonthsData.find(m => m.key === selectedMonth) || allMonthsData[1];

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'resumen-general' || tab === 'google-ads' || tab === 'meta-ads' || tab === 'ventas-reservas' || tab === 'insights' || tab === 'diccionario') {
      setActiveTab(tab as TabValue);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    if (selectedMonth === 'acumulado2026') {
      switch (activeTab) {
        case 'google-ads':      return <AcumuladoGooglePage />;
        case 'meta-ads':        return <AcumuladoMetaPage />;
        case 'ventas-reservas': return <AcumuladoVentasPage />;
        default:                return <AcumuladoPage />;
      }
    }
    switch (activeTab) {
      case 'resumen-general':
        return <ResumenGeneral onNavigate={handleNavigate} monthData={currentMonthData} />;
      case 'google-ads':
        return <GoogleAdsPage monthData={currentMonthData} />;
      case 'meta-ads':
        return <MetaAdsPage monthData={currentMonthData} />;
      case 'ventas-reservas':
        return <VentasReservasPage monthData={currentMonthData} />;
      case 'insights':
        return <InsightsPage />;
      case 'diccionario':
        return <DiccionarioPage />;
      default:
        return <ResumenGeneral onNavigate={handleNavigate} monthData={currentMonthData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobileOpen={mobileMenuOpen}
        onMobileToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        client={client}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />

      {/* Main Content */}
      <main className="lg:ml-[280px] min-h-screen">
        {/* Mobile spacer for fixed header */}
        <div className="h-16 lg:hidden" />

        {/* Content Area */}
        <div className="p-4 md:p-6 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
