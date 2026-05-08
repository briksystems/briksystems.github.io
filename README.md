# Brik Systems — Sitio Web

Sitio web oficial de Brik Systems, estudio de diseño digital con sede en Bogotá, Colombia.

## Estructura del proyecto

```
brik-systems/
├── index.html          → Página principal / Home
├── servicios.html      → Servicios ofrecidos
├── portafolio.html     → Proyectos realizados
├── precios.html        → Planes y precios
├── proceso.html        → Cómo trabajamos
├── estudio.html        → Quiénes somos
├── clientes.html       → Testimonios y clientes
├── contacto.html       → Formulario de contacto
├── css/
│   └── styles.css      → Estilos globales compartidos
├── js/
│   └── nav.js          → Navegación compartida
└── README.md
```

## Cómo editar

### Cambiar colores o tipografía
Edita únicamente `css/styles.css` — sección `/* TOKENS */` al inicio del archivo.

### Cambiar el contenido de una sección
Abre el archivo `.html` correspondiente y edita solo el HTML dentro de `<div class="page-content">`.

### Agregar un proyecto al portafolio
Abre `portafolio.html` y duplica un bloque `<article class="case">`. Reemplaza la imagen y el texto.

### Cambiar los precios
Abre `precios.html` y edita los valores dentro de cada `<div class="plan">`.

### Cambiar datos de contacto
1. Abre `css/styles.css` — no hay datos allí
2. Busca `hola@briksystems.co` en todos los archivos `.html` y reemplaza con tu email real
3. Haz lo mismo con `@briksystems` para las redes sociales

## Cómo publicar en GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/root`
4. Tu sitio estará en `https://tu-usuario.github.io/brik-systems/`

## Tecnologías

- HTML5 semántico
- CSS3 puro (sin frameworks)
- JavaScript vanilla mínimo
- Google Fonts: Barlow Condensed, Barlow, JetBrains Mono
