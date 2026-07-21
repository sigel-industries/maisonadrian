# Maison Adriano Agency — V8 Editorial House

Kompletne prepracovaná viacjazyčná statická verzia pripravená na GitHub Pages.

## Zachované

- Netflix-style brand intro
- pôvodná hero sekcia a hero fotografia
- logo, farby a základný Gucci-inspired luxury smer
- automatická detekcia CZ / SK / EN
- prepínanie jazyka bez opakovania intra
- mobilné full-screen menu
- responzívny kontaktný modal

## Nový web pod hero

- veľký editorial manifest značky
- tmavá sticky storytelling sekcia služieb
- butiková About kapitola s vlastným vizuálnym systémom
- champagne process kapitola s postupným scrollovaním
- tri kreatívne direction previews bez vymyslených klientov a referencií
- výrazná „Our standard“ kapitola
- samostatná finálna kontaktná CTA
- desktop, tablet a mobil navrhnuté samostatne

## Interakcie

- reveal animácie pri scrollovaní
- sticky služby s aktívnym číslom
- jemný parallax a svetelné reakcie na kurzor
- animované orbitálne prvky, marquee a pečiatka
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

Rozbaľ root ZIP a nahraj jeho obsah priamo do rootu repozitára. GitHub Pages potom používa branch `main` a folder `/ (root)`.

## Kontaktný formulár

Formulár odosiela dopyty cez FormSubmit na globálny e-mail nastavený v `_data/site.yml` (`contact.email`). Rovnaký e-mail a telefón sa dajú upraviť cez Pages CMS v sekcii **Fotografie, logá a odkazy → Globálne obrázky a logá → Kontakt a formulár**.

Pri úplne prvom testovacom odoslaní príde na cieľový e-mail aktivačná správa od FormSubmit. Odkaz v nej treba potvrdiť iba raz; ďalšie dopyty už chodia priamo.
