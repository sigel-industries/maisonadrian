# Maison Adriano Agency — multilingual V6

Projekt pripravený na priame nasadenie na GitHub Pages.

## Hotové

- zachovaný Netflix-style úvod
- zachované hero a existujúce sekcie
- automatická detekcia jazyka:
  - český prehliadač → `/cs/`
  - slovenský prehliadač → `/sk/`
  - ostatné jazyky → `/en/`
- prepínanie CZ / SK / EN bez opätovného prehrania intro animácie
- nové samostatné mobilné menu:
  - plná nepriehľadná obrazovka
  - nepresvitá obsah webu
  - funguje otvorenie, zatvorenie, Escape aj focus trap
  - responzívne aj pri nižších displejoch
- kontaktný formulár presunutý do modalu
- modal sa otvorí z:
  - hlavného CTA v hero
  - položky Kontakt v desktop menu
  - položky Kontakt v mobilnom menu
  - spodného kontaktného CTA
  - odkazu Kontakt vo footeri
- formulár je lokalizovaný osobitne pre CZ, SK a EN
- formulár a menu blokujú scrollovanie pozadia a sú prístupné klávesnicou

## Štruktúra

```text
index.html
404.html
styles.css
script.js
assets/
cs/index.html
sk/index.html
en/index.html
.nojekyll
```

## Formulár

Formulár má zatiaľ testovací Formspree placeholder:

```html
https://formspree.io/f/your-form-id
```

Po vytvorení Formspree formulára nahraď `your-form-id` vo všetkých troch jazykových súboroch:

- `cs/index.html`
- `sk/index.html`
- `en/index.html`

## Nasadenie na GitHub Pages

1. Rozbaľ ZIP s označením `root`.
2. Nahraj všetok obsah priamo do rootu GitHub repozitára.
3. Otvor **Settings → Pages**.
4. Nastav:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Ulož nastavenie.

Pri aktualizácii existujúceho repozitára prepíš pôvodné súbory novými.
