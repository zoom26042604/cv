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
    title: "Administrateur Système en formation",
    subtitle: "Rythme de travail : 2 semaines en entreprise, 1 semaine à l'école dès septembre 2026",
    email: 'nathanferre06@gmail.com',
    location: 'Toulouse, France',
    website: 'https://nathan-ferre.fr',
    github: 'zoom26042604',
    linkedin: 'nathan-ferre',
    avatar: '/profile.jpg',
    summary: `Étudiant en informatique spécialisé en administration système et infrastructure.
    Passionné par la sécurité des systèmes, l'administration Linux/Windows et la gestion réseau.
    Je gère et sécurise les infrastructures informatiques d'entreprise.`,
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
      name: 'Homelab - Infrastructure Personnelle',
      type: 'personal',
      description: 'Construction et gestion d\'un homelab complet avec infrastructure virtualisée. Gestion des services, des utilisateurs, de la sécurité réseau et des sauvegardes.',
      technologies: [
        'Linux',
        'Proxmox',
        'Virtualization',
        'Networking',
        'Storage Management',
        'Bash',
        'Docker',
      ],
      startDate: '2025-01-01',
      endDate: '',
    },
    {
      id: 'proj-2',
      name: 'Configuration Serveur GitLab',
      type: 'personal',
      description: "Déploiement et administration d'une instance GitLab sur serveur dédié. Gestion des utilisateurs, des projets, des sauvegardes et de la haute disponibilité.",
      technologies: [
        'GitLab',
        'Linux',
        'OVH',
        'Backup Strategy',
        'System Administration',
        'Monitoring',
      ],
      startDate: '2025-08-15',
      endDate: '',
    },
    {
      id: 'forum-1',
      name: 'Forum - Administration & Sécurité',
      type: 'student',
      description: `Responsable de l'administration et de la sécurité de l'infrastructure du forum.
        Gestion des serveurs Linux, configuration des pare-feu, gestion des utilisateurs et des permissions.
        Mise en place de sauvegardes, monitoring des performances et gestion de la continuité de service.
        Projet réalisé en équipe de quatre personnes en trois semaines.`,
      technologies: [
        'Linux Administration',
        'Bash',
        'Firewall',
        'User Management',
        'Backup',
        'Monitoring',
        'Database Admin',
      ],
      url: '',
      github: '',
      startDate: '2025-05-26',
      endDate: '2025-06-13',
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
  interests: [
    'Sécurité informatique',
    'Administration système',
    'Réseau',
    'Linux',
    'Open Source',
  ],
};
