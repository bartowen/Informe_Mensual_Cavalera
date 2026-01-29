import React, { useState } from 'react';
import Sidebar, { TabValue } from './Sidebar';
import { useClient } from '../../App';

interface AppLayoutProps {
  children: (activeTab: TabValue) => React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { client } = useClient();
  const [activeTab, setActiveTab] = useState<TabValue>('resumen-general');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabChange = (tab: TabValue) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          {children(activeTab)}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
