/**
 * Configuración de clientes para el dashboard multi-cliente
 * Cada cliente tiene su propia configuración de canales, colores y passwords
 */

export interface ClientConfig {
  id: string;
  name: string;
  logo?: string;
  month: string;
  password: string;
  channels: {
    googleAds: boolean;
    metaAds: boolean;
    agendaPro: boolean;
  };
  estimatedTicket: number;
  colors: {
    primary: string;
    secondary?: string;
  };
  apiEndpoint?: string;
}

export const clients: Record<string, ClientConfig> = {
  cavalera: {
    id: 'cavalera',
    name: 'Cavalera Tattoo & Piercing',
    logo: '/logo-cavalera.png',
    month: 'Enero 2026',
    password: import.meta.env.VITE_CAVALERA_PASSWORD || 'cavalera2026',
    channels: {
      googleAds: true,
      metaAds: true,
      agendaPro: true,
    },
    estimatedTicket: 50000,
    colors: {
      primary: '#22d3ee', // turquesa
      secondary: '#1a1a1a',
    },
  },
  hoop: {
    id: 'hoop',
    name: 'Hoop Wellness',
    logo: '/logo-hoop.png',
    month: 'Enero 2026',
    password: import.meta.env.VITE_HOOP_PASSWORD || 'hoop2026',
    channels: {
      googleAds: false,
      metaAds: true,
      agendaPro: false,
    },
    estimatedTicket: 80000,
    colors: {
      primary: '#22d3ee',
      secondary: '#1a1a1a',
    },
  },
};

/**
 * Obtiene la configuración de un cliente por su ID
 */
export function getClientConfig(clientId: string): ClientConfig | null {
  return clients[clientId] || null;
}

/**
 * Obtiene el cliente desde la URL
 */
export function getClientFromUrl(): { clientId: string; urlPassword: string | null } {
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get('client') || 'cavalera';
  const urlPassword = params.get('pass');
  return { clientId, urlPassword };
}

/**
 * Verifica si el cliente está autenticado
 */
export function isClientAuthenticated(clientId: string): boolean {
  return sessionStorage.getItem(`auth_${clientId}`) === 'true';
}

/**
 * Marca el cliente como autenticado
 */
export function setClientAuthenticated(clientId: string): void {
  sessionStorage.setItem(`auth_${clientId}`, 'true');
}

export default clients;
