import React, { useState } from 'react';
import { LocationData } from '../types';
import { formatCurrency, formatSimplePercentage, formatNumber } from '../utils/formatters';
import { MapPin, ChevronDown, ChevronUp, TrendingUp, Target, DollarSign } from 'lucide-react';

interface SimpleLocationCardsProps {
  data: LocationData[];
}

const SimpleLocationCards: React.FC<SimpleLocationCardsProps> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Top 6 comunas con conversiones
  const topLocations = [...data]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 6);

  const totalConversions = topLocations.reduce((sum, loc) => sum + loc.conversions, 0);

  const toggleExpand = (location: string) => {
    setExpandedId(expandedId === location ? null : location);
  };

  const getPerformanceBadge = (conversions: number) => {
    if (conversions >= 50) return { text: 'Excelente', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (conversions >= 20) return { text: 'Muy Bueno', color: 'bg-blue-100 text-blue-800 border-blue-300' };
    if (conversions >= 10) return { text: 'Bueno', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
    if (conversions >= 5) return { text: 'Regular', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { text: 'Bajo', color: 'bg-gray-100 text-gray-800 border-gray-300' };
  };

  const getRankEmoji = (index: number) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}°`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-indigo-600" />
        🗺️ ¿De qué comunas llegan más clientes?
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Top 6 comunas que generaron formularios de contacto · Total: {totalConversions} formularios
      </p>

      {/* Leyenda de métricas */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="text-xs font-semibold text-gray-700 mb-2">📖 Guía rápida:</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <strong className="text-indigo-700">Conv.:</strong> Formularios recibidos
          </div>
          <div>
            <strong className="text-indigo-700">Clics:</strong> Visitas desde esta comuna
          </div>
          <div>
            <strong className="text-indigo-700">CTR:</strong> % de clics vs impresiones
          </div>
          <div>
            <strong className="text-indigo-700">CPA:</strong> Costo por formulario
          </div>
        </div>
      </div>

      {/* Cards de ubicaciones */}
      <div className="space-y-3">
        {topLocations.map((location, index) => {
          const percentage = ((location.conversions / totalConversions) * 100).toFixed(1);
          const isExpanded = expandedId === location.location;
          const badge = getPerformanceBadge(location.conversions);
          const isTopPerformer = index === 0;

          return (
            <div
              key={location.location}
              className={`border-2 rounded-lg transition-all duration-200 ${
                isTopPerformer
                  ? 'border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50'
                  : 'border-gray-200 bg-white hover:border-indigo-300'
              }`}
            >
              {/* Header - Siempre visible */}
              <div
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(location.location)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-400">
                      {getRankEmoji(index)}
                    </span>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {location.location}
                      </h4>
                      <div className="text-xs text-gray-600">
                        {percentage}% del total de formularios
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-600">
                        {location.conversions}
                      </div>
                      <div className="text-xs text-gray-600">formularios</div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Barra de progreso */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isTopPerformer ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="h-full bg-gradient-to-r from-transparent to-white/30"></div>
                  </div>
                </div>

                {/* Badge de rendimiento */}
                {!isExpanded && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${badge.color}`}>
                      {badge.text}
                    </span>
                    <span className="text-xs text-gray-600">
                      Click para ver detalles →
                    </span>
                  </div>
                )}
              </div>

              {/* Detalles expandibles */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-4 animate-fadeIn">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-sm px-3 py-1 rounded-full border font-semibold ${badge.color}`}>
                      {badge.text}
                    </span>
                    {isTopPerformer && (
                      <span className="text-sm px-3 py-1 rounded-full border font-semibold bg-yellow-100 text-yellow-800 border-yellow-300">
                        🏆 Top Performer
                      </span>
                    )}
                  </div>

                  {/* Métricas detalladas */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-indigo-600" />
                        <div className="text-xs text-gray-600">Impresiones</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatNumber(location.impressions)}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <div className="text-xs text-gray-600">Clics</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatNumber(location.clicks)}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <div className="text-xs text-gray-600">CTR</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatSimplePercentage(location.ctr)}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-4 h-4 text-purple-600" />
                        <div className="text-xs text-gray-600">CPA</div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(location.cpa)}
                      </div>
                    </div>
                  </div>

                  {/* Explicación simple */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-blue-900 leading-relaxed">
                      <strong>💡 Explicación:</strong> De {location.location} recibiste{' '}
                      <strong>{location.conversions} formularios</strong> ({percentage}% del total).
                      Cada formulario costó <strong>{formatCurrency(location.cpa)}</strong>.
                      {isTopPerformer && (
                        <span className="block mt-1 font-semibold text-emerald-700">
                          🏆 Esta es tu comuna más rentable - considera aumentar presupuesto aquí.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Costo total */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-700">Inversión total en esta comuna:</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(location.cost)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Insight final */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
        <p className="text-sm text-indigo-900">
          <strong>📊 Insight Principal:</strong> {topLocations[0].location} es tu comuna dominante con{' '}
          <strong>{topLocations[0].conversions} formularios ({((topLocations[0].conversions / totalConversions) * 100).toFixed(1)}%)</strong>.
          Las top 3 comunas ({topLocations.slice(0, 3).map(l => l.location).join(', ')}) generan{' '}
          <strong>
            {((topLocations.slice(0, 3).reduce((sum, l) => sum + l.conversions, 0) / totalConversions) * 100).toFixed(1)}%
          </strong> de todos los formularios.
        </p>
      </div>
    </div>
  );
};

export default SimpleLocationCards;
