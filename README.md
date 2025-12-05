# Dashboard Google Ads - Cavalera Tattoo & Piercing

Dashboard interactivo profesional para analizar las campañas de Google Ads de Cavalera (estudio de tatuajes y piercings) durante noviembre 2025, integrando datos de Google Ads con información de ventas de AgendaPro.

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

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

El dashboard estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
/src
├── components/          # Componentes React
│   ├── Dashboard.tsx   # Componente principal
│   ├── Header.tsx      # Encabezado
│   ├── KPICard.tsx     # Tarjeta de KPI
│   ├── TimeSeriesChart.tsx
│   ├── LocationChart.tsx
│   ├── KeywordsTable.tsx
│   ├── ScheduleHeatmap.tsx
│   ├── SalesPanel.tsx
│   ├── CampaignsTable.tsx
│   └── InsightsPanel.tsx
├── data/               # Datos
│   ├── agendaPro.ts   # Datos de ventas
│   └── mockData.ts    # Datos de Google Ads
├── types/             # TypeScript types
│   └── index.ts
├── utils/             # Utilidades
│   ├── formatters.ts  # Formateo de números
│   └── calculations.ts # Cálculos de métricas
├── assets/            # Assets estáticos
│   └── logo_cavalera.svg
├── index.css          # Estilos globales
└── main.tsx           # Entry point
```

## 📈 Datos de Ejemplo

El proyecto incluye datos de ejemplo (mock data) para demostración. Para usar datos reales:

1. Exporta los datos de Google Ads en formato CSV
2. Procesa los CSVs usando las utilidades en `src/utils/dataProcessing.ts`
3. Reemplaza los datos en `src/data/mockData.ts`

### CSVs Soportados

- Informe de campaña
- Serie temporal diaria
- Informe de anuncios
- Términos de búsqueda
- Palabras clave
- Ubicaciones geográficas
- Programación de anuncios

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
