import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const startDate = url.searchParams.get('start');
  const endDate = url.searchParams.get('end');
  const clientId = url.searchParams.get('client') || 'cavalera';

  if (!startDate || !endDate) {
    return new Response(
      JSON.stringify({ error: 'Missing start and end parameters' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { data, error } = await supabase
      .from('google_ads_daily')
      .select('*')
      .eq('client_id', clientId)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });

    if (error) throw error;

    const totals = (data || []).reduce(
      (acc, row) => ({
        impressions: acc.impressions + row.impressions,
        clicks: acc.clicks + row.clicks,
        cost: acc.cost + row.cost,
        conversions: acc.conversions + row.conversions,
      }),
      { impressions: 0, clicks: 0, cost: 0, conversions: 0 }
    );

    const ctr = totals.impressions > 0
      ? (totals.clicks / totals.impressions * 100).toFixed(2)
      : '0.00';

    const cpa = totals.conversions > 0
      ? (totals.cost / totals.conversions).toFixed(2)
      : '0.00';

    return new Response(
      JSON.stringify({
        period: { start: startDate, end: endDate, days: (data || []).length },
        daily: data || [],
        totals: { ...totals, ctr: parseFloat(ctr), cpa: parseFloat(cpa) }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300'
        }
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
