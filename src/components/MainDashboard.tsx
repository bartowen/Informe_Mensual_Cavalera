import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import ResumenGeneralTab from './ResumenGeneralTab';
import Dashboard from './Dashboard';
import GA4Tab from './GA4Tab';
import MetaAdsTab from './MetaAdsTab';
import DiccionarioTab from './DiccionarioTab';
import OtrosAvancesTab from './OtrosAvancesTab';
import { BarChart3, Wrench, Calendar, ChevronDown, Bot, BookOpen } from 'lucide-react';

const MainDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Superior */}
      <header className="relative overflow-hidden">
        {/* Fondo con gradiente Towen Ads */}
        <div className="bg-gradient-to-r from-[#3bc6dc] via-[#2eb8cf] to-[#21a9c2] py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Lado izquierdo: Logos */}
              <div className="flex items-center gap-6">
                {/* Logo Cavalera */}
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <img
                    src="/src/assets/cavalera_tatoo.png"
                    alt="Cavalera Tattoo & Piercing"
                    className="h-12 w-auto"
                  />
                </div>

                {/* Separador */}
                <div className="h-12 w-px bg-white/30"></div>

                {/* Logo Towen Ads */}
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <img
                    src="/src/assets/logo_towen_ads.png"
                    alt="Towen Ads"
                    className="h-12 w-auto"
                  />
                </div>
              </div>

              {/* Centro: Título */}
              <div className="flex-1 text-center px-4 lg:px-8">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                  Reporte Mensual - Cavalera Tattoo & Piercing Studio
                </h1>
                <p className="text-cyan-50 mt-2 text-sm md:text-base">
                  Dashboard multi-canal de marketing digital · Noviembre 2025
                </p>
              </div>

              {/* Lado derecho: Acciones futuras */}
              <div className="flex items-center gap-3">
                {/* Selector de mes (próximamente) */}
                <div className="group relative">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 cursor-not-allowed">
                    <div className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Nov 2025</span>
                      <ChevronDown className="w-4 h-4 opacity-50" />
                    </div>
                    <div className="text-xs text-cyan-100 mt-0.5">Próximamente: Comparar meses</div>
                  </div>
                </div>

                {/* Bartowen AI (próximamente) */}
                <div className="group relative">
                  <button
                    disabled
                    className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 cursor-not-allowed relative"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Bot className="w-5 h-5" />
                      <span className="text-sm font-medium">Bartowen AI</span>
                    </div>
                    {/* Badge "Próximamente" */}
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">
                      Pronto
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Línea decorativa con gradiente */}
        <div className="h-1 bg-gradient-to-r from-[#3bc6dc] via-white to-[#3bc6dc]"></div>
      </header>

      {/* Navegación por Tabs */}
      <Tabs defaultValue="resumen-general" className="w-full">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 h-auto bg-gray-100 p-2 rounded-xl">

              {/* Tab 1: Resumen General */}
              <TabsTrigger
                value="resumen-general"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <BarChart3 className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">Resumen General</div>
                  <div className="text-xs opacity-80">Visión global</div>
                </div>
              </TabsTrigger>

              {/* Tab 2: Google Ads */}
              <TabsTrigger
                value="google-ads"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm">
                  <img
                    src="/src/assets/logo_google_ads.png"
                    alt="Google Ads"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">Google Ads</div>
                  <div className="text-xs opacity-80">Búsqueda pagada</div>
                </div>
              </TabsTrigger>

              {/* Tab 3: Google Analytics 4 */}
              <TabsTrigger
                value="ga4"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm">
                  <img
                    src="/src/assets/logo_ga4-removebg-preview.png"
                    alt="Google Analytics 4"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">Google Analytics 4</div>
                  <div className="text-xs opacity-80">Comportamiento web</div>
                </div>
              </TabsTrigger>

              {/* Tab 4: Meta Ads */}
              <TabsTrigger
                value="meta-ads"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <div className="w-10 h-10 bg-white rounded-lg p-1.5 shadow-sm">
                  <img
                    src="/src/assets/logo_meta_.png"
                    alt="Meta Ads"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">Meta Ads</div>
                  <div className="text-xs opacity-80">Facebook & Instagram</div>
                </div>
              </TabsTrigger>

              {/* Tab 5: Diccionario de Métricas */}
              <TabsTrigger
                value="diccionario"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <BookOpen className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">Diccionario</div>
                  <div className="text-xs opacity-80">Aprende las métricas</div>
                </div>
              </TabsTrigger>

              {/* Tab 6: Otros Avances */}
              <TabsTrigger
                value="otros-avances"
                className="flex flex-col items-center gap-2 py-4 px-2 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#3bc6dc] data-[state=active]:to-[#21a9c2] data-[state=active]:text-white rounded-lg transition-all hover:bg-gray-200 data-[state=active]:hover:from-[#2eb8cf] data-[state=active]:hover:to-[#21a9c2]"
              >
                <Wrench className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">Otros Avances</div>
                  <div className="text-xs opacity-80">Mejoras técnicas</div>
                </div>
              </TabsTrigger>

            </TabsList>
          </div>
        </div>

        {/* Contenido de cada pestaña */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <TabsContent value="resumen-general">
            <ResumenGeneralTab />
          </TabsContent>

          <TabsContent value="google-ads">
            <Dashboard />
          </TabsContent>

          <TabsContent value="ga4">
            <GA4Tab />
          </TabsContent>

          <TabsContent value="meta-ads">
            <MetaAdsTab />
          </TabsContent>

          <TabsContent value="diccionario">
            <DiccionarioTab />
          </TabsContent>

          <TabsContent value="otros-avances">
            <OtrosAvancesTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default MainDashboard;
