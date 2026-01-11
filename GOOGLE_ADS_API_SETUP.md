# 🚀 Guía Completa: Integración Google Ads API - Dashboard Cavalera

Esta guía te explica cómo automatizar la actualización del dashboard con datos reales de Google Ads usando la API oficial.

---

## 📋 Tabla de Contenidos

1. [¿Qué Incluye Esta Actualización?](#-qué-incluye-esta-actualización)
2. [Opciones de Uso](#-opciones-de-uso)
3. [Setup de Google Ads API](#-setup-de-google-ads-api-paso-a-paso)
4. [Configuración del Backend](#%EF%B8%8F-configuración-del-backend)
5. [Configuración del Frontend](#-configuración-del-frontend)
6. [Uso del Sistema](#-uso-del-sistema)
7. [Troubleshooting](#-troubleshooting)

---

## 🎯 ¿Qué Incluye Esta Actualización?

### Backend (Nuevo)
- ✅ **API REST con Express.js** - Servidor que extrae datos de Google Ads
- ✅ **Script de extracción automático** - Obtiene todos los datos necesarios
- ✅ **Sistema de cache** - Guarda datos en archivos JSON
- ✅ **TypeScript completo** - Type-safe

### Frontend (Actualizado)
- ✅ **Hooks personalizados** - `useGoogleAdsData()`, `useAvailableMonths()`, `useRefreshGoogleAds()`
- ✅ **Selector de mes dinámico** - Componente MonthSelector
- ✅ **Modo híbrido** - Puede usar API o datos estáticos

### Datos Extraídos Automáticamente
- ✅ Campañas (presupuesto, estado, métricas)
- ✅ Serie temporal diaria
- ✅ Keywords (palabras clave)
- ✅ Search terms (términos de búsqueda reales)
- ✅ Ubicaciones (comunas)
- ✅ Dispositivos (Mobile/Desktop/Tablet)
- ✅ Día de la semana
- ✅ Hora del día
- ✅ Demografía (sexo y edad)

---

## 🔀 Opciones de Uso

Tienes **3 opciones** para usar el dashboard:

### Opción 1: Datos Estáticos (Actual - Sin Cambios)
**Recomendado si:** Solo quieres ver el informe de noviembre sin actualizaciones

- ✅ No requiere configuración
- ✅ Funciona inmediatamente
- ❌ Los datos no se actualizan automáticamente
- ❌ Necesitas editar código para agregar nuevos meses

**Configuración:**
```env
# .env
VITE_DATA_MODE=static
```

### Opción 2: API Local (Desarrollo)
**Recomendado si:** Quieres probar la integración o actualizar datos manualmente cada mes

- ✅ Datos actualizados desde Google Ads
- ✅ Puedes extraer datos de cualquier mes
- ✅ Selector de mes dinámico
- ⚠️ Requiere correr backend en tu computadora
- ⚠️ Configuración de Google Ads API necesaria

**Configuración:**
```env
# .env
VITE_DATA_MODE=api
VITE_API_URL=http://localhost:3001
```

### Opción 3: API en Producción (Automatizado)
**Recomendado si:** Quieres que el dashboard se actualice solo

- ✅ Totalmente automatizado
- ✅ Accesible desde cualquier lugar
- ✅ Datos siempre actualizados
- ⚠️ Requiere deploy del backend (Vercel/Railway/Render)
- ⚠️ Configuración de Google Ads API necesaria

**Configuración:**
```env
# .env
VITE_DATA_MODE=api
VITE_API_URL=https://tu-api.vercel.app
VITE_AUTO_REFRESH=true
VITE_AUTO_REFRESH_INTERVAL=30
```

---

## 🔐 Setup de Google Ads API (Paso a Paso)

### Requisitos
- Cuenta de Google Ads con acceso de administrador
- Cuenta de Google Cloud (gratis)
- ~30 minutos de tiempo

---

### Paso 1: Obtener Developer Token

1. Ve a tu cuenta de Google Ads Manager
2. Click en **Herramientas y configuración** (ícono de llave inglesa)
3. En "Configuración", click en **Centro de API**
4. Click en **Solicitar acceso a API**
5. Completa el formulario:
   - Nombre de la aplicación: "Cavalera Dashboard"
   - Descripción: "Dashboard de métricas para análisis interno"
   - Tipo de acceso: "Producción" (si tienes cuenta de pago)
6. Espera la aprobación (puede tomar 24-48 horas)
7. Una vez aprobado, copia tu **Developer Token**

**⚠️ Importante:** Guarda este token en un lugar seguro. Lo necesitarás después.

---

### Paso 2: Crear Proyecto en Google Cloud

1. Ve a https://console.cloud.google.com/
2. Click en **Nuevo Proyecto**
3. Nombre del proyecto: "Cavalera Ads API"
4. Click en **Crear**
5. Espera a que se cree el proyecto (unos segundos)

---

### Paso 3: Habilitar Google Ads API

1. Con el proyecto "Cavalera Ads API" seleccionado
2. Ve a **APIs y servicios** → **Biblioteca**
3. Busca: "Google Ads API"
4. Click en **Google Ads API**
5. Click en **Habilitar**
6. Espera a que se habilite (~30 segundos)

---

### Paso 4: Crear Credenciales OAuth 2.0

1. Ve a **APIs y servicios** → **Credenciales**
2. Click en **Crear credenciales** → **ID de cliente de OAuth 2.0**
3. Si aparece advertencia de "Pantalla de consentimiento":
   - Click en **Configurar pantalla de consentimiento**
   - Tipo de usuario: **Externo**
   - Nombre de la app: "Cavalera Dashboard"
   - Correo de asistencia: tu email
   - Ámbitos: No agregar ninguno
   - Usuarios de prueba: Agrega tu email
   - Click en **Guardar y continuar** hasta finalizar
4. Vuelve a **Credenciales** → **Crear credenciales** → **ID de cliente de OAuth 2.0**
5. Tipo de aplicación: **Aplicación de escritorio**
6. Nombre: "Cavalera Desktop Client"
7. Click en **Crear**
8. **Descarga el archivo JSON** (click en ícono de descarga)
9. Abre el JSON y copia:
   - `client_id` (algo como: 123456.apps.googleusercontent.com)
   - `client_secret` (algo como: GOCSPX-abc123...)

---

### Paso 5: Obtener Refresh Token

Necesitas generar un **refresh token** para que la API pueda acceder a Google Ads sin requerir login manual cada vez.

**Opción A: Script automatizado (Recomendado)**

1. Ve a la carpeta `backend/`:
```bash
cd backend
```

2. Crea un archivo `get-refresh-token.js`:
```javascript
const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');
const open = require('open');

// REEMPLAZA CON TUS VALORES
const CLIENT_ID = 'TU_CLIENT_ID.apps.googleusercontent.com';
const CLIENT_SECRET = 'TU_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const scopes = ['https://www.googleapis.com/auth/adwords'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent',
});

console.log('\n🔐 ========================================');
console.log('🔐 Generador de Refresh Token');
console.log('🔐 ========================================\n');
console.log('📋 Instrucciones:');
console.log('1. Se abrirá tu navegador automáticamente');
console.log('2. Inicia sesión con tu cuenta de Google Ads');
console.log('3. Acepta los permisos');
console.log('4. Espera a que aparezca el refresh token aquí\n');

const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const code = queryObject.code;

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);

      console.log('\n✅ ========================================');
      console.log('✅ Refresh Token Generado Exitosamente');
      console.log('✅ ========================================\n');
      console.log('📋 Copia este valor y guárdalo en tu .env:\n');
      console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}\n`);
      console.log('⚠️  IMPORTANTE: Guarda este token en un lugar seguro.\n');

      res.end('<h1>✅ Autenticación exitosa!</h1><p>Puedes cerrar esta ventana y volver a la terminal.</p>');
      server.close();
    } catch (error) {
      console.error('❌ Error al obtener el token:', error);
      res.end('<h1>❌ Error</h1><p>Revisa la terminal para más detalles.</p>');
      server.close();
    }
  }
});

server.listen(3000, () => {
  console.log('🌐 Servidor iniciado en http://localhost:3000');
  console.log('🚀 Abriendo navegador...\n');
  open(authUrl);
});
```

3. Instala la dependencia necesaria:
```bash
npm install google-auth-library open
```

4. Ejecuta el script:
```bash
node get-refresh-token.js
```

5. El navegador se abrirá automáticamente, inicia sesión y acepta los permisos
6. Copia el **Refresh Token** que aparece en la terminal

---

### Paso 6: Obtener Customer ID

1. Ve a tu cuenta de Google Ads
2. En la esquina superior derecha, busca el **Customer ID**
3. Formato: `123-456-7890`
4. Cópialo **sin guiones**: `1234567890`

---

## ⚙️ Configuración del Backend

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la carpeta `backend/`:

```bash
cp .env.example .env
```

Edita `backend/.env` y completa:

```env
# Developer Token (del Paso 1)
GOOGLE_ADS_DEVELOPER_TOKEN=tu-developer-token-aqui

# OAuth Credentials (del Paso 4)
GOOGLE_ADS_CLIENT_ID=123456.apps.googleusercontent.com
GOOGLE_ADS_CLIENT_SECRET=GOCSPX-abc123...

# Refresh Token (del Paso 5)
GOOGLE_ADS_REFRESH_TOKEN=1//abc123...

# Customer ID (del Paso 6 - sin guiones)
GOOGLE_ADS_CUSTOMER_ID=1234567890

# Configuración del servidor
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Probar la conexión

```bash
npm run dev
```

Deberías ver:

```
🚀 ========================================
🚀 Cavalera Google Ads API
🚀 Servidor corriendo en: http://localhost:3001
🚀 ========================================
```

### 4. Extraer datos del primer mes

```bash
npm run fetch:monthly -- --year=2025 --month=12
```

Si todo está configurado correctamente, verás:

```
✅ Datos extraídos exitosamente
📁 Archivo generado: backend/data/google-ads-2025-12.json
📊 Total de conversiones: 95
💰 Costo total: $320.450
```

---

## 🎨 Configuración del Frontend

### 1. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita `.env`:

**Para usar la API:**
```env
VITE_DATA_MODE=api
VITE_API_URL=http://localhost:3001
VITE_AUTO_REFRESH=false
```

**Para usar datos estáticos (por defecto):**
```env
VITE_DATA_MODE=static
```

### 2. Instalar dependencias (si no lo has hecho)

```bash
npm install
```

### 3. Iniciar el dashboard

```bash
npm run dev
```

El dashboard estará en: http://localhost:5173

---

## 📖 Uso del Sistema

### Modo API (Recomendado para producción)

1. **Iniciar el backend:**
```bash
cd backend
npm run dev
```

2. **Iniciar el frontend (en otra terminal):**
```bash
npm run dev
```

3. **Usar el selector de mes** en el dashboard para cambiar entre períodos

4. **Click en el botón de refresh** (ícono ↻) para actualizar datos desde Google Ads

---

### Actualizar Datos Mensualmente

**Opción A: Desde el dashboard (UI)**
1. Abre el dashboard
2. Selecciona el mes que quieres actualizar
3. Click en el botón de refresh (↻)
4. Los datos se extraerán desde Google Ads y se guardarán en cache

**Opción B: Desde terminal (recomendado)**
```bash
cd backend
npm run fetch:monthly -- --year=2025 --month=12
```

**Opción C: Desde la API (con curl)**
```bash
curl -X POST http://localhost:3001/api/google-ads/refresh/2025/12
```

---

### Ver Meses Disponibles

**Desde la API:**
```bash
curl http://localhost:3001/api/months
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    { "year": 2025, "month": 12, "file": "google-ads-2025-12.json" },
    { "year": 2025, "month": 11, "file": "google-ads-2025-11.json" }
  ]
}
```

---

## 🐛 Troubleshooting

### Error: "Developer token is invalid"

**Causa:** El developer token no ha sido aprobado o es incorrecto

**Solución:**
1. Verifica que hayas solicitado el token en Google Ads
2. Espera a que sea aprobado (24-48 horas)
3. Para desarrollo, puedes solicitar un token de "Test"

---

### Error: "OAuth credentials are invalid"

**Causa:** El client_id, client_secret o refresh_token son incorrectos

**Solución:**
1. Verifica que hayas copiado correctamente las credenciales
2. Regenera el refresh token (Paso 5)
3. Asegúrate de que no haya espacios extra al copiar/pegar

---

### Error: "Customer ID not found"

**Causa:** El Customer ID es incorrecto

**Solución:**
1. Verifica que sea el Customer ID correcto (sin guiones)
2. Asegúrate de tener permisos en esa cuenta
3. Si usas MCC (Manager Account), agrega también `GOOGLE_ADS_LOGIN_CUSTOMER_ID`

---

### Error: "CORS error" en el frontend

**Causa:** El backend no permite peticiones desde el frontend

**Solución:**
1. Verifica que `FRONTEND_URL` en el backend sea `http://localhost:5173`
2. Reinicia el servidor backend
3. Limpia la cache del navegador

---

### El selector de mes no muestra datos

**Causa:** No hay archivos JSON en `backend/data/`

**Solución:**
1. Extrae al menos un mes de datos:
```bash
cd backend
npm run fetch:monthly -- --year=2025 --month=12
```

---

## 🚀 Deploy en Producción

### Backend en Vercel

1. Crea un nuevo proyecto en Vercel
2. Conecta tu repositorio
3. Configura las variables de entorno (todas las de `.env`)
4. Deploy automático

### Backend en Railway

1. Conecta tu repo de GitHub
2. Railway detectará Node.js automáticamente
3. Configura las variables de entorno
4. Deploy automático

### Frontend en Vercel/Netlify

1. Actualiza `VITE_API_URL` con la URL de tu backend en producción
2. Deploy normalmente

---

## ✅ Checklist Final

- [ ] Developer Token obtenido y aprobado
- [ ] Credenciales OAuth 2.0 creadas
- [ ] Refresh Token generado
- [ ] Customer ID copiado
- [ ] Backend configurado (`.env`)
- [ ] Backend funcionando (`npm run dev`)
- [ ] Datos de al menos un mes extraídos
- [ ] Frontend configurado (`.env`)
- [ ] Frontend funcionando y conectado a la API
- [ ] Selector de mes funcional
- [ ] Botón de refresh funcional

---

## 💡 Consejos y Mejores Prácticas

1. **Seguridad:**
   - Nunca subas el archivo `.env` a Git
   - Usa variables de entorno en producción
   - Considera agregar autenticación al backend

2. **Performance:**
   - Los datos se guardan en cache automáticamente
   - Solo haz refresh cuando realmente necesites datos actualizados
   - El frontend usa el cache por defecto

3. **Mantenimiento:**
   - Extrae datos del nuevo mes al inicio de cada mes
   - Verifica que el Developer Token siga activo
   - Monitorea los límites de la API de Google Ads

---

**¿Necesitas ayuda?**
- 📚 Docs de Google Ads API: https://developers.google.com/google-ads/api/docs
- 🆘 Soporte de Google Ads: https://support.google.com/google-ads

---

**Desarrollado por Towen Ads para Cavalera Tattoo & Piercing** 🎨
