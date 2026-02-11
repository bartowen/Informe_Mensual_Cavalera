import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface GoogleAdsDailyMetric {
  id?: string;
  client_id: string;
  date: string;
  campaign_status: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  cpa: number;
  created_at?: string;
  updated_at?: string;
}

export interface GoogleAdsKeyword {
  id?: string;
  client_id: string;
  date: string;
  keyword: string;
  conversions: number;
  clicks: number;
  ctr: number;
  cpa: number;
}

export interface SyncLog {
  id?: string;
  client_id: string;
  source: string;
  sync_date?: string;
  status: 'success' | 'error';
  records_synced: number;
  error_message?: string;
}
