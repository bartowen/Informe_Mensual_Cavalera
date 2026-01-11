/**
 * Endpoint de webhook para actualizaciones automáticas
 * Se puede llamar desde servicios externos como GitHub Actions, Vercel Cron, etc.
 */

import { Request, Response } from 'express';
import { GoogleAdsFetcher } from '../services/google-ads-fetcher';
import { GoogleAdsConfig } from '../types/google-ads.types';
import fs from 'fs';
import path from 'path';

export async function handleDailyUpdate(req: Request, res: Response) {
  const startTime = Date.now();

  try {
    // Verificar token de autenticación (opcional pero recomendado)
    const authToken = req.headers['x-cron-token'] || req.headers['authorization'];
    const expectedToken = process.env.CRON_SECRET_TOKEN;

    if (expectedToken && authToken !== expectedToken) {
      return res.status(401).json({
        success: false,
        error: 'Token de autenticación inválido',
      });
    }

    console.log('🔄 Webhook de actualización diaria recibido');

    const googleAdsConfig: GoogleAdsConfig = {
      developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
      clientId: process.env.GOOGLE_ADS_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
      refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
      customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
      loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
    };

    // Validar configuración
    if (!googleAdsConfig.developerToken || !googleAdsConfig.clientId || !googleAdsConfig.customerId) {
      throw new Error('Configuración de Google Ads incompleta');
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    console.log(`📅 Actualizando: ${year}-${month.toString().padStart(2, '0')}`);

    const fetcher = new GoogleAdsFetcher(googleAdsConfig);
    const data = await fetcher.fetchMonthlyData(year, month);

    // Guardar en cache
    const dataDir = path.join(__dirname, '../../data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const filename = `google-ads-${year}-${month}.json`;
    const filepath = path.join(dataDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    const duration = Date.now() - startTime;

    console.log(`✅ Actualización completada en ${duration}ms`);

    res.json({
      success: true,
      message: 'Datos actualizados correctamente',
      data: {
        period: `${year}-${month.toString().padStart(2, '0')}`,
        conversions: data.summary.totalConversions,
        cost: data.summary.totalCost,
        ctr: data.summary.averageCTR,
        cpa: data.summary.averageCPA,
        file: filename,
        duration: `${duration}ms`,
        timestamp: now.toISOString(),
      },
    });
  } catch (error: any) {
    console.error('❌ Error en actualización:', error);

    res.status(500).json({
      success: false,
      error: error.message || 'Error al actualizar datos',
      timestamp: new Date().toISOString(),
    });
  }
}
