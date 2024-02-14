import { CostumerEntity } from '@/core/entities/costumer'

export interface CostumerRepository {
  findById(costumerId: string): Promise<CostumerEntity | null>
  updateBalance(costumerId: string, balance: number): Promise<void>
}
