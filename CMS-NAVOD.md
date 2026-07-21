# Maison Adriano · Pages CMS

CMS upravuje iba obsah v `_data/` a obrázky v `assets/`. Dizajn, CSS, JavaScript, analytika, formuláre, SEO technika a právne stránky klient v administrácii neuvidí.

## Prvé pripojenie

1. Otvor `https://app.pagescms.org`.
2. Prihlás sa cez GitHub účet, ktorý má prístup k repozitáru.
3. Nainštaluj aplikáciu Pages CMS iba pre repozitár Maison Adriano.
4. Otvor repozitár a vetvu `main`.
5. CMS automaticky načíta konfiguráciu `.pages.yml`.

## Ako je administrácia usporiadaná

V ľavom menu sú iba dve hlavné oblasti:

- **Texty podľa jazyka** → Slovenčina / Čeština / English
- **Fotografie, logá a odkazy**

Každý jazyk je rozdelený podľa reálnych sekcií webu: Hero, Brand code, Služby, O agentúre, Proces, Klienti, VIP, Záver, Pätička a Kontaktné okno. Klient teda neotvára jeden nekonečný formulár a nehľadá, čo je `hero_title_thing_final_v2`. Otvorí napríklad **Slovenčina → 03 · Služby** a vidí iba obsah tejto sekcie.

## Čo sa dá upravovať

- slovenské, české a anglické marketingové texty,
- hlavná hero fotografia,
- fotografia v sekcii O agentúre,
- fotografia v sekcii VIP klienti,
- logo agentúry,
- pozadia šiestich služieb,
- klientské logá, ich názvy a odkazy,
- odkazy exkluzívnych projektov.

Počet služieb, princípov, krokov, projektov a klientských log je zamknutý. Interné identifikátory sú skryté alebo iba na čítanie. Tým sa chráni responzivita, animácie a rozloženie stránky.

## Bezpečný pracovný postup

1. Otvor konkrétny jazyk a sekciu.
2. Zmeň iba potrebné pole.
3. Pred uložením ešte raz skontroluj dĺžku nadpisu a odseku.
4. Klikni na uloženie. Pages CMS vytvorí commit v GitHube.
5. GitHub Pages stránku automaticky znovu zostaví a zmenu zverejní. Bežne to trvá približne jednu až niekoľko minút.
6. Po väčšej zmene skontroluj desktop aj mobil.

## Dôležité

- Obrázky nahrávaj ideálne ako WebP alebo optimalizované JPG/PNG.
- Hero fotografia má byť na šírku. Fotografie O agentúre a VIP klientov majú fungovať najmä vo vertikálnom výreze.
- Textové polia zámerne neumožňujú HTML. Klient tak nemôže poškodiť štruktúru webu.
- Ak treba zmeniť dizajn, počet sekcií, formulár, SEO, cookies alebo analytiku, robí sa to mimo CMS v zdrojovom kóde.
