/**
 * Utilidades para procesar datos de CSV de Google Ads
 *
 * Este archivo contiene funciones de ejemplo para procesar
 * los archivos CSV exportados de Google Ads.
 */

import {
  CampaignData,
  TimeSeriesData,
  KeywordData,
  SearchTermData,
  LocationData,
  ScheduleData,
} from '../types';

/**
 * Ejemplo: Parsear CSV de campaña
 *
 * Formato esperado del CSV:
 * Campaign,Status,Budget,Impressions,Clicks,Conversions,Cost
 */
export function parseCampaignCSV(csvText: string): CampaignData[] {
  const lines = csvText.split('\n');
  const data: CampaignData[] = [];

  // Saltar header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    const impressions = parseInt(values[3]) || 0;
    const clicks = parseInt(values[4]) || 0;
    const conversions = parseInt(values[5]) || 0;
    const cost = parseFloat(values[6]) || 0;

    data.push({
      campaignName: values[0],
      status: values[1] as 'Active' | 'Paused' | 'Removed',
      budget: parseFloat(values[2]) || 0,
      impressions,
      clicks,
      conversions,
      cost,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpc: clicks > 0 ? cost / clicks : 0,
      cpa: conversions > 0 ? cost / conversions : 0,
      conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
    });
  }

  return data;
}

/**
 * Ejemplo: Parsear CSV de serie temporal
 *
 * Formato esperado:
 * Date,Impressions,Clicks,Conversions,Cost
 */
export function parseTimeSeriesCSV(csvText: string): TimeSeriesData[] {
  const lines = csvText.split('\n');
  const data: TimeSeriesData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    const impressions = parseInt(values[1]) || 0;
    const clicks = parseInt(values[2]) || 0;
    const conversions = parseInt(values[3]) || 0;
    const cost = parseFloat(values[4]) || 0;

    data.push({
      date: values[0],
      impressions,
      clicks,
      conversions,
      cost,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
    });
  }

  return data;
}

/**
 * Ejemplo: Parsear CSV de palabras clave
 */
export function parseKeywordsCSV(csvText: string): KeywordData[] {
  const lines = csvText.split('\n');
  const data: KeywordData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    const impressions = parseInt(values[2]) || 0;
    const clicks = parseInt(values[3]) || 0;
    const conversions = parseInt(values[4]) || 0;
    const cost = parseFloat(values[5]) || 0;

    data.push({
      keyword: values[0],
      matchType: values[1],
      impressions,
      clicks,
      conversions,
      cost,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpa: conversions > 0 ? cost / conversions : 0,
      qualityScore: parseInt(values[6]) || undefined,
    });
  }

  return data;
}

/**
 * Ejemplo: Parsear CSV de términos de búsqueda
 */
export function parseSearchTermsCSV(csvText: string): SearchTermData[] {
  const lines = csvText.split('\n');
  const data: SearchTermData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    const impressions = parseInt(values[1]) || 0;
    const clicks = parseInt(values[2]) || 0;
    const conversions = parseInt(values[3]) || 0;
    const cost = parseFloat(values[4]) || 0;

    data.push({
      searchTerm: values[0],
      impressions,
      clicks,
      conversions,
      cost,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      conversionRate: clicks > 0 ? (conversions / clicks) * 100 : 0,
    });
  }

  return data;
}

/**
 * Ejemplo: Parsear CSV de ubicaciones
 */
export function parseLocationsCSV(csvText: string): LocationData[] {
  const lines = csvText.split('\n');
  const data: LocationData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    const impressions = parseInt(values[1]) || 0;
    const clicks = parseInt(values[2]) || 0;
    const conversions = parseInt(values[3]) || 0;
    const cost = parseFloat(values[4]) || 0;

    data.push({
      location: values[0],
      impressions,
      clicks,
      conversions,
      cost,
      ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
      cpa: conversions > 0 ? cost / conversions : 0,
    });
  }

  return data;
}

/**
 * Ejemplo: Parsear CSV de programación
 */
export function parseScheduleCSV(csvText: string): ScheduleData[] {
  const lines = csvText.split('\n');
  const data: ScheduleData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');

    data.push({
      dayOfWeek: values[0],
      hour: parseInt(values[1]) || 0,
      impressions: parseInt(values[2]) || 0,
      clicks: parseInt(values[3]) || 0,
      conversions: parseInt(values[4]) || 0,
      cost: parseFloat(values[5]) || 0,
    });
  }

  return data;
}

/**
 * Función helper para leer archivo CSV
 * Uso en el navegador con File API
 */
export function readCSVFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      resolve(text);
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };

    reader.readAsText(file);
  });
}

/**
 * Ejemplo de uso:
 *
 * const fileInput = document.querySelector('input[type="file"]');
 * fileInput.addEventListener('change', async (e) => {
 *   const file = e.target.files[0];
 *   const csvText = await readCSVFile(file);
 *   const campaigns = parseCampaignCSV(csvText);
 *   console.log(campaigns);
 * });
 */
