import React from 'react';
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Target,
} from 'lucide-react';
import { Insight } from '../types';

interface InsightsPanelProps {
  insights: Insight[];
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <Target className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          icon: 'text-success',
          title: 'text-success-900',
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          icon: 'text-warning-600',
          title: 'text-warning-900',
        };
      case 'danger':
        return {
          bg: 'bg-danger-50',
          border: 'border-danger-200',
          icon: 'text-danger',
          title: 'text-danger-900',
        };
      case 'info':
      default:
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          icon: 'text-primary',
          title: 'text-primary-900',
        };
    }
  };

  return (
    <div className="card bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-2 border-primary-200">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-7 h-7 text-primary" />
        <div>
          <h2 className="text-2xl font-bold text-textPrimary">
            Insights y Recomendaciones
          </h2>
          <p className="text-sm text-textSecondary">
            Análisis automático del rendimiento y oportunidades de optimización
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const colors = getColors(insight.type);

          return (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${colors.bg} ${colors.border} transition-all hover:shadow-md`}
            >
              <div className="flex items-start gap-3">
                <div className={`${colors.icon} mt-1`}>
                  {getIcon(insight.type)}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-base ${colors.title} mb-2`}>
                    {insight.title}
                  </h3>
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.metric && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs font-semibold text-textMuted">
                        Métrica clave:
                      </p>
                      <p className={`text-lg font-bold ${colors.icon}`}>
                        {insight.metric}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InsightsPanel;
