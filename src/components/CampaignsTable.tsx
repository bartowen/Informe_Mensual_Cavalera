import React from 'react';
import { CampaignData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Megaphone, CheckCircle2, Play, Target } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: CampaignData[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  // Calcular totales
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

  // Grupos de anuncios simulados (basados en las campañas reales)
  const adGroups = [
    {
      name: "Tatuajes - Búsqueda Santiago",
      budget: 150000,
      spent: 133170,
      conversions: 40,
      status: "Activa"
    },
    {
      name: "Piercing - Búsqueda Local",
      budget: 100000,
      spent: 75520,
      conversions: 22,
      status: "Pausada"
    },
    {
      name: "Display - Remarketing",
      budget: 60000,
      spent: 51200,
      conversions: 15,
      status: "Pausada"
    },
    {
      name: "Tatuajes Finos",
      budget: 30000,
      spent: 20032,
      conversions: 7,
      status: "Activa"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Megaphone className="w-6 h-6 text-[#3bc6dc]" />
        📢 Campaña Activa en Google Ads
      </h3>

      {/* Card única de la campaña */}
      <div className="border-2 border-emerald-300 rounded-xl p-6 bg-gradient-to-br from-emerald-50 to-green-50">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">Cavalera Search - Towen Ads</h4>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="bg-emerald-200 text-emerald-900 text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Activa
                </span>
                <span className="text-xs text-gray-600">Tipo: Búsqueda</span>
                <span className="text-xs text-gray-600">Presupuesto: $10.000/día</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-emerald-600">Excelente</div>
            <div className="text-sm text-gray-600">Rendimiento</div>
          </div>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Presupuesto</div>
            <div className="text-xl font-bold text-gray-900">{formatCurrency(totalBudget)}</div>
            <div className="text-xs text-blue-600 mt-1">{formatCurrency(totalCost)} gastado</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Impresiones</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.impressions, 0))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Clics</div>
            <div className="text-xl font-bold text-gray-900">
              {formatNumber(campaigns.reduce((sum, c) => sum + c.clicks, 0))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">CTR</div>
            <div className="text-xl font-bold text-emerald-600">
              {formatSimplePercentage(
                (campaigns.reduce((sum, c) => sum + c.clicks, 0) /
                campaigns.reduce((sum, c) => sum + c.impressions, 0)) * 100
              )}
            </div>
            <div className="text-xs text-emerald-600 mt-1">Excelente</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-600 mb-1">Formularios</div>
            <div className="text-2xl font-bold text-[#3bc6dc]">{totalConversions}</div>
            <div className="text-xs text-gray-500 mt-1">CPA: {formatCurrency(totalCost / totalConversions)}</div>
          </div>
        </div>

        {/* Grupos de anuncios */}
        <div className="border-t border-emerald-200 pt-6">
          <h5 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Grupos de Anuncios
          </h5>

          <div className="space-y-3">
            {adGroups.map((group, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 shadow-sm ${
                  group.status === "Activa"
                    ? 'bg-white border-l-4 border-emerald-500'
                    : 'bg-gray-50 border-l-4 border-gray-400'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex-1">
                    <div className={`font-semibold mb-1 ${
                      group.status === "Activa" ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {group.name}
                    </div>
                    <div className={`text-xs ${
                      group.status === "Activa" ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      Gastado: {formatCurrency(group.spent)} de {formatCurrency(group.budget)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        group.status === "Activa" ? 'text-[#3bc6dc]' : 'text-gray-400'
                      }`}>
                        {group.conversions}
                      </div>
                      <div className={`text-xs ${
                        group.status === "Activa" ? 'text-gray-600' : 'text-gray-500'
                      }`}>
                        conversiones
                      </div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        group.status === "Activa"
                          ? 'bg-emerald-200 text-emerald-900'
                          : 'bg-gray-300 text-gray-700'
                      }`}>
                        {group.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="font-bold text-gray-900">TOTAL (todos los grupos)</div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-600">Presupuesto total</div>
                <div className="text-xl font-bold">{formatCurrency(totalBudget)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Gastado total</div>
                <div className="text-xl font-bold text-blue-600">{formatCurrency(totalCost)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total conversiones</div>
                <div className="text-3xl font-bold text-[#3bc6dc]">{totalConversions}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nota explicativa */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Estado actual:</strong> La campaña "Cavalera Search" tiene 4 grupos de anuncios.
          Actualmente 2 están activos (Tatuajes Santiago y Tatuajes Finos) generando los {totalConversions} formularios.
          Los grupos "Piercing" y "Display" están pausados para optimización.
        </p>
      </div>
    </div>
  );
};

export default CampaignsTable;
