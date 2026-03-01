import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { MonthData } from '../data/allMonthsData';
import { DollarSign, Eye, Users, BarChart2, MousePointerClick, TrendingUp } from 'lucide-react';
import MetricTooltip from '../components/MetricTooltip';

interface MetaAdsPageProps {
  monthData: MonthData;
}

// ── Datos estáticos 3 meses (acumulado global) ──────────────────────────────
const graficoInfluencia = [
  { mes: 'Dic',  impr: 77996,  leadsOrg: 58 },
  { mes: 'Ene',  impr: 230087, leadsOrg: 43 },
  { mes: 'Feb',  impr: 162791, leadsOrg: 39 },
];

const seguidoresData = [
  { name: 'Vía Ads (5.6%)',     value: 272,  fill: '#1877F2' },
  { name: 'Orgánico (94.4%)',   value: 4555, fill: '#34A853' },
];

const funnelSteps = [
  { icon: '📣', label: 'Impresiones 3M',     valor: '470.874',  sub: 'Total alcanzados',         highlight: false },
  { icon: '👁️', label: 'Visitas Perfil IG',  valor: '2.326',    sub: '0.5% de impr. → perfil',   highlight: false },
  { icon: '➕', label: 'Seg. Nuevos vía Ads', valor: '272',      sub: '11.7% visitas → follow',   highlight: false },
  { icon: '👥', label: 'Seguidores Totales',  valor: '95.445',   sub: 'Audiencia orgánica activa', highlight: false },
  { icon: '✉️', label: 'Leads Totales 3M',    valor: '140',      sub: 'DM + contacto directo',    highlight: true  },
];

// ── Semáforo CPA Meta ───────────────────────────────────────────────────────
function semáforoCPAMeta(cpa: number): { bg: string; text: string } {
  if (cpa <= 20000)  return { bg: 'bg-green-100',  text: 'text-green-700'  };
  if (cpa <= 60000)  return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
  return                    { bg: 'bg-red-100',    text: 'text-red-700'    };
}

// ── FunnelStep sub-componente ───────────────────────────────────────────────
const FunnelStep: React.FC<typeof funnelSteps[0]> = ({ icon, label, valor, sub, highlight }) => (
  <div className={`flex-1 min-w-0 flex flex-col items-center text-center p-4 rounded-xl border ${
    highlight
      ? 'bg-[#22d3ee]/10 border-[#22d3ee]/40'
      : 'bg-gray-800 border-gray-700'
  }`}>
    <span className="text-2xl mb-1">{icon}</span>
    <span className={`font-bold text-xl ${highlight ? 'text-[#22d3ee]' : 'text-white'}`}>{valor}</span>
    <span className="text-gray-300 text-xs font-semibold mt-0.5">{label}</span>
    <span className="text-gray-500 text-xs mt-1 leading-tight">{sub}</span>
  </div>
);

// ── Tooltip customizado ─────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs shadow-xl">
      <p className="font-bold text-white mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? p.value.toLocaleString('es-CL') : p.value}
        </p>
      ))}
    </div>
  );
};

// ── Componente principal ────────────────────────────────────────────────────
const MetaAdsPage: React.FC<MetaAdsPageProps> = ({ monthData }) => {
  const m = monthData.metaAdsMetrics;
  const conjuntos = monthData.metaConjuntos;
  const ticket = monthData.ventasResumen.ticket;

  const cplMetaPagado = m.leadsMeta > 0
    ? Math.round(m.costo / m.leadsMeta)
    : 0;

  // ROAS correcto: leads × ticket ÷ inversión
  const roasPagadoVal = m.leadsMeta > 0 && m.costo > 0 && ticket > 0
    ? (m.leadsMeta * ticket) / m.costo
    : 0;
  const roasTotalVal = (m.leadsMeta + m.leadsInstagram) > 0 && m.costo > 0 && ticket > 0
    ? ((m.leadsMeta + m.leadsInstagram) * ticket) / m.costo
    : 0;

  const kpiCards = [
    { label: 'Inversión Total', value: `$${m.costo.toLocaleString('es-CL')}`,  icon: DollarSign,      color: 'text-blue-500',   tooltip: undefined },
    { label: 'Impresiones',     value: m.impresiones.toLocaleString('es-CL'),   icon: Eye,             color: 'text-purple-500', tooltip: undefined },
    { label: 'Alcance',         value: m.alcance.toLocaleString('es-CL'),       icon: Users,           color: 'text-indigo-500',
      tooltip: { abbr: 'Alcance', explanation: 'Número de personas distintas que vieron al menos uno de los anuncios de Meta.' } },
    { label: 'Frecuencia',      value: `${m.frecuencia}x`,                      icon: BarChart2,       color: 'text-orange-500',
      tooltip: { abbr: 'Frecuencia', explanation: 'Promedio de veces que cada persona vio el anuncio. Sobre 3.5x puede generar fatiga de audiencia.' } },
    { label: 'CTR',             value: `${m.ctr.toFixed(2)}%`,                  icon: MousePointerClick, color: 'text-cyan-500',
      tooltip: { abbr: 'CTR', explanation: 'Click Through Rate: % de personas que ven el anuncio y hacen clic en él.' } },
  ];

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-xl p-2 border border-gray-200 shadow-sm">
            <img src="/logo_meta_.png" alt="Meta Ads" className="h-12 w-12 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meta Ads</h1>
            <p className="text-gray-500 text-sm">{monthData.label} — Facebook & Instagram</p>
          </div>
        </div>
      </div>

      {/* ── 5 KPI Cards + ROAS dual ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpiCards.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-2">
              <div className={`p-2 rounded-lg bg-gray-50 w-fit ${k.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xl font-bold text-gray-900">{k.value}</p>
              <p className="text-xs text-gray-500 flex items-center">
                {k.label}
                {k.tooltip && <MetricTooltip abbr={k.tooltip.abbr} explanation={k.tooltip.explanation} />}
              </p>
            </div>
          );
        })}

        {/* ROAS dual card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-1">
          <div className="p-2 rounded-lg bg-gray-50 w-fit text-green-500">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-gray-400 leading-none">Solo leads pagados</p>
            <p className={`text-lg font-bold ${roasPagadoVal >= 5 ? 'text-green-600' : roasPagadoVal >= 2 ? 'text-yellow-600' : 'text-red-600'}`}>
              {roasPagadoVal > 0 ? `${roasPagadoVal.toFixed(1)}x` : '—'}
            </p>
          </div>
          <div className="border-t border-gray-100 pt-1">
            <p className="text-xs text-gray-400 leading-none">Incl. IG orgánico</p>
            <p className="text-lg font-bold text-cyan-600">
              {roasTotalVal > 0 ? `${roasTotalVal.toFixed(1)}x` : '—'}
            </p>
          </div>
          <p className="text-xs text-gray-500 flex items-center mt-auto">
            ROAS
            <MetricTooltip abbr="ROAS Meta" explanation="(Leads × Ticket promedio) ÷ Inversión Meta. Se muestra en dos versiones: solo leads pagados directos, y también incluyendo leads orgánicos de Instagram influenciados por la pauta." />
          </p>
        </div>
      </div>

      {/* ── 2 Dark Cards: IG Orgánico | Meta Pagado ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Instagram Orgánico */}
        <div className="bg-gray-900 border border-green-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🌱</span>
            <div>
              <h3 className="text-white font-bold">Instagram Orgánico</h3>
              <p className="text-green-400 text-xs">Sin costo — comunidad activa</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-green-400 font-bold text-2xl">{m.leadsInstagram}</p>
              <p className="text-gray-400 text-xs mt-1">Leads IG este mes</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-green-400 font-bold text-2xl">95.445</p>
              <p className="text-gray-400 text-xs mt-1">Seguidores totales</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center col-span-2">
              <p className="text-green-300 font-bold text-xl">$0 CPL</p>
              <p className="text-gray-400 text-xs mt-1">Costo por lead orgánico</p>
            </div>
          </div>
        </div>

        {/* Meta Pagado */}
        <div className="bg-gray-900 border border-blue-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💰</span>
            <div>
              <h3 className="text-white font-bold">Meta Pagado</h3>
              <p className="text-blue-400 text-xs">Inversión directa en pauta</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-blue-400 font-bold text-2xl">{m.leadsMeta}</p>
              <p className="text-gray-400 text-xs mt-1">Leads pagados reales</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className={`font-bold text-2xl ${
                cplMetaPagado <= 20000 ? 'text-green-400' :
                cplMetaPagado <= 60000 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                ${(cplMetaPagado / 1000).toFixed(0)}k
              </p>
              <p className="text-gray-400 text-xs mt-1 flex items-center justify-center gap-0.5">
                CPL Real
                <MetricTooltip abbr="CPL Real Meta" explanation="Inversión Meta ÷ leads pagados reales del Admin Panel. Solo cuenta formularios directos de campañas, no leads orgánicos de IG." />
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center col-span-2">
              <p className={`font-bold text-xl ${
                cplMetaPagado <= 20000 ? 'text-green-400' :
                cplMetaPagado <= 60000 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                ${cplMetaPagado.toLocaleString('es-CL')} por lead
              </p>
              <p className="text-gray-400 text-xs mt-1">Inversión total: ${m.costo.toLocaleString('es-CL')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Embudo de Influencia ── */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-bold text-lg mb-1">Embudo de Influencia</h2>
        <p className="text-gray-400 text-sm mb-5">Cómo la pauta convierte en comunidad y luego en leads (acumulado 3 meses)</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {funnelSteps.map((step) => (
            <FunnelStep key={step.label} {...step} />
          ))}
        </div>
      </div>

      {/* ── Dual-axis chart: Impresiones + Leads IG orgánicos ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-gray-900 font-bold text-lg mb-1">Impresiones vs Leads Orgánicos IG</h2>
        <p className="text-gray-500 text-sm mb-4">A más impresiones, más visibilidad — pero los leads orgánicos dependen de la comunidad</p>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={graficoInfluencia}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left"
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontSize: 11 }}
              label={{ value: 'Impresiones', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#6b7280' }} />
            <YAxis yAxisId="right" orientation="right" domain={[0, 70]}
              tick={{ fontSize: 11 }}
              label={{ value: 'Leads IG', angle: 90, position: 'insideRight', fontSize: 11, fill: '#6b7280' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar yAxisId="left" dataKey="impr" name="Impresiones" fill="#1877F2" fillOpacity={0.5} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="leadsOrg" name="Leads IG Orgánicos"
              stroke="#34A853" strokeWidth={3} dot={{ r: 5, fill: '#34A853' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Grid: Conjuntos (2/3) + Seguidores donut (1/3) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Conjuntos table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 font-bold text-lg mb-4">Conjuntos de Anuncios</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-gray-500 font-semibold text-xs">Conjunto</th>
                  <th className="text-right py-2 px-2 text-[#22d3ee] font-semibold text-xs">
                    Conv. Real
                    <MetricTooltip abbr="Conv. Real" explanation="Leads confirmados en el Admin Panel de Cavalera para este conjunto. No incluye microconversiones de GA4." />
                  </th>
                  <th className="text-right py-2 px-2 text-gray-500 font-semibold text-xs">
                    CPA Real
                    <MetricTooltip abbr="CPA Real" explanation="Costo Por Adquisición real: Gasto del conjunto ÷ conversiones reales del Admin Panel." />
                  </th>
                  <th className="text-right py-2 px-2 text-gray-500 font-semibold text-xs">Seg. IG</th>
                  <th className="text-right py-2 px-2 text-gray-500 font-semibold text-xs">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {conjuntos.map((c, i) => {
                  const sem = c.cpaReal !== undefined ? semáforoCPAMeta(c.cpaReal) : null;
                  return (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-gray-800 text-xs leading-snug max-w-[140px]">{c.nombre}</td>
                      <td className="py-3 px-2 text-right font-bold text-[#22d3ee]">
                        {c.resultadosReales !== undefined ? Math.round(c.resultadosReales) : Math.round(c.conv)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        {sem && c.cpaReal !== undefined ? (
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${sem.bg} ${sem.text}`}>
                            ${Math.round(c.cpaReal / 1000)}k
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-700 font-medium text-xs">
                        {c.seguidoresIG !== undefined ? c.seguidoresIG : '—'}
                      </td>
                      <td className="py-3 px-2 text-right text-gray-700 text-xs">
                        {c.visitasPerfil !== undefined ? c.visitasPerfil.toLocaleString('es-CL') : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seguidores IG Donut */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h2 className="text-gray-900 font-bold text-lg mb-1">Origen Seguidores IG</h2>
          <p className="text-gray-500 text-xs mb-4">Nuevos seguidores ganados en 3 meses (acumulado)</p>
          <div className="flex-1 flex items-center justify-center">
            <PieChart width={200} height={200}>
              <Pie
                data={seguidoresData}
                cx={100} cy={100}
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {seguidoresData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [value.toLocaleString('es-CL'), '']}
                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
              />
            </PieChart>
          </div>
          <div className="space-y-2 mt-2">
            {seguidoresData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.fill }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-bold text-gray-900">{d.value.toLocaleString('es-CL')}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs border-t border-gray-100 pt-2 mt-2">
              <span className="text-gray-500 font-semibold">Total acumulado</span>
              <span className="font-bold text-gray-900">4.827</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Resumen Ejecutivo ── */}
      <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
        <h2 className="text-white font-bold text-xl mb-4">Resumen Ejecutivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">ROL REAL DE META</p>
            <p className="text-white font-semibold text-sm leading-snug">
              Meta es principalmente un canal de <span className="text-green-400">construcción de comunidad</span> y visibilidad, no de conversión directa.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">CPL REAL META PAGADO</p>
            <p className={`font-bold text-2xl ${
              cplMetaPagado <= 20000 ? 'text-green-400' :
              cplMetaPagado <= 60000 ? 'text-yellow-400' : 'text-red-400'
            }`}>${cplMetaPagado.toLocaleString('es-CL')}</p>
            <p className="text-gray-500 text-xs mt-1">vs Google: ${monthData.googleAdsMetrics.cpl.toLocaleString('es-CL')}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">FUERZA ORGÁNICA</p>
            <p className="text-white font-semibold text-sm leading-snug">
              <span className="text-[#22d3ee] font-bold">{m.leadsInstagram}</span> leads desde IG orgánico este mes.
              El 94.4% del crecimiento de seguidores es <span className="text-green-400">orgánico</span>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MetaAdsPage;
