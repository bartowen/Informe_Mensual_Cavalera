import React, { useMemo } from 'react';
import Header from './Header';
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
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Header */}
        <Header />

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
            />
            <KPICard
              label="Formularios Enviados"
              value={metrics.totalConversions}
              highlighted={true}
              context="Conversiones de Google Ads"
              icon={<FileText className="w-6 h-6" />}
            />
            <KPICard
              label="Costo por Formulario"
              value={formatCurrency(metrics.costPerForm)}
              context="CPA promedio de las campañas"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <KPICard
              label="Ventas de Google Ads"
              value={formatCurrency(metrics.attributableSales)}
              context={`${metrics.totalConversions} formularios × ${formatCurrency(agendaProData.summary.averageTicket)}`}
              icon={<TrendingUp className="w-6 h-6" />}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <KPICard
              label="Ventas Totales (AgendaPro)"
              value={formatCurrency(agendaProData.summary.totalSales)}
              variation={agendaProData.summary.salesVariation}
              context="Todas las fuentes de venta"
              icon={<DollarSign className="w-6 h-6" />}
            />
            <KPICard
              label="ROI de Google Ads"
              value={`${metrics.roi.toFixed(0)}%`}
              context="Retorno sobre inversión publicitaria"
              icon={<TrendingUp className="w-6 h-6" />}
            />
            <KPICard
              label="Ticket Promedio"
              value={formatCurrency(agendaProData.summary.averageTicket)}
              variation={agendaProData.summary.ticketVariation}
              context="Valor promedio por venta (fijo)"
              icon={<DollarSign className="w-6 h-6" />}
            />
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
    </div>
  );
};

export default Dashboard;
