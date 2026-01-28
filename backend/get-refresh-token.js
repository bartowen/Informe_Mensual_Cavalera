const { OAuth2Client } = require('google-auth-library');
const http = require('http');
const url = require('url');

// ========================================
// INSTRUCCIONES:
// 1. Reemplaza CLIENT_ID y CLIENT_SECRET con tus valores de Google Cloud Console
// 2. Ejecuta: node get-refresh-token.js
// 3. Se abrirá tu navegador automáticamente
// 4. Inicia sesión y acepta los permisos
// 5. Copia el Refresh Token que aparecerá aquí
// ========================================

// REEMPLAZA ESTOS VALORES ⬇️
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
console.log('🔐 Generador de Refresh Token - Google Ads API');
console.log('🔐 ========================================\n');
console.log('📋 Instrucciones:');
console.log('1. Se abrirá tu navegador automáticamente');
console.log('2. Inicia sesión con tu cuenta de Google Ads');
console.log('3. Acepta los permisos solicitados');
console.log('4. Espera a que aparezca el refresh token aquí\n');
console.log('🌐 Si el navegador no se abre automáticamente, copia esta URL:');
console.log(`   ${authUrl}\n`);

const server = http.createServer(async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const code = queryObject.code;

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);

      console.log('\n✅ ========================================');
      console.log('✅ Refresh Token Generado Exitosamente!');
      console.log('✅ ========================================\n');
      console.log('📋 Copia estos valores y guárdalos en backend/.env:\n');
      console.log(`GOOGLE_ADS_REFRESH_TOKEN=${tokens.refresh_token}\n`);

      if (tokens.access_token) {
        console.log('ℹ️  También se generó un Access Token (válido por 1 hora):');
        console.log(`   ${tokens.access_token.substring(0, 50)}...\n`);
      }

      console.log('⚠️  IMPORTANTE:');
      console.log('   - Guarda el Refresh Token en un lugar seguro');
      console.log('   - NUNCA lo subas a Git o lo compartas públicamente');
      console.log('   - Actualiza el archivo backend/.env ahora\n');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Autenticación Exitosa</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 500px;
            }
            .success-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            h1 {
              color: #10b981;
              margin: 0 0 10px 0;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
            .token-box {
              background: #f3f4f6;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              word-break: break-all;
              font-family: monospace;
              font-size: 12px;
              color: #374151;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="success-icon">✅</div>
            <h1>¡Autenticación Exitosa!</h1>
            <p>El Refresh Token ha sido generado correctamente.</p>
            <p><strong>Vuelve a la terminal</strong> para copiar tu token y agregarlo al archivo <code>backend/.env</code></p>
            <p style="margin-top: 30px; font-size: 14px; color: #999;">
              Puedes cerrar esta ventana de forma segura.
            </p>
          </div>
        </body>
        </html>
      `);

      setTimeout(() => {
        server.close();
        console.log('✅ Servidor cerrado. Ya puedes continuar con la configuración.\n');
      }, 2000);

    } catch (error) {
      console.error('\n❌ ========================================');
      console.error('❌ Error al Obtener el Token');
      console.error('❌ ========================================\n');
      console.error('Detalles del error:', error.message);
      console.error('\n💡 Posibles soluciones:');
      console.error('1. Verifica que CLIENT_ID y CLIENT_SECRET sean correctos');
      console.error('2. Asegúrate de que la URL de redirección sea http://localhost:3000/oauth2callback');
      console.error('3. Revisa que la API de Google Ads esté habilitada en Google Cloud Console\n');

      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Error de Autenticación</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
              text-align: center;
              max-width: 500px;
            }
            .error-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            h1 {
              color: #ef4444;
              margin: 0 0 10px 0;
            }
            p {
              color: #666;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="error-icon">❌</div>
            <h1>Error de Autenticación</h1>
            <p>Hubo un problema al generar el token.</p>
            <p><strong>Revisa la terminal</strong> para más detalles sobre el error.</p>
          </div>
        </body>
        </html>
      `);

      setTimeout(() => {
        server.close();
      }, 2000);
    }
  }
});

server.listen(3000, () => {
  console.log('🌐 Servidor local iniciado en: http://localhost:3000');
  console.log('🚀 Abriendo navegador...\n');

  // Intentar abrir el navegador automáticamente
  const { exec } = require('child_process');
  const command = process.platform === 'win32' ? 'start' :
                  process.platform === 'darwin' ? 'open' : 'xdg-open';

  exec(`${command} "${authUrl}"`, (error) => {
    if (error) {
      console.log('⚠️  No se pudo abrir el navegador automáticamente.');
      console.log('   Por favor, copia y pega esta URL manualmente:\n');
      console.log(`   ${authUrl}\n`);
    }
  });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('\n❌ Error: El puerto 3000 ya está en uso.');
    console.error('💡 Solución: Cierra otras aplicaciones que usen ese puerto o edita este archivo para usar otro puerto.\n');
  } else {
    console.error('\n❌ Error al iniciar el servidor:', error.message, '\n');
  }
  process.exit(1);
});
