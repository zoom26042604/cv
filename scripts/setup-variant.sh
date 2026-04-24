#!/bin/bash
# Setup script pour configurer la variante CV selon la branche

BRANCH=$(git rev-parse --abbrev-ref HEAD)
ENV_FILE=".env.local"

# Déterminer la variante selon la branche
case "$BRANCH" in
  alternance-devops)
    VARIANT="devops"
    echo "📌 Branche DevOps détectée"
    ;;
  alternance-adminsys)
    VARIANT="adminsys"
    echo "📌 Branche Admin Sys détectée"
    ;;
  alternance-fullstack)
    VARIANT="fullstack"
    echo "📌 Branche Fullstack Web détectée"
    ;;
  master|main)
    VARIANT="devops"
    echo "📌 Branche principale (défaut: DevOps)"
    ;;
  *)
    echo "⚠️ Branche non reconnue. Configuration manuelle requise."
    exit 0
    ;;
esac

# Créer ou mettre à jour .env.local
cat > "$ENV_FILE" << EOF
# CV Variants - Auto-configured for branch: $BRANCH
NEXT_PUBLIC_CV_VARIANT=$VARIANT
EOF

echo "✅ .env.local configuré avec la variante: $VARIANT"
echo "📁 Fichier créé: $ENV_FILE"
