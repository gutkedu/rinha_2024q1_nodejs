import { BalanceEntity } from '@/core/entities/balance'
import { CostumerEntity } from '@/core/entities/costumer'

export interface CostumerRepository {
  findById(costumerId: number): Promise<{
    costumer: CostumerEntity | null
    balance: BalanceEntity | null
  }>
}
