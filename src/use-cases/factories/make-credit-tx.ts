import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'
import { CreateCreditTxUseCase } from '../create-credit-tx'

export function makeCreateCreditTxUseCase() {
  const costumerRepository = new InMemoryCostumerRepository()
  const transactionRepository = new InMemoryTransactionRepository()
  return new CreateCreditTxUseCase(costumerRepository, transactionRepository)
}
