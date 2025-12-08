import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSeriesData } from '../types';
import { TrendingUp, AlertCircle, Target, Calendar } from 'lucide-react';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  // Formatear datos con día de la semana
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const formattedData = data.map((item) => {
    // Parsear la fecha correctamente evitando problemas de zona horaria
    // Extraer año, mes y día del string 'YYYY-MM-DD'
    const [year, month, day] = item.date.split('-').map(Number);
    // Crear fecha en hora local (no UTC)
    const fecha = new Date(year, month - 1, day);
    const dia = fecha.getDate();
    const diaSemana = diasSemana[fecha.getDay()];
    return {
      ...item,
      dateFormatted: `${dia}-nov`,
      dia: diaSemana,
    };
  });

  // Calcular estadísticas
  const totalConversions = data.reduce((sum, item) => sum + item.conversions, 0);
  const diasConConversiones = data.filter(item => item.conversions > 0).length;
  const diasPausados = data.filter(item => item.impressions === 0).length;
  const promedioDiarioActivos = (totalConversions / diasConConversiones).toFixed(1);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-[#3bc6dc]" />
        📅 Rendimiento Diario - Noviembre 2025
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Formularios recibidos cada día (datos exactos de Google Ads)
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          <XAxis
            dataKey="dateFormatted"
            stroke="#6B7280"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={70}
          />

          <YAxis
            stroke="#6B7280"
            tick={{ fontSize: 11 }}
            label={{ value: 'Formularios', angle: -90, position: 'insideLeft' }}
            domain={[0, 12]}
            allowDecimals={false}
            ticks={[0, 2, 4, 6, 8, 10, 12]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #3bc6dc',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            content={({ active, payload }) => {
              if (active && payload && payload[0]) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 rounded-lg border-2 border-[#3bc6dc] shadow-lg">
                    <p className="font-bold text-[#3bc6dc] mb-1">
                      {data.dia} {data.dateFormatted}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Formularios:</span> {data.conversions}
                    </p>
                    {data.impressions === 0 && (
                      <p className="text-xs text-red-600 mt-1">
                        ⚠️ Campaña pausada este día
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            }}
          />

          <Legend />

          {/* Línea de conversiones */}
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="#3bc6dc"
            strokeWidth={3}
            name="Formularios"
            dot={(props: any) => {
              const { cx, cy, payload } = props;
              // Punto especial para días sin datos (impresiones = 0)
              if (payload.impressions === 0) {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={4}
                    fill="#EF4444"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }
              // Punto normal
              return (
                <circle
                  cx={cx}
                  cy={cy}
                  r={payload.conversions > 0 ? 5 : 3}
                  fill={payload.conversions > 0 ? '#3bc6dc' : '#D1D5DB'}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 7, fill: '#21a9c2', stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Cards de estadísticas ACTUALIZADAS */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Card 1: Total */}
        <div className="bg-[#3bc6dc]/10 rounded-lg p-3 text-center border border-[#3bc6dc]/30">
          <div className="text-xs text-[#21a9c2] mb-1">Total Formularios</div>
          <div className="text-2xl font-bold text-[#21a9c2]">{totalConversions}</div>
          <div className="text-xs text-gray-600 mt-1">Noviembre 2025</div>
        </div>

        {/* Card 2: Días Peak */}
        <div className="bg-emerald-50 rounded-lg p-3 text-center border border-emerald-200">
          <div className="text-xs text-emerald-700 mb-1">Días con más forms.</div>
          <div className="text-base font-bold text-emerald-900">
            Vie 7 y Jue 27
          </div>
          <div className="text-xs text-emerald-600 mt-1">11 formularios c/u</div>
        </div>

        {/* Card 3: Promedio activos */}
        <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
          <div className="text-xs text-purple-700 mb-1">Promedio (días activos)</div>
          <div className="text-2xl font-bold text-purple-900">{promedioDiarioActivos}</div>
          <div className="text-xs text-purple-600 mt-1">
            en {diasConConversiones} días con forms.
          </div>
        </div>

        {/* Card 4: Días sin campaña */}
        <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
          <div className="text-xs text-red-700 mb-1">Días sin campaña</div>
          <div className="text-2xl font-bold text-red-900">{diasPausados}</div>
          <div className="text-xs text-red-600 mt-1">
            Lun/Mié pausados
          </div>
        </div>
      </div>

      {/* Leyenda de puntos */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3bc6dc] border-2 border-white"></div>
          <span className="text-gray-600">Con conversiones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-300 border-2 border-white"></div>
          <span className="text-gray-600">Sin conversiones</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white"></div>
          <span className="text-gray-600">Campaña pausada</span>
        </div>
      </div>

      {/* Insights MEJORADOS */}
      <div className="mt-6 space-y-3">
        {/* Insight 1: Patrón semanal */}
        <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-blue-900 mb-1">
                📊 Patrón identificado: Viernes-Sábado peak
              </p>
              <p className="text-sm text-blue-800">
                Los mejores días son <strong>Viernes 7-nov (11 forms)</strong> y
                <strong> Jueves 27-nov (11 forms)</strong>. También destacan los Sábados
                (15-nov: 9 forms, 29-nov: 8 forms).
              </p>
            </div>
          </div>
        </div>

        {/* Insight 2: Días pausados */}
        <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-900 mb-1">
                ⚠️ Campaña pausada algunos Lunes y Miércoles
              </p>
              <p className="text-sm text-amber-800">
                Se detectaron <strong>6 días sin impresiones</strong> (10, 12, 17, 19, 24, 26 Nov).
                Estos son días donde la campaña estuvo pausada. Esto puede ser intencional
                para optimizar presupuesto.
              </p>
            </div>
          </div>
        </div>

        {/* Insight 3: Recomendación */}
        <div className="p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
          <div className="flex items-start gap-2">
            <Target className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-emerald-900 mb-1">
                🎯 Recomendación estratégica
              </p>
              <p className="text-sm text-emerald-800">
                Considera mantener campaña activa <strong>Jueves-Domingo</strong> con
                presupuesto aumentado. Los Lunes-Miércoles podrían seguir pausados o
                con presupuesto reducido si el ROI no justifica la inversión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSeriesChart;
