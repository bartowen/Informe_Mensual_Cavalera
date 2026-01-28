import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Cargando datos...'
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
