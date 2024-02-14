import { CostumerEntity } from '@/core/entities/costumer'
import { CostumerRepository } from '@/repositories/costumer-repository'

export class InMemoryCostumerRepository implements CostumerRepository {
  public items: CostumerEntity[] = []

  constructor() {
    this.items = [
      CostumerEntity.create({ id: '1', limit: 100000, balance: 0 }),
      CostumerEntity.create({ id: '2', limit: 80000, balance: 0 }),
      CostumerEntity.create({ id: '3', limit: 1000000, balance: 0 }),
      CostumerEntity.create({ id: '4', limit: 10000000, balance: 0 }),
      CostumerEntity.create({ id: '5', limit: 500000, balance: 0 }),
    ]
  }
  async updateBalance(costumerId: string, balance: number): Promise<void> {
    const findCostumer = this.items.find((item) => item.id === costumerId)

    if (!findCostumer) {
      throw new Error('Costumer not found')
    }

    findCostumer.balance = findCostumer.balance + balance
  }

  async findById(costumerId: string): Promise<CostumerEntity> {
    return this.items.find((item) => item.id === costumerId) as CostumerEntity
  }
}
