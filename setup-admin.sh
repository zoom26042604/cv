#!/bin/bash
# Script pour finaliser la configuration du dashboard admin

echo "🔧 Configuration du dashboard admin..."

# Créer le fichier .env.local
cat > /srv/zoom2604.dev/admin/.env.local << 'EOFENV'
# Base de données PostgreSQL
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Nq0cwLCNWKbUwBFQmP6TzYcwPyd5wppS
ADMIN_DB_NAME=admin_db

# NextAuth
NEXTAUTH_URL=http://localhost:3001/admin
NEXTAUTH_SECRET=CHANGE_THIS_IN_PRODUCTION_$(openssl rand -base64 64 | tr -d "\n")

# Prometheus
PROMETHEUS_URL=http://prometheus:9090

# Node Env
NODE_ENV=development
EOFENV

echo "✅ Fichier .env.local créé"

# Initialiser la base de données
echo "📦 Initialisation de la base de données..."

# Vérifier si PostgreSQL est accessible
if ! PGPASSWORD="Nq0cwLCNWKbUwBFQmP6TzYcwPyd5wppS" psql -h localhost -U postgres -d admin_db -c "SELECT 1;" > /dev/null 2>&1; then
    echo "⚠️  PostgreSQL n'est pas encore accessible. Exécutez ce script après le démarrage complet."
    echo "   Commande: cd /srv/zoom2604.dev/admin && ./setup-admin.sh"
else
    # Exécuter le schema SQL
    PGPASSWORD="Nq0cwLCNWKbUwBFQmP6TzYcwPyd5wppS" psql -h localhost -U postgres -d admin_db -f /srv/zoom2604.dev/admin/prisma/schema.sql > /dev/null 2>&1
    echo "✅ Base de données initialisée"
    echo ""
    echo "👤 Utilisateur admin créé:"
    echo "   Email: admin@zoom2604.dev"
    echo "   Mot de passe: admin123"
    echo "   ⚠️  CHANGEZ CE MOT DE PASSE EN PRODUCTION!"
fi

echo ""
echo "✅ Configuration terminée!"
echo ""
echo "🚀 Pour démarrer le dashboard:"
echo "   cd /srv/zoom2604.dev/admin"
echo "   npm run dev"
echo ""
echo "📍 Le dashboard sera accessible sur:"
echo "   http://localhost:3001/admin"

