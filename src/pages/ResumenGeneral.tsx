import React from 'react';
import {
  DollarSign,
  FileText,
  TrendingUp,
  Target,
  ArrowRight,
} from 'lucide-react';
import { useCavaleraMetrics } from '../hooks/useCavaleraMetrics';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { formatCurrency, formatNumber } from '../utils/formatters';

interface ResumenGeneralProps {
  onNavigate: (tab: string) => void;
}

const ResumenGeneral: React.FC<ResumenGeneralProps> = ({ onNavigate }) => {
  const { metrics, loading, error, refetch } = useCavaleraMetrics();

  if (loading) {
    return <LoadingSpinner message="Cargando resumen..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  // Calcular métricas para el resumen
  const googleAdsData = {
    inversion: metrics?.totalCost || 0,
    formularios: Math.round(metrics?.totalConversions || 0),
    costoPorLead: metrics?.averageCPA || 0,
    impresiones: metrics?.totalImpressions || 0,
    clics: metrics?.totalClicks || 0,
    ctr: metrics?.averageCTR || 0,
  };

  // Meta Ads placeholder (sin datos reales aún)
  const metaAdsData = {
    inversion: 0,
    formularios: 0,
    costoPorLead: 0,
  };

  // Totales combinados
  const totales = {
    inversion: googleAdsData.inversion + metaAdsData.inversion,
    formularios: googleAdsData.formularios + metaAdsData.formularios,
    costoPorLead: googleAdsData.formularios > 0
      ? googleAdsData.inversion / googleAdsData.formularios
      : 0,
  };

  // ROI estimado (asumiendo ticket promedio de $50.000)
  const ticketPromedio = 50000;
  const ingresosEstimados = totales.formularios * ticketPromedio;
  const roi = totales.inversion > 0
    ? ((ingresosEstimados - totales.inversion) / totales.inversion) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resumen General</h1>
            <p className="text-gray-500 mt-1">
              Cavalera Tattoo & Piercing · Enero 2026
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white px-4 py-2 rounded-lg">
            <span className="font-semibold">Datos Actualizados</span>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inversión Total */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Inversión Total</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {formatCurrency(totales.inversion)}
          </p>
          <p className="text-xs text-gray-400 mt-2">Google Ads + Meta Ads</p>
        </div>

        {/* Formularios */}
        <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-cyan-100 text-sm">Formularios Totales</p>
          <p className="text-4xl font-bold mt-1">{totales.formularios}</p>
          <p className="text-xs text-cyan-100 mt-2">Leads generados</p>
        </div>

        {/* Costo por Lead */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Costo por Lead</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {formatCurrency(totales.costoPorLead)}
          </p>
          <p className="text-xs text-gray-400 mt-2">CPA promedio</p>
        </div>

        {/* ROI Estimado */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">ROI Estimado</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {roi.toFixed(0)}%
          </p>
          <p className="text-xs text-gray-400 mt-2">Retorno sobre inversión</p>
        </div>
      </div>

      {/* Tabla Resumen por Canal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Rendimiento por Canal</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Canal</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Inversión</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Formularios</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Costo/Lead</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Google Ads */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <img
                        src="/logo_google_ads.png"
                        alt="Google Ads"
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Google Ads</p>
                      <p className="text-xs text-gray-500">Búsqueda pagada</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  {formatCurrency(googleAdsData.inversion)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-bold text-[#3bc6dc] text-lg">
                    {googleAdsData.formularios}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-900">
                  {formatCurrency(googleAdsData.costoPorLead)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                </td>
              </tr>

              {/* Meta Ads */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg p-2">
                      <img
                        src="/logo_meta_.png"
                        alt="Meta Ads"
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Meta Ads</p>
                      <p className="text-xs text-gray-500">Facebook & Instagram</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-400">
                  -
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-medium text-gray-400">-</span>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-400">
                  -
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                    Próximamente
                  </span>
                </td>
              </tr>

              {/* Total */}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 text-gray-900">Total</td>
                <td className="px-6 py-4 text-right text-gray-900">
                  {formatCurrency(totales.inversion)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-[#3bc6dc] text-lg">{totales.formularios}</span>
                </td>
                <td className="px-6 py-4 text-right text-gray-900">
                  {formatCurrency(totales.costoPorLead)}
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Métricas adicionales de Google Ads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Métricas de Google Ads
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Impresiones</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(googleAdsData.impresiones)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Clics</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatNumber(googleAdsData.clics)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">CTR</p>
            <p className="text-2xl font-bold text-green-600">
              {googleAdsData.ctr.toFixed(2)}%
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-500 text-sm">Tasa de Conversión</p>
            <p className="text-2xl font-bold text-[#3bc6dc]">
              {googleAdsData.clics > 0
                ? ((googleAdsData.formularios / googleAdsData.clics) * 100).toFixed(2)
                : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate('google-ads')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#3bc6dc] transition-all group text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] p-3 rounded-lg">
                <img
                  src="/logo_google_ads.png"
                  alt="Google Ads"
                  className="h-6 w-6 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ver Google Ads</h3>
                <p className="text-sm text-gray-500">Análisis detallado de campañas</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#3bc6dc] transition-colors" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('diccionario')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#3bc6dc] transition-all group text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Diccionario</h3>
                <p className="text-sm text-gray-500">Aprende sobre las métricas</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResumenGeneral;
