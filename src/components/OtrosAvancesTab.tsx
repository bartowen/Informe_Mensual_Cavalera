import React from 'react';
import { Check, Clock, Loader2, CheckCircle, Calendar } from 'lucide-react';

const OtrosAvancesTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-2">🔧 Avances Técnicos & Hitos</h2>
        <p className="text-purple-100">
          Mejoras implementadas en tracking, medición y optimización de campañas
        </p>
      </div>

      {/* NUEVO: Tracking de Formularios - Card Principal */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-4 md:p-6 border-2 border-green-200">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="bg-green-500 rounded-full p-2 md:p-3 flex-shrink-0">
            <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
              ✅ Tracking de Formularios
            </h3>
            <p className="text-xs md:text-sm text-gray-700 mb-4">
              Sistema implementado para identificar origen de cada lead
            </p>

            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-green-900">Completado</span>
            </div>

            <p className="text-sm text-emerald-800 bg-emerald-100 rounded-lg p-3 border-l-4 border-emerald-500">
              <strong>Período de testeo finalizado</strong>
              <br/>
              <span className="text-xs">22 Nov - 9 Dic 2025: Sistema validado y funcionando correctamente</span>
            </p>

            {/* Resultados del periodo de prueba - DATOS REALES AGENDAPRO */}
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <div className="text-xs text-gray-600 mb-1">Total Solicitudes</div>
                <div className="text-xl md:text-2xl font-bold text-green-600">91</div>
                <div className="text-xs text-gray-500 mt-1">22 Nov - 9 Dic</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-blue-200">
                <div className="text-xs text-gray-600 mb-1">Agendados</div>
                <div className="text-xl md:text-2xl font-bold text-blue-600">0</div>
                <div className="text-xs text-gray-500 mt-1">En seguimiento</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-purple-200">
                <div className="text-xs text-gray-600 mb-1">Fuentes</div>
                <div className="text-xl md:text-2xl font-bold text-purple-600">4+</div>
                <div className="text-xs text-gray-500 mt-1">Identificadas</div>
              </div>

              <div className="bg-white rounded-lg p-3 border border-orange-200">
                <div className="text-xs text-gray-600 mb-1">Conversión</div>
                <div className="text-xl md:text-2xl font-bold text-orange-600">0,0%</div>
                <div className="text-xs text-gray-500 mt-1">Solicitud → Agendado</div>
              </div>
            </div>

            {/* Desglose de fuentes - DATOS REALES AGENDAPRO */}
            <div className="mt-4 md:mt-6">
              <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3">
                📈 Distribución por Fuente (22 Nov - 9 Dic):
              </h4>
              <div className="space-y-2 md:space-y-3">
                {/* Orgánico */}
                <div className="flex items-center gap-2">
                  <div className="w-20 md:w-28 text-xs md:text-sm text-gray-700 font-medium flex-shrink-0">
                    Orgánico
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-5 md:h-6 overflow-hidden min-w-0">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full flex items-center justify-end px-2"
                      style={{ width: '37%' }}
                    >
                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                        34 (37%)
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 w-16 md:w-20 text-right flex-shrink-0">
                    0 agend.
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-2">
                  <div className="w-20 md:w-28 text-xs md:text-sm text-gray-700 font-medium flex-shrink-0">
                    Instagram
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-5 md:h-6 overflow-hidden min-w-0">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full flex items-center justify-end px-2"
                      style={{ width: '33%' }}
                    >
                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                        30 (33%)
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 w-16 md:w-20 text-right flex-shrink-0">
                    0 agend.
                  </div>
                </div>

                {/* Google */}
                <div className="flex items-center gap-2">
                  <div className="w-20 md:w-28 text-xs md:text-sm text-gray-700 font-medium flex-shrink-0">
                    Google
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-5 md:h-6 overflow-hidden min-w-0">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full flex items-center justify-end px-2"
                      style={{ width: '23%' }}
                    >
                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                        21 (23%)
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 w-16 md:w-20 text-right flex-shrink-0">
                    0 agend.
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-2">
                  <div className="w-20 md:w-28 text-xs md:text-sm text-gray-700 font-medium flex-shrink-0">
                    Meta
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-5 md:h-6 overflow-hidden min-w-0">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full flex items-center justify-end px-2"
                      style={{ width: '7%' }}
                    >
                      <span className="text-xs font-semibold text-white whitespace-nowrap">
                        6 (7%)
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 w-16 md:w-20 text-right flex-shrink-0">
                    0 agend.
                  </div>
                </div>
              </div>
            </div>

            {/* Nota importante - ACTUALIZADA */}
            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs md:text-sm text-blue-800">
                <strong>💡 Análisis del período de prueba:</strong> Se recibieron <strong>91 solicitudes de contacto</strong> entre el 22 de Nov y 9 de Dic.
                El origen principal es <strong>Orgánico (37%)</strong>, seguido por
                <strong> Instagram (33%)</strong> y <strong>Google (23%)</strong>.
                Los agendamientos se confirman por WhatsApp y llamadas telefónicas.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline de Hitos */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-600" />
          📅 Línea de Tiempo de Implementaciones
        </h3>

        <div className="space-y-6">
          {/* Hito 1: Identificación de Formularios */}
          <div className="relative pl-8 border-l-4 border-emerald-500 pb-6">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-emerald-900">
                    ✅ Identificación de Origen de Formularios
                  </h4>
                  <p className="text-sm text-emerald-700">Noviembre 2025 - Completado</p>
                </div>
                <span className="bg-emerald-200 text-emerald-900 text-xs px-3 py-1 rounded-full font-semibold">
                  Activo
                </span>
              </div>

              <p className="text-sm text-emerald-800 mb-4">
                Sistema implementado para identificar automáticamente de dónde proviene cada formulario
                de contacto (Google Ads, Orgánico, Instagram, Facebook, Directo, etc.)
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded p-3 border border-emerald-200">
                  <div className="text-xs font-semibold text-emerald-700 mb-2">🎯 Objetivo:</div>
                  <ul className="text-xs text-emerald-900 space-y-1">
                    <li>• Rastrear origen de cada lead</li>
                    <li>• Medir ROI por canal</li>
                    <li>• Preparar cruce con AgendaPro</li>
                  </ul>
                </div>

                <div className="bg-white rounded p-3 border border-emerald-200">
                  <div className="text-xs font-semibold text-emerald-700 mb-2">🛠️ Implementación:</div>
                  <ul className="text-xs text-emerald-900 space-y-1">
                    <li>• UTM parameters en URLs</li>
                    <li>• GCLID para Google Ads</li>
                    <li>• FBCLID para Meta Ads</li>
                    <li>• Cookie tracking de sesión</li>
                  </ul>
                </div>
              </div>

              {/* Imagen placeholder */}
              <div className="border-2 border-emerald-300 rounded-lg overflow-hidden bg-white">
                <div className="bg-gradient-to-r from-emerald-100 to-cyan-100 p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-3" />
                  <p className="text-sm text-emerald-900 font-medium">
                    Panel de administración - Tracking de solicitudes
                  </p>
                </div>
                <div className="bg-emerald-100 p-2 text-xs text-emerald-900 font-medium text-center">
                  Dashboard mostrando origen de cada solicitud (Google, Orgánico, Instagram, Meta)
                </div>
              </div>

              <div className="mt-4 p-3 bg-white border-l-4 border-emerald-600 rounded">
                <div className="text-xs font-bold text-emerald-900 mb-2">📊 Resultados Noviembre 2025:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="bg-emerald-50 rounded p-2">
                    <div className="text-emerald-700 mb-1">Google Ads</div>
                    <div className="font-bold text-xl text-emerald-900">16</div>
                    <div className="text-emerald-600">solicitudes</div>
                  </div>
                  <div className="bg-blue-50 rounded p-2">
                    <div className="text-blue-700 mb-1">Orgánico</div>
                    <div className="font-bold text-xl text-blue-900">29</div>
                    <div className="text-blue-600">solicitudes</div>
                  </div>
                  <div className="bg-pink-50 rounded p-2">
                    <div className="text-pink-700 mb-1">Instagram</div>
                    <div className="font-bold text-xl text-pink-900">23</div>
                    <div className="text-pink-600">solicitudes</div>
                  </div>
                  <div className="bg-purple-50 rounded p-2">
                    <div className="text-purple-700 mb-1">Meta Ads</div>
                    <div className="font-bold text-xl text-purple-900">1</div>
                    <div className="text-purple-600">solicitud</div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-200 text-center">
                  <span className="font-bold text-emerald-900">Total: 69 solicitudes rastreadas en noviembre</span>
                </div>
              </div>
            </div>
          </div>

          {/* Hito 2: Integración AgendaPro */}
          <div className="relative pl-8 border-l-4 border-amber-500 pb-6">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
              <Clock className="w-4 h-4 text-white" />
            </div>

            <div className="bg-amber-50 rounded-lg p-5 border border-amber-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-amber-900">
                    🔄 Cruce de Datos con AgendaPro
                  </h4>
                  <p className="text-sm text-amber-700">Diciembre 2025 - En Progreso</p>
                </div>
                <span className="bg-amber-200 text-amber-900 text-xs px-3 py-1 rounded-full font-semibold">
                  70% Completado
                </span>
              </div>

              <p className="text-sm text-amber-800 mb-4">
                Desarrollo de sistema para cruzar formularios de marketing con ventas reales en AgendaPro,
                permitiendo calcular ROI exacto por canal.
              </p>

              <div className="space-y-3">
                {/* Paso 1 - Completado */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white rounded p-3 border border-emerald-200">
                    <div className="text-sm font-semibold text-emerald-900">1. Identificación de formularios</div>
                    <div className="text-xs text-emerald-700">Sistema de tracking implementado ✓</div>
                  </div>
                </div>

                {/* Paso 2 - Completado */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 bg-white rounded p-3 border border-emerald-200">
                    <div className="text-sm font-semibold text-emerald-900">2. Almacenamiento de datos</div>
                    <div className="text-xs text-emerald-700">Base de datos de leads creada ✓</div>
                  </div>
                </div>

                {/* Paso 3 - En progreso */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center shadow">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                  <div className="flex-1 bg-amber-50 rounded p-3 border-2 border-amber-300">
                    <div className="text-sm font-semibold text-amber-900">3. Integración API AgendaPro</div>
                    <div className="text-xs text-amber-700">En desarrollo - 60% completado 🔄</div>
                  </div>
                </div>

                {/* Paso 4 - Pendiente */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow">
                    <span className="text-white font-bold text-xs">4</span>
                  </div>
                  <div className="flex-1 bg-white rounded p-3 border border-gray-200">
                    <div className="text-sm font-semibold text-gray-600">4. Matching automático</div>
                    <div className="text-xs text-gray-500">Pendiente - Próxima fase</div>
                  </div>
                </div>

                {/* Paso 5 - Pendiente */}
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center shadow">
                    <span className="text-white font-bold text-xs">5</span>
                  </div>
                  <div className="flex-1 bg-white rounded p-3 border border-gray-200">
                    <div className="text-sm font-semibold text-gray-600">5. Dashboard de ROI real</div>
                    <div className="text-xs text-gray-500">Pendiente - Última fase</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white border-l-4 border-amber-600 rounded">
                <div className="text-xs font-bold text-amber-900 mb-1">🎯 Objetivo Final:</div>
                <p className="text-xs text-amber-800">
                  Saber exactamente cuántos de los 84 formularios de Google Ads se convirtieron en
                  ventas reales, con qué valores, y calcular el ROI confirmado (no estimado).
                </p>
              </div>
            </div>
          </div>

          {/* Hito 3: Dashboard Unificado */}
          <div className="relative pl-8 border-l-4 border-gray-300 pb-6">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xs">3</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-gray-700">
                    📊 Dashboard Unificado Multi-Canal
                  </h4>
                  <p className="text-sm text-gray-600">Enero 2026 - Planificado</p>
                </div>
                <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full font-semibold">
                  Pendiente
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Dashboard que integre todos los canales (Google Ads, Meta Ads, Orgánico) con
                ventas reales de AgendaPro para visualización completa del customer journey.
              </p>

              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white rounded p-3 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">📈 Incluirá:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• ROI por canal</li>
                    <li>• Customer journey completo</li>
                    <li>• Atribución multi-touch</li>
                  </ul>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">🎯 Beneficios:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Optimización basada en datos reales</li>
                    <li>• Presupuesto inteligente</li>
                    <li>• Predicción de resultados</li>
                  </ul>
                </div>

                <div className="bg-white rounded p-3 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">⏱️ Timeline:</div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Inicio: Enero 2026</li>
                    <li>• Duración: 2 meses</li>
                    <li>• Beta: Marzo 2026</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas de Progreso General */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-500">
          <div className="text-sm text-gray-600 mb-1">Hitos Completados</div>
          <div className="text-4xl font-bold text-emerald-600">1/3</div>
          <div className="text-xs text-gray-500 mt-2">33% del roadmap total</div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-500">
          <div className="text-sm text-gray-600 mb-1">En Progreso</div>
          <div className="text-4xl font-bold text-amber-600">1</div>
          <div className="text-xs text-gray-500 mt-2">Integración AgendaPro (70%)</div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-gray-300">
          <div className="text-sm text-gray-600 mb-1">Próximos Hitos</div>
          <div className="text-4xl font-bold text-gray-600">1</div>
          <div className="text-xs text-gray-500 mt-2">Dashboard unificado Q1 2026</div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtrosAvancesTab;
