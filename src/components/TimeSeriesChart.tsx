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
import { formatDate, formatNumber, formatCurrency } from '../utils/formatters';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    dateFormatted: formatDate(item.date),
  }));

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-textPrimary mb-4">
        Rendimiento Temporal - Noviembre 2025
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="dateFormatted"
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            yAxisId="left"
            stroke="#6366F1"
            tick={{ fontSize: 12 }}
            tickFormatter={formatNumber}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#EC4899"
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              padding: '12px',
            }}
            formatter={(value: any, name: string) => {
              if (name === 'Costo') return [formatCurrency(value), name];
              return [formatNumber(value), name];
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="impressions"
            stroke="#6366F1"
            strokeWidth={2}
            name="Impresiones"
            dot={false}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="clicks"
            stroke="#8B5CF6"
            strokeWidth={2}
            name="Clics"
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="conversions"
            stroke="#EC4899"
            strokeWidth={3}
            name="Conversiones"
            dot={{ fill: '#EC4899', r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
