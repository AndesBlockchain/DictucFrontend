# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Gatsby-based frontend for DICTUC (a testing and certification services company), built with React, Tailwind CSS, and powered by a headless Strapi CMS backend. The site features dynamic page generation, a custom block-based content system, and service management capabilities.

## Development Commands

```bash
# Start development server (runs on http://localhost:8000 by default)
npm run develop
# or
npm start

# Build for production
npm run build

# Serve production build locally
npm run serve

# Clean Gatsby cache (use when experiencing build issues or stale data)
npm run clean
```

## Environment Configuration

The project uses environment-specific `.env` files:
- `.env.development` - Local development (connects to local Strapi at `http://127.0.0.1:1337`)
- `.env.production` - Production deployment

Required environment variables:
- `STRAPI_API_URL` - Strapi backend URL
- `STRAPI_TOKEN` - Strapi API authentication token
- `SITE_URL` - Full site URL for sitemap generation

## Architecture Overview

### Content Management via Strapi

The site uses `gatsby-source-strapi` to pull content from a headless CMS. All content types are configured in `gatsby-config.js`:

**Collection Types:**
- `servicio` - Services offered by DICTUC
- `sector` - Business sectors/industries
- `tipo-de-servicio` - Service categories
- `noticia` - News articles
- `pagina` - Dynamic pages with block-based content
- `carrusel` - Homepage carousel slides
- `menu-superior`, `menu-footer`, `menu-secundario` - Navigation menus
- `alerta-modal` - Homepage alerts/modals with date-based visibility

**Single Types:**
- `agente` - Chatbot/agent configuration

### Dynamic Page Generation

Gatsby creates pages dynamically using file-based routing with Strapi slugs:

- `src/pages/servicios/{strapiServicio.slug}.js` - Individual service pages
- `src/pages/sectores-pais/{strapiSector.slug}.js` - Sector-specific pages with filtered services
- `src/pages/noticias/{strapiNoticia.slug}.js` - News article pages
- `src/pages/tipos-de-servicio/{strapiTipoDeServicio.slug}.js` - Service type pages
- `src/pages/nosotros/{strapiPagina.slug}.js` - "About us" section pages
- `src/pages/paginas/{strapiPagina.slug}.js` - Generic dynamic pages

### Block-Based Content System

Dynamic pages (`pagina` content type) use a flexible block system where content is composed of different block types. The `renderBloque` helper (`src/helpers/bloque-renderer.js`) maps Strapi component types to React components:

**Available Block Types:**
- `BloqueHero` - Hero sections with images/CTAs
- `BloqueTexto` - Rich text content blocks
- `BloqueTarjetas` - Card grids
- `BloqueTabs` / `BloqueAcordeon` - Tabbed or accordion content (same component, different display mode)
- `BloqueGaleria` - Image galleries
- `BloqueNoticias` - News listings
- `BloquePersonas` - Team/people profiles
- `BloqueDocumentos` - Document downloads
- `BloqueEfemerides` - Timeline/calendar events
- `BloqueTiposServicio` - Service type listings
- `BloqueSectoresPais` - Sector listings

Each block component receives `datosBloque` prop with the Strapi data.

### Data Fetching Pattern

The codebase uses **custom GraphQL hooks** (in `src/hooks/`) for all Strapi data queries:

- `use-servicios.js` - All services
- `use-servicio.js` - Single service by slug
- `use-sectores-pais.js` - All sectors
- `use-noticias.js` - All news articles
- `use-noticia.js` - Single news article
- `use-home-noticias.js` - Featured news for homepage
- `use-pagina.js` / `use-paginas.js` - Dynamic pages with full block population
- `use-menu-secundario.js` - Secondary navigation
- `use-modals.js` - Alert modals
- `use-agente-config.js` - Chatbot configuration

**Important:** When adding new data requirements, follow this pattern by creating new hooks that export GraphQL queries using `useStaticQuery`.

### Component Structure

**Layout Components:**
- `PaginaInterior` - Standard interior page wrapper with header, footer, banner, and breadcrumbs
- `BarraSuperior` - Top navigation bar
- `Footer` / `FooterSuperior` - Site footers
- `MenuSecundario` - Secondary sidebar navigation for subsections

**Feature Components:**
- `Carrusel` - Homepage hero carousel
- `FiltroServicios` - Service filtering UI (by type, sector, search)
- `CardServicio` / `CardNoticia` - Service and news cards
- `Agente` / `ModalAgente` - Chatbot interface
- `ModalAlerta` - Homepage alert modal with date-based visibility
- `ScrollSpy` - Table of contents navigation for long pages

### Styling System

The project uses **Tailwind CSS 4** with **DaisyUI** components. Custom theme colors are defined in `src/styles/global.css`:

**Brand Colors:**
- `azul-dictuc` - Primary brand blue (#307fe2)
- `gris-dictuc` - Brand gray (#53565A)

**Sustainability Colors (SDG-related):**
- `rojo-sostenibilidad` - #F3523E
- `amarillo-sostenibilidad` - #f2b50a
- `verde-sostenibilidad` - #02ac4e
- `azul-sostenibilidad` - #0099d9
- `fucsia-sostenibilidad` - #f02976

These colors are safelisted in `tailwind.config.js` to prevent purging and include opacity variants (e.g., `bg-azul-dictuc/50`).

**Font:** The project uses Montserrat (loaded via gatsby-omni-font-loader).

## Key Development Patterns

### Adding a New Block Type

1. Create component in `src/components/bloquesPaginas/`
2. Add case to switch statement in `src/helpers/bloque-renderer.js`
3. Component receives `datosBloque` prop with all Strapi fields

### Adding a New Dynamic Page Route

1. Create template in `src/pages/{collection}/{strapiContentType.slug}.js`
2. Use GraphQL `pageContext` for slug matching
3. Wrap content in `PaginaInterior` component for consistent layout

### Filtering Services

Service filtering logic (by sector, type, search) is implemented in components like `FiltroServicios` and pages like `sectores-pais/{strapiSector.slug}.js`. The pattern:
1. Maintain filter state (sector, service type, search text)
2. Filter `useServicios()` data based on state
3. Update `serviciosVisibles` when filters change

### Date-Based Modal Visibility

The homepage modal system (`ModalAlerta`) filters modals based on `Publicacion.fechaDesde` and `fechaHasta` dates, showing only currently active alerts.

## GraphQL Considerations

- When querying Strapi data, be aware of nested `populate` requirements
- The `gatsby-source-strapi` config includes specific `populate` logic for the `pagina` type to fetch deeply nested block data
- Image fields may have both `url` (direct Strapi URL) and `localFile.childImageSharp.gatsbyImageData` (optimized Gatsby image)

## Monitoring

The project uses Sentry for error tracking (configured in `gatsby-config.js`). Sentry is only enabled in production/staging environments.

## Common Gotchas

- After changing Strapi content structure, run `npm run clean` to clear Gatsby cache
- Dynamic color classes from Strapi must be safelisted in Tailwind config to prevent purging
- The project uses both `Banner.url` and `Banner.localFile.childImageSharp.gatsbyImageData` - check for both in components
- GraphQL queries in hooks use `useStaticQuery`, which runs at build time - dynamic runtime queries need a different approach
