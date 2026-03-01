import React from 'react';
import { ShoppingBag, Calendar, DollarSign, TrendingUp, Zap } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line,
} from 'recharts';
import { formatCurrency, formatNumber } from '../utils/formatters';

const acumulado = {
  ventasTotal:    109629999, // 38648651 + 39239104 + 31742244
  cantidadVentas:      1090, // 368 + 379 + 343
  ticketPromedio:    100578, // 109629999 / 1090
  reservasTotal:       1065, // 355 + 369 + 341
  montoReservas:   71794102, // 27229050 + 24055032 + 20510020
  ticketReserva:      67415, // 71794102 / 1065
  inversionAds:     2434915, // Meta 1135503 + Google 1299412
  roas:                45.0, // 109629999 / 2434915
};

const mensualData = [
  { mes: 'Dic 2025', ventas: 38648651, cantidad: 368,  ticket: 105024, reservas: 355, monto: 27229050 },
  { mes: 'Ene 2026', ventas: 39239104, cantidad: 379,  ticket: 103533, reservas: 369, monto: 24055032 },
  { mes: 'Feb 2026', ventas: 31742244, cantidad: 343,  ticket:  92543, reservas: 341, monto: 20510020 },
];

const AcumuladoVentasPage: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-3">
          <ShoppingBag className="h-10 w-10 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ventas y Reservas — 2026 Acumulado</h1>
          <p className="text-gray-500">Dic 2025 · Ene 2026 · Feb 2026 — Datos consolidados AgendaPro</p>
        </div>
      </div>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg col-span-2 md:col-span-1">
        <div className="flex items-center gap-1 mb-2"><DollarSign className="w-4 h-4" /><span className="text-xs text-green-100">Ventas Totales</span></div>
        <p className="text-2xl font-bold">{formatCurrency(acumulado.ventasTotal)}</p>
        <p className="text-green-200 text-xs mt-1">{formatNumber(acumulado.cantidadVentas)} servicios</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><ShoppingBag className="w-4 h-4 text-gray-400" /><span className="text-xs text-gray-500">Cantidad</span></div>
        <p className="text-xl font-bold text-gray-900">{formatNumber(acumulado.cantidadVentas)}</p>
        <p className="text-xs text-gray-400 mt-1">servicios</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><TrendingUp className="w-4 h-4 text-blue-500" /><span className="text-xs text-gray-500">Ticket Prom.</span></div>
        <p className="text-xl font-bold text-blue-600">{formatCurrency(acumulado.ticketPromedio)}</p>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white shadow-lg col-span-2 md:col-span-1">
        <div className="flex items-center gap-1 mb-2"><Calendar className="w-4 h-4" /><span className="text-xs text-indigo-100">Reservas</span></div>
        <p className="text-2xl font-bold">{formatNumber(acumulado.reservasTotal)}</p>
        <p className="text-indigo-200 text-xs mt-1">{formatCurrency(acumulado.montoReservas)}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><DollarSign className="w-4 h-4 text-purple-500" /><span className="text-xs text-gray-500">T. Reserva</span></div>
        <p className="text-xl font-bold text-purple-600">{formatCurrency(acumulado.ticketReserva)}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-1 mb-2"><DollarSign className="w-4 h-4 text-orange-500" /><span className="text-xs text-gray-500">Inv. Ads</span></div>
        <p className="text-xl font-bold text-orange-600">{formatCurrency(acumulado.inversionAds)}</p>
      </div>

      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-1 mb-2"><Zap className="w-4 h-4" /><span className="text-xs text-yellow-100">ROAS</span></div>
        <p className="text-2xl font-bold">{acumulado.roas}x</p>
        <p className="text-yellow-200 text-xs mt-1">Ventas ÷ Ads</p>
      </div>
    </div>

    {/* Gráficos */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Ventas por mes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ventas por Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v: number, name: string) => name === 'Cantidad' ? [v, name] : [formatCurrency(v), name]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="ventas" name="Ventas" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="cantidad" name="Cantidad" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservas por mes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Reservas por Mes</h2>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mensualData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(v: number, name: string) => name === 'Cant. Reservas' ? [v, name] : [formatCurrency(v), name]}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="monto" name="Monto Reservas" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="reservas" name="Cant. Reservas" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Ticket promedio evolutivo */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Promedio por Mes</h2>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mensualData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10 }} domain={[80000, 110000]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              formatter={(v: number) => [formatCurrency(v), 'Ticket']}
            />
            <Bar dataKey="ticket" name="Ticket Prom." fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Tabla detalle */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Detalle Mensual Ventas y Reservas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Mes</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Ventas ($)</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Cantidad</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Ticket Prom.</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Reservas</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Monto Reservas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mensualData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{row.mes}</td>
                <td className="px-4 py-3 text-right font-bold text-green-700">{formatCurrency(row.ventas)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatNumber(row.cantidad)}</td>
                <td className="px-4 py-3 text-right text-blue-600 font-medium">{formatCurrency(row.ticket)}</td>
                <td className="px-4 py-3 text-right text-purple-600 font-medium">{formatNumber(row.reservas)}</td>
                <td className="px-4 py-3 text-right text-gray-600">{formatCurrency(row.monto)}</td>
              </tr>
            ))}
            <tr className="bg-gray-900 text-white font-bold">
              <td className="px-4 py-3">TOTAL / PROM</td>
              <td className="px-4 py-3 text-right text-green-300">{formatCurrency(acumulado.ventasTotal)}</td>
              <td className="px-4 py-3 text-right text-gray-200">{formatNumber(acumulado.cantidadVentas)}</td>
              <td className="px-4 py-3 text-right text-blue-300">{formatCurrency(acumulado.ticketPromedio)}</td>
              <td className="px-4 py-3 text-right text-purple-300">{formatNumber(acumulado.reservasTotal)}</td>
              <td className="px-4 py-3 text-right text-gray-200">{formatCurrency(acumulado.montoReservas)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AcumuladoVentasPage;
