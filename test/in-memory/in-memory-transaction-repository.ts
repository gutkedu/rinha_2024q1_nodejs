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

  async createTransactionAndUpdateBalance(
    costumerId: string,
    balance: number,
    transaction: TransactionEntity,
  ): Promise<void> {
    this.items.push(transaction)
  }
}
