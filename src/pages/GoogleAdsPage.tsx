import React from 'react';
import {
  Target,
  Eye,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  MapPin,
  Clock,
  Users,
  Search,
  Award,
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
  googleAdsMetrics,
  googleDailyConversions,
  topKeywords,
  topSearchTerms,
  topLocations,
  bestHours,
  googleDemographics,
  googleCampaigns,
  formatCurrency,
  formatNumber,
  formatDate,
} from '../data/cavaleraData';

const GoogleAdsPage: React.FC = () => {
  const getMedal = (rank: number) => {
    switch (rank) {
      case 1: return { emoji: '🥇', color: 'bg-yellow-100 border-yellow-400' };
      case 2: return { emoji: '🥈', color: 'bg-gray-100 border-gray-400' };
      case 3: return { emoji: '🥉', color: 'bg-orange-100 border-orange-400' };
      default: return { emoji: `#${rank}`, color: 'bg-gray-50 border-gray-300' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-3">
              <img
                src="/logo_google_ads.png"
                alt="Google Ads"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Google Ads</h1>
              <p className="text-gray-500">Cavalera Tattoo & Piercing - Enero 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Datos Verificados</span>
          </div>
        </div>
      </div>

      {/* Métricas Principales - 6 Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl shadow-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-xs text-cyan-100">Conversiones</span>
          </div>
          <p className="text-3xl font-bold">{googleAdsMetrics.conversiones}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Impresiones</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(googleAdsMetrics.impresiones)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MousePointerClick className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Clics</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatNumber(googleAdsMetrics.clics)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-500">CTR</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{googleAdsMetrics.ctr}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-500">Costo</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(googleAdsMetrics.costo)}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-500">CPA</span>
          </div>
          <p className="text-xl font-bold text-purple-600">{formatCurrency(googleAdsMetrics.costoPorConversion)}</p>
        </div>
      </div>

      {/* Gráfico - Conversiones Diarias */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Conversiones Diarias</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={googleDailyConversions}>
              <defs>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3bc6dc" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3bc6dc" stopOpacity={0}/>
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
                stroke="#3bc6dc"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorConversions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Palabras Clave y Términos de Búsqueda */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Conv.</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">CTR</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">CPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topKeywords.map((kw, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[200px]">
                      {kw.keyword}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-cyan-600">{kw.conversions}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{kw.ctr}%</td>
                    <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(kw.costPerConv)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Términos de Búsqueda */}
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
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Conv.</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Clics</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">CTR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topSearchTerms.map((term, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900 truncate max-w-[200px]">
                      {term.term}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-purple-600">{term.conversions}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{term.clicks}</td>
                    <td className="px-4 py-3 text-right text-gray-600">{term.ctr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          {topLocations.map((loc) => {
            const medal = getMedal(loc.rank);
            return (
              <div
                key={loc.rank}
                className={`border-2 rounded-xl p-4 ${medal.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{medal.emoji}</span>
                  <span className="text-xs text-gray-500">#{loc.rank}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{loc.location}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Conversiones</p>
                    <p className="font-bold text-cyan-600">{loc.conversions}</p>
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
                    <p className="font-semibold text-gray-700">{formatCurrency(loc.costPerConv)}</p>
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
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Conv.</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Clics</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Conv. Rate</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bestHours.map((hour, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{hour.day}</td>
                  <td className="px-6 py-4 text-gray-600">{hour.hour}</td>
                  <td className="px-6 py-4 text-right font-bold text-cyan-600">{hour.conversions}</td>
                  <td className="px-6 py-4 text-right text-gray-600">{hour.clicks}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold ${hour.convRate >= 30 ? 'text-green-600' : 'text-gray-600'}`}>
                      {hour.convRate.toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">{formatCurrency(hour.cpc)}</td>
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
                    data={googleDemographics.gender}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="percentage"
                    nameKey="label"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#ec4899" />
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {googleDemographics.gender.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: idx === 0 ? '#3b82f6' : '#ec4899' }}
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
              <BarChart data={googleDemographics.age} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="range" type="category" tick={{ fontSize: 12 }} width={60} />
                <Tooltip
                  formatter={(value: number, name: string) => {
                    if (name === 'conversions') return [value, 'Conversiones'];
                    return [value, name];
                  }}
                />
                <Bar dataKey="conversions" fill="#3bc6dc" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabla Campañas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center gap-3">
          <Award className="w-5 h-5 text-cyan-500" />
          <h2 className="text-lg font-semibold text-gray-900">Campañas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Campaña</th>
                <th className="text-center px-4 py-4 font-semibold text-gray-600">Estado</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Impresiones</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Clics</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">CTR</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Costo</th>
                <th className="text-right px-4 py-4 font-semibold text-gray-600">Conv.</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">CPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {googleCampaigns.map((campaign, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{campaign.name}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(campaign.impressions)}</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatNumber(campaign.clicks)}</td>
                  <td className="px-4 py-4 text-right text-green-600 font-medium">{campaign.ctr}%</td>
                  <td className="px-4 py-4 text-right text-gray-600">{formatCurrency(campaign.cost)}</td>
                  <td className="px-4 py-4 text-right font-bold text-cyan-600">{campaign.conversions}</td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">{formatCurrency(campaign.costPerConv)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
