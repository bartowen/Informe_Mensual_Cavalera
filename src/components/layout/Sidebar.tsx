import React from 'react';
import {
  BarChart3,
  Target,
  Instagram,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';

export type TabValue = 'resumen-general' | 'google-ads' | 'meta-ads' | 'diccionario';

interface NavItem {
  value: TabValue;
  icon: React.ElementType;
  logo?: string;
  label: string;
  subtitle: string;
}

interface SidebarProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

const navItems: NavItem[] = [
  {
    value: 'resumen-general',
    icon: BarChart3,
    label: 'Resumen General',
    subtitle: 'Visión global',
  },
  {
    value: 'google-ads',
    icon: Target,
    logo: '/logo_google_ads.png',
    label: 'Google Ads',
    subtitle: 'Búsqueda pagada',
  },
  {
    value: 'meta-ads',
    icon: Instagram,
    logo: '/logo_meta_.png',
    label: 'Meta Ads',
    subtitle: 'Facebook & Instagram',
  },
  {
    value: 'diccionario',
    icon: BookOpen,
    label: 'Diccionario',
    subtitle: 'Aprende las métricas',
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  mobileOpen,
  onMobileToggle,
}) => {
  const handleNavClick = (tab: TabValue) => {
    onTabChange(tab);
    if (mobileOpen) {
      onMobileToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onMobileToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-[#1a1a1a] z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg p-2">
                <img
                  src="/logo_towen_ads.png"
                  alt="Towen Ads"
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Towen Ads</h1>
                <p className="text-gray-400 text-xs">Dashboard</p>
              </div>
            </div>
            {/* Mobile close button */}
            <button
              onClick={onMobileToggle}
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cliente Info */}
        <div className="p-4 mx-4 mt-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1.5">
              <img
                src="/cavalera_tatoo.png"
                alt="Cavalera"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Cavalera Tattoo</p>
              <p className="text-gray-400 text-xs">Enero 2026</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-3 mb-3">
            Navegación
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.value;
              const Icon = item.icon;

              return (
                <li key={item.value}>
                  <button
                    onClick={() => handleNavClick(item.value)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white shadow-lg shadow-cyan-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }
                    `}
                  >
                    {/* Icon or Logo */}
                    {item.logo ? (
                      <div className={`rounded-lg p-1.5 ${isActive ? 'bg-white' : 'bg-gray-700'}`}>
                        <img
                          src={item.logo}
                          alt={item.label}
                          className="h-5 w-5 object-contain"
                        />
                      </div>
                    ) : (
                      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : ''}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    )}

                    {/* Text */}
                    <div className="flex-1 text-left">
                      <span className="font-medium block">{item.label}</span>
                      <span className={`text-xs ${isActive ? 'text-cyan-100' : 'text-gray-500'}`}>
                        {item.subtitle}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-gray-400 text-xs mb-1">Datos actualizados</p>
            <p className="text-white text-sm font-medium">Enero 2026</p>
          </div>
          <p className="text-gray-600 text-xs text-center mt-3">
            Powered by Towen Ads
          </p>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a1a] z-30 flex items-center px-4 border-b border-gray-800">
        <button
          onClick={onMobileToggle}
          className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex-1 flex items-center justify-center gap-2">
          <img
            src="/logo_towen_ads.png"
            alt="Towen"
            className="h-6 w-auto"
          />
          <span className="text-white font-semibold">Cavalera Dashboard</span>
        </div>
        <div className="w-10" /> {/* Spacer for balance */}
      </div>
    </>
  );
};

export default Sidebar;
