/**
 * Script para obtener los Channel IDs de YouTube
 * 
 * INSTRUCCIONES:
 * 1. Ve a https://www.youtube.com/@midulive
 * 2. Abre las herramientas de desarrollador (F12)
 * 3. Ve a la pestaña Console
 * 4. Pega este código y presiona Enter
 * 5. Repite para https://www.youtube.com/@midudev
 */

// Método 1: Buscar en el código fuente de la página
function getChannelIdFromPage() {
    const scripts = document.querySelectorAll('script');
    let channelId = null;

    scripts.forEach(script => {
        if (script.textContent && script.textContent.includes('"channelId"')) {
            const match = script.textContent.match(/"channelId":"([^"]+)"/);
            if (match) {
                channelId = match[1];
            }
        }
    });

    return channelId;
}

// Método 2: Buscar en metadatos
function getChannelIdFromMeta() {
    const metaTags = document.querySelectorAll('meta[property="og:url"]');
    for (let meta of metaTags) {
        const content = meta.getAttribute('content');
        if (content && content.includes('/channel/')) {
            const match = content.match(/\/channel\/([^/]+)/);
            if (match) {
                return match[1];
            }
        }
    }
    return null;
}

// Método 3: Buscar en links rel=canonical
function getChannelIdFromCanonical() {
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const href = canonical.getAttribute('href');
        if (href && href.includes('/channel/')) {
            const match = href.match(/\/channel\/([^/]+)/);
            if (match) {
                return match[1];
            }
        }
    }
    return null;
}

// Ejecutar todos los métodos
console.log('🔍 Buscando Channel ID...');
console.log('Método 1 (código fuente):', getChannelIdFromPage());
console.log('Método 2 (metadatos):', getChannelIdFromMeta());
console.log('Método 3 (canonical):', getChannelIdFromCanonical());

// También mostrar la URL actual para referencia
console.log('📍 URL actual:', window.location.href);

/**
 * ALTERNATIVA: Usar la YouTube Data API directamente
 * 
 * Si tienes tu API key, puedes usar este endpoint:
 * https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=@midulive&key=TU_API_KEY
 * 
 * O buscar por handle:
 * https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=@midulive&key=TU_API_KEY
 */
