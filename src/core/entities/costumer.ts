import { Entity } from './entity'

interface CostumerProps {
  limit: number
  balance: number
}

export class CostumerEntity extends Entity<CostumerProps> {
  get limit() {
    return this.props.limit
  }

  set limit(limit: number) {
    this.props.limit = limit
  }

  get balance() {
    return this.props.balance
  }

  set balance(balance: number) {
    this.props.balance = balance
  }

  static create(props: CostumerProps, id?: string) {
    return new CostumerEntity(props, id)
  }
}
