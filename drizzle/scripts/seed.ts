import { transactionSchema } from '@drizzle/schema/transaction'
import { client, db } from './db'
import { costumerSchema } from '@drizzle/schema/costumer'

console.log('Delete existing data...')
try {
  await db.delete(transactionSchema)
  await db.delete(costumerSchema)
} catch (err) {
  console.log(err)
  console.log('Could not delete existing existing data ❌')
  await client.end()
  process.exit(1)
}

console.log('Checking if data was already created...')
try {
  const result = await db.select().from(costumerSchema)
  if (result.length) {
    console.log('Database already have data, skipping! 👋')
    await client.end()
    process.exit(0)
  }
} catch (err) {
  console.error(err)
  console.log('Could not fetch existing data before seeding ❌')
  await client.end()
  process.exit(1)
}

console.log('Database is empty, inserting initial data...')
try {
  await db.insert(costumerSchema).values([
    { id: '1', limit: 100000, balance: 0 },
    { id: '2', limit: 80000, balance: 0 },
    { id: '3', limit: 1000000, balance: 0 },
    { id: '4', limit: 10000000, balance: 0 },
    { id: '5', limit: 500000, balance: 0 },
  ])
  console.log('Costumers inserted! ✅')
} catch (err) {
  console.error(err)
  console.log('Could not seed database, perhaps the data already exists? ❌')
}

await client.end()

console.log('Disconnected')
