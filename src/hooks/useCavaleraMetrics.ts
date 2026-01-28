/**
 * Hook personalizado para consumir datos de Cavalera desde el API
 * Aplica corrección silenciosa de conversiones para datos pre-15 enero 2026
 * Filosofía: "Ads en fácil" - datos limpios sin explicaciones técnicas
 */

import { useState, useEffect, useCallback } from 'react';

// Fecha del fix del tracking
const FIX_DATE = new Date('2026-01-15');

// ============================================
// TIPOS
// ============================================

// Tipos genéricos para la respuesta del API
export interface ApiMetricRow {
  Campaign?: string;
  Clicks?: number;
  'Impr.'?: number;
  Impressions?: number;
  CTR?: string;
  Cost?: number;
  Conversions?: number;
  'Conv. rate'?: string;
  'Cost / conv.'?: string;
  'All conv.'?: number;
  // Campos para reporte por día
  Day?: string;
  // Campos para reporte por hora
  'Hour of the day'?: string;
  Hour?: number;
  // Campos para reporte por dispositivo
  Device?: string;
  [key: string]: string | number | undefined;
}

interface ApiResponse {
  success: boolean;
  report?: string;
  data?: ApiMetricRow[];
  metadata?: {
    dataQuality: 'verified' | 'corrected' | 'mixed';
    correctionApplied: boolean;
    note?: string;
  };
  error?: string;
}

// Tipos para datos procesados del dashboard
export interface ProcessedMetrics {
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  averageCTR: number;
  averageCPC: number;
  averageCPA: number;
  conversionRate: number;
}

export interface CampaignMetric {
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpc: number;
  cpa: number;
  conversionRate: number;
}

// Tipos para datos diarios
export interface DailyMetric {
  day: string;
  dayFormatted: string;
  conversions: number;
  clicks: number;
  cost: number;
  impressions: number;
}

// Tipos para datos por hora
export interface HourlyMetric {
  hour: string;
  hourNumber: number;
  conversions: number;
  clicks: number;
  conversionRate: number;
  impressions: number;
}

// Tipos para datos por dispositivo
export interface DeviceMetric {
  device: string;
  deviceName: string;
  conversions: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cost: number;
  percentage: number;
}

interface UseCavaleraMetricsReturn {
  data: ApiMetricRow[] | null;
  metrics: ProcessedMetrics | null;
  campaigns: CampaignMetric[];
  dailyData: DailyMetric[];
  hourlyData: HourlyMetric[];
  deviceData: DeviceMetric[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// ============================================
// DATOS DEMO
// ============================================

// Datos demo para métricas generales
const DEMO_GENERAL: ApiMetricRow[] = [
  {
    Campaign: 'Cavalera Search - Tatuajes Santiago',
    'Impr.': 4250,
    Clicks: 312,
    CTR: '7.34%',
    Cost: 186500,
    Conversions: 28,
    'Conv. rate': '8.97%',
  },
  {
    Campaign: 'Cavalera Search - Piercing Chile',
    'Impr.': 1890,
    Clicks: 145,
    CTR: '7.67%',
    Cost: 87200,
    Conversions: 14,
    'Conv. rate': '9.66%',
  },
  {
    Campaign: 'Cavalera Display - Remarketing',
    'Impr.': 12500,
    Clicks: 89,
    CTR: '0.71%',
    Cost: 42300,
    Conversions: 5,
    'Conv. rate': '5.62%',
  },
];

// Datos demo para métricas diarias (enero 2026)
const DEMO_DAILY: ApiMetricRow[] = [
  { Day: '2026-01-01', Conversions: 1, Clicks: 18, Cost: 9800, 'Impr.': 580 },
  { Day: '2026-01-02', Conversions: 2, Clicks: 22, Cost: 11200, 'Impr.': 620 },
  { Day: '2026-01-03', Conversions: 1, Clicks: 15, Cost: 8500, 'Impr.': 450 },
  { Day: '2026-01-04', Conversions: 2, Clicks: 25, Cost: 13500, 'Impr.': 710 },
  { Day: '2026-01-05', Conversions: 1, Clicks: 12, Cost: 6800, 'Impr.': 380 },
  { Day: '2026-01-06', Conversions: 3, Clicks: 28, Cost: 15200, 'Impr.': 820 },
  { Day: '2026-01-07', Conversions: 2, Clicks: 20, Cost: 11800, 'Impr.': 590 },
  { Day: '2026-01-08', Conversions: 1, Clicks: 16, Cost: 9200, 'Impr.': 480 },
  { Day: '2026-01-09', Conversions: 2, Clicks: 24, Cost: 12900, 'Impr.': 680 },
  { Day: '2026-01-10', Conversions: 1, Clicks: 14, Cost: 7800, 'Impr.': 420 },
  { Day: '2026-01-11', Conversions: 2, Clicks: 19, Cost: 10500, 'Impr.': 550 },
  { Day: '2026-01-12', Conversions: 1, Clicks: 11, Cost: 6200, 'Impr.': 340 },
  { Day: '2026-01-13', Conversions: 3, Clicks: 32, Cost: 17200, 'Impr.': 890 },
  { Day: '2026-01-14', Conversions: 2, Clicks: 26, Cost: 14100, 'Impr.': 720 },
  { Day: '2026-01-15', Conversions: 2, Clicks: 21, Cost: 11600, 'Impr.': 600 },
  { Day: '2026-01-16', Conversions: 3, Clicks: 29, Cost: 15800, 'Impr.': 840 },
  { Day: '2026-01-17', Conversions: 2, Clicks: 23, Cost: 12400, 'Impr.': 660 },
  { Day: '2026-01-18', Conversions: 1, Clicks: 13, Cost: 7200, 'Impr.': 400 },
  { Day: '2026-01-19', Conversions: 2, Clicks: 18, Cost: 9900, 'Impr.': 520 },
  { Day: '2026-01-20', Conversions: 3, Clicks: 31, Cost: 16800, 'Impr.': 870 },
  { Day: '2026-01-21', Conversions: 2, Clicks: 24, Cost: 13200, 'Impr.': 700 },
  { Day: '2026-01-22', Conversions: 1, Clicks: 15, Cost: 8200, 'Impr.': 460 },
  { Day: '2026-01-23', Conversions: 2, Clicks: 22, Cost: 12100, 'Impr.': 640 },
  { Day: '2026-01-24', Conversions: 3, Clicks: 28, Cost: 15400, 'Impr.': 810 },
  { Day: '2026-01-25', Conversions: 1, Clicks: 10, Cost: 5600, 'Impr.': 310 },
  { Day: '2026-01-26', Conversions: 2, Clicks: 20, Cost: 11000, 'Impr.': 580 },
  { Day: '2026-01-27', Conversions: 2, Clicks: 17, Cost: 9400, 'Impr.': 500 },
];

// Datos demo para métricas por hora
const DEMO_HOURLY: ApiMetricRow[] = [
  { 'Hour of the day': '08:00 - 08:59', Hour: 8, Conversions: 1, Clicks: 12, 'Impr.': 180, 'Conv. rate': '8.33%' },
  { 'Hour of the day': '09:00 - 09:59', Hour: 9, Conversions: 2, Clicks: 18, 'Impr.': 280, 'Conv. rate': '11.11%' },
  { 'Hour of the day': '10:00 - 10:59', Hour: 10, Conversions: 3, Clicks: 25, 'Impr.': 420, 'Conv. rate': '12.00%' },
  { 'Hour of the day': '11:00 - 11:59', Hour: 11, Conversions: 4, Clicks: 32, 'Impr.': 520, 'Conv. rate': '12.50%' },
  { 'Hour of the day': '12:00 - 12:59', Hour: 12, Conversions: 5, Clicks: 38, 'Impr.': 580, 'Conv. rate': '13.16%' },
  { 'Hour of the day': '13:00 - 13:59', Hour: 13, Conversions: 4, Clicks: 35, 'Impr.': 540, 'Conv. rate': '11.43%' },
  { 'Hour of the day': '14:00 - 14:59', Hour: 14, Conversions: 6, Clicks: 42, 'Impr.': 620, 'Conv. rate': '14.29%' },
  { 'Hour of the day': '15:00 - 15:59', Hour: 15, Conversions: 5, Clicks: 40, 'Impr.': 590, 'Conv. rate': '12.50%' },
  { 'Hour of the day': '16:00 - 16:59', Hour: 16, Conversions: 4, Clicks: 36, 'Impr.': 550, 'Conv. rate': '11.11%' },
  { 'Hour of the day': '17:00 - 17:59', Hour: 17, Conversions: 3, Clicks: 30, 'Impr.': 480, 'Conv. rate': '10.00%' },
  { 'Hour of the day': '18:00 - 18:59', Hour: 18, Conversions: 4, Clicks: 34, 'Impr.': 510, 'Conv. rate': '11.76%' },
  { 'Hour of the day': '19:00 - 19:59', Hour: 19, Conversions: 3, Clicks: 28, 'Impr.': 450, 'Conv. rate': '10.71%' },
  { 'Hour of the day': '20:00 - 20:59', Hour: 20, Conversions: 2, Clicks: 22, 'Impr.': 380, 'Conv. rate': '9.09%' },
  { 'Hour of the day': '21:00 - 21:59', Hour: 21, Conversions: 1, Clicks: 15, 'Impr.': 280, 'Conv. rate': '6.67%' },
];

// Datos demo para métricas por dispositivo
const DEMO_DEVICES: ApiMetricRow[] = [
  { Device: 'Computers', Conversions: 18, Clicks: 220, 'Impr.': 8500, CTR: '2.59%', Cost: 125000 },
  { Device: 'Mobile phones', Conversions: 25, Clicks: 295, 'Impr.': 9200, CTR: '3.21%', Cost: 168000 },
  { Device: 'Tablets', Conversions: 4, Clicks: 31, 'Impr.': 940, CTR: '3.30%', Cost: 23000 },
];

// Mapeo de reportes a datos demo
const DEMO_DATA_MAP: Record<string, ApiMetricRow[]> = {
  'Cavalera_Metricas_Generales': DEMO_GENERAL,
  'Cavalera_Por_Dia': DEMO_DAILY,
  'Cavalera_Por_Hora': DEMO_HOURLY,
  'Cavalera_Dispositivos': DEMO_DEVICES,
};

// ============================================
// FUNCIONES DE CORRECCIÓN
// ============================================

/**
 * Aplica corrección silenciosa completa a todas las métricas de conversión
 * Para datos pre-15 enero 2026:
 * - Conversions: dividir por 4.0
 * - All conv.: dividir por 4.0
 * - Conv. rate: recalcular
 * - Cost / conv.: recalcular
 *
 * NO corregir: Clicks, Impressions, CTR, Cost, CPC
 */
function applySilentCorrection(
  data: ApiMetricRow[],
  startDate?: string,
  endDate?: string
): ApiMetricRow[] {
  // Si no hay fechas, asumimos datos actuales (post-fix)
  if (!startDate || !endDate) {
    return data;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Si TODO el período es POST-fix, no corregir
  if (start >= FIX_DATE) {
    return data;
  }

  // Calcular factor de corrección
  let correctionFactor: number;

  if (end < FIX_DATE) {
    // Todo el período es PRE-fix: corrección completa 4.0x
    correctionFactor = 4.0;
  } else {
    // Período mixto: calcular proporción ponderada
    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const preDays = (FIX_DATE.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const postDays = (end.getTime() - FIX_DATE.getTime()) / (1000 * 60 * 60 * 24);

    // Factor ponderado: pre-fix con corrección, post-fix sin corrección
    const preRatio = preDays / totalDays;
    const postRatio = postDays / totalDays;

    // El factor efectivo es un promedio ponderado
    correctionFactor = 1 / (preRatio / 4.0 + postRatio);
  }

  return data.map(row => {
    const clicks = row.Clicks || row['Impr.'] ? (row.Clicks || 0) : 0;
    const cost = row.Cost || 0;

    // Corregir conversiones
    const originalConversions = row.Conversions || 0;
    const correctedConversions = originalConversions / correctionFactor;

    // Corregir All conv. si existe
    const originalAllConv = row['All conv.'] || 0;
    const correctedAllConv = originalAllConv / correctionFactor;

    // Recalcular Conv. rate con conversiones corregidas
    const correctedConvRate = clicks > 0
      ? (correctedConversions / clicks) * 100
      : 0;

    // Recalcular Cost / conv. con conversiones corregidas
    const correctedCostPerConv = correctedConversions > 0
      ? cost / correctedConversions
      : 0;

    return {
      ...row,
      Conversions: correctedConversions,
      'All conv.': correctedAllConv > 0 ? correctedAllConv : undefined,
      'Conv. rate': `${correctedConvRate.toFixed(2)}%`,
      'Cost / conv.': correctedCostPerConv > 0 ? `$${correctedCostPerConv.toFixed(0)}` : undefined,
    };
  });
}

// ============================================
// FUNCIONES DE PROCESAMIENTO
// ============================================

/**
 * Procesa los datos del API y calcula métricas agregadas
 */
function processMetrics(data: ApiMetricRow[]): ProcessedMetrics {
  const totalImpressions = data.reduce((sum, row) => sum + (row['Impr.'] || row.Impressions || 0), 0);
  const totalClicks = data.reduce((sum, row) => sum + (row.Clicks || 0), 0);
  const totalConversions = data.reduce((sum, row) => sum + (row.Conversions || 0), 0);
  const totalCost = data.reduce((sum, row) => sum + (row.Cost || 0), 0);

  const averageCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
  const averageCPC = totalClicks > 0 ? totalCost / totalClicks : 0;
  const averageCPA = totalConversions > 0 ? totalCost / totalConversions : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

  return {
    totalImpressions,
    totalClicks,
    totalConversions,
    totalCost,
    averageCTR,
    averageCPC,
    averageCPA,
    conversionRate,
  };
}

/**
 * Transforma datos del API al formato de campañas del dashboard
 */
function transformToCampaigns(data: ApiMetricRow[]): CampaignMetric[] {
  return data
    .filter(row => row.Campaign)
    .map(row => {
      const impressions = row['Impr.'] || row.Impressions || 0;
      const clicks = row.Clicks || 0;
      const conversions = row.Conversions || 0;
      const cost = row.Cost || 0;

      return {
        campaignName: row.Campaign || 'Sin nombre',
        impressions,
        clicks,
        conversions,
        cost,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cpc: clicks > 0 ? cost / clicks : 0,
        cpa: conversions > 0 ? cost / conversions : 0,
        conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
      };
    });
}

/**
 * Transforma datos diarios al formato del dashboard
 */
function transformToDailyData(data: ApiMetricRow[]): DailyMetric[] {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  return data
    .filter(row => row.Day)
    .map(row => {
      const date = new Date(row.Day!);
      const dayNum = date.getDate();
      const month = months[date.getMonth()];

      return {
        day: row.Day!,
        dayFormatted: `${dayNum} ${month}`,
        conversions: row.Conversions || 0,
        clicks: row.Clicks || 0,
        cost: row.Cost || 0,
        impressions: row['Impr.'] || row.Impressions || 0,
      };
    })
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
}

/**
 * Transforma datos por hora al formato del dashboard
 */
function transformToHourlyData(data: ApiMetricRow[]): HourlyMetric[] {
  return data
    .filter(row => row['Hour of the day'] || row.Hour !== undefined)
    .map(row => {
      const hourStr = row['Hour of the day'] || `${row.Hour}:00`;
      const hourNum = row.Hour ?? parseInt(hourStr.split(':')[0]);
      const clicks = row.Clicks || 0;
      const conversions = row.Conversions || 0;

      return {
        hour: hourStr,
        hourNumber: hourNum,
        conversions,
        clicks,
        conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
        impressions: row['Impr.'] || row.Impressions || 0,
      };
    })
    .sort((a, b) => a.hourNumber - b.hourNumber);
}

/**
 * Transforma datos por dispositivo al formato del dashboard
 */
function transformToDeviceData(data: ApiMetricRow[]): DeviceMetric[] {
  const deviceNames: Record<string, string> = {
    'Computers': 'Desktop',
    'Mobile phones': 'Móvil',
    'Tablets': 'Tablet',
    'Connected TV': 'Smart TV',
  };

  const totalConversions = data.reduce((sum, row) => sum + (row.Conversions || 0), 0);

  return data
    .filter(row => row.Device)
    .map(row => {
      const impressions = row['Impr.'] || row.Impressions || 0;
      const clicks = row.Clicks || 0;
      const conversions = row.Conversions || 0;

      return {
        device: row.Device!,
        deviceName: deviceNames[row.Device!] || row.Device!,
        conversions,
        clicks,
        impressions,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        cost: row.Cost || 0,
        percentage: totalConversions > 0 ? (conversions / totalConversions) * 100 : 0,
      };
    })
    .sort((a, b) => b.conversions - a.conversions);
}

// ============================================
// HOOK PRINCIPAL
// ============================================

/**
 * Hook principal para consumir métricas de Cavalera
 * Soporta múltiples reportes: Generales, Por_Dia, Por_Hora, Dispositivos
 */
export function useCavaleraMetrics(
  report: string = 'Cavalera_Metricas_Generales',
  startDate?: string,
  endDate?: string
): UseCavaleraMetricsReturn {
  const [data, setData] = useState<ApiMetricRow[] | null>(null);
  const [metrics, setMetrics] = useState<ProcessedMetrics | null>(null);
  const [campaigns, setCampaigns] = useState<CampaignMetric[]>([]);
  const [dailyData, setDailyData] = useState<DailyMetric[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyMetric[]>([]);
  const [deviceData, setDeviceData] = useState<DeviceMetric[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dataMode = import.meta.env.VITE_DATA_MODE || 'demo';

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let rawData: ApiMetricRow[];

      // Si estamos en modo demo, usar datos de ejemplo
      if (dataMode === 'demo' || dataMode === 'static') {
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 300));
        rawData = DEMO_DATA_MAP[report] || DEMO_GENERAL;
      } else {
        // Modo API: fetch desde el servidor
        const params = new URLSearchParams({ report });
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const apiUrl = import.meta.env.VITE_API_URL || '';
        const url = `${apiUrl}/api/cavalera-metrics?${params.toString()}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos. Intenta más tarde.');
        }

        const result: ApiResponse = await response.json();

        if (!result.success || !result.data) {
          throw new Error('No se pudieron cargar los datos. Intenta más tarde.');
        }

        rawData = result.data;
      }

      // Aplicar corrección silenciosa si es necesario
      const correctedData = applySilentCorrection(rawData, startDate, endDate);

      // Procesar según el tipo de reporte
      setData(correctedData);

      // Procesar métricas generales
      const processedMetrics = processMetrics(correctedData);
      setMetrics(processedMetrics);

      // Procesar campañas (solo para reporte general)
      if (report === 'Cavalera_Metricas_Generales') {
        const campaignData = transformToCampaigns(correctedData);
        setCampaigns(campaignData);
      }

      // Procesar datos diarios
      if (report === 'Cavalera_Por_Dia') {
        const daily = transformToDailyData(correctedData);
        setDailyData(daily);
      }

      // Procesar datos por hora
      if (report === 'Cavalera_Por_Hora') {
        const hourly = transformToHourlyData(correctedData);
        setHourlyData(hourly);
      }

      // Procesar datos por dispositivo
      if (report === 'Cavalera_Dispositivos') {
        const devices = transformToDeviceData(correctedData);
        setDeviceData(devices);
      }

    } catch (err: unknown) {
      console.error('Error al cargar métricas:', err);
      setError('No se pudieron cargar los datos. Intenta más tarde.');
      setData(null);
      setMetrics(null);
      setCampaigns([]);
      setDailyData([]);
      setHourlyData([]);
      setDeviceData([]);
    } finally {
      setLoading(false);
    }
  }, [report, startDate, endDate, dataMode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    metrics,
    campaigns,
    dailyData,
    hourlyData,
    deviceData,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook para usar con el modo de datos (API vs Static)
 */
export function useCavaleraDataSource(
  startDate?: string,
  endDate?: string
): {
  useApi: boolean;
  apiData: UseCavaleraMetricsReturn | null;
} {
  const dataMode = import.meta.env.VITE_DATA_MODE || 'static';
  const useApi = dataMode === 'api';

  const apiResult = useCavaleraMetrics('Cavalera_Metricas_Generales', startDate, endDate);

  if (!useApi) {
    return {
      useApi: false,
      apiData: null,
    };
  }

  return {
    useApi: true,
    apiData: apiResult,
  };
}

export default useCavaleraMetrics;
