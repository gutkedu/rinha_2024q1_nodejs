import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'
import { CreateTransactionUseCase } from '../create-transaction'

export function makeCreateTransactionUseCase() {
  const costumerRepository = new InMemoryCostumerRepository()
  const transactionRepository = new InMemoryTransactionRepository()
  return new CreateTransactionUseCase(costumerRepository, transactionRepository)
}
