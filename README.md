# Maison Adriano Agency — V7 VIP Sections

Hotový statický viacjazyčný web pripravený na GitHub Pages.

## Zachované bez prekopania

- Netflix-style brand intro
- hero sekcia
- originálna hero fotografia
- logo a jazykový systém
- automatická detekcia CZ / SK / EN
- mobilné full-screen menu
- responzívny kontaktný modal

## Prepracované sekcie pod hero

- Brand manifesto s animovaným pásom služieb
- Services v tmavom editorial / luxury layoute
- About s výrazným rozdelením plochy a watermarkom loga
- Process s animovanou časovou osou
- Clients & case studies s vizuálnymi editorial panelmi
- Testimonials v samostatnej tmavej kapitole
- Contact ako výrazná finálna CTA kapitola, formulár zostáva v modale

## Animácie

- staggerované reveal animácie
- metalické floating orbs
- animovaný marquee pás
- kreslená process línia
- svetelný hover a glint na kartách služieb
- rotujúce abstraktné case-study vizuály
- jemný parallax
- rešpektovanie `prefers-reduced-motion`

## Štruktúra

```text
index.html          automatický jazykový redirect
/cs/index.html      česká verzia
/sk/index.html      slovenská verzia
/en/index.html      anglická verzia
assets/
styles.css
script.js
404.html
.nojekyll
```

## Nasadenie na GitHub Pages

1. Rozbaľ `maison-adriano-v7-vip-sections-root.zip`.
2. Nahraj celý obsah priamo do rootu GitHub repozitára.
3. GitHub → Settings → Pages.
4. Source: `Deploy from a branch`.
5. Branch: `main`, folder: `/ (root)`.

## Kontaktný formulár

Formulár stále obsahuje Formspree placeholder:

```html
https://formspree.io/f/your-form-id
```

Po vytvorení formulára nahraď endpoint v:

- `cs/index.html`
- `sk/index.html`
- `en/index.html`
