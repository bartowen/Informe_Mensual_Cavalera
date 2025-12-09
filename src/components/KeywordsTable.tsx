import React from 'react';
import { KeywordData, SearchTermData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Target, Search, HelpCircle, Key } from 'lucide-react';

interface KeywordsTableProps {
  keywords: KeywordData[];
  searchTerms: SearchTermData[];
}

const KeywordsTable: React.FC<KeywordsTableProps> = ({ keywords, searchTerms }) => {
  // Top 10 de cada uno
  const topKeywords = [...keywords]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  const topSearchTerms = [...searchTerms]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  return (
    <div className="space-y-6">
      {/* Leyenda explicativa */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          📖 Guía de Métricas de Keywords
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Columna 1 */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1 text-sm">Impr. (Impresiones)</div>
              <div className="text-xs text-blue-800 leading-relaxed">
                Veces que tu anuncio apareció en Google cuando alguien buscó esta palabra
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1 text-sm">Clics</div>
              <div className="text-xs text-blue-800 leading-relaxed">
                Veces que alguien hizo clic en tu anuncio después de ver esta palabra
              </div>
            </div>
          </div>

          {/* Columna 2 */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1 text-sm">Conv. (Conversiones)</div>
              <div className="text-xs text-blue-800 leading-relaxed">
                Formularios completados que vinieron de esta palabra clave
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1 text-sm">CTR (Click-Through Rate)</div>
              <div className="text-xs text-blue-800 leading-relaxed">
                % de gente que hizo clic vs cuántos vieron el anuncio. <strong>Fórmula:</strong> (Clics ÷ Impr.) × 100
              </div>
            </div>
          </div>

          {/* Columna 3 */}
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-blue-200">
              <div className="font-semibold text-blue-900 mb-1 text-sm">CPA (Cost Per Acquisition)</div>
              <div className="text-xs text-blue-800 leading-relaxed">
                Costo por conseguir cada formulario con esta palabra. <strong>Fórmula:</strong> Costo ÷ Conv.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla de Palabras Clave */}
        <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-textPrimary">
            Top 10 Palabras Clave
          </h2>
        </div>
        <p className="text-sm text-textSecondary mb-4">
          Ordenadas por número de conversiones
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-textPrimary">
                  Palabra Clave
                </th>
                <th className="px-3 py-2 text-center font-semibold text-textPrimary">
                  Palabra Clave Activada
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Impr.
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Clics
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Conv.
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  CTR
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  CPA
                </th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((keyword, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-textPrimary">
                        {keyword.keyword}
                      </span>
                      <span className="text-xs text-textMuted mt-1">
                        {keyword.matchType}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-900 px-2 py-1 rounded-full text-xs font-semibold">
                      <Key className="w-3 h-3" />
                      {keyword.keyword}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatNumber(keyword.impressions)}
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatNumber(keyword.clicks)}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-primary">
                    {keyword.conversions}
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatSimplePercentage(keyword.ctr)}
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatCurrency(keyword.cpa)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla de Términos de Búsqueda */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-6 h-6 text-secondary" />
          <h2 className="text-xl font-bold text-textPrimary">
            Top 10 Términos de Búsqueda Reales
          </h2>
        </div>
        <p className="text-sm text-textSecondary mb-4">
          Búsquedas reales de usuarios que activaron los anuncios
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-textPrimary">
                  Término de Búsqueda
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Impr.
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Clics
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Conv.
                </th>
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody>
              {topSearchTerms.map((term, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-3">
                    <span className="font-medium text-textPrimary">
                      {term.searchTerm}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatNumber(term.impressions)}
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatNumber(term.clicks)}
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-primary">
                    {term.conversions}
                  </td>
                  <td className="px-3 py-3 text-right text-textSecondary">
                    {formatSimplePercentage(term.ctr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>

      {/* Nota explicativa sobre Palabra Clave Activada */}
      <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
        <div className="flex items-start gap-2">
          <Key className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-purple-900 mb-2">
              📌 Sobre "Palabra Clave Activada"
            </h4>
            <p className="text-xs text-purple-800 leading-relaxed">
              La columna <strong>"Palabra Clave Activada"</strong> muestra la palabra clave específica
              de tu campaña que activó el anuncio. En este caso, todas las conversiones provienen
              de la misma palabra clave que configuraste en Google Ads. Esta columna te permite
              identificar rápidamente qué palabra clave está generando cada resultado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeywordsTable;
