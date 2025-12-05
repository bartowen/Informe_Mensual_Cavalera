import React from 'react';
import { CampaignData } from '../types';
import { formatCurrency, formatNumber, formatSimplePercentage } from '../utils/formatters';
import { Megaphone, CheckCircle, PauseCircle } from 'lucide-react';

interface CampaignsTableProps {
  campaigns: CampaignData[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns }) => {
  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return (
        <span className="inline-flex items-center gap-1 badge-success">
          <CheckCircle className="w-3 h-3" />
          Activa
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 badge bg-gray-100 text-gray-700">
        <PauseCircle className="w-3 h-3" />
        Pausada
      </span>
    );
  };

  const getPerformanceBadge = (conversionRate: number) => {
    if (conversionRate >= 4.5) {
      return <span className="badge-success">Excelente</span>;
    }
    if (conversionRate >= 3.5) {
      return <span className="badge-primary">Bueno</span>;
    }
    if (conversionRate >= 2.5) {
      return <span className="badge-warning">Regular</span>;
    }
    return <span className="badge-danger">Mejorar</span>;
  };

  // Ordenar por conversiones
  const sortedCampaigns = [...campaigns].sort((a, b) => b.conversions - a.conversions);

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Megaphone className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold text-textPrimary">
          Análisis de Campañas
        </h2>
      </div>
      <p className="text-sm text-textSecondary mb-6">
        Rendimiento detallado de cada campaña activa
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b-2 border-primary-200">
            <tr>
              <th className="px-4 py-3 text-left font-bold text-textPrimary">
                Campaña
              </th>
              <th className="px-4 py-3 text-center font-bold text-textPrimary">
                Estado
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                Presupuesto
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                Impresiones
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                Clics
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                CTR
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                Conversiones
              </th>
              <th className="px-4 py-3 text-right font-bold text-textPrimary">
                CPA
              </th>
              <th className="px-4 py-3 text-center font-bold text-textPrimary">
                Rendimiento
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.map((campaign, index) => {
              const isTopPerformer = index === 0;
              const rowClasses = isTopPerformer
                ? 'bg-primary-50 border-b border-primary-100'
                : 'border-b border-gray-100 hover:bg-gray-50';

              return (
                <tr key={index} className={`${rowClasses} transition-colors`}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {isTopPerformer && (
                        <span className="text-lg">🏆</span>
                      )}
                      <div>
                        <p className="font-bold text-textPrimary">
                          {campaign.campaignName}
                        </p>
                        <p className="text-xs text-textMuted mt-1">
                          Gastado: {formatCurrency(campaign.cost)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    {getStatusBadge(campaign.status)}
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-textPrimary">
                    {formatCurrency(campaign.budget)}
                  </td>
                  <td className="px-4 py-4 text-right text-textSecondary">
                    {formatNumber(campaign.impressions)}
                  </td>
                  <td className="px-4 py-4 text-right text-textSecondary">
                    {formatNumber(campaign.clicks)}
                  </td>
                  <td className="px-4 py-4 text-right text-textSecondary">
                    {formatSimplePercentage(campaign.ctr)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="font-bold text-2xl text-primary">
                      {campaign.conversions}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right font-semibold text-textSecondary">
                    {formatCurrency(campaign.cpa)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    {getPerformanceBadge(campaign.conversionRate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-50 border-t-2 border-gray-300">
            <tr>
              <td className="px-4 py-3 font-bold text-textPrimary" colSpan={2}>
                TOTAL
              </td>
              <td className="px-4 py-3 text-right font-bold text-textPrimary">
                {formatCurrency(sortedCampaigns.reduce((sum, c) => sum + c.budget, 0))}
              </td>
              <td className="px-4 py-3 text-right font-bold text-textPrimary">
                {formatNumber(sortedCampaigns.reduce((sum, c) => sum + c.impressions, 0))}
              </td>
              <td className="px-4 py-3 text-right font-bold text-textPrimary">
                {formatNumber(sortedCampaigns.reduce((sum, c) => sum + c.clicks, 0))}
              </td>
              <td className="px-4 py-3 text-right font-bold text-textPrimary">
                -
              </td>
              <td className="px-4 py-3 text-right font-bold text-2xl text-primary">
                {sortedCampaigns.reduce((sum, c) => sum + c.conversions, 0)}
              </td>
              <td className="px-4 py-3 text-right font-bold text-textPrimary">
                -
              </td>
              <td className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
