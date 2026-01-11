# 🔄 Actualización Automática Diaria - Dashboard Cavalera

Guía completa para configurar la actualización automática de datos desde Google Ads API.

---

## 📋 Opciones de Actualización Automática

Tienes **4 opciones** para automatizar la actualización de datos:

| Opción | Complejidad | Costo | Recomendado para |
|--------|-------------|-------|------------------|
| **GitHub Actions** | ⭐ Fácil | Gratis | Proyectos en GitHub |
| **Vercel Cron** | ⭐ Fácil | Gratis (hobby), $20/mes (pro) | Apps en Vercel |
| **Railway Cron** | ⭐⭐ Media | ~$5/mes | Backend dedicado |
| **Crontab (Servidor)** | ⭐⭐⭐ Avanzada | Variable | Servidores propios |

---

## 🚀 Opción 1: GitHub Actions (Recomendado - Gratis)

**✅ Ventajas:**
- Totalmente gratis
- No requiere servidor 24/7
- Fácil configuración
- Commits automáticos al repo

**📝 Setup:**

### 1. Agregar Secrets a GitHub

Ve a tu repositorio → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Agrega estos secrets:
```
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_REFRESH_TOKEN
GOOGLE_ADS_CUSTOMER_ID
```

### 2. Verificar el Workflow

El archivo ya está creado en `.github/workflows/daily-update.yml`

```yaml
name: Daily Google Ads Update

on:
  schedule:
    # Ejecutar todos los días a las 2:00 AM UTC
    - cron: '0 2 * * *'

  # Permitir ejecución manual
  workflow_dispatch:
```

### 3. Ajustar la Hora (Opcional)

Para zona horaria de Chile (GMT-3/-4), usa:
```yaml
- cron: '0 5 * * *'  # 2:00 AM Chile = 5:00 AM UTC
```

**Calculadora de cron:** https://crontab.guru/

### 4. Probar Manualmente

1. Ve a **Actions** en GitHub
2. Selecciona **Daily Google Ads Update**
3. Click en **Run workflow**
4. Espera ~2-3 minutos
5. Verifica que se creó el commit con los datos actualizados

### 5. Resultado Esperado

Cada día a las 2 AM, GitHub Actions:
1. ✅ Extrae datos del mes actual desde Google Ads
2. ✅ Guarda el JSON en `backend/data/`
3. ✅ Hace commit automático
4. ✅ Push al repositorio

**Log de ejemplo:**
```
✅ Actualización completada exitosamente
📁 Archivo generado: google-ads-2025-12.json
📊 Conversiones: 95
💰 Costo: $320.450
```

---

## 🔷 Opción 2: Vercel Cron (API Serverless)

**✅ Ventajas:**
- Integración nativa con Vercel
- Sin configuración de servidor
- Escalable automáticamente

**⚠️ Limitaciones:**
- Plan Hobby: 1 cron job gratis
- Plan Pro: $20/mes (crons ilimitados)

**📝 Setup:**

### 1. Deploy Backend en Vercel

```bash
cd backend
vercel
```

### 2. Configurar Variables de Entorno

En Vercel Dashboard → tu proyecto → **Settings** → **Environment Variables**

Agrega:
```
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_REFRESH_TOKEN
GOOGLE_ADS_CUSTOMER_ID
CRON_SECRET_TOKEN (genera uno con: openssl rand -hex 32)
```

### 3. Verificar vercel.json

El archivo `backend/vercel.json` ya está configurado:

```json
{
  "crons": [
    {
      "path": "/api/webhook/daily-update",
      "schedule": "0 2 * * *"
    }
  ]
}
```

### 4. Deploy

```bash
vercel --prod
```

### 5. Verificar Cron

Ve a **Settings** → **Cron Jobs** en tu proyecto Vercel

Deberías ver:
- Path: `/api/webhook/daily-update`
- Schedule: `0 2 * * *` (2:00 AM diaria)

---

## 🚂 Opción 3: Railway Cron

**✅ Ventajas:**
- Backend dedicado 24/7
- $5/mes de crédito gratis
- Base de datos incluida

**📝 Setup:**

### 1. Deploy en Railway

1. Conecta tu repo de GitHub
2. Railway detecta Node.js automáticamente
3. Configura variables de entorno

### 2. Instalar Railway CLI

```bash
npm i -g @railway/cli
railway login
```

### 3. Configurar Cron con Railway CLI

```bash
railway run npm run update:daily --schedule "0 2 * * *"
```

### 4. O Usar Servicio Externo (EasyCron)

1. Regístrate en https://www.easycron.com/ (gratis)
2. Crea nuevo cron job:
   - URL: `https://tu-app.railway.app/api/webhook/daily-update`
   - Method: POST
   - Headers: `x-cron-token: TU_SECRET_TOKEN`
   - Schedule: `0 2 * * *`

---

## 🖥️ Opción 4: Crontab (Servidor Propio/VPS)

**✅ Ventajas:**
- Control total
- Sin costos adicionales (si ya tienes servidor)
- Más flexible

**⚠️ Requiere:**
- Servidor Linux/macOS con acceso SSH
- Node.js instalado

**📝 Setup:**

### 1. SSH a tu Servidor

```bash
ssh usuario@tu-servidor.com
```

### 2. Clonar Repositorio

```bash
git clone https://github.com/tuuser/Informe_Mensual_Cavalera.git
cd Informe_Mensual_Cavalera/backend
```

### 3. Instalar Dependencias

```bash
npm install
npm run build
```

### 4. Configurar Variables de Entorno

```bash
nano .env
# Pega tus credenciales
```

### 5. Editar Crontab

```bash
crontab -e
```

Agrega esta línea (ajusta la ruta):
```bash
0 2 * * * cd /home/usuario/Informe_Mensual_Cavalera/backend && npm run update:daily >> logs/cron.log 2>&1
```

### 6. Verificar Crontab

```bash
crontab -l
```

### 7. Ver Logs

```bash
tail -f backend/logs/cron.log
```

---

## 🎯 Comparación de Opciones

| Feature | GitHub Actions | Vercel Cron | Railway Cron | Crontab VPS |
|---------|---------------|-------------|--------------|-------------|
| **Costo** | Gratis | Gratis/Pro | ~$5/mes | Variable |
| **Setup** | ⭐ Fácil | ⭐ Fácil | ⭐⭐ Media | ⭐⭐⭐ Avanzada |
| **Logs** | ✅ En GitHub | ✅ En Vercel | ✅ En Railway | ⚠️ Manual |
| **Commits automáticos** | ✅ Sí | ❌ No | ❌ No | ⚠️ Manual |
| **Backend 24/7** | ❌ No | ✅ Sí | ✅ Sí | ✅ Sí |
| **Escalabilidad** | ❌ No | ✅ Sí | ✅ Sí | ⚠️ Manual |

---

## 🔐 Seguridad del Webhook

Para proteger el endpoint de actualización, usa un token secreto:

### 1. Generar Token

```bash
openssl rand -hex 32
```

Ejemplo: `a1b2c3d4e5f6...`

### 2. Agregar a .env

```env
CRON_SECRET_TOKEN=tu-token-secreto-aqui
```

### 3. Llamar al Webhook con el Token

```bash
curl -X POST \
  https://tu-api.com/api/webhook/daily-update \
  -H "x-cron-token: tu-token-secreto-aqui"
```

---

## 📅 Personalizar Horario

### Formatos Comunes

```bash
0 2 * * *     # Todos los días a las 2:00 AM
0 */6 * * *   # Cada 6 horas
0 0,12 * * *  # A las 12:00 AM y 12:00 PM
0 2 * * 1-5   # De lunes a viernes a las 2:00 AM
0 2 1 * *     # El primer día de cada mes a las 2:00 AM
*/30 * * * *  # Cada 30 minutos (no recomendado para Google Ads)
```

### Calculadora Online

Usa https://crontab.guru/ para generar tu horario personalizado.

---

## 🧪 Probar Actualización Manual

Antes de configurar el cron, prueba manualmente:

### Desde Terminal

```bash
cd backend
npm run update:daily
```

### Desde cURL (Webhook)

```bash
curl -X POST http://localhost:3001/api/webhook/daily-update \
  -H "x-cron-token: tu-token"
```

**Respuesta esperada:**
```json
{
  "success": true,
  "message": "Datos actualizados correctamente",
  "data": {
    "period": "2025-12",
    "conversions": 95,
    "cost": 320450,
    "duration": "3245ms"
  }
}
```

---

## 📊 Monitorear Actualizaciones

### Ver Logs (GitHub Actions)

1. Ve a **Actions** en tu repositorio
2. Click en el workflow más reciente
3. Expande los pasos para ver detalles

### Ver Logs (Servidor Local)

```bash
tail -f backend/logs/updates.log
```

**Formato del log:**
```
[2025-12-11T02:00:15.234Z] SUCCESS - 2025-12 - Conversions: 95
[2025-12-12T02:00:18.456Z] SUCCESS - 2025-12 - Conversions: 98
[2025-12-13T02:00:20.789Z] ERROR - 2025-12 - Conversions: 0 - Error: Token expired
```

---

## 🐛 Troubleshooting

### El cron no se ejecuta

**GitHub Actions:**
- Verifica que los secrets estén configurados
- Asegúrate de que el workflow está en la rama `main`
- Los cron de GitHub pueden tener retrasos de hasta 15 minutos

**Vercel:**
- Verifica que estés en plan Pro (Hobby tiene limitaciones)
- Revisa los logs en Vercel Dashboard

**Crontab:**
- Verifica que el cron esté activo: `crontab -l`
- Revisa los logs: `tail -f /var/log/syslog | grep CRON`

### Error: "Token expired"

- Regenera el refresh token (ver [GOOGLE_ADS_API_SETUP.md](./GOOGLE_ADS_API_SETUP.md))
- Actualiza el secret/variable de entorno

### Error: "API quota exceeded"

- Google Ads tiene límites de requests
- Reduce la frecuencia (de diaria a 2-3 veces por semana)

### Los datos no se actualizan en el frontend

- Verifica que el archivo JSON se creó en `backend/data/`
- Haz un hard refresh en el navegador (Ctrl+Shift+R)
- Si usas cache, limpia la cache del navegador

---

## ✅ Checklist de Configuración

### GitHub Actions
- [ ] Secrets configurados en GitHub
- [ ] Workflow habilitado (`.github/workflows/daily-update.yml`)
- [ ] Primera ejecución manual exitosa
- [ ] Commit automático funcionando

### Vercel Cron
- [ ] Backend deployado en Vercel
- [ ] Variables de entorno configuradas
- [ ] `vercel.json` con cron configurado
- [ ] Cron visible en Vercel Dashboard

### Railway/Servidor
- [ ] Backend corriendo 24/7
- [ ] Cron configurado (EasyCron o crontab)
- [ ] Logs funcionando
- [ ] Primera actualización manual exitosa

---

## 📈 Resultado Final

Una vez configurado, el sistema:

1. ✅ **Extrae datos automáticamente** todos los días a las 2 AM
2. ✅ **Actualiza el mes actual** con datos frescos
3. ✅ **Guarda en cache** para acceso rápido
4. ✅ **No requiere intervención manual**
5. ✅ **El dashboard siempre muestra datos actualizados**

---

## 💡 Recomendaciones

1. **Usa GitHub Actions** si tu repo está en GitHub (es gratis y simple)
2. **Configura notificaciones** para saber si falla la actualización
3. **Monitorea los logs** la primera semana
4. **Ten un backup** de las credenciales de Google Ads
5. **No ejecutes el cron cada minuto** (respeta los límites de la API)

---

## 🆘 ¿Necesitas Ayuda?

- 📚 Ver [GOOGLE_ADS_API_SETUP.md](./GOOGLE_ADS_API_SETUP.md) para configuración inicial
- 📖 Ver [backend/README.md](./backend/README.md) para docs del backend
- 🐛 Reportar issues: https://github.com/bartowen/Informe_Mensual_Cavalera/issues

---

**¡Sistema de actualización automática configurado con éxito!** 🎉

Ahora tu dashboard de Cavalera se actualizará solo cada día sin necesidad de intervención manual.
