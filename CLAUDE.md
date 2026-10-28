# Portafolio — Amelia Duclos

Portafolio personal de Amelia Duclos, desarrolladora fullstack y de videojuegos que busca trabajo freelance (apps, juegos y sitios web). Sitio en español. Se despliega en Vercel desde GitHub.

## Reglas de trabajo (obligatorias)

- **NUNCA ejecutes `git commit`, `git push`, `git add` ni ningún comando que modifique el historial de git.** Amelia hace todos los commits ella misma.
- Al terminar cada tarea: resume qué archivos cambiaste y **sugiere un mensaje de commit** (en español, estilo convencional: `feat: ...`, `fix: ...`, `style: ...`). No lo ejecutes.
- Trabaja en pasos pequeños y verificables. Antes de cambios grandes, propone un plan y espera aprobación.
- Si una decisión de diseño no está definida aquí, propón 2–3 opciones y deja que Amelia elija.

## Stack

- **Astro** (sitio estático) con **content collections en MDX** para los casos de estudio (`src/content/proyectos/*.mdx`).
- **Bootstrap 5** (vía npm, personalizado con Sass: sobrescribe las variables de color, tipografía y bordes en `src/styles/_variables.scss`). **No usar Tailwind.**
- **GSAP + ScrollTrigger** para animaciones.
- Componentes en `src/components/`, layouts en `src/layouts/`, imágenes de proyectos en `src/assets/proyectos/<slug>/` usando el componente `<Image>` de Astro.
- Sin dependencias innecesarias: pregunta antes de instalar algo que no esté en esta lista.

## Dirección visual

**Personalidad: Bold, Fun, Different.** Debe sentirse como el sitio de alguien que diseña Y programa juegos, no como una plantilla.

- **Dirección elegida: "Pantalla de título"** — el sitio se siente como el menú de un videojuego: barra HUD, cursor de selección ▶, marquesina, bloques de color planos.
- **Paleta "Invertida"** (lavanda, violeta oscuro, lima). Colores planos, regla 60-30-10. Tokens CSS/Sass:
  - `--fondo` `#ECE7FF` — fondo general
  - `--tinta` `#1C1433` — texto, HUD, bordes
  - `--lavanda` `#9C88FF` — marquesina, bloques secundarios (texto encima: `--tinta`)
  - `--lima` `#C4F042` — acento: selección, texto del HUD sobre `--tinta` (texto encima: `--tinta`)
  - `--lavanda-suave` `#D9D1FF` — tarjetas, superficies
  - Verifica contraste AA en todo texto.
- **PROHIBIDO usar gradientes** (ni en fondos, ni en textos, ni en botones, ni en sombras decorativas).
- **Tipografía:** **Unbounded** 800 (display, títulos) + **Manrope** (texto), con la API de fuentes de Astro (`fonts` en `astro.config.mjs`, proveedor Google): se descargan al compilar y se sirven desde el propio sitio. No enlazar el CSS de Google Fonts.
- **Hero:** grande, a pantalla completa, **NO centrado** — barra HUD arriba ("NIVEL: freelance · ♥♥♥ · XP"), nombre gigante a la izquierda, menú de juego con cursor ▶ a la derecha (Ver proyectos / Trabajemos juntos / Sobre mí), marquesina inclinada abajo.
- **Logo:** usa un placeholder (ej. monograma "AD" en un componente `Logo.astro`) fácil de reemplazar después.
- **Proyectos en el inicio:** carrusel (no grid).
- **Animaciones protagonistas:** entradas al hacer scroll, transiciones entre páginas (View Transitions de Astro), hover expresivos, movimiento con carácter. Siempre respetar `prefers-reduced-motion` (versión sin movimiento).
- **Detalles interactivos pequeños** repartidos por el sitio (micro-interacciones, cursor personalizado, algún easter egg lúdico). Propón ideas.
- **Casos de estudio visuales con poco texto:** imágenes grandes, bloques cortos, datos clave destacados, nada de párrafos largos.
- Responsive desde 360px. Accesible: HTML semántico, foco visible, navegación con teclado, `alt` en imágenes.

## Estructura del sitio

1. **Inicio:** hero → carrusel de proyectos → servicios → herramientas → contacto (CTA).
2. **Caso de estudio** (plantilla `/proyectos/[slug]`): portada, metadatos (rol, duración, herramientas, tipo), problema, proceso, solución, aprendizajes, link al proyecto, navegación al siguiente proyecto.
3. **Sobre mí:** texto + espacio para foto (placeholder) + herramientas.
4. Footer con contacto.

## Contenido

### Hero
- Nombre: **Amelia Duclos**
- Rol: **Desarrolladora fullstack y de videojuegos**
- Frase: *Diseño y construyo apps, juegos y sitios web, desde la primera idea en Figma hasta el código publicado.*
- Botones: **Ver proyectos** · **Trabajemos juntos**

### Sobre mí
Soy Amelia, desarrolladora fullstack y de videojuegos, con formación en Diseño en Medios Interactivos en la USFQ.

Lo que me diferencia es que no tengo que elegir entre diseñar y programar. Entiendo a quién va dirigido un producto, diseño su experiencia y lo construyo yo misma. Así nada se pierde entre el diseño y el código, y el resultado se ve y funciona como se pensó.

He creado tiendas online desde cero, APIs, apps de escritorio y juegos, tanto digitales como de mesa. Disfruto especialmente los proyectos donde la interacción es protagonista: cuando algo se siente bien al usarlo, no solo al verlo.

Soy autodidacta por naturaleza: cada proyecto es una excusa para aprender algo nuevo. Estudio becada por excelencia en la USFQ, me gusta liderar equipos y, además de programar, ilustro tanto en digital como a mano. Mi meta es crear mis propios videojuegos de forma independiente, uniendo diseño, código, ilustración y lo que ya conozco de la industria.
*[PLACEHOLDER: foto]*

### Servicios
- **Sitios web y tiendas online**: diseño a medida, hechos desde cero y listos para publicar.
- **Apps web**: desde la experiencia de usuario hasta el frontend y el backend.
- **Videojuegos y experiencias interactivas**: prototipos, juegos completos y piezas lúdicas.
- **Diseño UX/UI**: para equipos que ya tienen desarrolladores y necesitan el diseño.

### Herramientas
- Diseño: Figma, Photoshop, Illustrator, After Effects
- Frontend: HTML, CSS, JavaScript, TypeScript
- Backend: Node.js, Express
- Videojuegos: C#, Unity
- Flujo de trabajo: Git

### Proyectos (casos de estudio)
Contenido de texto pendiente: usar placeholders breves hasta que Amelia lo escriba.
1. **We Are Not So Different** — slug `we-are-not-so-different`
2. **Pawnee** — slug `pawnee`
3. **EarlyBird** — slug `earlybird` — app móvil para encontrar el primer empleo deslizando ofertas (estilo apps de citas). Demo: https://amduho2005-cell.github.io/amduho2005-github.io/

### Contacto
Pendiente (email, LinkedIn, GitHub, etc.). Usar placeholders.
