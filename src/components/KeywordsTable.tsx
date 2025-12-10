import React from 'react';
import { KeywordData, SearchTermData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Target, Search, HelpCircle, Key, Sparkles } from 'lucide-react';

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
        <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Target className="w-6 h-6 text-purple-600" />
          🎯 Top 10 Palabras Clave
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Ordenadas por número de conversiones
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">
                  Palabra Clave
                </th>
                <th className="px-4 py-3 text-right">
                  Impr.
                </th>
                <th className="px-4 py-3 text-right">
                  Clics
                </th>
                <th className="px-4 py-3 text-right">
                  Conv.
                </th>
                <th className="px-4 py-3 text-right">
                  CTR
                </th>
                <th className="px-4 py-3 text-right">
                  CPA
                </th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((keyword, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-purple-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{keyword.keyword}</div>
                    <div className="text-xs text-gray-500">{keyword.matchType}</div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumber(keyword.impressions)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumber(keyword.clicks)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-600">
                    {keyword.conversions}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-purple-600">
                    {formatSimplePercentage(keyword.ctr)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(keyword.cpa)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla de Términos de Búsqueda */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Search className="w-6 h-6 text-[#3bc6dc]" />
          🔍 Top 10 Términos de Búsqueda Reales
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Búsquedas reales de usuarios que activaron los anuncios
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-[#3bc6dc] to-[#21a9c2] text-white">
              <tr>
                <th className="px-4 py-3 text-left">
                  Término de Búsqueda
                </th>
                <th className="px-4 py-3 text-left">
                  Palabra Clave Activada
                </th>
                <th className="px-4 py-3 text-right">
                  Impr.
                </th>
                <th className="px-4 py-3 text-right">
                  Clics
                </th>
                <th className="px-4 py-3 text-right">
                  Conv.
                </th>
                <th className="px-4 py-3 text-right">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody>
              {topSearchTerms.map((term, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-blue-50 ${term.isBrand ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{term.searchTerm}</div>
                    {term.isBrand && (
                      <div className="text-xs text-purple-600 mt-1">🔥 Búsqueda de marca</div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {term.isAiMax ? (
                      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        AI Max
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Key className="w-3 h-3" />
                        {term.triggeredKeyword}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumber(term.impressions)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {formatNumber(term.clicks)}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-emerald-600">
                    {term.conversions}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#3bc6dc]">
                    {formatSimplePercentage(term.ctr)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nota explicativa */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-xs text-blue-900">
            <strong>💡 ¿Qué es "Palabra Clave Activada"?</strong> Es la keyword configurada
            en tu campaña que hizo aparecer tu anuncio para esa búsqueda. Por ejemplo, un
            usuario busca <strong>"tatuajes"</strong> pero tu palabra clave activada es
            <strong> "tatuajes arte"</strong>. Las búsquedas con badge 🔥 son búsquedas directas
            de tu marca (cavalera), lo que indica excelente reconocimiento.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default KeywordsTable;
