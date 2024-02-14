import { TransactionEntity } from '@/core/entities/transaction'
import { TransactionRepository } from '@/repositories/transaction-repository'
import { InMemoryCostumerRepository } from './in-memory-costumer-repository'

export class InMemoryTransactionRepository implements TransactionRepository {
  public items: TransactionEntity[] = []
  public costumerRepository: InMemoryCostumerRepository

  constructor() {
    this.items = []
    this.costumerRepository = new InMemoryCostumerRepository()
  }
  async create(transaction: TransactionEntity): Promise<TransactionEntity> {
    this.items.push(transaction)
    return transaction
  }

  async findLast10TransactionsByCostumerId(
    costumerId: number,
  ): Promise<TransactionEntity[]> {
    return this.items
      .filter((item) => item.costumerId === costumerId)
      .slice(-10)
  }
}
