import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('it should be able fetch a costumer extract', async () => {
    const response = await request(app.server).get(`/clientes/1/extrato`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('saldo')
    expect(response.body).toHaveProperty('ultimas_transacoes')
  })
})
