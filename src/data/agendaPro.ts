import { AgendaProData } from '../types';

// Datos de AgendaPro - Noviembre 2025
// IMPORTANTE: Las ventas totales incluyen TODAS las fuentes (orgánico, recomendaciones, recurrentes, etc.)
// NO todas las ventas son atribuibles a Google Ads
export const agendaProData: AgendaProData = {
  summary: {
    totalSales: 41839303,        // Total de TODAS las fuentes
    totalTransactions: 339,       // Total de transacciones del mes
    averageTicket: 123420,        // FIJO - NO CALCULAR
    salesVariation: 22.7,
    transactionsVariation: 39.5,
    ticketVariation: -12.0,
  },
  // Ventas atribuibles a Google Ads
  salesFromGoogleAds: {
    forms: 84,                                        // Formularios de Google Ads
    estimatedRevenue: 84 * 123420,                   // 84 × $123.420 = $10.367.280
    conversionRate: (84 / 339) * 100,                // 24,8% de las transacciones
    percentageOfTotal: ((84 * 123420) / 41839303) * 100,  // 24,8% de las ventas
  },
  categorySales: [
    {
      category: 'Tatuaje',
      sales: 29700002,
      variation: 16.0,
    },
    {
      category: 'Piercing Oreja',
      sales: 2718000,
      variation: 10.7,
    },
    {
      category: 'Piercing Rostro',
      sales: 475000,
      variation: 13.1,
    },
    {
      category: 'Piercing otras partes',
      sales: 110001,
      variation: -57.7,
    },
    {
      category: 'Revisión Piercing',
      sales: 100000,
      variation: -31.0,
    },
  ],
  topServices: [
    {
      service: 'Tatuaje 250',
      sales: 6240000,
      variation: 69.1,
    },
    {
      service: 'Tatuaje 200',
      sales: 5440002,
      variation: 2.6,
    },
    {
      service: 'Tatuaje 150',
      sales: 3770000,
      variation: 40.1,
    },
    {
      service: 'Tatuaje 300',
      sales: 2660000,
      variation: 9.5,
    },
    {
      service: 'Hora Consulta',
      sales: 2640000,
      variation: 92.7,
    },
    {
      service: 'Tatuaje 180',
      sales: 1890000,
      variation: 18.1,
    },
    {
      service: 'Piercing Lóbulo',
      sales: 1663000,
      variation: 12.0,
    },
    {
      service: 'Tatuaje 100',
      sales: 1440000,
      variation: -21.3,
    },
    {
      service: 'Tatuaje 120',
      sales: 1310000,
      variation: -35.8,
    },
    {
      service: 'Tatuaje 80',
      sales: 1220000,
      variation: 93.7,
    },
  ],
};
