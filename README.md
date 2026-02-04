# CV Interactif

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

CV en ligne interactif avec support d'impression PDF, thème clair/sombre et animations fluides.

**[Voir le CV](https://cv.nathan-ferre.fr)**

---

## Fonctionnalités

- **Thème clair/sombre** : Bascule entre les modes ou suit les préférences système
- **Export PDF** : Styles d'impression optimisés pour l'export en PDF
- **Responsive** : Adapté à tous les formats d'écran
- **Animations** : Transitions fluides avec Framer Motion
- **Personnalisable** : Données centralisées dans un fichier unique

---

## Installation

### Prérequis

- Node.js 18+ ou Bun

### Démarrage

```bash
# Cloner le dépôt
git clone https://github.com/zoom26042604/cv.git
cd cv

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le CV sera accessible sur [http://localhost:3000](http://localhost:3000)

---

## Stack technique

| Technologie | Rôle |
|-------------|------|
| [Next.js 16](https://nextjs.org/) | Framework React avec App Router |
| [TypeScript](https://www.typescriptlang.org/) | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | Framework CSS |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icônes |

---

## Structure

```
cv/
├── app/
│   ├── globals.css      # Styles globaux
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Page du CV
├── components/
│   ├── Education.tsx    # Section formation
│   ├── Experience.tsx   # Section expériences
│   ├── Header.tsx       # En-tête avec photo
│   ├── Projects.tsx     # Section projets
│   ├── Skills.tsx       # Section compétences
│   └── Toolbar.tsx      # Barre d'outils (thème, impression)
├── data/
│   └── cv-data.ts       # Données du CV
└── public/
    └── manifest.json    # PWA manifest
```

---

## Personnalisation

Modifier le fichier `data/cv-data.ts` pour personnaliser le contenu :

| Section | Description |
|---------|-------------|
| `personalInfo` | Nom, titre, contact, résumé |
| `experience` | Historique professionnel |
| `education` | Formation et diplômes |
| `projects` | Projets personnels |
| `skills` | Compétences techniques |
| `languages` | Langues parlées |
| `interests` | Centres d'intérêt |

---

## Export PDF

1. Cliquer sur le bouton d'impression dans la barre d'outils
2. Sélectionner "Enregistrer au format PDF" comme destination
3. Le CV sera exporté avec les styles d'impression optimisés

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Serveur de production |
| `npm run lint` | Vérification ESLint |

---

## Licence

MIT License

---

## Auteur

**Nathan FERRE**

- Site : [nathan-ferre.fr](https://nathan-ferre.fr)
- GitHub : [@zoom26042604](https://github.com/zoom26042604)
- Email : nathanferre06@gmail.com
