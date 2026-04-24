# 📋 CV Variants - Documentation

## Architecture

Le projet utilise un système de **variants** pour créer plusieurs versions du CV adaptées à différents métiers.

### Structure des fichiers

```
data/
├── cv-data.ts              # Fichier principal (charge la variante active)
├── variants.ts             # Configuration des variantes
├── cv-data.devops.ts       # Variante: DevOps
├── cv-data.adminsys.ts     # Variante: Admin Sys
└── cv-data.fullstack.ts    # Variante: Fullstack Web (à venir)
```

## Branches Git

Chaque variante a sa propre branche :

| Branche | Variante | Description |
|---------|----------|-------------|
| `main` | devops | CV par défaut (DevOps) |
| `alternance-devops` | devops | CV DevOps |
| `alternance-adminsys` | adminsys | CV Admin Sys |
| `alternance-fullstack` | fullstack | CV Fullstack Web |

## Configuration

### 1. Fichier `.env.local`

Crée un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_CV_VARIANT=devops
```

Options disponibles:
- `devops` - CV spécialisé DevOps
- `adminsys` - CV spécialisé Admin Sys
- `fullstack` - CV spécialisé Fullstack Web (à venir)

### 2. Exemple sur chaque branche

Sur la branche `alternance-devops`:
```env
NEXT_PUBLIC_CV_VARIANT=devops
```

Sur la branche `alternance-adminsys`:
```env
NEXT_PUBLIC_CV_VARIANT=adminsys
```

## Utilisation

### Développement local

```bash
# Récupérer la branche souhaitée
git checkout alternance-devops

# Ou spécifier la variante dans .env.local
NEXT_PUBLIC_CV_VARIANT=devops npm run dev
```

### Build

```bash
# Build avec la variante définie dans .env.local
npm run build

# Le PDF exporté utilisera la variante active
```

## Ajouter une nouvelle variante

1. **Créer le fichier de données** `data/cv-data.newvariant.ts`
2. **Ajouter l'import** dans `data/cv-data.ts`
3. **Mettre à jour** `data/variants.ts`
4. **Créer la branche Git** correspondante
5. **Configurer** le `.env.local` sur la branche

## Export PDF

L'export PDF utilise automatiquement la variante active définie dans l'env var.

```bash
npm run build
node scripts/export-cv-pdf.js
```

Le fichier PDF généré aura le nom de la variante (ex: `cv-devops.pdf`, `cv-adminsys.pdf`).

## Déploiement

### GitHub Pages (future automatisation)

Les workflows CI/CD pourront :
- Builder chaque branche
- Déployer sur une URL spécifique (ex: `/devops`, `/adminsys`)
- Générer les PDF automatiquement

### Hébergement actuel

Pour le moment, tu peux déployer manuellement :
```bash
git push origin alternance-devops
# Déploie ta branche
```

## Tips Git

```bash
# Créer une nouvelle branche depuis main
git checkout main
git pull origin main
git checkout -b alternance-newjob

# Configurer la variante sur la branche
echo 'NEXT_PUBLIC_CV_VARIANT=newjob' >> .env.local

# Commit et push
git add .env.local
git commit -m "chore: configure newjob variant"
git push -u origin alternance-newjob
```
