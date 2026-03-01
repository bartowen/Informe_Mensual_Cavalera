import React from 'react';
import { Info } from 'lucide-react';

interface MetricTooltipProps {
  abbr?: string;
  explanation: string;
}

const MetricTooltip: React.FC<MetricTooltipProps> = ({ abbr, explanation }) => (
  <span className="relative inline-flex items-center group ml-1 cursor-help align-middle">
    <Info className="w-3 h-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
    <span className="hidden group-hover:block absolute z-50 bg-gray-900 text-white text-xs rounded-lg p-2.5 w-52 bottom-full left-1/2 -translate-x-1/2 mb-1.5 shadow-lg pointer-events-none leading-relaxed whitespace-normal">
      {abbr && <p className="font-semibold text-cyan-400 mb-1">{abbr}</p>}
      <p className="text-gray-300 leading-relaxed">{explanation}</p>
    </span>
  </span>
);

export default MetricTooltip;
