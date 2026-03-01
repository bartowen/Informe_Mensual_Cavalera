import React from 'react';
import {
  DollarSign,
  FileText,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Zap,
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
  AreaChart,
  Area,
  BarChart,
  LabelList,
  ReferenceLine,
} from 'recharts';
import { formatCurrency } from '../utils/formatters';
import MetricTooltip from '../components/MetricTooltip';

// ── Datos acumulados 2026 ───────────────────────────────────────
const kpis = {
  inversionTotal:   2434915,
  leadsPagados:     310,  // Google 142 + IG Ads 140 + Meta Ads 28
  leadsOrganico:    132,
  ventasTotal:      109629999,
  cantidadVentas:   1090,
  reservasTotal:    1065,
  roas:             (109629999 / 2434915),  // ≈ 45.02
  roi:              ((109629999 - 2434915) / 2434915) * 100, // ≈ 4402.7%
};

const ventasEvolutivo = [
  { mes: 'Dic 2025', ventas: 38648651, cantidad: 368 },
  { mes: 'Ene 2026', ventas: 39239104, cantidad: 379 },
  { mes: 'Feb 2026', ventas: 31742244, cantidad: 343 },
];

const cacEvolutivo = [
  { mes: 'Dic 2025', cac: 7409,  inversion: 318601, leads: 43 },
  { mes: 'Ene 2026', cac: 11899, inversion: 547350, leads: 46 },
  { mes: 'Feb 2026', cac: 8178,  inversion: 433461, leads: 53 },
];

const leadsEvolutivo = [
  { mes: 'Dic 2025', google: 43, instagram: 58, organico: 53, meta: 14 },
  { mes: 'Ene 2026', google: 46, instagram: 43, organico: 30, meta: 11 },
  { mes: 'Feb 2026', google: 53, instagram: 39, organico: 49, meta: 3  },
];

const tablaResumen = [
  {
    mes: 'Dic 2025',
    invGoogle: 318601, invMeta: 238067, invTotal: 556668,
    leadsGoogle: 43, leadsIg: 58, leadsOrg: 53, leadsMeta: 14, leadsTotal: 168,
    cacGoogle: 7409,
    ventas: 38648651, cantVentas: 368, reservas: 355,
    isTotal: false,
  },
  {
    mes: 'Ene 2026',
    invGoogle: 547350, invMeta: 535112, invTotal: 1082462,
    leadsGoogle: 46, leadsIg: 43, leadsOrg: 30, leadsMeta: 11, leadsTotal: 130,
    cacGoogle: 11899,
    ventas: 39239104, cantVentas: 379, reservas: 369,
    isTotal: false,
  },
  {
    mes: 'Feb 2026',
    invGoogle: 433461, invMeta: 362324, invTotal: 795785,
    leadsGoogle: 53, leadsIg: 39, leadsOrg: 49, leadsMeta: 3, leadsTotal: 144,
    cacGoogle: 8178,
    ventas: 31742244, cantVentas: 343, reservas: 341,
    isTotal: false,
  },
  {
    mes: 'TOTAL / PROM',
    invGoogle: 1299412, invMeta: 1135503, invTotal: 2434915,
    leadsGoogle: 142, leadsIg: 140, leadsOrg: 132, leadsMeta: 28, leadsTotal: 442,
    cacGoogle: 9150,
    ventas: 109629999, cantVentas: 1090, reservas: 1065,
    isTotal: true,
  },
];

const cacColor = (cac: number) => {
  if (cac <= 8000) return 'text-green-400';
  if (cac > 10000) return 'text-red-400';
  return 'text-yellow-400';
};

const cacBadge = (cac: number) => {
  if (cac <= 8000) return 'bg-green-900/30 text-green-300';
  if (cac > 10000) return 'bg-red-900/30 text-red-300';
  return 'bg-yellow-900/30 text-yellow-300';
};

// Custom dot colored by CAC value
const CacDot = (props: {cx?: number; cy?: number; payload?: {cac: number}}) => {
  const { cx = 0, cy = 0, payload } = props;
  const cac = payload?.cac ?? 0;
  const color = cac <= 8000 ? '#34A853' : cac > 10000 ? '#EF4444' : '#F59E0B';
  return <circle cx={cx} cy={cy} r={7} fill={color} stroke="#fff" strokeWidth={2} />;
};

const AcumuladoPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">2026 Acumulado</h1>
            <p className="text-gray-500 mt-1">Cavalera Tattoo &amp; Piercing — Dic 2025 · Ene 2026 · Feb 2026</p>
          </div>
          <div className="flex items-center gap-2 bg-cyan-50 text-cyan-800 border border-cyan-200 px-4 py-2 rounded-lg">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold text-sm">3 Meses Consolidados</span>
          </div>
        </div>
      </div>

      {/* KPIs — 5 cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Inversión */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="bg-blue-100 p-2.5 rounded-lg w-fit mb-3">
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-500 text-xs">Inversión Total</p>
          <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{formatCurrency(kpis.inversionTotal)}</p>
          <p className="text-xs text-gray-400 mt-1">Google + Meta · 3 meses</p>
        </div>

        {/* Leads Pagados */}
        <div className="bg-gradient-to-br from-[#3bc6dc] to-[#21a9c2] rounded-xl shadow-lg p-5 text-white">
          <div className="bg-white/20 p-2.5 rounded-lg w-fit mb-3">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <p className="text-cyan-100 text-xs">
            Leads Pagados
            <MetricTooltip explanation="Solo canales pagados: Google Ads + Instagram Ads + Meta Ads. Excluye tráfico orgánico." />
          </p>
          <p className="text-xl lg:text-2xl font-bold mt-1">{kpis.leadsPagados}</p>
          <p className="text-cyan-100 text-xs mt-1">Google Ads + Meta Ads</p>
          <span className="inline-block mt-2 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
            +{kpis.leadsOrganico} orgánicos
          </span>
        </div>

        {/* Ventas */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-5 text-white">
          <div className="bg-white/20 p-2.5 rounded-lg w-fit mb-3">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <p className="text-purple-100 text-xs">Ventas Acumuladas</p>
          <p className="text-xl lg:text-2xl font-bold mt-1">{formatCurrency(kpis.ventasTotal)}</p>
          <p className="text-purple-200 text-xs mt-1">Fuente: AgendaPro · {kpis.cantidadVentas} ventas</p>
        </div>

        {/* Reservas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="bg-orange-100 p-2.5 rounded-lg w-fit mb-3">
            <Calendar className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-gray-500 text-xs">Reservas Totales</p>
          <p className="text-xl lg:text-2xl font-bold text-gray-900 mt-1">{kpis.reservasTotal}</p>
          <p className="text-xs text-gray-400 mt-1">Fuente: AgendaPro · sin cancelados</p>
        </div>

        {/* ROAS */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-5 text-white">
          <div className="bg-white/20 p-2.5 rounded-lg w-fit mb-3">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <p className="text-green-100 text-xs">
            ROAS Total
            <MetricTooltip explanation="Return on Ad Spend. Ventas AgendaPro ÷ inversión publicitaria total. No es atribución directa — incluye todas las ventas del período." />
          </p>
          <p className="text-xl lg:text-2xl font-bold mt-1">{kpis.roas.toFixed(1)}x</p>
          <p className="text-green-200 text-xs mt-1">ROI: +{(kpis.roi / 1000).toFixed(1)}k%</p>
        </div>
      </div>

      {/* Gráfico 1: Evolutivo Ventas */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Evolutivo Ventas Mensuales</h2>
        <p className="text-sm text-gray-500 mb-6">Monto (barras) y cantidad de ventas (línea)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={ventasEvolutivo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                yAxisId="left"
                tickFormatter={(v: number) => `$${(v / 1000000).toFixed(0)}M`}
                tick={{ fontSize: 11, fill: '#6b7280' }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={[320, 400]}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'Monto') return [formatCurrency(value), name];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="ventas" name="Monto" fill="#8B5CF6" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cantidad"
                name="Cantidad"
                stroke="#22d3ee"
                strokeWidth={2.5}
                dot={{ r: 5, fill: '#22d3ee' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Evolutivo CAC */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Costo de Adquisición Google Ads
          <MetricTooltip explanation="CAC = Inversión Google Ads ÷ Leads Google (fuente: Admin Panel Cavalera, no CSV)." />
        </h2>
        <p className="text-sm text-gray-500 mb-2">Evaluación de eficiencia: verde ≤ $8.000 · amarillo $8k–$10k · rojo &gt; $10.000</p>
        <div className="flex gap-4 text-xs mb-4">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />Eficiente</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />Moderado</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />Alto</span>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cacEvolutivo}>
              <defs>
                <linearGradient id="cacGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={[0, 14000]}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(_value: number, _name: string, props: {payload?: typeof cacEvolutivo[0]}) => {
                  const d = props.payload;
                  if (!d) return ['', ''];
                  return [
                    <span key="cac">
                      <strong>CAC: {formatCurrency(d.cac)}</strong><br />
                      Inversión: {formatCurrency(d.inversion)}<br />
                      Leads: {d.leads}
                    </span>,
                    '',
                  ];
                }}
              />
              <ReferenceLine
                y={10000}
                stroke="#ef4444"
                strokeDasharray="5 5"
                label={{ value: 'Límite eficiencia $10k', position: 'insideTopRight', fontSize: 10, fill: '#ef4444' }}
              />
              <Area
                type="monotone"
                dataKey="cac"
                name="CAC"
                stroke="#8B5CF6"
                strokeWidth={2.5}
                fill="url(#cacGradient)"
                dot={<CacDot />}
                activeDot={{ r: 9, strokeWidth: 2, stroke: '#fff' }}
              >
                <LabelList
                  dataKey="cac"
                  position="top"
                  formatter={(v: number) => formatCurrency(v)}
                  style={{ fontSize: '11px', fontWeight: 'bold', fill: '#374151' }}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 3: Leads por Canal */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Leads por Canal — Evolutivo</h2>
        <p className="text-sm text-gray-500 mb-6">Barras apiladas (fuente: Admin Panel Cavalera)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsEvolutivo}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Legend />
              <Bar dataKey="google"    name="Google (Ads)"          stackId="a" fill="#4285F4" />
              <Bar dataKey="instagram" name="Instagram (Ads)"        stackId="a" fill="#E1306C" />
              <Bar dataKey="organico"  name="Orgánico / Referido"    stackId="a" fill="#34A853" />
              <Bar dataKey="meta"      name="Meta (Ads)"             stackId="a" fill="#1877F2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla Resumen */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Tabla Resumen Mes a Mes</h2>
          <p className="text-sm text-gray-500 mt-1">
            CAC{' '}
            <span className="text-green-600 font-medium">verde ≤ $8.000</span> ·{' '}
            <span className="text-yellow-600 font-medium">amarillo $8.001–$10.000</span> ·{' '}
            <span className="text-red-600 font-medium">rojo &gt; $10.000</span>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-semibold sticky left-0 bg-gray-50">Mes</th>
                <th className="text-right px-3 py-3 font-semibold">Inv. Google</th>
                <th className="text-right px-3 py-3 font-semibold">Inv. Meta</th>
                <th className="text-right px-3 py-3 font-semibold">Inv. Total</th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
                  L. Google (Ads)
                </th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
                  L. IG (híbrido)
                </th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
                  L. Orgánico
                </th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
                  L. Meta (Ads)
                </th>
                <th className="text-right px-3 py-3 font-semibold">Total L.</th>
                <th className="text-right px-3 py-3 font-semibold">
                  CAC
                  <MetricTooltip explanation="Costo de Adquisición de Cliente. Inversión Google ÷ Leads Google (Admin Panel)." />
                </th>
                <th className="text-right px-3 py-3 font-semibold">Ventas</th>
                <th className="text-right px-3 py-3 font-semibold">Nº</th>
                <th className="text-right px-3 py-3 font-semibold">Reservas</th>
              </tr>
            </thead>
            <tbody>
              {tablaResumen.map((row, idx) => (
                <tr
                  key={idx}
                  className={
                    row.isTotal
                      ? 'bg-gray-900 text-white font-bold'
                      : 'border-t border-gray-100 hover:bg-gray-50 transition-colors'
                  }
                >
                  <td className={`px-4 py-3 font-semibold sticky left-0 ${row.isTotal ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                    {row.mes}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {formatCurrency(row.invGoogle)}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {formatCurrency(row.invMeta)}
                  </td>
                  <td className={`px-3 py-3 text-right font-semibold ${row.isTotal ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(row.invTotal)}
                  </td>
                  <td className={`px-3 py-3 text-right font-medium ${row.isTotal ? 'text-[#22d3ee]' : 'text-[#4285F4]'}`}>
                    {row.leadsGoogle}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {row.leadsIg}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-300' : 'text-green-600'}`}>
                    {row.leadsOrg}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {row.leadsMeta}
                  </td>
                  <td className={`px-3 py-3 text-right font-bold ${row.isTotal ? 'text-[#22d3ee]' : 'text-[#22d3ee]'}`}>
                    {row.leadsTotal}
                  </td>
                  <td className="px-3 py-3 text-right">
                    <span className={`font-bold px-2 py-0.5 rounded text-xs ${row.isTotal ? cacBadge(row.cacGoogle) : cacColor(row.cacGoogle)}`}>
                      {formatCurrency(row.cacGoogle)}
                    </span>
                  </td>
                  <td className={`px-3 py-3 text-right font-semibold ${row.isTotal ? 'text-white' : 'text-gray-900'}`}>
                    {formatCurrency(row.ventas)}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {row.cantVentas}
                  </td>
                  <td className={`px-3 py-3 text-right ${row.isTotal ? 'text-gray-200' : 'text-gray-700'}`}>
                    {row.reservas}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AcumuladoPage;
