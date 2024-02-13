import { FetchCostumerExtractUseCase } from '../fetch-costumer-extract'
import { DrizzleCostumerRepository } from '@/repositories/drizzle/drizzle-costumer-repository'
import { DrizzleTransactionRepository } from '@/repositories/drizzle/drizzle-transaction-repository'

export function makeFetchCostumerExtractUseCase() {
  const costumerRepository = new DrizzleCostumerRepository()
  const transactionRepository = new DrizzleTransactionRepository()
  return new FetchCostumerExtractUseCase(
    costumerRepository,
    transactionRepository,
  )
}
