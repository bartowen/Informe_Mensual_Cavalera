# Dashboard Google Ads - Cavalera Tattoo & Piercing

Dashboard interactivo profesional para analizar las campañas de Google Ads de Cavalera (estudio de tatuajes y piercings), con integración automática a Google Ads API y datos de ventas de AgendaPro.

## 🆕 NUEVO: Integración con Google Ads API

El dashboard ahora soporta **actualización automática de datos** directamente desde Google Ads API:

- ✅ **Modo API**: Extrae datos en tiempo real desde Google Ads
- ✅ **Modo Estático**: Usa datos hardcodeados (por defecto)
- ✅ **Selector de mes dinámico**: Cambia entre períodos fácilmente
- ✅ **Backend con Express.js**: API REST lista para producción
- ✅ **Cache inteligente**: Guarda datos en JSON para acceso rápido

👉 **[Ver guía completa de setup](./GOOGLE_ADS_API_SETUP.md)**

## 🎯 Características Principales

- **KPIs Destacados**: Métricas principales en tarjetas visibles
- **Serie Temporal**: Gráfico de rendimiento diario del mes
- **Análisis de Campañas**: Tabla detallada de rendimiento por campaña
- **Top 10 Ubicaciones**: Comunas con mejor rendimiento
- **Análisis de Dispositivos**: Rendimiento por Desktop, Mobile y Tablet
- **Keywords y Términos**: Top 10 palabras clave y términos de búsqueda
- **Heatmap de Programación**: Mapa de calor por día y hora
- **Integración AgendaPro**: Panel de ventas reales con categorías y servicios
- **Insights Automáticos**: Recomendaciones basadas en datos

## 🎨 Paleta de Colores Towen

- **Primary**: #6366F1 (Indigo)
- **Secondary**: #8B5CF6 (Púrpura)
- **Accent**: #EC4899 (Rosa)
- **Success**: #10B981 (Verde)
- **Warning**: #F59E0B (Amarillo)
- **Danger**: #EF4444 (Rojo)

## 📊 Métricas Incluidas

### Google Ads
- Presupuesto invertido
- Formularios enviados (conversiones)
- Costo por formulario (CPA)
- Impresiones, clics, CTR
- Rendimiento por ubicación geográfica
- Rendimiento por dispositivo
- Mejores días y horarios

### AgendaPro (Ventas Reales)
- Total ventas: $41.839.303 CLP
- Cantidad de ventas: 339 transacciones
- Ticket promedio: $123.420 CLP
- Ventas por categoría
- Top 10 servicios más vendidos

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 18+
- npm o yarn
- (Opcional) Cuenta de Google Ads con acceso de administrador para usar la API

### Opción 1: Instalación Rápida (Datos Estáticos)

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`

### Opción 2: Con Google Ads API (Datos en Tiempo Real)

**1. Configurar Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de Google Ads API
npm run dev
```

**2. Configurar Frontend (en otra terminal):**
```bash
cp .env.example .env
# Edita .env y cambia VITE_DATA_MODE=api
npm run dev
```

**👉 [Ver guía completa de configuración de Google Ads API](./GOOGLE_ADS_API_SETUP.md)**

### Scripts Disponibles

**Frontend:**
- `npm run dev` - Iniciar desarrollo
- `npm run build` - Build producción
- `npm run preview` - Preview de producción

**Backend:**
- `npm run dev` - Iniciar API server
- `npm run build` - Compilar TypeScript
- `npm start` - Iniciar servidor compilado
- `npm run fetch:monthly -- --year=2025 --month=12` - Extraer datos de un mes

## 📁 Estructura del Proyecto

```
/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/               # Componentes React
│   │   ├── Dashboard.tsx        # Dashboard principal
│   │   ├── MonthSelector.tsx    # 🆕 Selector de mes dinámico
│   │   ├── KeywordsTable.tsx
│   │   ├── TimeSeriesChart.tsx
│   │   └── ...
│   ├── hooks/                   # 🆕 Custom React hooks
│   │   └── useGoogleAdsData.ts  # Hook para consumir API
│   ├── config/                  # 🆕 Configuración
│   │   └── dataSource.ts        # Config modo API/estático
│   ├── data/                    # Datos estáticos
│   │   ├── mockData.ts          # Datos de Google Ads
│   │   └── agendaPro.ts         # Datos de ventas
│   ├── types/                   # TypeScript types
│   ├── utils/                   # Utilidades
│   └── main.tsx                 # Entry point
│
├── backend/                     # 🆕 API Backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── server.ts            # Servidor Express
│   │   ├── services/
│   │   │   └── google-ads-fetcher.ts  # Lógica Google Ads API
│   │   ├── types/
│   │   │   └── google-ads.types.ts    # Tipos backend
│   │   └── scripts/
│   │       └── fetch-monthly-data.ts  # Script CLI
│   ├── data/                    # Cache de datos JSON
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── GOOGLE_ADS_API_SETUP.md      # 🆕 Guía completa de setup
└── README.md                    # Este archivo
```

## 📈 Gestión de Datos

### Modo Estático (Por Defecto)

El dashboard incluye datos hardcodeados de Noviembre 2025 en `src/data/mockData.ts`.

### Modo API (Recomendado para Producción)

Conecta directamente con Google Ads API para:
- ✅ Actualización automática de datos
- ✅ Múltiples meses disponibles
- ✅ Selector de mes dinámico
- ✅ Botón de refresh para forzar actualización

**Configuración:**
```env
# .env
VITE_DATA_MODE=api
VITE_API_URL=http://localhost:3001
```

**Ver guía completa:** [GOOGLE_ADS_API_SETUP.md](./GOOGLE_ADS_API_SETUP.md)

### Datos Extraídos Automáticamente

La API extrae automáticamente:
- Campañas (presupuesto, métricas)
- Serie temporal diaria
- Keywords y search terms
- Ubicaciones geográficas
- Dispositivos (Mobile/Desktop/Tablet)
- Demografía (sexo y edad)
- Programación (día y hora)

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js` para personalizar la paleta de colores.

### Modificar Métricas

Los cálculos de métricas están en `src/utils/calculations.ts`.

### Ajustar Formato

Los formatos de números están en `src/utils/formatters.ts`:
- Moneda CLP: `$1.234.567`
- Porcentajes: `+23,4%`
- Números: `1.234` o `1,2M`

## 📱 Responsive

El dashboard es totalmente responsive:
- **Desktop**: 3 columnas para KPIs, diseño completo
- **Tablet**: 2 columnas adaptativas
- **Mobile**: 1 columna, gráficos optimizados

## 🔧 Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **Recharts** - Gráficos
- **Lucide React** - Iconos

## 📝 Notas

- Los datos de AgendaPro están hardcodeados en `src/data/agendaPro.ts`
- El ticket promedio fijo es **$123.420 CLP** según datos de AgendaPro
- Los formularios enviados son la métrica más destacada del dashboard
- El ROI se calcula como: `((Ventas - Inversión) / Inversión) × 100`

## 🎯 Objetivo

Proporcionar al cliente Cavalera una visión clara del ROI de su inversión en Google Ads y facilitar la toma de decisiones de optimización basadas en datos.

## 📄 Licencia

Proyecto privado para Cavalera Tattoo & Piercing Studio.
