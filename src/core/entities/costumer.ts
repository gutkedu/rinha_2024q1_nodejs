import { CostumerSelect } from '@drizzle/schema/drizzle-schema'
import { Entity } from './entity'

interface CostumerProps extends CostumerSelect {}

export class CostumerEntity extends Entity<CostumerProps> {
  get id() {
    return this.props.id
  }
  get limit() {
    return this.props.limit
  }

  get name() {
    return this.props.name
  }

  set limit(limit: number) {
    this.props.limit = limit
  }

  static fromDatabase(input: CostumerSelect) {
    return new CostumerEntity(input)
  }

  static create(props: CostumerProps) {
    return new CostumerEntity({
      ...props,
    })
  }
}
