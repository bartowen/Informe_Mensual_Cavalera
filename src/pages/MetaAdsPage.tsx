import React from 'react';
import {
  Target,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Users,
  Megaphone,
  PlayCircle,
  Repeat,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  metaAdsMetrics,
  metaDailyConversions,
  metaAdSets,
  metaTopAds,
  metaDemographics,
  formatCurrency,
  formatNumber,
  formatDate,
} from '../data/cavaleraData';

const MetaAdsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl p-3">
              <img
                src="/logo_meta_.png"
                alt="Meta Ads"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
              <p className="text-gray-500">Cavalera Tattoo & Piercing - Enero 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Datos Verificados</span>
          </div>
        </div>
      </div>

      {/* Métricas Principales - 8 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-xs text-purple-100">Conversiones</span>
          </div>
          <p className="text-3xl font-bold">{metaAdsMetrics.conversiones}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Impresiones</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatNumber(metaAdsMetrics.impresiones)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MousePointerClick className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Clics</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(metaAdsMetrics.clics)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">CTR</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{metaAdsMetrics.ctr}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Costo</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(metaAdsMetrics.costo)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-red-500" />
            <span className="text-xs text-gray-500">CPA</span>
          </div>
          <p className="text-xl font-bold text-red-600">{formatCurrency(metaAdsMetrics.costoPorConversion)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-500">Alcance</span>
          </div>
          <p className="text-xl font-bold text-blue-600">{formatNumber(metaAdsMetrics.alcance)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Repeat className="w-5 h-5 text-orange-500" />
            <span className="text-xs text-gray-500">Frecuencia</span>
          </div>
          <p className="text-2xl font-bold text-orange-600">{metaAdsMetrics.frecuencia}</p>
        </div>
      </div>

      {/* Gráfico - Conversiones Diarias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Conversiones Diarias</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metaDailyConversions}>
              <defs>
                <linearGradient id="colorMetaConv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => formatDate(value)}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelFormatter={(value) => formatDate(value)}
                formatter={(value: number, name: string) => {
                  const labels: Record<string, string> = {
                    conversions: 'Conversiones',
                    clicks: 'Clics',
                    cost: 'Costo',
                  };
                  if (name === 'cost') return [formatCurrency(value), labels[name]];
                  return [value, labels[name]];
                }}
              />
              <Area
                type="monotone"
                dataKey="conversions"
                name="conversions"
                stroke="#a855f7"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMetaConv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Conjuntos de Anuncios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900">Conjuntos de Anuncios</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Conjunto</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Conv.</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Alcance</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Impresiones</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Clics</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">CTR</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Costo</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {metaAdSets.map((adSet, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 max-w-[200px] truncate">
                    {adSet.name}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-purple-600">{adSet.conversions}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(adSet.reach)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(adSet.impressions)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(adSet.clicks)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{adSet.ctr}%</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(adSet.cost)}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{formatCurrency(adSet.costPerConv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Anuncios */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <PlayCircle className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg font-semibold text-gray-900">Top Anuncios</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Anuncio</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Conv.</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Impresiones</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Clics</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">CTR</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">CPC</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Costo</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {metaTopAds.map((ad, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <span className="font-medium text-gray-900">{ad.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-purple-600">{ad.conversions}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(ad.impressions)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(ad.clicks)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{ad.ctr}%</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(ad.cpc)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(ad.cost)}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{formatCurrency(ad.costPerConv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demografía */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Por Género */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900">Conversiones por Género</h2>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metaDemographics.gender}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="percentage"
                    nameKey="label"
                  >
                    <Cell fill="#ec4899" />
                    <Cell fill="#3b82f6" />
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {metaDemographics.gender.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: idx === 0 ? '#ec4899' : '#3b82f6' }}
                  />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.conversions} conv. ({item.percentage}%)</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Por Edad */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900">Conversiones por Edad</h2>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metaDemographics.age} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="range" type="category" tick={{ fontSize: 12 }} width={60} />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'conversions') return [value, 'Conversiones'];
                    return [value, name];
                  }}
                />
                <Bar dataKey="conversions" fill="#a855f7" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Comparativa con Google Ads */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Comparativa vs Google Ads</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Costo por Lead</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-red-400">{formatCurrency(metaAdsMetrics.costoPorConversion)}</span>
              <span className="text-sm text-gray-400">vs $2.337</span>
            </div>
            <p className="text-xs text-red-400 mt-1">7.4x más caro que Google</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">CTR</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-orange-400">{metaAdsMetrics.ctr}%</span>
              <span className="text-sm text-gray-400">vs 10.26%</span>
            </div>
            <p className="text-xs text-orange-400 mt-1">11.4x menor que Google</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Conversiones</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-purple-400">{metaAdsMetrics.conversiones}</span>
              <span className="text-sm text-gray-400">vs 215</span>
            </div>
            <p className="text-xs text-purple-400 mt-1">13% del total de formularios</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaAdsPage;
