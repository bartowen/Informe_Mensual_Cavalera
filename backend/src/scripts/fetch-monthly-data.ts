/**
 * Script para extraer datos de un mes específico desde Google Ads
 * Uso: npm run fetch:monthly -- --year 2025 --month 12
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

async function main() {
  // Parsear argumentos de línea de comandos
  const args = process.argv.slice(2);
  const yearArg = args.find((arg) => arg.startsWith('--year='));
  const monthArg = args.find((arg) => arg.startsWith('--month='));

  const year = yearArg ? parseInt(yearArg.split('=')[1]) : new Date().getFullYear();
  const month = monthArg ? parseInt(monthArg.split('=')[1]) : new Date().getMonth() + 1;

  console.log('\n🚀 ========================================');
  console.log('🚀 Cavalera Google Ads Data Fetcher');
  console.log('🚀 ========================================\n');
  console.log(`📅 Extrayendo datos de: ${year}-${month.toString().padStart(2, '0')}\n`);

  try {
    // Validar configuración
    if (!googleAdsConfig.developerToken || !googleAdsConfig.clientId || !googleAdsConfig.customerId) {
      throw new Error(
        '❌ Configuración incompleta. Verifica las variables de entorno en .env'
      );
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
    console.log('✅ Datos extraídos exitosamente');
    console.log('✅ ========================================\n');
    console.log(`📁 Archivo generado: ${filepath}`);
    console.log(`📊 Total de conversiones: ${data.summary.totalConversions}`);
    console.log(`💰 Costo total: $${data.summary.totalCost.toLocaleString('es-CL')}`);
    console.log(`📈 CTR promedio: ${data.summary.averageCTR.toFixed(2)}%`);
    console.log(`🎯 CPA promedio: $${data.summary.averageCPA.toLocaleString('es-CL')}`);
    console.log('\n');
  } catch (error: any) {
    console.error('\n❌ Error al extraer datos:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
