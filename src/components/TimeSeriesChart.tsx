import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData } from '../types';
import { formatDate } from '../utils/formatters';
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
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const bestDay = [...data].sort((a, b) => b.conversions - a.conversions)[0];
  const avgConversionsPerDay = (totalConversions / data.length).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-2">
        📅 Rendimiento Diario - Noviembre 2025
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Evolución de formularios enviados día a día
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={formattedData}>
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
            stroke="#6B7280"
            tick={{ fontSize: 11 }}
            label={{ value: 'Formularios', angle: -90, position: 'insideLeft' }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
          />

          <Legend />

          {/* Línea para Conversiones */}
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="#3bc6dc"
            strokeWidth={3}
            name="Formularios"
            dot={{ fill: '#3bc6dc', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Cards resumen */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-cyan-50 rounded-lg p-4 text-center">
          <div className="text-xs text-cyan-700 mb-1 font-semibold">Total Formularios</div>
          <div className="text-3xl font-bold text-cyan-900">{totalConversions}</div>
          <div className="text-xs text-cyan-600 mt-1">Conversiones totales del mes</div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 text-center">
          <div className="text-xs text-emerald-700 mb-1 font-semibold">Día con más forms.</div>
          <div className="text-2xl font-bold text-emerald-900">{formatDate(bestDay.date)}</div>
          <div className="text-xs text-emerald-600 mt-1">{bestDay.conversions} formularios</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-xs text-purple-700 mb-1 font-semibold">Promedio diario</div>
          <div className="text-3xl font-bold text-purple-900">{avgConversionsPerDay}</div>
          <div className="text-xs text-purple-600 mt-1">forms/día</div>
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
