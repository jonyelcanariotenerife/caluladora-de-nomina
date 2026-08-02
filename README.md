# Calculadora de Nómina — Cero Absoluto

PWA de un solo archivo para repartir la nómina cada mes entre Cajasiete e ING,
extraída de "El Hilván · Gestión Patrimonial". Sin nube, sin servidor: todo se
guarda en `localStorage` del propio móvil.

## Contenido del paquete

```
calculadora-nomina/
├── index.html          ← la app entera (React + Babel + Tailwind vía CDN)
├── manifest.json        ← metadatos de instalación (nombre, iconos, colores)
├── sw.js                 ← service worker (permite abrirla sin conexión)
└── icons/
    ├── icon-72.png … icon-512.png       (iconos normales)
    └── icon-192-maskable.png, icon-512-maskable.png  (Android adaptativo)
```

## 1. Subir a GitHub Pages

1. Crea un repositorio nuevo (público o privado, da igual), por ejemplo `calculadora-nomina`.
2. Sube estos 4 elementos (`index.html`, `manifest.json`, `sw.js`, la carpeta `icons/`) a la raíz del repo.
3. Ve a **Settings → Pages**.
4. En "Build and deployment", elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
5. Guarda. En 1-2 minutos tendrás la URL, algo como:
   `https://tuusuario.github.io/calculadora-nomina/`

## 2. Instalar en el móvil (Android)

1. Abre esa URL con **Chrome**.
2. Te debería aparecer un aviso o el menú (⋮) tendrá la opción **"Instalar app"** / "Añadir a pantalla de inicio".
3. Tócalo. Se instala como una app normal, con su icono, sin barra de navegador.

## 3. Instalar en iPhone

1. Abre la URL con **Safari** (tiene que ser Safari, no Chrome).
2. Toca el icono de Compartir (el cuadrado con la flecha hacia arriba).
3. **"Añadir a pantalla de inicio"**.

## Actualizaciones

Cada vez que quieras cambiar algo en la app, solo tienes que subir el nuevo
`index.html` (o los archivos que cambien) al mismo repositorio, reemplazando
al anterior. El service worker detecta la nueva versión y la sirve en la
siguiente vez que abras la app (puede tardar un intento en refrescarse del
todo la primera vez: si ves algo desactualizado, cierra la app del todo y
vuelve a abrirla).

## Sincronización con El Hilván (PC)

- Botón **COMPARTIR** en la calculadora: genera un `.json` con la nómina actual
  y abre el panel de compartir del móvil (puedes mandarlo por Syncthing, guardarlo
  en una carpeta compartida, etc.). Si el navegador no soporta compartir archivos,
  lo descarga directamente a Descargas.
- Botón **IMPORTAR**: carga un `.json` (de esta misma app o un backup completo
  de El Hilván) y sustituye los datos actuales, pidiendo confirmación antes.
- En El Hilván, la pestaña **Distribución Nómina** tiene el botón
  **"Sincronizar Nómina (móvil)"** que lee ese mismo archivo y reemplaza el
  Total + Cajasiete + ING en el PC.
