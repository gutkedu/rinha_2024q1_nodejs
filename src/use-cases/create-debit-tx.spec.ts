import { it, expect, beforeEach, describe } from 'vitest'
import { NotFoundError } from './errors/not-found-error'
import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { CreateDebitTxUseCase } from './create-debit-tx'
import { InconsistentBalanceError } from './errors/inconsistent-balance-error'
import { InMemoryDbTxRepository } from '@test/in-memory/in-memory-db-tx-repository'

let costumerRepository: InMemoryCostumerRepository
let dbTxRepository: InMemoryDbTxRepository
let sut: CreateDebitTxUseCase

describe('Create Transaction', () => {
  beforeEach(() => {
    costumerRepository = new InMemoryCostumerRepository()
    dbTxRepository = new InMemoryDbTxRepository()
    sut = new CreateDebitTxUseCase(costumerRepository, dbTxRepository)
  })

  it('should create a debit transaction', async () => {
    const value = 1000
    const response = await sut.execute({
      costumerId: 1,
      description: 'Test',
      value,
    })

    const findCostumer = await costumerRepository.findById(1)

    expect(response.limit).toBe(findCostumer.costumer?.limit)
    expect(response.balance).toBe(-value)
  })

  it('should not create a transaction when costumer is not found', async () => {
    await expect(
      sut.execute({
        costumerId: 555,
        description: 'Test',
        value: 1000,
      }),
    ).rejects.toThrow(NotFoundError)
  })

  it('should not create a transaction when balance is inconsistent', async () => {
    await expect(
      sut.execute({
        costumerId: 2,
        description: 'Test',
        value: 999999999999,
      }),
    ).rejects.toThrow(InconsistentBalanceError)
  })
})
