import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { env } from '@/env'

function createPostgresConnectionString() {
  const host = env.DB_HOST
  const port = env.DB_PORT
  const user = env.DB_USER
  const password = env.DB_PASSWORD
  const database = env.DB_NAME

  const url = new URL(
    `postgresql://${user}:${password}@${host}:${port}/${database}`,
  )

  return url.toString()
}

export async function startDatabase() {
  const pool = new pg.Pool({
    connectionString: createPostgresConnectionString(),
  })

  if (process.env.DB_SCHEMA) {
    await pool.query(`CREATE SCHEMA IF NOT EXISTS "${process.env.DB_SCHEMA}"`)
    await pool.query(`SET SCHEMA '${process.env.DB_SCHEMA}'`)
  }

  const db = drizzle(pool)

  return { db, pool }
}
