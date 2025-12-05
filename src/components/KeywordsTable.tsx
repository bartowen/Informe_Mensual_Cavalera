import React from 'react';
import { KeywordData, SearchTermData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Target, Search } from 'lucide-react';

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

  const getPerformanceBadge = (conversionRate: number) => {
    if (conversionRate >= 6) {
      return <span className="badge-success">Excelente</span>;
    }
    if (conversionRate >= 4) {
      return <span className="badge-primary">Bueno</span>;
    }
    if (conversionRate >= 2) {
      return <span className="badge-warning">Regular</span>;
    }
    return <span className="badge-danger">Bajo</span>;
  };

  return (
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
                        {keyword.qualityScore && ` • QS: ${keyword.qualityScore}/10`}
                      </span>
                    </div>
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
                <th className="px-3 py-2 text-right font-semibold text-textPrimary">
                  Rendimiento
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
                  <td className="px-3 py-3 text-right">
                    {getPerformanceBadge(term.conversionRate)}
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

export default KeywordsTable;
