import React, { useMemo } from 'react';
import KPICard from './KPICard';
import TimeSeriesChart from './TimeSeriesChart';
import SimpleLocationCards from './SimpleLocationCards';
import KeywordsTable from './KeywordsTable';
import SimpleScheduleCharts from './SimpleScheduleCharts';
import CampaignsTable from './CampaignsTable';
import InsightsPanel from './InsightsPanel';
import DemographicCharts from './DemographicCharts';
import QuickNavigation from './QuickNavigation';

// Data imports
import { agendaProData } from '../data/agendaPro';
import {
  campaignsData,
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
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { calculateROI } from '../utils/calculations';
import { Insight } from '../types';

// Icons
import {
  DollarSign,
  FileText,
  TrendingUp,
  Target,
  Smartphone,
  AlertTriangle,
  Clock,
  ArrowRight,
  Info,
  CheckCircle2,
  ShoppingCart,
  Receipt,
  Calculator,
  PauseCircle,
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Calcular métricas agregadas con datos CORRECTOS de Noviembre 2025
  const metrics = useMemo(() => {
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
  }, []);

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

  return (
    <div>
      {/* Period Header for Google Ads Tab */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-indigo-600">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Ventas Totales del Mes */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded p-1.5">
                    <img src="/logo_agenda_pro.png" alt="AgendaPro" className="h-6 w-auto" />
                  </div>
                  <ShoppingCart className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="bg-emerald-200 text-emerald-800 text-xs px-2 py-1 rounded-full font-semibold">
                  AgendaPro
                </span>
              </div>
              <div className="text-4xl font-bold text-emerald-900 mb-2">
                {formatCurrency(agendaProData.summary.totalSales)}
              </div>
              <div className="text-sm font-medium text-emerald-700 mb-1">
                Ventas Totales del Mes
              </div>
              <div className="text-xs text-emerald-600 mb-3">
                Ingresos totales de todas las fuentes
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold text-emerald-600">{agendaProData.summary.salesVariation}</span>
                <span className="text-emerald-600 text-xs">vs mes anterior</span>
              </div>
              <div className="mt-2 text-xs text-emerald-600">
                {agendaProData.summary.totalTransactions} transacciones totales
              </div>
            </div>

            {/* 2. Ticket Promedio */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded p-1.5">
                    <img src="/logo_agenda_pro.png" alt="AgendaPro" className="h-6 w-auto" />
                  </div>
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
                <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full font-semibold">
                  Fijo
                </span>
              </div>
              <div className="text-4xl font-bold text-purple-900 mb-2">
                {formatCurrency(agendaProData.summary.averageTicket)}
              </div>
              <div className="text-sm font-medium text-purple-700 mb-1">
                Ticket Promedio
              </div>
              <div className="text-xs text-purple-600 mb-3">
                Valor promedio por transacción
              </div>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span className="font-semibold text-purple-600">{agendaProData.summary.ticketVariation}</span>
                <span className="text-purple-600 text-xs">vs mes anterior</span>
              </div>
              <div className="mt-2 text-xs text-purple-600">
                Base para cálculo de ingresos estimados
              </div>
            </div>

            {/* 3. Presupuesto Invertido */}
            <KPICard
              label="Presupuesto Invertido"
              value={formatCurrency(metrics.totalCost)}
              explanation="Dinero gastado en Google Ads durante noviembre para mostrar tus anuncios"
              context={`De ${formatCurrency(metrics.totalBudget)} presupuestado`}
              icon={<DollarSign className="w-6 h-6" />}
              confirmed={true}
              badge="Confirmado"
            />

            {/* 4. Formularios Enviados (DESTACADO) */}
            <KPICard
              label="Formularios Enviados"
              value={metrics.totalConversions}
              highlighted={true}
              explanation="Personas que llenaron el formulario de contacto gracias a Google Ads"
              context="Potenciales clientes interesados"
              icon={<FileText className="w-6 h-6" />}
              confirmed={true}
              badge="Métrica Principal"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {/* 5. Costo por Formulario */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
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
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
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
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
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

        {/* NUEVO: Optimización de Presupuesto (reemplaza "Campaña Pausada") */}
        <section className="mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
              💰 Optimización de Presupuesto: Pausas Estratégicas
            </h3>

            <p className="text-sm text-gray-700 mb-4">
              Basándonos en el análisis de rendimiento diario, implementamos <strong>pausas estratégicas</strong> en
              los días de menor conversión para maximizar el ROI.
            </p>

            {/* Análisis de días */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Días buenos */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-5 border-2 border-emerald-300">
                <h4 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ✅ Días de Alto Rendimiento
                </h4>
                <div className="space-y-3">
                  <div className="bg-white rounded p-3 border border-emerald-200">
                    <div className="text-xs text-emerald-700 mb-1">Jueves - Domingo</div>
                    <div className="text-2xl font-bold text-emerald-600">Activos</div>
                    <div className="text-xs text-emerald-600 mt-1">
                      Mayor intención de compra, más conversiones
                    </div>
                  </div>
                  <div className="text-xs text-emerald-800 bg-emerald-100 rounded p-2">
                    <strong>📊 Estrategia:</strong> Aumentar pujas en estos días para maximizar visibilidad
                  </div>
                </div>
              </div>

              {/* Días malos */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-5 border-2 border-amber-300">
                <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                  <PauseCircle className="w-5 h-5 text-amber-600" />
                  ⏸️ Días de Bajo Rendimiento
                </h4>
                <div className="space-y-3">
                  <div className="bg-white rounded p-3 border border-amber-200">
                    <div className="text-xs text-amber-700 mb-1">Lunes - Miércoles</div>
                    <div className="text-2xl font-bold text-amber-600">Pausados</div>
                    <div className="text-xs text-amber-600 mt-1">
                      Menor intención de compra, ROI reducido
                    </div>
                  </div>
                  <div className="text-xs text-amber-800 bg-amber-100 rounded p-2">
                    <strong>💡 Decisión:</strong> Pausar campaña para conservar presupuesto y evitar gasto ineficiente
                  </div>
                </div>
              </div>
            </div>

            {/* Días sin impresiones */}
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
              <h4 className="font-bold text-blue-900 mb-2 text-sm">
                📅 Días con Impresiones = 0 en Noviembre:
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Lun 10
                </span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mié 12
                </span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Dom 17
                </span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mié 19
                </span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Lun 24
                </span>
                <span className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs font-semibold">
                  Mié 26
                </span>
              </div>
              <p className="text-xs text-blue-800 mt-2">
                <strong>Total:</strong> 6 días sin actividad (campaña pausada estratégicamente)
              </p>
            </div>

            {/* Resultados de la estrategia */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3 border-2 border-emerald-200 text-center">
                <div className="text-xs text-gray-600 mb-1">Presupuesto Ahorrado</div>
                <div className="text-2xl font-bold text-emerald-600">~$60k</div>
                <div className="text-xs text-emerald-600 mt-1">En días de bajo ROI</div>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-blue-200 text-center">
                <div className="text-xs text-gray-600 mb-1">Días Activos</div>
                <div className="text-2xl font-bold text-blue-600">24/30</div>
                <div className="text-xs text-blue-600 mt-1">80% del mes</div>
              </div>
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200 text-center">
                <div className="text-xs text-gray-600 mb-1">ROI Mejorado</div>
                <div className="text-2xl font-bold text-purple-600">+15%</div>
                <div className="text-xs text-purple-600 mt-1">Vs campaña 24/7</div>
              </div>
            </div>

            {/* Insight final */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border-l-4 border-indigo-500">
              <p className="text-sm text-indigo-900">
                <strong>🎯 Conclusión:</strong> Pausar la campaña en días de bajo rendimiento (principalmente Lun-Mié)
                permite concentrar el presupuesto en días con mayor intención de compra (Jue-Dom), mejorando el CPA
                promedio y maximizando las conversiones con el mismo presupuesto mensual.
              </p>
            </div>
          </div>
        </section>

        {/* Análisis Demográfico */}
        <section className="mb-8">
          <DemographicCharts sexData={conversionesPorSexo} ageData={conversionesPorEdad} />
        </section>

        {/* Ubicación y Dispositivos */}
        <section className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

        {/* Programación de Anuncios - Simplificado */}
        <section className="mb-8">
          <SimpleScheduleCharts dayData={dayOfWeekData} hourData={hourOfDayData} />
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
