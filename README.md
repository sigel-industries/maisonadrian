# Maison Adriano Agency — ready-to-deploy website

Statický web pripravený na GitHub Pages.

## Čo je hotové
- Netflix-style intro s novým logom
- Hero sekcia s pôvodnou fotkou + novým strieborným logom
- Desktop navigácia bez zbytočného samostatného menu buttonu
- Mobilné burger menu
- Sekcie: Services, About, How we work, Clients & case studies, Testimonials, Contact
- Responzívne rozloženie

## Dôležité súbory
- `index.html`
- `styles.css`
- `script.js`
- `assets/hero-original.jpg`
- `assets/hero-original.webp`
- `assets/brand-logo.png`
- `assets/brand-logo.webp`
- `assets/brand-logo-source.jpg`
- `assets/favicon.png`
- `.nojekyll`

## Čo ešte môžeš neskôr meniť
### 1. Formulár
V `index.html` je placeholder Formspree endpoint:

```html
<form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
```

Nahraď `your-form-id` reálnym endpointom.

### 2. Dĺžka intro animácie
V `script.js`:

```js
const introDuration = 4200;
```

Hodnota je v milisekundách.

### 3. Texty a reálne case studies
Sú tam zatiaľ pripravené premium placeholder texty. Môžu sa kedykoľvek prepísať.

## GitHub Pages deploy
### Najjednoduchšie
1. Rozbaľ `maison-adriano-agency-final-root.zip`
2. Vytvor GitHub repo
3. Nahraj všetky súbory do rootu repozitára
4. GitHub → **Settings** → **Pages**
5. Nastav:
   - Source = `Deploy from a branch`
   - Branch = `main`
   - Folder = `/ (root)`
6. Ulož

Potom GitHub vygeneruje URL.

## Poznámka
Logo je spracované z dodaného obrázka do transparentného PNG/WebP, aby dobre fungovalo v intro a hero sekcii.
