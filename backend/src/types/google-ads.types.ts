/**
 * Tipos para datos de Google Ads API
 * Compatible con el dashboard frontend de Cavalera
 */

export interface CampaignData {
  campaignName: string;
  status: 'Active' | 'Paused' | 'Removed';
  budget: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpc: number;
  cpa: number;
  conversionRate: number;
}

export interface TimeSeriesData {
  date: string; // Formato: YYYY-MM-DD
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
}

export interface KeywordData {
  keyword: string;
  matchType: 'Broad' | 'Phrase' | 'Exact';
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpa: number;
  qualityScore: number;
}

export interface SearchTermData {
  searchTerm: string;
  triggeredKeyword: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  conversionRate: number;
  isBrand?: boolean;
  isAiMax?: boolean;
}

export interface LocationData {
  location: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpa: number;
}

export interface DeviceData {
  device: 'Mobile' | 'Desktop' | 'Tablet';
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  conversionRate: number;
}

export interface DayOfWeekData {
  day: string;
  dayShort: string;
  conversions: number;
  clicks: number;
  cost: number;
}

export interface HourOfDayData {
  hour: string;
  conversions: number;
  clicks: number;
  cost: number;
}

export interface DemographicBySex {
  sexo: 'Hombre' | 'Mujer' | 'Desconocido';
  conversiones: number;
  cpa: number;
  ctr: number;
}

export interface DemographicByAge {
  edad: string;
  conversiones: number;
  cpa: number;
  ctr: number;
}

export interface ScheduleData {
  dayOfWeek: string;
  hour: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

/**
 * Estructura completa de datos mensuales
 */
export interface GoogleAdsMonthlyData {
  period: {
    startDate: string;
    endDate: string;
    month: number;
    year: number;
  };
  campaigns: CampaignData[];
  timeSeries: TimeSeriesData[];
  keywords: KeywordData[];
  searchTerms: SearchTermData[];
  locations: LocationData[];
  devices: DeviceData[];
  dayOfWeek: DayOfWeekData[];
  hourOfDay: HourOfDayData[];
  schedule: ScheduleData[];
  demographics: {
    bySex: DemographicBySex[];
    byAge: DemographicByAge[];
  };
  summary: {
    totalImpressions: number;
    totalClicks: number;
    totalConversions: number;
    totalCost: number;
    totalBudget: number;
    averageCTR: number;
    averageCPC: number;
    averageCPA: number;
  };
}

/**
 * Configuración de Google Ads API
 */
export interface GoogleAdsConfig {
  developerToken: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  customerId: string;
  loginCustomerId?: string;
}

/**
 * Respuesta de la API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
