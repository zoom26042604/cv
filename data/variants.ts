// Variants Configuration
// Définit les différentes variantes de CV disponibles

export type CVVariant = 'devops' | 'adminsys' | 'fullstack';

export const VARIANTS = {
  devops: {
    name: 'DevOps',
    description: 'CV spécialisé en DevOps et Infrastructure',
    file: 'cv-data.devops',
  },
  adminsys: {
    name: 'Admin Sys',
    description: 'CV spécialisé en Administration Système',
    file: 'cv-data.adminsys',
  },
  fullstack: {
    name: 'Fullstack Web',
    description: 'CV spécialisé en Développement Fullstack Web',
    file: 'cv-data.fullstack',
  },
} as const;

// Récupère la variante active depuis l'env var ou défaut
export const getActiveVariant = (): CVVariant => {
  const variant = process.env.NEXT_PUBLIC_CV_VARIANT as CVVariant | undefined;
  if (variant && variant in VARIANTS) {
    return variant;
  }
  return 'devops'; // variant par défaut
};
