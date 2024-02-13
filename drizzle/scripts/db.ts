import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
function createPostgresConnectionString() {
  const host = process.env.DB_HOST
  const port = process.env.DB_PORT || '5432'
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_NAME

  const url = new URL(
    `postgresql://${user}:${password}@${host}:${port}/${database}`,
  )

  return url.toString()
}

export const client = new pg.Client({
  connectionString: createPostgresConnectionString(),
})

if (process.env.DB_SCHEMA) {
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${process.env.DB_SCHEMA}"`)
  await client.query(`SET SCHEMA '${process.env.DB_SCHEMA}'`)
}

console.log('Connecting...')
await client.connect()

export const scriptDb = drizzle(client)
