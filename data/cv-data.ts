// CV Data Configuration
// Edit this file to customize your CV content

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
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
  level: 'Maternelle' | 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic' | 'B2' | 'B1' | 'A2' | 'A1' | 'C2' | 'C1';
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

// Import the variant data
import { cvDataDevOps } from './cv-data.devops';
import { cvDataAdminSys } from './cv-data.adminsys';
import { getActiveVariant, VARIANTS } from './variants';

// Get the active variant based on environment
const activeVariant = getActiveVariant();
const variantMap: Record<string, CVData> = {
  devops: cvDataDevOps,
  adminsys: cvDataAdminSys,
};

export const cvData: CVData = variantMap[activeVariant];
