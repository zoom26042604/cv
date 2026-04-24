# 🚀 CV Variants - Guide d'Utilisation

## Bienvenue dans le système de CV Multi-Variantes !

Tu as maintenant 3 branches pour développer tes différents CV selon les métiers :

| Branche | Variante | Statut |
|---------|----------|--------|
| `master` | DevOps (par défaut) | ✅ Prête |
| `alternance-devops` | DevOps | ✅ Prête |
| `alternance-adminsys` | Admin Sys | ✅ Prête |

---

## 📋 Démarrage Rapide

### 1️⃣ Cloner et Tester

```bash
# Récupérer le repo
git clone <your-repo-url>
cd cv

# Lister les branches
git branch -a

# Voir les variantes disponibles
cat VARIANTS.md
```

### 2️⃣ Basculer entre les Variantes

```bash
# Aller sur la branche DevOps
git checkout alternance-devops

# Aller sur la branche Admin Sys
git checkout alternance-adminsys

# Le script de setup configure automatiquement .env.local ! ✨
```

### 3️⃣ Démarrer le Développement

```bash
# La variante est automatiquement chargée
npm run dev

# Le CV affiche les données spécifiques au métier
# Ouvre http://localhost:3000
```

### 4️⃣ Build et Export PDF

```bash
# Build avec la variante active
npm run build

# Générer le PDF (utilise la variante active)
node scripts/export-cv-pdf.js
```

---

## 🔄 Workflow Habituel

### Modifier le CV DevOps

```bash
# 1. Aller sur la branche
git checkout alternance-devops

# 2. Modifier les données
vim data/cv-data.devops.ts

# 3. Tester localement
npm run dev

# 4. Commiter les changements
git add .
git commit -m "feat: update DevOps CV experience"

# 5. Push vers ta branche
git push origin alternance-devops
```

### Modifier le CV Admin Sys

Même processus, mais avec `alternance-adminsys` et `cv-data.adminsys.ts`.

---

## 🛠️ Configuration Automatique

Le système utilise un **Git Hook** (`post-checkout`) pour :
- ✅ Détecter le changement de branche
- ✅ Générer automatiquement `.env.local` avec la bonne variante
- ✅ Vous afficher un message de confirmation

### Exécution Manuelle

Si tu veux reconfigurer manuellement :

```bash
./scripts/setup-variant.sh
```

Cela créera/mettra à jour `.env.local` automatiquement.

---

## 📝 Fichiers Clés

| Fichier | Rôle |
|---------|------|
| `data/cv-data.ts` | Import principal (charge la variante) |
| `data/variants.ts` | Configuration des variantes |
| `data/cv-data.devops.ts` | Données DevOps |
| `data/cv-data.adminsys.ts` | Données Admin Sys |
| `.env.local` | Config de la variante (créée automatiquement) |
| `.env.local.example` | Template pour la config |
| `scripts/setup-variant.sh` | Script de configuration |
| `.git/hooks/post-checkout` | Hook d'auto-configuration |

---

## 🚨 Troubleshooting

### "Variante par défaut"

Si tu vois "Variante par défaut (DevOps)" mais tu es sur Admin Sys :

```bash
# Reconfigure manuellement
./scripts/setup-variant.sh

# Vérifie le fichier .env.local
cat .env.local
```

### Le hook ne fonctionne pas

```bash
# Rendre le hook exécutable
chmod +x .git/hooks/post-checkout

# Exécuter le hook manuellement
.git/hooks/post-checkout
```

### Le .env.local n'existe pas

```bash
# Créer manuellement en fonction de ta branche
./scripts/setup-variant.sh
```

---

## 📚 Ajouter une Nouvelle Variante

### 1. Créer le fichier de données
```bash
cp data/cv-data.devops.ts data/cv-data.mynewjob.ts
# Éditer le fichier avec tes données
```

### 2. Mettre à jour la config
Ajouter dans `data/variants.ts` :
```typescript
mynewjob: {
  name: 'My New Job',
  description: 'CV for my new job',
  file: 'cv-data.mynewjob',
},
```

### 3. Mettre à jour cv-data.ts
```typescript
import { cvDataMyNewJob } from './cv-data.mynewjob';

const variantMap: Record<string, CVData> = {
  devops: cvDataDevOps,
  adminsys: cvDataAdminSys,
  mynewjob: cvDataMyNewJob,  // ← Ajouter ici
};
```

### 4. Créer la branche
```bash
git checkout master
git checkout -b alternance-mynewjob
```

### 5. Configurer
```bash
# Le script détectera automatiquement ta branche
# Et créera .env.local avec la bonne variante
```

---

## 💡 Tips

- **Gitignore**: `.env.local` n'est pas tracké (c'est voulu pour les secrets)
- **Hooks**: Les hooks s'exécutent automatiquement, mais tu peux les exécuter manuellement
- **Branches**: Chaque branche a son propre `.env.local` en local
- **Commits**: Commite tes changements sur la branche correspondante

---

## 🎯 Prochaines Étapes Optionnelles

- [ ] Ajouter GitHub Actions pour auto-deployer les variantes
- [ ] Créer des URLs spécifiques par variante (cv.nathan-ferre.fr/devops, etc.)
- [ ] Ajouter un sélecteur de variante sur la page d'accueil
- [ ] Automatiser l'export PDF par variante

---

**Questions ?** Consulte [VARIANTS.md](VARIANTS.md) pour plus de détails techniques.
