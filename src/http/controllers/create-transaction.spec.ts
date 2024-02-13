import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { TransactionType } from '@/core/types/transaction-type'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('it should be able to create a credit transaction', async () => {
    const costumerId = '1'
    const response = await request(app.server)
      .post(`/clientes/${costumerId}/transacoes`)
      .send({
        valor: 100,
        tipo: TransactionType.CREDIT,
        descricao: 'Teste',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      limite: 100000,
      saldo: -100,
    })
  })

  it('it should be able to create a debit transaction', async () => {
    const costumerId = '1'
    const response = await request(app.server)
      .post(`/clientes/${costumerId}/transacoes`)
      .send({
        valor: 300,
        tipo: TransactionType.DEBIT,
        descricao: 'Teste',
      })

    // Client 1 has already -100 balance from the previous test

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      limite: 100000,
      saldo: 200,
    })
  })
})
