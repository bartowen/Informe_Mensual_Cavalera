/**
 * Selector de mes para el dashboard
 * Permite elegir entre diferentes períodos disponibles
 */

import React from 'react';
import { Calendar, ChevronDown, RefreshCw } from 'lucide-react';

interface MonthOption {
  year: number;
  month: number;
  label: string;
}

interface MonthSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  onChange: (year: number, month: number) => void;
  availableMonths?: MonthOption[];
  loading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  selectedYear,
  selectedMonth,
  onChange,
  availableMonths,
  loading = false,
  onRefresh,
  refreshing = false,
}) => {
  // Meses predefinidos si no hay disponibles desde la API
  const defaultMonths: MonthOption[] = [
    { year: 2025, month: 12, label: 'Diciembre 2025' },
    { year: 2025, month: 11, label: 'Noviembre 2025' },
  ];

  const months = availableMonths && availableMonths.length > 0
    ? availableMonths.map(m => ({
        year: m.year,
        month: m.month,
        label: getMonthLabel(m.month, m.year),
      }))
    : defaultMonths;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [year, month] = event.target.value.split('-').map(Number);
    onChange(year, month);
  };

  const currentValue = `${selectedYear}-${selectedMonth}`;

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-3 border border-gray-200">
      {/* Ícono */}
      <div className="flex-shrink-0">
        <Calendar className="w-5 h-5 text-[#3bc6dc]" />
      </div>

      {/* Label */}
      <div className="hidden sm:block">
        <span className="text-xs text-gray-600 font-medium">Período:</span>
      </div>

      {/* Selector */}
      <div className="relative flex-1 min-w-0">
        <select
          value={currentValue}
          onChange={handleChange}
          disabled={loading}
          className="w-full appearance-none bg-gradient-to-r from-[#3bc6dc]/10 to-[#21a9c2]/10
                     border-2 border-[#3bc6dc] rounded-lg px-3 py-2 pr-8
                     text-sm font-semibold text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-[#3bc6dc] focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     cursor-pointer hover:bg-gradient-to-r hover:from-[#3bc6dc]/20 hover:to-[#21a9c2]/20
                     transition-all"
        >
          {months.map((month) => (
            <option key={`${month.year}-${month.month}`} value={`${month.year}-${month.month}`}>
              {month.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3bc6dc] pointer-events-none" />
      </div>

      {/* Botón de refresh (opcional) */}
      {onRefresh && (
        <button
          onClick={onRefresh}
          disabled={refreshing || loading}
          className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600
                     text-white hover:from-emerald-600 hover:to-emerald-700
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all shadow-md hover:shadow-lg"
          title="Actualizar datos desde Google Ads"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      )}

      {/* Indicador de carga */}
      {loading && (
        <div className="flex-shrink-0">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#3bc6dc]"></div>
        </div>
      )}
    </div>
  );
};

/**
 * Genera el label para un mes
 */
function getMonthLabel(month: number, year: number): string {
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${monthNames[month - 1]} ${year}`;
}

export default MonthSelector;
