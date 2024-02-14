import { it, expect, beforeEach, describe } from 'vitest'
import { NotFoundError } from './errors/not-found-error'
import { InMemoryCostumerRepository } from '@test/in-memory/in-memory-costumer-repository'
import { InMemoryTransactionRepository } from '@test/in-memory/in-memory-transaction-repository'
import { CreateCreditTxUseCase } from './create-credit-tx'

let costumerRepository: InMemoryCostumerRepository
let transactionRepository: InMemoryTransactionRepository
let sut: CreateCreditTxUseCase

describe('Create Transaction', () => {
  beforeEach(() => {
    costumerRepository = new InMemoryCostumerRepository()
    transactionRepository = new InMemoryTransactionRepository()
    sut = new CreateCreditTxUseCase(costumerRepository, transactionRepository)
  })

  it('should create a credit transaction', async () => {
    const value = 1000
    const response = await sut.execute({
      costumerId: '1',
      description: 'Test',
      value,
    })

    const findCostumer = await costumerRepository.findById('1')

    expect(response.limit).toBe(findCostumer.limit)
    expect(response.balance).toBe(value)
  })

  it('should not create a transaction when costumer is not found', async () => {
    await expect(
      sut.execute({
        costumerId: 'not-found',
        description: 'Test',
        value: 1000,
      }),
    ).rejects.toThrow(NotFoundError)
  })
})
