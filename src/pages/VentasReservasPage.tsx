import React from 'react';
import {
  ShoppingCart,
  Calendar,
  CheckCircle2,
  Info,
  Store,
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
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { MonthData } from '../data/allMonthsData';
import { formatCurrency } from '../utils/formatters';

interface VentasReservasPageProps {
  monthData: MonthData;
}

const HORAS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const DIAS_KEYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const DIAS_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const DIAS_COLORS = ['#3bc6dc', '#a855f7', '#f59e0b', '#10b981', '#ef4444', '#6366f1', '#ec4899'];

const VentasReservasPage: React.FC<VentasReservasPageProps> = ({ monthData }) => {
  const {
    ventasResumen,
    ventasWalkIn,
    reservasResumen,
    ventasDiarias,
    ventasCategorias,
    reservasServicios,
    reservasDias,
    reservasHoraDia,
    estadisticos,
  } = monthData;

  const horaDiaData = HORAS.map((hora) => {
    const row: Record<string, number | string> = { hora: `${hora}:00` };
    DIAS_KEYS.forEach((dia) => {
      row[dia] = reservasHoraDia[dia]?.[hora] ?? 0;
    });
    return row;
  });

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
              <p className="text-gray-500">Cavalera Tattoo &amp; Piercing — {monthData.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold text-sm">Datos Verificados</span>
          </div>
        </div>
      </div>

      {/* Cards Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Ventas Realizadas */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <p className="text-purple-100 text-sm">Ventas Realizadas</p>
              <p className="text-3xl md:text-4xl font-bold">{formatCurrency(ventasResumen.total)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-purple-200 text-xs">Cantidad</p>
              <p className="text-2xl font-bold">{ventasResumen.cantidad}</p>
            </div>
            <div>
              <p className="text-purple-200 text-xs">Ticket Promedio</p>
              <p className="text-xl font-bold">{formatCurrency(ventasResumen.ticket)}</p>
            </div>
          </div>
        </div>

        {/* Card Walk-In */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Store className="w-8 h-8" />
            </div>
            <div>
              <p className="text-teal-100 text-sm">Walk-In (Sin Reserva)</p>
              <p className="text-3xl md:text-4xl font-bold">{formatCurrency(ventasWalkIn.total)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-white/20">
            <div>
              <p className="text-teal-200 text-xs">Cantidad</p>
              <p className="text-2xl font-bold">{ventasWalkIn.cantidad}</p>
            </div>
            <div>
              <p className="text-teal-200 text-xs">% del Total</p>
              <p className="text-xl font-bold">{ventasWalkIn.pct}%</p>
            </div>
          </div>
        </div>

        {/* Card Reservas Agendadas */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <p className="text-orange-100 text-sm">Reservas Agendadas</p>
              <p className="text-3xl md:text-4xl font-bold">{reservasResumen.total}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 pt-4 border-t border-white/20">
            <div>
              <p className="text-orange-200 text-xs">Recaudación</p>
              <p className="text-xl font-bold">{formatCurrency(reservasResumen.recaudacion)}</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs">Ticket Promedio</p>
              <p className="text-xl font-bold">{formatCurrency(reservasResumen.ticket)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2 pt-2 border-t border-white/20">
            <div>
              <p className="text-orange-200 text-xs">Origen Manual</p>
              <p className="text-lg font-bold">{reservasResumen.manual}</p>
            </div>
            <div>
              <p className="text-orange-200 text-xs">Origen Online</p>
              <p className="text-lg font-bold">{reservasResumen.online}</p>
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
                <p className="font-bold text-blue-900 text-lg">{ventasResumen.cantidad}</p>
              </div>
              <div>
                <p className="text-blue-700">Reservas agendadas</p>
                <p className="font-bold text-blue-900 text-lg">{reservasResumen.total}</p>
              </div>
              <div>
                <p className="text-blue-700">Diferencia</p>
                <p className="font-bold text-blue-900 text-lg">+{reservasResumen.total - ventasResumen.cantidad} reservas</p>
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
                dataKey="d"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [formatCurrency(value), 'Monto']}
              />
              <Area
                type="monotone"
                dataKey="v"
                name="Monto"
                stroke="#9b87f5"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorVentas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ventas por Categoría */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ventas por Categoría</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ventasCategorias} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                tick={{ fontSize: 12 }}
              />
              <YAxis dataKey="cat" type="category" tick={{ fontSize: 11 }} width={110} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number) => [formatCurrency(value), 'Monto']}
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
                    data={reservasServicios}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="pct"
                    nameKey="s"
                    labelLine={false}
                  >
                    {reservasServicios.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {reservasServicios.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.s}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">{item.pct}%</span>
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
                    data={reservasDias}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="pct"
                    nameKey="dia"
                    labelLine={false}
                  >
                    {reservasDias.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {reservasDias.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-700">{item.dia}</span>
                  <span className="text-sm font-medium text-gray-900 ml-auto">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reservas por Hora por Día */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Reservas por Hora y Día</h2>
        <p className="text-sm text-gray-500 mb-6">Distribución de reservas por franja horaria según día de la semana</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={horaDiaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hora" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                formatter={(value: number, name: string) => {
                  const idx = DIAS_KEYS.indexOf(name);
                  return [value, idx >= 0 ? DIAS_LABELS[idx] : name];
                }}
              />
              <Legend
                formatter={(value) => {
                  const idx = DIAS_KEYS.indexOf(value);
                  return idx >= 0 ? DIAS_LABELS[idx] : value;
                }}
              />
              {DIAS_KEYS.map((dia, i) => (
                <Line
                  key={dia}
                  type="monotone"
                  dataKey={dia}
                  name={dia}
                  stroke={DIAS_COLORS[i]}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resumen Estadístico */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Resumen Estadístico</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Mejor Día (Ventas)</p>
            <p className="text-lg font-bold text-green-400">{estadisticos.mejorDia}</p>
            <p className="text-xs text-gray-400">{formatCurrency(estadisticos.mejorDiaMonto)}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Día más Reservado</p>
            <p className="text-lg font-bold text-cyan-400">{estadisticos.diaMasReservado}</p>
            <p className="text-xs text-gray-400">{estadisticos.diaMasResPct}% de reservas</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-1">Servicio Top</p>
            <p className="text-lg font-bold text-orange-400">{estadisticos.servicioTop}</p>
            <p className="text-xs text-gray-400">{estadisticos.servicioTopPct}% de reservas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VentasReservasPage;
