import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { ClientConfig } from '../config/clients';

interface PasswordProtectionProps {
  client: ClientConfig;
  onSuccess: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ client, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === client.password) {
      sessionStorage.setItem(`auth_${client.id}`, 'true');
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        {/* Logo Towen */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#3bc6dc] rounded-xl p-2">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-white text-2xl font-bold">Towen Ads</span>
          </div>
        </div>

        {/* Nombre del cliente */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {client.name}
          </h2>
          <p className="text-gray-400">
            Dashboard de Resultados · {client.month}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Ingresa tu contraseña"
              className={`w-full pl-12 pr-12 py-4 bg-gray-700/50 text-white rounded-xl border-2 transition-colors focus:outline-none ${
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-600 focus:border-cyan-500'
              }`}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center">
                Contraseña incorrecta. Por favor, intenta de nuevo.
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-cyan-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/25"
          >
            Acceder al Dashboard
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-gray-500 text-xs text-center">
            Si no tienes tu contraseña, contacta a tu ejecutivo de cuenta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtection;
