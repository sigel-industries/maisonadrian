# Maison Adriano Agency — multilingual GitHub Pages build

Hotový statický web s tromi jazykmi:

- `/cs/` — čeština
- `/sk/` — slovenčina
- `/en/` — English

Root `index.html` automaticky zistí jazyk prehliadača:

- `cs-*` → česká verzia
- `sk-*` → slovenská verzia
- všetko ostatné → anglická verzia

Ručný výber jazyka sa uloží do `localStorage`, takže pri ďalšej návšteve sa otvorí zvolená verzia.

## Zachované prvky

- Netflix-style intro
- pôvodné hero
- pôvodná hero fotografia
- nové strieborné logo
- desktopová navigácia
- mobilné menu

## Doplnené

- CZ / SK / EN mutácie
- automatická detekcia jazyka
- jazykový prepínač
- scroll progress
- animované odhaľovanie sekcií
- stagger animácie kariet
- jemný parallax dekorácií
- výraznejšie vizuálne oddelenie sekcií
- responzívna implementácia

## Formulár

Vo všetkých troch jazykových stránkach je zatiaľ placeholder:

```html
action="https://formspree.io/f/your-form-id"
```

Nahraď ho reálnym Formspree endpointom.

## Nasadenie na GitHub Pages

1. Rozbaľ ZIP.
2. Nahraj **obsah ZIPu** do rootu repozitára.
3. GitHub → Settings → Pages.
4. Source: `Deploy from a branch`.
5. Branch: `main`.
6. Folder: `/ (root)`.

Súbor `.nojekyll` už je súčasťou projektu.
