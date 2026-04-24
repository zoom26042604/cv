// CV Data - Variante DEVOPS
// Spécialisé en DevOps et Infrastructure

import {
  PersonalInfo,
  Experience,
  Education,
  Project,
  Skill,
  Language,
  CVData,
} from './cv-data';

export const cvDataDevOps: CVData = {
  personal: {
    name: 'Nathan FERRE',
    title: "DevOps Engineer en formation",
    subtitle: "Rythme de travail : 2 semaines en entreprise, 1 semaine à l'école dès septembre 2026",
    email: 'nathanferre06@gmail.com',
    location: 'Toulouse, France',
    website: 'https://nathan-ferre.fr',
    github: 'zoom26042604',
    linkedin: 'nathan-ferre',
    avatar: '/profile.jpg',
    summary: `Étudiant en informatique spécialisé en infrastructure et DevOps.
    Passionné par l'automatisation, les conteneurs et l'orchestration Kubernetes.
    Je conçois et déploie des infrastructures scalables et fiables.`,
  },
  experience: [],
  education: [
    {
      id: 'edu-1',
      institution: 'Ynov Campus Toulouse',
      degree: 'Bachelor',
      field: 'Informatique - Infrastructure',
      location: 'Toulouse, France',
      startDate: 'sept. 2024',
      endDate: 'juill. 2027',
      description: "Actuellement en deuxième année d'études à Ynov Campus Toulouse, spécialisé en infrastructure et DevOps.",
    },
    {
      id: 'edu-2',
      institution: 'Lycée Saint-Exupéry',
      degree: 'Bac Technologique',
      field: 'STI2D',
      location: 'Blagnac, France',
      startDate: 'sept. 2021',
      endDate: 'juill. 2024',
      description: "Obtention d'un baccalauréat STI2D (Sciences et Technologies de l'Industrie et du Développement Durable).",
      achievements: [],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'Homelab Kubernetes',
      type: 'personal',
      description: 'Infrastructure personnelle entièrement orchestrée sur un cluster Kubernetes (k3s). Déploiement continu via ArgoCD, monitoring avec Grafana/Prometheus, reverse proxy Traefik et gestion des secrets avec Sealed Secrets.',
      technologies: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'Traefik', 'Grafana', 'Prometheus', 'Linux', 'Docker', 'CI/CD'],
      startDate: '2025-01-01',
      endDate: '',
    },
    {
      id: 'proj-3',
      name: 'Déploiement GitLab on-premise',
      type: 'personal',
      description: "Configuration et déploiement d'une instance GitLab auto-hébergée sur un cluster Kubernetes. Intégration avec ArgoCD pour le GitOps.",
      technologies: ['GitLab', 'Kubernetes', 'ArgoCD', 'Helm', 'Linux', 'OVH'],
      startDate: '2025-08-15',
      endDate: '',
    },
    {
      id: 'forum-1',
      name: 'Forum - Infrastructure & Déploiement',
      type: 'student',
      description: `Responsable de l'infrastructure et du déploiement d'un forum web.
        Orchestration avec Docker, déploiement sur VPS OVH, configuration des services en conteneurs.
        Implémentation d'une stack complète avec gestion des volumes persistants et reverse proxy.
        Projet réalisé en équipe de quatre personnes en trois semaines.`,
      technologies: ['Docker', 'Docker Compose', 'Kubernetes', 'Linux', 'OVH', 'Traefik', 'nginx'],
      url: '',
      github: '',
      startDate: '2025-05-26',
      endDate: '2025-06-13',
    },
  ],
  skills: [
    {
      category: 'DevOps & Infrastructure',
      items: [
        'Kubernetes (k3s)',
        'Docker & Docker Compose',
        'ArgoCD (GitOps)',
        'Helm',
        'Terraform',
        'Ansible',
        'CI/CD Pipeline',
        'GitHub Actions',
      ],
    },
    {
      category: 'Monitoring & Logging',
      items: [
        'Grafana',
        'Prometheus',
        'ELK Stack',
        'AlertManager',
      ],
    },
    {
      category: 'Outils & Platforms',
      items: [
        'Linux (Ubuntu, CentOS)',
        'Git / GitLab / GitHub',
        'OVH Cloud',
        'Traefik',
        'nginx',
      ],
    },
    {
      category: 'Programmation',
      items: [
        'Bash/Shell',
        'Python',
        'Golang',
        'YAML',
      ],
    },
    {
      category: 'Soft Skills',
      items: [
        'Travail en équipe',
        'Autonomie',
        'Résolution de problèmes',
        'Documentation',
        'Gestion de projet Agile',
      ],
    },
  ],
  languages: [
    { name: 'Français', level: 'Maternelle', flag: 'fr' },
    { name: 'Anglais', level: 'B2', flag: 'gb' },
  ],
  interests: ['Infrastructure', 'Automatisation', 'Cloud', 'Open Source', 'Technologies'],
};
