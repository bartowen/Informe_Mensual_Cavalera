# 📋 Guía Rápida de Uso - Dashboard Cavalera

## 🚀 Inicio Rápido

### 1. Instalar Dependencias (primera vez)
```bash
npm install
```

### 2. Iniciar Servidor de Desarrollo
```bash
npm run dev
```

El dashboard se abrirá automáticamente en `http://localhost:3000`

### 3. Construir para Producción
```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📊 Usar con Datos Reales

Actualmente el dashboard usa datos de ejemplo (mock data). Para usar tus propios datos de Google Ads:

### Paso 1: Exportar Datos de Google Ads

Desde tu cuenta de Google Ads, exporta los siguientes informes en formato CSV:

1. **Informe de Campaña**: Rendimiento general de campañas
2. **Serie Temporal**: Datos diarios del período
3. **Informe de Palabras Clave**: Keywords configuradas
4. **Términos de Búsqueda**: Búsquedas reales de usuarios
5. **Ubicaciones Geográficas**: Rendimiento por comuna
6. **Programación de Anuncios**: Rendimiento por día/hora
7. **Dispositivos**: Rendimiento por tipo de dispositivo

### Paso 2: Actualizar los Datos

Edita el archivo `src/data/mockData.ts` y reemplaza los datos de ejemplo con tus datos reales.

**Ejemplo para Campañas:**

```typescript
export const campaignsData: CampaignData[] = [
  {
    campaignName: 'Nombre de tu campaña',
    status: 'Active',
    budget: 450000,
    impressions: 125430,
    clicks: 3845,
    conversions: 187,
    cost: 438250,
    ctr: 3.07,
    cpc: 114,
    cpa: 2344,
    conversionRate: 4.86,
  },
  // ... más campañas
];
```

### Paso 3: Actualizar Datos de AgendaPro

Edita el archivo `src/data/agendaPro.ts` con tus datos de ventas reales:

```typescript
export const agendaProData: AgendaProData = {
  summary: {
    totalSales: 41839303,        // Total de ventas en CLP
    totalTransactions: 339,       // Cantidad de ventas
    averageTicket: 123420,        // Ticket promedio
    salesVariation: 22.7,         // % variación vs mes anterior
    transactionsVariation: 39.5,  // % variación transacciones
    ticketVariation: -12.0,       // % variación ticket
  },
  // ... categorías y servicios
};
```

## 🎨 Personalización

### Cambiar Logo

1. Reemplaza el archivo `src/assets/logo_cavalera.svg` con tu logo
2. Formatos soportados: SVG, PNG, JPG
3. Tamaño recomendado: 200x60 px

### Cambiar Colores

Edita `tailwind.config.js` en la sección `theme.extend.colors`:

```javascript
primary: {
  DEFAULT: '#6366F1',  // Tu color primario
  // ... otros tonos
},
```

### Cambiar Período

Edita `src/components/Header.tsx` línea donde dice:
```typescript
<p className="text-lg font-bold">1 - 30 Noviembre 2025</p>
```

## 📈 Componentes del Dashboard

### Secciones Principales

1. **KPIs Principales** (6 tarjetas):
   - Presupuesto invertido
   - Formularios enviados (DESTACADO)
   - Costo por formulario
   - Ventas generadas
   - ROI
   - Ticket promedio

2. **Rendimiento Temporal**:
   - Gráfico de líneas con impresiones, clics y conversiones diarias

3. **Análisis de Campañas**:
   - Tabla detallada de todas las campañas
   - Ordenadas por conversiones

4. **Ubicación y Dispositivos**:
   - Top 10 comunas
   - Rendimiento por dispositivo (Mobile/Desktop/Tablet)

5. **Keywords y Términos**:
   - Top 10 palabras clave configuradas
   - Top 10 términos de búsqueda reales

6. **Programación (Heatmap)**:
   - Mapa de calor por día y hora
   - Muestra los mejores días y horarios

7. **Panel de Ventas AgendaPro**:
   - Resumen de ventas
   - Ventas por categoría
   - Top 10 servicios más vendidos
   - Relación formularios → ventas

8. **Insights y Recomendaciones**:
   - 6 insights automáticos generados
   - Mejores días, horarios, ubicaciones
   - ROI destacado

## 🔧 Solución de Problemas

### Error al instalar dependencias
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Puerto 3000 ocupado
Edita `vite.config.ts` y cambia el puerto:
```typescript
server: {
  port: 3001,  // Cambia a otro puerto
}
```

### Gráficos no se muestran
Verifica que Recharts esté instalado:
```bash
npm install recharts
```

## 📱 Visualización

El dashboard es responsive:
- **Desktop** (1200px+): Vista completa con todas las columnas
- **Tablet** (768px-1199px): 2 columnas adaptativas
- **Mobile** (<768px): 1 columna, gráficos optimizados

## 💡 Tips

1. **Datos REALES**: Reemplaza los mock data con tus datos reales para mayor precisión
2. **Actualización**: Actualiza mensualmente para comparativas
3. **Exportar**: Puedes hacer screenshots del dashboard para reportes
4. **ROI**: El ROI se calcula automáticamente con ventas y costos
5. **Insights**: Los insights se generan automáticamente basados en tus datos

## 📞 Soporte

Para problemas técnicos o preguntas:
- Revisa el archivo `README.md` para documentación completa
- Verifica que todas las dependencias estén instaladas
- Asegúrate de usar Node.js 18 o superior

## 🎯 Próximos Pasos

1. ✅ Instalar y probar con datos de ejemplo
2. 📊 Exportar datos reales de Google Ads
3. 🔄 Reemplazar mock data con datos reales
4. 🎨 Personalizar colores y logo si es necesario
5. 📈 Generar reportes mensuales

---

**¡Listo!** Tu dashboard está configurado y funcionando.
