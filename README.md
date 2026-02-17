🎵 RollingMusic

Deja que la música ruede. Tú solo dale play.

Una plataforma de streaming de música tipo Spotify construida con React + Vite, diseñada como proyecto integrador de RollingCode School.

📸 Vista previa
<!-- Reemplazá estas líneas con capturas de pantalla reales del proyecto -->

Agregá acá screenshots o un GIF del proyecto funcionando.


✨ Características

🎧 Reproductor de música con WaveSurfer.js — visualización de ondas, play/pause, avance/retroceso y control de volumen
🔍 Búsqueda en tiempo real de canciones, artistas y álbumes
🏠 Catálogo por secciones — Recomendadas, Lo más escuchado, Nuevos lanzamientos y Top Global
🔐 Autenticación completa con Firebase — login por email/password y Google OAuth
📋 Playlists con portada y listado de artistas
📱 Diseño responsive — adaptado para mobile, tablet y desktop con menú hamburguesa
🌙 Tema oscuro con paleta en tonos púrpura/fuchsia


🛠️ Tecnologías utilizadas
TecnologíaUsoReact 18Framework principal de UIViteBundler y servidor de desarrolloReact Router DOMNavegación y rutasTailwind CSS v4Estilos y diseño responsivoWaveSurfer.jsVisualización de audio y reproductorFirebaseAutenticación y base de datosFontAwesomeÍconosZodValidación de formulariosDeezer APIDatos de canciones y previews

🗂️ Estructura del proyecto
src/
├── assets/
│   └── imagenes/
│       └── logos/
├── components/
│   ├── Aside.jsx
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── Player.jsx
│   ├── SearchBar.jsx
│   ├── SideMenuCard.jsx
│   └── SideMenuItem.jsx
├── context/
│   ├── AuthContext.jsx       # Autenticación (Firebase)
│   └── SongsContext.jsx      # Estado global de canciones y reproducción
├── icons/
│   └── icon.jsx
├── pages/
│   ├── Home.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── SearchResults.jsx
│   └── PlaylistPage.jsx
├── routes/
│   └── AppRouter.jsx
├── services/
│   └── musicApi.js           # Integración con Deezer API
├── utils/
│   └── validation.js         # Schemas de Zod
├── App.css
├── App.jsx
├── index.css
└── main.jsx

🚀 Instalación y uso
Prerequisitos

Node.js >= 18
npm o yarn
Cuenta de Firebase (para autenticación)

1. Clonar el repositorio
bashgit clone https://github.com/tu-usuario/rollingmusic.git
cd rollingmusic
2. Instalar dependencias
bashnpm install
3. Configurar variables de entorno
Creá un archivo .env en la raíz del proyecto con tus credenciales de Firebase:
envVITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id

⚠️ Nunca subas tu archivo .env al repositorio. Está incluido en .gitignore.

4. Ejecutar en modo desarrollo
bashnpm run dev
La app estará disponible en http://localhost:5173
5. Build para producción
bashnpm run build

🏗️ Layout de la aplicación
La app usa un grid CSS de dos columnas en desktop y una columna en mobile:
┌─────────────────────────────────┐
│           Navbar                │  ← Header con logo, búsqueda y usuario
├──────────┬──────────────────────┤
│          │                      │
│  Aside   │        Main          │  ← Aside oculto en mobile
│  (menu)  │   (contenido)        │
│          │                      │
├─────────────────────────────────┤
│           Player                │  ← Reproductor fijo al fondo
└─────────────────────────────────┘

🔑 Autenticación
El sistema de autenticación soporta dos métodos:

Email y contraseña — con validación via Zod
Google OAuth — login con un click via Firebase

La sesión se gestiona globalmente mediante AuthContext, disponible en toda la app.

🎯 Funcionalidades del reproductor
El reproductor usa WaveSurfer.js e incluye:

Visualización de forma de onda en tiempo real
Play / Pause
Retroceder y avanzar 5 segundos
Control de volumen con slider
Portada, título y artista de la canción activa
Compatibilidad con canciones del CRUD local y previews de la API de Deezer


🌐 API de música
Las secciones del catálogo consumen una API de música externa. Las funciones disponibles en musicApi.js son:
FunciónDescripcióngetTopTracks()Canciones recomendadasgetMostListened()Lo más escuchadogetNewReleases()Nuevos lanzamientosgetGlobalTop()Top global

📱 Responsive Design
BreakpointComportamiento< 768px (mobile)Aside oculto, menú hamburguesa, layout de 1 columna≥ 768px (tablet/desktop)Aside visible, layout de 2 columnas

👥 Equipo
Proyecto desarrollado en equipo como trabajo final integrador en RollingCode School.
<!-- Agregá los nombres y links de GitHub de cada integrante -->

@juanmd14
@marcosvalla28
@FrancoDevBJ
@MomsDeLaSelva
@teseira-lucas


📄 Licencia
Este proyecto fue desarrollado con fines educativos. Todos los derechos reservados © 2025 RollingCode.