/**
 * Script de actualización diaria automática
 * Se ejecuta cada día para extraer datos del mes actual
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { GoogleAdsFetcher } from '../services/google-ads-fetcher';
import { GoogleAdsConfig } from '../types/google-ads.types';

dotenv.config();

const googleAdsConfig: GoogleAdsConfig = {
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
  clientId: process.env.GOOGLE_ADS_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
  customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
  loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
};

/**
 * Actualiza datos del mes actual
 */
async function updateCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  console.log('\n🔄 ========================================');
  console.log('🔄 Actualización Diaria Automática');
  console.log('🔄 ========================================\n');
  console.log(`📅 Actualizando: ${year}-${month.toString().padStart(2, '0')}`);
  console.log(`🕐 Hora: ${now.toLocaleString('es-CL')}\n`);

  try {
    // Validar configuración
    if (!googleAdsConfig.developerToken || !googleAdsConfig.clientId || !googleAdsConfig.customerId) {
      throw new Error('❌ Configuración incompleta. Verifica las variables de entorno');
    }

    const fetcher = new GoogleAdsFetcher(googleAdsConfig);
    const data = await fetcher.fetchMonthlyData(year, month);

    // Guardar en archivo JSON
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filename = `google-ads-${year}-${month}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    console.log('\n✅ ========================================');
    console.log('✅ Actualización Completada Exitosamente');
    console.log('✅ ========================================\n');
    console.log(`📁 Archivo: ${filepath}`);
    console.log(`📊 Conversiones: ${data.summary.totalConversions}`);
    console.log(`💰 Costo: $${data.summary.totalCost.toLocaleString('es-CL')}`);
    console.log(`📈 CTR: ${data.summary.averageCTR.toFixed(2)}%`);
    console.log(`🎯 CPA: $${data.summary.averageCPA.toLocaleString('es-CL')}`);
    console.log(`🕐 Próxima actualización: Mañana a esta hora\n`);

    // Log de éxito
    logUpdate('success', year, month, data.summary.totalConversions);

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error en actualización automática:', error.message);

    // Log de error
    logUpdate('error', year, month, 0, error.message);

    process.exit(1);
  }
}

/**
 * Actualiza también el mes anterior (útil a principios de mes)
 */
async function updatePreviousMonth() {
  const now = new Date();
  const prevDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const year = prevDate.getFullYear();
  const month = prevDate.getMonth() + 1;

  console.log(`\n📅 Actualizando también mes anterior: ${year}-${month.toString().padStart(2, '0')}`);

  try {
    const fetcher = new GoogleAdsFetcher(googleAdsConfig);
    const data = await fetcher.fetchMonthlyData(year, month);

    const dataDir = path.join(__dirname, '../../data');
    const filename = `google-ads-${year}-${month}.json`;
    const filepath = path.join(dataDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    console.log(`✅ Mes anterior actualizado: ${filepath}`);
    logUpdate('success', year, month, data.summary.totalConversions);
  } catch (error: any) {
    console.error(`❌ Error actualizando mes anterior:`, error.message);
  }
}

/**
 * Registra el resultado de la actualización
 */
function logUpdate(status: 'success' | 'error', year: number, month: number, conversions: number, errorMsg?: string) {
  const logDir = path.join(__dirname, '../../logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.join(logDir, 'updates.log');
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${status.toUpperCase()} - ${year}-${month.toString().padStart(2, '0')} - Conversions: ${conversions}${errorMsg ? ` - Error: ${errorMsg}` : ''}\n`;

  fs.appendFileSync(logFile, logEntry);
}

/**
 * Determina si debe actualizar el mes anterior
 * (útil en los primeros días del mes)
 */
function shouldUpdatePreviousMonth(): boolean {
  const dayOfMonth = new Date().getDate();
  return dayOfMonth <= 3; // Actualiza mes anterior los primeros 3 días
}

// Ejecutar actualización
async function main() {
  // Actualizar mes actual
  await updateCurrentMonth();

  // Actualizar mes anterior si es necesario
  if (shouldUpdatePreviousMonth()) {
    await updatePreviousMonth();
  }
}

// Manejar señales de terminación
process.on('SIGINT', () => {
  console.log('\n⚠️  Actualización interrumpida por el usuario');
  process.exit(130);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Actualización terminada por el sistema');
  process.exit(143);
});

main();
