import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'
import { CreateDebitTxUseCase } from '../create-debit-tx'

export function makeCreateDebitTxUseCase() {
  const costumerRepository = new InMemoryCostumerRepository()
  const transactionRepository = new InMemoryTransactionRepository()
  return new CreateDebitTxUseCase(costumerRepository, transactionRepository)
}
