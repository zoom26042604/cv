# 🎯 DevHub Pro - Admin Dashboard

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> **Administration centrale pour gérer vos applications web déployées**  
> Dashboard moderne avec authentification NextAuth, gestion multi-apps, monitoring en temps réel et déploiements automatisés.

---

## ✨ Features

- 🔐 **Authentification sécurisée** - NextAuth avec credentials + OAuth providers
- 📊 **Dashboard temps réel** - Monitoring status des apps, métriques, logs
- 🚀 **Gestion des déploiements** - Deploy, stop, restart vos apps en 1 clic
- 📦 **Multi-applications** - Gérez tous vos projets depuis un seul endroit
- 🎨 **UI moderne** - Tailwind CSS + Shadcn/ui components
- 🗄️ **Database intégrée** - PostgreSQL + Prisma ORM
- 🐳 **Docker ready** - Déploiement containerisé avec docker-compose
- 📱 **Responsive** - Fonctionne sur mobile, tablette, desktop

---

## 🚀 Quick Start

### Prérequis

- Node.js 18+
- PostgreSQL 16+
- Docker (optionnel)

### Installation

```bash
# Cloner le repo
git clone https://github.com/zoom2604/devhub-pro-admin.git
cd devhub-pro-admin

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Setup la base de données
npx prisma generate
npx prisma db push

# Lancer en dev
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🐳 Déploiement Docker

### 1. Build l'image

```bash
docker build -t devhub-admin .
```

### 2. Lancer avec docker-compose

```bash
docker-compose up -d
```

### 3. Accéder au dashboard

```
https://votre-domaine.com/admin
```

---

## 📂 Structure du Projet

```
admin/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Shadcn components
│   └── dashboard/        # Dashboard specifics
├── lib/                   # Utilities
│   ├── prisma.ts         # Database client
│   └── auth.ts           # NextAuth config
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma models
├── public/               # Static assets
├── Dockerfile            # Container build
├── docker-compose.yml    # Docker orchestration
└── next.config.ts        # Next.js config
```

---

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` :

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/admin"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-password"
```

### Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm start            # Start production
npm run lint         # Lint le code
npm run type-check   # Vérifier les types TypeScript
```

---

## 📊 Fonctionnalités du Dashboard

### Page d'accueil
- �� **Statistiques globales** : Apps actives, CPU, RAM, trafic
- 🔔 **Alertes** : Notifications en temps réel
- 📊 **Graphiques** : Évolution des métriques

### Gestion des apps
- ✅ **Statut en direct** : Running / Stopped / Error
- 🚀 **Actions rapides** : Start, Stop, Restart, Rebuild
- 📋 **Logs en temps réel** : Streaming des logs containers
- 🔧 **Configuration** : Éditer variables d'environnement

### Déploiements
- 📦 **Deploy wizard** : Interface step-by-step
- 🔄 **Auto-deploy** : Webhooks GitHub/GitLab
- 📜 **Historique** : Tous les déploiements avec rollback

### Monitoring
- 📊 **Métriques système** : CPU, RAM, Disk, Network
- 🐳 **Docker stats** : Containers, images, volumes
- 🗄️ **Database** : Connexions PostgreSQL, Redis cache hits

---

## 🛡️ Sécurité

- 🔐 **Authentification forte** : NextAuth avec session sécurisée
- 🚫 **CSRF protection** : Token anti-CSRF automatique
- 🔒 **HTTPS only** : Redirect automatique HTTP → HTTPS
- 🎫 **Role-based access** : Admin / User / Viewer roles
- 🔑 **Secrets encryption** : Variables sensibles chiffrées

---

## 🤝 Contribution

Les contributions sont bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👤 Auteur

**zoom2604**
- GitHub: [@zoom2604](https://github.com/zoom2604)
- Website: [zoom2604.dev](https://zoom2604.dev)

---

## ⭐ Support

Si ce projet vous aide, donnez-lui une ⭐ sur GitHub !

**Construit avec ❤️ par zoom2604**
