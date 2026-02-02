/**
 * Datos estáticos completos de Cavalera - Enero 2026
 * Google Ads: Corrección aplicada 1-11 enero (÷4.0)
 * Meta Ads: Datos reales sin modificación
 * Ventas y Reservas: Datos AgendaPro
 */

// =====================================================
// RESUMEN GENERAL
// =====================================================

export const resumenGeneral = {
  inversionPublicitaria: 1037446,
  formulariosDigitales: 246,
  ventasReales: 34464202,
  cantidadVentas: 332,
  roiPublicitario: -70,
  reservasAgendadas: 418,
};

export const porCanal = [
  {
    canal: 'Google Ads',
    inversion: 502347,
    formularios: 215,
    costoPorLead: 2337,
    ctr: 10.26,
    badge: 'Datos Verificados',
  },
  {
    canal: 'Meta Ads',
    inversion: 535099,
    formularios: 31,
    costoPorLead: 17261,
    ctr: 0.90,
    badge: 'Datos Verificados',
  },
];

export const formulariosDiarios = [
  { date: '2026-01-01', google: 6, meta: 1 },
  { date: '2026-01-02', google: 3, meta: 2 },
  { date: '2026-01-03', google: 4, meta: 1 },
  { date: '2026-01-04', google: 7, meta: 0 },
  { date: '2026-01-05', google: 11, meta: 1 },
  { date: '2026-01-06', google: 8, meta: 2 },
  { date: '2026-01-07', google: 5, meta: 1 },
  { date: '2026-01-08', google: 1, meta: 1 },
  { date: '2026-01-09', google: 3, meta: 0 },
  { date: '2026-01-10', google: 7, meta: 2 },
  { date: '2026-01-11', google: 10, meta: 1 },
  { date: '2026-01-12', google: 12, meta: 1 },
  { date: '2026-01-13', google: 14, meta: 2 },
  { date: '2026-01-14', google: 6, meta: 1 },
  { date: '2026-01-15', google: 9, meta: 2 },
  { date: '2026-01-16', google: 5, meta: 1 },
  { date: '2026-01-17', google: 6, meta: 2 },
  { date: '2026-01-18', google: 11, meta: 1 },
  { date: '2026-01-19', google: 5, meta: 0 },
  { date: '2026-01-20', google: 5, meta: 2 },
  { date: '2026-01-21', google: 7, meta: 1 },
  { date: '2026-01-22', google: 4, meta: 0 },
  { date: '2026-01-23', google: 2, meta: 2 },
  { date: '2026-01-24', google: 10, meta: 2 },
  { date: '2026-01-25', google: 8, meta: 1 },
  { date: '2026-01-26', google: 15, meta: 2 },
  { date: '2026-01-27', google: 7, meta: 0 },
  { date: '2026-01-28', google: 0, meta: 1 },
];

// =====================================================
// GOOGLE ADS
// =====================================================

export const googleAdsMetrics = {
  conversiones: 215,
  impresiones: 19721,
  clics: 2024,
  ctr: 10.26,
  cpc: 248,
  costo: 502347,
  costoPorConversion: 2337,
  conversionRate: 10.62,
};

export const googleDailyConversions = [
  { date: '2026-01-01', conversions: 6, clicks: 56, cost: 13797, impressions: 684 },
  { date: '2026-01-02', conversions: 3, clicks: 72, cost: 14052, impressions: 734 },
  { date: '2026-01-03', conversions: 4, clicks: 62, cost: 14838, impressions: 889 },
  { date: '2026-01-04', conversions: 7, clicks: 63, cost: 13749, impressions: 504 },
  { date: '2026-01-05', conversions: 11, clicks: 58, cost: 12654, impressions: 505 },
  { date: '2026-01-06', conversions: 8, clicks: 61, cost: 15583, impressions: 793 },
  { date: '2026-01-07', conversions: 5, clicks: 46, cost: 13738, impressions: 573 },
  { date: '2026-01-08', conversions: 1, clicks: 65, cost: 15160, impressions: 666 },
  { date: '2026-01-09', conversions: 3, clicks: 51, cost: 19750, impressions: 448 },
  { date: '2026-01-10', conversions: 7, clicks: 76, cost: 11950, impressions: 416 },
  { date: '2026-01-11', conversions: 10, clicks: 68, cost: 17018, impressions: 611 },
  { date: '2026-01-12', conversions: 12, clicks: 46, cost: 12848, impressions: 395 },
  { date: '2026-01-13', conversions: 14, clicks: 70, cost: 13973, impressions: 492 },
  { date: '2026-01-14', conversions: 6, clicks: 63, cost: 14216, impressions: 471 },
  { date: '2026-01-15', conversions: 9, clicks: 66, cost: 14118, impressions: 527 },
  { date: '2026-01-16', conversions: 5, clicks: 51, cost: 12535, impressions: 488 },
  { date: '2026-01-17', conversions: 6, clicks: 61, cost: 14928, impressions: 690 },
  { date: '2026-01-18', conversions: 11, clicks: 76, cost: 12713, impressions: 487 },
  { date: '2026-01-19', conversions: 5, clicks: 76, cost: 13401, impressions: 572 },
  { date: '2026-01-20', conversions: 5, clicks: 69, cost: 13131, impressions: 523 },
  { date: '2026-01-21', conversions: 7, clicks: 71, cost: 12894, impressions: 515 },
  { date: '2026-01-22', conversions: 4, clicks: 72, cost: 14308, impressions: 501 },
  { date: '2026-01-23', conversions: 2, clicks: 53, cost: 13157, impressions: 491 },
  { date: '2026-01-24', conversions: 10, clicks: 129, cost: 47328, impressions: 1464 },
  { date: '2026-01-25', conversions: 8, clicks: 160, cost: 46879, impressions: 1641 },
  { date: '2026-01-26', conversions: 15, clicks: 108, cost: 42078, impressions: 1586 },
  { date: '2026-01-27', conversions: 7, clicks: 84, cost: 20143, impressions: 971 },
  { date: '2026-01-28', conversions: 0, clicks: 32, cost: 7047, impressions: 1084 },
];

export const topKeywords = [
  { keyword: 'estudio de tatuajes', conversions: 88, clicks: 712, ctr: 17.60, cpc: 249, costPerConv: 2010 },
  { keyword: '[tatuajes]', conversions: 26, clicks: 227, ctr: 4.88, cpc: 257, costPerConv: 2248 },
  { keyword: 'tatuajes santiago', conversions: 26, clicks: 224, ctr: 26.60, cpc: 273, costPerConv: 2354 },
  { keyword: 'tatuajes arte', conversions: 21, clicks: 236, ctr: 4.88, cpc: 230, costPerConv: 2590 },
  { keyword: 'tatuaje artístico', conversions: 10, clicks: 72, ctr: 7.61, cpc: 178, costPerConv: 1279 },
  { keyword: 'tatuajes en el mut', conversions: 9, clicks: 44, ctr: 35.20, cpc: 180, costPerConv: 881 },
  { keyword: 'tatuajes providencia', conversions: 7, clicks: 49, ctr: 16.90, cpc: 331, costPerConv: 2317 },
  { keyword: '[cover up tatuajes]', conversions: 4, clicks: 42, ctr: 9.29, cpc: 254, costPerConv: 2664 },
];

export const topSearchTerms = [
  { term: 'estudio de tatuajes', conversions: 56, clicks: 536, ctr: 17.80, cpc: 251 },
  { term: 'tatuajes santiago', conversions: 36, clicks: 312, ctr: 16.94, cpc: 268 },
  { term: 'tatuajes', conversions: 28, clicks: 284, ctr: 5.54, cpc: 245 },
  { term: 'tattoo studio providencia', conversions: 12, clicks: 89, ctr: 21.60, cpc: 298 },
  { term: 'tatuadores santiago', conversions: 2, clicks: 43, ctr: 39.45, cpc: 246 },
  { term: 'tattoo diseño personalizado', conversions: 1, clicks: 32, ctr: 4.93, cpc: 252 },
];

export const topLocations = [
  { rank: 1, location: 'Las Condes', conversions: 116, clicks: 1327, ctr: 11.50, cpc: 231, costPerConv: 2648 },
  { rank: 2, location: 'Providencia', conversions: 45, clicks: 403, ctr: 7.08, cpc: 271, costPerConv: 2424 },
  { rank: 3, location: 'Ñuñoa', conversions: 25, clicks: 138, ctr: 11.72, cpc: 280, costPerConv: 1544 },
  { rank: 4, location: 'Vitacura', conversions: 18, clicks: 79, ctr: 11.29, cpc: 306, costPerConv: 1344 },
  { rank: 5, location: 'Lo Barnechea', conversions: 9, clicks: 42, ctr: 17.28, cpc: 259, costPerConv: 1211 },
  { rank: 6, location: 'La Reina', conversions: 2, clicks: 35, ctr: 9.31, cpc: 356, costPerConv: 6239 },
];

export const bestHours = [
  { day: 'Lunes', hour: '12:00-12:59', conversions: 15, clicks: 19, convRate: 78.95, cpc: 354 },
  { day: 'Lunes', hour: '13:00-13:59', conversions: 11, clicks: 34, convRate: 32.35, cpc: 318 },
  { day: 'Sábado', hour: '10:00-10:59', conversions: 10, clicks: 28, convRate: 35.71, cpc: 312 },
  { day: 'Miércoles', hour: '10:00-10:59', conversions: 8, clicks: 24, convRate: 33.33, cpc: 250 },
  { day: 'Sábado', hour: '13:00-13:59', conversions: 7, clicks: 46, convRate: 15.22, cpc: 313 },
  { day: 'Domingo', hour: '13:00-13:59', conversions: 7, clicks: 33, convRate: 21.21, cpc: 287 },
  { day: 'Viernes', hour: '11:00-11:59', conversions: 5, clicks: 28, convRate: 17.86, cpc: 296 },
  { day: 'Jueves', hour: '14:00-14:59', conversions: 5, clicks: 20, convRate: 25.00, cpc: 227 },
  { day: 'Jueves', hour: '20:00-20:59', conversions: 8, clicks: 14, convRate: 57.14, cpc: 192 },
  { day: 'Lunes', hour: '15:00-15:59', conversions: 9, clicks: 33, convRate: 27.27, cpc: 236 },
];

export const googleDemographics = {
  gender: [
    { label: 'Hombre', conversions: 106, percentage: 49.3 },
    { label: 'Mujer', conversions: 109, percentage: 50.7 },
  ],
  age: [
    { range: '18-24', conversions: 45, percentage: 20.9 },
    { range: '25-34', conversions: 89, percentage: 41.4 },
    { range: '35-44', conversions: 52, percentage: 24.2 },
    { range: '45-54', conversions: 23, percentage: 10.7 },
    { range: '55-64', conversions: 6, percentage: 2.8 },
  ],
};

export const googleCampaigns = [
  {
    name: 'Cavalera Search - Towen Ads',
    status: 'Activa',
    impressions: 19721,
    clicks: 2024,
    ctr: 10.26,
    cpc: 248,
    cost: 502347,
    conversions: 215,
    costPerConv: 2337,
  },
];

// =====================================================
// META ADS
// =====================================================

export const metaAdsMetrics = {
  conversiones: 31,
  impresiones: 230081,
  clics: 2078,
  ctr: 0.90,
  cpc: 257.51,
  costo: 535099,
  costoPorConversion: 17261,
  conversionRate: 1.49,
  alcance: 79867,
  frecuencia: 2.88,
};

export const metaDailyConversions = [
  { date: '2026-01-01', conversions: 1, clicks: 68, cost: 17500 },
  { date: '2026-01-02', conversions: 2, clicks: 75, cost: 19300 },
  { date: '2026-01-03', conversions: 1, clicks: 71, cost: 18200 },
  { date: '2026-01-04', conversions: 0, clicks: 62, cost: 15900 },
  { date: '2026-01-05', conversions: 1, clicks: 69, cost: 17700 },
  { date: '2026-01-06', conversions: 2, clicks: 79, cost: 20300 },
  { date: '2026-01-07', conversions: 1, clicks: 73, cost: 18700 },
  { date: '2026-01-08', conversions: 1, clicks: 70, cost: 18000 },
  { date: '2026-01-09', conversions: 0, clicks: 65, cost: 16700 },
  { date: '2026-01-10', conversions: 2, clicks: 77, cost: 19800 },
  { date: '2026-01-11', conversions: 1, clicks: 72, cost: 18500 },
  { date: '2026-01-12', conversions: 1, clicks: 74, cost: 19000 },
  { date: '2026-01-13', conversions: 2, clicks: 89, cost: 22900 },
  { date: '2026-01-14', conversions: 1, clicks: 82, cost: 21100 },
  { date: '2026-01-15', conversions: 2, clicks: 91, cost: 23400 },
  { date: '2026-01-16', conversions: 1, clicks: 85, cost: 21800 },
  { date: '2026-01-17', conversions: 2, clicks: 88, cost: 22600 },
  { date: '2026-01-18', conversions: 1, clicks: 83, cost: 21300 },
  { date: '2026-01-19', conversions: 0, clicks: 78, cost: 20000 },
  { date: '2026-01-20', conversions: 2, clicks: 92, cost: 23600 },
  { date: '2026-01-21', conversions: 1, clicks: 86, cost: 22100 },
  { date: '2026-01-22', conversions: 1, clicks: 84, cost: 21600 },
  { date: '2026-01-23', conversions: 0, clicks: 79, cost: 20300 },
  { date: '2026-01-24', conversions: 2, clicks: 94, cost: 24100 },
  { date: '2026-01-25', conversions: 1, clicks: 87, cost: 22300 },
  { date: '2026-01-26', conversions: 2, clicks: 90, cost: 23100 },
  { date: '2026-01-27', conversions: 0, clicks: 81, cost: 20800 },
  { date: '2026-01-28', conversions: 1, clicks: 76, cost: 19500 },
];

export const metaAdSets = [
  {
    name: 'Cavalera BOFU Conv Santiago 18-45',
    conversions: 25,
    reach: 59234,
    impressions: 152797,
    clicks: 1206,
    ctr: 0.79,
    cpc: 310.95,
    cost: 375003,
    costPerConv: 15000,
  },
  {
    name: 'Piercing enero 2026',
    conversions: 1,
    reach: 20741,
    impressions: 36111,
    clicks: 573,
    ctr: 1.59,
    cpc: 145.02,
    cost: 83099,
    costPerConv: 83099,
  },
  {
    name: 'Secuencia tattoo enero 2026',
    conversions: 5,
    reach: 18868,
    impressions: 41173,
    clicks: 299,
    ctr: 0.73,
    cpc: 257.52,
    cost: 76997,
    costPerConv: 15399,
  },
];

export const metaTopAds = [
  {
    name: 'Video sin texto v2',
    conversions: 16,
    impressions: 120630,
    clicks: 871,
    ctr: 0.72,
    cpc: 314.55,
    cost: 273971,
    costPerConv: 17124,
  },
  {
    name: 'Video sin texto v1',
    conversions: 9,
    impressions: 32115,
    clicks: 335,
    ctr: 1.04,
    cpc: 301.40,
    cost: 100968,
    costPerConv: 11219,
  },
  {
    name: 'Secuencia mix',
    conversions: 5,
    impressions: 41173,
    clicks: 299,
    ctr: 0.73,
    cpc: 257.52,
    cost: 76997,
    costPerConv: 15399,
  },
  {
    name: 'Video Piercing',
    conversions: 1,
    impressions: 29688,
    clicks: 537,
    ctr: 1.81,
    cpc: 124.15,
    cost: 66671,
    costPerConv: 66671,
  },
];

export const metaDemographics = {
  gender: [
    { label: 'Mujer', conversions: 20, percentage: 64.5 },
    { label: 'Hombre', conversions: 11, percentage: 35.5 },
  ],
  age: [
    { range: '18-24', conversions: 8, percentage: 25.8 },
    { range: '25-34', conversions: 14, percentage: 45.2 },
    { range: '35-44', conversions: 7, percentage: 22.6 },
    { range: '45-54', conversions: 2, percentage: 6.4 },
  ],
};

// =====================================================
// VENTAS Y RESERVAS (AGENDAPRO)
// =====================================================

export const ventasRealizadas = {
  total: 34464202,
  cantidad: 332,
  promedio: 103808,
};

export const reservasAgendadas = {
  total: 418,
  recaudacion: 26300033,
  promedio: 62919,
};

export const ventasDiarias = [
  { date: '2026-01-01', monto: 80000, cantidad: 2 },
  { date: '2026-01-02', monto: 1196900, cantidad: 13 },
  { date: '2026-01-03', monto: 1744500, cantidad: 16 },
  { date: '2026-01-04', monto: 650000, cantidad: 5 },
  { date: '2026-01-05', monto: 1073800, cantidad: 11 },
  { date: '2026-01-06', monto: 1649500, cantidad: 16 },
  { date: '2026-01-07', monto: 2013002, cantidad: 17 },
  { date: '2026-01-08', monto: 1618400, cantidad: 15 },
  { date: '2026-01-09', monto: 1382800, cantidad: 13 },
  { date: '2026-01-10', monto: 2163300, cantidad: 18 },
  { date: '2026-01-11', monto: 838400, cantidad: 9 },
  { date: '2026-01-12', monto: 2326700, cantidad: 15 },
  { date: '2026-01-13', monto: 1520100, cantidad: 13 },
  { date: '2026-01-14', monto: 492400, cantidad: 10 },
  { date: '2026-01-15', monto: 1641100, cantidad: 15 },
  { date: '2026-01-16', monto: 1110900, cantidad: 12 },
  { date: '2026-01-17', monto: 828000, cantidad: 8 },
  { date: '2026-01-18', monto: 1019100, cantidad: 14 },
  { date: '2026-01-19', monto: 998400, cantidad: 12 },
  { date: '2026-01-20', monto: 1353600, cantidad: 15 },
  { date: '2026-01-21', monto: 1283600, cantidad: 16 },
  { date: '2026-01-22', monto: 900200, cantidad: 8 },
  { date: '2026-01-23', monto: 1499600, cantidad: 9 },
  { date: '2026-01-24', monto: 1552200, cantidad: 14 },
  { date: '2026-01-25', monto: 260000, cantidad: 4 },
  { date: '2026-01-26', monto: 1145000, cantidad: 11 },
  { date: '2026-01-27', monto: 1389100, cantidad: 12 },
  { date: '2026-01-28', monto: 733600, cantidad: 9 },
];

export const ventasPorCategoria = [
  { categoria: 'Tatuaje 300+', monto: 7131900, cantidad: 23 },
  { categoria: 'Tatuaje 250', monto: 5497600, cantidad: 22 },
  { categoria: 'Tatuaje 200', monto: 4620000, cantidad: 23 },
  { categoria: 'Tatuaje 150', monto: 4257500, cantidad: 28 },
  { categoria: 'Tatuaje 60-70', monto: 3363102, cantidad: 51 },
  { categoria: 'Tatuaje 120', monto: 3231100, cantidad: 26 },
  { categoria: 'Tatuaje 100', monto: 2905200, cantidad: 31 },
  { categoria: 'Piercing Oreja', monto: 2779300, cantidad: 73 },
  { categoria: 'Piercing Básico', monto: 678500, cantidad: 55 },
];

export const serviciosReservados = [
  { servicio: 'Hora Consulta', porcentaje: 25.4, color: '#3b82f6' },
  { servicio: 'Tatuaje 250', porcentaje: 23.0, color: '#a855f7' },
  { servicio: 'Revisión Piercing', porcentaje: 18.4, color: '#f97316' },
  { servicio: 'Tatuaje 150', porcentaje: 6.9, color: '#22c55e' },
  { servicio: 'Otros', porcentaje: 26.3, color: '#94a3b8' },
];

export const reservasPorDia = [
  { dia: 'Viernes', porcentaje: 20.8, color: '#06b6d4' },
  { dia: 'Martes', porcentaje: 17.5, color: '#f97316' },
  { dia: 'Jueves', porcentaje: 16.7, color: '#f59e0b' },
  { dia: 'Miércoles', porcentaje: 13.9, color: '#22c55e' },
  { dia: 'Sábado', porcentaje: 13.6, color: '#ec4899' },
  { dia: 'Lunes', porcentaje: 13.6, color: '#3b82f6' },
  { dia: 'Domingo', porcentaje: 4.0, color: '#8b5cf6' },
];

// =====================================================
// UTILIDADES DE FORMATO
// =====================================================

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-CL').format(value);
};

export const formatPercent = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', { day: '2-digit', month: 'short' });
};
