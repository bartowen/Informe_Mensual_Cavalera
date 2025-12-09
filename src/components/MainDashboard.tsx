import React, { useState, useEffect } from 'react';
import ResumenGeneralTab from './ResumenGeneralTab';
import Dashboard from './Dashboard';
import GA4Tab from './GA4Tab';
import MetaAdsTab from './MetaAdsTab';
import DiccionarioTab from './DiccionarioTab';
import OtrosAvancesTab from './OtrosAvancesTab';
import {
  BarChart3,
  Wrench,
  Calendar,
  Bot,
  BookOpen,
  Menu,
  X,
  CheckCircle2,
} from 'lucide-react';

const MainDashboard: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen-general');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navbar en scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        // Siempre mostrar navbar si estamos cerca del top
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling hacia abajo y pasamos el umbral -> ocultar
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling hacia arriba -> mostrar
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Definición de tabs
  const tabs = [
    {
      value: 'resumen-general',
      icon: BarChart3,
      label: 'Resumen General',
      mobileLabel: 'Resumen',
      subtitle: 'Visión global'
    },
    {
      value: 'google-ads',
      logo: '/logo_google_ads.png',
      label: 'Google Ads',
      mobileLabel: 'Google Ads',
      subtitle: 'Búsqueda pagada'
    },
    {
      value: 'ga4',
      logo: '/logo_ga4-removebg-preview.png',
      label: 'Google Analytics 4',
      mobileLabel: 'Analytics',
      subtitle: 'Comportamiento web'
    },
    {
      value: 'meta-ads',
      logo: '/logo_meta_.png',
      label: 'Meta Ads',
      mobileLabel: 'Meta Ads',
      subtitle: 'Facebook & Instagram'
    },
    {
      value: 'diccionario',
      icon: BookOpen,
      label: 'Diccionario',
      mobileLabel: 'Diccionario',
      subtitle: 'Aprende las métricas'
    },
    {
      value: 'otros-avances',
      icon: Wrench,
      label: 'Otros Avances',
      mobileLabel: 'Avances',
      subtitle: 'Mejoras técnicas'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Superior */}
      <header className="bg-gradient-to-r from-[#3bc6dc] via-[#2eb8cf] to-[#21a9c2] py-4 px-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto">

          {/* Primera fila: Logos + Título + Hamburguesa/Acciones */}
          <div className="flex items-center justify-between gap-3">

            {/* Logos (siempre visibles) */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-white rounded-lg p-1.5 shadow-md">
                <img
                  src="/cavalera_tatoo.png"
                  alt="Cavalera"
                  className="h-8 md:h-10 w-auto"
                />
              </div>
              <div className="bg-white rounded-lg p-1.5 shadow-md">
                <img
                  src="/logo_towen_ads.png"
                  alt="Towen Ads"
                  className="h-8 md:h-10 w-auto"
                />
              </div>
            </div>

            {/* Título (responsive) */}
            <div className="flex-1 text-center px-2">
              {/* Desktop */}
              <h1 className="hidden md:block text-2xl lg:text-3xl font-bold text-white">
                Reporte Mensual - Cavalera Tattoo & Piercing Studio
              </h1>
              <p className="hidden md:block text-cyan-50 mt-1 text-sm">
                Dashboard multi-canal de marketing digital · Noviembre 2025
              </p>

              {/* Mobile */}
              <h1 className="md:hidden text-base font-bold text-white leading-tight">
                Cavalera - Nov 2025
              </h1>
            </div>

            {/* Botón Hamburguesa (solo móvil) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 hover:bg-white/20 transition-all flex-shrink-0"
              aria-label="Menú"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Acciones Desktop */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Nov 2025</span>
                </div>
              </div>
              <button
                disabled
                className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 cursor-not-allowed relative"
              >
                <div className="flex items-center gap-2 text-white">
                  <Bot className="w-5 h-5" />
                  <span className="text-sm font-medium">Bartowen AI</span>
                </div>
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  Pronto
                </span>
              </button>
            </div>
          </div>

          {/* Segunda fila MÓVIL: Calendario + Bartowen AI */}
          <div className="md:hidden flex items-center gap-2 mt-3">
            <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
              <div className="flex items-center gap-2 text-white justify-center">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-medium">Nov 2025</span>
              </div>
            </div>
            <button
              disabled
              className="flex-1 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20 cursor-not-allowed relative"
            >
              <div className="flex items-center gap-2 text-white justify-center">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-medium">Bartowen AI</span>
              </div>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold text-[10px]">
                Pronto
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* Barra de Navegación Desktop */}
      <div
        className={`bg-white border-b shadow-sm sticky top-[88px] md:top-[96px] z-30 hidden md:block transition-transform duration-300 ease-in-out ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 gap-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all font-medium text-sm whitespace-nowrap
                  ${activeTab === tab.value
                    ? 'bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {/* Logo o Ícono */}
                {tab.logo ? (
                  <div className={`rounded p-1 ${activeTab === tab.value ? 'bg-white' : 'bg-white'}`}>
                    <img
                      src={tab.logo}
                      alt={tab.label}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                ) : tab.icon ? (
                  <div className={activeTab === tab.value ? 'text-white' : 'text-[#3bc6dc]'}>
                    {React.createElement(tab.icon, { className: 'w-5 h-5' })}
                  </div>
                ) : null}

                {/* Texto */}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menú Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Menú Mobile Sidebar */}
      <div
        className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header del menú */}
        <div className="bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] p-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Navegación</h2>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lista de pestañas */}
        <div className="overflow-y-auto h-[calc(100%-80px)]">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-lg transition-all
                  ${activeTab === tab.value
                    ? 'bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }
                `}
              >
                {/* Ícono o Logo */}
                <div className="flex-shrink-0">
                  {tab.logo ? (
                    <div className="bg-white rounded-lg p-2">
                      <img
                        src={tab.logo}
                        alt={tab.label}
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                  ) : tab.icon ? (
                    <div className={activeTab === tab.value ? 'text-white' : 'text-[#3bc6dc]'}>
                      {React.createElement(tab.icon, { className: 'w-8 h-8' })}
                    </div>
                  ) : null}
                </div>

                {/* Texto */}
                <div className="flex-1 text-left">
                  <div className="font-semibold">{tab.label}</div>
                  <div className={`text-xs ${activeTab === tab.value ? 'text-cyan-100' : 'text-gray-500'}`}>
                    {tab.subtitle}
                  </div>
                </div>

                {/* Indicador activo */}
                {activeTab === tab.value && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
              </button>
            ))}
          </nav>

          {/* Acciones adicionales (móvil) */}
          <div className="p-4 border-t space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-gray-700 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Mes actual</span>
              </div>
              <div className="text-lg font-bold text-[#3bc6dc]">Noviembre 2025</div>
              <div className="text-xs text-gray-500 mt-1">
                Próximamente: Comparar meses
              </div>
            </div>

            <button
              disabled
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-3 border border-gray-300 cursor-not-allowed"
            >
              <div className="flex items-center gap-2 justify-center text-gray-600">
                <Bot className="w-5 h-5" />
                <span className="text-sm font-medium">Bartowen AI</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Próximamente</div>
            </button>
          </div>
        </div>
      </div>

      {/* NAVEGACIÓN MÓVIL - Nueva versión compacta estilo desktop */}
      <div className="md:hidden bg-white border-b shadow-sm sticky top-[72px] z-40">
        <div className="overflow-x-auto hide-scrollbar px-2 py-2">
          <div className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  window.scrollTo(0, 0);
                }}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
                  transition-all duration-200 whitespace-nowrap
                  ${activeTab === tab.value
                    ? 'bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {tab.logo ? (
                  <div className={`w-4 h-4 rounded ${activeTab === tab.value ? 'bg-white' : 'bg-white'} p-0.5`}>
                    <img
                      src={tab.logo}
                      alt={tab.mobileLabel}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  React.createElement(tab.icon as any, { className: 'w-4 h-4' })
                )}
                <span>{tab.mobileLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Contenido de las pestañas */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeTab === 'resumen-general' && <ResumenGeneralTab onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0, 0); }} />}
        {activeTab === 'google-ads' && <Dashboard onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0, 0); }} />}
        {activeTab === 'ga4' && <GA4Tab onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0, 0); }} />}
        {activeTab === 'meta-ads' && <MetaAdsTab onNavigate={(tab) => { setActiveTab(tab); window.scrollTo(0, 0); }} />}
        {activeTab === 'diccionario' && <DiccionarioTab />}
        {activeTab === 'otros-avances' && <OtrosAvancesTab />}
      </div>
    </div>
  );
};

export default MainDashboard;
