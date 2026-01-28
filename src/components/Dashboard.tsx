import React, { useMemo } from 'react';
import TimeSeriesChart from './TimeSeriesChart';
import SimpleLocationCards from './SimpleLocationCards';
import KeywordsTable from './KeywordsTable';
import SimpleScheduleCharts from './SimpleScheduleCharts';
import CampaignsTable from './CampaignsTable';
import InsightsPanel from './InsightsPanel';
import DemographicCharts from './DemographicCharts';
import QuickNavigation from './QuickNavigation';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

// Hooks
import { useCavaleraMetrics } from '../hooks/useCavaleraMetrics';
import { DATA_SOURCE_CONFIG } from '../config/dataSource';

// Data imports (fallback para modo static)
import { agendaProData } from '../data/agendaPro';
import {
  campaignsData as mockCampaignsData,
  timeSeriesData,
  keywordsData,
  searchTermsData,
  locationsData,
  deviceData,
  dayOfWeekData,
  hourOfDayData,
  conversionesPorSexo,
  conversionesPorEdad,
} from '../data/mockData';

// Utils
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';
import { calculateROI } from '../utils/calculations';
import { Insight, CampaignData } from '../types';

// Icons
import {
  DollarSign,
  TrendingUp,
  Target,
  Smartphone,
  AlertTriangle,
  Clock,
  ArrowRight,
  Info,
  CheckCircle2,
  Calculator,
  Zap,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Send,
  Eye,
  MousePointerClick,
  CreditCard,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Determinar si usar API o datos estáticos
  const useApi = DATA_SOURCE_CONFIG.mode === 'api';

  // Hook para obtener datos del API (solo se ejecuta si useApi es true)
  const { metrics: apiMetrics, campaigns: apiCampaigns, loading, error, refetch } = useCavaleraMetrics();

  // Usar datos del API o mock según configuración
  const campaignsData: CampaignData[] = useMemo(() => {
    if (useApi && apiCampaigns.length > 0) {
      // Transformar datos del API al formato esperado
      return apiCampaigns.map(c => ({
        campaignName: c.campaignName,
        status: 'Active' as const,
        budget: c.cost * 1.1, // Estimación de presupuesto
        impressions: c.impressions,
        clicks: c.clicks,
        conversions: c.conversions,
        cost: c.cost,
        ctr: c.ctr,
        cpc: c.cpc,
        cpa: c.cpa,
        conversionRate: c.conversionRate,
      }));
    }
    return mockCampaignsData;
  }, [useApi, apiCampaigns]);

  // Calcular métricas agregadas
  const metrics = useMemo(() => {
    // Si hay datos del API, usarlos
    if (useApi && apiMetrics) {
      const totalBudget = apiMetrics.totalCost * 1.1; // Estimación de presupuesto
      const attributableSales = agendaProData.salesFromGoogleAds?.estimatedRevenue ||
        (apiMetrics.totalConversions * (agendaProData.summary?.averageTicket || 50000));
      const roi = calculateROI(attributableSales, apiMetrics.totalCost);

      return {
        totalImpressions: apiMetrics.totalImpressions,
        totalClicks: apiMetrics.totalClicks,
        totalConversions: apiMetrics.totalConversions,
        totalCost: apiMetrics.totalCost,
        totalBudget,
        averageCTR: apiMetrics.averageCTR,
        averageCPC: apiMetrics.averageCPC,
        averageCPA: apiMetrics.averageCPA,
        costPerForm: apiMetrics.averageCPA,
        attributableSales,
        roi,
      };
    }

    // Fallback a datos mock
    const totalImpressions = campaignsData.reduce((sum, c) => sum + c.impressions, 0);
    const totalClicks = campaignsData.reduce((sum, c) => sum + c.clicks, 0);
    const totalConversions = campaignsData.reduce((sum, c) => sum + c.conversions, 0);
    const totalCost = campaignsData.reduce((sum, c) => sum + c.cost, 0);
    const totalBudget = campaignsData.reduce((sum, c) => sum + c.budget, 0);

    const averageCTR = (totalClicks / totalImpressions) * 100;
    const averageCPC = totalCost / totalClicks;
    const averageCPA = totalCost / totalConversions;
    const costPerForm = totalCost / totalConversions;

    // Ventas atribuibles a Google Ads (no las ventas totales)
    const attributableSales = agendaProData.salesFromGoogleAds?.estimatedRevenue || 0;

    // ROI basado en ventas ATRIBUIBLES a Google Ads
    const roi = calculateROI(attributableSales, totalCost);

    return {
      totalImpressions,
      totalClicks,
      totalConversions,
      totalCost,
      totalBudget,
      averageCTR,
      averageCPC,
      averageCPA,
      costPerForm,
      attributableSales,
      roi,
    };
  }, [useApi, apiMetrics, campaignsData]);

  // Generar insights automáticos - DATOS REALES (ACTUALIZADOS DICIEMBRE 2025)
  const insights: Insight[] = useMemo(() => {
    const bestLocation = locationsData.sort((a, b) => b.conversions - a.conversions)[0];
    const bestDevice = deviceData.sort((a, b) => b.conversions - a.conversions)[0];

    return [
      {
        type: 'success',
        title: 'A) CTR Sobresaliente: 11,77%',
        description: `Tu CTR de 11,77% está MUY por encima del promedio de la industria (4-6% para búsqueda). Esto significa que tus anuncios son extremadamente relevantes y atractivos para quienes buscan servicios de tatuajes y piercings en Las Condes. Tus títulos y descripciones están funcionando perfectamente.`,
        metric: `CTR: 11,77% (⬆️ +96% vs promedio industria)`,
      },
      {
        type: 'success',
        title: 'B) Tasa de Conversión Excelente: 7,69%',
        description: `Con 84 formularios de 1.093 clics, logras una conversión de 7,69%. El promedio del sector es 3-5%, lo que significa que tu landing page es ALTAMENTE efectiva. La experiencia del usuario desde el clic hasta el formulario está optimizada. Mantén esta estructura y diseño.`,
        metric: `Conversión: 7,69% (⬆️ +54% vs promedio industria)`,
      },
      {
        type: 'info',
        title: 'C) Patrón Claro: Jueves-Domingo Son Tus Mejores Días',
        description: `Los picos de conversión ocurren consistentemente de Jueves a Domingo (Nov 7: 11 forms, Nov 27: 11 forms, Nov 29: 8 forms). La gente planea tatuajes/piercings para el fin de semana. Tu estrategia de pausar Lunes-Miércoles y aumentar pujas Jue-Dom es CORRECTA.`,
        metric: `💡 Patrón: 70% de conversiones en Jue-Dom`,
      },
      {
        type: 'success',
        title: 'D) Las Condes: 79% de Tus Conversiones',
        description: `${bestLocation.conversions} de 84 formularios vienen de Las Condes, tu ubicación target principal. El CPA en esta comuna es de solo ${formatCurrency(bestLocation.cpa)}, muy competitivo. La segmentación geográfica está perfectamente alineada con tu negocio. Considera aumentar presupuesto aquí.`,
        metric: `Las Condes: ${bestLocation.conversions} conv. (79%) - CPA: ${formatCurrency(bestLocation.cpa)}`,
      },
      {
        type: 'info',
        title: 'E) Móvil Domina: 88% de Conversiones',
        description: `${bestDevice.conversions} de 84 conversiones son desde móvil. Esto es CRÍTICO: asegúrate que tu sitio web, formularios y botones de WhatsApp funcionen perfectamente en móvil. La velocidad de carga en celular debe ser menor a 3 segundos. Optimiza imágenes y evita pop-ups molestos.`,
        metric: `Mobile: ${bestDevice.conversions} conv. (88%) - Prioridad Alta`,
      },
      {
        type: 'success',
        title: 'F) Presupuesto Optimizado: 90,3% Utilizado',
        description: `Invertiste ${formatCurrency(metrics.totalCost)} de ${formatCurrency(metrics.totalBudget)} (90,3%), lo cual es ideal. No sobre-gastaste ni sub-utilizaste. Los ${formatCurrency(metrics.totalBudget - metrics.totalCost)} restantes pueden reasignarse a días de alto rendimiento (Jue-Dom) o a keywords top performers como "tatuajes las condes".`,
        metric: `Uso: 90,3% - Balance perfecto entre inversión y resultados`,
      },
    ];
  }, [metrics, locationsData, deviceData]);

  // Mostrar loading mientras carga datos del API
  if (useApi && loading) {
    return <LoadingSpinner message="Cargando métricas de Google Ads..." />;
  }

  // Mostrar error si falla la carga del API
  if (useApi && error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div>
      {/* Period Header for Google Ads Tab */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-4 md:mb-6 border-l-4 border-indigo-600">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              📊 Google Ads - Noviembre 2025
            </h2>
            <p className="text-sm text-gray-600">
              Campaña: Cavalera Search - Towen Ads · Período: 1-30 Noviembre 2025
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Datos confirmados</div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span className="font-semibold text-gray-900">84 formularios</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-textPrimary mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Métricas Principales
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">

            {/* FORMULARIOS - Card Hero Expandida */}
            <div className="col-span-2 md:col-span-1 md:row-span-2 bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl p-5 md:p-6 text-white shadow-xl">

              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium opacity-90">Formularios</div>
                <div className="bg-white/20 rounded-full p-2">
                  <Send className="w-5 h-5 md:w-6 md:h-6" />
                </div>
              </div>

              {/* Número principal */}
              <div className="text-5xl md:text-6xl font-bold mb-2">84</div>

              {/* CPA */}
              <div className="text-sm opacity-90 mb-4">
                CPA: {formatCurrency(metrics.costPerForm)}
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 pt-3 mb-3">

                {/* Mini estadísticas */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="opacity-80">Tasa conversión</span>
                    <span className="font-semibold">{formatPercentage(metrics.totalConversions / metrics.totalClicks * 100, 2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="opacity-80">De {formatNumber(metrics.totalClicks)} clics</span>
                    <span className="font-semibold">84 forms</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="opacity-80">Origen principal</span>
                    <span className="font-semibold">Las Condes</span>
                  </div>
                </div>

              </div>

              {/* Badge de tendencia */}
              <div className="flex items-center gap-2 text-xs md:text-sm bg-white/10 rounded-lg px-3 py-2">
                <TrendingUp className="w-4 h-4" />
                <span>Excelente rendimiento</span>
              </div>

              {/* Mini insight */}
              <div className="mt-3 pt-3 border-t border-white/20">
                <p className="text-xs opacity-90">
                  <strong>7,69%</strong> de tasa de conversión supera el promedio del sector (3-5%)
                </p>
              </div>

            </div>

            {/* Presupuesto - Normal */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">Presupuesto</div>
                <DollarSign className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{formatCurrency(metrics.totalBudget)}</div>
              <div className="text-xs text-gray-500">Mensual</div>
            </div>

            {/* Gastado - Normal */}
            <div className="bg-white rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">Gastado</div>
                <CreditCard className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">{formatCurrency(metrics.totalCost)}</div>
              <div className="text-xs text-blue-600 font-medium">{formatPercentage((metrics.totalCost / metrics.totalBudget) * 100, 1)} usado</div>
            </div>

            {/* Impresiones - Normal */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">Impresiones</div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{formatNumber(metrics.totalImpressions)}</div>
              <div className="text-xs text-gray-500">Alcance total</div>
            </div>

            {/* Clics - Normal */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-gray-600">Clics</div>
                <MousePointerClick className="w-4 h-4 text-gray-400" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{formatNumber(metrics.totalClicks)}</div>
              <div className="text-xs text-gray-500">Interacciones</div>
            </div>

            {/* CTR - Expandido horizontal */}
            <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-4 border-2 border-emerald-200">
              <div className="flex items-center justify-between">

                <div>
                  <div className="text-xs text-emerald-700 mb-1 font-medium">CTR</div>
                  <div className="text-3xl md:text-4xl font-bold text-emerald-600">{formatPercentage(metrics.averageCTR, 1)}</div>
                </div>

                <div className="hidden md:block h-12 w-px bg-emerald-200 mx-4"></div>

                <div className="text-right">
                  <div className="text-xs text-emerald-700 mb-1">vs Promedio sector</div>
                  <div className="text-lg md:text-xl font-semibold text-emerald-900">2-3x mejor</div>
                </div>

                <div className="bg-emerald-500 rounded-full p-2 ml-2">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>

              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-4">
            {/* 5. Costo por Formulario */}
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between mb-3">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Confirmado
                </span>
              </div>
              <div className="text-4xl font-bold text-indigo-900 mb-2">
                {formatCurrency(metrics.costPerForm)}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Costo por Formulario
              </div>
              <div className="text-xs text-gray-500 mb-2">
                CPA promedio por conversión
              </div>
              <div className="text-xs text-indigo-600 font-mono bg-indigo-50 px-2 py-1 rounded">
                {formatCurrency(metrics.totalCost)} ÷ {metrics.totalConversions}
              </div>
              <div className="mt-2 text-xs text-gray-500">
                Inversión por lead generado
              </div>
            </div>

            {/* 6. ROI Estimado */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-amber-500">
              <div className="flex items-center justify-between mb-3">
                <Target className="w-6 h-6 text-amber-600" />
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Proyección
                </span>
              </div>
              <div className="text-4xl font-bold text-amber-900 mb-2">
                ~{metrics.roi.toFixed(0)}%
              </div>
              <div className="text-sm font-medium text-amber-700 mb-1">
                ROI Estimado Google Ads
              </div>
              <div className="text-xs text-amber-600 mb-2">
                Retorno sobre inversión estimado
              </div>
              <div className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">
                Por cada $1 → ~${(metrics.roi / 100 + 1).toFixed(0)} retorno
              </div>
              <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Ver explicación en Diccionario
              </div>
            </div>

            {/* 7. Ingresos Estimados */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-orange-500">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Estimación
                </span>
              </div>
              <div className="text-4xl font-bold text-orange-900 mb-2">
                ~{formatCurrency(metrics.attributableSales)}
              </div>
              <div className="text-sm font-medium text-orange-700 mb-1">
                Ingresos Estimados Google Ads
              </div>
              <div className="text-xs text-orange-600 mb-2">
                Ingresos proyectados de Google Ads
              </div>
              <div className="text-xs text-orange-700 font-mono bg-orange-100 px-2 py-1 rounded">
                {metrics.totalConversions} × {formatCurrency(agendaProData.summary.averageTicket)}
              </div>
              <div className="mt-2 text-xs text-orange-600">
                Representa el ~24,8% de ventas totales
              </div>
              <div className="mt-1 text-xs text-orange-600 flex items-center gap-1">
                <Info className="w-3 h-3" />
                Sujeto a confirmación - Ver sección AgendaPro
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer de Ingresos Estimados - RESPONSIVE */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              {/* Ícono */}
              <div className="flex-shrink-0">
                <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
              </div>

              {/* Contenido */}
              <div className="flex-1 w-full">
                <h3 className="text-lg sm:text-xl font-bold text-amber-900 mb-3">
                  ⚠️ Importante: Sobre los Ingresos Estimados de Google Ads
                </h3>

                {/* Explicación principal */}
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-4">
                  <p className="text-sm text-amber-900 mb-3">
                    Los <strong>{formatCurrency(metrics.attributableSales)}</strong> son una <strong>ESTIMACIÓN</strong>,
                    no ingresos confirmados. Se calculan como:
                  </p>

                  <div className="bg-amber-50 rounded p-2 sm:p-3 text-sm sm:text-base">
                    <code className="font-mono break-all">{metrics.totalConversions} formularios × {formatCurrency(agendaProData.summary.averageTicket)} ticket promedio = {formatCurrency(metrics.attributableSales)}</code>
                  </div>
                </div>

                {/* Proceso de conversión */}
                <div className="mb-4">
                  <h4 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    🔄 Proceso Real:
                  </h4>

                  {/* Versión móvil - Vertical */}
                  <div className="flex flex-col gap-2 sm:hidden">
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-900 px-2 py-1 rounded text-xs font-medium">
                        1️⃣ Formulario
                      </span>
                    </div>
                    <div className="ml-4 text-amber-600">↓</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-900 px-2 py-1 rounded text-xs font-medium">
                        2️⃣ Email/WhatsApp
                      </span>
                    </div>
                    <div className="ml-4 text-amber-600">↓</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs font-medium">
                        3️⃣ Consulta
                      </span>
                    </div>
                    <div className="ml-4 text-amber-600">↓</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs font-medium">
                        4️⃣ Cotización
                      </span>
                    </div>
                    <div className="ml-4 text-amber-600">↓</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-purple-900 px-2 py-1 rounded text-xs font-medium">
                        5️⃣ Agendamiento
                      </span>
                    </div>
                    <div className="ml-4 text-amber-600">↓</div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-200 text-emerald-900 px-2 py-1 rounded text-xs font-bold">
                        6️⃣ Pago Final ✓
                      </span>
                    </div>
                  </div>

                  {/* Versión desktop - Horizontal */}
                  <div className="hidden sm:flex items-center gap-2 flex-wrap">
                    <span className="bg-indigo-100 text-indigo-900 px-3 py-2 rounded-lg text-xs font-medium">
                      1️⃣ Formulario
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="bg-indigo-100 text-indigo-900 px-3 py-2 rounded-lg text-xs font-medium">
                      2️⃣ Email/WhatsApp
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="bg-purple-100 text-purple-900 px-3 py-2 rounded-lg text-xs font-medium">
                      3️⃣ Consulta
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="bg-purple-100 text-purple-900 px-3 py-2 rounded-lg text-xs font-medium">
                      4️⃣ Cotización
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="bg-purple-100 text-purple-900 px-3 py-2 rounded-lg text-xs font-medium">
                      5️⃣ Agendamiento
                    </span>
                    <ArrowRight className="w-4 h-4 text-amber-600" />
                    <span className="bg-emerald-200 text-emerald-900 px-3 py-2 rounded-lg text-xs font-bold">
                      6️⃣ Pago Final ✓
                    </span>
                  </div>
                </div>

                {/* Nota final */}
                <div className="bg-white border-l-4 border-amber-500 rounded p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-amber-900">
                    <strong>⚠️ Importante:</strong> El cliente puede desistir en cualquier etapa.
                    Por eso usamos "estimación" y no "confirmado".
                    <span className="block mt-1 text-amber-700">
                      📊 Ver sección "Integración AgendaPro" para entender la trazabilidad futura.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rendimiento Temporal */}
        <section className="mb-8">
          <TimeSeriesChart data={timeSeriesData} />
        </section>

        {/* Análisis de Campañas */}
        <section className="mb-8">
          <CampaignsTable campaigns={campaignsData} />
        </section>

        {/* Programación de Anuncios - Por Día y Por Hora */}
        <section className="mb-8">
          <SimpleScheduleCharts dayData={dayOfWeekData} hourData={hourOfDayData} />
        </section>

        {/* NUEVO: Optimización de Presupuesto CON DATOS REALES DEL CSV */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border-l-4 border-amber-500">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                  💰 Optimización de Presupuesto: Pausas Estratégicas
                </h4>

                <p className="text-sm text-amber-900 mb-3">
                  Se analizó el <strong>rendimiento por día y hora</strong> durante Noviembre
                  (<strong>84 formularios totales</strong>) para identificar los momentos con
                  mejor y peor conversión, y optimizar la distribución del presupuesto mediante
                  <strong> ajustes de puja estratégicos</strong>.
                </p>

                {/* Tabla de Ajustes de Puja SIMPLIFICADA */}
                <div className="bg-white rounded-lg overflow-hidden border border-amber-200 mb-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-amber-100 border-b-2 border-amber-300">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-amber-900">
                            Día y Horario
                          </th>
                          <th className="px-4 py-3 text-center font-semibold text-amber-900">
                            Ajuste de Puja
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-amber-900">
                            Estrategia
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Mejores horarios - Aumentos de puja */}
                        <tr className="border-b hover:bg-green-50 bg-green-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Viernes 8PM-12AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <TrendingUp className="w-4 h-4" />
                              +50%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-emerald-700 font-semibold">
                              🔥 Horario Prime
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-green-50 bg-green-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Sábado 12AM-3AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <TrendingUp className="w-4 h-4" />
                              +40%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-emerald-700 font-semibold">
                              🔥 Peak Madrugada
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-green-50 bg-green-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Domingo 12AM-3AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <TrendingUp className="w-4 h-4" />
                              +35%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-emerald-700 font-semibold">
                              ⭐ Excelente
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-green-50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Viernes 11AM-4PM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <ArrowUp className="w-4 h-4" />
                              +25%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-blue-700 font-semibold">
                              ✅ Bueno
                            </span>
                          </td>
                        </tr>

                        {/* Horarios con reducción de puja */}
                        <tr className="border-b hover:bg-red-50 bg-red-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Martes 12AM-1AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <TrendingDown className="w-4 h-4" />
                              -50%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-red-700 font-semibold">
                              ❌ Muy bajo
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-red-50 bg-red-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Martes 6AM-12AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <ArrowDown className="w-4 h-4" />
                              -25%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-orange-700 font-semibold">
                              ⚠️ Reducido
                            </span>
                          </td>
                        </tr>

                        <tr className="border-b hover:bg-red-50 bg-red-50/50">
                          <td className="px-4 py-3 text-gray-900">
                            <span className="font-medium">Jueves 6AM-12AM</span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1.5 rounded-full text-sm font-bold">
                              <ArrowDown className="w-4 h-4" />
                              -20%
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-sm text-orange-700 font-semibold">
                              ⚠️ Reducido
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Insights del análisis */}
                <div className="grid md:grid-cols-2 gap-3 mb-3">
                  <div className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
                    <h5 className="font-semibold text-emerald-900 mb-1 text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      🔥 Horarios Peak (Aumentos de puja)
                    </h5>
                    <ul className="text-xs text-emerald-900 space-y-1 ml-4">
                      <li>• <strong>Viernes noche (8PM-12AM):</strong> +50% puja</li>
                      <li>• <strong>Sábado madrugada (12AM-3AM):</strong> +40% puja</li>
                      <li>• <strong>Domingo madrugada (12AM-3AM):</strong> +35% puja</li>
                      <li>• <strong>Viernes día (11AM-4PM):</strong> +25% puja</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-3 border-l-4 border-red-500">
                    <h5 className="font-semibold text-red-900 mb-1 text-sm flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      ⚠️ Horarios Bajos (Reducciones de puja)
                    </h5>
                    <ul className="text-xs text-red-900 space-y-1 ml-4">
                      <li>• <strong>Martes madrugada (12AM-1AM):</strong> -50% puja</li>
                      <li>• <strong>Martes día (6AM-12AM):</strong> -25% puja</li>
                      <li>• <strong>Jueves día (6AM-12AM):</strong> -20% puja</li>
                    </ul>
                  </div>
                </div>

                {/* Estrategia implementada */}
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border-2 border-blue-300">
                  <h5 className="font-semibold text-blue-900 mb-2 text-sm flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    🎯 Estrategia de Pujas por Día y Hora:
                  </h5>
                  <div className="grid md:grid-cols-3 gap-2 text-xs">
                    <div className="bg-white rounded p-2 border border-blue-200">
                      <div className="font-bold text-emerald-700 mb-1">🔥 Horarios Prime</div>
                      <div className="text-gray-800">
                        Viernes noche + Sábado/Domingo madrugada
                      </div>
                      <div className="text-emerald-600 font-semibold mt-1">
                        Pujas: +35% a +50%
                      </div>
                    </div>

                    <div className="bg-white rounded p-2 border border-blue-200">
                      <div className="font-bold text-blue-700 mb-1">✅ Horarios Buenos</div>
                      <div className="text-gray-800">
                        Viernes día + Sábado/Domingo día
                      </div>
                      <div className="text-blue-600 font-semibold mt-1">
                        Pujas: +10% a +25%
                      </div>
                    </div>

                    <div className="bg-white rounded p-2 border border-blue-200">
                      <div className="font-bold text-orange-700 mb-1">⚠️ Horarios Reducidos</div>
                      <div className="text-gray-800">
                        Martes y Jueves (todo el día)
                      </div>
                      <div className="text-orange-600 font-semibold mt-1">
                        Pujas: -20% a -50%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resultado esperado */}
                <div className="mt-3 flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-1">
                      ✅ Resultado de la Optimización:
                    </p>
                    <p className="text-sm text-green-800">
                      El presupuesto se concentra automáticamente en los momentos de mayor
                      conversión (Viernes noche, fines de semana) mediante ajustes de puja.
                      Los horarios de bajo rendimiento (Martes, Jueves madrugada) tienen pujas
                      reducidas para minimizar gasto ineficiente. Esto maximiza ROI sin cambiar
                      el presupuesto total mensual.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Análisis Demográfico */}
        <section className="mb-8">
          <DemographicCharts sexData={conversionesPorSexo} ageData={conversionesPorEdad} />
        </section>

        {/* Ubicación y Dispositivos */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <SimpleLocationCards data={locationsData} />
            </div>
            <div className="card">
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-bold text-textPrimary">
                  Por Dispositivo
                </h2>
              </div>
              <div className="space-y-4">
                {deviceData.map((device) => (
                  <div
                    key={device.device}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-textPrimary">
                        {device.device === 'Mobile' ? 'Móvil' : device.device === 'Desktop' ? 'Escritorio' : 'Tablet'}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {device.conversions}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-textMuted">CTR</p>
                        <p className="font-semibold text-textSecondary">
                          {formatPercentage(device.ctr, 2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-textMuted">Tasa Conv.</p>
                        <p className="font-semibold text-textSecondary">
                          {formatPercentage(device.conversionRate, 2)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{
                            width: `${(device.conversions / metrics.totalConversions) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Keywords y Términos de Búsqueda */}
        <section className="mb-8">
          <KeywordsTable keywords={keywordsData} searchTerms={searchTermsData} />
        </section>

        {/* Insights y Recomendaciones */}
        <section className="mb-8">
          <InsightsPanel insights={insights} />
        </section>

        {/* Navegación Rápida */}
        <section className="mb-8">
          <QuickNavigation currentTab="google-ads" onNavigate={onNavigate} />
        </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm text-textMuted pb-6">
        <p>Dashboard generado para Cavalera Tattoo & Piercing Studio</p>
        <p className="mt-1">Período: 1 - 30 de Noviembre 2025</p>
      </footer>
    </div>
  );
};

export default Dashboard;
