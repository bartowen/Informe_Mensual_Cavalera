import React from 'react';
import { CampaignData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Megaphone, CheckCircle2, Play } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: CampaignData[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  // Calcular totales
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalCost = campaigns.reduce((sum, c) => sum + c.cost, 0);
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);

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
      </div>

      {/* Nota explicativa */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-900">
          💡 <strong>Resumen:</strong> La campaña "Cavalera Search - Towen Ads" está activa y optimizada,
          generando {totalConversions} formularios con un presupuesto de {formatCurrency(totalBudget)}
          (invertido: {formatCurrency(totalCost)}). El CPA promedio es de {formatCurrency(totalCost / totalConversions)}.
        </p>
      </div>
    </div>
  );
};

export default CampaignsTable;
