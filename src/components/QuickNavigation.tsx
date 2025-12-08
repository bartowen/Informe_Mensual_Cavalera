import { ArrowRight, BarChart3, BookOpen, Wrench } from 'lucide-react';

interface QuickNavigationProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export default function QuickNavigation({ currentTab, onNavigate }: QuickNavigationProps) {
  // Definir opciones de navegación basadas en el tab actual
  const getNavigationOptions = () => {
    const allTabs = [
      {
        value: 'resumen-general',
        label: 'Resumen General',
        icon: <BarChart3 className="w-5 h-5" />,
        logo: null,
      },
      {
        value: 'google-ads',
        label: 'Google Ads',
        logo: '/logo_google_ads.png',
        icon: null,
      },
      {
        value: 'ga4',
        label: 'Google Analytics 4',
        logo: '/logo_ga4-removebg-preview.png',
        icon: null,
      },
      {
        value: 'meta-ads',
        label: 'Meta Ads',
        logo: '/logo_meta_.png',
        icon: null,
      },
      {
        value: 'diccionario',
        label: 'Diccionario de Métricas',
        icon: <BookOpen className="w-5 h-5" />,
        logo: null,
      },
      {
        value: 'otros-avances',
        label: 'Otros Avances',
        icon: <Wrench className="w-5 h-5" />,
        logo: null,
      },
    ];

    // Filtrar el tab actual y retornar hasta 4-5 opciones
    return allTabs.filter((tab) => tab.value !== currentTab).slice(0, 5);
  };

  const navigationOptions = getNavigationOptions();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-md p-6 border border-blue-200">
      <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
        <span className="text-xl">🚀</span>
        ¿Quieres explorar otras métricas?
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Navega rápidamente a otras secciones del dashboard
      </p>

      {/* Botones de navegación */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {navigationOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onNavigate(option.value)}
            className="group bg-white hover:bg-gradient-to-r hover:from-[#3bc6dc] hover:to-[#21a9c2] border-2 border-gray-200 hover:border-[#3bc6dc] rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="flex flex-col items-center gap-2">
              {/* Logo o Ícono */}
              {option.logo ? (
                <div className="bg-gray-50 group-hover:bg-white rounded p-2 transition-colors">
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="h-8 w-8 object-contain"
                  />
                </div>
              ) : (
                <div className="text-[#3bc6dc] group-hover:text-white transition-colors">
                  {option.icon}
                </div>
              )}

              {/* Label */}
              <span className="text-sm font-medium text-gray-700 group-hover:text-white text-center transition-colors">
                {option.label}
              </span>

              {/* Flecha */}
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
