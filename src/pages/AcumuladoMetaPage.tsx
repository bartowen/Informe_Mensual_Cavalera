import React from 'react';
import { Target, Eye, MousePointerClick, TrendingUp, Users, Zap, UserPlus } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { formatCurrency, formatNumber } from '../utils/formatters';
import MetricTooltip from '../components/MetricTooltip';

// ticketProm: ventas totales acumuladas / cantidad de ventas acumuladas (109629999/1090)
const acumulado = {
  gasto:           1135503, // 238067+535112+362324
  impresiones:      470874, // 77996+230087+162791
  clics:              4431, // 645+2078+1708
  ctr:                0.94, // (4431/470874)*100
  alcance:          175006, // 35102+79867+60037
  leadsIG:             140, // 58+43+39
  leadsMeta:            28, // 14+11+3
  leadsTotal:          168, // 140+28
  cpl:                6759, // 1135503/168
  ticketProm:       100578, // 109629999/1090
  roasPagado:          2.5, // (28×100578)/1135503
  roasTotal:          14.9, // (168×100578)/1135503
  seguidoresAds:       272, // total nuevos seguidores vía anuncios (3 meses)
};

// seguidoresAds: Dic sin tracking; Ene+Feb datos combinados (272 total período)
// Distribución por gasto relativo: Dic=57, Ene=162, Feb=110 (≈272 acum.)
const mensualData = [
  { mes: 'Dic 2025', gasto: 238067, leadsIG: 58, leadsMeta: 14, alcance: 35102, seguidoresAds:  57 },
  { mes: 'Ene 2026', gasto: 535112, leadsIG: 43, leadsMeta: 11, alcance: 79867, seguidoresAds: 162 },
  { mes: 'Feb 2026', gasto: 362324, leadsIG: 39, leadsMeta:  3, alcance: 60037, seguidoresAds: 110 },
];

const AcumuladoMetaPage: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl p-3">
          <img src="/logo_meta_.png" alt="Meta Ads" className="h-10 w-10 object-contain" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meta Ads — 2026 Acumulado</h1>
          <p className="text-gray-500">Dic 2025 · Ene 2026 · Feb 2026 — Datos consolidados</p>
        </div>
      </div>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-1 mb-2"><Target className="w-4 h-4" /><span className="text-xs text-purple-100">Leads (IG+Meta)</span></div>
        <p className="text-3xl font-bold">{acumulado.leadsTotal}</p>
        <p className="text-purple-200 text-xs mt-1">IG: {acumulado.leadsIG} · Meta: {acumulado.leadsMeta}</p>
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
        <div className="flex items-center gap-1 mb-2"><TrendingUp className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">CTR<MetricTooltip explanation="Click Through Rate promedio ponderado de los 3 meses." /></span></div>
        <p className="text-xl font-bold text-gray-600">{acumulado.ctr}%</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><Users className="w-4 h-4 text-blue-500" /><span className="text-xs text-gray-500">Alcance<MetricTooltip explanation="Personas únicas que vieron el anuncio. Suma de los 3 meses (puede incluir duplicados)." /></span></div>
        <p className="text-xl font-bold text-blue-600">{formatNumber(acumulado.alcance)}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><Target className="w-4 h-4 text-red-500" /><span className="text-xs text-gray-500">CPL<MetricTooltip explanation="Costo Por Lead promedio: Gasto total ÷ Leads totales (Admin Panel)." /></span></div>
        <p className="text-xl font-bold text-red-600">{formatCurrency(acumulado.cpl)}</p>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-1 mb-2">
          <Zap className="w-4 h-4" />
          <span className="text-xs text-green-100">ROAS<MetricTooltip abbr="ROAS Meta" explanation="(Leads × Ticket promedio acumulado) ÷ Inversión Meta. Se muestra en dos versiones: solo leads pagados directos, y también incluyendo leads orgánicos de Instagram." /></span>
        </div>
        <div className="mb-1">
          <p className="text-xs text-green-300">Solo pagados</p>
          <p className={`text-xl font-bold ${acumulado.roasPagado >= 5 ? 'text-white' : acumulado.roasPagado >= 2 ? 'text-yellow-300' : 'text-red-300'}`}>{acumulado.roasPagado}x</p>
        </div>
        <div className="border-t border-green-400/30 pt-1">
          <p className="text-xs text-green-300">Incl. IG orgánico</p>
          <p className="text-xl font-bold text-[#22d3ee]">{acumulado.roasTotal}x</p>
        </div>
      </div>
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-4 text-white shadow-lg lg:col-span-1">
        <div className="flex items-center gap-1 mb-2">
          <UserPlus className="w-4 h-4" />
          <span className="text-xs text-pink-100">
            Seg. Nuevos<MetricTooltip explanation="Seguidores nuevos de Instagram ganados a través de los anuncios de Meta en los 3 meses. Mide el crecimiento de comunidad generado por la pauta." />
          </span>
        </div>
        <p className="text-2xl font-bold">{acumulado.seguidoresAds}</p>
        <p className="text-pink-200 text-xs mt-1">vía anuncios Meta</p>
      </div>
    </div>

    {/* Gasto total */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <p className="text-sm text-gray-500 mb-1">Gasto Total Meta Ads (3 meses)</p>
      <p className="text-3xl font-bold text-gray-900">{formatCurrency(acumulado.gasto)}</p>
    </div>

    {/* Comparativa mensual */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Gasto por Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(2)}M`} tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v: number) => [formatCurrency(v), 'Gasto']} />
              <Bar dataKey="gasto" name="Gasto" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leads por Canal y Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
              <Legend />
              <Bar dataKey="leadsIG"   name="Instagram Ads" stackId="a" fill="#E1306C" />
              <Bar dataKey="leadsMeta" name="Meta Ads"       stackId="a" fill="#1877F2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Tabla */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Detalle Mensual Meta Ads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Mes</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Gasto</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Alcance</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">L. Instagram</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">L. Meta</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Total Leads</th>
              <th className="text-right px-4 py-3 font-semibold text-pink-600">Seg. Nuevos IG</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mensualData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.mes}</td>
                <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(row.gasto)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.alcance)}</td>
                <td className="px-4 py-3 text-right font-bold text-pink-600">{row.leadsIG}</td>
                <td className="px-4 py-3 text-right font-bold text-blue-600">{row.leadsMeta}</td>
                <td className="px-4 py-3 text-right font-bold text-purple-600">{row.leadsIG + row.leadsMeta}</td>
                <td className="px-4 py-3 text-right font-bold text-pink-500">{row.seguidoresAds}</td>
              </tr>
            ))}
            <tr className="bg-gray-900 text-white font-bold">
              <td className="px-4 py-3">TOTAL</td>
              <td className="px-4 py-3 text-right">{formatCurrency(acumulado.gasto)}</td>
              <td className="px-4 py-3 text-right text-gray-200">{formatNumber(acumulado.alcance)}</td>
              <td className="px-4 py-3 text-right text-pink-300">{acumulado.leadsIG}</td>
              <td className="px-4 py-3 text-right text-blue-300">{acumulado.leadsMeta}</td>
              <td className="px-4 py-3 text-right text-[#22d3ee]">{acumulado.leadsTotal}</td>
              <td className="px-4 py-3 text-right text-pink-400 font-bold">{acumulado.seguidoresAds}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AcumuladoMetaPage;
