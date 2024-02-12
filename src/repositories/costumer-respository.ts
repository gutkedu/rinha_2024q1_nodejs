import { CostumerEntity } from '@/core/entities/costumer'

export interface CostumerRepository {
  findById(costumerId: string): Promise<CostumerEntity | null>
  updateBalance(
    costumer: CostumerEntity,
    balance: number,
  ): Promise<CostumerEntity>
}
