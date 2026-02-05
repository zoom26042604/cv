import { Pool } from 'pg'

// Pool de connexions PostgreSQL
let pool: Pool | null = null

export function getPostgresPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: 'postgres',
      port: 5432,
      user: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.ADMIN_DB_NAME || 'admin_db',
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })
  }
  return pool
}

// Lister toutes les bases de données
export async function listDatabases() {
  const pool = getPostgresPool()
  const result = await pool.query(`
    SELECT datname, pg_size_pretty(pg_database_size(datname)) as size
    FROM pg_database
    WHERE datistemplate = false
    ORDER BY datname
  `)
  return result.rows
}

// Obtenir les statistiques d'une base de données
export async function getDatabaseStats(dbName: string) {
  const pool = getPostgresPool()
  
  // Taille de la base
  const sizeResult = await pool.query(
    `SELECT pg_size_pretty(pg_database_size($1)) as size`,
    [dbName]
  )
  
  // Nombre de connexions
  const connectionsResult = await pool.query(
    `SELECT count(*) as connections FROM pg_stat_activity WHERE datname = $1`,
    [dbName]
  )
  
  // Nombre de tables
  const tablesResult = await pool.query(
    `SELECT count(*) as tables FROM information_schema.tables WHERE table_schema = 'public'`
  )
  
  return {
    size: sizeResult.rows[0]?.size || '0 bytes',
    connections: parseInt(connectionsResult.rows[0]?.connections || '0'),
    tables: parseInt(tablesResult.rows[0]?.tables || '0'),
  }
}

// Créer une nouvelle base de données
export async function createDatabase(dbName: string) {
  const pool = getPostgresPool()
  await pool.query(`CREATE DATABASE ${dbName}`)
}

// Backup d'une base de données (retourne la commande à exécuter)
export function getBackupCommand(dbName: string, outputPath: string): string {
  return `PGPASSWORD="${process.env.POSTGRES_PASSWORD}" pg_dump -h postgres -U ${process.env.POSTGRES_USER} -d ${dbName} > ${outputPath}`
}

// Test de connexion
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPostgresPool()
    await pool.query('SELECT 1')
    return true
  } catch (error) {
    console.error('PostgreSQL connection error:', error)
    return false
  }
}

// Fermer toutes les connexions
export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}
