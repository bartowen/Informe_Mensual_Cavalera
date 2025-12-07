import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Clock, TrendingUp } from 'lucide-react';
import { DayOfWeekData, HourOfDayData } from '../types';

interface SimpleScheduleChartsProps {
  dayData: DayOfWeekData[];
  hourData: HourOfDayData[];
}

const SimpleScheduleCharts: React.FC<SimpleScheduleChartsProps> = ({ dayData, hourData }) => {
  // Colores para días de la semana (verde para mejores días)
  const getDayColor = (conversions: number) => {
    if (conversions >= 16) return '#10B981'; // Emerald-500 - Excelente
    if (conversions >= 12) return '#6366F1'; // Indigo-500 - Bueno
    return '#94A3B8'; // Slate-400 - Normal
  };

  // Colores para horas del día
  const getHourColor = (conversions: number) => {
    if (conversions >= 10) return '#10B981'; // Emerald-500 - Peak
    if (conversions >= 6) return '#6366F1'; // Indigo-500 - Bueno
    return '#94A3B8'; // Slate-400 - Normal
  };

  // Encontrar mejores días
  const sortedDays = [...dayData].sort((a, b) => b.conversions - a.conversions);
  const topDays = sortedDays.slice(0, 3);

  // Encontrar mejores horas
  const sortedHours = [...hourData].sort((a, b) => b.conversions - a.conversions);
  const topHours = sortedHours.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Clock className="w-6 h-6 text-indigo-600" />
        ⏰ ¿Cuándo llegan más formularios?
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Análisis de los 84 formularios por día de la semana y hora del día
      </p>

      {/* Parte 1: Por día de la semana */}
      <div className="mb-10">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-600" />
          📅 Por día de la semana:
        </h4>

        <div className="mb-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="dayShort"
                stroke="#6B7280"
                tick={{ fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
                label={{ value: 'Formularios', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'conversions') return [value, 'Formularios'];
                  return [value, name];
                }}
                labelFormatter={(label) => {
                  const day = dayData.find(d => d.dayShort === label);
                  return day ? day.day : label;
                }}
              />
              <Bar dataKey="conversions" radius={[8, 8, 0, 0]}>
                {dayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getDayColor(entry.conversions)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-start gap-2 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <TrendingUp className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-emerald-900">
            <strong>Mejores días:</strong> {topDays.map((d) => `${d.day} (${d.conversions} form.)`).join(', ')}
            <br />
            <span className="text-xs text-emerald-700">
              Los fines de semana (sábado y viernes) son los días con más consultas
            </span>
          </div>
        </div>
      </div>

      {/* Parte 2: Por hora del día */}
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          🕐 Por hora del día:
        </h4>

        <div className="mb-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="hour"
                stroke="#6B7280"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
                label={{ value: 'Formularios', angle: -90, position: 'insideLeft', style: { fontSize: 12 } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [value, 'Formularios']}
              />
              <Bar dataKey="conversions" radius={[8, 8, 0, 0]}>
                {hourData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getHourColor(entry.conversions)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
            <div className="text-amber-700 font-semibold mb-1 flex items-center gap-1">
              <span>🌅</span> Mejores horas:
            </div>
            {topHours.map((h) => (
              <div key={h.hour} className="text-amber-900">
                {h.hour} ({h.conversions} form.)
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-blue-700 font-semibold mb-1 flex items-center gap-1">
              <Clock className="w-4 h-4" /> Horario peak:
            </div>
            <div className="text-blue-900 font-bold text-lg">16:00 - 19:00</div>
            <div className="text-xs text-blue-700">Tarde-noche</div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-purple-700 font-semibold mb-1 flex items-center gap-1">
              <span>💡</span> Recomendación:
            </div>
            <div className="text-purple-900 text-xs leading-relaxed">
              Aumenta presupuesto en horario 16:00-19:00 para maximizar formularios
            </div>
          </div>
        </div>
      </div>

      {/* Resumen final */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
        <p className="text-sm text-indigo-900">
          <strong>📊 Resumen:</strong> Tus clientes potenciales buscan principalmente los{' '}
          <strong>fines de semana</strong> (sábado con {dayData.find(d => d.day === 'Sábado')?.conversions} formularios,
          viernes con {dayData.find(d => d.day === 'Viernes')?.conversions}) y en horario de{' '}
          <strong>tarde (16:00-19:00)</strong>. Ajusta tus pujas para estos períodos de mayor actividad.
        </p>
      </div>
    </div>
  );
};

export default SimpleScheduleCharts;
