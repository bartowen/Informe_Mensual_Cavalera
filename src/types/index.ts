// Google Ads Data Types
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
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
}

export interface AdData {
  adName: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpc: number;
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

export interface KeywordData {
  keyword: string;
  matchType: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  ctr: number;
  cpa: number;
  qualityScore?: number;
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

export interface ScheduleData {
  dayOfWeek: string;
  hour: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
}

export interface DeviceData {
  device: 'Desktop' | 'Mobile' | 'Tablet';
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
  sexo: string;
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

// AgendaPro Data Types
export interface SalesData {
  totalSales: number;
  totalTransactions: number;
  averageTicket: number;
  salesVariation: number;
  transactionsVariation: number;
  ticketVariation: number;
}

export interface CategorySales {
  category: string;
  sales: number;
  variation: number;
}

export interface ServiceSales {
  service: string;
  sales: number;
  variation: number;
}

export interface AttributableSalesData {
  forms: number;
  estimatedRevenue: number;
  conversionRate: number;
  percentageOfTotal: number;
}

export interface AgendaProData {
  summary: SalesData;
  categorySales: CategorySales[];
  topServices: ServiceSales[];
  salesFromGoogleAds?: AttributableSalesData;
}

// Dashboard KPI Types
export interface KPI {
  label: string;
  value: string | number;
  variation?: number;
  context?: string;
  icon?: any;
  trend?: 'up' | 'down' | 'neutral';
  highlighted?: boolean;
}

// Insight Types
export interface Insight {
  type: 'success' | 'warning' | 'info' | 'danger';
  title: string;
  description: string;
  metric?: string;
}

// Summary Stats
export interface DashboardSummary {
  totalBudget: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  averageCTR: number;
  averageCPC: number;
  averageCPA: number;
  roi: number;
  costPerForm: number;
}
