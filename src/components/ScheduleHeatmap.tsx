import React from 'react';
import { ScheduleData } from '../types';
import { formatDayOfWeek, formatHour, formatNumber } from '../utils/formatters';
import { Clock } from 'lucide-react';

interface ScheduleHeatmapProps {
  data: ScheduleData[];
}

const ScheduleHeatmap: React.FC<ScheduleHeatmapProps> = ({ data }) => {
  // Agrupar datos por día y hora
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const hours = Array.from(new Set(data.map(d => d.hour))).sort((a, b) => a - b);

  // Crear matriz de conversiones
  const conversionMatrix = days.map(day => {
    return hours.map(hour => {
      const entry = data.find(d => d.dayOfWeek === day && d.hour === hour);
      return entry ? entry.conversions : 0;
    });
  });

  // Encontrar max para normalizar colores
  const maxConversions = Math.max(...conversionMatrix.flat());

  // Función para obtener color basado en conversiones
  const getHeatColor = (conversions: number) => {
    if (conversions === 0) return 'bg-gray-100';
    const intensity = conversions / maxConversions;
    if (intensity >= 0.8) return 'bg-primary text-white';
    if (intensity >= 0.6) return 'bg-primary-400 text-white';
    if (intensity >= 0.4) return 'bg-primary-300';
    if (intensity >= 0.2) return 'bg-primary-200';
    return 'bg-primary-100';
  };

  // Calcular mejores días y horas
  const conversionsByDay = days.map(day => {
    const dayData = data.filter(d => d.dayOfWeek === day);
    return {
      day,
      total: dayData.reduce((sum, d) => sum + d.conversions, 0),
    };
  }).sort((a, b) => b.total - a.total);

  const conversionsByHour = hours.map(hour => {
    const hourData = data.filter(d => d.hour === hour);
    return {
      hour,
      total: hourData.reduce((sum, d) => sum + d.conversions, 0),
    };
  }).sort((a, b) => b.total - a.total);

  const topDays = conversionsByDay.slice(0, 3);
  const topHours = conversionsByHour.slice(0, 3);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-accent" />
        <h2 className="text-xl font-bold text-textPrimary">
          Programación de Anuncios - Mapa de Calor
        </h2>
      </div>
      <p className="text-sm text-textSecondary mb-6">
        Rendimiento por día de la semana y hora del día
      </p>

      {/* Insights destacados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg border border-accent-200">
        <div>
          <p className="text-sm font-medium text-textSecondary mb-2">Mejores Días:</p>
          <div className="flex flex-wrap gap-2">
            {topDays.map(({ day, total }) => (
              <span key={day} className="badge-primary">
                {formatDayOfWeek(day)} ({total} conv.)
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-textSecondary mb-2">Mejores Horas:</p>
          <div className="flex flex-wrap gap-2">
            {topHours.map(({ hour, total }) => (
              <span key={hour} className="badge-primary">
                {formatHour(hour)} ({total} conv.)
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex">
            {/* Columna de días */}
            <div className="flex flex-col">
              <div className="h-10" /> {/* Espacio para header de horas */}
              {days.map(day => (
                <div
                  key={day}
                  className="h-12 w-16 flex items-center justify-center font-medium text-xs text-textSecondary"
                >
                  {formatDayOfWeek(day)}
                </div>
              ))}
            </div>

            {/* Grid de datos */}
            <div className="flex-1">
              {/* Header de horas */}
              <div className="flex">
                {hours.map(hour => (
                  <div
                    key={hour}
                    className="h-10 flex-1 flex items-center justify-center font-medium text-xs text-textSecondary min-w-[3rem]"
                  >
                    {formatHour(hour)}
                  </div>
                ))}
              </div>

              {/* Celdas */}
              {days.map((day, dayIndex) => (
                <div key={day} className="flex">
                  {hours.map((hour, hourIndex) => {
                    const conversions = conversionMatrix[dayIndex][hourIndex];
                    const entry = data.find(d => d.dayOfWeek === day && d.hour === hour);

                    return (
                      <div
                        key={`${day}-${hour}`}
                        className={`h-12 flex-1 flex items-center justify-center text-xs font-semibold border border-white cursor-pointer transition-all hover:scale-105 hover:shadow-md min-w-[3rem] ${getHeatColor(conversions)}`}
                        title={entry ? `${formatDayOfWeek(day)} ${formatHour(hour)}\n${conversions} conversiones\n${formatNumber(entry.clicks)} clics` : ''}
                      >
                        {conversions > 0 ? conversions : '-'}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-textMuted">
        <span>Baja actividad</span>
        <div className="flex gap-1">
          <div className="w-6 h-6 bg-gray-100 border border-gray-200 rounded" />
          <div className="w-6 h-6 bg-primary-100 border border-gray-200 rounded" />
          <div className="w-6 h-6 bg-primary-200 border border-gray-200 rounded" />
          <div className="w-6 h-6 bg-primary-300 border border-gray-200 rounded" />
          <div className="w-6 h-6 bg-primary-400 border border-gray-200 rounded" />
          <div className="w-6 h-6 bg-primary text-white border border-gray-200 rounded" />
        </div>
        <span>Alta actividad</span>
      </div>
    </div>
  );
};

export default ScheduleHeatmap;
