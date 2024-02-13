import { scriptDb, client } from './db'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

console.log('Migrating...')

const defaultSchema = 'public'

await client.query(`CREATE SCHEMA IF NOT EXISTS "${defaultSchema}"`)

await client.query(`SET SCHEMA '${defaultSchema}'`)

await migrate(scriptDb, { migrationsFolder: './drizzle/migrations' })

console.log('Migration finished successfully! ✅')

await client.end()

console.log('Disconnected')
