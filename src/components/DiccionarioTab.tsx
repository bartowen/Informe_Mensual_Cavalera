import React from 'react';
import {
  Target,
  DollarSign,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

const DiccionarioTab: React.FC = () => {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl">
        <h2 className="text-3xl font-bold mb-2">📖 Diccionario de Métricas de Marketing</h2>
        <p className="text-indigo-100">
          Aprende qué significa cada métrica y cómo interpretarla para tomar mejores decisiones
        </p>
      </div>

      {/* Sección 1: Métricas Básicas */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-600" />
          Métricas Básicas de Google Ads
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Impresiones */}
          <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded">
            <h4 className="font-bold text-lg text-blue-900 mb-2">
              👁️ Impresiones (Impr.)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Las veces que tu anuncio apareció en Google cuando alguien buscó.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> Si tu anuncio apareció 9.285 veces, significa que 9.285 búsquedas mostraron tu anuncio.
            </p>
            <p className="text-sm text-green-700 font-medium">
              ✓ Bueno: Más impresiones = Más visibilidad
            </p>
          </div>

          {/* Clics */}
          <div className="border-l-4 border-cyan-500 pl-4 py-3 bg-cyan-50 rounded">
            <h4 className="font-bold text-lg text-cyan-900 mb-2">
              👆 Clics
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Cuántas personas hicieron clic en tu anuncio para visitar tu sitio web.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> 1.093 clics = 1.093 personas visitaron tu sitio desde el anuncio.
            </p>
            <p className="text-sm text-green-700 font-medium">
              ✓ Bueno: Más clics = Más visitas al sitio
            </p>
          </div>

          {/* CTR */}
          <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded">
            <h4 className="font-bold text-lg text-purple-900 mb-2">
              📊 CTR (Click-Through Rate)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Porcentaje de personas que hicieron clic después de ver tu anuncio.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Fórmula:</strong> (Clics ÷ Impresiones) × 100
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> 11,77% significa que de cada 100 personas que vieron el anuncio, 12 hicieron clic.
            </p>
            <div className="mt-2 text-xs bg-purple-100 p-2 rounded">
              <strong>Rangos:</strong> Excelente: &gt;10% | Bueno: 5-10% | Regular: 2-5% | Bajo: &lt;2%
            </div>
          </div>

          {/* Conversiones */}
          <div className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50 rounded">
            <h4 className="font-bold text-lg text-emerald-900 mb-2">
              ✅ Conversiones (Conv.)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Acciones valiosas que completaron los visitantes (formularios, llamadas, compras).
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Para Cavalera:</strong> Formularios de contacto completados = form_submit
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> 84 conversiones = 84 personas llenaron el formulario de contacto.
            </p>
            <p className="text-sm text-emerald-700 font-medium">
              ✓ Esta es la métrica MÁS IMPORTANTE para medir resultados
            </p>
          </div>

        </div>
      </div>

      {/* Sección 2: Métricas de Costo */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Métricas de Costo y Eficiencia
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* CPC */}
          <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded">
            <h4 className="font-bold text-lg text-blue-900 mb-2">
              💰 CPC (Costo Por Clic)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Cuánto pagas en promedio cada vez que alguien hace clic en tu anuncio.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Fórmula:</strong> Costo Total ÷ Número de Clics
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> $256 CPC = Cada clic te costó $256 pesos chilenos en promedio.
            </p>
            <p className="text-sm text-blue-700 font-medium">
              ℹ️ Más bajo es mejor (significa que pagas menos por cada visita)
            </p>
          </div>

          {/* CPA */}
          <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded">
            <h4 className="font-bold text-lg text-purple-900 mb-2">
              🎯 CPA (Costo Por Adquisición)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Cuánto te costó conseguir cada conversión (cada formulario).
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Fórmula:</strong> Inversión Total ÷ Número de Conversiones
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> $3.332 CPA = Cada formulario te costó $3.332 pesos.
            </p>
            <p className="text-sm text-purple-700 font-medium">
              ℹ️ Compáralo con tu ticket promedio ($123.420). Si CPA &lt; Ticket = ¡Rentable!
            </p>
          </div>

          {/* Tasa de Conversión */}
          <div className="border-l-4 border-emerald-500 pl-4 py-3 bg-emerald-50 rounded">
            <h4 className="font-bold text-lg text-emerald-900 mb-2">
              📈 Tasa de Conversión
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Porcentaje de visitantes que completaron una conversión.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Fórmula:</strong> (Conversiones ÷ Clics) × 100
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> 7,71% = De cada 100 visitantes, 8 llenaron el formulario.
            </p>
            <div className="mt-2 text-xs bg-emerald-100 p-2 rounded">
              <strong>Rangos:</strong> Excelente: &gt;6% | Bueno: 3-6% | Regular: 1-3% | Bajo: &lt;1%
            </div>
          </div>

          {/* Quality Score */}
          <div className="border-l-4 border-amber-500 pl-4 py-3 bg-amber-50 rounded">
            <h4 className="font-bold text-lg text-amber-900 mb-2">
              ⭐ QS (Quality Score / Nivel de Calidad)
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              <strong>¿Qué es?</strong> Calificación de Google (1-10) sobre qué tan relevante es tu anuncio.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Factores:</strong> CTR esperado, relevancia del anuncio, experiencia en landing page.
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Ejemplo:</strong> QS 8/10 = Muy buena calidad, pagarás menos por clic.
            </p>
            <div className="mt-2 text-xs bg-amber-100 p-2 rounded">
              <strong>Rangos:</strong> 10-9 Excelente | 8-7 Bueno | 6-5 Regular | 4-1 Malo
            </div>
          </div>

        </div>
      </div>

      {/* Sección 3: Métricas de Retorno (ROI vs ROAS) */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow p-6 border-2 border-yellow-300">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          💡 ¿Qué significa ROI y ROAS?
        </h3>

        <div className="grid md:grid-cols-2 gap-6">

          {/* ROI */}
          <div className="bg-white rounded-lg p-5 border-l-4 border-orange-500">
            <h4 className="font-bold text-xl text-orange-900 mb-3">
              📊 ROI (Return on Investment)
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              <strong>¿Qué es?</strong> Porcentaje de ganancia sobre la inversión.
              Muestra cuánto ganaste (o perdiste) comparado con lo que invertiste.
            </p>

            <div className="bg-orange-50 p-3 rounded mb-3">
              <div className="font-semibold text-sm text-orange-900 mb-2">Fórmula:</div>
              <code className="text-xs bg-orange-100 px-2 py-1 rounded block">
                ROI = ((Ingresos - Inversión) / Inversión) × 100
              </code>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-3">
              <div className="font-semibold text-sm text-gray-900 mb-2">Ejemplo Cavalera:</div>
              <div className="text-xs space-y-1">
                <div>• Inversión: $279.922</div>
                <div>• Ingresos estimados: $10.367.280</div>
                <div>• ROI: (($10.367.280 - $279.922) / $279.922) × 100</div>
                <div className="font-bold text-orange-600">• ROI = 3.603%</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
              <div className="font-semibold text-sm text-emerald-900 mb-1">
                ¿Qué significa 3.603% ROI?
              </div>
              <p className="text-xs text-emerald-800">
                Por cada $1 peso que invertiste, recuperaste tu peso + ganaste $36 pesos adicionales.
                Es decir, multiplicaste tu inversión por 37 veces.
              </p>
            </div>
          </div>

          {/* ROAS */}
          <div className="bg-white rounded-lg p-5 border-l-4 border-purple-500">
            <h4 className="font-bold text-xl text-purple-900 mb-3">
              💵 ROAS (Return on Ad Spend)
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              <strong>¿Qué es?</strong> Cuántos pesos en ingresos generaste por cada peso invertido en publicidad.
              Es más directo que ROI.
            </p>

            <div className="bg-purple-50 p-3 rounded mb-3">
              <div className="font-semibold text-sm text-purple-900 mb-2">Fórmula:</div>
              <code className="text-xs bg-purple-100 px-2 py-1 rounded block">
                ROAS = Ingresos / Inversión
              </code>
            </div>

            <div className="bg-gray-50 p-3 rounded mb-3">
              <div className="font-semibold text-sm text-gray-900 mb-2">Ejemplo Cavalera:</div>
              <div className="text-xs space-y-1">
                <div>• Inversión: $279.922</div>
                <div>• Ingresos estimados: $10.367.280</div>
                <div>• ROAS: $10.367.280 / $279.922</div>
                <div className="font-bold text-purple-600">• ROAS = 37:1</div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded p-3">
              <div className="font-semibold text-sm text-emerald-900 mb-1">
                ¿Qué significa ROAS 37:1?
              </div>
              <p className="text-xs text-emerald-800">
                Por cada $1 peso invertido en Google Ads, generaste $37 pesos en ingresos.
                Es otra forma de expresar el mismo resultado que el ROI.
              </p>
            </div>
          </div>

        </div>

        {/* Comparación ROI vs ROAS */}
        <div className="mt-6 bg-white rounded-lg p-5 border-2 border-blue-200">
          <h4 className="font-bold text-lg text-blue-900 mb-3">
            🤔 ¿Cuál es la diferencia entre ROI y ROAS?
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-3 text-left">Característica</th>
                  <th className="p-3 text-left">ROI</th>
                  <th className="p-3 text-left">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="p-3 font-medium">Se expresa como:</td>
                  <td className="p-3">Porcentaje (3.603%)</td>
                  <td className="p-3">Ratio (37:1)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Qué mide:</td>
                  <td className="p-3">Ganancia neta sobre inversión</td>
                  <td className="p-3">Ingresos totales por peso invertido</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Ejemplo:</td>
                  <td className="p-3">&quot;Gané 36 veces mi inversión&quot;</td>
                  <td className="p-3">&quot;Por cada $1 generé $37&quot;</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Cuándo usar:</td>
                  <td className="p-3">Comparar rentabilidad entre negocios</td>
                  <td className="p-3">Optimizar campañas publicitarias</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-900">
            <strong>💡 En resumen:</strong> Ambos miden rentabilidad, solo se expresan diferente.
            ROI enfatiza el % de ganancia, ROAS enfatiza cuántos pesos generas por peso invertido.
            Para Cavalera: ROI 3.603% = ROAS 37:1 = ¡Excelente resultado!
          </div>
        </div>

      </div>

      {/* Sección 4: Otras Métricas */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-cyan-600" />
          Otras Métricas Importantes
        </h3>

        <div className="space-y-4">

          <div className="border-l-4 border-pink-500 pl-4 py-3 bg-pink-50 rounded">
            <h4 className="font-bold text-lg text-pink-900 mb-2">💳 Ticket Promedio</h4>
            <p className="text-sm text-gray-700">
              Valor promedio que paga cada cliente por servicio. Para Cavalera: $123.420 (dato histórico de AgendaPro).
            </p>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4 py-3 bg-indigo-50 rounded">
            <h4 className="font-bold text-lg text-indigo-900 mb-2">🔀 Tasa de Rebote</h4>
            <p className="text-sm text-gray-700">
              Porcentaje de visitantes que salen del sitio sin interactuar. Bajo es mejor (&lt;40% excelente).
            </p>
          </div>

          <div className="border-l-4 border-teal-500 pl-4 py-3 bg-teal-50 rounded">
            <h4 className="font-bold text-lg text-teal-900 mb-2">📱 Dispositivo</h4>
            <p className="text-sm text-gray-700">
              Tipo de dispositivo usado: Desktop (computadora), Mobile (celular), Tablet.
              Para Cavalera: 88% mobile, 12% desktop.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DiccionarioTab;
