# Cavalera Google Ads API Backend

Backend automatizado para extraer datos de Google Ads y servir al dashboard de Cavalera Tattoo & Piercing.

## 🚀 Características

- ✅ Extracción automática de datos de Google Ads API
- ✅ API REST con Express.js
- ✅ Cache de datos en archivos JSON
- ✅ TypeScript para type safety
- ✅ Soporte para múltiples meses
- ✅ Endpoints para frontend dinámico

---

## 📋 Requisitos Previos

1. **Node.js 18+** instalado
2. **Cuenta de Google Ads** con acceso de administrador
3. **Developer Token** de Google Ads
4. **Credenciales OAuth 2.0** de Google Cloud

---

## 🔧 Setup de Google Ads API

### Paso 1: Solicitar Developer Token

1. Ve a tu cuenta de Google Ads Manager
2. Navega a: **Herramientas y configuración** → **Configuración** → **Centro de API**
3. Solicita un **Developer Token**
4. Espera la aprobación (puede tomar 24-48 horas)
5. Una vez aprobado, copia el token

### Paso 2: Crear Proyecto en Google Cloud Console

1. Ve a https://console.cloud.google.com/
2. Crea un nuevo proyecto llamado "Cavalera Ads API"
3. Habilita la **Google Ads API**:
   - Ve a **APIs y servicios** → **Biblioteca**
   - Busca "Google Ads API"
   - Click en **Habilitar**

### Paso 3: Configurar OAuth 2.0

1. Ve a **APIs y servicios** → **Credenciales**
2. Click en **Crear credenciales** → **ID de cliente de OAuth 2.0**
3. Tipo de aplicación: **Aplicación de escritorio**
4. Nombre: "Cavalera Desktop Client"
5. Click en **Crear**
6. **Descarga el JSON** con las credenciales (contiene `client_id` y `client_secret`)

### Paso 4: Obtener Refresh Token

Ejecuta este script en Node.js para obtener el refresh token:

```javascript
const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');

const CLIENT_ID = 'TU_CLIENT_ID';
const CLIENT_SECRET = 'TU_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = ['https://www.googleapis.com/auth/adwords'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('🔐 Abre esta URL en tu navegador:');
console.log(authUrl);

// Crear servidor temporal para recibir el código
const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const code = queryObject.code;

  if (code) {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\n✅ Refresh Token:', tokens.refresh_token);
    res.end('Autenticación exitosa! Puedes cerrar esta ventana.');
    server.close();
  }
});

server.listen(3000);
```

**Ejecutar:**
```bash
node get-refresh-token.js
```

### Paso 5: Obtener Customer ID

1. Ve a tu cuenta de Google Ads
2. En la esquina superior derecha, verás tu **Customer ID** (formato: 123-456-7890)
3. Cópialo (sin guiones)

---

## ⚙️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` y completa con tus credenciales:

```env
GOOGLE_ADS_DEVELOPER_TOKEN=tu-developer-token
GOOGLE_ADS_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=tu-client-secret
GOOGLE_ADS_REFRESH_TOKEN=tu-refresh-token
GOOGLE_ADS_CUSTOMER_ID=1234567890
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Compilar TypeScript

```bash
npm run build
```

---

## 🚀 Uso

### Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: `http://localhost:3001`

### Iniciar servidor de producción

```bash
npm run build
npm start
```

### Extraer datos de un mes específico (script manual)

```bash
npm run fetch:monthly -- --year=2025 --month=12
```

Esto generará: `backend/data/google-ads-2025-12.json`

---

## 📡 Endpoints de la API

### 1. Health Check

```http
GET /health
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Cavalera Google Ads API is running",
  "timestamp": "2025-12-11T14:30:00.000Z"
}
```

---

### 2. Obtener datos de un mes

```http
GET /api/google-ads/:year/:month
```

**Ejemplo:**
```bash
curl http://localhost:3001/api/google-ads/2025/12
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2025-12-01",
      "endDate": "2025-12-31",
      "month": 12,
      "year": 2025
    },
    "campaigns": [...],
    "timeSeries": [...],
    "keywords": [...],
    "summary": {
      "totalConversions": 95,
      "totalCost": 320000,
      "averageCTR": 12.5
    }
  },
  "message": "Datos obtenidos desde cache"
}
```

---

### 3. Obtener datos de rango de fechas

```http
GET /api/google-ads/range?startDate=2025-12-01&endDate=2025-12-31
```

**Ejemplo:**
```bash
curl "http://localhost:3001/api/google-ads/range?startDate=2025-12-01&endDate=2025-12-31"
```

---

### 4. Refrescar cache (forzar actualización)

```http
POST /api/google-ads/refresh/:year/:month
```

**Ejemplo:**
```bash
curl -X POST http://localhost:3001/api/google-ads/refresh/2025/12
```

Esto extraerá los datos desde Google Ads API aunque ya existan en cache.

---

### 5. Listar meses disponibles

```http
GET /api/months
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    { "year": 2025, "month": 12, "file": "google-ads-2025-12.json" },
    { "year": 2025, "month": 11, "file": "google-ads-2025-11.json" }
  ],
  "message": "2 meses disponibles"
}
```

---

## 📂 Estructura de Archivos

```
backend/
├── src/
│   ├── server.ts              # Servidor Express
│   ├── services/
│   │   └── google-ads-fetcher.ts  # Lógica de extracción de Google Ads API
│   ├── types/
│   │   └── google-ads.types.ts    # Tipos TypeScript
│   └── scripts/
│       └── fetch-monthly-data.ts  # Script CLI para extraer datos
├── data/                      # Archivos JSON generados (cache)
│   ├── google-ads-2025-11.json
│   └── google-ads-2025-12.json
├── dist/                      # Código compilado
├── package.json
├── tsconfig.json
└── .env                       # Variables de entorno (NO versionar)
```

---

## 🔒 Seguridad

- ⚠️ **NUNCA** subas el archivo `.env` a Git
- ⚠️ Las credenciales de Google Ads son sensibles
- ✅ El `.gitignore` ya está configurado para ignorar `.env`
- ✅ Usa variables de entorno en producción (Vercel, Railway, etc.)

---

## 🐛 Troubleshooting

### Error: "Developer token is invalid"

- Verifica que hayas solicitado el token en Google Ads
- Espera a que sea aprobado (puede tomar 24-48h)
- En desarrollo, puedes usar un token de prueba

### Error: "OAuth credentials are invalid"

- Verifica que el `CLIENT_ID` y `CLIENT_SECRET` sean correctos
- Asegúrate de que el `REFRESH_TOKEN` sea válido
- Regenera el refresh token si es necesario

### Error: "Customer ID not found"

- Verifica que el Customer ID sea correcto (sin guiones)
- Asegúrate de tener permisos en esa cuenta

---

## 📊 Datos Extraídos

La API extrae automáticamente:

- ✅ Campañas (presupuesto, estado, métricas)
- ✅ Serie temporal diaria (impresiones, clics, conversiones)
- ✅ Palabras clave (keywords)
- ✅ Términos de búsqueda reales (search terms)
- ✅ Ubicaciones (comunas de Santiago)
- ✅ Dispositivos (Mobile/Desktop/Tablet)
- ✅ Día de la semana
- ✅ Hora del día
- ✅ Demografía (sexo y edad)
- ✅ Programación (día + hora)

---

## 🚀 Deploy en Producción

### Opción 1: Vercel Serverless Functions

```bash
npm i -g vercel
vercel
```

### Opción 2: Railway

1. Conecta tu repo de GitHub
2. Railway detectará automáticamente Node.js
3. Configura las variables de entorno en Railway
4. Deploy automático

### Opción 3: Render

1. Crea un nuevo "Web Service"
2. Conecta tu repo
3. Build command: `npm install && npm run build`
4. Start command: `npm start`

---

## 📝 Próximos Pasos

Una vez que el backend esté funcionando:

1. ✅ Actualiza el frontend para consumir la API
2. ✅ Implementa el selector de mes dinámico
3. ✅ Configura un cron job para actualizar datos automáticamente
4. ✅ Agrega autenticación si es necesario

---

## 💬 Soporte

Si tienes problemas con la configuración de Google Ads API:

- 📚 Documentación oficial: https://developers.google.com/google-ads/api/docs
- 🆘 Soporte de Google Ads: https://support.google.com/google-ads

---

**Desarrollado por Towen Ads para Cavalera Tattoo & Piercing** 🎨
