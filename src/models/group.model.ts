import { Entity, model, property } from '@loopback/repository';
import { Agent } from './agent.model';

@model()
export class ParentAgent extends Entity {
  @property()
  id?: number;

  @property()
  name?: string;

  @property()
  note?: string;

  @property.array(Agent)
  agents?: Agent[];

  constructor(data?: Partial<Agent>) {
    super(data);
  }
}
