# Maison Adriano — GitHub Pages web

Hotový statický web pripravený na nahratie na GitHub Pages.

## Obsah projektu

- `index.html` — hlavná stránka
- `styles.css` — kompletné štýly
- `script.js` — mobilné menu + scroll reveal animácie
- `assets/hero-person.webp` — vyrezaná/cropnutá hero fotka zo zaslaného vizuálu
- `assets/favicon.svg` — jednoduchá favicon

## Dôležité úpravy pred publikáciou

### 1. Kontaktný formulár
Web beží na GitHub Pages, čiže je statický.
Formulár preto potrebuje externú službu.
V `index.html` je teraz placeholder:

```html
<form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
```

Možnosti:
- Formspree
- Basin
- Getform
- Netlify Forms (ak by web neskôr nebol na GitHub Pages)

Stačí nahradiť `your-form-id` za reálny endpoint.

### 2. Texty a brand
Odporúčam skontrolovať a prípadne zmeniť:
- názov značky `Maison Adriano`
- všetky claimy / texty služieb
- prípadné výsledky / referencie
- kontaktný e-mail alebo IG link, ak ho budeš chcieť doplniť

### 3. Hero foto
Aktuálne je tam použitý crop z poslaného vizuálu. Ak budeš mať originálnu profi fotku kamoša, vymeň:
- `assets/hero-person.webp`
- prípadne `assets/hero-person.png`

## Ako to nahrať na GitHub Pages

### Varianta A — cez web rozhranie GitHubu

1. Prihlás sa na GitHub.
2. Klikni **New repository**.
3. Názov napr. `maison-adriano-site`.
4. Repo môže byť public.
5. Vytvor repository.
6. Nahraj všetky súbory z tohto priečinka do rootu repozitára.
7. Choď do **Settings** → **Pages**.
8. V časti **Build and deployment** nastav:
   - **Source** = `Deploy from a branch`
   - **Branch** = `main`
   - **Folder** = `/ (root)`
9. Ulož.
10. Po chvíli GitHub vypíše live URL, napr.:
    `https://tvoje-meno.github.io/maison-adriano-site/`

### Varianta B — cez git lokálne

```bash
cd maison-adriano-site
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/TVOJ-UCET/maison-adriano-site.git
git push -u origin main
```

Potom rovnako:
- GitHub → **Settings** → **Pages**
- deploy z branch `main` a folder `/ (root)`

## Vlastná doména
Ak bude mať vlastnú doménu, v GitHub Pages sa dá doplniť v sekcii **Custom domain**.
Potom bude treba nastaviť DNS u registrátora.

## Poznámka
Toto je statický one-page web.
Ak budeš chcieť neskôr pridať:
- blog,
- CMS,
- viac podstránok,
- viac jazykov,
- pokročilý formulár,
- analytics,
- pixel,
- cookie lištu,

...tak sa to dá doplniť, ale na štart je toto úplne v pohode.
