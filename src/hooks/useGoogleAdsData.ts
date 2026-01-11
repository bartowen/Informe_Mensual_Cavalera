/**
 * Hook personalizado para consumir datos de Google Ads desde la API backend
 * Cavalera Tattoo & Piercing Dashboard
 */

import { useState, useEffect } from 'react';
import {
  CampaignData,
  TimeSeriesData,
  KeywordData,
  SearchTermData,
  LocationData,
  DeviceData,
  DayOfWeekData,
  HourOfDayData,
  DemographicBySex,
  DemographicByAge,
  ScheduleData,
} from '../types';

interface GoogleAdsMonthlyData {
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

interface ApiResponse {
  success: boolean;
  data?: GoogleAdsMonthlyData;
  error?: string;
  message?: string;
}

interface UseGoogleAdsDataReturn {
  data: GoogleAdsMonthlyData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook para obtener datos de Google Ads de un mes específico
 * @param year - Año (ej: 2025)
 * @param month - Mes (1-12)
 * @param apiUrl - URL base de la API (por defecto usa variable de entorno)
 */
export function useGoogleAdsData(
  year: number,
  month: number,
  apiUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3001'
): UseGoogleAdsDataReturn {
  const [data, setData] = useState<GoogleAdsMonthlyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiUrl}/api/google-ads/${year}/${month}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error desconocido al obtener datos');
      }

      setData(result.data || null);
    } catch (err: any) {
      console.error('Error al cargar datos de Google Ads:', err);
      setError(err.message || 'Error al conectar con la API');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year, month, apiUrl]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

/**
 * Hook para obtener la lista de meses disponibles en cache
 */
export function useAvailableMonths(apiUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3001') {
  const [months, setMonths] = useState<Array<{ year: number; month: number; file: string }>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonths = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/api/months`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setMonths(result.data);
        }
      } catch (err: any) {
        console.error('Error al cargar meses disponibles:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonths();
  }, [apiUrl]);

  return { months, loading, error };
}

/**
 * Hook para refrescar datos (forzar actualización desde Google Ads API)
 */
export function useRefreshGoogleAds(apiUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:3001') {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (year: number, month: number): Promise<boolean> => {
    try {
      setRefreshing(true);
      setError(null);

      const response = await fetch(`${apiUrl}/api/google-ads/refresh/${year}/${month}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error al refrescar datos');
      }

      return true;
    } catch (err: any) {
      console.error('Error al refrescar datos:', err);
      setError(err.message);
      return false;
    } finally {
      setRefreshing(false);
    }
  };

  return { refresh, refreshing, error };
}
