import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { DrizzleTransactionRepository } from '@/repositories/drizzle/drizzle-transaction-repository'
import { CreateDebitTxUseCase } from '../create-debit-tx'

export function makeCreateDebitTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const transactionRepository = new DrizzleTransactionRepository()
  return new CreateDebitTxUseCase(costumerRepository, transactionRepository)
}
