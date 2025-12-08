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
      <div className="space-y-4">
        {/* Insight Sexo */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200">
          <p className="text-sm text-indigo-900">
            💡 <strong>Insight:</strong> Distribución equilibrada entre géneros (Hombres 38%, Mujeres 32%).
            El 30% sin identificar sugiere oportunidad de mejorar tracking con formularios más completos.
          </p>
        </div>

        {/* Insight Edad - MEJORADO */}
        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-500">
          <p className="text-sm font-bold text-purple-900 mb-3">
            🎯 Segmentos Identificados (69% del total):
          </p>
          <ul className="text-xs text-purple-900 space-y-2 ml-2">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold text-base">⭐</span>
              <span>
                <strong>25-34 años: Segmento estrella</strong> con 21 conversiones (36% de identificados).
                Este grupo es tu público principal. CPA competitivo de $3.886.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold text-base">📈</span>
              <span>
                <strong>18-24 años: Segundo mejor</strong> con 12 conversiones (21% de identificados).
                CPA más bajo ($2.638). Gran oportunidad de crecimiento.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold text-base">🎓</span>
              <span>
                <strong>45-54 años: Segmento maduro</strong> con 11 conversiones (19% de identificados).
                CTR excelente del 14,26%. Alto poder adquisitivo potencial.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 font-bold text-base">💎</span>
              <span>
                <strong>+65 años: CPA mínimo</strong> con solo $317. Aunque son 7 conversiones,
                representa la mejor eficiencia de costo por edad.
              </span>
            </li>
          </ul>

          <div className="mt-3 pt-3 border-t border-purple-200">
            <p className="text-xs text-purple-800">
              <strong>💡 Recomendación estratégica:</strong> Crea campañas específicas para
              25-34 años (tu público core) con mensajes sobre diseños personalizados y tendencias.
              Para 18-24, enfoca en diseños pequeños, primeros tatuajes y precios accesibles.
            </p>
          </div>

          <div className="mt-2 p-2 bg-purple-100 rounded">
            <p className="text-xs text-purple-700">
              ℹ️ <em>Nota: 31% de conversiones tienen edad "Desconocida". Esto es normal en
              Google Ads y no afecta el rendimiento de la campaña.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
