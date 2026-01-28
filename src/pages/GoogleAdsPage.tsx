import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  Eye,
  MousePointerClick,
  Send,
  CreditCard,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { useCavaleraMetrics, DailyMetric, HourlyMetric, DeviceMetric } from '../hooks/useCavaleraMetrics';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatCurrency, formatNumber } from '../utils/formatters';

// Componente para el tooltip personalizado del gráfico
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-[#3bc6dc] font-bold text-lg">
          {payload[0].value} {payload[0].value === 1 ? 'formulario' : 'formularios'}
        </p>
      </div>
    );
  }
  return null;
};

// Componente para el gráfico de conversiones diarias
const DailyConversionsChart: React.FC<{ data: DailyMetric[]; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Conversiones por Día</h2>
          <p className="text-sm text-gray-500 mt-1">Formularios recibidos durante el mes</p>
        </div>
        <div className="bg-cyan-100 p-2 rounded-lg">
          <BarChart3 className="w-5 h-5 text-[#3bc6dc]" />
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3bc6dc" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3bc6dc" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="dayFormatted"
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              interval={2}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="#3bc6dc"
              strokeWidth={3}
              fill="url(#colorConversions)"
              dot={{ fill: '#3bc6dc', strokeWidth: 2, r: 4, stroke: '#fff' }}
              activeDot={{ r: 6, fill: '#21a9c2', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Componente para la sección de mejores horas
const BestHoursSection: React.FC<{ data: HourlyMetric[]; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Ordenar por conversiones y tomar top 5
  const topHours = [...data]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 5);

  if (topHours.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Mejores Horas</h3>
          <p className="text-sm text-gray-500">Horarios con más conversiones</p>
        </div>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">Hora</th>
              <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Conv.</th>
              <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Clics</th>
              <th className="text-right py-2 text-xs font-semibold text-gray-500 uppercase">Tasa</th>
            </tr>
          </thead>
          <tbody>
            {topHours.map((hour, index) => (
              <tr key={hour.hour} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-amber-100 text-amber-700' :
                      index === 1 ? 'bg-gray-100 text-gray-600' :
                      index === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {hour.hour.split(' - ')[0]}
                    </span>
                  </div>
                </td>
                <td className="py-3 text-right">
                  <span className="font-bold text-[#3bc6dc]">{hour.conversions}</span>
                </td>
                <td className="py-3 text-right text-sm text-gray-600">{hour.clicks}</td>
                <td className="py-3 text-right">
                  <span className={`text-sm font-medium ${
                    hour.conversionRate > 12 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {hour.conversionRate.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente para el rendimiento por dispositivo
const DevicePerformance: React.FC<{ data: DeviceMetric[]; loading: boolean }> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return null;
  }

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Computers':
        return <Monitor className="w-6 h-6" />;
      case 'Mobile phones':
        return <Smartphone className="w-6 h-6" />;
      case 'Tablets':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
  };

  const getDeviceColor = (device: string) => {
    switch (device) {
      case 'Computers':
        return 'from-blue-500 to-blue-600';
      case 'Mobile phones':
        return 'from-purple-500 to-purple-600';
      case 'Tablets':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Por Dispositivo</h3>
          <p className="text-sm text-gray-500">Rendimiento según tipo de dispositivo</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((device) => (
          <div
            key={device.device}
            className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`bg-gradient-to-br ${getDeviceColor(device.device)} text-white p-2 rounded-lg`}>
                {getDeviceIcon(device.device)}
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full">
                {device.percentage.toFixed(0)}%
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{device.deviceName}</p>
            <p className="text-2xl font-bold text-gray-900">{device.conversions}</p>
            <p className="text-xs text-gray-500">formularios</p>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between text-xs">
              <span className="text-gray-500">
                CTR: <span className="font-medium text-gray-700">{device.ctr.toFixed(1)}%</span>
              </span>
              <span className="text-gray-500">
                Costo: <span className="font-medium text-gray-700">{formatCurrency(device.cost)}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const GoogleAdsPage: React.FC = () => {
  // Cargar datos de todos los reportes
  const {
    metrics,
    campaigns,
    loading: loadingGeneral,
    error: errorGeneral,
    refetch: refetchGeneral,
  } = useCavaleraMetrics('Cavalera_Metricas_Generales');

  const { dailyData, loading: loadingDaily } = useCavaleraMetrics('Cavalera_Por_Dia');
  const { hourlyData, loading: loadingHourly } = useCavaleraMetrics('Cavalera_Por_Hora');
  const { deviceData, loading: loadingDevice } = useCavaleraMetrics('Cavalera_Dispositivos');

  if (loadingGeneral) {
    return <LoadingSpinner message="Cargando datos de Google Ads..." />;
  }

  if (errorGeneral) {
    return <ErrorMessage message={errorGeneral} onRetry={refetchGeneral} />;
  }

  // Extraer métricas
  const totalImpressions = metrics?.totalImpressions || 0;
  const totalClicks = metrics?.totalClicks || 0;
  const totalConversions = Math.round(metrics?.totalConversions || 0);
  const totalCost = metrics?.totalCost || 0;
  const averageCTR = metrics?.averageCTR || 0;
  const averageCPA = metrics?.averageCPA || 0;
  const conversionRate = metrics?.conversionRate || 0;

  // Estimar presupuesto (10% más que el gasto)
  const totalBudget = totalCost * 1.1;
  const budgetUsage = totalBudget > 0 ? (totalCost / totalBudget) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3">
              <img
                src="/logo_google_ads.png"
                alt="Google Ads"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Google Ads</h1>
              <p className="text-gray-500">
                Cavalera Search - Towen Ads · Enero 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
              Datos Verificados
            </div>
          </div>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Formularios - Card Principal */}
        <div className="col-span-2 md:col-span-1 md:row-span-2 bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-cyan-100 text-sm font-medium">Formularios</span>
            <div className="bg-white/20 rounded-full p-2">
              <Send className="w-6 h-6" />
            </div>
          </div>
          <div className="text-5xl font-bold mb-2">{totalConversions}</div>
          <div className="text-sm text-cyan-100 mb-4">
            CPA: {formatCurrency(averageCPA)}
          </div>
          <div className="border-t border-white/20 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-100">Tasa conversión</span>
              <span className="font-semibold">{conversionRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyan-100">De {formatNumber(totalClicks)} clics</span>
              <span className="font-semibold">{totalConversions} forms</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm bg-white/10 rounded-lg px-3 py-2">
            <TrendingUp className="w-4 h-4" />
            <span>Excelente rendimiento</span>
          </div>
        </div>

        {/* Presupuesto */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">Presupuesto</span>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            {formatCurrency(totalBudget)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Mensual estimado</div>
        </div>

        {/* Gastado */}
        <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">Gastado</span>
            <CreditCard className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-blue-600">
            {formatCurrency(totalCost)}
          </div>
          <div className="text-xs text-blue-600 font-medium mt-1">
            {budgetUsage.toFixed(1)}% usado
          </div>
        </div>

        {/* Impresiones */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">Impresiones</span>
            <Eye className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            {formatNumber(totalImpressions)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Alcance total</div>
        </div>

        {/* Clics */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-500 text-sm">Clics</span>
            <MousePointerClick className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">
            {formatNumber(totalClicks)}
          </div>
          <div className="text-xs text-gray-500 mt-1">Interacciones</div>
        </div>

        {/* CTR - Expandido */}
        <div className="col-span-2 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-5 border-2 border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-emerald-700 text-sm font-medium mb-1">CTR</div>
              <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                {averageCTR.toFixed(2)}%
              </div>
            </div>
            <div className="hidden md:block h-12 w-px bg-emerald-200 mx-4" />
            <div className="text-right">
              <div className="text-emerald-700 text-sm mb-1">vs Promedio sector</div>
              <div className="text-lg md:text-xl font-semibold text-emerald-900">
                {averageCTR > 6 ? '2-3x mejor' : averageCTR > 3 ? 'Por encima' : 'Normal'}
              </div>
            </div>
            <div className="bg-emerald-500 rounded-full p-2 ml-2">
              <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico de Conversiones Diarias */}
      <DailyConversionsChart data={dailyData} loading={loadingDaily} />

      {/* Tabla de Campañas */}
      {campaigns.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Campañas</h2>
            <p className="text-sm text-gray-500 mt-1">
              Rendimiento por campaña activa
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Campaña
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Impresiones
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Clics
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    CTR
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Costo
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    Conversiones
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                    CPA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {campaign.campaignName}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {formatNumber(campaign.impressions)}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {formatNumber(campaign.clicks)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-medium ${campaign.ctr > 5 ? 'text-green-600' : 'text-gray-600'}`}>
                        {campaign.ctr.toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600">
                      {formatCurrency(campaign.cost)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-[#3bc6dc]">
                        {Math.round(campaign.conversions)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">
                      {formatCurrency(campaign.cpa)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sección de Insights */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#3bc6dc] p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Insights</h2>
            <p className="text-sm text-gray-500">Análisis detallado del rendimiento</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BestHoursSection data={hourlyData} loading={loadingHourly} />
          <DevicePerformance data={deviceData} loading={loadingDevice} />
        </div>
      </div>

      {/* Métricas Adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Costo por Formulario */}
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-6 h-6 text-indigo-600" />
            <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold">
              CPA
            </span>
          </div>
          <div className="text-3xl font-bold text-indigo-900 mb-2">
            {formatCurrency(averageCPA)}
          </div>
          <div className="text-sm text-gray-600">Costo por Formulario</div>
          <div className="text-xs text-gray-500 mt-2">
            {formatCurrency(totalCost)} ÷ {totalConversions} conversiones
          </div>
        </div>

        {/* ROI Estimado */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-6 h-6 text-amber-600" />
            <span className="bg-amber-200 text-amber-800 text-xs px-2 py-1 rounded-full font-semibold">
              Proyección
            </span>
          </div>
          <div className="text-3xl font-bold text-amber-900 mb-2">
            ~{((totalConversions * 50000 - totalCost) / totalCost * 100).toFixed(0)}%
          </div>
          <div className="text-sm text-amber-700">ROI Estimado</div>
          <div className="text-xs text-amber-600 mt-2">
            Basado en ticket promedio $50.000
          </div>
        </div>

        {/* Ingresos Estimados */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-6 h-6 text-orange-600" />
            <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full font-semibold">
              Estimación
            </span>
          </div>
          <div className="text-3xl font-bold text-orange-900 mb-2">
            ~{formatCurrency(totalConversions * 50000)}
          </div>
          <div className="text-sm text-orange-700">Ingresos Estimados</div>
          <div className="text-xs text-orange-600 mt-2">
            {totalConversions} formularios × $50.000
          </div>
        </div>
      </div>

      {/* Footer con info del API */}
      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">
          Datos del API
        </h3>
        <div className="text-xs text-gray-500 flex flex-wrap gap-4">
          <span>Métricas generales: {campaigns.length} campañas</span>
          <span>Datos diarios: {dailyData.length} días</span>
          <span>Datos por hora: {hourlyData.length} horas</span>
          <span>Dispositivos: {deviceData.length} tipos</span>
        </div>
      </div>
    </div>
  );
};

export default GoogleAdsPage;
