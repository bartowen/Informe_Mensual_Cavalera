import React from 'react';
import {
  Target,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Clock,
  Search,
  Award,
  Zap,
} from 'lucide-react';
import MetricTooltip from '../components/MetricTooltip';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MonthData } from '../data/allMonthsData';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface GoogleAdsPageProps {
  monthData: MonthData;
}

const GoogleAdsPage: React.FC<GoogleAdsPageProps> = ({ monthData }) => {
  const { googleAdsMetrics, topKeywords, topTerminos, topUbicaciones, mejoresHorarios, ventasResumen } = monthData;

  const roasVal = googleAdsMetrics.leads > 0 && googleAdsMetrics.costo > 0 && ventasResumen.ticket > 0
    ? (googleAdsMetrics.leads * ventasResumen.ticket) / googleAdsMetrics.costo
    : 0;
  const roas = roasVal > 0 ? roasVal.toFixed(1) : '—';
  const roasColor = roasVal >= 10 ? 'text-green-300' : roasVal >= 5 ? 'text-yellow-300' : 'text-red-300';

  const getMedal = (rank: number) => {
    switch (rank) {
      case 1: return { emoji: '🥇', color: 'bg-yellow-100 border-yellow-400' };
      case 2: return { emoji: '🥈', color: 'bg-gray-100 border-gray-400' };
      case 3: return { emoji: '🥉', color: 'bg-orange-100 border-orange-400' };
      default: return { emoji: `#${rank}`, color: 'bg-gray-50 border-gray-300' };
    }
  };

  const isLimitada = googleAdsMetrics.estado.includes('Limitada');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <img src="/logo_google_ads.png" alt="Google Ads" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Google Ads</h1>
              <p className="text-gray-500">Cavalera Tattoo &amp; Piercing — {monthData.label}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isLimitada ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
            {isLimitada ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <span className="font-semibold text-sm">{googleAdsMetrics.estado}</span>
          </div>
        </div>
      </div>

      {/* Banner nota */}
      {googleAdsMetrics.nota && (
        <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <span className="text-orange-500 text-xl flex-shrink-0">⚠️</span>
          <p className="text-orange-700 text-sm font-medium">{googleAdsMetrics.nota}</p>
        </div>
      )}

      {/* Métricas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl shadow-lg p-4 text-white">
          <div className="flex items-center gap-1 mb-2">
            <Target className="w-4 h-4" />
            <span className="text-xs text-cyan-100">
              Leads
              <MetricTooltip explanation="Leads reales del Admin Panel de Cavalera. No incluye microconversiones del CSV de Google Ads." />
            </span>
          </div>
          <p className="text-3xl font-bold">{googleAdsMetrics.leads}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Impr.</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(googleAdsMetrics.impresiones)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-2">
            <MousePointerClick className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">Clics</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(googleAdsMetrics.clics)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs text-gray-500">
              CTR
              <MetricTooltip explanation="Click Through Rate: % de personas que ven el anuncio y hacen click." />
            </span>
          </div>
          <p className="text-2xl font-bold text-green-600">{googleAdsMetrics.ctr}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              CPC
              <MetricTooltip explanation="Costo Por Click promedio pagado en Google Ads." />
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(googleAdsMetrics.cpc)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-1 mb-2">
            <Target className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-gray-500">
              CPL
              <MetricTooltip explanation="Costo Por Lead (Admin Panel): Inversión Google ÷ Leads reales." />
            </span>
          </div>
          <p className="text-xl font-bold text-purple-600">{formatCurrency(googleAdsMetrics.cpl)}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-4 text-white">
          <div className="flex items-center gap-1 mb-2">
            <Zap className="w-4 h-4" />
            <span className="text-xs text-green-100">
              ROAS
              <MetricTooltip abbr="ROAS Google" explanation="(Leads reales × Ticket promedio del período) ÷ Inversión Google Ads. Estima el valor generado por los leads del canal." />
            </span>
          </div>
          <p className={`text-2xl font-bold ${roasColor}`}>{roas}x</p>
          <p className="text-xs text-green-200 mt-1">{googleAdsMetrics.leads} leads × ${ventasResumen.ticket.toLocaleString('es-CL')}</p>
        </div>
      </div>

      {/* Info adicional: Costo + Impr. Perdidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <p className="text-sm text-gray-500 mb-1">Inversión Total del Período</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(googleAdsMetrics.costo)}</p>
        </div>
        <div className={`rounded-xl shadow-sm border p-5 ${isLimitada ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'}`}>
          <p className={`text-sm mb-1 ${isLimitada ? 'text-amber-700' : 'text-gray-500'}`}>
            Impr. Perdidas (Presupuesto)
            <MetricTooltip explanation="% de búsquedas en las que el anuncio NO apareció por presupuesto insuficiente." />
          </p>
          <p className={`text-2xl font-bold ${isLimitada ? 'text-amber-800' : 'text-gray-900'}`}>
            {googleAdsMetrics.imprPerdidasPpto}
          </p>
          {isLimitada && (
            <p className="text-xs text-amber-600 mt-1">Se pierden {googleAdsMetrics.imprPerdidasPpto} de búsquedas por presupuesto insuficiente</p>
          )}
        </div>
      </div>

      {/* Top Palabras Clave */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-semibold text-gray-900">Top Palabras Clave</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Palabra Clave</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  Conv. Real<MetricTooltip abbr="Conv. Real" explanation="Leads confirmados en el Admin Panel de Cavalera, distribuidos proporcionalmente por keyword." />
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">Clics</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  CTR<MetricTooltip abbr="CTR" explanation="Click Through Rate: % de personas que ven el anuncio y hacen clic." />
                </th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">
                  CPL<MetricTooltip abbr="CPL" explanation="Costo Por Lead. Inversión ÷ leads reales confirmados en el Admin Panel." />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topKeywords.map((kw, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[220px]">{kw.kw}</td>
                  <td className="px-4 py-3 text-right font-bold text-cyan-600">{Math.round(kw.conv)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatNumber(kw.clicks)}</td>
                  <td className="px-4 py-3 text-right text-gray-600">{kw.ctr}%</td>
                  <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(kw.cpa)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Términos de Búsqueda + Top Ubicaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Términos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center gap-3">
            <Search className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900">Top Términos de Búsqueda</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Término</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">
                    Conv.<MetricTooltip abbr="Conv. Real" explanation="Leads confirmados en el Admin Panel de Cavalera, distribuidos proporcionalmente por término de búsqueda." />
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Clics</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">CPL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topTerminos.map((t, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[180px]">{t.term}</td>
                    <td className="px-4 py-3 text-right font-bold text-purple-600">{Math.round(t.conv)}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{t.clicks}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(t.cpa)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gráfico Términos CPA */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">CPA por Término (Top)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topTerminos.slice(0, 6)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="term" type="category" tick={{ fontSize: 10 }} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: number) => [formatCurrency(value), 'CPA']}
                />
                <Bar dataKey="cpa" fill="#a855f7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ranking por Ubicación */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900">Ranking por Ubicación</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topUbicaciones.map((loc, idx) => {
            const rank = idx + 1;
            const medal = getMedal(rank);
            return (
              <div key={idx} className={`border-2 rounded-xl p-4 ${medal.color}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{medal.emoji}</span>
                  <span className="text-xs text-gray-500">#{rank}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{loc.lugar}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Conversiones</p>
                    <p className="font-bold text-cyan-600">{Math.round(loc.conv)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Clics</p>
                    <p className="font-semibold text-gray-700">{loc.clicks}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">CTR</p>
                    <p className="font-semibold text-green-600">{loc.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">CPA</p>
                    <p className="font-semibold text-gray-700">{formatCurrency(loc.cpa)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mejores Horarios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900">Mejores Horarios</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Día</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Horario</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">
                  Conv.<MetricTooltip abbr="Conv. Real" explanation="Leads confirmados en el Admin Panel de Cavalera, distribuidos proporcionalmente por franja horaria." />
                </th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Tasa Conv.</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">
                  CPC<MetricTooltip abbr="CPC" explanation="Costo Por Clic promedio pagado en esta franja horaria." />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mejoresHorarios.map((h, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{h.dia}</td>
                  <td className="px-6 py-4 text-gray-600">{h.hora}</td>
                  <td className="px-6 py-4 text-right font-bold text-cyan-600">{Math.round(h.conv)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-semibold text-green-600">{h.tasa}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(h.cpc)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campañas — info consolidada */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Award className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-semibold text-gray-900">Resumen de Campaña</h2>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Campaña</p>
            <p className="font-semibold text-gray-900 text-sm">Cavalera Search — Towen Ads</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Estado</p>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${isLimitada ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
              {isLimitada ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              {googleAdsMetrics.estado}
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Impr. perdidas (ppto.)</p>
            <p className="font-bold text-amber-600">{googleAdsMetrics.imprPerdidasPpto}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Leads (Admin Panel)</p>
            <p className="font-bold text-cyan-600 text-xl">{googleAdsMetrics.leads}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
