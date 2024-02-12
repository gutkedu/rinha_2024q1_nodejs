import { db, client } from './db'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

console.log('Migrating...')

await migrate(db, { migrationsFolder: './drizzle' })

console.log('Migration finished successfully! ✅')

await client.end()

console.log('Disconnected')
