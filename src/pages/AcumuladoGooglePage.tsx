import React from 'react';
import {
  Target, Eye, MousePointerClick, TrendingUp, DollarSign, Zap,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line,
} from 'recharts';
import { formatCurrency, formatNumber } from '../utils/formatters';
import MetricTooltip from '../components/MetricTooltip';

// ── Datos acumulados Google Ads ─────────────────────────────────
// ticketProm: ventas totales acumuladas / cantidad de ventas acumuladas (109629999/1090)
const acumulado = {
  impresiones:  53684,  // 11630+21525+20529
  clics:         5886,  // 1343+2244+2299
  ctr:          10.97,  // (5886/53684)*100
  costo:      1299412,  // 318601+547350+433461
  cpc:            221,  // 1299412/5886
  leads:          142,  // 43+46+53
  cac:           9150,  // 1299412/142
  ticketProm:  100578,  // 109629999/1090
  roas:          11.0,  // (142×100578)/1299412
};

const mensualData = [
  { mes: 'Dic 2025', impresiones: 11630, clics: 1343, leads: 43, costo: 318601, cac: 7409 },
  { mes: 'Ene 2026', impresiones: 21525, clics: 2244, leads: 46, costo: 547350, cac: 11899 },
  { mes: 'Feb 2026', impresiones: 20529, clics: 2299, leads: 53, costo: 433461, cac: 8178 },
];

const AcumuladoGooglePage: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <img src="/logo_google_ads.png" alt="Google Ads" className="h-10 w-10 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Google Ads — 2026 Acumulado</h1>
          <p className="text-gray-500">Dic 2025 · Ene 2026 · Feb 2026 — Datos consolidados</p>
        </div>
      </div>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-1 mb-2"><Target className="w-4 h-4" /><span className="text-xs text-cyan-100">Leads<MetricTooltip explanation="Admin Panel Cavalera: leads reales de los 3 meses." /></span></div>
        <p className="text-3xl font-bold">{acumulado.leads}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><Eye className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">Impr.</span></div>
        <p className="text-xl font-bold text-gray-900">{formatNumber(acumulado.impresiones)}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><MousePointerClick className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">Clics</span></div>
        <p className="text-xl font-bold text-gray-900">{formatNumber(acumulado.clics)}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><TrendingUp className="w-4 h-4 text-green-500" /><span className="text-xs text-gray-500">CTR<MetricTooltip explanation="Click Through Rate promedio ponderado de los 3 meses." /></span></div>
        <p className="text-xl font-bold text-green-600">{acumulado.ctr}%</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><DollarSign className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">CPC<MetricTooltip explanation="Costo Por Click promedio: Inversión total ÷ Clics totales." /></span></div>
        <p className="text-xl font-bold text-gray-900">{formatCurrency(acumulado.cpc)}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><Target className="w-4 h-4 text-purple-500" /><span className="text-xs text-gray-500">CAC<MetricTooltip explanation="Costo de Adquisición promedio ponderado de los 3 meses." /></span></div>
        <p className="text-xl font-bold text-purple-600">{formatCurrency(acumulado.cac)}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-1 mb-2"><Zap className="w-4 h-4" /><span className="text-xs text-green-100">ROAS<MetricTooltip abbr="ROAS Google" explanation="(Leads reales × Ticket promedio acumulado) ÷ Inversión Google Ads. Estima el valor generado por los leads del canal." /></span></div>
        <p className="text-2xl font-bold">{acumulado.roas}x</p>
        <p className="text-green-200 text-xs mt-1">{acumulado.leads} leads × ${acumulado.ticketProm.toLocaleString('es-CL')}</p>
      </div>
    </div>

    {/* Inversión total */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">Inversión Total Google Ads (3 meses)</p>
      <p className="text-3xl font-bold text-gray-900">{formatCurrency(acumulado.costo)}</p>
    </div>

    {/* Comparativa mensual: Inversión + Leads */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Inversión por Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(2)}M`} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v: number) => [formatCurrency(v), 'Inversión']} />
              <Bar dataKey="costo" name="Inversión" fill="#4285F4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads y CAC por Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v: number, name: string) => name === 'CAC' ? [formatCurrency(v), name] : [v, name]} />
              <Legend />
              <Bar yAxisId="left" dataKey="leads" name="Leads" fill="#3bc6dc" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="cac" name="CAC" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Tabla mensual */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Detalle Mensual</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Mes</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Impr.</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Clics</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Inversión</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Leads</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">CAC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mensualData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.mes}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.impresiones)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.clics)}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(row.costo)}</td>
                <td className="px-4 py-3 text-right font-bold text-[#3bc6dc]">{row.leads}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-bold text-xs px-2 py-0.5 rounded ${row.cac <= 8000 ? 'text-green-700 bg-green-100' : row.cac > 10000 ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'}`}>
                    {formatCurrency(row.cac)}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-900 text-white font-bold">
              <td className="px-4 py-3">TOTAL / PROM</td>
              <td className="px-4 py-3 text-right text-gray-200">{formatNumber(acumulado.impresiones)}</td>
              <td className="px-4 py-3 text-right text-gray-200">{formatNumber(acumulado.clics)}</td>
              <td className="px-4 py-3 text-right">{formatCurrency(acumulado.costo)}</td>
              <td className="px-4 py-3 text-right text-[#22d3ee]">{acumulado.leads}</td>
              <td className="px-4 py-3 text-right">
                <span className="font-bold text-xs px-2 py-0.5 rounded bg-yellow-900/40 text-yellow-300">
                  {formatCurrency(acumulado.cac)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AcumuladoGooglePage;
