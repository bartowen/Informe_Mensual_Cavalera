import React, { useState, useEffect, createContext, useContext } from 'react';
import { clients, ClientConfig, getClientFromUrl, isClientAuthenticated, setClientAuthenticated } from './config/clients';
import PasswordProtection from './components/PasswordProtection';
import MainDashboard from './components/MainDashboard';

// Contexto para el cliente actual
interface ClientContextType {
  client: ClientConfig;
}

const ClientContext = createContext<ClientContextType | null>(null);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

// Componente de error para cliente no encontrado
const ClientNotFound: React.FC<{ clientId: string }> = ({ clientId }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Cliente no encontrado
      </h2>
      <p className="text-gray-400 mb-6">
        No existe un cliente con el ID "{clientId}".
      </p>
      <p className="text-gray-500 text-sm">
        Verifica la URL o contacta a tu ejecutivo de cuenta.
      </p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Obtener cliente desde URL
  const { clientId, urlPassword } = getClientFromUrl();
  const client = clients[clientId];

  useEffect(() => {
    if (!client) {
      setLoading(false);
      return;
    }

    // Si hay password en URL, verificar directamente
    if (urlPassword === client.password) {
      setClientAuthenticated(clientId);
      setIsAuthenticated(true);

      // Limpiar password de la URL por seguridad
      const url = new URL(window.location.href);
      url.searchParams.delete('pass');
      window.history.replaceState({}, '', url.toString());

      setLoading(false);
      return;
    }

    // Verificar sessionStorage
    const isAuth = isClientAuthenticated(clientId);
    setIsAuthenticated(isAuth);
    setLoading(false);
  }, [clientId, urlPassword, client]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  // Cliente no encontrado
  if (!client) {
    return <ClientNotFound clientId={clientId} />;
  }

  // No autenticado - mostrar login
  if (!isAuthenticated) {
    return (
      <PasswordProtection
        client={client}
        onSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  // Autenticado - mostrar dashboard
  return (
    <ClientContext.Provider value={{ client }}>
      <MainDashboard />
    </ClientContext.Provider>
  );
};

export default App;
