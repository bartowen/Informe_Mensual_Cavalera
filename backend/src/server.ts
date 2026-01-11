/**
 * Servidor Express para API de Google Ads
 * Cavalera Tattoo & Piercing - Dashboard Backend
 */

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { GoogleAdsFetcher } from './services/google-ads-fetcher';
import { GoogleAdsConfig, ApiResponse, GoogleAdsMonthlyData } from './types/google-ads.types';

// Cargar variables de entorno
dotenv.config();

// Configuración
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const DATA_DIR = path.join(__dirname, '../data');

// Asegurar que existe la carpeta data
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Configuración de Google Ads
const googleAdsConfig: GoogleAdsConfig = {
  developerToken: process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '',
  clientId: process.env.GOOGLE_ADS_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_ADS_CLIENT_SECRET || '',
  refreshToken: process.env.GOOGLE_ADS_REFRESH_TOKEN || '',
  customerId: process.env.GOOGLE_ADS_CUSTOMER_ID || '',
  loginCustomerId: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID,
};

// Inicializar Express
const app = express();

// Middlewares
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

/**
 * Health check
 */
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Cavalera Google Ads API is running',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/google-ads/:year/:month
 * Obtiene datos de un mes específico
 * @param year - Año (ej: 2025)
 * @param month - Mes (1-12)
 */
app.get('/api/google-ads/:year/:month', async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    // Validaciones
    if (isNaN(year) || year < 2020 || year > 2030) {
      return res.status(400).json({
        success: false,
        error: 'Año inválido. Debe estar entre 2020 y 2030',
      } as ApiResponse<null>);
    }

    if (isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        error: 'Mes inválido. Debe estar entre 1 y 12',
      } as ApiResponse<null>);
    }

    console.log(`📊 Solicitando datos: ${year}-${month.toString().padStart(2, '0')}`);

    // Verificar si existe en cache (archivo JSON)
    const cacheFile = path.join(DATA_DIR, `google-ads-${year}-${month}.json`);

    if (fs.existsSync(cacheFile)) {
      console.log('✅ Datos encontrados en cache');
      const cachedData = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      return res.json({
        success: true,
        data: cachedData,
        message: 'Datos obtenidos desde cache',
      } as ApiResponse<GoogleAdsMonthlyData>);
    }

    // Si no existe en cache, extraer de Google Ads API
    console.log('🔄 Extrayendo datos desde Google Ads API...');
    const fetcher = new GoogleAdsFetcher(googleAdsConfig);
    const data = await fetcher.fetchMonthlyData(year, month);

    // Guardar en cache
    fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
    console.log(`💾 Datos guardados en: ${cacheFile}`);

    res.json({
      success: true,
      data,
      message: 'Datos extraídos desde Google Ads API',
    } as ApiResponse<GoogleAdsMonthlyData>);
  } catch (error: any) {
    console.error('❌ Error al obtener datos:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
    } as ApiResponse<null>);
  }
});

/**
 * GET /api/google-ads/range
 * Obtiene datos de un rango de fechas personalizado
 * @query startDate - Fecha inicial (YYYY-MM-DD)
 * @query endDate - Fecha final (YYYY-MM-DD)
 */
app.get('/api/google-ads/range', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Se requieren los parámetros startDate y endDate',
      } as ApiResponse<null>);
    }

    // Validar formato de fechas (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate as string) || !dateRegex.test(endDate as string)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de fecha inválido. Use YYYY-MM-DD',
      } as ApiResponse<null>);
    }

    console.log(`📊 Solicitando datos: ${startDate} - ${endDate}`);

    const fetcher = new GoogleAdsFetcher(googleAdsConfig);

    // Extraer año y mes del startDate para usar fetchMonthlyData
    const [year, month] = (startDate as string).split('-').map(Number);
    const data = await fetcher.fetchMonthlyData(year, month);

    res.json({
      success: true,
      data,
      message: 'Datos extraídos desde Google Ads API',
    } as ApiResponse<GoogleAdsMonthlyData>);
  } catch (error: any) {
    console.error('❌ Error al obtener datos:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
    } as ApiResponse<null>);
  }
});

/**
 * POST /api/google-ads/refresh/:year/:month
 * Fuerza la actualización de los datos (ignora cache)
 */
app.post('/api/google-ads/refresh/:year/:month', async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({
        success: false,
        error: 'Parámetros inválidos',
      } as ApiResponse<null>);
    }

    console.log(`🔄 Actualizando datos: ${year}-${month.toString().padStart(2, '0')}`);

    const fetcher = new GoogleAdsFetcher(googleAdsConfig);
    const data = await fetcher.fetchMonthlyData(year, month);

    // Guardar en cache (sobrescribir si existe)
    const cacheFile = path.join(DATA_DIR, `google-ads-${year}-${month}.json`);
    fs.writeFileSync(cacheFile, JSON.stringify(data, null, 2));
    console.log(`💾 Cache actualizado: ${cacheFile}`);

    res.json({
      success: true,
      data,
      message: 'Datos actualizados correctamente',
    } as ApiResponse<GoogleAdsMonthlyData>);
  } catch (error: any) {
    console.error('❌ Error al actualizar datos:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
    } as ApiResponse<null>);
  }
});

/**
 * GET /api/months
 * Lista todos los meses disponibles en cache
 */
app.get('/api/months', (req: Request, res: Response) => {
  try {
    const files = fs.readdirSync(DATA_DIR);
    const months = files
      .filter((file) => file.startsWith('google-ads-') && file.endsWith('.json'))
      .map((file) => {
        const match = file.match(/google-ads-(\d{4})-(\d{1,2})\.json/);
        if (match) {
          return {
            year: parseInt(match[1]),
            month: parseInt(match[2]),
            file,
          };
        }
        return null;
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a!.year !== b!.year) return b!.year - a!.year;
        return b!.month - a!.month;
      });

    res.json({
      success: true,
      data: months,
      message: `${months.length} meses disponibles`,
    });
  } catch (error: any) {
    console.error('❌ Error al listar meses:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error interno del servidor',
    } as ApiResponse<null>);
  }
});

/**
 * Manejo de rutas no encontradas
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    availableEndpoints: [
      'GET /health',
      'GET /api/google-ads/:year/:month',
      'GET /api/google-ads/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD',
      'POST /api/google-ads/refresh/:year/:month',
      'GET /api/months',
    ],
  });
});

/**
 * Manejo global de errores
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Error no manejado:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  } as ApiResponse<null>);
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log('\n🚀 ========================================');
  console.log(`🚀 Cavalera Google Ads API`);
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
  console.log(`🚀 Frontend permitido: ${FRONTEND_URL}`);
  console.log(`🚀 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log('🚀 ========================================\n');
  console.log('📋 Endpoints disponibles:');
  console.log(`   GET  /health - Health check`);
  console.log(`   GET  /api/google-ads/:year/:month - Obtener datos de un mes`);
  console.log(`   GET  /api/google-ads/range - Obtener datos de rango de fechas`);
  console.log(`   POST /api/google-ads/refresh/:year/:month - Refrescar cache`);
  console.log(`   GET  /api/months - Listar meses disponibles`);
  console.log('\n✅ Servidor listo para recibir peticiones\n');
});

export default app;
