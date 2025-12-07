import React from 'react';
import {
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Target,
  BarChart3,
  CheckCircle2,
  Clock,
  Wrench,
  Calendar,
  AlertCircle,
  Lightbulb,
  ArrowUp,
  Leaf,
  Bot,
} from 'lucide-react';

const ResumenGeneralTab: React.FC = () => {
  return (
    <div className="space-y-6 p-6">

      {/* Sección 1: KPIs Globales del Mes */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-[#3bc6dc]">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <TrendingUp className="w-7 h-7 text-[#3bc6dc]" />
          Resumen Ejecutivo - Noviembre 2025
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* KPI 1: Inversión Total Marketing */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-5 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full font-semibold">
                Total
              </span>
            </div>
            <div className="text-3xl font-bold text-blue-900">$279.922</div>
            <div className="text-sm text-blue-700 mt-1">Inversión en Marketing</div>
            <div className="text-xs text-blue-600 mt-2">
              Google Ads: $279.922 • Meta: $0 • GA4: Gratis
            </div>
          </div>

          {/* KPI 2: Leads Totales */}
          <div className="bg-gradient-to-br from-[#3bc6dc]/10 to-[#3bc6dc]/20 rounded-lg p-5 border-l-4 border-[#3bc6dc]">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-[#3bc6dc]" />
              <span className="text-xs bg-[#3bc6dc]/20 text-[#21a9c2] px-2 py-1 rounded-full font-semibold">
                Confirmado
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900">84</div>
            <div className="text-sm text-gray-700 mt-1">Formularios Recibidos</div>
            <div className="text-xs text-gray-600 mt-2">
              Google: 84 • Meta: 0 • Orgánico: 29
            </div>
          </div>

          {/* KPI 3: Ventas Totales AgendaPro */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-5 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-emerald-600" />
              <ArrowUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-emerald-900">$41.839.303</div>
            <div className="text-sm text-emerald-700 mt-1">Ventas Totales del Mes</div>
            <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +22,7% vs octubre (339 transacciones)
            </div>
          </div>

          {/* KPI 4: ROI Estimado */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-5 border-l-4 border-amber-500">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-amber-600" />
              <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full font-semibold">
                Estimado
              </span>
            </div>
            <div className="text-3xl font-bold text-amber-900">~3.603%</div>
            <div className="text-sm text-amber-700 mt-1">ROI Proyectado</div>
            <div className="text-xs text-amber-600 mt-2">
              Por cada $1 → $37 en ingresos estimados
            </div>
          </div>

        </div>
      </div>

      {/* Sección 2: Rendimiento por Canal */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#3bc6dc]" />
          Rendimiento por Canal
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          {/* Canal 1: Google Ads */}
          <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded p-1 shadow-sm">
                  <img
                    src="/src/assets/logo_google_ads.png"
                    alt="Google Ads"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-gray-900">Google Ads</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Inversión:</span>
                <span className="font-bold">$279.922</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formularios:</span>
                <span className="font-bold text-green-600">84</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CPA:</span>
                <span className="font-bold">$3.332</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CTR:</span>
                <span className="font-bold">11,77%</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="text-xs text-green-700 font-medium">
                ✓ Campaña activa y optimizada
              </div>
            </div>
          </div>

          {/* Canal 2: Meta Ads */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded p-1 shadow-sm">
                  <img
                    src="/src/assets/logo_meta_.png"
                    alt="Meta Ads"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-gray-900">Meta Ads</span>
              </div>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>

            <div className="space-y-2 text-sm text-gray-500">
              <div className="flex justify-between">
                <span>Inversión:</span>
                <span className="font-bold">$0</span>
              </div>
              <div className="flex justify-between">
                <span>Formularios:</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between">
                <span>Estado:</span>
                <span className="font-bold">Pausada</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
              <div className="text-xs text-gray-600 font-medium">
                ⏸️ Campaña en pausa - Diciembre
              </div>
            </div>
          </div>

          {/* Canal 3: Orgánico (GA4) */}
          <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded p-1 shadow-sm">
                  <img
                    src="/src/assets/logo_ga4-removebg-preview.png"
                    alt="GA4"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-gray-900 text-sm">Tráfico Orgánico</span>
              </div>
              <Leaf className="w-5 h-5 text-green-600" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Costo:</span>
                <span className="font-bold text-green-600">$0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Formularios:</span>
                <span className="font-bold">29</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuente:</span>
                <span className="font-bold text-xs">Búsqueda/Directo</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-blue-200">
              <div className="text-xs text-blue-700 font-medium">
                💰 ROI infinito (sin inversión)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sección 3: Insights Principales */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Insights Positivos */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow p-6 border-l-4 border-emerald-500">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-emerald-900">
            <TrendingUp className="w-5 h-5" />
            💚 Lo que está funcionando bien
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Google Ads con ROI excepcional:</strong> CTR de 11,77% (arriba del promedio 4-6%)
                y CPA de $3.332 muy por debajo del ticket promedio.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Mobile dominante:</strong> 88% de formularios vienen de celular.
                La experiencia móvil está optimizada.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Las Condes es oro:</strong> 79% de conversiones de una sola comuna.
                Segmentación geográfica muy efectiva.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Ventas totales +22,7%:</strong> Crecimiento sostenido mes a mes
                en ingresos totales de AgendaPro.
              </div>
            </li>
          </ul>
        </div>

        {/* Oportunidades de Mejora */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl shadow p-6 border-l-4 border-amber-500">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-900">
            <Lightbulb className="w-5 h-5" />
            💡 Oportunidades de optimización
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Escalar Google Ads:</strong> Con ROI de 3.603%, hay espacio para
                aumentar presupuesto en keywords top performers.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Activar Meta Ads:</strong> Instagram tiene 23 solicitudes orgánicas.
                Campaña pagada podría multiplicar resultados.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Mejorar tracking:</strong> Implementar cruce con AgendaPro para
                medir conversión real de formulario a venta.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Optimizar horarios:</strong> 18:00 es hora peak. Aumentar pujas
                en horario 16:00-19:00.
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Sección 4: Avances Técnicos del Mes */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Wrench className="w-6 h-6 text-[#3bc6dc]" />
          🔧 Avances Técnicos Noviembre
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <div className="bg-emerald-50 rounded-lg p-4 border-l-4 border-emerald-500">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-bold text-sm">Tracking de Formularios</span>
            </div>
            <p className="text-xs text-gray-700">
              Sistema implementado para identificar origen de cada lead (Google, Instagram, Orgánico, etc.)
            </p>
            <div className="mt-2 text-xs font-semibold text-emerald-700">
              ✓ Completado - Activo
            </div>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-500">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span className="font-bold text-sm">Integración AgendaPro</span>
            </div>
            <p className="text-xs text-gray-700">
              API en desarrollo para cruzar formularios con ventas reales y calcular ROI confirmado
            </p>
            <div className="mt-2 text-xs font-semibold text-amber-700">
              ⏳ 70% Completado
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-blue-600" />
              <span className="font-bold text-sm">Bartowen AI</span>
            </div>
            <p className="text-xs text-gray-700">
              Asistente de IA para análisis de métricas y recomendaciones automáticas
            </p>
            <div className="mt-2 text-xs font-semibold text-blue-700">
              📅 Planificado Q1 2026
            </div>
          </div>

        </div>
      </div>

      {/* Sección 5: Comparación Mensual (Próximamente) */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow p-6 border-2 border-dashed border-gray-300">
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Comparación de Meses
          </h3>
          <p className="text-gray-600 mb-4">
            Próximamente podrás comparar el rendimiento entre diferentes meses
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Disponible a partir de Diciembre 2025</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ResumenGeneralTab;
