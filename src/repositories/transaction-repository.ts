import { TransactionEntity } from '@/core/entities/transaction'

export interface TransactionRepository {
  create(data: TransactionEntity): Promise<TransactionEntity>
  findLast10TransactionsByCostumerId(
    costumerId: string,
  ): Promise<TransactionEntity[]>
  createTransactionAndUpdateBalance(
    costumerId: string,
    balance: number,
    transaction: TransactionEntity,
  ): Promise<void>
}
