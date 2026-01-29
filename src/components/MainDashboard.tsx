import React, { useState } from 'react';
import Sidebar, { TabValue } from './layout/Sidebar';
import ResumenGeneral from '../pages/ResumenGeneral';
import GoogleAdsPage from '../pages/GoogleAdsPage';
import MetaAdsPage from '../pages/MetaAdsPage';
import VentasReservasPage from '../pages/VentasReservasPage';
import DiccionarioPage from '../pages/DiccionarioPage';
import { useClient } from '../App';

const MainDashboard: React.FC = () => {
  const { client } = useClient();
  const [activeTab, setActiveTab] = useState<TabValue>('resumen-general');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'resumen-general' || tab === 'google-ads' || tab === 'meta-ads' || tab === 'ventas-reservas' || tab === 'diccionario') {
      setActiveTab(tab as TabValue);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'resumen-general':
        return <ResumenGeneral onNavigate={handleNavigate} />;
      case 'google-ads':
        return <GoogleAdsPage />;
      case 'meta-ads':
        return <MetaAdsPage />;
      case 'ventas-reservas':
        return <VentasReservasPage />;
      case 'diccionario':
        return <DiccionarioPage />;
      default:
        return <ResumenGeneral onNavigate={handleNavigate} />;
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
