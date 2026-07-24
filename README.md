# Raíz — Recetario Real

Landing page de venta para el e-book **"26 recetas deliciosas para perder peso sin pasar hambre"**.

Rediseño completo (identidad visual, copy y estructura) de la landing original hecha en Lovable, ahora como sitio estático liviano — sin frameworks, sin build step — listo para publicarse en GitHub Pages, Netlify, Vercel o cualquier hosting estático.

## Stack

- HTML5 + CSS3 (custom properties, grid/flexbox) + JavaScript vanilla
- Tipografías: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display), [Work Sans](https://fonts.google.com/specimen/Work+Sans) (texto), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (datos/macros)
- Sin dependencias de build — se puede editar y publicar directamente

## Estructura

```
├── index.html          # Página completa (nav, hero, secciones, footer)
├── css/
│   └── style.css        # Sistema de diseño: tokens, componentes, responsive
├── js/
│   └── script.js         # Countdown de oferta + render de tarjetas de recetas + acordeón FAQ
└── assets/               # Recursos estáticos (PDF del recetario, etc.)
```

## Identidad visual

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#FBF2E3` | Fondo base |
| `--terracotta` | `#C1552C` | Acento principal / CTAs |
| `--olive` | `#6B7A4F` | Acento secundario |
| `--mustard` | `#E3A857` | Detalles cálidos |
| `--espresso` | `#3A2A1E` | Texto principal |

Elemento de marca: tarjetas de receta estilo "fichero de cocina", con un sello circular que muestra las macros (kcal / proteína) de cada receta.

## Cómo publicar en GitHub Pages

1. Ve a **Settings → Pages** en este repositorio.
2. En "Source", selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda. El sitio quedará disponible en `https://<usuario>.github.io/<repositorio>/`.

## Cómo editar

- **Textos y estructura:** `index.html`
- **Colores, tipografía, espaciados:** `css/style.css` (todo parte de las variables en `:root`)
- **Recetas destacadas / countdown:** `js/script.js`

## Conectar el botón de pago

Los botones con clase `.btn--primary` dentro de `#comprar` actualmente apuntan a `#`. Reemplaza el `href` por tu enlace de checkout (Stripe, Hotmart, Gumroad, PayPal, etc.) en `index.html`.
