import React, { useState } from 'react';
import {
  BarChart3,
  Target,
  Instagram,
  BookOpen,
  Menu,
  X,
  Wallet,
  Calendar,
  ChevronDown,
  Check,
  Lightbulb,
} from 'lucide-react';
import { ClientConfig } from '../../config/clients';

export type TabValue = 'resumen-general' | 'google-ads' | 'meta-ads' | 'ventas-reservas' | 'insights' | 'diccionario';

interface NavItem {
  value: TabValue;
  icon: React.ElementType;
  logo?: string;
  label: string;
  subtitle: string;
  channel?: 'googleAds' | 'metaAds' | 'agendaPro';
}

interface SidebarProps {
  activeTab: TabValue;
  onTabChange: (tab: TabValue) => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
  client: ClientConfig;
  selectedMonth: string;
  onMonthChange: (monthKey: string) => void;
}

const allNavItems: NavItem[] = [
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
    channel: 'googleAds',
  },
  {
    value: 'meta-ads',
    icon: Instagram,
    logo: '/logo_meta_.png',
    label: 'Meta Ads',
    subtitle: 'Facebook & Instagram',
    channel: 'metaAds',
  },
  {
    value: 'ventas-reservas',
    icon: Wallet,
    label: 'Ventas y Reservas',
    subtitle: 'Datos AgendaPro',
    channel: 'agendaPro',
  },
  {
    value: 'insights',
    icon: Lightbulb,
    label: 'Insights',
    subtitle: 'Hallazgos automáticos',
  },
  {
    value: 'diccionario',
    icon: BookOpen,
    label: 'Diccionario',
    subtitle: 'Aprende las métricas',
  },
];

const periodOptions = [
  { label: 'Diciembre 2025', value: 'diciembre2025' },
  { label: 'Enero 2026',     value: 'enero2026'     },
  { label: 'Febrero 2026',   value: 'febrero2026'   },
  { label: '2026 Acumulado', value: 'acumulado2026' },
];

const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  mobileOpen,
  onMobileToggle,
  client,
  selectedMonth,
  onMonthChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = periodOptions.find(o => o.value === selectedMonth)?.label ?? 'Seleccionar';

  const navItems = allNavItems.filter((item) => {
    if (!item.channel) return true;
    return client.channels[item.channel];
  });

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
          fixed top-0 left-0 h-full w-[280px] bg-[#1a1a1a] z-50 flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Header */}
        <div className="p-6 border-b border-gray-800 flex-shrink-0">
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
            <button
              onClick={onMobileToggle}
              className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cliente Info */}
        <div className="p-4 mx-4 mt-4 bg-gray-800/50 rounded-lg border border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-1.5">
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="h-8 w-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded flex items-center justify-center text-white font-bold">
                  {client.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-white font-medium text-sm">{client.name}</p>
              <p className="text-gray-400 text-xs">{client.month}</p>
            </div>
          </div>
        </div>

        {/* Selector de Período — Dropdown */}
        <div className="px-4 mt-4 flex-shrink-0">
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider px-1 mb-2">
            Período
          </p>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#22d3ee] flex-shrink-0" />
                <span className="text-sm font-medium truncate">{selectedLabel}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded-lg border border-gray-700 shadow-xl z-10 overflow-hidden">
                {periodOptions.map((option) => {
                  const isSelected = selectedMonth === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        onMonthChange(option.value);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors
                        ${isSelected ? 'bg-gray-700 text-[#22d3ee]' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                      `}
                    >
                      <span className={isSelected ? 'font-semibold' : ''}>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#22d3ee] flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 flex-1 overflow-y-auto">
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
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <p className="text-gray-600 text-xs text-center">
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
          <span className="text-white font-semibold">{client.name}</span>
        </div>
        <div className="w-10" />
      </div>
    </>
  );
};

export default Sidebar;
