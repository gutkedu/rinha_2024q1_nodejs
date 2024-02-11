import { CostumerEntity } from '@/core/entities/costumer'

export interface CostumerRepository {
  findById(costumerId: string): Promise<CostumerEntity>
  updateBalance(
    costumer: CostumerEntity,
    balance: number,
  ): Promise<CostumerEntity>
}
