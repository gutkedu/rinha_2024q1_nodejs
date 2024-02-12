import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'
import { FetchCostumerExtractUseCase } from '../fetch-costumer-extract'

export function makeFetchCostumerExtractUseCase() {
  const costumerRepository = new InMemoryCostumerRepository()
  const transactionRepository = new InMemoryTransactionRepository()
  return new FetchCostumerExtractUseCase(
    costumerRepository,
    transactionRepository,
  )
}
