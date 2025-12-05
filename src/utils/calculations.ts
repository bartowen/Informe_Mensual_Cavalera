// Cálculo de CTR (Click-Through Rate)
export const calculateCTR = (clicks: number, impressions: number): number => {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
};

// Cálculo de CPC (Cost Per Click)
export const calculateCPC = (cost: number, clicks: number): number => {
  if (clicks === 0) return 0;
  return cost / clicks;
};

// Cálculo de CPA (Cost Per Acquisition/Conversion)
export const calculateCPA = (cost: number, conversions: number): number => {
  if (conversions === 0) return 0;
  return cost / conversions;
};

// Cálculo de tasa de conversión
export const calculateConversionRate = (conversions: number, clicks: number): number => {
  if (clicks === 0) return 0;
  return (conversions / clicks) * 100;
};

// Cálculo de ROI
export const calculateROI = (revenue: number, cost: number): number => {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
};

// Cálculo de ROAS (Return on Ad Spend)
export const calculateROAS = (revenue: number, cost: number): number => {
  if (cost === 0) return 0;
  return revenue / cost;
};

// Cálculo de costo por formulario
export const calculateCostPerForm = (totalCost: number, totalForms: number): number => {
  if (totalForms === 0) return 0;
  return totalCost / totalForms;
};

// Cálculo de valor por formulario
export const calculateValuePerForm = (totalRevenue: number, totalForms: number): number => {
  if (totalForms === 0) return 0;
  return totalRevenue / totalForms;
};

// Suma de valores en un array
export const sumValues = (values: number[]): number => {
  return values.reduce((acc, val) => acc + val, 0);
};

// Promedio de valores
export const averageValues = (values: number[]): number => {
  if (values.length === 0) return 0;
  return sumValues(values) / values.length;
};

// Encontrar el mejor rendimiento (mayor valor)
export const findBest = <T>(items: T[], getValue: (item: T) => number): T | null => {
  if (items.length === 0) return null;
  return items.reduce((best, current) =>
    getValue(current) > getValue(best) ? current : best
  );
};

// Encontrar el peor rendimiento (menor valor)
export const findWorst = <T>(items: T[], getValue: (item: T) => number): T | null => {
  if (items.length === 0) return null;
  return items.reduce((worst, current) =>
    getValue(current) < getValue(worst) ? current : worst
  );
};

// Top N items ordenados por un valor
export const getTopN = <T>(items: T[], n: number, getValue: (item: T) => number): T[] => {
  return [...items]
    .sort((a, b) => getValue(b) - getValue(a))
    .slice(0, n);
};

// Calcular variación porcentual
export const calculateVariation = (current: number, previous: number): number => {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
};
