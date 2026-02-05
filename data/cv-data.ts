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
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic' | 'B2' | 'B1' | 'A2' | 'A1';
}

export interface CVData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  projetsPerso: Project[];
  projetsEtudiant: Project[];
  skills: Skill[];
  languages: Language[];
  interests?: string[];
}

export const cvData: CVData = {
  personal: {
    name: 'Nathan FERRE',
    title: 'Etudiant en Informatique',
    email: 'nathan.ferre@ynov.com',
    phone: '+33 7 85 90 46 45',
    location: 'Toulouse, France',
    website: 'https://nathan-ferre.fr',
    github: 'zoom26042604',
    linkedin: 'nathan-ferre-0ba3a438a',
    avatar: '/photo.jpg',
    summary: `Étudiant en informatique passionné à Ynov Toulouse. 
    J'aime développer et mettre en place des solutions, sites et applications en tous genres. Curieux et patient, je suis toujours à la recherche de nouveaux défis et d'opportunités d'apprentissage.`,
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
      description: "Actuellement en deuxième année d'études à Toulouse Ynov Campus, je prépare un bachelor 3 spécialisé en infrastructure."
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
  projetsEtudiant: [
    {
      id: 'forum-1',
      name: 'Forum - web',
      description: `Réalisation d'un forum grâce à HTML/CSS/JS, Golang et MySQL\nDéployé grâce à Docker et un VPS OVH pour héberger le tout.\n\nProjet réalisé en 3 semaines en équipe de 4 personnes.`,
      technologies: ['HTML', 'JS', 'CSS', 'Golang', 'MySQL', 'Docker'],
      url: '',
      github: '',
      startDate: '2025-05-26',
      endDate: '2025-06-13',
    },
    {
      id: 'ymuse-1',
      name: 'Ymuse',
      description: `Jeu RPG en troisième personne, mix Genshin Impact x Guitar Hero, réalisé sur Unity.\n Développeur C# chargé de la mécanique de combat, d'items et d'inventaire.`,
      technologies: ['Unity', 'C#'],
      url: '',
      github: '',
      startDate: '2023-09-01',
      endDate: '2024-05-01',
    },
  ],
  projetsPerso: [
    {
      id: 'proj-1',
      name: '2048 Game',
      description: 'Jeu 2048 moderne avec classement et statistiques.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'Framer Motion'],
      url: 'https://2048.zoom2604.dev',
      github: 'https://github.com/zoom26042604/game-2048',
      startDate: '2025-12-21',
      endDate: '',
    },
    {
      id: 'proj-2',
      name: 'Portfolio Personnel',
      description: 'Site portfolio responsive présentant mes projets et compétences avec thème Catppuccin.',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      url: 'https://nathan-ferre.fr',
      github: 'https://github.com/zoom26042604/azrael',
      startDate: '2025-06-22',
      endDate: '',
    },
    {
      id: 'proj-3',
      name: 'CV Interactif',
      description: 'Ce CV ! Un CV web avec support impression et mode sombre.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      url: 'https://nathan-ferre.fr/cv',
      github: 'https://github.com/zoom26042604/cv',
      startDate: '2025-08-15',
      endDate: '',
    },
  ],
  projects: [],
  skills: [
    {
      category: 'Hard Skills',
      items: [ 'Docker', 'Node.js', 'Python', 'SQL', 'Git', 'Figma', 'Linux', 'Golang', 'HTML/CSS/JS'],
    },
    {
      category: 'Soft Skills',
      items: ['Travail en équipe', 'Autonomie', 'Curiosité', 'Adaptabilité', 'Gestion de projet Agile' ],
    },
  ],
  languages: [
    { name: 'Français', level: 'Native' },
    { name: 'Anglais', level: 'B2' },
  ],
  interests: ['Lecture', 'Tennis', 'Nourriture', 'Gaming', 'Technologies' ],
};
