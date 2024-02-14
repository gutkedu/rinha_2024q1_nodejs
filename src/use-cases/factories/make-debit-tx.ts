import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { CreateDebitTxUseCase } from '../create-debit-tx'
import { DrizzleDbTxRepository } from '@/repositories/drizzle/drizzle-db-tx-repository'

export function makeCreateDebitTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const dbTxRepository = new DrizzleDbTxRepository()
  return new CreateDebitTxUseCase(costumerRepository, dbTxRepository)
}
