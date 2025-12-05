// Formateo de moneda CLP
export const formatCurrency = (value: number): string => {
  return `$${Math.round(value).toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// Formateo de números grandes
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1).replace('.', ',')}M`;
  }
  if (value >= 1000) {
    return Math.round(value).toLocaleString('es-CL');
  }
  return value.toString();
};

// Formateo de porcentajes
export const formatPercentage = (value: number, decimals: number = 1): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals).replace('.', ',')}%`;
};

// Formateo de porcentajes simples sin signo
export const formatSimplePercentage = (value: number, decimals: number = 1): string => {
  return `${value.toFixed(decimals).replace('.', ',')}%`;
};

// Formateo de fechas
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: 'short',
  });
};

// Formateo de día de la semana
export const formatDayOfWeek = (day: string): string => {
  const days: Record<string, string> = {
    'Monday': 'Lun',
    'Tuesday': 'Mar',
    'Wednesday': 'Mié',
    'Thursday': 'Jue',
    'Friday': 'Vie',
    'Saturday': 'Sáb',
    'Sunday': 'Dom',
  };
  return days[day] || day;
};

// Formateo de hora
export const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

// Abreviar texto largo
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

// Formateo de números con separador de miles
export const formatNumberWithSeparator = (value: number): string => {
  return Math.round(value).toLocaleString('es-CL');
};
