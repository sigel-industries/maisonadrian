# Maison Adriano — Hero + cinematic intro V3

Statický one-page web pripravený na GitHub Pages. Táto verzia zachováva pôvodné sekcie projektu, ale mení úvod webu a hero:

- čierny filmový intro screen,
- zlatý monogram `M`,
- postupné zobrazenie `Maison Adriano Agency`,
- rozdelenie čiernej obrazovky a odhalenie webu,
- full-width hero s originálnou fotografiou,
- responzívny desktop / tablet / mobil,
- mobilné menu,
- spodný čierny value bar.

## Hero fotografia

Súčasť ZIPu sú oba súbory:

- `assets/hero-original.jpg` — presný originál dodaný používateľom,
- `assets/hero-original.webp` — optimalizovaná verzia používaná webom.

## Úprava intro animácie

Dĺžku intro sekvencie riadi:

```js
const introDuration = 4350;
```

v `script.js`. Časy jednotlivých krokov sú v poslednom bloku `styles.css` pri selektoroch `.brand-intro` a `.intro-*`.

Používateľom s nastavením `prefers-reduced-motion` sa intro preskočí automaticky.

## Kontaktný formulár

Formulár stále obsahuje placeholder Formspree endpoint:

```html
https://formspree.io/f/your-form-id
```

Pred ostrým spustením ho treba nahradiť reálnym endpointom.

## GitHub Pages

1. Vytvor nový GitHub repository.
2. Nahraj obsah tohto priečinka priamo do rootu repozitára.
3. Otvor `Settings` → `Pages`.
4. Nastav `Deploy from a branch`.
5. Vyber branch `main` a folder `/ (root)`.
6. Ulož.

Súbor `.nojekyll` už je priložený.
