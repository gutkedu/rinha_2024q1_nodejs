import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { CreateDebitTxUseCase } from '../create-debit-tx'
import { DrizzleBalanceRepository } from '@/repositories/drizzle/drizzle-balance-repository'
import { DrizzleTransactionRepository } from '@/repositories/drizzle/drizzle-transaction-repository'
import { DrizzleDbTxRepository } from '@/repositories/drizzle/drizzle-db-tx-repository'

export function makeCreateDebitTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const balanceRepository = new DrizzleBalanceRepository()
  const transactionRepository = new DrizzleTransactionRepository()
  const dbTxRepository = new DrizzleDbTxRepository()
  return new CreateDebitTxUseCase(
    costumerRepository,
    balanceRepository,
    transactionRepository,
    dbTxRepository,
  )
}
