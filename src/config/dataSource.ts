/**
 * Configuración de fuente de datos
 * Permite alternar entre API backend y datos estáticos
 */

export const DATA_SOURCE_CONFIG = {
  // Modo de datos: 'api' o 'static'
  // 'api': consume datos desde el backend de Google Ads API
  // 'static': usa los datos hardcodeados en mockData.ts
  mode: (import.meta.env.VITE_DATA_MODE as 'api' | 'static') || 'static',

  // URL de la API backend
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001',

  // Habilitar auto-refresh (consultar API automáticamente cada X minutos)
  autoRefresh: import.meta.env.VITE_AUTO_REFRESH === 'true',
  autoRefreshInterval: parseInt(import.meta.env.VITE_AUTO_REFRESH_INTERVAL || '30') * 60 * 1000, // Default: 30 min
};

/**
 * Determina si se debe usar la API o datos estáticos
 */
export function useApiMode(): boolean {
  return DATA_SOURCE_CONFIG.mode === 'api';
}

/**
 * Mensaje de ayuda para configurar el modo de datos
 */
export function getDataModeHelp(): string {
  if (DATA_SOURCE_CONFIG.mode === 'api') {
    return `
🌐 Modo API activado
- Datos obtenidos desde: ${DATA_SOURCE_CONFIG.apiUrl}
- Auto-refresh: ${DATA_SOURCE_CONFIG.autoRefresh ? 'Habilitado' : 'Deshabilitado'}

Para volver a datos estáticos, cambia en .env:
VITE_DATA_MODE=static
    `;
  }

  return `
📦 Modo estático activado
- Datos obtenidos desde: src/data/mockData.ts
- Los datos NO se actualizan automáticamente

Para usar la API de Google Ads, cambia en .env:
VITE_DATA_MODE=api
VITE_API_URL=http://localhost:3001
  `;
}
