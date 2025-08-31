# 🎯 Sistema de Categorización Automática de Videos de YouTube

## 📋 Descripción

Este sistema obtiene automáticamente todos los videos de los canales @midulive y @midudev de YouTube y los clasifica en categorías según la duración y palabras clave en el título.

## 🏗️ Arquitectura

### Componentes Principales

1. **`useChannelVideos.js`** - Hook principal que:
   - Obtiene el playlist de uploads de cada canal
   - Descarga todos los videos con paginación
   - Obtiene duración y metadatos detallados
   - Clasifica automáticamente según las reglas

2. **`SimpleVideoTest.jsx`** - Componente de prueba que muestra:
   - Estadísticas generales por canal y categoría
   - Vista previa de videos por categoría
   - Reglas de clasificación

3. **`AutoCategory.jsx`** - Página principal accesible desde `/auto-category`

## 📊 Reglas de Categorización

### Orden de Prioridad: Eventos > Lives > Cursos > Live Coding > Charlas > Noticias

1. **🎪 Eventos**
   - Videos de más de 3 horas

2. **🔴 Lives** 
   - Videos de 1-3 horas (excepto si ya son eventos)

3. **📚 Cursos**
   - Keywords: "curso", "cursos", "aprende", "bootcamp", "aprendiendo", "introducción", "crea", "test", "portafolio", "portafolios", "web", "maneja"
   - Videos de 1-2 horas de duración
   - Subcategoría: "Cursos Nuevos" para videos de los últimos 3 meses

4. **💻 Live Coding**
   - Keywords: "desarrollando", "desarrollom", "creando", "resuelvo", "arreglando", "velada", "html", "css", "js", "tailwind", "react", "probando", "javascript", "astro", "prueba", "clon", "sql", "chat"

5. **🎤 Charlas**
   - Keywords: "charla", "charlando", "cómo ser", "historia", "entrevista", "aprender programación", "nos cuenta", "secretos", "commit show", "charlas dev", "escalando webs"

6. **📰 Noticias**
   - Videos de menos de 30 minutos

## 🛠️ Configuración

### 1. API Key de YouTube

```bash
# En tu archivo .env
VITE_API_KEY_YTUBE_NEW=tu_api_key_aqui
```

### 2. IDs de Canal

Necesitas obtener los IDs reales de los canales:

```bash
# En tu archivo .env
VITE_MIDULIVE_CHANNEL_ID=UC...
VITE_MIDUDEV_CHANNEL_ID=UC...
```

### Cómo obtener los Channel IDs:

#### Opción A: Script en el navegador
1. Ve a `https://www.youtube.com/@midulive`
2. Abre DevTools (F12) → Console
3. Pega el código de `scripts/getChannelIds.js`
4. Repite para `@midudev`

#### Opción B: YouTube Data API
```
GET https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=midulive&key=TU_API_KEY
```

#### Opción C: Manualmente
1. Ve al canal en YouTube
2. Ver código fuente (Ctrl+U)
3. Buscar "channelId" en el código

## 🚀 Uso

### Integración en la App

```jsx
import { useChannelVideos } from '../hooks/useChannelVideos';

function MiComponente() {
  const { categorizedVideos, loading, error } = useChannelVideos({
    autoUpdate: true,
    pollInterval: 10 * 60 * 1000 // Actualizar cada 10 minutos
  });

  // categorizedVideos tiene la estructura:
  // {
  //   eventos: { midulive: [...], midudev: [...] },
  //   lives: { midulive: [...], midudev: [...] },
  //   cursos: { midulive: [...], midudev: [...] },
  //   // ... etc
  // }
}
```

### Acceso desde la UI

- Navega a `/auto-category` en tu aplicación
- El enlace aparece en el Header como "Auto Categorías"

## 📈 Estructura de Datos

Cada video tiene esta estructura:

```javascript
{
  id: "dQw4w9WgXcQ",
  title: "Curso de React - Clase 1",
  thumbnail: "https://img.youtube.com/vi/...",
  publishedAt: "15/1/2025",
  rawPublishedAt: "2025-01-15T10:00:00Z",
  duration: 3600, // en segundos
  durationFormatted: "1:00:00",
  category: "cursos",
  channelId: "UC..."
}
```

## ⚡ Rendimiento y Cuotas

### Consumo de API
- **Channels**: 1 unidad por canal
- **PlaylistItems**: 1 unidad por página (50 videos)
- **Videos**: 1 unidad por 50 videos

**Ejemplo**: Canal con 500 videos ≈ 21 unidades de cuota

### Optimizaciones
- Cache automático para evitar llamadas repetidas
- Paginación eficiente
- Polling opcional para actualizaciones

## 🎛️ Personalización

### Modificar Reglas de Categorización

Edita la función `categorizeVideo` en `useChannelVideos.js`:

```javascript
function categorizeVideo(title = "", durationSec = 0, publishedAt = "") {
  const t = title.toLowerCase();
  
  // Agregar nuevas keywords
  const misKeywords = ["mi_nueva_keyword", "otra_palabra"];
  if (misKeywords.some(keyword => t.includes(keyword))) {
    return "mi_nueva_categoria";
  }
  
  // Modificar umbrales de duración
  if (durationSec > 2 * 3600) { // 2 horas en lugar de 3
    return "eventos";
  }
  
  // ... resto de reglas
}
```

### Agregar Nuevos Canales

```javascript
const CHANNEL_IDS = {
  midulive: "UC...",
  midudev: "UC...",
  nuevoCanal: "UC...", // Agregar aquí
};
```

## 🐛 Troubleshooting

### Error: "Canal no encontrado"
- Verifica que los Channel IDs sean correctos
- Asegúrate de que los canales sean públicos

### Error: "API key invalid"
- Verifica que `VITE_API_KEY_YTUBE_NEW` esté configurada
- Asegúrate de que tenga permisos para YouTube Data API v3

### Error: "Quota exceeded"
- Has alcanzado el límite diario de la API (10,000 unidades)
- Espera hasta el siguiente día o considera usar caching más agresivo

### Videos no se clasifican correctamente
- Revisa las palabras clave en `categorizeVideo()`
- Ajusta los umbrales de duración según tus necesidades
- Considera el orden de prioridad de las reglas

## 📝 Ejemplo de Uso Completo

```jsx
// En un componente React
function VideosCategorizados() {
  const { categorizedVideos, loading, error, lastUpdate } = useChannelVideos({
    autoUpdate: true,
    pollInterval: 5 * 60 * 1000 // 5 minutos
  });

  if (loading) return <div>Cargando videos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Videos Categorizados</h1>
      <p>Última actualización: {lastUpdate?.toLocaleString()}</p>
      
      {Object.entries(categorizedVideos).map(([categoria, canales]) => (
        <div key={categoria}>
          <h2>{categoria}</h2>
          
          <h3>@midulive ({canales.midulive?.length || 0})</h3>
          {canales.midulive?.map(video => (
            <div key={video.id}>
              <h4>{video.title}</h4>
              <p>{video.durationFormatted} • {video.publishedAt}</p>
            </div>
          ))}
          
          <h3>@midudev ({canales.midudev?.length || 0})</h3>
          {canales.midudev?.map(video => (
            <div key={video.id}>
              <h4>{video.title}</h4>
              <p>{video.durationFormatted} • {video.publishedAt}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## 🎯 Próximos Pasos

1. **Configurar tu .env** con API key y Channel IDs reales
2. **Probar la funcionalidad** navegando a `/auto-category`
3. **Personalizar las reglas** según tus necesidades específicas
4. **Integrar con el reproductor** para navegación directa a videos
5. **Considerar persistencia** (localStorage o base de datos) para mejor rendimiento
