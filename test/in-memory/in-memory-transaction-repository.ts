import { TransactionEntity } from '@/core/entities/transaction'
import { TransactionRepository } from '@/repositories/transaction-repository'

export class InMemoryTransactionRepository implements TransactionRepository {
  public items: TransactionEntity[] = []

  async create(data: TransactionEntity): Promise<TransactionEntity> {
    this.items.push(data)
    return data
  }

  async findLast10TransactionsByCostumerId(
    costumerId: string,
  ): Promise<TransactionEntity[]> {
    return this.items
      .filter((item) => item.costumerId === costumerId)
      .slice(-10)
  }
}
