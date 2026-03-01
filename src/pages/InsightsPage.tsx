import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Lightbulb, Filter } from 'lucide-react';

type InsightTipo = 'positivo' | 'negativo' | 'alerta';
type InsightCategoria = 'Google Ads' | 'Meta Ads' | 'Ubicaciones' | 'Horarios' | 'Ventas';

interface Insight {
  categoria: InsightCategoria;
  tipo: InsightTipo;
  icono: string;
  titulo: string;
  descripcion: string;
  dato: string;
}

const insights: Insight[] = [
  // ── GOOGLE ADS ──
  {
    categoria: 'Google Ads',
    tipo: 'positivo',
    icono: '🏆',
    titulo: '"tatuajes en el mut" — keyword más eficiente',
    descripcion: 'CPL promedio $2.784 en los 3 meses (Dic $1.783 · Ene $3.323 · Feb $3.796). Es la keyword con mejor retorno consistente. Recomendación: aumentar presupuesto asignado.',
    dato: 'CPL promedio: $2.784',
  },
  {
    categoria: 'Google Ads',
    tipo: 'positivo',
    icono: '🏷️',
    titulo: '[cover up tatuajes] — CPL excepcional en febrero',
    descripcion: 'CPL de $1.473 en febrero con 3.7 leads reales. Aunque es volátil ($5.487 en dic, $13.845 en ene), cuando funciona es la keyword más rentable. Vale seguir probando.',
    dato: 'CPL Feb: $1.473',
  },
  {
    categoria: 'Google Ads',
    tipo: 'negativo',
    icono: '⚠️',
    titulo: '"estudio de tatuajes" — alto volumen, CPL sobre $10.000',
    descripcion: 'Es la keyword con más clics los 3 meses pero CPL consistentemente alto: $11.716 (dic) · $10.458 (ene) · $10.616 (feb). Genera volumen pero a costo elevado. Evaluar reducir presupuesto o mejorar la página de destino.',
    dato: 'CPL promedio: $10.930',
  },
  {
    categoria: 'Google Ads',
    tipo: 'negativo',
    icono: '🚫',
    titulo: '"tattoo studio providencia" — ineficiente en enero',
    descripcion: 'CPL de $42.682 en enero. Casi 5x el promedio del mes. En febrero bajó a $13.905. Revisar el grupo de anuncios asociado.',
    dato: 'CPL Ene: $42.682',
  },

  // ── UBICACIONES ──
  {
    categoria: 'Ubicaciones',
    tipo: 'positivo',
    icono: '📍',
    titulo: 'Las Condes concentra más del 65% de los leads Google',
    descripcion: 'Los 3 meses: Dic 31.7 leads (73.7%) · Ene 25.2 leads (54.8%) · Feb 35.4 leads (66.8%). Es la zona geográfica más rentable con CPC consistentemente bajo.',
    dato: 'Dic: 31.7 | Ene: 25.2 | Feb: 35.4',
  },
  {
    categoria: 'Ubicaciones',
    tipo: 'alerta',
    icono: '💡',
    titulo: 'Lo Barnechea — buena conversión, bajo volumen',
    descripcion: 'En Dic y Feb muestra buenas tasas de conversión relativa con CPC bajo ($184-$265). El volumen es bajo (16-35 clics) pero la eficiencia es alta. Podría ser una zona a potenciar.',
    dato: 'CPC promedio: $224',
  },
  {
    categoria: 'Ubicaciones',
    tipo: 'negativo',
    icono: '⚠️',
    titulo: 'La Reina — CPC alto con baja conversión en enero',
    descripcion: 'En enero CPC de $356 con solo 0.4 leads reales. El CPC más alto de todas las zonas ese mes. En otros meses tiene mejor rendimiento. Monitorear.',
    dato: 'CPC Ene: $356',
  },

  // ── HORARIOS ──
  {
    categoria: 'Horarios',
    tipo: 'positivo',
    icono: '⏰',
    titulo: 'Sábados noche — el mejor horario consistente',
    descripcion: 'Sábado 19-20h aparece como top en los 3 meses: Dic(Sáb 19h: 2.1 conv) · Ene(Sáb múltiples franjas fuertes) · Feb(Sáb 20h: 3.5 conv). El usuario busca tatuajes el fin de semana en la noche.',
    dato: 'Feb Sáb 20h: 3.5 leads con solo 13 clics',
  },
  {
    categoria: 'Horarios',
    tipo: 'positivo',
    icono: '⏰',
    titulo: 'Lunes y Miércoles mediodía — horario laboral eficiente',
    descripcion: 'Lun/Mié 12-13h aparecen consistentemente en el top los 3 meses. El usuario también busca en horario de almuerzo durante la semana.',
    dato: 'Promedio 1.5-2.0 leads en estas franjas',
  },

  // ── META ADS ──
  {
    categoria: 'Meta Ads',
    tipo: 'positivo',
    icono: '🌱',
    titulo: 'El 94.4% del crecimiento de seguidores es orgánico',
    descripcion: 'En 3 meses se sumaron 4.827 nuevos seguidores en IG: solo 272 (5.6%) vinieron por anuncios. El 94.4% restante (4.555) creció de forma orgánica. Meta construye comunidad, no solo convierte.',
    dato: 'Orgánicos: 4.555 | Vía Ads: 272',
  },
  {
    categoria: 'Meta Ads',
    tipo: 'positivo',
    icono: '💬',
    titulo: '1 de cada 28 visitas al perfil genera un lead orgánico',
    descripcion: 'De 2.326 visitas al perfil de IG en 3 meses, se generaron 140 leads totales. Eso es una tasa de conversión del 6% perfil → lead, completamente orgánica y sin costo adicional.',
    dato: '2.326 visitas → 140 leads (6% conversión)',
  },
  {
    categoria: 'Meta Ads',
    tipo: 'negativo',
    icono: '📈',
    titulo: 'CPL Meta pagado subió 7x en 3 meses',
    descripcion: 'El costo por lead real de Meta pagado escaló: Dic $17.005 · Ene $48.647 · Feb $120.775. Con solo 3 leads reales en febrero a $120k cada uno, la pauta directa es ineficiente. Reorientar a construir comunidad.',
    dato: 'CPL: $17k → $49k → $121k',
  },
  {
    categoria: 'Meta Ads',
    tipo: 'alerta',
    icono: '🎯',
    titulo: 'BOFU Conv Santiago concentra el 73% de los leads reales',
    descripcion: 'En el período Ene-Feb, el conjunto BOFU generó 10.2 de 14 leads reales (73%). Pero su CPA real es $56.287, muy por encima de Google ($8.178). Los otros conjuntos (Piercing, Secuencia) aportan poco a bajo costo-eficiencia.',
    dato: 'BOFU: 73% leads | CPA real $56.287',
  },
  {
    categoria: 'Meta Ads',
    tipo: 'negativo',
    icono: '📉',
    titulo: 'Leads Meta pagados cayeron de 14 a 3 en 3 meses (-79%)',
    descripcion: 'Dic: 14 leads · Ene: 11 leads · Feb: 3 leads. Caída del 79% en leads pagados reales. Instagram orgánico también cae pero más lento (58→43→39). La pauta Meta pierde eficiencia conversora mes a mes.',
    dato: 'Caída pagada: 14 → 11 → 3 leads',
  },

  // ── VENTAS ──
  {
    categoria: 'Ventas',
    tipo: 'alerta',
    icono: '📊',
    titulo: 'Febrero cerró un 19% por debajo de enero en ventas',
    descripcion: '$31.7M vs $39.2M en enero. La cantidad de ventas también bajó (343 vs 379). Puede ser estacionalidad de verano. Las ventas por ticket alto (Tatuaje 300) siguen siendo el servicio top.',
    dato: 'Caída: -$7.5M vs enero',
  },
  {
    categoria: 'Ventas',
    tipo: 'positivo',
    icono: '🎨',
    titulo: 'Tatuajes de ticket alto lideran consistentemente',
    descripcion: 'Tatuaje 300, 250 y 150 están siempre en el top de ventas por monto. El ticket promedio del negocio se mantiene sobre $92.000 incluso en el mes más bajo.',
    dato: 'Ticket promedio 3 meses: $100.578',
  },
  {
    categoria: 'Ventas',
    tipo: 'positivo',
    icono: '💉',
    titulo: 'Piercing creció en febrero pese a baja general',
    descripcion: 'Piercing Oreja subió a $2.23M (vs $1.65M en ene, +35%) y Piercing Rostro a $875k (vs $690k, +27%). El piercing está ganando participación en el mix de ventas.',
    dato: 'Piercing Oreja Feb: +35% vs enero',
  },
];

const categorias: (InsightCategoria | 'Todos')[] = [
  'Todos', 'Google Ads', 'Meta Ads', 'Ubicaciones', 'Horarios', 'Ventas',
];

const tipoBadge: Record<InsightTipo, { label: string; className: string; borderClass: string; bgClass: string }> = {
  positivo: {
    label: '✓ Oportunidad',
    className: 'bg-green-100 text-green-700',
    borderClass: 'border-green-300',
    bgClass: 'bg-green-50',
  },
  negativo: {
    label: '⚠ Atención',
    className: 'bg-red-100 text-red-700',
    borderClass: 'border-red-300',
    bgClass: 'bg-red-50',
  },
  alerta: {
    label: '💡 Observación',
    className: 'bg-yellow-100 text-yellow-700',
    borderClass: 'border-yellow-300',
    bgClass: 'bg-yellow-50',
  },
};

const categoriaColors: Record<InsightCategoria, string> = {
  'Google Ads':   'bg-blue-100 text-blue-700',
  'Meta Ads':     'bg-purple-100 text-purple-700',
  'Ubicaciones':  'bg-red-100 text-red-700',
  'Horarios':     'bg-orange-100 text-orange-700',
  'Ventas':       'bg-green-100 text-green-700',
};

const counts = {
  positivo: insights.filter(i => i.tipo === 'positivo').length,
  negativo: insights.filter(i => i.tipo === 'negativo').length,
  alerta:   insights.filter(i => i.tipo === 'alerta').length,
};

const InsightsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<InsightCategoria | 'Todos'>('Todos');

  const filtered = activeFilter === 'Todos'
    ? insights
    : insights.filter(i => i.categoria === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-3">
            <Lightbulb className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Insights Automáticos</h1>
            <p className="text-gray-500">Dic 2025 · Ene 2026 · Feb 2026 — Análisis cruzado de los 3 meses</p>
          </div>
        </div>
      </div>

      {/* Resumen KPIs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="font-bold text-2xl text-green-700">{counts.positivo}</span>
          </div>
          <p className="text-green-600 text-sm font-medium">Oportunidades</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <span className="font-bold text-2xl text-red-700">{counts.negativo}</span>
          </div>
          <p className="text-red-600 text-sm font-medium">Puntos de atención</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="font-bold text-2xl text-yellow-700">{counts.alerta}</span>
          </div>
          <p className="text-yellow-600 text-sm font-medium">Observaciones</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-semibold text-gray-600">Filtrar por categoría</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === cat
                  ? 'bg-[#22d3ee] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
              {cat !== 'Todos' && (
                <span className="ml-1.5 text-xs opacity-75">
                  ({insights.filter(i => i.categoria === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((insight, idx) => {
          const badge = tipoBadge[insight.tipo];
          return (
            <div
              key={idx}
              className={`rounded-xl border-2 p-5 ${badge.borderClass} ${badge.bgClass}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{insight.icono}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoriaColors[insight.categoria]}`}>
                    {insight.categoria}
                  </span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${badge.className}`}>
                  {badge.label}
                </span>
              </div>

              <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2">
                {insight.titulo}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {insight.descripcion}
              </p>

              <div className="bg-white/60 rounded-lg px-3 py-2 border border-white/80">
                <p className="text-xs font-bold text-gray-700">{insight.dato}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p>No hay insights para esta categoría</p>
        </div>
      )}
    </div>
  );
};

export default InsightsPage;
