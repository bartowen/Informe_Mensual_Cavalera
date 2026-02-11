import { useState, useEffect } from 'react';
import { supabase, GoogleAdsDailyMetric } from '../lib/supabase';
import { format } from 'date-fns';

interface MetricsParams {
  startDate: Date;
  endDate: Date;
  clientId?: string;
}

interface MetricsTotals {
  impressions: number;
  clicks: number;
  cost: number;
  conversions: number;
  ctr: number;
  cpa: number;
}

interface MetricsData {
  daily: GoogleAdsDailyMetric[];
  totals: MetricsTotals;
  loading: boolean;
  error: string | null;
}

export function useGoogleAdsMetrics({
  startDate,
  endDate,
  clientId = 'cavalera'
}: MetricsParams): MetricsData {
  const [data, setData] = useState<GoogleAdsDailyMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMetrics() {
      setLoading(true);
      setError(null);

      try {
        const start = format(startDate, 'yyyy-MM-dd');
        const end = format(endDate, 'yyyy-MM-dd');

        const { data: metrics, error: queryError } = await supabase
          .from('google_ads_daily')
          .select('*')
          .eq('client_id', clientId)
          .gte('date', start)
          .lte('date', end)
          .order('date', { ascending: true });

        if (queryError) throw queryError;
        setData(metrics || []);
      } catch (err: any) {
        console.error('Error fetching metrics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [startDate, endDate, clientId]);

  const totals = data.reduce(
    (acc, row) => ({
      impressions: acc.impressions + row.impressions,
      clicks: acc.clicks + row.clicks,
      cost: acc.cost + row.cost,
      conversions: acc.conversions + row.conversions,
    }),
    { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
  );

  const ctr = totals.impressions > 0 ? (totals.clicks / totals.impressions * 100) : 0;
  const cpa = totals.conversions > 0 ? (totals.cost / totals.conversions) : 0;

  return {
    daily: data,
    totals: { ...totals, ctr, cpa },
    loading,
    error
  };
}
