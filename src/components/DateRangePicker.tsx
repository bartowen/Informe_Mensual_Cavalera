import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { format, subDays, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const presets = [
    {
      label: 'Hoy',
      getValue: () => {
        const today = new Date();
        return { start: today, end: today };
      }
    },
    {
      label: 'Ayer',
      getValue: () => {
        const yesterday = subDays(new Date(), 1);
        return { start: yesterday, end: yesterday };
      }
    },
    {
      label: 'Últimos 7 días',
      getValue: () => ({
        start: subDays(new Date(), 6),
        end: new Date()
      })
    },
    {
      label: 'Últimos 14 días',
      getValue: () => ({
        start: subDays(new Date(), 13),
        end: new Date()
      })
    },
    {
      label: 'Últimos 30 días',
      getValue: () => ({
        start: subDays(new Date(), 29),
        end: new Date()
      })
    },
    {
      label: 'Este mes',
      getValue: () => ({
        start: startOfMonth(new Date()),
        end: new Date()
      })
    },
    {
      label: 'Mes pasado',
      getValue: () => {
        const lastMonth = subMonths(new Date(), 1);
        return {
          start: startOfMonth(lastMonth),
          end: endOfMonth(lastMonth)
        };
      }
    },
    {
      label: 'Febrero 2026',
      getValue: () => ({
        start: new Date('2026-02-01'),
        end: new Date('2026-02-28')
      })
    }
  ];

  const handlePresetClick = (preset: typeof presets[0]) => {
    const { start, end } = preset.getValue();
    onDateChange(start, end);
    setIsOpen(false);
  };

  const formatDateRange = () => {
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate, 'd MMM yyyy', { locale: es });
    }
    return `${format(startDate, 'd MMM', { locale: es })} - ${format(endDate, 'd MMM yyyy', { locale: es })}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Calendar className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {formatDateRange()}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase px-2 py-1">
                Rangos predefinidos
              </div>
              <div className="space-y-1">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => handlePresetClick(preset)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateRangePicker;
