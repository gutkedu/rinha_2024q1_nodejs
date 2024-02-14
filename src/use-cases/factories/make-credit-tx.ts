import { CreateCreditTxUseCase } from '../create-credit-tx'
import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { DrizzleTransactionRepository } from '@/repositories/drizzle/drizzle-transaction-repository'
import { DrizzleBalanceRepository } from '@/repositories/drizzle/drizzle-balance-repository'
import { DrizzleDbTxRepository } from '@/repositories/drizzle/drizzle-db-tx-repository'

export function makeCreateCreditTxUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const balanceRepository = new DrizzleBalanceRepository()
  const transactionRepository = new DrizzleTransactionRepository()
  const dbTxRepository = new DrizzleDbTxRepository()
  return new CreateCreditTxUseCase(
    costumerRepository,
    balanceRepository,
    transactionRepository,
    dbTxRepository,
  )
}
