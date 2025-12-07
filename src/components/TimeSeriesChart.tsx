import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData } from '../types';
import { formatDate, formatNumber } from '../utils/formatters';
import { TrendingUp } from 'lucide-react';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    dateFormatted: formatDate(item.date),
  }));

  // Calcular estadísticas
  const totalClicks = data.reduce((sum, item) => sum + item.clicks, 0);
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const bestDay = [...data].sort((a, b) => b.conversions - a.conversions)[0];
  const avgConversionsPerDay = (totalConversions / data.length).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">
        📅 Rendimiento Diario - Noviembre 2025
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Evolución de formularios y clics día a día
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          <XAxis
            dataKey="dateFormatted"
            stroke="#6B7280"
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />

          <YAxis
            yAxisId="left"
            stroke="#6B7280"
            tick={{ fontSize: 11 }}
            label={{ value: 'Clics', angle: -90, position: 'insideLeft' }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#6B7280"
            tick={{ fontSize: 11 }}
            label={{ value: 'Formularios', angle: 90, position: 'insideRight' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
          />

          <Legend />

          {/* Barras para Clics */}
          <Bar
            yAxisId="left"
            dataKey="clicks"
            fill="#93C5FD"
            name="Clics"
            radius={[4, 4, 0, 0]}
          />

          {/* Línea para Conversiones */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="conversions"
            stroke="#3bc6dc"
            strokeWidth={3}
            name="Formularios"
            dot={{ fill: '#3bc6dc', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Cards resumen */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-xs text-blue-700 mb-1">Total Clics</div>
          <div className="text-2xl font-bold text-blue-900">{formatNumber(totalClicks)}</div>
        </div>
        <div className="bg-cyan-50 rounded-lg p-3 text-center">
          <div className="text-xs text-cyan-700 mb-1">Total Formularios</div>
          <div className="text-2xl font-bold text-cyan-900">{totalConversions}</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-3 text-center">
          <div className="text-xs text-emerald-700 mb-1">Día con más forms.</div>
          <div className="text-xl font-bold text-emerald-900">{formatDate(bestDay.date)}</div>
          <div className="text-xs text-emerald-600">{bestDay.conversions} formularios</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-xs text-purple-700 mb-1">Promedio diario</div>
          <div className="text-2xl font-bold text-purple-900">{avgConversionsPerDay}</div>
          <div className="text-xs text-purple-600">forms/día</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-900 flex items-start gap-2">
        <TrendingUp className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <strong>💡 Insight:</strong> Los picos de formularios ({formatDate(bestDay.date)} con {bestDay.conversions} forms) indican días de mayor interés.
          Considera analizar patrones de fin de semana vs días laborales para optimizar presupuesto.
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
