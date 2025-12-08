import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users } from 'lucide-react';
import { DemographicBySex, DemographicByAge } from '../types';

interface DemographicChartsProps {
  sexData: DemographicBySex[];
  ageData: DemographicByAge[];
}

export default function DemographicCharts({ sexData, ageData }: DemographicChartsProps) {
  // Calcular totales
  const totalConversions = sexData.reduce((sum, item) => sum + item.conversiones, 0);

  // Encontrar datos destacados
  const topSex = [...sexData].sort((a, b) => b.conversiones - a.conversiones)[0];
  const topAge = [...ageData].sort((a, b) => b.conversiones - a.conversiones)[0];
  const bestCPAAge = [...ageData].filter(item => item.conversiones > 0).sort((a, b) => a.cpa - b.cpa)[0];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
        <Users className="w-6 h-6 text-[#3bc6dc]" />
        👥 Análisis Demográfico
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Distribución de conversiones por sexo y rango de edad de los usuarios
      </p>

      {/* Gráficos lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gráfico por Sexo */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Por Sexo</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sexData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="sexo" stroke="#6B7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} label={{ value: 'Conversiones', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'conversiones') return [value, 'Conversiones'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="conversiones" fill="#3bc6dc" name="Conversiones" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico por Edad */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-800">Por Rango de Edad</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="edad" stroke="#6B7280" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} label={{ value: 'Conversiones', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                formatter={(value: number, name: string) => {
                  if (name === 'conversiones') return [value, 'Conversiones'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar dataKey="conversiones" fill="#21a9c2" name="Conversiones" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tablas de datos debajo de los gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Tabla por Sexo */}
        <div>
          <h4 className="text-md font-semibold mb-3 text-gray-800">Datos por Sexo</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversiones</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sexData.map((item) => (
                  <tr key={item.sexo} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{item.sexo}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.conversiones}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {((item.conversiones / totalConversions) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">${item.cpa.toLocaleString('es-CL')}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.ctr.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla por Edad */}
        <div>
          <h4 className="text-md font-semibold mb-3 text-gray-800">Datos por Rango de Edad</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversiones</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">%</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPA</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ageData.map((item) => (
                  <tr key={item.edad} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{item.edad}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.conversiones}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {((item.conversiones / totalConversions) * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">${item.cpa.toLocaleString('es-CL')}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">{item.ctr.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights demográficos */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span>
          Insights Demográficos
        </h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-[#3bc6dc] font-bold mt-0.5">•</span>
            <span>
              <strong>Sexo predominante:</strong> {topSex.sexo} con {topSex.conversiones} conversiones (
              {((topSex.conversiones / totalConversions) * 100).toFixed(1)}% del total)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3bc6dc] font-bold mt-0.5">•</span>
            <span>
              <strong>Rango de edad líder:</strong> {topAge.edad} años con {topAge.conversiones} conversiones (
              {((topAge.conversiones / totalConversions) * 100).toFixed(1)}% del total)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3bc6dc] font-bold mt-0.5">•</span>
            <span>
              <strong>Mejor CPA por edad:</strong> El rango {bestCPAAge.edad} años tiene el CPA más bajo con $
              {bestCPAAge.cpa.toLocaleString('es-CL')} ({bestCPAAge.conversiones} conversiones)
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#3bc6dc] font-bold mt-0.5">•</span>
            <span>
              <strong>Recomendación:</strong> Considera crear anuncios específicos para el público {topAge.edad} años,
              ya que representan el mayor volumen de conversiones
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
