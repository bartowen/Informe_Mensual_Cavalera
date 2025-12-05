import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  variation?: number;
  context?: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
}

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  variation,
  context,
  icon,
  highlighted = false,
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
    : 'kpi-card';

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-textSecondary uppercase tracking-wide">
          {label}
        </h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>

      <div className="mt-3">
        <p className={`text-3xl md:text-4xl font-bold ${highlighted ? 'text-primary' : 'text-textPrimary'}`}>
          {value}
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
