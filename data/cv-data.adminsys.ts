// CV Data - Variante ADMIN SYS
// Spécialisé en Administration Système et Réseau

import {
    PersonalInfo,
    Experience,
    Education,
    Project,
    Skill,
    Language,
    CVData,
} from './cv-data';

export const cvDataAdminSys: CVData = {
    personal: {
        name: 'Nathan FERRE',
        title: "Étudiant en informatique, en recherche de alternance/stage",
        subtitle: "Rythme de travail : 2 semaines en entreprise, 1 semaine à l'école dès septembre 2026",
        email: 'nathanferre06@gmail.com',
        location: 'Toulouse, France',
        website: 'https://nathan-ferre.fr',
        github: 'zoom26042604',
        linkedin: 'nathan-ferre',
        avatar: '/profile.jpg',
        summary: `Étudiant en informatique passionné, à Ynov Toulouse.
    J'aime développer et mettre en place des solutions, sites et applications en tout genre. Curieux et patient, je suis toujours à la recherche de nouveaux défis et d'opportunités d'apprentissage.`,
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
            description: "Actuellement en deuxième année d'études à Ynov Campus Toulouse, spécialisé en administration système et réseau.",
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
      name: 'Homelab',
      type: 'personal',
      description: 'Infrastructure personnelle hébergée sur un cluster Kubernetes (k3s), avec déploiement continu via ArgoCD, monitoring Grafana/Prometheus et reverse proxy Traefik.',
      technologies: ['Kubernetes', 'k3s', 'ArgoCD', 'Helm', 'Traefik', 'Grafana', 'Prometheus', 'Linux'],
      startDate: '2025-01-01',
      endDate: '',
    },
    {
      id: 'proj-3',
      name: 'GitLab',
      type: 'personal',
      description: "Déploiement et configuration d'une instance GitLab sur un VPS OVH.",
      technologies: ['OVH', 'GitLab', 'Kubernetes', 'Linux'],
      startDate: '2025-08-15',
      endDate: '',
    },
    {
      id: 'forum-1',
      name: 'Forum - web',
      type: 'student',
      description: `Conception d'un forum grâce à HTML/CSS/JS, Golang et MySQL\nDéployé grâce à Docker et un VPS OVH pour héberger le tout.\n\nProjet accompli en trois semaines en équipe de quatre personnes.`,
      technologies: ['HTML', 'JS', 'CSS', 'Golang', 'MySQL', 'Docker'],
      url: '',
      github: '',
      startDate: '2025-05-26',
      endDate: '2025-06-13',
    },
    {
      id: 'exp-tennis',
      name: 'Initiateur fédéral de tennis',
      type: 'professional',
      description: 'Encadrement de 3 groupes de 4 à 6 joueurs par semaine, tous niveaux, de l\'enfant au senior.\nTitulaire du brevet d\'initiateur fédéral de la Fédération Française de Tennis (FFT).',
      technologies: [],
      startDate: '2023-09-01',
      endDate: '',
    },
  ],
    skills: [
        {
            category: 'Administration Système',
            items: [
                'Linux (Ubuntu, CentOS, Debian)',
                'Windows Server',
                'Gestion des utilisateurs & permissions',
                'Partages réseau (Samba, NFS)',
                'SSH & Tunneling',
                'Systemd & Services',
            ],
        },
        {
            category: 'Virtualisation & Cloud',
            items: [
                'Proxmox',
                'KVM',
                'Docker Containers',
                'OVH Cloud',
                'Backup & Recovery',
            ],
        },
        {
            category: 'Réseau & Sécurité',
            items: [
                'Protocoles réseau (TCP/IP, DNS, DHCP)',
                'Firewall (ufw, iptables)',
                'VPN & Tunneling',
                'SSL/TLS Certificates',
                'Fail2ban',
                'Security Hardening',
            ],
        },
        {
            category: 'Monitoring & Maintenance',
            items: [
                'Log Management',
                'Performance Monitoring',
                'Alerting',
                'Patch Management',
                'Database Administration',
            ],
        },
        {
            category: 'Scripting & Automatisation',
            items: [
                'Bash/Shell',
                'Python',
                'Cron Jobs',
                'Automatisation des tâches',
            ],
        },
        {
            category: 'Soft Skills',
            items: [
                'Travail en équipe',
                'Autonomie',
                'Gestion de crises',
                'Documentation',
                'Support utilisateur',
            ],
        },
    ],
    languages: [
        { name: 'Français', level: 'Maternelle', flag: 'fr' },
        { name: 'Anglais', level: 'B2', flag: 'gb' },
    ],
    interests: ['Lecture', 'Sport', 'Nourriture', 'Gaming', 'Technologies'],
};
