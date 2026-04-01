// CV Data Configuration
// Edit this file to customize your CV content

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  github?: string;
  linkedin?: string;
  summary: string;
  avatar?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string[];
  technologies?: string[];
  type?: 'student' | 'personal' | 'professional';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  gpa?: string;
  achievements?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  type?: 'student' | 'personal' | 'professional';
  url?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Language {
  name: string;
  level: 'Maternelle' | 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic' | 'B2' | 'B1' | 'A2' | 'A1';
  flag?: string;
}

export interface CVData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  interests?: string[];
}

export const cvData: CVData = {
  personal: {
    name: 'Nathan FERRE',
    title: "Étudiant en informatique, en recherche de alternance/stage",
    email: 'nathanferre06@gmail.com',
    phone: '+33 7 85 90 46 45',
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
      field: 'Informatique',
      location: 'Toulouse, France',
      startDate: 'sept. 2024',
      endDate: 'juill. 2027',
      description: "Actuellement en deuxième année d'études à Ynov Campus Toulouse, je prépare un bachelor 3 spécialisé en infrastructure."
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
      id: 'ymuse-1',
      name: 'Ymuse',
      type: 'student',
      description: `Développement d'un jeu RPG 3D en équipe sur Unity (8 mois de projet).\nConception et implémentation en C# du système de combat, de la gestion d'inventaire et des mécaniques d'objets.`,
      technologies: ['Unity', 'C#'],
      url: '',
      github: '',
      startDate: '2024-09-01',
      endDate: '2025-06-01',
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
      category: 'Hard Skills',
      items: [ 'Docker', 'Node.js', 'Express', 'Python', 'SQL', 'Git', 'Figma', 'Linux', 'Golang', 'HTML/CSS/JS', 'React', 'TailwindCSS', 'PHP', 'C++', 'Java', 'Postman'],
    },
    {
      category: 'Soft Skills',
      items: ['Travail en équipe', 'Autonomie', 'Curiosité', 'Adaptabilité', 'Gestion de projet Agile' ],
    },
  ],
  languages: [
    { name: 'Français', level: 'Maternelle', flag: 'fr' },
    { name: 'Anglais', level: 'B2', flag: 'gb' },
  ],
  interests: ['Lecture', 'Sport', 'Nourriture', 'Gaming', 'Technologies' ],
};
