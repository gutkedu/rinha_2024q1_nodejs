import { DrizzleTransactionRepository } from '@/repositories/drizzle/drizzle-transaction-repository'
import { CreateCreditTxUseCase } from '../create-credit-tx'
import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'

export function makeCreateCreditTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const transactionRepository = new DrizzleTransactionRepository()
  return new CreateCreditTxUseCase(costumerRepository, transactionRepository)
}
