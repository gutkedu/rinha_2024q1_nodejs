import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import pg from 'pg'
import fs from 'node:fs'
import path from 'node:path'

const testClient = new pg.Client({
  connectionString: createPostgresConnectionString(),
})

function createPostgresConnectionString() {
  const host = process.env.DB_HOST
  const port = process.env.DB_PORT || '5432'
  const user = process.env.DB_USER
  const password = process.env.DB_PASSWORD
  const database = process.env.DB_NAME
  const schema = process.env.DB_SCHEMA

  const url = new URL(
    `postgresql://${user}:${password}@${host}:${port}/${database}`,
  )
  url.searchParams.set('schema', schema ?? 'public')

  return url.toString()
}

export default <Environment>{
  name: 'drizzle',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    process.env.DB_SCHEMA = schema

    await testClient.connect()

    await testClient.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`)

    await testClient.query(`SET SCHEMA '${schema}'`)

    await manualMigrate(testClient)

    await seed(testClient)

    return {
      async teardown() {
        await testClient.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await testClient.end()
      },
    }
  },
}

async function manualMigrate(client: pg.Client) {
  // Read all .sql files in the migrations directory
  const migrationsDir = './drizzle/migrations'
  let files = fs.readdirSync(migrationsDir)

  // Sort the files array
  files = files.sort()

  for (const file of files) {
    if (path.extname(file) === '.sql') {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
      await client.query(sql)
    }
  }
}

async function seed(client: pg.Client) {
  const query = `
  INSERT INTO costumers (id, "limit", balance) VALUES
  ('1', 100000, 0),
  ('2', 80000, 0),
  ('3', 1000000, 0),
  ('4', 10000000, 0),
  ('5', 500000, 0);
`

  await client.query(query)
}
