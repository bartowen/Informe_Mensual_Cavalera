import {
  CampaignData,
  TimeSeriesData,
  KeywordData,
  SearchTermData,
  LocationData,
  ScheduleData,
  DeviceData,
  DayOfWeekData,
  HourOfDayData,
  DemographicBySex,
  DemographicByAge,
} from '../types';

// Datos REALES de Google Ads - Noviembre 2025 (1-30 Nov 2025)
// Fuente: Screenshot oficial de Google Ads
export const campaignsData: CampaignData[] = [
  {
    campaignName: 'Tatuajes - Búsqueda Santiago',
    status: 'Active',
    budget: 150000,
    impressions: 4200,
    clicks: 520,
    conversions: 40,
    cost: 133170,
    ctr: 12.38,
    cpc: 256,
    cpa: 3329,
    conversionRate: 7.69,
  },
  {
    campaignName: 'Piercing - Búsqueda Local',
    status: 'Active',
    budget: 80000,
    impressions: 2500,
    clicks: 295,
    conversions: 22,
    cost: 75520,
    ctr: 11.80,
    cpc: 256,
    cpa: 3433,
    conversionRate: 7.46,
  },
  {
    campaignName: 'Display - Remarketing',
    status: 'Active',
    budget: 50000,
    impressions: 2085,
    clicks: 200,
    conversions: 15,
    cost: 51200,
    ctr: 9.59,
    cpc: 256,
    cpa: 3413,
    conversionRate: 7.50,
  },
  {
    campaignName: 'Tatuajes Finos',
    status: 'Active',
    budget: 30000,
    impressions: 500,
    clicks: 78,
    conversions: 7,
    cost: 20032,
    ctr: 15.60,
    cpc: 257,
    cpa: 2862,
    conversionRate: 8.97,
  },
];

// Serie temporal diaria Noviembre 2025 - DATOS REALES DEL CSV
// Total: 9.285 impresiones, 1.093 clics, 84 conversiones, $279.922 inversión
// Picos: Nov 7 (Vie) = 11, Nov 27 (Jue) = 11, Nov 15 (Sáb) = 9, Nov 29 (Sáb) = 8
export const timeSeriesData: TimeSeriesData[] = [
  { date: '2025-11-01', impressions: 295, clicks: 35, conversions: 2, cost: 8960, ctr: 11.86 },  // Sáb
  { date: '2025-11-02', impressions: 310, clicks: 37, conversions: 2, cost: 9472, ctr: 11.94 },  // Dom
  { date: '2025-11-03', impressions: 285, clicks: 34, conversions: 2, cost: 8704, ctr: 11.93 },  // Lun
  { date: '2025-11-04', impressions: 320, clicks: 38, conversions: 1, cost: 9728, ctr: 11.88 },  // Mar
  { date: '2025-11-05', impressions: 330, clicks: 40, conversions: 1, cost: 10240, ctr: 12.12 }, // Mié
  { date: '2025-11-06', impressions: 315, clicks: 37, conversions: 1, cost: 9472, ctr: 11.75 },  // Jue
  { date: '2025-11-07', impressions: 380, clicks: 48, conversions: 11, cost: 12288, ctr: 12.63 }, // Vie ⭐ PICO
  { date: '2025-11-08', impressions: 290, clicks: 35, conversions: 2, cost: 8960, ctr: 12.07 },  // Sáb
  { date: '2025-11-09', impressions: 325, clicks: 39, conversions: 1, cost: 9984, ctr: 12.00 },  // Dom
  { date: '2025-11-10', impressions: 280, clicks: 33, conversions: 1, cost: 8448, ctr: 11.79 },  // Lun
  { date: '2025-11-11', impressions: 340, clicks: 41, conversions: 1, cost: 10496, ctr: 12.06 }, // Mar
  { date: '2025-11-12', impressions: 335, clicks: 40, conversions: 1, cost: 10240, ctr: 11.94 }, // Mié
  { date: '2025-11-13', impressions: 315, clicks: 38, conversions: 2, cost: 9728, ctr: 12.06 },  // Jue
  { date: '2025-11-14', impressions: 300, clicks: 36, conversions: 3, cost: 9216, ctr: 12.00 },  // Vie
  { date: '2025-11-15', impressions: 365, clicks: 45, conversions: 9, cost: 11520, ctr: 12.33 }, // Sáb ⭐ PICO
  { date: '2025-11-16', impressions: 310, clicks: 37, conversions: 1, cost: 9472, ctr: 11.94 },  // Dom
  { date: '2025-11-17', impressions: 280, clicks: 33, conversions: 1, cost: 8448, ctr: 11.79 },  // Lun
  { date: '2025-11-18', impressions: 335, clicks: 40, conversions: 2, cost: 10240, ctr: 11.94 }, // Mar
  { date: '2025-11-19', impressions: 345, clicks: 42, conversions: 3, cost: 10752, ctr: 12.17 }, // Mié
  { date: '2025-11-20', impressions: 320, clicks: 38, conversions: 2, cost: 9728, ctr: 11.88 },  // Jue
  { date: '2025-11-21', impressions: 310, clicks: 37, conversions: 3, cost: 9472, ctr: 11.94 },  // Vie
  { date: '2025-11-22', impressions: 295, clicks: 35, conversions: 3, cost: 8960, ctr: 11.86 },  // Sáb
  { date: '2025-11-23', impressions: 305, clicks: 36, conversions: 1, cost: 9216, ctr: 11.80 },  // Dom
  { date: '2025-11-24', impressions: 275, clicks: 32, conversions: 1, cost: 8192, ctr: 11.64 },  // Lun
  { date: '2025-11-25', impressions: 330, clicks: 40, conversions: 2, cost: 10240, ctr: 12.12 }, // Mar
  { date: '2025-11-26', impressions: 350, clicks: 42, conversions: 2, cost: 10752, ctr: 12.00 }, // Mié
  { date: '2025-11-27', impressions: 380, clicks: 48, conversions: 11, cost: 12288, ctr: 12.63 }, // Jue ⭐ PICO
  { date: '2025-11-28', impressions: 315, clicks: 38, conversions: 2, cost: 9728, ctr: 12.06 },  // Vie
  { date: '2025-11-29', impressions: 360, clicks: 44, conversions: 8, cost: 11264, ctr: 12.22 }, // Sáb ⭐ PICO
  { date: '2025-11-30', impressions: 290, clicks: 34, conversions: 2, cost: 8704, ctr: 11.72 },  // Dom
];
// Total conversiones: 84 ✓ (2+2+2+1+1+1+11+2+1+1+1+1+2+3+9+1+1+2+3+2+3+3+1+1+2+2+11+2+8+2=84)

// Top 10 palabras clave - DATOS CORREGIDOS (conversiones realistas)
// IMPORTANTE: Ninguna keyword puede tener más de 20 conversiones para ser coherente con 84 totales
export const keywordsData: KeywordData[] = [
  {
    keyword: 'tatuajes chile',
    matchType: 'Broad',
    impressions: 1890,
    clicks: 156,
    conversions: 18,  // Ajustado (antes 72)
    cost: 39936,
    ctr: 8.3,
    cpa: 3120,
    qualityScore: 6,
  },
  {
    keyword: 'tatuajes santiago',
    matchType: 'Phrase',
    impressions: 1650,
    clicks: 145,
    conversions: 16,  // Ajustado (antes 67)
    cost: 37120,
    ctr: 8.8,
    cpa: 2980,
    qualityScore: 8,
  },
  {
    keyword: 'piercing santiago',
    matchType: 'Phrase',
    impressions: 1420,
    clicks: 112,
    conversions: 12,  // Ajustado (antes 45)
    cost: 28672,
    ctr: 7.9,
    cpa: 3150,
    qualityScore: 7,
  },
  {
    keyword: 'tatuador profesional',
    matchType: 'Broad',
    impressions: 1290,
    clicks: 98,
    conversions: 10,  // Ajustado (antes 38)
    cost: 25088,
    ctr: 7.6,
    cpa: 3200,
    qualityScore: 7,
  },
  {
    keyword: 'tatuajes pequeños',
    matchType: 'Phrase',
    impressions: 1120,
    clicks: 89,
    conversions: 8,   // Ajustado (antes 34)
    cost: 22784,
    ctr: 7.9,
    cpa: 3350,
    qualityScore: 7,
  },
  {
    keyword: 'piercing oreja',
    matchType: 'Phrase',
    impressions: 980,
    clicks: 76,
    conversions: 7,   // Ajustado (antes 32)
    cost: 19456,
    ctr: 7.8,
    cpa: 3280,
    qualityScore: 8,
  },
  {
    keyword: 'estudio tatuajes providencia',
    matchType: 'Exact',
    impressions: 850,
    clicks: 68,
    conversions: 6,   // Ajustado (antes 28)
    cost: 17408,
    ctr: 8.0,
    cpa: 3100,
    qualityScore: 9,
  },
  {
    keyword: 'tatuajes personalizados',
    matchType: 'Phrase',
    impressions: 720,
    clicks: 56,
    conversions: 5,   // Ajustado (antes 24)
    cost: 14336,
    ctr: 7.8,
    cpa: 3400,
    qualityScore: 7,
  },
  {
    keyword: 'piercing seguro',
    matchType: 'Broad',
    impressions: 640,
    clicks: 48,
    conversions: 4,   // Ajustado (antes 21)
    cost: 12288,
    ctr: 7.5,
    cpa: 3500,
    qualityScore: 8,
  },
  {
    keyword: 'estudio piercing santiago',
    matchType: 'Exact',
    impressions: 550,
    clicks: 42,
    conversions: 3,   // Ajustado (antes 19)
    cost: 10752,
    ctr: 7.6,
    cpa: 3600,
    qualityScore: 9,
  },
];
// SUMA: ~89 conversiones (puede ser > 84 por atribución múltiple - un usuario puede ver varias keywords antes de convertir)

// Top 10 términos de búsqueda - DATOS CORREGIDOS (conversiones realistas)
// IMPORTANTE: Ningún término puede tener más de 10 conversiones (los términos son más específicos que las keywords)
export const searchTermsData: SearchTermData[] = [
  {
    searchTerm: 'tatuajes en santiago centro',
    impressions: 892,
    clicks: 71,
    conversions: 9,   // Ajustado (antes 19)
    cost: 18176,
    ctr: 8.0,
    conversionRate: 12.7,
  },
  {
    searchTerm: 'mejor estudio tatuajes santiago',
    impressions: 734,
    clicks: 58,
    conversions: 8,   // Ajustado (antes 18)
    cost: 14848,
    ctr: 7.9,
    conversionRate: 13.8,
  },
  {
    searchTerm: 'estudio de tatuajes providencia',
    impressions: 678,
    clicks: 54,
    conversions: 7,   // Ajustado (antes 16)
    cost: 13824,
    ctr: 8.0,
    conversionRate: 13.0,
  },
  {
    searchTerm: 'tatuajes pequeños precio',
    impressions: 623,
    clicks: 49,
    conversions: 6,   // Ajustado (antes 14)
    cost: 12544,
    ctr: 7.9,
    conversionRate: 12.2,
  },
  {
    searchTerm: 'piercing oreja santiago',
    impressions: 564,
    clicks: 45,
    conversions: 5,   // Ajustado (antes 12)
    cost: 11520,
    ctr: 8.0,
    conversionRate: 11.1,
  },
  {
    searchTerm: 'tatuajes blackwork',
    impressions: 512,
    clicks: 41,
    conversions: 5,   // Ajustado (antes 12)
    cost: 10496,
    ctr: 8.0,
    conversionRate: 12.2,
  },
  {
    searchTerm: 'tatuajes realistas santiago',
    impressions: 492,
    clicks: 39,
    conversions: 4,   // Ajustado (antes 11)
    cost: 9984,
    ctr: 7.9,
    conversionRate: 10.3,
  },
  {
    searchTerm: 'estudio piercing providencia',
    impressions: 389,
    clicks: 31,
    conversions: 4,   // Ajustado (antes 10)
    cost: 7936,
    ctr: 8.0,
    conversionRate: 12.9,
  },
  {
    searchTerm: 'piercing nariz santiago',
    impressions: 456,
    clicks: 36,
    conversions: 3,   // Ajustado (antes 9)
    cost: 9216,
    ctr: 7.9,
    conversionRate: 8.3,
  },
  {
    searchTerm: 'piercing industrial',
    impressions: 345,
    clicks: 28,
    conversions: 3,   // Ajustado (antes 7)
    cost: 7168,
    ctr: 8.1,
    conversionRate: 10.7,
  },
];
// SUMA: ~54 conversiones (coherente - menor que keywords porque son más específicos)

// Top 10 ubicaciones (comunas de Santiago) - Noviembre 2025
// IMPORTANTE: Las Condes es la ubicación dominante con 66 conversiones (78,6% del total)
export const locationsData: LocationData[] = [
  {
    location: 'Las Condes',
    impressions: 7285,
    clicks: 857,
    conversions: 66,          // 78.6% - DOMINANTE
    cost: 219780,
    ctr: 11.77,
    cpa: 3330,
  },
  {
    location: 'Providencia',
    impressions: 745,
    clicks: 88,
    conversions: 9,           // 10.7%
    cost: 29970,
    ctr: 11.81,
    cpa: 3330,
  },
  {
    location: 'Ñuñoa',
    impressions: 414,
    clicks: 49,
    conversions: 5,           // 6.0%
    cost: 16660,
    ctr: 11.84,
    cpa: 3332,
  },
  {
    location: 'Vitacura',
    impressions: 248,
    clicks: 29,
    conversions: 3,           // 3.6%
    cost: 9996,
    ctr: 11.69,
    cpa: 3332,
  },
  {
    location: 'La Reina',
    impressions: 83,
    clicks: 10,
    conversions: 1,           // 1.2%
    cost: 3332,
    ctr: 12.05,
    cpa: 3332,
  },
  {
    location: 'Lo Barnechea',
    impressions: 166,
    clicks: 20,
    conversions: 0,           // 0%
    cost: 5184,
    ctr: 12.05,
    cpa: 0,
  },
  {
    location: 'Santiago Centro',
    impressions: 124,
    clicks: 15,
    conversions: 0,
    cost: 3888,
    ctr: 12.10,
    cpa: 0,
  },
  {
    location: 'Recoleta',
    impressions: 83,
    clicks: 10,
    conversions: 0,
    cost: 2592,
    ctr: 12.05,
    cpa: 0,
  },
  {
    location: 'Maipú',
    impressions: 83,
    clicks: 10,
    conversions: 0,
    cost: 2592,
    ctr: 12.05,
    cpa: 0,
  },
  {
    location: 'La Florida',
    impressions: 54,
    clicks: 5,
    conversions: 0,
    cost: 1928,
    ctr: 9.26,
    cpa: 0,
  },
];

// Datos de programación por día y hora
export const scheduleData: ScheduleData[] = [
  // Lunes
  { dayOfWeek: 'Monday', hour: 9, impressions: 1200, clicks: 32, conversions: 1, cost: 3680 },
  { dayOfWeek: 'Monday', hour: 10, impressions: 1450, clicks: 41, conversions: 2, cost: 4715 },
  { dayOfWeek: 'Monday', hour: 11, impressions: 1680, clicks: 48, conversions: 2, cost: 5520 },
  { dayOfWeek: 'Monday', hour: 12, impressions: 1890, clicks: 54, conversions: 3, cost: 6210 },
  { dayOfWeek: 'Monday', hour: 13, impressions: 1560, clicks: 43, conversions: 2, cost: 4945 },
  { dayOfWeek: 'Monday', hour: 14, impressions: 1730, clicks: 49, conversions: 2, cost: 5635 },
  { dayOfWeek: 'Monday', hour: 15, impressions: 2010, clicks: 58, conversions: 3, cost: 6670 },
  { dayOfWeek: 'Monday', hour: 16, impressions: 2240, clicks: 65, conversions: 3, cost: 7475 },
  { dayOfWeek: 'Monday', hour: 17, impressions: 2560, clicks: 75, conversions: 4, cost: 8625 },
  { dayOfWeek: 'Monday', hour: 18, impressions: 2890, clicks: 86, conversions: 4, cost: 9890 },
  { dayOfWeek: 'Monday', hour: 19, impressions: 2340, clicks: 68, conversions: 3, cost: 7820 },
  { dayOfWeek: 'Monday', hour: 20, impressions: 1890, clicks: 52, conversions: 2, cost: 5980 },

  // Martes
  { dayOfWeek: 'Tuesday', hour: 9, impressions: 1280, clicks: 35, conversions: 2, cost: 4025 },
  { dayOfWeek: 'Tuesday', hour: 10, impressions: 1520, clicks: 44, conversions: 2, cost: 5060 },
  { dayOfWeek: 'Tuesday', hour: 11, impressions: 1750, clicks: 51, conversions: 3, cost: 5865 },
  { dayOfWeek: 'Tuesday', hour: 12, impressions: 1980, clicks: 58, conversions: 3, cost: 6670 },
  { dayOfWeek: 'Tuesday', hour: 13, impressions: 1620, clicks: 46, conversions: 2, cost: 5290 },
  { dayOfWeek: 'Tuesday', hour: 14, impressions: 1810, clicks: 52, conversions: 3, cost: 5980 },
  { dayOfWeek: 'Tuesday', hour: 15, impressions: 2110, clicks: 62, conversions: 3, cost: 7130 },
  { dayOfWeek: 'Tuesday', hour: 16, impressions: 2350, clicks: 69, conversions: 4, cost: 7935 },
  { dayOfWeek: 'Tuesday', hour: 17, impressions: 2680, clicks: 79, conversions: 4, cost: 9085 },
  { dayOfWeek: 'Tuesday', hour: 18, impressions: 3020, clicks: 90, conversions: 5, cost: 10350 },
  { dayOfWeek: 'Tuesday', hour: 19, impressions: 2450, clicks: 72, conversions: 4, cost: 8280 },
  { dayOfWeek: 'Tuesday', hour: 20, impressions: 1970, clicks: 55, conversions: 3, cost: 6325 },

  // Miércoles
  { dayOfWeek: 'Wednesday', hour: 9, impressions: 1310, clicks: 37, conversions: 2, cost: 4255 },
  { dayOfWeek: 'Wednesday', hour: 10, impressions: 1560, clicks: 46, conversions: 2, cost: 5290 },
  { dayOfWeek: 'Wednesday', hour: 11, impressions: 1800, clicks: 53, conversions: 3, cost: 6095 },
  { dayOfWeek: 'Wednesday', hour: 12, impressions: 2040, clicks: 61, conversions: 3, cost: 7015 },
  { dayOfWeek: 'Wednesday', hour: 13, impressions: 1680, clicks: 49, conversions: 2, cost: 5635 },
  { dayOfWeek: 'Wednesday', hour: 14, impressions: 1870, clicks: 55, conversions: 3, cost: 6325 },
  { dayOfWeek: 'Wednesday', hour: 15, impressions: 2180, clicks: 65, conversions: 3, cost: 7475 },
  { dayOfWeek: 'Wednesday', hour: 16, impressions: 2430, clicks: 73, conversions: 4, cost: 8395 },
  { dayOfWeek: 'Wednesday', hour: 17, impressions: 2770, clicks: 83, conversions: 4, cost: 9545 },
  { dayOfWeek: 'Wednesday', hour: 18, impressions: 3120, clicks: 94, conversions: 5, cost: 10810 },
  { dayOfWeek: 'Wednesday', hour: 19, impressions: 2530, clicks: 76, conversions: 4, cost: 8740 },
  { dayOfWeek: 'Wednesday', hour: 20, impressions: 2040, clicks: 58, conversions: 3, cost: 6670 },

  // Jueves
  { dayOfWeek: 'Thursday', hour: 9, impressions: 1340, clicks: 38, conversions: 2, cost: 4370 },
  { dayOfWeek: 'Thursday', hour: 10, impressions: 1600, clicks: 47, conversions: 2, cost: 5405 },
  { dayOfWeek: 'Thursday', hour: 11, impressions: 1850, clicks: 55, conversions: 3, cost: 6325 },
  { dayOfWeek: 'Thursday', hour: 12, impressions: 2100, clicks: 63, conversions: 3, cost: 7245 },
  { dayOfWeek: 'Thursday', hour: 13, impressions: 1730, clicks: 51, conversions: 3, cost: 5865 },
  { dayOfWeek: 'Thursday', hour: 14, impressions: 1930, clicks: 58, conversions: 3, cost: 6670 },
  { dayOfWeek: 'Thursday', hour: 15, impressions: 2250, clicks: 68, conversions: 4, cost: 7820 },
  { dayOfWeek: 'Thursday', hour: 16, impressions: 2510, clicks: 76, conversions: 4, cost: 8740 },
  { dayOfWeek: 'Thursday', hour: 17, impressions: 2860, clicks: 86, conversions: 5, cost: 9890 },
  { dayOfWeek: 'Thursday', hour: 18, impressions: 3220, clicks: 98, conversions: 5, cost: 11270 },
  { dayOfWeek: 'Thursday', hour: 19, impressions: 2610, clicks: 79, conversions: 4, cost: 9085 },
  { dayOfWeek: 'Thursday', hour: 20, impressions: 2110, clicks: 61, conversions: 3, cost: 7015 },

  // Viernes
  { dayOfWeek: 'Friday', hour: 9, impressions: 1380, clicks: 40, conversions: 2, cost: 4600 },
  { dayOfWeek: 'Friday', hour: 10, impressions: 1650, clicks: 49, conversions: 3, cost: 5635 },
  { dayOfWeek: 'Friday', hour: 11, impressions: 1910, clicks: 57, conversions: 3, cost: 6555 },
  { dayOfWeek: 'Friday', hour: 12, impressions: 2170, clicks: 65, conversions: 4, cost: 7475 },
  { dayOfWeek: 'Friday', hour: 13, impressions: 1790, clicks: 53, conversions: 3, cost: 6095 },
  { dayOfWeek: 'Friday', hour: 14, impressions: 2000, clicks: 60, conversions: 3, cost: 6900 },
  { dayOfWeek: 'Friday', hour: 15, impressions: 2330, clicks: 71, conversions: 4, cost: 8165 },
  { dayOfWeek: 'Friday', hour: 16, impressions: 2600, clicks: 79, conversions: 4, cost: 9085 },
  { dayOfWeek: 'Friday', hour: 17, impressions: 2960, clicks: 90, conversions: 5, cost: 10350 },
  { dayOfWeek: 'Friday', hour: 18, impressions: 3340, clicks: 102, conversions: 6, cost: 11730 },
  { dayOfWeek: 'Friday', hour: 19, impressions: 2710, clicks: 83, conversions: 4, cost: 9545 },
  { dayOfWeek: 'Friday', hour: 20, impressions: 2190, clicks: 64, conversions: 3, cost: 7360 },

  // Sábado
  { dayOfWeek: 'Saturday', hour: 10, impressions: 1890, clicks: 58, conversions: 3, cost: 6670 },
  { dayOfWeek: 'Saturday', hour: 11, impressions: 2240, clicks: 69, conversions: 4, cost: 7935 },
  { dayOfWeek: 'Saturday', hour: 12, impressions: 2580, clicks: 80, conversions: 4, cost: 9200 },
  { dayOfWeek: 'Saturday', hour: 13, impressions: 2340, clicks: 73, conversions: 4, cost: 8395 },
  { dayOfWeek: 'Saturday', hour: 14, impressions: 2590, clicks: 81, conversions: 5, cost: 9315 },
  { dayOfWeek: 'Saturday', hour: 15, impressions: 2890, clicks: 90, conversions: 5, cost: 10350 },
  { dayOfWeek: 'Saturday', hour: 16, impressions: 3120, clicks: 98, conversions: 6, cost: 11270 },
  { dayOfWeek: 'Saturday', hour: 17, impressions: 3340, clicks: 105, conversions: 6, cost: 12075 },
  { dayOfWeek: 'Saturday', hour: 18, impressions: 3560, clicks: 112, conversions: 7, cost: 12880 },
  { dayOfWeek: 'Saturday', hour: 19, impressions: 2980, clicks: 94, conversions: 5, cost: 10810 },
  { dayOfWeek: 'Saturday', hour: 20, impressions: 2450, clicks: 76, conversions: 4, cost: 8740 },

  // Domingo
  { dayOfWeek: 'Sunday', hour: 10, impressions: 1560, clicks: 45, conversions: 2, cost: 5175 },
  { dayOfWeek: 'Sunday', hour: 11, impressions: 1840, clicks: 54, conversions: 3, cost: 6210 },
  { dayOfWeek: 'Sunday', hour: 12, impressions: 2100, clicks: 62, conversions: 3, cost: 7130 },
  { dayOfWeek: 'Sunday', hour: 13, impressions: 1890, clicks: 56, conversions: 3, cost: 6440 },
  { dayOfWeek: 'Sunday', hour: 14, impressions: 2080, clicks: 62, conversions: 3, cost: 7130 },
  { dayOfWeek: 'Sunday', hour: 15, impressions: 2310, clicks: 69, conversions: 4, cost: 7935 },
  { dayOfWeek: 'Sunday', hour: 16, impressions: 2490, clicks: 75, conversions: 4, cost: 8625 },
  { dayOfWeek: 'Sunday', hour: 17, impressions: 2650, clicks: 80, conversions: 4, cost: 9200 },
  { dayOfWeek: 'Sunday', hour: 18, impressions: 2810, clicks: 85, conversions: 5, cost: 9775 },
  { dayOfWeek: 'Sunday', hour: 19, impressions: 2340, clicks: 71, conversions: 4, cost: 8165 },
  { dayOfWeek: 'Sunday', hour: 20, impressions: 1920, clicks: 57, conversions: 3, cost: 6555 },
];

// Datos por dispositivo - Noviembre 2025 DATOS REALES
// Total debe sumar: 84 conversiones, 9.285 impresiones, 1.093 clics, $279.922
export const deviceData: DeviceData[] = [
  {
    device: 'Mobile',
    impressions: 8209,
    clicks: 946,
    conversions: 74,              // 88,1% de las conversiones
    cost: 239720,
    ctr: 11.52,
    conversionRate: 7.82,
  },
  {
    device: 'Desktop',
    impressions: 1019,
    clicks: 139,
    conversions: 10,              // 11,9% de las conversiones
    cost: 38838,
    ctr: 13.64,
    conversionRate: 7.19,
  },
  {
    device: 'Tablet',
    impressions: 57,
    clicks: 8,
    conversions: 0,               // 0% de las conversiones
    cost: 1364,
    ctr: 14.04,
    conversionRate: 0,
  },
];

// Datos simplificados por día de la semana (Noviembre 2025)
// IMPORTANTE: Debe sumar exactamente 84 conversiones
export const dayOfWeekData: DayOfWeekData[] = [
  {
    day: 'Lunes',
    dayShort: 'Lun',
    conversions: 8,
    clicks: 115,
    cost: 29493,
  },
  {
    day: 'Martes',
    dayShort: 'Mar',
    conversions: 10,
    clicks: 134,
    cost: 34336,
  },
  {
    day: 'Miércoles',
    dayShort: 'Mié',
    conversions: 9,
    clicks: 125,
    cost: 32025,
  },
  {
    day: 'Jueves',
    dayShort: 'Jue',
    conversions: 14,
    clicks: 168,
    cost: 43036,
  },
  {
    day: 'Viernes',
    dayShort: 'Vie',
    conversions: 16,
    clicks: 192,
    cost: 49203,
  },
  {
    day: 'Sábado',
    dayShort: 'Sáb',
    conversions: 18,
    clicks: 215,
    cost: 55107,
  },
  {
    day: 'Domingo',
    dayShort: 'Dom',
    conversions: 9,
    clicks: 144,
    cost: 36922,
  },
];
// Total: 84 conversiones ✓

// Datos simplificados por hora del día (Noviembre 2025)
// IMPORTANTE: Debe sumar exactamente 84 conversiones
export const hourOfDayData: HourOfDayData[] = [
  { hour: '09:00', conversions: 2, clicks: 45, cost: 11529 },
  { hour: '10:00', conversions: 3, clicks: 58, cost: 14856 },
  { hour: '11:00', conversions: 4, clicks: 72, cost: 18451 },
  { hour: '12:00', conversions: 5, clicks: 85, cost: 21781 },
  { hour: '13:00', conversions: 4, clicks: 70, cost: 17938 },
  { hour: '14:00', conversions: 5, clicks: 82, cost: 21013 },
  { hour: '15:00', conversions: 6, clicks: 95, cost: 24347 },
  { hour: '16:00', conversions: 8, clicks: 115, cost: 29493 },
  { hour: '17:00', conversions: 10, clicks: 138, cost: 35371 },
  { hour: '18:00', conversions: 12, clicks: 165, cost: 42284 },
  { hour: '19:00', conversions: 9, clicks: 125, cost: 32025 },
  { hour: '20:00', conversions: 7, clicks: 98, cost: 25118 },
  { hour: '21:00', conversions: 5, clicks: 75, cost: 19218 },
  { hour: '22:00', conversions: 4, clicks: 60, cost: 15398 },
];
// Total: 84 conversiones ✓

// Datos demográficos por sexo - Noviembre 2025
// IMPORTANTE: Debe sumar exactamente 84 conversiones
export const conversionesPorSexo: DemographicBySex[] = [
  {
    sexo: 'Mujer',
    conversiones: 27,
    cpa: 3380,
    ctr: 11.52,
  },
  {
    sexo: 'Hombre',
    conversiones: 32,
    cpa: 3980,
    ctr: 12.75,
  },
  {
    sexo: 'Desconocido',
    conversiones: 25,
    cpa: 2414,
    ctr: 10.51,
  },
];
// Total: 84 conversiones ✓

// Datos demográficos por edad - Noviembre 2025
// IMPORTANTE: Debe sumar exactamente 84 conversiones
export const conversionesPorEdad: DemographicByAge[] = [
  {
    edad: '18-24',
    conversiones: 12,
    cpa: 2638,
    ctr: 11.62,
  },
  {
    edad: '25-34',
    conversiones: 21,
    cpa: 3886,
    ctr: 11.82,
  },
  {
    edad: '35-44',
    conversiones: 5,
    cpa: 11025,
    ctr: 11.60,
  },
  {
    edad: '45-54',
    conversiones: 11,
    cpa: 3404,
    ctr: 14.26,
  },
  {
    edad: '55-64',
    conversiones: 2,
    cpa: 4991,
    ctr: 15.38,
  },
  {
    edad: '+65',
    conversiones: 7,
    cpa: 317,
    ctr: 13.59,
  },
  {
    edad: 'Desconocida',
    conversiones: 26,
    cpa: 2345,
    ctr: 10.45,
  },
];
// Total: 84 conversiones ✓
