import React, { useMemo } from 'react';
import KPICard from './KPICard';
import TimeSeriesChart from './TimeSeriesChart';
import LocationChart from './LocationChart';
import KeywordsTable from './KeywordsTable';
import ScheduleHeatmap from './ScheduleHeatmap';
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
  scheduleData,
  deviceData,
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
    const bestDay = scheduleData
      .reduce((acc, curr) => {
        const existing = acc.find(a => a.day === curr.dayOfWeek);
        if (existing) {
          existing.conversions += curr.conversions;
        } else {
          acc.push({ day: curr.dayOfWeek, conversions: curr.conversions });
        }
        return acc;
      }, [] as { day: string; conversions: number }[])
      .sort((a, b) => b.conversions - a.conversions)[0];

    const bestHourData = scheduleData
      .reduce((acc, curr) => {
        const existing = acc.find(a => a.hour === curr.hour);
        if (existing) {
          existing.conversions += curr.conversions;
        } else {
          acc.push({ hour: curr.hour, conversions: curr.conversions });
        }
        return acc;
      }, [] as { hour: number; conversions: number }[])
      .sort((a, b) => b.conversions - a.conversions)[0];

    const bestLocation = locationsData.sort((a, b) => b.conversions - a.conversions)[0];
    const bestCampaign = campaignsData.sort((a, b) => b.conversions - a.conversions)[0];
    const bestDevice = deviceData.sort((a, b) => b.conversions - a.conversions)[0];

    const dayNames: Record<string, string> = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    };

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
        description: `${dayNames[bestDay.day]} es el día con mejor rendimiento, generando ${bestDay.conversions} conversiones. Considera aumentar las pujas en este día.`,
        metric: `${dayNames[bestDay.day]}: ${bestDay.conversions} conversiones`,
      },
      {
        type: 'info',
        title: 'Mejor Horario para Anuncios',
        description: `Las ${bestHourData.hour}:00 hrs es el horario más efectivo con ${bestHourData.conversions} conversiones. Optimiza la programación en esta franja horaria.`,
        metric: `${bestHourData.hour}:00 hrs: ${bestHourData.conversions} conversiones`,
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
            <KPICard
              label="Presupuesto Invertido"
              value={formatCurrency(metrics.totalCost)}
              context={`De ${formatCurrency(metrics.totalBudget)} presupuestado`}
              icon={<DollarSign className="w-6 h-6" />}
              confirmed={true}
              badge="Confirmado"
            />
            <KPICard
              label="Formularios Enviados"
              value={metrics.totalConversions}
              highlighted={true}
              context="Conversiones form_submit de Google Ads"
              icon={<FileText className="w-6 h-6" />}
              confirmed={true}
              badge="Métrica Principal"
            />
            <KPICard
              label="Costo por Formulario"
              value={formatCurrency(metrics.costPerForm)}
              context="CPA promedio de las campañas"
              icon={<TrendingUp className="w-6 h-6" />}
              confirmed={true}
            />
            <KPICard
              label="Ingresos Estimados Google Ads"
              value={formatCurrency(metrics.attributableSales)}
              context={`${metrics.totalConversions} formularios × ${formatCurrency(agendaProData.summary.averageTicket)}`}
              icon={<TrendingUp className="w-6 h-6" />}
              warning={true}
              badge="Estimación"
              isEstimated={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <KPICard
              label="Ventas Totales del Mes"
              value={formatCurrency(agendaProData.summary.totalSales)}
              variation={agendaProData.summary.salesVariation}
              context="Todas las fuentes - Dato AgendaPro"
              icon={<DollarSign className="w-6 h-6" />}
              confirmed={true}
              badge="Confirmado"
            />
            <KPICard
              label="ROI Estimado Google Ads"
              value={`${metrics.roi.toFixed(0)}%`}
              context="Retorno estimado sobre inversión"
              icon={<TrendingUp className="w-6 h-6" />}
              warning={true}
              badge="Proyección"
              isEstimated={true}
            />
            <KPICard
              label="Ticket Promedio"
              value={formatCurrency(agendaProData.summary.averageTicket)}
              variation={agendaProData.summary.ticketVariation}
              context="Valor promedio por venta - AgendaPro"
              icon={<DollarSign className="w-6 h-6" />}
              confirmed={true}
              badge="Dato Histórico"
            />
          </div>
        </section>

        {/* Disclaimer de Ingresos Estimados */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                  ⚠️ Importante: Sobre los Ingresos Estimados de Google Ads
                </h3>

                <div className="bg-white/60 rounded-lg p-4 mb-4">
                  <p className="text-amber-900 font-semibold mb-2">
                    Los ingresos estimados de <span className="text-2xl text-amber-700">{formatCurrency(metrics.attributableSales)}</span> son una <strong>proyección calculada</strong>, no un ingreso confirmado.
                  </p>
                  <p className="text-amber-800 text-sm">
                    Calculado como: <span className="font-mono bg-amber-100 px-2 py-1 rounded">{metrics.totalConversions} formularios × {formatCurrency(agendaProData.summary.averageTicket)} ticket promedio = {formatCurrency(metrics.attributableSales)}</span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Proceso de Conversión (Formulario → Venta):
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full font-medium">
                        1. Formulario
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600" />
                      <span className="bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full font-medium">
                        2. Email/WhatsApp
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600" />
                      <span className="bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full font-medium">
                        3. Consulta
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600" />
                      <span className="bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full font-medium">
                        4. Cotización
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600" />
                      <span className="bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full font-medium">
                        5. Agendamiento
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600" />
                      <span className="bg-emerald-300 text-emerald-900 px-3 py-1.5 rounded-full font-medium">
                        6. Pago Final ✓
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/60 rounded p-3">
                      <h5 className="font-semibold text-amber-900 text-sm mb-2">📊 Supuestos de la Estimación:</h5>
                      <ul className="text-amber-800 text-sm space-y-1">
                        <li>• Ticket promedio: {formatCurrency(agendaProData.summary.averageTicket)} (histórico AgendaPro)</li>
                        <li>• Tasa de conversión: No confirmada</li>
                        <li>• Tiempo del proceso: Variable (días a semanas)</li>
                      </ul>
                    </div>

                    <div className="bg-white/60 rounded p-3">
                      <h5 className="font-semibold text-amber-900 text-sm mb-2">⚠️ Factores de Incertidumbre:</h5>
                      <ul className="text-amber-800 text-sm space-y-1">
                        <li>• Cliente puede desistir en cualquier etapa</li>
                        <li>• No todos los formularios se convierten en venta</li>
                        <li>• El valor final puede variar del ticket promedio</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-blue-900 text-sm font-medium flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      Para obtener el <strong>ROI real confirmado</strong>, se necesita hacer seguimiento de cuántos de los {metrics.totalConversions} formularios
                      se convirtieron efectivamente en ventas confirmadas y sus montos reales. Esta cifra de {formatCurrency(metrics.attributableSales)}
                      es una <strong>proyección para análisis estratégico</strong>, no un resultado garantizado.
                    </span>
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 text-amber-800 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    <strong>Dato confirmado:</strong> {metrics.totalConversions} formularios recibidos de Google Ads en noviembre
                  </span>
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
              <LocationChart data={locationsData} />
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

        {/* Programación de Anuncios */}
        <section className="mb-8">
          <ScheduleHeatmap data={scheduleData} />
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
