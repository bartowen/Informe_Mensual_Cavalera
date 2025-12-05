import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { AgendaProData } from '../types';
import { formatCurrency, formatPercentage, formatNumber } from '../utils/formatters';
import { DollarSign, TrendingUp, Users } from 'lucide-react';

interface SalesPanelProps {
  data: AgendaProData;
  totalForms: number;
}

const SalesPanel: React.FC<SalesPanelProps> = ({ data, totalForms }) => {
  const { summary, categorySales, topServices } = data;

  // Calcular estimación de conversión de formulario a venta
  const estimatedConversionRate = (summary.totalTransactions / totalForms) * 100;

  return (
    <div className="space-y-6">
      {/* Header del panel */}
      <div className="card bg-gradient-to-br from-success-50 via-white to-accent-50 border-2 border-success-200">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-8 h-8 text-success" />
          <div>
            <h2 className="text-2xl font-bold text-textPrimary">
              Integración con Ventas Reales - AgendaPro
            </h2>
            <p className="text-sm text-textSecondary">
              Resultados comerciales del período
            </p>
          </div>
        </div>

        {/* Resumen de ventas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 border border-success-200">
            <p className="text-sm font-medium text-textSecondary mb-1">Total Ventas</p>
            <p className="text-3xl font-bold text-success mb-2">
              {formatCurrency(summary.totalSales)}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="font-semibold text-success">
                {formatPercentage(summary.salesVariation)}
              </span>
              <span className="text-textMuted">vs mes anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-primary-200">
            <p className="text-sm font-medium text-textSecondary mb-1">
              Cantidad de Ventas
            </p>
            <p className="text-3xl font-bold text-primary mb-2">
              {formatNumber(summary.totalTransactions)}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="font-semibold text-success">
                {formatPercentage(summary.transactionsVariation)}
              </span>
              <span className="text-textMuted">vs mes anterior</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-accent-200">
            <p className="text-sm font-medium text-textSecondary mb-1">Ticket Promedio</p>
            <p className="text-3xl font-bold text-accent mb-2">
              {formatCurrency(summary.averageTicket)}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-danger">
                {formatPercentage(summary.ticketVariation)}
              </span>
              <span className="text-textMuted">vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Relación Marketing-Ventas */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-primary-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-textPrimary">
              Relación Formularios → Ventas
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-textSecondary">Formularios enviados (Google Ads)</p>
              <p className="text-2xl font-bold text-primary">{totalForms}</p>
            </div>
            <div>
              <p className="text-sm text-textSecondary">Tasa estimada formulario → venta</p>
              <p className="text-2xl font-bold text-accent">
                {formatPercentage(estimatedConversionRate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dos columnas: Categorías y Top Servicios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por Categoría */}
        <div className="card">
          <h3 className="text-lg font-bold text-textPrimary mb-4">
            Ventas por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categorySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={100}
                tick={{ fontSize: 11 }}
                stroke="#6B7280"
              />
              <YAxis
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '12px',
                }}
                formatter={(value: any) => formatCurrency(value)}
              />
              <Bar dataKey="sales" name="Ventas" radius={[8, 8, 0, 0]}>
                {categorySales.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === 0 ? '#10B981' : '#6366F1'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Lista con variaciones */}
          <div className="mt-4 space-y-2">
            {categorySales.map((cat, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
              >
                <span className="text-sm font-medium text-textPrimary">
                  {cat.category}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-textSecondary">
                    {formatCurrency(cat.sales)}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      cat.variation >= 0 ? 'text-success' : 'text-danger'
                    }`}
                  >
                    {formatPercentage(cat.variation)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Servicios */}
        <div className="card">
          <h3 className="text-lg font-bold text-textPrimary mb-4">
            Top 10 Servicios Más Vendidos
          </h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {topServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-textPrimary">
                      {service.service}
                    </p>
                    <p className="text-sm text-textSecondary">
                      {formatCurrency(service.sales)}
                    </p>
                  </div>
                </div>
                <div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      service.variation >= 0
                        ? 'bg-success-100 text-success-800'
                        : 'bg-danger-100 text-danger-800'
                    }`}
                  >
                    {formatPercentage(service.variation)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesPanel;
