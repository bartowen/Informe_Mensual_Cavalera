import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { LocationData } from '../types';
import { formatCurrency, formatSimplePercentage } from '../utils/formatters';

interface LocationChartProps {
  data: LocationData[];
}

const LocationChart: React.FC<LocationChartProps> = ({ data }) => {
  // Ordenar por conversiones descendente y tomar top 10
  const topLocations = [...data]
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  // Colores degradados
  const colors = [
    '#6366F1', '#7C78F2', '#8B5CF6', '#9D71F7', '#A886F8',
    '#B39BF9', '#BDB0FA', '#C7C5FB', '#D1DAFC', '#DBE9FD',
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-textPrimary mb-2">
        Top 10 Comunas con Mejor Rendimiento
      </h2>
      <p className="text-sm text-textSecondary mb-4">
        Ordenadas por número de conversiones
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={topLocations}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis type="number" stroke="#6B7280" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="location"
            type="category"
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '12px',
            }}
            formatter={(value: any, name: string) => {
              if (name === 'Conversiones') return [value, name];
              if (name === 'CTR') return [formatSimplePercentage(value as number), name];
              if (name === 'CPA') return [formatCurrency(value as number), name];
              return [value, name];
            }}
          />
          <Legend />
          <Bar dataKey="conversions" name="Conversiones" radius={[0, 8, 8, 0]}>
            {topLocations.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Tabla resumen */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-textPrimary">Comuna</th>
              <th className="px-4 py-2 text-right font-semibold text-textPrimary">Conv.</th>
              <th className="px-4 py-2 text-right font-semibold text-textPrimary">CTR</th>
              <th className="px-4 py-2 text-right font-semibold text-textPrimary">CPA</th>
            </tr>
          </thead>
          <tbody>
            {topLocations.map((location, index) => (
              <tr
                key={location.location}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2 font-medium text-textPrimary flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: colors[index] }}
                  />
                  {location.location}
                </td>
                <td className="px-4 py-2 text-right font-semibold text-primary">
                  {location.conversions}
                </td>
                <td className="px-4 py-2 text-right text-textSecondary">
                  {formatSimplePercentage(location.ctr)}
                </td>
                <td className="px-4 py-2 text-right text-textSecondary">
                  {formatCurrency(location.cpa)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationChart;
