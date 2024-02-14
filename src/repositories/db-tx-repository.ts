import { TransactionEntity } from '@/core/entities/transaction'

export interface DbTxRepository {
  createTxAndUpdateCostumerBalance({
    costumerId,
    tx,
    balanceValue,
  }: {
    balanceValue: number
    costumerId: number
    tx: TransactionEntity
  }): Promise<void>
}
