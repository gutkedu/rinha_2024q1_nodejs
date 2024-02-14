import { CreateCreditTxUseCase } from '../create-credit-tx'
import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { DrizzleDbTxRepository } from '@/repositories/drizzle/drizzle-db-tx-repository'

export function makeCreateCreditTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const dbTxRepository = new DrizzleDbTxRepository()
  return new CreateCreditTxUseCase(costumerRepository, dbTxRepository)
}
