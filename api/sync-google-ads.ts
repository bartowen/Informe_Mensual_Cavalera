import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL!;

interface DailyMetric {
  date: string;
  campaign_status: string;
  impressions: number;
  clicks: number;
  ctr: number;
  cost: number;
  conversions: number;
  cpa: number;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    console.log('[Sync] Iniciando sincronización...');

    const response = await fetch(`${GOOGLE_SCRIPT_URL}?sheet=Cavalera_Por_Dia`);
    if (!response.ok) throw new Error(`Google Sheets error: ${response.status}`);

    const rawData: any[] = await response.json();

    // FILTRO: Solo desde febrero 2026
    const CUTOFF_DATE = new Date('2026-02-01');

    const metrics: DailyMetric[] = rawData
      .filter((row: any) => {
        if (!row.date || row.date === 'Day') return false;
        const rowDate = new Date(row.date);
        if (rowDate < CUTOFF_DATE) return false;
        return row.conversions !== undefined && !isNaN(parseFloat(row.conversions));
      })
      .map((row: any) => ({
        date: formatDate(row.date),
        campaign_status: row.campaign_status || 'Enabled',
        impressions: parseInt(row.impressions) || 0,
        clicks: parseInt(row.clicks) || 0,
        ctr: parseFloat(row.ctr) || 0,
        cost: parseFloat(row.cost) || 0,
        conversions: parseInt(row.conversions) || 0,
        cpa: parseFloat(row.cpa) || 0,
      }));

    console.log(`[Sync] Parsed ${metrics.length} records (desde feb 2026)`);

    const { error } = await supabase
      .from('google_ads_daily')
      .upsert(
        metrics.map(m => ({
          client_id: 'cavalera',
          ...m,
          updated_at: new Date().toISOString()
        })),
        { onConflict: 'client_id,date', ignoreDuplicates: false }
      );

    if (error) throw error;

    await supabase.from('sync_log').insert({
      client_id: 'cavalera',
      source: 'google_ads',
      status: 'success',
      records_synced: metrics.length
    });

    console.log(`[Sync] Completado`);

    return new Response(
      JSON.stringify({ success: true, records_synced: metrics.length }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('[Sync] Error:', error);

    await supabase.from('sync_log').insert({
      client_id: 'cavalera',
      source: 'google_ads',
      status: 'error',
      records_synced: 0,
      error_message: error.message
    });

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function formatDate(dateStr: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) throw new Error(`Invalid date: ${dateStr}`);
  return date.toISOString().split('T')[0];
}
