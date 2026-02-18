# 🎵 RollingMusic

> Deja que la música ruede. Tú solo dale play.

Una plataforma de streaming de música tipo Spotify construida con **React + Vite**, diseñada como proyecto integrador de RollingCode School.

Agregá acá screenshots o un GIF del proyecto funcionando.

- 🎧 **Reproductor de música** con WaveSurfer.js — visualización de ondas, play/pause, avance/retroceso y control de volumen
- 🔍 **Búsqueda en tiempo real** de canciones, artistas y álbumes
- 🏠 **Catálogo por secciones** — Recomendadas, Lo más escuchado, Nuevos lanzamientos y Top Global
- 🔐 **Autenticación completa** con Firebase — login por email/contraseña y Google OAuth
- 📋 **Playlists** con portada y listado de artistas
- 📱 **Diseño responsive** — adaptado para mobile, tablet y desktop con menú hamburguesa
- 🌙 **Tema oscuro** con paleta en tonos púrpura/fuchsia

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| React 18 | Framework principal de UI |
| Vite | Bundler y servidor de desarrollo |
| React Router DOM | Navegación y rutas |
| Tailwind CSS v4 | Estilos y diseño responsive |
| WaveSurfer.js | Visualización de audio y reproductor |
| Firebase | Autenticación y base de datos |
| FontAwesome | Íconos |
| Zod | Validación de formularios |
| Deezer API | Datos de canciones y previews |

---


### Prerequisitos

- Node.js >= 18
- npm o yarn
- Cuenta de Firebase (para autenticación)

1. Clonar el repositorio
bashgit clone https://github.com/marcosvalla28/rollingmusic.git
cd rollingmusic
1. Instalar dependencias
bashnpm install
1. Configurar variables de entorno
Creá un archivo .env en la raíz del proyecto con tus credenciales de Firebase:
envVITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> ⚠️ **Nunca subas tu archivo `.env` al repositorio.** Está incluido en `.gitignore`.

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

La app estará disponible en [http://localhost:5173](http://localhost:5173)

### 5. Build para producción

```bash
npm run build
```

---

## 🏗️ Layout de la aplicación

La app usa un grid CSS de dos columnas en desktop y una columna en mobile:

```
┌─────────────────────────────────┐
│             Navbar              │  ← Header con logo, búsqueda y usuario
├──────────┬──────────────────────┤
│          │                      │
│  Aside   │        Main          │  ← Aside oculto en mobile
│  (menu)  │    (contenido)       │
│          │                      │
├─────────────────────────────────┤
│            Player               │  ← Reproductor fijo al fondo
└─────────────────────────────────┘
```

---

## 🔑 Autenticación

El sistema de autenticación soporta dos métodos:

- **Email y contraseña** — con validación via Zod
- **Google OAuth** — login con un click via Firebase

La sesión se gestiona globalmente mediante `AuthContext`, disponible en toda la app.

---

## 🎯 Funcionalidades del reproductor

El reproductor usa WaveSurfer.js e incluye:

- Visualización de forma de onda en tiempo real
- Play / Pause
- Retroceder y avanzar 5 segundos
- Control de volumen con slider
- Portada, título y artista de la canción activa
- Compatibilidad con canciones del CRUD local y previews de la API de Deezer

---

## 🌐 API de música

Las secciones del catálogo consumen la API pública de Deezer. Las funciones disponibles en `musicApi.js` son:

| Función | Descripción |
|---|---|
| `getTopTracks()` | Canciones recomendadas |
| `getMostListened()` | Lo más escuchado |
| `getNewReleases()` | Nuevos lanzamientos |
| `getGlobalTop()` | Top global |

---

## 📱 Responsive Design

| Breakpoint | Comportamiento |
|---|---|
| < 768px (mobile) | Aside oculto, menú hamburguesa, layout de 1 columna |
| ≥ 768px (tablet/desktop) | Aside visible, layout de 2 columnas |

---

## 👥 Equipo

Proyecto desarrollado en equipo como trabajo final integrador en **RollingCode School**.

[@juanmd14](https://github.com/juanmd14) · [@marcosvalla28](https://github.com/marcosvalla28) · [@FrancoDevBJ](https://github.com/FrancoDevBJ) · [@MomsDeLaSelva](https://github.com/MomsDeLaSelva) · [@teseira-lucas](https://github.com/teseira-lucas)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos. Todos los derechos reservados © 2026 RollingCode.