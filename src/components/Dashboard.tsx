import React, { useMemo } from 'react';
import KPICard from './KPICard';
import TimeSeriesChart from './TimeSeriesChart';
import SimpleLocationCards from './SimpleLocationCards';
import KeywordsTable from './KeywordsTable';
import SimpleScheduleCharts from './SimpleScheduleCharts';
import SalesPanel from './SalesPanel';
import CampaignsTable from './CampaignsTable';
import InsightsPanel from './InsightsPanel';

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
} from 'lucide-react';

const Dashboard: React.FC = () => {
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

  // Generar insights automáticos
  const insights: Insight[] = useMemo(() => {
    const bestDay = [...dayOfWeekData].sort((a, b) => b.conversions - a.conversions)[0];
    const bestHourData = [...hourOfDayData].sort((a, b) => b.conversions - a.conversions)[0];

    const bestLocation = locationsData.sort((a, b) => b.conversions - a.conversions)[0];
    const bestCampaign = campaignsData.sort((a, b) => b.conversions - a.conversions)[0];
    const bestDevice = deviceData.sort((a, b) => b.conversions - a.conversions)[0];

    return [
      {
        type: 'success',
        title: 'ROI Positivo Destacado',
        description: `La inversión de ${formatCurrency(metrics.totalCost)} generó un ROI de ${formatPercentage(metrics.roi)}. Ventas atribuibles a Google Ads: ${formatCurrency(metrics.attributableSales)} (${metrics.totalConversions} formularios × ticket promedio).`,
        metric: `ROI: ${formatPercentage(metrics.roi)}`,
      },
      {
        type: 'success',
        title: 'Mejor Día de la Semana',
        description: `${bestDay.day} es el día con mejor rendimiento, generando ${bestDay.conversions} conversiones. Considera aumentar las pujas en este día.`,
        metric: `${bestDay.day}: ${bestDay.conversions} conversiones`,
      },
      {
        type: 'info',
        title: 'Mejor Horario para Anuncios',
        description: `Las ${bestHourData.hour} hrs es el horario más efectivo con ${bestHourData.conversions} conversiones. Optimiza la programación en esta franja horaria.`,
        metric: `${bestHourData.hour} hrs: ${bestHourData.conversions} conversiones`,
      },
      {
        type: 'success',
        title: 'Comuna con Mayor ROI',
        description: `${bestLocation.location} lidera en conversiones con ${bestLocation.conversions} formularios y un CPA de ${formatCurrency(bestLocation.cpa)}. Considera segmentar más presupuesto a esta zona.`,
        metric: `${bestLocation.location}: ${bestLocation.conversions} conv.`,
      },
      {
        type: 'info',
        title: 'Campaña Destacada',
        description: `"${bestCampaign.campaignName}" es la campaña con mejor rendimiento, generando ${bestCampaign.conversions} conversiones con una tasa de conversión de ${formatPercentage(bestCampaign.conversionRate)}.`,
        metric: `${bestCampaign.conversions} conversiones`,
      },
      {
        type: 'info',
        title: 'Dispositivo Predominante',
        description: `${bestDevice.device === 'Mobile' ? 'Móvil' : bestDevice.device === 'Desktop' ? 'Escritorio' : 'Tablet'} genera ${bestDevice.conversions} conversiones (${formatPercentage(bestDevice.conversionRate)} tasa de conversión). Asegura que la experiencia sea óptima en este dispositivo.`,
        metric: `${bestDevice.device}: ${bestDevice.conversions} conv.`,
      },
    ];
  }, [metrics]);

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

        {/* Panel de Ventas AgendaPro */}
        <section className="mb-8">
          <SalesPanel data={agendaProData} totalForms={metrics.totalConversions} />
        </section>

        {/* Insights y Recomendaciones */}
        <section className="mb-8">
          <InsightsPanel insights={insights} />
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
