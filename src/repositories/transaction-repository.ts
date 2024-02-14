import { TransactionEntity } from '@/core/entities/transaction'

export interface TransactionRepository {
  findLast10TransactionsByCostumerId(
    costumerId: number,
  ): Promise<TransactionEntity[]>
}
