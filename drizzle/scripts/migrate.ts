import { scriptDb, client } from './db'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

console.log('Migrating...')

await migrate(scriptDb, { migrationsFolder: './drizzle/migrations' })

console.log('Migration finished successfully! ✅')

await client.end()

console.log('Disconnected')
