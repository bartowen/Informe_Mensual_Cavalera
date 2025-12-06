import React from 'react';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  variation?: number;
  context?: string;
  explanation?: string;  // Explicación simple de qué significa
  icon?: React.ReactNode;
  highlighted?: boolean;
  warning?: boolean;
  badge?: string;
  isEstimated?: boolean;
  confirmed?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  variation,
  context,
  icon,
  highlighted = false,
  warning = false,
  badge,
  isEstimated = false,
  confirmed = false,
}) => {
  const getTrendIcon = () => {
    if (variation === undefined || variation === 0) {
      return <Minus className="w-4 h-4 text-textMuted" />;
    }
    return variation > 0 ? (
      <TrendingUp className="w-4 h-4 text-success" />
    ) : (
      <TrendingDown className="w-4 h-4 text-danger" />
    );
  };

  const getTrendColor = () => {
    if (variation === undefined || variation === 0) return 'text-textMuted';
    return variation > 0 ? 'text-success' : 'text-danger';
  };

  const cardClasses = highlighted
    ? 'kpi-card border-2 border-primary bg-gradient-to-br from-primary-50 to-white'
    : warning
    ? 'kpi-card border-2 border-warning-300 bg-gradient-to-br from-warning-50 to-white'
    : confirmed
    ? 'kpi-card border-2 border-success-300 bg-gradient-to-br from-success-50 to-white'
    : 'kpi-card';

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-textSecondary uppercase tracking-wide">
            {label}
          </h3>
          {badge && (
            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
              warning
                ? 'bg-warning-200 text-warning-800'
                : confirmed
                ? 'bg-success-200 text-success-800'
                : 'bg-primary-200 text-primary-800'
            }`}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {confirmed && <CheckCircle className="w-4 h-4 text-success" />}
          {warning && <AlertTriangle className="w-4 h-4 text-warning-600" />}
          {icon && <div className={warning ? 'text-warning-600' : confirmed ? 'text-success' : 'text-primary'}>{icon}</div>}
        </div>
      </div>

      <div className="mt-3">
        <p className={`text-3xl md:text-4xl font-bold ${
          highlighted ? 'text-primary' : warning ? 'text-warning-700' : confirmed ? 'text-success-700' : 'text-textPrimary'
        }`}>
          {isEstimated && '~'}{value}
        </p>
      </div>

      {variation !== undefined && (
        <div className="flex items-center gap-2 mt-3">
          {getTrendIcon()}
          <span className={`text-sm font-semibold ${getTrendColor()}`}>
            {variation > 0 ? '+' : ''}{variation.toFixed(1).replace('.', ',')}%
          </span>
          <span className="text-xs text-textMuted">vs período anterior</span>
        </div>
      )}

      {context && (
        <p className="text-xs text-textMuted mt-2 border-t border-gray-100 pt-2">
          {context}
        </p>
      )}
    </div>
  );
};

export default KPICard;
