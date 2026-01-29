import React from 'react';
import {
  ShoppingCart,
  Calendar,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ventasRealizadas,
  reservasAgendadas,
  ventasDiarias,
  ventasPorCategoria,
  serviciosReservados,
  reservasPorDia,
  formatCurrency,
  formatDate,
} from '../data/cavaleraData';

const VentasReservasPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-3">
              <ShoppingCart className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ventas y Reservas</h1>
              <p className="text-gray-500">Cavalera Tattoo & Piercing - Enero 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Datos Verificados</span>
          </div>
        </div>
      </div>

      {/* Cards Principales - 2 grandes lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card Ventas Realizadas */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <p className="text-purple-100 text-sm">Ventas Realizadas</p>
                <p className="text-3xl md:text-4xl font-bold">{formatCurrency(ventasRealizadas.total)}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-purple-200 text-xs">Cantidad</p>
              <p className="text-2xl font-bold">{ventasRealizadas.cantidad}</p>
            </div>
            <div>
              <p className="text-purple-200 text-xs">Promedio</p>
              <p className="text-xl font-bold">{formatCurrency(ventasRealizadas.promedio)}</p>
            </div>
          </div>
        </div>

        {/* Card Reservas Agendadas */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <p className="text-orange-100 text-sm">Reservas Agendadas</p>
                <p className="text-3xl md:text-4xl font-bold">{reservasAgendadas.total}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-orange-200 text-xs">Recaudación</p>
              <p className="text-xl font-bold">{formatCurrency(reservasAgendadas.recaudacion)}</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs">Promedio</p>
              <p className="text-xl font-bold">{formatCurrency(reservasAgendadas.promedio)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Comparativo */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Análisis del Período</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-blue-700">Ventas realizadas</p>
                <p className="font-bold text-blue-900 text-lg">{ventasRealizadas.cantidad}</p>
              </div>
              <div>
                <p className="text-blue-700">Reservas agendadas</p>
                <p className="font-bold text-blue-900 text-lg">{reservasAgendadas.total}</p>
              </div>
              <div>
                <p className="text-blue-700">Diferencia</p>
                <p className="font-bold text-blue-900 text-lg">+{reservasAgendadas.total - ventasRealizadas.cantidad} reservas</p>
              </div>
            </div>
            <p className="text-blue-600 text-xs mt-3">
              Las reservas incluyen citas futuras y pueden no corresponder al mismo período de las ventas.
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico - Ventas por Día */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ventas por Día</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ventasDiarias}>
              <defs>
                <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => formatDate(value)}
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelFormatter={(value) => formatDate(value)}
                formatter={(value: number, name: string) => {
                  if (name === 'monto') return [formatCurrency(value), 'Monto'];
                  if (name === 'cantidad') return [value, 'Ventas'];
                  return [value, name];
                }}
              />
              <Area
                type="monotone"
                dataKey="monto"
                name="monto"
                stroke="#9b87f5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVentas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ventas por Categoría - Barras Horizontales */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ventas por Categoría</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasPorCategoria} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                dataKey="categoria"
                type="category"
                tick={{ fontSize: 11 }}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'monto') return [formatCurrency(value), 'Monto'];
                  if (name === 'cantidad') return [value, 'Cantidad'];
                  return [value, name];
                }}
              />
              <Bar dataKey="monto" fill="#9b87f5" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Servicios más Reservados */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Servicios más Reservados</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-52 w-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviciosReservados}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="porcentaje"
                    nameKey="servicio"
                    label={({ porcentaje }) => `${porcentaje}%`}
                    labelLine={false}
                  >
                    {serviciosReservados.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {serviciosReservados.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.servicio}</span>
                  <span className="text-sm font-medium text-gray-900">{item.porcentaje}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reservas por Día de Semana */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Reservas por Día de Semana</h2>
          <div className="flex items-center justify-center gap-6">
            <div className="h-52 w-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={reservasPorDia}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="porcentaje"
                    nameKey="dia"
                    label={({ porcentaje }) => `${porcentaje}%`}
                    labelLine={false}
                  >
                    {reservasPorDia.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {reservasPorDia.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-700">{item.dia}</span>
                  <span className="text-sm font-medium text-gray-900">{item.porcentaje}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Estadístico */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Resumen Estadístico</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Ticket Promedio</p>
            <p className="text-2xl font-bold text-purple-400">{formatCurrency(ventasRealizadas.promedio)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Mejor Día</p>
            <p className="text-lg font-bold text-green-400">12 Enero</p>
            <p className="text-xs text-gray-400">{formatCurrency(2326700)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Día más Reservado</p>
            <p className="text-lg font-bold text-cyan-400">Viernes</p>
            <p className="text-xs text-gray-400">20.8% de reservas</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Servicio Top</p>
            <p className="text-lg font-bold text-orange-400">Hora Consulta</p>
            <p className="text-xs text-gray-400">25.4% de reservas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasReservasPage;
