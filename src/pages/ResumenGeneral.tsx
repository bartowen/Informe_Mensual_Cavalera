import React from 'react';
import {
  DollarSign,
  FileText,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Target,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from 'lucide-react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MonthData, tendencia3Meses } from '../data/allMonthsData';
import { formatCurrency } from '../utils/formatters';

interface ResumenGeneralProps {
  onNavigate: (tab: string) => void;
  monthData: MonthData;
}

const ResumenGeneral: React.FC<ResumenGeneralProps> = ({ onNavigate, monthData }) => {
  const googleCanal = monthData.porCanal.find(c => c.canal === 'Google Ads');
  const metaCanal = monthData.porCanal.find(c => c.canal === 'Meta Ads');
  const pctGoogle = monthData.resumen.formulariosTotal > 0
    ? Math.round(((googleCanal?.leads || 0) / monthData.resumen.formulariosTotal) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resumen General</h1>
            <p className="text-gray-500 mt-1">
              Cavalera Tattoo &amp; Piercing — {monthData.label}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Datos Verificados</span>
          </div>
        </div>
      </div>

      {/* KPIs Principales - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Inversión Publicitaria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Inversión Publicitaria</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
            {formatCurrency(monthData.resumen.inversionTotal)}
          </p>
          <p className="text-xs text-gray-400 mt-2">Google Ads + Meta Ads</p>
        </div>

        {/* Formularios / Leads */}
        <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-cyan-100 text-sm">Leads Totales</p>
          <p className="text-3xl lg:text-4xl font-bold mt-1">{monthData.resumen.formulariosTotal}</p>
          <p className="text-xs text-cyan-100 mt-2">Admin Panel — fuente oficial</p>
        </div>

        {/* Ventas Reales */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-purple-100 text-sm">Ventas Reales</p>
          <p className="text-2xl lg:text-3xl font-bold mt-1">{formatCurrency(monthData.resumen.ventasReales)}</p>
          <p className="text-xs text-purple-100 mt-2">{monthData.resumen.cantidadVentas} ventas</p>
        </div>

        {/* Reservas Agendadas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm">Reservas Agendadas</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{monthData.resumen.reservasAgendadas}</p>
          <p className="text-xs text-gray-400 mt-2">Citas programadas</p>
        </div>
      </div>

      {/* Tabla Comparativa por Canal */}
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
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Leads</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">CPL</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {monthData.porCanal.map((canal) => (
                <tr key={canal.canal} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white border border-gray-200 rounded-lg p-2">
                        <img
                          src={canal.canal === 'Google Ads' ? '/logo_google_ads.png' : '/logo_meta_.png'}
                          alt={canal.canal}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{canal.canal}</p>
                        <p className="text-xs text-gray-500">
                          {canal.canal === 'Google Ads' ? 'Búsqueda pagada' : 'Facebook & Instagram'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {formatCurrency(canal.inversion)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-[#3bc6dc] text-lg">{canal.leads}</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-gray-900">
                    {formatCurrency(canal.cpl)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-medium ${canal.ctr >= 5 ? 'text-green-600' : 'text-gray-600'}`}>
                      {canal.ctr.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
              {/* Total */}
              <tr className="bg-gray-50 font-semibold">
                <td className="px-6 py-4 text-gray-900">Total</td>
                <td className="px-6 py-4 text-right text-gray-900">
                  {formatCurrency(monthData.resumen.inversionTotal)}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-[#3bc6dc] text-lg">{monthData.resumen.formulariosTotal}</span>
                </td>
                <td className="px-6 py-4 text-right text-gray-900">
                  {formatCurrency(Math.round(monthData.resumen.inversionTotal / monthData.resumen.formulariosTotal))}
                </td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Tendencia 3 Meses */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Tendencia 3 Meses</h2>
        <p className="text-sm text-gray-500 mb-4">
          Leads totales y CAC — Dic 2025 a Feb 2026
        </p>
        {monthData.key === 'enero2026' && (
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
            <span className="text-amber-500 text-lg">⚠️</span>
            <div>
              <p className="font-semibold text-amber-900 text-sm">CAC pico en Enero: $11.899 (+60.6% vs Diciembre)</p>
              <p className="text-amber-700 text-xs mt-1">
                La inversión creció 72% pero los leads apenas variaron (46 vs 43). Revisar estructura de campaña y presupuesto diario.
              </p>
            </div>
          </div>
        )}
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={tendencia3Meses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'CAC ($)') return [formatCurrency(value), name];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="leadsGoogle" name="Leads Google" fill="#3bc6dc" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="leadsTotal"  name="Leads Total"  fill="#a855f7" radius={[4, 4, 0, 0]} opacity={0.6} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cac"
                name="CAC ($)"
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ r: 5, fill: '#ef4444' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Clave */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-500/20 p-2 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-lg font-semibold">Insights Clave — {monthData.label}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span className="font-medium">Generación de Leads</span>
            </div>
            <p className="text-gray-300 text-sm">
              Google Ads genera <span className="text-cyan-400 font-bold">{pctGoogle}%</span> de los leads del período
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="font-medium">Costo por Lead</span>
            </div>
            <p className="text-gray-300 text-sm">
              Google <span className="text-green-400 font-bold">{formatCurrency(googleCanal?.cpl || 0)}</span>{' '}
              vs Meta <span className="text-red-400 font-bold">{formatCurrency(metaCanal?.cpl || 0)}</span>
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="font-medium">CTR</span>
            </div>
            <p className="text-gray-300 text-sm">
              Google <span className="text-green-400 font-bold">{googleCanal?.ctr.toFixed(2)}%</span>{' '}
              vs Meta <span className="text-gray-400 font-bold">{metaCanal?.ctr.toFixed(2)}%</span>
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="font-medium">Recomendación</span>
            </div>
            <p className="text-gray-300 text-sm">
              Google Ads es el <span className="text-yellow-400 font-bold">motor principal</span> de generación de leads
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('google-ads')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#3bc6dc] transition-all group text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] p-3 rounded-lg">
                <img src="/logo_google_ads.png" alt="Google Ads" className="h-6 w-6 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Google Ads</h3>
                <p className="text-sm text-gray-500">Análisis detallado</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#3bc6dc] transition-colors" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('meta-ads')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-purple-500 transition-all group text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg">
                <img src="/logo_meta_.png" alt="Meta Ads" className="h-6 w-6 object-contain" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Meta Ads</h3>
                <p className="text-sm text-gray-500">Facebook &amp; Instagram</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors" />
          </div>
        </button>

        <button
          onClick={() => onNavigate('ventas-reservas')}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-orange-500 transition-all group text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ventas y Reservas</h3>
                <p className="text-sm text-gray-500">Datos AgendaPro</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ResumenGeneral;
